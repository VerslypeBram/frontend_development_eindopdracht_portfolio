import { getIconData, iconToSVG, replaceIDs } from '@iconify/utils'
import type { IconifyJSON } from '@iconify/types'
import deviconPlain from '@iconify-json/devicon-plain/icons.json'
import mdi from '@iconify-json/mdi/icons.json'
import simpleIcons from '@iconify-json/simple-icons/icons.json'

// Icon sets are read at render time on the server, so the icons end up as
// inline SVG in the HTML: no runtime requests to the Iconify API and no
// icon data in the client bundle. Only use this from Server Components.
const COLLECTIONS: Record<string, IconifyJSON> = {
  'devicon-plain': deviconPlain as IconifyJSON,
  mdi: mdi as IconifyJSON,
  'simple-icons': simpleIcons as IconifyJSON,
}

interface StaticIconProps {
  /** Iconify name, e.g. "mdi:react" or "simple-icons:github" */
  icon: string
  className?: string
  width?: number
  height?: number
}

export default function StaticIcon({
  icon,
  className,
  width,
  height,
}: StaticIconProps) {
  const [prefix, name] = icon.split(':')
  const collection = COLLECTIONS[prefix]
  const data = collection && getIconData(collection, name)
  if (!data) return null

  const { attributes, body } = iconToSVG(data)

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={attributes.viewBox}
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: replaceIDs(body) }}
    />
  )
}
