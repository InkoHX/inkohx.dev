'use client'

import React from 'react'

export interface WebsiteProps {
  imageUrl: string
  websiteName: string
  link: string
}

export const WebsiteCard: React.FC<WebsiteProps> = props => {
  const imgRef = React.useRef<HTMLImageElement>(null)
  const [imageWidth, setImageWidth] = React.useState(0)
  const [imageHeight, setImageHeight] = React.useState(0)

  React.useEffect(() => {
    const img = imgRef.current
    if (!img) return

    setImageHeight(img.height)
    setImageWidth(img.width)

    const resizeObserver = new ResizeObserver((entries, _observer) => {
      const { blockSize: height, inlineSize: width } =
        entries[0].contentBoxSize[0]

      setImageHeight(height)
      setImageWidth(width)
    })

    resizeObserver.observe(img)
    return () => resizeObserver.disconnect()
  }, [])

  return (
    <a href={props.link} className="group relative block">
      <img
        src={props.imageUrl}
        data-website-name={props.websiteName}
        className="h-auto min-h-64 w-full group-hover:grayscale-0 sm:grayscale"
        alt=""
        ref={imgRef}
      />
      <div
        className="absolute left-0 top-0 flex items-center justify-center bg-slate-200/70 px-8 text-4xl font-black transition lg:opacity-0 lg:hover:bg-slate-200/80 lg:hover:opacity-100"
        style={{ width: `${imageWidth}px`, height: `${imageHeight}px` }}
      >
        {props.websiteName}
      </div>
    </a>
  )
}
