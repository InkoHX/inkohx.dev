import React from 'react'

import { mergeClassName } from '@/utils/mergeClassName'

export interface TimelineItemProps {
  position: 'left' | 'right'
  ping?: boolean
}

export const TimelineItem: React.FC<
  React.PropsWithChildren<TimelineItemProps>
> = props => {
  return (
    <div
      className={mergeClassName(
        "relative grid-cols-[1fr_4rem_1fr] before:absolute before:-left-8 before:top-[calc(50%-0.5rem)] before:z-10 before:size-4 before:-translate-x-1/2 before:rounded-full before:bg-primary-600 before:content-[''] lg:grid lg:before:left-1/2",
        props.ping &&
          "after:absolute after:-left-8 after:top-[calc(50%-0.5rem)] after:z-10 after:size-4 after:origin-right after:-translate-x-1/2 after:animate-ping after:rounded-full after:bg-primary-600 after:content-[''] lg:after:left-1/2"
      )}
    >
      <div
        className={props.position === 'left' ? 'col-start-1' : 'col-start-3'}
      >
        {props.children}
      </div>
    </div>
  )
}
