export type DatabaseSslMode = 'true' | 'require' | 'false'

export type DatabaseSslConfig = false | {
  rejectUnauthorized: boolean
  ca?: string
}

export function createDatabaseSslConfig(
  mode: DatabaseSslMode,
  certificateAuthority?: string,
): DatabaseSslConfig {
  if (mode === 'false') return false

  if (mode === 'require') {
    return { rejectUnauthorized: false }
  }

  if (!certificateAuthority?.trim()) {
    throw new Error(
      'DATABASE_SSL=true memerlukan certs/supabase-ca.crt. Gunakan DATABASE_SSL=require hanya jika pooler memang tidak menyediakan CA yang dapat diverifikasi.',
    )
  }

  return {
    rejectUnauthorized: true,
    ca: certificateAuthority,
  }
}
