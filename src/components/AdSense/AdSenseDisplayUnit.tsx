'use client'

import React from 'react'

const AdSenseDisplayUnit: React.FC<{ slot: string; className?: string }> = ({
  slot,
  className = '',
}) => {
  React.useEffect(() => {
    const obj = window as unknown as {
      adsbygoogle?: Array<Record<any, unknown>>
    }

    ;(obj.adsbygoogle ??= []).push({})
  }, [])

  if (process.env.NODE_ENV === 'production') {
    return (
      <>
        <ins
          // eslint-disable-next-line tailwindcss/no-custom-classname
          className={`adsbygoogle ${className}`}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="false"
        />
      </>
    )
  } else {
    return (
      <div
        className={`adsbygoogle flex min-h-64 w-full items-center justify-center bg-slate-600 text-white ${className}`}
      >
        広告が表示されます
      </div>
    )
  }
}

export default AdSenseDisplayUnit
