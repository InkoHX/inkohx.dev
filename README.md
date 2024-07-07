# InkoHX's portfolio

[inkohx.dev](https://inkohx.dev)のソースコード

## 技術スタック

- Next.js (App Router)
- Tailwind CSS
- TypeScript

## セットアップ

### 本番環境

Vercelを利用してホスティングを行うことを推奨します。

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
