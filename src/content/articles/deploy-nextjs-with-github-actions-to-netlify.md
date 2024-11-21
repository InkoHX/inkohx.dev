---
title: Next.jsで作ったサイトをGitHub Actionsでビルドして、Netlifyにデプロイする
publishedAt: '2024-11-05'
categories:
  - Next.js
  - GitHub Actions
  - Netlify
---

このサイトをVercelからNetlifyへ変更するにあたって、色々ぶち当たった問題を元に作成した記事になります。
ちなみに本当はCloudflareにデプロイしたかったけど、動かなくて諦めたのでNetlifyにしました。

## OpenNext

つい先日、[OpenNext](https://opennext.js.org)というものを知り、Next.jsをVercel以外のプラットフォームでも動かせるアダプターがあるのを知りました。
OpenNextの概要ページでも述べられている通り、Next.jsはNode.jsで動かすことはできるものの、Vercelほどのレベルで動作はしません。
OpenNextはそこを助けてくれるもののようです。実際使ってみるとお手軽ですし、結構いい感じに動いてくれます。

### サポートされているプラットフォーム

- [AWS](https://opennext.js.org/aws)
  - 使っていないのでどこまで動くか分かりません
  - [SST](https://sst.dev/)と呼ばれるコミュニティがメンテナンスしている
- [Cloudflare](https://opennext.js.org/cloudflare)
  - まだ開発中ということもあり、試しにこのサイトをデプロイしようとしてみましたが、一部のページが動きませんでした
  - Cloudflareのチームによってメンテナンスされています
- [Netlify](https://opennext.js.org/netlify)
  - Next.js v15対応済みで、このサイトをデプロイしても問題なく動きました
  - Netlifyのチームによってメンテナンスされています

ということで、Netlifyを採用してみました。

## ここから本題

OpenNextも軽く紹介したので、さっそく本題に入ります。

### pnpmを使用している場合

[OpenNextのドキュメント](https://opennext.js.org/netlify#pnpm-support)によると、Next.jsとpnpmを使用している場合は`shamefully-hoist`オプションを有効にしなければならないようです。

`.npmrc`ファイルをプロジェクトルート上に配置して、`public-hoist-pattern[]=*`または`shamefully-hoist=true`を追記します。
その後は、`pnpm install`をして`pnpm-lock.yaml`と`node_modules`をアップデートしておきましょう。

### Vercelでしか使えない機能は削除する

当然ですが、Vercel AnalyticsやVercel Speed Insightsは使用できませんので、削除しましょう。
Vercel CLIも不要なので削除します。

## GitHub Actionsを使わない場合はここまで

GitHub Actionsなんて使わないという方は、後はNetlifyに丸投げするだけで、勝手にNext.jsで作られたアプリケーションをNetlifyで使える形にビルドして、デプロイまでやってくれます。
後は動かない箇所をNetlifyで動かせるように修正して、再度Netlifyに投げておしまいです。お疲れ様でした。

## GitHub Actionsを使う場合

なぜGitHub Actionsを使うのか先に理由を述べておきます。

- **公開リポジトリならGitHub Actionsを無制限に使える**
  - プライベートリポジトリでも、月2000分は動かせる
    - Proプラン加入なら月3000分は使える（Netlifyの10倍）
- Netlifyは月300分しかビルドできない
  - 開発が活発だとちょっと厳しいし、メインブランチ以外のブランチやPRごとにビルドしてプレビューURLを発行しているとあっという間に消費する

### 最初は`nwtgck/actions-netlify`を使おうとした

ありがたいことに、[Netlifyへのデプロイをビルド時間0で行うためのGitHub Actions](https://qiita.com/nwtgck/items/e9a355c2ccb03d8e8eb0)という記事を書いた方が`nwtgck/actions-netlify`という[このようなワークフロー](https://github.com/nwtgck/actions-netlify?tab=readme-ov-file#usage)を書くだけで、お手軽にデプロイできるものを公開していましたので、最初はこれを使うつもりでした。

結論から言うと無理でした。色々試してみたものの、[2年前のIssueについたコメント](https://github.com/nwtgck/actions-netlify/issues/832#issuecomment-1309026594)にもある通り、このActionに適したものを作るのは厳しいようです。

### Netlify CLIを使う

ローカルビルドに対応しているので、これを使う以外に手段はなさそうです。

加えて、`.gitignore`に`.netlify/`を追加することをオススメします。

#### インストールするパッケージ

- Netlify用のNext.jsランタイムを生成するのに、`@netlify/plugin-nextjs`が必要
- `netlify-cli`が必要

```sh
$ pnpm i -D @netlify/plugin-nextjs netlify-cli
```

#### `netlify.toml`を作成

1. `@netlify/plugin-nextjs`を使う設定を入れる
1. `build.command`に`pnpm build`を設定 (`next build`するものならなんでも)

そして、以下の内容で`netlify.toml`を作成します。

```toml
[build]
command = "pnpm build"

[[plugins]]
package = "@netlify/plugin-nextjs"
```

これで準備は完了です。

#### 試しにデプロイする

ここまで正しく設定し、ソースコードに誤りもなければ正常にデプロイが完了するはずです。

```sh
pnpm netlify deploy --build
```

次はいよいよワークフローを書いていきます。

### ワークフローを作成する

`nwtgck/actions-netlify`に近いことがしたいので、以下のような仕組みでワークフローを組んでいきます。

- ブランチごとに`push`イベントが起きたら、プレビューを作成する
  - コミットに対して、コメントでプレビューURLを伝える
- プルリクエストで`opened`, `synchronize`, `reopened`いずれかのイベントが起きたらプレビューを作成する
  - コメントでプレビューURLを伝える
- `main`ブランチにプッシュされたら本番環境にデプロイする
  - コミットに対して、コメントでプレビューURLを伝える

```yml
name: Netlify

on:
  push:
  pull_request:
    types: [opened, synchronize, reopened]

concurrency:
  cancel-in-progress: true
  group: ${{ github.workflow }}-${{ github.ref }}

jobs:
  # プレビュー用
  deploy-preview:
    name: Preview
    runs-on: ubuntu-latest
    if: github.ref != 'refs/heads/main'
    permissions:
      contents: write
      pull-requests: write
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4

      - uses: actions/setup-node@v4
        with:
          cache: pnpm

      - name: Install dependencies
        run: pnpm install

      - name: Deploy to preview
        id: deploy-result
        # 参考: https://github.com/netlify/actions/blob/3eff4d5cd9bf9f7ba528c1f1bbb94a37c3a3201d/cli/entrypoint.sh
        run: |
          OUTPUT=$(sh -c "echo && pnpm netlify deploy --build")
          NETLIFY_URL=$(echo "$OUTPUT" | grep -Eo '(http|https)://[a-zA-Z0-9./?=_-]*(--)[a-zA-Z0-9./?=_-]*')

          echo "url=$NETLIFY_URL" >> $GITHUB_OUTPUT
          echo "$OUTPUT"
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}

      - name: Comment to commit
        uses: actions/github-script@v7
        if: github.event_name == 'push'
        with:
          script: |
            const netlifyUrl = process.env.NETLIFY_URL;

            await github.rest.repos.createCommitComment({
              ...context.repo,
              commit_sha: context.sha,
              body: `Deployed to ${netlifyUrl}`,
            });
        env:
          NETLIFY_URL: ${{ steps.deploy-result.outputs.url }}

      - name: Comment to Pull Request
        if: github.event_name == 'pull_request'
        uses: thollander/actions-comment-pull-request@v3
        with:
          comment-tag: netlify-deploy-preview
          mode: recreate
          message: Deployed to ${{ steps.deploy-result.outputs.url }}

  # 本番環境用
  deploy-prod:
    name: Production
    runs-on: ubuntu-latest
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4

      - uses: actions/setup-node@v4
        with:
          cache: pnpm

      - name: Install dependencies
        run: pnpm install

      - name: Deploy to production
        id: deploy-result
        # 参考: https://github.com/netlify/actions/blob/3eff4d5cd9bf9f7ba528c1f1bbb94a37c3a3201d/cli/entrypoint.sh
        run: |
          OUTPUT=$(sh -c "echo && pnpm netlify deploy --prod --build")
          NETLIFY_URL=$(echo "$OUTPUT" | grep 'Website URL:' | grep -Eo '(http|https)://[a-zA-Z0-9./?=_-]*')

          echo "url=$NETLIFY_URL" >> $GITHUB_OUTPUT
          echo "$OUTPUT"
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}

      - name: Comment to commit
        uses: actions/github-script@v7
        with:
          script: |
            const netlifyUrl = process.env.NETLIFY_URL;

            await github.rest.repos.createCommitComment({
              ...context.repo,
              commit_sha: context.sha,
              body: `Deployed to ${netlifyUrl}`,
            });
        env:
          NETLIFY_URL: ${{ steps.deploy-result.outputs.url }}
```

#### NetlifyのアクセストークンとサイトID

ワークフローの内容を見てもらうと分かる通り、Netlify CLIを実行する際に`NETLIFY_AUTH_TOKEN`と`NETLIFY_SITE_ID`を渡していますが、この2つがデプロイの際に必要になります。

- `NETLIFY_AUTH_TOKEN`は [https://app.netlify.com/user/applications#personal-access-tokens](https://app.netlify.com/user/applications#personal-access-tokens) から作成できます。
- `NETLIFY_SITE_ID`は**デプロイしたいサイトのページ > Settings > Site configuration > General site settings > Site details > Site Information**の中にあります。

シークレットの作成方法は [https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-an-environment](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-an-environment) に従ってください。

## おわり

ワークフローを動かしてみると、何も問題がなければうまく動くはずです。[inkohx.dev](https://github.com/InkoHX/inkohx.dev)用に書いたものを記事用に少し加工したものなので、もし動かなかったらそれを参考にするか、私に教えてください。

実際に動かすと[こんな感じでコミットにコメント](https://github.com/InkoHX/inkohx.dev/commit/a4babffa5688a56f665d65ad0f6d1090b2a76808#commitcomment-148687991)して、[プルリクエストが作成されるとコメントを使って通知](https://github.com/InkoHX/inkohx.dev/pull/164#issuecomment-2454122310)もしてくれます。
