---
title: Nixでmpvを入れてCDを再生する
publishedAt: '2026-02-17'
categories:
  - Nix
  - mpv
---

nixpkgsからmpvをインストールして、CDを再生しようとすると以下のようなエラーが出る。

```sh
$ mpv cdda://
No protocol handler found to open URL cdda://
The protocol is either unsupported, or was disabled at compile-time.
Exiting... (Errors when loading file)
```

## 原因

`cdda`プロトコルが使えるような形でビルドされていないことが原因 \
具体的にはmesonを使ってmpvをビルドするときに、`cdda`オプションを有効にしていないからです。

## 対処方法

[こちらのPR](https://github.com/NixOS/nixpkgs/pull/46035)で`cddaSupport`というフラグが追加され、
これを`true`にしてビルドすることで、mpvでCDを再生できるようになります。

```nix
{ pkgs, ... }: {
  environment.systemPackages = with pkgs; [
    mpv-unwrapped.override {
      cddaSupport = true;
    }
  ];
}
```

なんでデフォルトで`false`にしてるのかよく分からない...（Nixのポリシーとかが関わってるのかな？）

## 余談

### CDの回転速度を制御する

[`--cdda-speed=n`](https://mpv.io/manual/stable/#options-cdda-speed)というオプションがあり、
これに1〜100までの数値を渡すことでCDの回転速度を制御できるようになります。

私が使用しているCDドライブはそんなにいいものではなく、
回転速度を最大にするとちょっと耳障りになるため、
`--cdda-speed=10`をつけて10倍速程度にしてあげると静かでちょうどいい感じになる。

### デフォルトでcddaSupportをtrueにしないの？

[mpv: enable cddaSupport on most platforms](https://github.com/NixOS/nixpkgs/pull/410705)というPRにて、
Darwin以外でデフォルトで有効化しようぜ！みたいなPRが立てられているが放置されている。

（👍️して持ち上げよう）
