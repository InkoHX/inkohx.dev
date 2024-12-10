---
title: GitHub ActionsとPackagesのストレージ使用状況を調べる
publishedAt: '2024-12-11'
categories:
  - GitHub
---

ある日、「**[GitHub] You've used 100% of included services for the InkoHX account**」という件名で、GitHub ActionsとPackages合わせてストレージの使用率が100%に到達したという通知メールを受け取りました。\
実は100%に到達する前にも、何度かアラートは受け取っていましたが対処するのを忘れてました。私が悪い

ただ、どのリポジトリが原因でストレージを消費しているのか全く心当たりがないので、[GitHubのプランと使用状況ページ](https://github.com/settings/billing/summary)を確認してみましたが...

[![スクリーンショット](https://i.gyazo.com/3321a49441478dc13fe2efc707c55141.png)](https://gyazo.com/3321a49441478dc13fe2efc707c55141)

このように、ストレージでどれくらい容量を消費しているかは書いてありますが、**どのリポジトリでどれほど消費しているのか**については一切書いていないんですよね。

## 使用状況はダウンロードしないと見れない

[GitHubのプランと使用状況ページ](https://github.com/settings/billing/summary)にアクセスし、**Usage this month**という文字の右にある**Get usage report**というボタンをクリックします。\
すると、過去何日分のデータを取得するのかを選択させられるので、過去7日を選択して**Send report to email**をクリックしましょう。

メールボックスを確認すると、「**[GitHub] Your usage report is ready to download**」という件名でメールが届くのでダウンロードリンクをクリックしてください。CSVファイルが手に入ります。

## CSVからデータを読み取る

CSVなのでテキストエディタで見るのも手ですが、スプレッドシート等を使って見たほうが見やすいです。

`Product`という列で`Shared Storage`が格納されている行に注目してみましょう。

| Date       | Product        | SKU            | Quantity | Unit Type | Price Per Unit ($) | Multiplier | Owner  | Repository Slug |
| ---------- | -------------- | -------------- | -------- | --------- | ------------------ | ---------- | ------ | --------------- |
| 2024-12-08 | Shared Storage | Shared Storage | 4.3201   | gb-day    | 0.008              | 1          | InkoHX | example-project |

私の場合表のようなデータを見つけたので、詳しく見てみましょう。\
`Unit Type`が`gb-day`と書いてあります。なので、`Quantity`の`4.3201`という値は**4.3GB**だということがわかります。\
次に、`Repository Slug`を見てみると`example-project`と書いてあります。

つまり、私の場合、1つのリポジトリで4.3GBのストレージを消費していたということになります。\
一回の実行につき、数GBあるファイルをArtifactとしてアップロードしていたのが原因でした。

## 対処法

1. [Artifactの有効期間を短くする](#artifactの有効期間を短くする)
1. [既存のArtifactを消す](#既存のartifactを消す)

### Artifactの有効期間を短くする

リポジトリの設定から**Actions → General**に進んでもらうと、**Artifact and log retention**という欄があります。\
デフォルトは有効期間が90日に設定されていますが、これを短くすればするほど古いArtifactとログがすぐ削除されていくため、容量削減に繋がります。

ただ、ログも一緒に消えるのでArtifactだけの有効期限を短くしたいって人には合わなそうです。

### 既存のArtifactを消す

[大量にある GitHub Actions の Artifact を頑張って消す方法](https://zenn.dev/mixi/articles/52ea8c9050bac8#%E5%8F%A4%E3%81%84-artifact-%E3%82%92%E5%89%8A%E9%99%A4)という記事によると

> Retention Period は、設定後にアップロードされるファイルにのみ適用されるため、アップロード済みの Artifact はそのままになります。
> アップロード時から（デフォルト設定の） 90 日以上経てば消えてくれますが、その間はストレージに料金がかかるので、古いファイルは消す必要があります。
>
> ところが、 GitHub Actions には Artifact をまとめて消す方法というのがなく、削除するには管理画面からポチポチ手動で消していくか、API 経由で消していくかの二択しかありません。

とのことらしく、消すには[`c-hive/gha-remove-artifacts`](https://github.com/c-hive/gha-remove-artifacts)といったActionを使う必要があるらしいです。詳細は記事をご覧ください。

見た感じそのアクションを使えば、Artifactの有効期限は短くしたいけど、ログの有効期限は短くしたくないという人のニーズも満たせそうです。
