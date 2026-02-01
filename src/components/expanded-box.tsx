import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Text } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { useToggle } from 'react-use'
import * as z from 'zod'
import { NewProfileBox } from '@/elements/user-profile/components'
import { anotherIdentitySchema } from '@/guards'
import { useCreateNewProfile, useGetAllProfiles } from '@/hooks'
import { CountData } from '@/types'
import { showToast } from '@/utils'
import { cn } from '@/utils/cn'
import { AlreadyProfiles } from './already-prof'
import { InfoIcon } from './icons/info'
import { ProfileCreationSkeleton } from './profile-creation-loading-skeleton'
import { RealIdentityBox } from './real-profile-box'
import { Button } from './ui/button'

interface ExpandedBox {
  title: string
  Details: React.ReactNode
  children: React.ReactNode
  variant: string
  user: any
  countData: CountData | null
  isGettingCountData: boolean
  getCountProfileAction?: () => Promise<void>
}

const ExpandedBox = ({
  title,
  Details,
  children,
  variant,
  user,
  countData,
  isGettingCountData,
  getCountProfileAction,
}: ExpandedBox) => {
  const { isCreatingNewProfile, newProfileCreationResponse, createNewProfile } =
    useCreateNewProfile()
  const {
    isGettingProfilesData,
    errorMessageInGettingProfilesData,
    profilesData,
    getAllProfilesForNetwork,
  } = useGetAllProfiles()
  const [expanded, toggleExpanded] = useToggle(false)
  const [renderText, setRenderText] = useToggle(false)
  const [expandForCreatingNewIdentity, toggleExpandForCreatingNewIdentity] =
    useToggle(false)
  useEffect(() => {
    getAllProfilesForNetwork()
    if (expanded) {
      const timer = setTimeout(() => setRenderText(true), 100)
      return () => clearTimeout(timer)
    } else {
      setRenderText(false)
    }
  }, [expanded])

  useEffect(() => {
    if (errorMessageInGettingProfilesData?.length > 0) {
      showToast(errorMessageInGettingProfilesData)
    }
  })

  const form = useForm<z.infer<typeof anotherIdentitySchema>>({
    resolver: zodResolver(anotherIdentitySchema),
    defaultValues: {
      username: '',
      fullName: '',
      email: '',
      bio: '',
    },
  })
  return (
    <Box
      className={cn(
        'w-full rounded-lg bg-gray-300 transition-all duration-300',
        variant === 'accm' && (expanded ? 'h-59' : 'h-28'),
        variant === 'identity' && (!expanded ? 'h-30' : ''),
      )}
    >
      <Box
        className={cn(
          'p- flex w-full flex-col items-center rounded-lg bg-yellow-200 shadow-lg transition-all duration-300',
          variant === 'accm' &&
            (expanded
              ? 'h-57 items-start justify-between p-4'
              : 'h-26 items-start justify-between p-4'),
          variant === 'identity' && 'items-start justify-start p-4 py-6',
        )}
      >
        <Box className="mt-2 flex w-full items-center justify-between">
          <Text className="text-2xl font-semibold">{title}</Text>
          <Box className="flex gap-2">
            {children}
            <Box
              className="flex h-14 cursor-pointer items-center gap-3 rounded-sm bg-yellow-400 px-5 shadow-lg"
              onClick={toggleExpanded}
            >
              <Text className="text-lg font-semibold">Details</Text>
              <InfoIcon />
            </Box>
          </Box>
        </Box>
        {expanded && renderText && (
          <Box className="mt-4 w-full transition-all duration-300">
            {variant === 'accm' ? (
              Details
            ) : (
              <Box>
                <RealIdentityBox
                  fullName={user?.fullName}
                  username={user?.username}
                  email={user?.email}
                  bio={user?.bio}
                  countData={countData}
                />
                {isGettingProfilesData ? (
                  <ProfileCreationSkeleton
                    loading={isGettingProfilesData}
                    items={[1]}
                  />
                ) : (
                  <AlreadyProfiles profiles={profilesData} />
                )}

                <Box className="mt-3 flex items-start justify-end">
                  <Button
                    className="cursor-pointer bg-blue-800 py-7 shadow-lg hover:bg-blue-900"
                    onClick={async () => {
                      toggleExpandForCreatingNewIdentity()
                      if (getCountProfileAction) await getCountProfileAction()
                    }}
                    disabled={
                      isGettingCountData || expandForCreatingNewIdentity
                    }
                  >
                    Add Other Profiles
                  </Button>
                </Box>
                {expandForCreatingNewIdentity ? (
                  isGettingCountData ? (
                    <ProfileCreationSkeleton
                      loading={isGettingCountData}
                      items={[1]}
                    />
                  ) : (
                    <>
                      <NewProfileBox
                        countData={countData}
                        form={form}
                        isCreatingNewProfile={isCreatingNewProfile}
                        newProfileCreationResponse={newProfileCreationResponse}
                        createNewProfile={createNewProfile}
                      />
                    </>
                  )
                ) : (
                  ''
                )}
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export { ExpandedBox }
