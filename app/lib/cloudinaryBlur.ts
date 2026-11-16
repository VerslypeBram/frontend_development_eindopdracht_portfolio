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

/**
 * Converts a Cloudinary URL to a 1200x630 JPEG for link previews (Open Graph),
 * so social platforms never download the full-size original.
 * Returns undefined for non-Cloudinary URLs.
 */
export function cloudinaryOgUrl(
  url: string | undefined | null,
): string | undefined {
  if (!url) return undefined
  if (!url.startsWith('https://res.cloudinary.com/')) return undefined
  return url.replace('/upload/', '/upload/c_fill,w_1200,h_630,f_jpg,q_auto/')
}
