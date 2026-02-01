'use client'

import React, { useEffect } from 'react'
import { Box, Text } from '@radix-ui/themes'
import { Loader2 } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { anotherIdentitySchema } from '@/guards'
import { AuthStatus, CountData } from '@/types'
import { showToast } from '@/utils'

interface NewProfileBoxProps {
  countData: CountData | null
  form: UseFormReturn<z.infer<typeof anotherIdentitySchema>>
  isCreatingNewProfile: boolean
  newProfileCreationResponse: AuthStatus
  createNewProfile: (data: z.infer<typeof anotherIdentitySchema>) => void
}
const NewProfileBox = ({
  form,
  countData,
  isCreatingNewProfile,
  newProfileCreationResponse,
  createNewProfile,
}: NewProfileBoxProps) => {
  useEffect(() => {
    if (
      newProfileCreationResponse.success &&
      newProfileCreationResponse.success.length > 0
    ) {
      showToast(newProfileCreationResponse.success, 'success')
    }
    if (
      newProfileCreationResponse.error &&
      newProfileCreationResponse.error.length > 0
    ) {
      showToast(newProfileCreationResponse.error, 'error')
    }
  }, [newProfileCreationResponse])

  return (
    <Box>
      <Box className="w h-20 w-fit rounded-lg bg-sky-300">
        <Box className="w-77 rounded-lg bg-gray-100 p-4">
          <Text className="text-4xl font-bold">
            Total Profiles: {countData?.current_count}
          </Text>
        </Box>
      </Box>
      <Box className="duration:300 mt-4 flex flex-col gap-2 rounded-lg border-2 border-gray-300 bg-white p-8 transition-all ease-in-out">
        <Text className="border-b border-black/40 pb-6 text-2xl font-bold">
          Create Your Profile: {countData?.new_count}
        </Text>
        <Box>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(createNewProfile)}>
              {' '}
              {/* //TODO: form.handleSubmit */}
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Usernmae</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                    </FormItem>
                  )
                }}
              ></FormField>
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                    </FormItem>
                  )
                }}
              />
              <FormField
                name="fullName"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                    </FormItem>
                  )
                }}
              />
              <FormField
                name="bio"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" />
                      </FormControl>
                    </FormItem>
                  )
                }}
              />
              <Box className="mt-4 flex w-full justify-end">
                <Button
                  className="cursor-pointer rounded-md rounded-none border-2 border-gray-900 bg-transparent p-6 text-lg text-black shadow-lg hover:border-blue-700 hover:bg-blue-700 hover:text-white"
                  type="submit"
                  disabled={isCreatingNewProfile}
                >
                  {isCreatingNewProfile ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    'Create'
                  )}
                </Button>
              </Box>
            </form>
          </Form>
        </Box>
      </Box>
    </Box>
  )
}

export { NewProfileBox }
