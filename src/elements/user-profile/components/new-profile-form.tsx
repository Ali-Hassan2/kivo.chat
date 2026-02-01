'use client'

import React from 'react'
import { Box, Text } from '@radix-ui/themes'
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
import { CountData } from '@/types'

interface NewProfileBoxProps {
  countData: CountData | null
  form: UseFormReturn<z.infer<typeof anotherIdentitySchema>>
}
const NewProfileBox = ({ form, countData }: NewProfileBoxProps) => {
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
            <form>
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
                  className="cursor-pointer border-2 border-blue-500 bg-transparent p-6 text-lg text-black shadow-lg hover:border-blue-700 hover:bg-blue-700 hover:text-white"
                  type="submit"
                >
                  Create
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
