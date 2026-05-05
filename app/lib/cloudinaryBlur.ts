/**
 * Converts a Cloudinary URL to a tiny blurred placeholder URL (e.g. 16px wide, heavily blurred).
 * Returns undefined for non-Cloudinary URLs.
 */
export function cloudinaryBlurUrl(
  url: string | undefined | null,
): string | undefined {
  if (!url) return undefined
  const cloudinaryBase = 'https://res.cloudinary.com/'
  if (!url.startsWith(cloudinaryBase)) return undefined

  // Insert transformation after /upload/ to get a tiny blurred thumbnail
  return url.replace('/upload/', '/upload/w_16,q_10,f_auto,e_blur:200/')
}
