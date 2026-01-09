import React, { useEffect } from 'react'
import { Box } from '@radix-ui/themes'
import { Text } from '@radix-ui/themes/components/callout'
import { UseFormReturn } from 'react-hook-form'
import * as z from 'zod'
import { SwitchDemo } from '@/components'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { accmSchema } from '@/guards'
import { AuthStatus } from '@/types'
import { showToast, useAuthRedirection } from '@/utils'

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

  useEffect(() => {
    if (isAcceptingMessagesResponseOverallNetwork.success) {
      const successMessage = isAcceptingMessagesResponseOverallNetwork.success
      showToast(successMessage, 'success')
    } else {
      const errorMessage = isAcceptingMessagesResponseOverallNetwork.error
      showToast(errorMessage, 'error')
    }
  }, [isAcceptingMessagesResponseOverallNetwork])
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
            <form>
              <FormField
                name="accm"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>
                        {field.value
                          ? 'Accepting Messages'
                          : 'Not Accepting Messages'}
                      </FormLabel>
                      <FormControl>
                        <SwitchDemo
                          checked={field.value}
                          onCheckedChange={(value) => {
                            field.onChange(value)
                            console.log('The field value is:', value)
                            onSubmit({
                              accm: value,
                            })
                          }}
                          disabled={isTogglingIsAcceptingMessages}
                        />
                      </FormControl>
                    </FormItem>
                  )
                }}
              />
            </form>
          </Form>
        </Box>
      </Box>
    </Box>
  )
}

export default ProfileBoard
