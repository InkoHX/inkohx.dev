---
title: Android版Spotifyのローカルファイル機能で、特定の音声ファイルを読み取られたくない場合
publishedAt: '2024-11-30'
categories:
  - Spotify
---

PC版だとローカルから音声ファイルを読み取るフォルダを指定することが可能です。\
ですが、Android版のSpotifyにはそのような細かい指定までできる機能は存在しません。（iOS版は不明）

そこで、どうしたら**特定の音声ファイルをSpotifyに読み取られないようにできるのか**を調べてみました。

## アプリに付与された権限を確認

まずは、アプリに付与している権限を確認して、どういう場所から音声ファイルを読み取っているのかを調べてみました。\
すると、**音声とオーディオ**という権限が付与されていることが判明しました。

この権限は**共有ストレージからの音声ファイルの読み取り**を許可すると書いてあります。\
ここで気になるのが、**共有ストレージ**というワードです。調べてみましょう。

### 共有ストレージとは

[Android Developersのドキュメント](https://developer.android.com/training/data-storage/shared/media)を見てみると、音声ファイルの共有ストレージとして扱われているディレクトリの一覧が書いてあります。

1. `Alarms/`
1. `Audiobooks/`
1. `Music/`
1. `Notifications/`
1. `Podcasts/`
1. `Ringtones/`
1. `Movies/`
1. `Recordings/` (Android 11以降)

以上、と言いたいところですがSpotifyは`Pictures/`や`DCIM/`、`Download/`にある音声ファイルも認識しているようなので、正確にはよくわかりません。（教えて詳しい人）

## Spotifyが読み込む音声ファイルの範囲

| ディレクトリ     | 読み取り |
| ---------------- | -------- |
| `Alarms/`        | ❌       |
| `Audiobooks/`    | ⭕       |
| `Music/`         | ⭕       |
| `Notifications/` | ❌       |
| `Podcasts/`      | ⭕       |
| `Ringtones/`     | ❌       |
| `Movies/`        | ⭕       |
| `Recordings/`    | ⭕       |
| `Download/`      | ⭕       |
| `Pictures/`      | ⭕       |
| `DCIM/`          | ⭕       |

といったところでしょうか、正確ではないかもしれません。

## 解決方法

先程の表からも分かる通り、すべてのフォルダの音声ファイルをローカルファイルとして扱っているわけではないので、**Spotifyが認識できないディレクトリを新しく作って、そこに読み取らせたくない音声ファイルを配置する**ことが解決方法になります。

例えば、**Files by Google**などのファイルエクスプローラーを使って、内部ストレージ上に`.Music`といった名前でディレクトリを作成し、そこに音声ファイルを移動させるだけでSpotifyに表示されることを防げます。

以上