// Path: src/app/(payload)/layout.tsx
import React from 'react'
import config from '@/payload.config'
import '@payloadcms/next/css'
import { importMap } from './importMap' 
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import { ServerFunctionClient } from 'payload'

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </RootLayout>
)

export default Layout
