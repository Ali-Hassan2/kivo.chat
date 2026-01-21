import React, { useEffect, useState } from 'react'
import { Box } from '@radix-ui/themes'
import { Text } from '@radix-ui/themes/components/callout'
import { UseFormReturn } from 'react-hook-form'
import { useToggle } from 'react-use'
import * as z from 'zod'
import { ArrowDownIcon, InfoIcon, SwitchDemo } from '@/components'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { accmSchema, flagSchema } from '@/guards'
import { AuthStatus } from '@/types'
import { showToast, useAuthRedirection } from '@/utils'
import { cn } from '@/utils/cn'

interface profileBoardProps {
  form: UseFormReturn<z.infer<typeof accmSchema>>
  onSubmit: (data: z.infer<typeof accmSchema>) => void
  isAcceptingMessagesResponseOverallNetwork: AuthStatus
  isTogglingIsAcceptingMessages: boolean
  formForIsShowingIdentity: UseFormReturn<z.infer<typeof flagSchema>>
  isShowingIdentityResponse: AuthStatus
  isChangingModeForIdentity: boolean
  changeModeForNewIdentity: (data: z.infer<typeof flagSchema>) => void
  modeForGettingCurrentIdentityStatus: boolean
  isLoadingForGettingCurrentIdentityStatus: boolean
  CurrentStatusForIsAcceptingMessages: boolean
  isLoadingGettingStatusCurrentForIsAcceptingMessages: boolean
}

const ProfileBoard = ({
  form,
  onSubmit,
  isAcceptingMessagesResponseOverallNetwork,
  isTogglingIsAcceptingMessages,
  formForIsShowingIdentity,
  isShowingIdentityResponse,
  isChangingModeForIdentity,
  changeModeForNewIdentity,
  modeForGettingCurrentIdentityStatus,
  isLoadingForGettingCurrentIdentityStatus,
  CurrentStatusForIsAcceptingMessages,
  isLoadingGettingStatusCurrentForIsAcceptingMessages,
}: profileBoardProps) => {
  const user = useAuthRedirection()
  useEffect(() => {
    if (typeof CurrentStatusForIsAcceptingMessages === 'boolean') {
      form.setValue('accm', CurrentStatusForIsAcceptingMessages, {
        shouldDirty: false,
        shouldTouch: false,
      })
    }
    if (isAcceptingMessagesResponseOverallNetwork.success) {
      const successMessage = isAcceptingMessagesResponseOverallNetwork.success
      if (successMessage.length > 0) {
        showToast(successMessage, 'success')
      }
    } else {
      const errorMessage = isAcceptingMessagesResponseOverallNetwork.error
      if (errorMessage.length !== 0) {
        showToast(errorMessage, 'error')
      }
    }
  }, [
    isAcceptingMessagesResponseOverallNetwork,
    CurrentStatusForIsAcceptingMessages,
    form,
  ])

  useEffect(() => {
    if (typeof modeForGettingCurrentIdentityStatus === 'boolean') {
      formForIsShowingIdentity.setValue(
        'flag',
        modeForGettingCurrentIdentityStatus,
        {
          shouldDirty: false,
          shouldTouch: false,
        },
      )
    }
    if (isShowingIdentityResponse.success) {
      const successMessage = isShowingIdentityResponse.success
      if (successMessage.length !== 0) {
        showToast(successMessage, 'success')
      }
    } else {
      const errorMessage = isShowingIdentityResponse.error
      if (errorMessage.length !== 0) {
        showToast(errorMessage, 'error')
      }
    }
  }, [
    isShowingIdentityResponse,
    modeForGettingCurrentIdentityStatus,
    formForIsShowingIdentity,
  ])

  const [setExpandDetailMenu, toggleExpandMenu] = useToggle(false)
  const [renderText, setRenderText] = useToggle(false)

  useEffect(() => {
    if (setExpandDetailMenu) {
      const timer = setTimeout(() => setRenderText(true), 50)
      return () => clearTimeout(timer)
    } else {
      setRenderText(false)
    }
  }, [setExpandDetailMenu])
  return (
    <Box className="flex flex-col items-center justify-center bg-sky-100">
      <Box className="section flex w-full items-center justify-start border-b border-black/20 py-8 pl-1">
        <Label className="text-5xl font-bold">Welcome, {user?.fullName}</Label>
      </Box>
      <Box
        className={cn(
          'duration:200 mt-8 flex w-full flex-col items-center justify-center transition-all',
        )}
      >
        <Box
          className={cn(
            'duration:300 ease relative h-22 w-full rounded-lg bg-black bg-gray-300 transition-all',
            setExpandDetailMenu ? 'h-59' : 'h-28',
          )}
        >
          <Box
            className={cn(
              'duration:300 absolute left-0 flex w-full rounded-lg bg-yellow-200 p-8 py-22 shadow-lg transition-all',
              setExpandDetailMenu
                ? 'flex h-57 flex-col items-start justify-between pt-4'
                : 'flex h-20 flex-col items-center justify-between pt-4',
            )}
          >
            <Box className="header mt-2 flex w-full items-center justify-between">
              <Text className="text-2xl font-semibold">
                Change is accepting Messages
              </Text>
              <Box className={cn('flex gap-2')}>
                <Form {...form}>
                  <form>
                    <FormField
                      name="accm"
                      control={form.control}
                      render={({ field }) => {
                        return (
                          <FormItem>
                            {/* <FormLabel>
                        {field.value
                          ? 'Accepting Messages'
                          : 'Not Accepting Messages'}
                      </FormLabel> */}
                            <FormControl>
                              <Box className="mt-4">
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
                              </Box>
                            </FormControl>
                          </FormItem>
                        )
                      }}
                    />
                  </form>
                </Form>
                <Box
                  className="relative bottom-1 flex h-14 cursor-pointer items-center justify-center gap-3 rounded-sm bg-yellow-500 px-5 shadow-lg"
                  onClick={toggleExpandMenu}
                >
                  <Text className="text-lg font-semibold">Details</Text>

                  <InfoIcon />
                </Box>
              </Box>
            </Box>
            {setExpandDetailMenu && renderText && (
              <Box className="mt-4 ml-1 w-full rounded-md py-4 transition-all duration-300">
                <Text size="3" className="font-semibold">
                  Accepting Messages Mode
                </Text>

                <Text size="2" color="gray" className="mt-2 leading-relaxed">
                  When enabled, anyone can send you messages. Your inbox is
                  open, allowing seamless communication.
                </Text>

                <Text size="2" color="gray" className="mt-2 leading-relaxed">
                  When disabled, your inbox is closed. You will not receive
                  messages until you turn this mode back on.
                </Text>
              </Box>
            )}
          </Box>
        </Box>
        <Box className="relative mt-10 w-full">
          <Box className="h-20 w-full rounded-lg bg-gray-300" />
          <Box
            className={cn(
              'absolute bottom-2 left-0 flex w-full items-center justify-between rounded-lg bg-yellow-200 p-8 shadow-lg',
            )}
          >
            <Text className="text-2xl font-semibold">Is Showing Identity</Text>
            <Form {...formForIsShowingIdentity}>
              <form>
                <FormField
                  name="flag"
                  control={formForIsShowingIdentity.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <SwitchDemo
                          checked={field.value}
                          onCheckedChange={(value) => {
                            field.onChange(value)
                            changeModeForNewIdentity({ flag: value })
                          }}
                          disabled={
                            isChangingModeForIdentity &&
                            isLoadingForGettingCurrentIdentityStatus
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ProfileBoard
