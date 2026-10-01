/**
 * The "bv" terminal mark: the letters are Satoshi Bold converted to vector
 * paths (viewBox 0 0 64 64), so it renders identically everywhere without a
 * font. The amber block next to it is the terminal cursor.
 */
export const LOGO_VIEWBOX = '0 0 64 64'
export const LOGO_LETTERS_PATH =
  'M10.03 46 10.32 43.25C11.35 45.29 13.6 46.46 16.24 46.46C21.31 46.46 24.63 42.72 24.63 37.29C24.63 31.73 21.56 27.8 16.53 27.8C13.85 27.8 11.49 28.98 10.35 30.94V19.45H6V46ZM10.39 37.12C10.39 33.94 12.35 31.73 15.35 31.73C18.42 31.73 20.24 33.98 20.24 37.12C20.24 40.26 18.42 42.47 15.35 42.47C12.35 42.47 10.39 40.29 10.39 37.12ZM32.37 46H36.65L44 28.37H39.5L36.29 36.47C35.54 38.4 34.9 40.26 34.65 41.36C34.44 40.4 33.83 38.58 33.08 36.47L30.01 28.37H25.37Z'
export const LOGO_CURSOR = { x: 47, y: 39.5, width: 11, height: 6.5, rx: 1.5 }
export const LOGO_COLORS = { bg: '#0a0a0a', fg: '#ffffff', accent: '#f59e0b' }
