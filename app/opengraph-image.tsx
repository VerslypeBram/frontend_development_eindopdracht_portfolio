import { ImageResponse } from 'next/og'

// Image metadata
export const alt = 'Bram Verslype — Web Developer & MCT Student'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

// Image generation: shown as link preview on LinkedIn, Slack, etc.
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        background: '#0a0a0a',
        color: '#ededed',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: 4,
          color: '#f59e0b',
          textTransform: 'uppercase',
        }}
      >
        Next Web Developer · Howest MCT
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 96,
          fontWeight: 800,
          marginTop: 24,
        }}
      >
        Bram Verslype
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 36,
          marginTop: 24,
          color: '#a3a3a3',
        }}
      >
        Portfolio · Looking for a web development internship
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 28,
          marginTop: 'auto',
          color: '#f59e0b',
        }}
      >
        bramverslype.be
      </div>
    </div>,
    {
      ...size,
    },
  )
}
