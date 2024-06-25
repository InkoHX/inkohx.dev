import React from 'react'

export const Timeline: React.FC<React.PropsWithChildren> = props => {
  return (
    <div className="relative space-y-8 py-12 pl-16 before:absolute before:left-8 before:top-0 before:-z-10 before:h-full before:w-2 before:-translate-x-1/2 before:bg-slate-300 before:content-[''] lg:pl-0 lg:before:left-1/2">
      {props.children}
    </div>
  )
}
