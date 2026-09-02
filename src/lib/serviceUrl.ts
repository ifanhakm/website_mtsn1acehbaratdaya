export function validateServiceHref(value: unknown, isExternal: boolean): true | string {
  if (typeof value !== 'string' || !value.trim()) return 'Alamat tautan wajib diisi.'

  const href = value.trim()

  if (!isExternal) {
    return href.startsWith('/') && !href.startsWith('//')
      ? true
      : 'Tautan internal harus berupa path yang diawali satu garis miring (/).'
  }

  try {
    const url = new URL(href)
    return url.protocol === 'https:' || url.protocol === 'http:'
      ? true
      : 'Tautan eksternal hanya boleh menggunakan protokol HTTPS atau HTTP.'
  } catch {
    return 'Tautan eksternal harus berupa URL lengkap yang valid.'
  }
}
