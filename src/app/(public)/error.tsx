'use client'

import { useEffect } from 'react'

export default function PublicError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-extrabold text-brand-green">Data belum dapat dimuat</h1>
      <p className="mt-3 text-sm leading-relaxed text-gray-600">
        Layanan data madrasah sedang mengalami gangguan. Silakan coba kembali beberapa saat lagi.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-xl bg-brand-green px-5 py-3 text-sm font-bold text-white hover:bg-brand-green/90"
      >
        Coba Lagi
      </button>
    </div>
  )
}
