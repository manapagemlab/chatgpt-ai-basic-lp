# ChatGPT・AI基礎講座 LP

40代・50代女性向けのChatGPT・AI基礎講座LPです。静的HTML / CSS / Vanilla JavaScriptのみで動作します。

## ファイル構成

- `index.html`：LP本体
- `styles.css`：デザイン・スマホ優先レイアウト
- `script.js`：FAQ、スクロール表示、`content.json` の反映
- `content.json`：主要文言、CTAリンク、FAQ、画像パスの管理
- `images/`：LP内で使う画像
- `placeholders/`：favicon / OGP用プレースホルダー
- `.github/workflows/pages.yml`：GitHub Pages自動公開設定
- `.nojekyll`：GitHub Pages用設定

## ローカル確認

このフォルダでローカルサーバーを起動して確認します。

```bash
python -m http.server 8000
```

ブラウザで以下を開きます。

```text
http://localhost:8000/
```

`file://` で直接開くと `content.json` の読み込みが制限される場合があります。GitHub Pages公開時は問題ありません。

## GitHub Pages公開手順

1. GitHubで新規リポジトリを作成します。
2. この `AI講座` フォルダの中身をリポジトリのルートに入れます。
3. `main` ブランチにpushします。
4. GitHubの `Settings > Pages` で Source を `GitHub Actions` にします。
5. `Actions` の `Deploy static LP to GitHub Pages` が成功すると公開URLが発行されます。

## Gitコマンド例

```bash
git init
git add .
git commit -m "Add static LP for GitHub Pages"
git branch -M main
git remote add origin https://github.com/USER/REPO.git
git push -u origin main
```

`USER/REPO` は作成したGitHubリポジトリに置き換えてください。

## 公開後に差し替える項目

公開URLが決まったら以下を変更します。

- `index.html` の `canonical`
- `content.json` の `site.canonical`
- `content.json` の `cta.mainUrl`
- `content.json` の `cta.subUrl`

## 画像差し替え

画像は `images/` に半角英数字のファイル名で入れてください。日本語ファイル名やスペース入りファイル名はGitHub Pagesで表示トラブルの原因になります。

現在使っている主な画像：

- `images/hero-collage.webp`
- `images/course-collage.webp`
- `images/meal-plan.webp`
- `images/course-cover.webp`
- `images/desk-work.webp`
- `images/lp-memo.webp`
- `images/chat-sample.webp`
- `images/work-photo.webp`

## 公開前チェック

- スマホでFV内にCTAが見える
- `images/` の画像が表示される
- `content.json` が読み込める
- CTAリンクが正式URLになっている
- 未確認情報がTODOとして残っている
- 架空の実績、口コミ、価格、日程が入っていない
