---
title: Discordのフォントがいきなりセリフ体になったので、サンセリフ体を適用させる
publishedAt: '2024-11-03'
modifiedAt: '2024-11-03'
categories:
  - フォント
  - Linux
  - Discord
  - Fontconfig
---

かなり前に記事のタイトル通りのことが起こったので、それを解決したときの方法を書いた記事になります。

## 現状

![](/img/articles/change-discord-font-to-sans-serif/before.png)

画像の通り、セリフ体とサンセリフ体がごっちゃになって見た目がえらいことになっています。  
ちなみに、セリフ体のほうは**Noto Serif**が適用されているようです。

### インストールしているフォント

この現象に出くわしたマシンにはArch Linuxを入れていて、以下のフォントが入っています。

- adobe-source-code-pro-fonts 2.042u+1.062i+1.026vf-2
- cantarell-fonts 1:0.303.1-2
- noto-fonts 1:24.9.1-1
- noto-fonts-cjk 20230817-2
- noto-fonts-emoji 1:2.047-1
- noto-fonts-extra 1:24.9.1-1
- ttf-liberation 2.1.5-2
- ttf-moralerspace 1.0.2-1

## 原因について

DiscordでDevToolsを開き、要素に適用されている`font-family`を調べてみたところ、以下のような記述を見つけました。

```css
'gg sans', 'Hiragino Sans', 'ヒラギノ角ゴ ProN W3', 'Hiragino Kaku Gothic ProN', メイリオ, Meiryo, Osaka, 'MS PGothic', 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif
```

Noto Sansがインストールされているので、本来ならNoto Sansが選択されてセリフ体のフォントが表示されるはずですが、なにかしら問題があるのかスルーされてるっぽいです。  
そして、`sans-serif`までいって何故かセリフ体のフォントが適用されていると...

**なんで？**

## 解決

とりあえずDiscordだけがこんなことになってしまっているので、`sans-serif`を`Noto Sans`に割り当てるようにFontconfigを使って設定してみます。

`~/.config/fontconfig/fonts.conf`に下記の記述を追加します。

```xml
<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "urn:fontconfig:fonts.dtd">
<fontconfig>
  <match>
    <test name="prgname" target="pattern" compare="eq">
      <string>discord</string>
    </test>
    <test name="family">
      <string>sans-serif</string>
    </test>
    <edit mode="assign" name="family">
      <string>Noto Sans</string>
      <string>Noto Sans CJK JP</string>
    </edit>
  </match>
</fontconfig>
```

設定ファイルを追加したあとは、`fc-cache -f`でキャッシュを更新して、Discordを再起動します。

![](/img/articles/change-discord-font-to-sans-serif/after.png)

おぉ、直りました。

## おまけ

他のアプリケーションでも似たような現象が起きている場合は、以下のようにすると全てのアプリケーションに設定を反映できます。

```xml
<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "urn:fontconfig:fonts.dtd">
<fontconfig>
  <alias>
    <family>sans-serif</family>
    <prefer>
      <family>Noto Sans</family>
      <family>Noto Sans CJK JP</family>
    </prefer>
  </alias>
</fontconfig>
```

## 参考

- [fonts-conf - `fonts.conf`のドキュメント](https://www.freedesktop.org/software/fontconfig/fontconfig-user.html)
- [フォント設定 - ArchWiki](https://wiki.archlinux.jp/index.php/%E3%83%95%E3%82%A9%E3%83%B3%E3%83%88%E8%A8%AD%E5%AE%9A)
