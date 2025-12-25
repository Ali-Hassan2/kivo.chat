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
  ALL_FRIENDS,
  CONTACT_PAGE,
  FRIENDS,
  FRIENDS_NETWORK_BOARD,
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
    href: '/network-friends',
  },
  ButtonTwo: {
    label: 'All Friends',
    href: ALL_FRIENDS,
  },
  lineWidth: 'w-40',
}

const PENDING_REQUEST_BOARD = {
  NextHead: '/Pending Requests',
  ButtonOne: {
    label: 'Network',
    href: '/connection-network',
  },
  ButtonTwo: {
    label: 'All Friends',
    href: ALL_FRIENDS,
  },
  lineWidth: 'w-110',
}

const ALL_FRIENDS_NETWORK_BOARD = {
  NextHead: '/All Friends',
  ButtonOne: {
    label: 'Network',
    href: NETWORK,
  },
  ButtonTwo: {
    label: 'Pending Requests',
    href: FRIENDS_NETWORK_BOARD,
  },
  lineWidth: 'w-110',
}

const ALL_BLOCKED_FRIENDS_OVERALLNETWORK_BOARD = {
  NextHead: '/All Blocked Users',
  ButtonOne: {
    label: 'All Friends',
    href: ALL_FRIENDS,
  },
  ButtonTwo: {
    label: 'Network',
    href: NETWORK,
  },
  lineWidth: 'w-110',
}

export {
  HEADER_DROPDOWN_LABELS,
  MOCK_CONTACTS,
  HEADER_LINKS,
  NETWORK_BOARD_HEADER,
  PENDING_REQUEST_BOARD,
  ALL_FRIENDS_NETWORK_BOARD,
  ALL_BLOCKED_FRIENDS_OVERALLNETWORK_BOARD,
}
