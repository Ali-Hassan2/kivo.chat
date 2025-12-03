import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const page = () => {
  return (
    <div className="flex h-[100vh] w-[100vw] items-center justify-center border-4 border-red-500 text-white">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Kivo Auth</CardTitle>
          <CardDescription>
            Login to your account with valid credentials.
          </CardDescription>
        </CardHeader>
        <CardContent>
            
        </CardContent>
      </Card>
    </div>
  )
}

export default page
