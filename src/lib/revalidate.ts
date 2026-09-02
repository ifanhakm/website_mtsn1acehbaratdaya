import { revalidateTag } from 'next/cache'

export function revalidatePublicTags(...tags: string[]): void {
  for (const tag of tags) revalidateTag(tag, 'max')
}
