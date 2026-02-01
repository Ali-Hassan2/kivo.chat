import React from 'react'
import { useToggle } from 'react-use'
import { ProfileCountResposne } from '@/types'

const useGetAllProfiles = () => {
  const [profilesData, setProfilesData] = React.useState<
    ProfileCountResposne[]
  >([])
  const [isGettingProfilesData, toggleGettingProfilesData] = useToggle(false)
  const [
    errorMessageInGettingProfilesData,
    setErrorMessageInGettingProfilesData,
  ] = React.useState<string | null>(null)

  const controllerForGettingTheProfilesDataForOverallNetwork =
    React.useRef<AbortController | null>(null)

  const getAllProfilesForNetwork = async () => {
    try {
      toggleGettingProfilesData(true)
      setErrorMessageInGettingProfilesData('')
      if (controllerForGettingTheProfilesDataForOverallNetwork.current)
        controllerForGettingTheProfilesDataForOverallNetwork.current.abort()

      const controller = new AbortController()
      controllerForGettingTheProfilesDataForOverallNetwork.current = controller
      const response = await 
    } catch (error) {}
  }
}
