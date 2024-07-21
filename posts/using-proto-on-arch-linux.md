---
title: protoをArch Linuxで使う
publishedAt: '2024-07-22'
modifiedAt: '2024-07-22'
categories:
  - proto
  - Arch Linux
---

以前、[様々なツールチェーンに対応したバージョンマネージャのprotoを紹介](https://zenn.dev/inkohx/articles/706019864840bc)という記事を書きました。

インストール手順は公式サイトを見てくださいってことでスルーしたのですが、今のところパッケージマネージャを使わない形でのインストールになるので、アップデートしたい場合は毎回`proto upgrade`を打つ必要があって非常に面倒です。

そこで、今回は[Arch User Repository (AUR)](https://aur.archlinux.org)と[`paru`](https://github.com/Morganamilo/paru)という`pacman`のラッパーを使ってアップデートを楽にしよう！という話です。

## AURの`proto-bin`を使う

ありがたいことに、既にAURに`proto`を向けに[`proto-bin`](https://aur.archlinux.org/packages/paru-bin)としてPKGBUILDファイルをメンテナンスしてくれている方がいるので、これをありがたく使わせていただきましょう。

```sh
$ paru -S proto-bin
```

### アップデート

`paru`コマンドを実行して、PKGBUILDファイルを確認して大丈夫そうだったらインストールするだけ

## 環境変数の設定

protoがツールチェーンをインストールする場所は、環境変数に`PROTO_HOME`としてインストール場所への絶対パスがあれば優先して使用し、ない場合は`~/.proto`を選択するように[実装](https://github.com/moonrepo/proto/blob/8eef12153007d8cc098c09a91ec74ec941efae46/crates/cli/src/main_shim.rs#L30-L46)されています。

そして、`proto install`等を実行した際に`$PROTO_HOME/shims`が生成されるのですが、これを`PATH`に追加しておかないと直接シェルにツールチェーンのコマンドを打っても実行できません。

この`$PROTO_HOME/shims`に配置された実行ファイルには、protoの[Version detection](https://moonrepo.dev/docs/proto/detection)を使えるようにするためのプログラムも含まれているので必ず`PATH`に追加しましょう。

```sh
export PROTO_HOME="$HOME/.proto" # 破壊的変更などで、ツールチェーンのインストール場所が変わったりしないように念の為固定する。
export PATH="$PROTO_HOME/shims:$PATH"
```

自分の環境に合わせて、環境変数を設定しましょう。

## ツールチェーンのインストール

環境変数の設定も終わったことですし、Node.jsのインストールしたりしてみましょう。

```sh
# ツールチェーンのインストール
$ proto install --pin=global node lts

# 実際に実行して、バージョンを確認してみる
$ node -v
v20.15.1

# .prototoolsを見て、適切なバージョンを選んでくれるか確かめる
$ proto pin node latest
$ proto use
$ node -v
v22.5.1
```

もし、実行できない場合は[`proto diagnose`](https://moonrepo.dev/docs/proto/commands/diagnose)を使って原因を探るなりするといいかもしれません。

## おまけ

Pacman hooksを使って、パッケージのアップグレード時に`proto outdated --include-global --update`を使ってツールチェーンを最新にするサンプル

```conf
[Trigger]
Operation = Upgrade
Type = Package
Target = *

[Action]
Depends = proto-bin
When = PostTransaction
Exec = /usr/bin/su <ユーザー名> -c 'yes | proto outdated --include-global --update'
```

`proto outdated`を使ったアップデートは、Node.jsのLTSをインストールしていてもLatestの方をとってこようとするので、自動更新はオススメしない。
