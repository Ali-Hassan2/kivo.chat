import React from 'react'
import { Box } from '@radix-ui/themes'
import { Text } from '@radix-ui/themes/components/callout'
import { UseFormReturn } from 'react-hook-form'
import * as z from 'zod'
import { SwitchDemo } from '@/components'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { accmSchema } from '@/guards'
import { AuthStatus } from '@/types'
import { useAuthRedirection } from '@/utils'

interface profileBoardProps {
  form: UseFormReturn<z.infer<typeof accmSchema>>
  onSubmit: (data: z.infer<typeof accmSchema>) => void
  isAcceptingMessagesResponseOverallNetwork: AuthStatus
  isTogglingIsAcceptingMessages: boolean
}

const ProfileBoard = ({
  form,
  onSubmit,
  isAcceptingMessagesResponseOverallNetwork,
  isTogglingIsAcceptingMessages,
}: profileBoardProps) => {
  const user = useAuthRedirection()
  const handleSubmit = async (data: z.infer<typeof accmSchema>) => {
    await onSubmit(data)
  }
  return (
    <Box className="flex flex-col items-center justify-center">
      <Box className="section flex w-full items-center justify-start border-b p-8">
        <Label className="text-3xl font-semibold">
          Welcome, {user?.fullName} to your Kivo Profile.
        </Label>
      </Box>
      <Box className="flex w-full flex-col items-center justify-center">
        <Box className="flex w-full items-center justify-between px-8 pt-2">
          <Text className="text-2xl font-semibold">
            Change is accepting Messages
          </Text>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="accm"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <SwitchDemo {...form} />
                      </FormControl>
                    </FormItem>
                  )
                }}
              />
            </form>
          </Form>
          <SwitchDemo />
        </Box>
      </Box>
    </Box>
  )
}

export default ProfileBoard
