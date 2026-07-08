(function () {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const setCurrentYear = () => {
    document.querySelectorAll("[data-current-year]").forEach((node) => {
      node.textContent = String(new Date().getFullYear());
    });
  };

  const nl2br = (value) => String(value).split("\n").join("<br>");

  const getPath = (object, path) => path.split(".").reduce((current, key) => current && current[key], object);

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const applyContent = (content) => {
    document.querySelectorAll("[data-content]").forEach((node) => {
      const value = getPath(content, node.dataset.content);
      if (typeof value === "string") {
        node.innerHTML = nl2br(value).replace("AIを。", "<span>AI</span>を。");
      }
    });

    document.querySelectorAll("[data-cta='main']").forEach((link) => {
      link.href = content.cta.mainUrl || link.href;
      link.innerHTML = `${content.cta.mainText}<span aria-hidden="true">→</span>`;
    });
    document.querySelectorAll("[data-cta='mainAlt']").forEach((link) => {
      link.href = content.cta.mainUrl || link.href;
      link.innerHTML = `${content.cta.mainAltText}<span aria-hidden="true">→</span>`;
    });
    document.querySelectorAll("[data-cta='sub']").forEach((link) => {
      link.href = content.cta.subUrl || link.href;
      link.textContent = content.cta.subText;
    });
  };

  const hydrateFaq = (faqItems) => {
    const faq = document.querySelector("[data-list='faq']");
    if (!faq || !Array.isArray(faqItems)) return;
    faq.innerHTML = faqItems.map((item, index) => {
      const open = index === 0 ? " open" : "";
      return `<details${open}>
        <summary aria-controls="faq-panel-${index}" aria-expanded="${index === 0 ? "true" : "false"}"><span>${escapeHtml(item.question)}</span></summary>
        <p id="faq-panel-${index}">${escapeHtml(item.answer)}</p>
      </details>`;
    }).join("");
  };

  const hydrateUseCases = (items) => {
    const root = document.querySelector("[data-list='useCases']");
    if (!root || !Array.isArray(items)) return;
    root.innerHTML = items.map((item) => `<article class="use-case reveal">
      ${item.image
        ? `<img class="use-case-image" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.alt || item.title)}" loading="lazy">`
        : `<div class="placeholder" role="img" aria-label="${escapeHtml(item.placeholder)}">${escapeHtml(item.placeholder)}</div>`}
      <h3>${escapeHtml(item.title)}</h3>
      <ul>${item.items.map((entry) => `<li>${escapeHtml(entry)}</li>`).join("")}</ul>
    </article>`).join("");
  };

  const hydrateCurriculum = (items) => {
    const root = document.querySelector("[data-list='curriculum']");
    if (!root || !Array.isArray(items)) return;
    root.innerHTML = items.map((item, index) => {
      const number = String(index + 1).padStart(2, "0");
      return `<li><span>${number}</span>${escapeHtml(item)}</li>`;
    }).join("");
  };

  const hydrateTodoList = (key, items) => {
    const root = document.querySelector(`[data-list='${key}']`);
    if (!root || !Array.isArray(items)) return;
    root.innerHTML = items.map((item) => `<p class="admin-todo">${escapeHtml(item)}：未確認</p>`).join("");
  };

  const setupFaq = () => {
    document.querySelectorAll(".faq-list details").forEach((details) => {
      const summary = details.querySelector("summary");
      if (!summary) return;
      summary.setAttribute("role", "button");
      summary.setAttribute("aria-expanded", details.open ? "true" : "false");
      details.addEventListener("toggle", () => {
        summary.setAttribute("aria-expanded", details.open ? "true" : "false");
      });
    });
  };

  const setupReveal = () => {
    const targets = document.querySelectorAll(".reveal");
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    targets.forEach((target) => observer.observe(target));
  };

  const setupFixedCta = () => {
    const fixed = document.querySelector(".mobile-fixed-cta");
    const hero = document.querySelector("#hero");
    if (!fixed || !hero || window.matchMedia("(min-width: 700px)").matches) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        fixed.classList.toggle("is-visible", !entry.isIntersecting);
      });
    }, { threshold: 0.1 });
    observer.observe(hero);
  };

  const loadContent = async () => {
    try {
      const response = await fetch("content.json", { cache: "no-store" });
      if (!response.ok) return;
      const content = await response.json();
      applyContent(content);
      hydrateUseCases(content.useCases);
      hydrateCurriculum(content.curriculum);
      hydrateTodoList("formatTodos", content.formatTodos);
      hydrateTodoList("infoSessionTodos", content.infoSessionTodos);
      hydrateTodoList("consultationTodos", content.consultationTodos);
      hydrateFaq(content.faq);
    } catch (error) {
      console.info("content.jsonを読み込めませんでした。静的HTMLの内容を表示します。", error);
    } finally {
      setupFaq();
      setupReveal();
      setupFixedCta();
    }
  };

  setCurrentYear();
  loadContent();
})();
