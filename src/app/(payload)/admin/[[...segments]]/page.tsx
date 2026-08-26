// Path: src/app/(payload)/admin/[[...segments]]/page.tsx
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
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

export const generateMetadata = ({ params, searchParams }: Args) => {
  return generatePageMetadata({ 
    config, 
    params, 
    searchParams 
  })
}

const Page = ({ params, searchParams }: Args) => {
  return RootPage({ 
    config, 
    importMap,
    params, 
    searchParams 
  })
}

export default Page
