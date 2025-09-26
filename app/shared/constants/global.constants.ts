import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

/* Variables associated with apiUrl */
export const API_DEV = 'http://localhost:3000'
export const API_PROD = './assets/mock'

/* Variables associated with language */
export const LANG = 'lang'
export const ES_LANG = 'es'
export const EN_LANG = 'en'

/* Numeric variables  */
export const ZERO = 0
export const ZERO_POINT_NINE = 0.9
export const ONE = 1
export const TWO = 2
export const THREE = 3
export const THREE_POINT_SIX = 3.6
export const FOUR = 4
export const FIVE = 5
export const SEVEN = 7
export const SIXTEEN = 16
export const SIXTY = 60
export const THREE_HUNDRED = 300
export const THOUSAND = 1000
export const TWO_THOUSAND = 2000
export const THREE_THOUSAND_SIX_HUNDRED = 3600

/* Color variables  */
export const WHITE = '#ffffff'
export const BLACK = '#000000'
export const ORANGE = '#ff4500'

/* Variables associated with theme styles */
export const THEME = 'theme'
export const THEME_DARK = 'dark'

export const THEME_PRESET = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{zinc.50}',
      100: '{zinc.100}',
      200: '{zinc.200}',
      300: '{zinc.300}',
      400: '{zinc.400}',
      500: '{zinc.500}',
      600: '{zinc.600}',
      700: '{zinc.700}',
      800: '{zinc.800}',
      900: '{zinc.900}',
      950: '{zinc.950}'
    },
    colorScheme: {
      light: {
        primary: {
          color: '{zinc.950}',
          inverseColor: '#ffffff',
          hoverColor: '{zinc.900}',
          activeColor: '{zinc.800}'
        },
        highlight: {
          background: '{zinc.950}',
          focusBackground: '{zinc.700}',
          color: '#ffffff',
          focusColor: '#ffffff'
        }
      },
      dark: {
        primary: {
          color: '{zinc.50}',
          inverseColor: '{zinc.950}',
          hoverColor: '{zinc.100}',
          activeColor: '{zinc.200}'
        },
        highlight: {
          background: 'rgba(250, 250, 250, .16)',
          focusBackground: 'rgba(250, 250, 250, .24)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)'
        }
      }
    }
  }
})
