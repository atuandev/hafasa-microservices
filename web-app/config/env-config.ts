import { z } from 'zod'

const configSchema = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z.string(),
  NEXT_PUBLIC_LOCAL_URL: z.string(),
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string(),
  NEXT_PUBLIC_CLOUDINARY_API_KEY: z.string(),
})

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  NEXT_PUBLIC_LOCAL_URL: process.env.NEXT_PUBLIC_LOCAL_URL,
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  NEXT_PUBLIC_CLOUDINARY_API_KEY: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
})

if (!configProject.success) {
  console.error(configProject.error.issues)
  throw new Error('.env file is not configured correctly')
}

const envConfig = configProject.data
export default envConfig
