---
title: Nixでbtopをインストールして使うときにGPUに関する情報も閲覧したい
publishedAt: '2026-02-15'
categories:
  - Nix
  - btop
---

[btop](https://github.com/aristocratos/btop)という[htop](https://htop.dev/)を更におしゃれなTUIにしたリソース監視ツールがあるのですが、
搭載しているGPUに合わせて適切なドライバーとライブラリを用意してビルドすればGPUのリソースもリアルタイムで閲覧することができます。

上記の機能は、nixpkgsに登録されているbtopパッケージをoverrideして`cudaSupport`または`rocmSupport`を`true`にするとすぐ使えるようになるので、その紹介になります。（デフォルトではどちらも`false`になっています）

## NVIDIA製GPUの場合

`cudaSupport`を`true`にしてインストールします。

```nix
{ pkgs, ...}: {
  environment.systemPackages = with pkgs; [
    btop.override {
      cudaSupport = true;
    }
  ];
}
```

## AMD製GPUの場合

`rocmSupport`を`true`にしてインストールします。

```nix
{ pkgs, ... }: {
  environment.systemPackages = with pkgs; [
    btop.override {
      rocmSupport = true;
    }
  ];
}
```

## 余談

[NixOS Searchで検索](https://search.nixos.org/packages?channel=unstable&query=btop)してみると、`btop`をベースにして`btop-rocm`と`btop-cuda`がそれぞれあるので`override`を使わなくても、これらのパッケージをインストールしてもいいかも？

ただ、NVIDIA製GPUとAMD製GPUを両方搭載していて、それぞれの情報が見たい場合は結局`override`を使わざるをえなさそう。

## 参考情報

- https://github.com/aristocratos/btop?tab=readme-ov-file#gpu-compatibility
- https://github.com/NixOS/nixpkgs/blob/nixos-unstable/pkgs/by-name/bt/btop/package.nix
