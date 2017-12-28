import Typography from 'typography'
import Lawton from 'typography-theme-lawton'
import Color from 'color'

const LinkColor = new Color('#c62753')

Lawton.overrideThemeStyles = () => ({
  'body': {
    fontFamily: 'Shuei KakuGo Kin L, FB Agency Regular'
  },
  'strong': {
    fontFamily: 'Shuei KakuGo Kin B'
  },
  'ul': {
    listStyle: 'none'
  },
  'img': {
    marginBottom: 0,
  },
  'a': {
    boxShadow: 'none',
    textDecoration: 'none',
    color: LinkColor.rgb().string(),
    fontFamily: 'Shuei KakuGo Kin B'
  },
  'h1 a, h2 a, h3 a, h4 a, h5 a, h6 a': {
    fontFamily: 'Midashi Go MB31'
  },
  'a:hover': {
    textDecoration: 'none',
    color: LinkColor.fade(0.5).rgb().string(),
  }
})

const typography = new Typography(Lawton)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
