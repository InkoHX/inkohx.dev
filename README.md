# InkoHX's portfolio

[inkohx.dev](https://inkohx.dev)のソースコード

## 技術スタック

- Next.js (App Router)
- Tailwind CSS
- TypeScript
- 投稿記事周り
  - unified
  - remark
  - rehype
  - gray-matter
  - shiki
- TypeBox

## セットアップ

### 開発環境

#### ツールチェーン

`.tool-versions`に記載されているNode.jsのバージョンを用意して、`package.json`の`packageManager`フィールドに記載されているパッケージマネージャーをインストールしてください。

<!-- prettier-ignore-start -->
> [!NOTE]
> **corepack**と**asdf**を使用している場合は、以下のコマンドを実行してください。
> ```bash
> $ asdf install
> $ corepack enable
> $ asdf reshim nodejs # https://github.com/asdf-vm/asdf-nodejs?tab=readme-ov-file#corepack
> ```
<!-- prettier-ignore-end -->

#### 依存関係

必ず`pnpm`を使用してインストールしてください。

```bash
$ pnpm install
```

#### 開発サーバーの起動

```bash
$ pnpm dev
```

## 記事について

プロジェクトのルートに配置された、`posts`フォルダにあるMarkdown記法で書かれたファイルが公開される記事となります。

### YAML frontmatter

Markdownファイルには記事のタイトル、カテゴリ、更新日などを記入するために、同ファイル内にYAML記法で情報を記入する必要があります。

```markdown
---
title: Example Post (テストページ)
publishedAt: '1970-01-01'
modifiedAt: '1970-01-01'
categories:
  - テスト
---

## Heading 2

...
```

#### データ構造

| キー          | 型       | 説明                                                                                                                                                  |
| ------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`       | String   | 記事のタイトル、**必須かつ1文字以上**入力されている必要があります。                                                                                   |
| `publishedAt` | String   | 記事を投稿した日付、`\d\d\d\d-\d\d-\d\d`で書く必要があり、**必須項目**です。                                                                          |
| `modifiedAt`  | String   | 記事をアップデートした日付（アップデートしていない場合は`publishedAt`と同じ日付を入力する）、`\d\d\d\d-\d\d-\d\d`で書く必要があり、**必須項目**です。 |
| `categories`  | String[] | 記事の大まかな分類、**必須項目**です。                                                                                                                |

> [!TIP]
> データ構造に何らかの間違いがある場合は、`TypeboxValidationError`エラーが発生します。

### 書くときの注意

- `# Heading 1`は使わないこと
  - HTMLでいう`h1`に相当するもの
- Markdownファイルの名前は`^[a-z0-9-]+\.md`にすること
