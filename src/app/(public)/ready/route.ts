import { getPayload } from 'payload'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

const headers = { 'Cache-Control': 'no-store' }

export async function GET() {
  try {
    const payload = await getPayload({ config })
    await payload.count({ collection: 'staf', overrideAccess: false })

    return Response.json(
      { status: 'ready', database: 'ok', timestamp: new Date().toISOString() },
      { headers },
    )
  } catch (error) {
    console.error('Readiness database gagal', error instanceof Error ? error.message : 'unknown')
    return Response.json(
      { status: 'unavailable', database: 'unavailable', timestamp: new Date().toISOString() },
      { status: 503, headers },
    )
  }
}
