'use client'

import React, { PropsWithChildren } from 'react'

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return <div className="flex h-[91vh] w-full">{children}</div>
}

export default DashboardLayout
