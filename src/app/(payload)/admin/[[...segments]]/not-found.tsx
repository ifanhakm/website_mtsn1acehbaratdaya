// Path: src/app/(payload)/admin/[[...segments]]/not-found.tsx
import { NotFoundPage } from '@payloadcms/next/views'
import config from '@/payload.config'
import { importMap } from '../../importMap' // Path mengarah ke file importMap di src/app/(payload)/importMap

type Args = {
  params: Promise<{
    segments: string[] 
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

const NotFound = ({ params, searchParams }: Args) => {
  return NotFoundPage({ 
    config, 
    importMap,
    params, 
    searchParams 
  })
}

export default NotFound
