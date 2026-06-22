---
title: '「Xid 79: GPU has fallen off the bus」をどうにかできた'
publishedAt: '2026-06-22'
categories:
  - Linux
  - NVIDIA
  - PCIe
---

LinuxでNVIDIA系のGPUを使うと、高確率で`Xid 79: GPU has fallen off the bus`というエラーが発生し、Hyprlandが落ちて画面が真っ暗になるという現象に遭遇した。（クラッシュ後に`journalctl`を見てたら発覚）\
初めて遭遇したのは、ブラウザでYouTubeを見てたとき

調べてみると、LinuxからNVIDIAのGPUにアクセスできなくなったときに発生するエラーらしい

## エラーの内容について

公式ドキュメントによると以下の通りらしい

> This event is logged when the GPU driver attempts to access the GPU over its PCI Express connection and finds that the GPU is not accessible.\
> This event is often caused by hardware failures on the PCI Express link causing the GPU to be inaccessible due to the link being brought down. Reviewing system event logs and kernel PCI event logs may provide additional indications of the source of the link failures.\
> This event may also be cause by failing GPU hardware or other driver issues.\

日本語に翻訳すると

> このイベントは、GPUドライバーがPCI Express接続経由でGPUへアクセスしようとした際に、GPUへアクセスできないことを検出した場合に記録されます。\
> このイベントは、多くの場合、PCI Expressリンク上のハードウェア障害によって発生し、その結果としてリンクがダウンし、GPUへアクセスできなくなったことが原因です。システムのイベントログやカーネルのPCI関連イベントログを確認すると、リンク障害の原因を示す追加情報が見つかる場合があります。\
> また、このイベントはGPUハードウェア自体の故障や、その他のドライバーの問題によって発生することもあります。

ということらしいが、PCIe Link Speedを固定化することでこの安定化した事例があるそうなので、まずはこれを試してみる。([参考情報](https://github.com/NVIDIA/open-gpu-kernel-modules/issues/974#issuecomment-4311518502))

## 動作環境

- マザボ: ASRock B760M-HDV/M.2 D4
- OS: NixOS 26.11 (Kernel 6.18.35)
- GPU: GeForce RTX 5060 Ti 8GB
  - ドライバー：NVIDIA Linux Open GPU Kernel Module v595.80

## 変更方法

1. PCを再起動してUEFIの設定画面に入る（F2）
2. `Advanced`から`Chipset Configuration`を開く
3. `PCIE Link Speed`と書かれた項目を`Auto`からすべて固定化（`Gen4`または`Gen3`で固定化）
4. `Exit`タブで`Save Changes and Exit`を選択して`Yes`で保存

## 変更後の様子

二週間くらい利用しているが、今のところ同じエラーは発生していないので成功ということで良さそう。

これでも直らないなら、以下の原因も考えられるらしい

- マザボやGPUが壊れている（ハードウェアの問題）
- GPUに十分な電源が供給されていない
- 熱暴走といった問題が発生している

## その他メモ

- もしかしたら、NVIDIAドライバーの最新版なら問題なく動いたりした？
  - 現時点で最新版がv610.43.02だし...
- Windows 11とDual Bootしてるけど、Windows 11だと何の問題も怒らないので単純にNVIDIAのLinux向けドライバーに何らかの原因がありそうな気がしている

いずれにせよ私は直ったので、ヨシ！

## 参考情報

- https://github.com/NVIDIA/open-gpu-kernel-modules/issues/974#issuecomment-4311518502
- https://forums.developer.nvidia.com/t/gpu-has-fallen-off-the-bus/217357/3
