---
title: HTMLImageElementのloadイベントをキャッチできないケースがある
publishedAt: '2024-07-13'
categories:
  - JavaScript
  - HTML
  - Web
---

`document.querySelector('img')`などで`HTMLImageElement`を取得して、`load`イベントのリスナーを追加してもイベントをキャッチできず画像が読み込まれたか分からんというケースに遭遇したので、対処方法からなぜそうなるのかについて書きました。

## 原因

画像の方が先に読み込まれてしまったことで、`load`イベントのリスナーを追加する前に`load`イベントが発火したがゆえに、イベントをキャッチできなかったことが原因です。

一番最初、キャッシュされた画像のみ`load`イベントでキャッチできなかったので、キャッシュに悪さされてるのかと思ってました。

## 対処方法

`load`イベントのリスナーを追加する前に`HTMLImageElement#complete`を見ることで、画像が既に読み込まれているかを確認できるので、それを利用するといいでしょう。

```js
const img = document.querySelector('img')

if (img.complete) {
  console.log('画像は既に読み込まれています。')
}
else {
  console.log('画像はまだ読み込まれていません。')
  img.addEventListener('load', () => {
    console.log('画像が読み込まれました。')
  })
}
```

### HTMLImageElement#complete の罠

[MDN](https://developer.mozilla.org/ja/docs/Web/API/HTMLImageElement/complete)を見てみると、画像の読み込みが完了したと見なされるケースが、**先に読み込まれた場合だけはない**ことにも注意する必要がありそう。

## 余談

これ別に`HTMLImageElement`に限った話じゃないような気がする。
