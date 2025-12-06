import {
  FriendsIcon,
  NotificationIcon,
  ProfileIcon,
  SettingIcon,
} from '@/components'

const HEADER_DROPDOWN_LABELS = [
  {
    label: 'Profile',
    icon: <ProfileIcon />,
  },
  {
    label: 'Friends',
    icon: <FriendsIcon />,
  },
  {
    label: 'Notifications',
    icon: <NotificationIcon />,
  },
  {
    label: 'Settings',
    icon: <SettingIcon />,
  },
]

const MOCK_CONTACTS = [
  { FullName: 'Ali Hassan' },
  { FullName: 'Sara Ahmed' },
  { FullName: 'Bilal Khan' },
  { FullName: 'Ayesha Iqbal' },
  { FullName: 'Omar Farooq' },
  { FullName: 'Fatima Noor' },
  { FullName: 'Zain Ali' },
  { FullName: 'Hina Raza' },
  { FullName: 'Kamran Javed' },
  { FullName: 'Sadia Malik' },
]

export { HEADER_DROPDOWN_LABELS, MOCK_CONTACTS }
