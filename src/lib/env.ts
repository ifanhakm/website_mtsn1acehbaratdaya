import { z } from 'zod'

const serverEnvSchema = z.object({
  DATABASE_URI: z.string().min(1, 'DATABASE_URI wajib diisi'),
  PAYLOAD_SECRET: z.string().min(32, 'PAYLOAD_SECRET minimal 32 karakter'),
  NEXT_PUBLIC_SERVER_URL: z.url().transform((value) => value.replace(/\/+$/, '')).default('http://localhost:3000'),
  DATABASE_SSL: z.enum(['true', 'require', 'false']).default('true'),
  ALLOW_DEV_SCHEMA_PUSH: z.enum(['true', 'false']).default('false'),
  RUN_DATABASE_MIGRATIONS: z.enum(['true', 'false']).default('false'),
  RESEND_API_KEY: z.string().min(1).optional(),
  RESEND_FROM_EMAIL: z.email().default('onboarding@resend.dev'),
  SCHOOL_EMAIL: z.email().default('website.mtsn1abdya@gmail.com'),
  SUPABASE_URL: z.url().optional(),
  SUPABASE_BUCKET_NAME: z.string().min(1).optional(),
  SUPABASE_S3_ENDPOINT: z.url().optional(),
  SUPABASE_S3_REGION: z.string().min(1).default('ap-southeast-1'),
  SUPABASE_S3_ACCESS_KEY_ID: z.string().min(1).optional(),
  SUPABASE_S3_SECRET_ACCESS_KEY: z.string().min(1).optional(),
}).superRefine((value, context) => {
  const storageConnectionFields = [
    value.SUPABASE_S3_ENDPOINT,
    value.SUPABASE_S3_ACCESS_KEY_ID,
    value.SUPABASE_S3_SECRET_ACCESS_KEY,
  ]
  const configuredFields = storageConnectionFields.filter(Boolean).length

  if (configuredFields > 0 && (!value.SUPABASE_BUCKET_NAME || configuredFields < storageConnectionFields.length)) {
    context.addIssue({
      code: 'custom',
      path: ['SUPABASE_BUCKET_NAME'],
      message: 'Konfigurasi penyimpanan S3 harus diisi lengkap atau dikosongkan seluruhnya',
    })
  }
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
