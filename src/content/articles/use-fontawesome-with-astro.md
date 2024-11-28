---
title: Font Awesome 6をAstroで使う
publishedAt: '2024-11-27'
categories:
  - Font Awesome
  - Astro
---

このサイトをNext.jsからAstroに置き換えた際に、Font Awesomeを導入したので、その手順をメモとして残しておきます。

## インストールするもの

[Using a Package Manager | Font Awesome Docs](https://docs.fontawesome.com/web/setup/packages#svg-icon-packages)を参考に、`@fortawesome/fontawesome-svg-core`と用途に合わせて`@fortawesome/free-solid-svg-icons`等のパッケージをインストールしましょう。

```sh
# 必須
npm install --save @fortawesome/fontawesome-svg-core

# 一つ以上選ぶ
npm install --save @fortawesome/free-solid-svg-icons
npm install --save @fortawesome/free-regular-svg-icons
npm install --save @fortawesome/free-brands-svg-icons
```

## 共通レイアウトにスタイルを追加する

Font Awesomeを使用するページでは、`@fortawesome/fontawesome-svg-core`に含まれる`styles.css`をインポートする必要があります。
これを追加し忘れると、SVGアイコンに割り当てられるクラスに対してスタイルが当たらず、レイアウトシフト発生の原因になったりするため必ず追加しましょう。

Font Awesomeを使用するページだけに対してスタイルをインポートするのも手ですが、共通レイアウトがあるならそこにインポート文を書いておくのが一番楽です。
そこらへんはお好みでお願いします。

```astro
---
import '@fortawesome/fontawesome-svg-core/styles.css'
---

<!doctype html>
<html lang="ja">
  <head>
    <title>Example Project</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

## アイコンを使用する

[`icon(iconDefinition, params)`](https://docs.fontawesome.com/apis/javascript/methods#iconicondefinition-params)というアイコンをSVGでレンダリングしてくれる関数があるので、それを使用して[`set:html`ディレクティブ](https://docs.astro.build/en/reference/directives-reference/#sethtml)にレンダリングされたSVGを渡してあげれば、アイコンを挿入することができます。

```astro
---
import { icon } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const starIcon = icon(faStar)
---

<Fragment set:html={starIcon.icon.html} />
```

コンポーネントごとに上のようにやっても構いませんが、どうせなら`FontAwesomeIcon.astro`という名前で新しくコンポーネントを作って、使い回しできるようにしておくと便利です。

```astro
---
import { icon, type IconLookup, type IconName, type IconParams } from '@fortawesome/fontawesome-svg-core'

interface Props {
  icon: IconName | IconLookup
  params?: IconParams
}

const { html } = icon(Astro.props.icon, Astro.props.params)
---

<Fragment set:html={html} />
```

使用例は以下の通りです。

```astro
---
import FontAwesomeIcon from '@/components/FontAwesomeIcon.astro'
import { faStar } from '@fortawesome/free-solid-svg-icons'
---

<FontAwesomeIcon icon={faStar} />
```
