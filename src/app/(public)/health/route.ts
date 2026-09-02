export const dynamic = 'force-dynamic'

const headers = { 'Cache-Control': 'no-store' }

export function GET() {
  return Response.json(
    { status: 'ok', timestamp: new Date().toISOString() },
    { headers },
  )
}
