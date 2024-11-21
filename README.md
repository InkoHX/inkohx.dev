# www.inkohx.dev

Astroを使って作った[www.inkohx.dev](https://www.inkohx.dev)のソースコード

## 主な内容

- プロフィール
- ブログ

## 開発環境

```sh
$ gh repo clone InkoHX/inkohx.dev

# 依存関係のインストール
$ pnpm i

# エディタのセットアップ
$ cp ./.vscode/settings.tmpl.jsonc ./vscode/settings.json
$ pnpm netlify recipes vscode

# 起動
$ pnpm dev
```
