'use client'

import React, { PropsWithChildren } from 'react'

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-[91vh] w-full border-4 bg-gray-100">{children}</div>
  )
}

export default DashboardLayout
