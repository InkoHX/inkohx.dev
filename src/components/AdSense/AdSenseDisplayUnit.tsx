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

  return (
    <>
      <ins
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className={`adsbygoogle ${className}`}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </>
  )
}

export default AdSenseDisplayUnit
