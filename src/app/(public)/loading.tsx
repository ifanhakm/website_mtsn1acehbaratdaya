export default function PublicLoading() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-7xl items-center justify-center px-4" role="status">
      <div className="flex items-center gap-3 text-sm font-semibold text-gray-500">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-brand-green border-t-transparent" />
        Memuat halaman…
      </div>
    </div>
  )
}
