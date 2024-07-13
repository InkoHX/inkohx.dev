---
title: HTMLImageElementのloadイベントをキャッチできないケースがある
publishedAt: '2024-07-13'
modifiedAt: '2024-07-13'
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
} else {
  console.log('画像はまだ読み込まれていません。')
  img.addEventListener('load', () => {
    console.log('画像が読み込まれました。')
  })
}
```

### HTMLImageElement#complete の罠

[MDN](https://developer.mozilla.org/ja/docs/Web/API/HTMLImageElement/complete)を見てみると、

> 以下のいずれかを満たす場合、画像の読み込みが完了したと見なされます。
>
> - `src`属性も`srcset`属性も指定されていない場合
> - `srcset`属性が存在せず、`src`属性は指定されていても空文字列 (`""`) である場合
> - 画像リソースが完全に取得され、レンダリング/合成のためにキューに入れられた場合
> - 画像要素が事前に、画像が完全に利用可能であり、使用可能であると判断している場合
> - 画像が「壊れている」。つまり、エラーが発生したか、画像の読み込みが無効になっているために画像の読み込みができない場合

このように、画像の読み込みが完了したと見なされるケースが、先に読み込まれた場合だけはないことにも注意する必要がありそう。

## 余談

これ別に`HTMLImageElement`に限った話じゃないような気がする。
