---
title: Font Awesome 6をAstroで使う
publishedAt: '2024-11-27'
modifiedAt: '2024-11-29'
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

## コンポーネント化しよう

使用する箇所で毎回上のようにやっても構いませんが、面倒くさいので`FontAwesomeIcon.astro`という名前で新しくコンポーネントを作って、使い回しできるようにしておくと便利です。
加えて、共通レイアウトにスタイルを追加せずとも、コンポーネントにインポート文を追加することで使用するページのみにスタイルを追加できるので、おすすめです。

```astro
---
import '@fortawesome/fontawesome-svg-core/styles.css'

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

## Reactを併用している場合

[`@fortawesome/react-fontawesome`](https://docs.fontawesome.com/v5/web/use-with/react)を使用してReactでFont Awesomeのアイコンを使う場合、[`autoAddCss`](https://docs.fontawesome.com/apis/javascript/configuration#autoaddcss)を無効にしないと、既に挿入した`import '@fortawesome/fontawesome-svg-core/styles.css'`の内容と重複したスタイルが挿入されてしまいます。
これを防ぐため、`FontAwesomeIcon`コンポーネントをラップして`autoAddCss`を無効にする処理を入れて、使い回すようにすることをオススメします。

```tsx
import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

import { config as fontAwesomeConfig } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon as FontAwesomeIconOriginal } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'

fontAwesomeConfig.autoAddCss = false

const FontAwesomeIcon: React.FC<FontAwesomeIconProps> = (props) => {
  return <FontAwesomeIconOriginal {...props} />
}

export default FontAwesomeIcon
```
