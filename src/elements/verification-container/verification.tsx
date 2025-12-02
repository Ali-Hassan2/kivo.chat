import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { KIVO_PROFILE } from '@/constants/page-urls'
import { verifyCodeSchema } from '@/guards'
import { showToast, useNavigation } from '@/utils'

interface VerificationFormProps {
  form: UseFormReturn<z.infer<typeof verifyCodeSchema>>
  onSubmit: (data: z.infer<typeof verifyCodeSchema>) => Promise<any> | void
  verifyingProcessMessage: string
  isVerifyingCode: boolean
  verifyProcessError: string
}

const Verification = ({
  form,
  onSubmit,
  verifyingProcessMessage,
  isVerifyingCode,
  verifyProcessError,
}: VerificationFormProps) => {
  const { navigateTo } = useNavigation()
  useEffect(() => {
    if (verifyingProcessMessage) {
      showToast(verifyingProcessMessage, 'success')
      setTimeout(() => {
        navigateTo(KIVO_PROFILE)
      }, 1000)
    }
  }, [verifyingProcessMessage])
  useEffect(() => {
    if (verifyProcessError) {
      showToast(verifyProcessError, 'error')
    }
  }, [verifyProcessError])
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="verficationCode"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Verification Code here..."
                    {...field}
                    className="mt-2"
                  />
                </FormControl>
              </FormItem>
            )
          }}
        />
        <Button
          type="submit"
          disabled={isVerifyingCode}
          className="mt-4 w-full cursor-pointer rounded-xl border-2 border-black bg-transparent text-black transition-all duration-300 hover:border-none hover:text-white"
        >
          {isVerifyingCode ? (
            <>
              <Loader2 className="animate-spin" />
            </>
          ) : (
            <p>Verify</p>
          )}
        </Button>
      </form>
    </Form>
  )
}

export { Verification }
