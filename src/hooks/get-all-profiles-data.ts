import React from 'react'
import { useToggle } from 'react-use'
import { getAllProfilesForOverallNetwork } from '@/services'
import { ProfileGettingResponse, ProfilesShape } from '@/types'

const useGetAllProfiles = () => {
  const [profilesData, setProfilesData] = React.useState<ProfilesShape[]>([])
  const [isGettingProfilesData, toggleGettingProfilesData] = useToggle(false)
  const [
    errorMessageInGettingProfilesData,
    setErrorMessageInGettingProfilesData,
  ] = React.useState<string>('')

  const controllerForGettingTheProfilesDataForOverallNetwork =
    React.useRef<AbortController | null>(null)

  const getAllProfilesForNetwork = async () => {
    if (controllerForGettingTheProfilesDataForOverallNetwork.current)
      controllerForGettingTheProfilesDataForOverallNetwork.current.abort()

    const controller = new AbortController()
    controllerForGettingTheProfilesDataForOverallNetwork.current = controller
    try {
      toggleGettingProfilesData(true)
      setErrorMessageInGettingProfilesData('')
      const response = await getAllProfilesForOverallNetwork({
        signal: controller.signal,
      })

      console.log('The resposne data for profiles is:', response)
      if (!response.success) {
        setErrorMessageInGettingProfilesData(response.message)
      } else {
        setProfilesData(response?.data.profiles)
      }
    } finally {
      toggleGettingProfilesData(false)
    }
  }
  return {
    isGettingProfilesData,
    errorMessageInGettingProfilesData,
    profilesData,
    getAllProfilesForNetwork,
  }
}

export { useGetAllProfiles }
