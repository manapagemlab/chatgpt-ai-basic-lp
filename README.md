# 40代・50代女性向け ChatGPT・AI基礎講座LP

静的HTML、CSS、Vanilla JavaScriptで実装した1ページLPです。フレームワークやビルドツールは不要です。

## ファイル構成

- `index.html`：ページ構造、SEO、各セクションの初期表示内容
- `styles.css`：デザイン、レスポンシブ、アニメーション軽減対応
- `script.js`：`content.json`反映、FAQ、スクロール表示、現在年表示
- `content.json`：主要文言、CTAリンク、FAQ、TODO項目の管理
- `assets/placeholders/`：favicon、OGP、差し替え画像などの配置先
- `assets/images/hero-collage.webp`：FV用コラージュ画像
- `assets/images/course-collage.webp`：活用例セクション用コラージュ画像
- `assets/images/meal-plan.webp`：暮らしの活用例画像
- `assets/images/course-cover.webp`：講座資料・制作例画像
- `assets/images/desk-work.webp`：仕事の活用例画像
- `assets/images/lp-memo.webp`：講座内容セクション補助画像
- `assets/images/chat-sample.webp`：質問例・オンライン受講方法の補助画像
- `assets/images/work-photo.webp`：対面受講方法の補助画像

## ローカルでの確認方法

`content.json` を読み込むため、ローカルサーバーで確認してください。

```bash
python -m http.server 8000
```

ブラウザで `http://localhost:8000/` を開きます。

## content.json の編集方法

講座名、メインコピー、サブコピー、CTA文言、FAQなどは `content.json` を編集します。HTML内にも初期表示文言を入れているため、JavaScriptが無効でも主要内容は読めます。

## CTAリンクの変更方法

`content.json` の `cta.mainUrl` と `cta.subUrl` を正式URLに差し替えてください。

```json
"mainUrl": "https://example.com/form",
"subUrl": "https://example.com/consultation"
```

HTML内にも `TODO: 正式な説明会申込みURLに差し替える` のコメントを残しています。

## 画像の差し替え方法

FVと活用例には提供画像を配置済みです。その他の画像は `assets/images/` に配置して差し替えてください。

差し替え推奨箇所：

- FVコラージュ画像
- 講座資料表紙
- SNS告知サンプル
- 献立サンプル
- 個人事業主向けデスクワーク画像
- 講師写真
- ChatGPT画面サンプル
- 質問例画面
- 講座資料の一部

画像を追加する場合は、意味のある `alt` 属性を設定してください。

## 講師情報の追加方法

講師名やプロフィールは `content.json` の `instructor` に追加します。未提供の資格、実績、受講者数、口コミは創作しないでください。

## FAQの追加・修正方法

`content.json` の `faq` 配列に質問と回答を追加します。未確認の内容は断定せず、「未確認」「確定後に掲載」として扱ってください。

## 未確認TODOの探し方

コード内の `TODO:` コメント、または画面上の `.admin-todo` を検索してください。公開時に画面上のTODOを非表示にしたい場合は、CSSに以下を追加します。

```css
.admin-todo {
  display: none;
}
```

## 公開前チェック方法

- CTAリンクが正式URLに差し替わっているか
- 講師名、開催日、料金、会場など未確認情報が残っていないか
- 架空の実績、口コミ、価格、日程が入っていないか
- スマートフォンでFV内にCTAが見えるか
- FAQをキーボードで操作できるか
- 画像のalt属性が適切か
- コンソールエラーがないか

## 静的ホスティングへの公開方法

Netlifyなどに、フォルダ一式をそのままアップロードできます。ビルドコマンドは不要です。

## GitHub Pages で公開する方法

このフォルダはGitHub Pagesでそのまま公開できます。`index.html`、`styles.css`、`script.js`、`content.json`、`assets/`、`.nojekyll`、`.github/workflows/pages.yml` をリポジトリに入れてください。

1. GitHubで新しいリポジトリを作成します。
2. このLP一式をリポジトリのルートに配置します。
3. `main` ブランチへpushします。
4. GitHubの `Settings > Pages` で、Sourceを `GitHub Actions` にします。
5. Actionsの `Deploy static LP to GitHub Pages` が完了すると公開URLが発行されます。

公開後は `content.json` の `site.canonical` と `index.html` の `canonical` を、発行されたGitHub Pages URLに差し替えてください。

## 画像最適化の推奨

写真はWebPまたはAVIFを推奨します。FV画像やOGP画像は表示サイズに合わせて圧縮し、必要以上に大きな画像を置かないでください。

## OGP画像の差し替え方法

`content.json` の `site.ogImage` と、`index.html` の `og:image` を正式画像に差し替えてください。推奨サイズは `1200x630px` です。
