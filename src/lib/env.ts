import { z } from 'zod'

const serverEnvSchema = z.object({
  DATABASE_URI: z.string().min(1, 'DATABASE_URI wajib diisi'),
  PAYLOAD_SECRET: z.string().min(32, 'PAYLOAD_SECRET minimal 32 karakter'),
  NEXT_PUBLIC_SERVER_URL: z.url().default('http://localhost:3000'),
  DATABASE_SSL: z.enum(['true', 'require', 'false']).default('true'),
  RESEND_API_KEY: z.string().min(1).optional(),
  RESEND_FROM_EMAIL: z.email().default('onboarding@resend.dev'),
  SUPABASE_URL: z.url().optional(),
  SUPABASE_BUCKET_NAME: z.string().min(1).optional(),
  SUPABASE_S3_ENDPOINT: z.url().optional(),
  SUPABASE_S3_REGION: z.string().min(1).default('ap-southeast-1'),
  SUPABASE_S3_ACCESS_KEY_ID: z.string().min(1).optional(),
  SUPABASE_S3_SECRET_ACCESS_KEY: z.string().min(1).optional(),
})

const result = serverEnvSchema.safeParse(process.env)

if (!result.success) {
  const details = result.error.issues
    .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
    .join('; ')
  throw new Error(`Konfigurasi environment tidak valid: ${details}`)
}

export const env = result.data

export const cloudStorageEnabled = Boolean(
  env.SUPABASE_BUCKET_NAME &&
    env.SUPABASE_S3_ENDPOINT &&
    env.SUPABASE_S3_ACCESS_KEY_ID &&
    env.SUPABASE_S3_SECRET_ACCESS_KEY,
)
