import {
  AboutUsIcon,
  DashboardIcon,
  FriendsIcon,
  NotificationIcon,
  ProfileIcon,
  SettingIcon,
} from '@/components'
import { NetworkIcon } from '@/components/icons/network'
import { SupportIcon } from '@/components/icons/support'
import {
  ABOUT_PAGE,
  CONTACT_PAGE,
  FRIENDS,
  NETWORK,
  PERSONAL_BOARD,
} from './page-urls'

const HEADER_DROPDOWN_LABELS = [
  {
    label: 'Profile',
    icon: <ProfileIcon />,
    href: '#',
  },
  {
    label: 'Friends',
    icon: <FriendsIcon />,
    href: FRIENDS,
  },
  {
    label: 'Notifications',
    icon: <NotificationIcon />,
  },
  {
    label: 'Settings',
    icon: <SettingIcon />,
    href: '#',
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

const HEADER_LINKS = [
  {
    label: 'Dashboard',
    icon: <DashboardIcon />,
    href: PERSONAL_BOARD,
  },
  {
    label: 'Network',
    icon: <NetworkIcon />,
    href: NETWORK,
  },
  {
    label: 'About Kivo',
    icon: <AboutUsIcon />,
    href: ABOUT_PAGE,
  },
  {
    label: 'Contact Kivo',
    icon: <SupportIcon />,
    href: CONTACT_PAGE,
  },
]

const NETWORK_BOARD_HEADER = {
  NextHead: '',
  ButtonOne: {
    label: 'Pending Requests',
    href: '/network',
  },
  ButtonTwo: {
    label: 'All Friends',
    href: '#',
  },
  lineWidth: 'w-110',
}

export {
  HEADER_DROPDOWN_LABELS,
  MOCK_CONTACTS,
  HEADER_LINKS,
  NETWORK_BOARD_HEADER,
}
