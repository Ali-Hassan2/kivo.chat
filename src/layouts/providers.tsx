'use client'

import React, { PropsWithChildren } from 'react'
import NextTopLoader from 'nextjs-toploader'

const ProvidersLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <NextTopLoader color="#0f0e0eff" showSpinner={false} height={3} />
      {children}
    </>
  )
}

export default ProvidersLayout
