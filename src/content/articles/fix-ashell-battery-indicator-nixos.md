---
title: NixOSでashellを使ったときにバッテリーの残量が表示されない問題
publishedAt: "2026-02-21"
categories:
  - NixOS
  - ashell
  - upower
---

## 背景

Home-Managerで`ashell`を使うために以下のように設定したけど、
ノートPCのバッテリー残量が表示されなかった。

```nix
# 一部省略
{...}: {
  programs.ashell = {
    enable = true;
    systemd = {
      enable = true;
      target = "hyprland-session.target";
    };
    modules = {
      right = [
        "SystemInfo"
        [
          "Clock"
          "Privacy"
          "Settings"
        ]
      ];
    };

    settings = {
      indicators = [
        "Battery"
        "Bluetooth"
        "Network"
        "Vpn"
        "Audio"
      ];
    };
  };
}
```

電源周りの設定は以下のとおり。

```nix
{...}: {
  powerManagement.enable = true;
  services.tlp.enable = true;
}
```

## 原因

`ashell`はバッテリー残量の情報を[`upower`](https://upower.freedesktop.org/)サービスから得ようとするため

READMEやドキュメントに記載はないが、[GitHubでコード検索](https://github.com/search?q=repo%3AMalpenZibo%2Fashell%20upower&type=code)すると確かに`upower`を使用していることが分かる。

## 解決策

`services.upower.enable`を`true`にして、`upower`サービスを有効にする。

```nix
{...}: {
  services.upower.enable = true;
}
```
