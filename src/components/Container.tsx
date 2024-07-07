import React from 'react'

import { mergeClassName } from '@/utils/mergeClassName'

export type ContainerProps<T extends React.ElementType> = { as?: T }

export const Container = <T extends React.ElementType = 'div'>({
  as,
  children,
  ...props
}: ContainerProps<T> &
  Omit<
    React.ComponentPropsWithoutRef<T>,
    keyof ContainerProps<T>
  >): React.JSX.Element => {
  const Element = as ?? 'div'

  return (
    <Element
      {...props}
      className={mergeClassName(props.className, 'mx-auto max-w-7xl px-4')}
    >
      {children}
    </Element>
  )
}
