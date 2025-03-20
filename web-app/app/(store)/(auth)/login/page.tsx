import { Container } from '@/components/common/container'
import { Heading } from '@/components/common/heading'
import { FormLogin } from '@/components/form/form-login'

export default function LoginPage() {
  return (
    <Container
      className="bg-white dark:bg-gray-900 flex flex-col items-center justify-center rounded-lg shadow-sm gap-4">
      <Heading
        title="Đăng nhập"
        textStyles='text-2xl font-semibold text-gray-800'
      />
      <FormLogin />
    </Container>
  )
}
