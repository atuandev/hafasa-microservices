import { Container } from '@/components/common/container'
import { Heading } from '@/components/common/heading'
import { FormRegister } from '@/components/form/form-register'

export default function RegisterPage() {
  return (
    <Container
      className="bg-white dark:bg-gray-900 flex flex-col items-center justify-center rounded-lg shadow-sm gap-4">
      <Heading
        title="Đăng ký"
        textStyles='text-2xl font-semibold text-gray-800'
      />
      <FormRegister />
    </Container>
  )
}
