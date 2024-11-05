import React from 'react'

import { mergeClassName } from '@/utils/mergeClassName'

export interface HeroProps {
  title: React.ReactNode
  subtitle: React.ReactNode
  imageUrl?: string
}

export const Hero: React.FC<HeroProps> = props => {
  return (
    <div
      className={mergeClassName(
        'py-48',
        props.imageUrl &&
          'bg-slate-100/90 bg-contain bg-right-bottom bg-no-repeat bg-blend-lighten lg:bg-blend-normal'
      )}
      style={{
        backgroundImage: props.imageUrl ? `url('${props.imageUrl}')` : void 0,
      }}
    >
      <h1 className="text-4xl font-bold leading-snug md:text-7xl">
        {props.title}
      </h1>
      <div className="max-w-prose">
        <p className="mt-4 text-2xl text-slate-700 md:mt-8">{props.subtitle}</p>
      </div>
    </div>
  )
}
