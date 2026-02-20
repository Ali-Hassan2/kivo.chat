import { Box } from '@radix-ui/themes'
import { SkeletonWrapper } from '@/components'

interface ConversationSkeletonWrapperProps {
  loading: boolean
  items?: number
}

const ConversationSkeletonWrapper = ({
  loading,
  items = 8,
}: ConversationSkeletonWrapperProps) => {
  return (
    <SkeletonWrapper loading={loading}>
      <Box className="flex w-full flex-col gap-3 p-4">
        {Array.from({ length: items }).map((_, index) => {
          const isLeft = index % 2 === 0
          return (
            <Box
              key={index}
              className={`flex w-full ${
                isLeft ? 'justify-start' : 'justify-end'
              }`}
            >
              <Box
                className={`h-22 w-[60%] rounded-2xl ${'rounded-lg'} animate-pulse bg-gray-300`}
              />
            </Box>
          )
        })}
      </Box>
    </SkeletonWrapper>
  )
}

export { ConversationSkeletonWrapper }
