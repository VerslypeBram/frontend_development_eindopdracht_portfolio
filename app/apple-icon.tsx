import { ImageResponse } from 'next/og'
import {
  LOGO_COLORS,
  LOGO_CURSOR,
  LOGO_LETTERS_PATH,
  LOGO_VIEWBOX,
} from './lib/logo'

export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

// iOS rounds the corners itself, so the tile is a full-bleed square.
export default function AppleIcon() {
  const { x, y, width, height, rx } = LOGO_CURSOR
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: LOGO_COLORS.bg,
      }}
    >
      <svg width="180" height="180" viewBox={LOGO_VIEWBOX}>
        <path d={LOGO_LETTERS_PATH} fill={LOGO_COLORS.fg} />
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          rx={rx}
          fill={LOGO_COLORS.accent}
        />
      </svg>
    </div>,
    { ...size },
  )
}
