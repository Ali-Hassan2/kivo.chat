import { useEffect } from 'react'
import { Box, Text } from '@radix-ui/themes'
import { useToggle } from 'react-use'
import { cn } from '@/utils/cn'
import { InfoIcon } from './icons/info'

interface ExpandedBox {
  title: string
  Details: React.ReactNode
  children: React.ReactNode
}

const ExpandedBox = ({ title, Details, children }: ExpandedBox) => {
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
          <Text className="text-2xl font-semibold">{title}</Text>
          <Box className={cn('flex gap-2')}>
            {children}
            <Box
              className="relative bottom-1 flex h-14 cursor-pointer items-center justify-center gap-3 rounded-sm bg-yellow-400 px-5 shadow-lg"
              onClick={toggleExpandMenu}
            >
              <Text className="text-lg font-semibold">Details</Text>
              <InfoIcon />
            </Box>
          </Box>
        </Box>
        {setExpandDetailMenu && renderText && (
          <Box className="mt-4 ml-1 w-full rounded-md py-4 transition-all duration-300">
            {Details}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export { ExpandedBox }
