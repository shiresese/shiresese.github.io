import React from 'react'
import Link from 'gatsby-link'
import Color from 'color'
import { Container } from 'react-responsive-grid'
import Helmet from 'react-helmet'

import { rhythm, scale } from '../utils/typography'

class Template extends React.Component {
  render() {
    const { location, children, data } = this.props
    const siteTitle = data.site.siteMetadata.title

    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }
    let navbar = (
      <ul css={{
        marginLeft: 0,
        listStyle: 'none',
        textAlign: 'center',
        '& a': {
          fontFamily: 'Dots',
        },
        '& li': {
          display: 'inline-block',
          margin: `0 ${rhythm(1/2)}`,
        }
      }}>
        <li><Link to={'/about'}>About</Link></li>
        <li><Link to={'/products'}>Products</Link></li>
        <li><Link to={'/posts'}>Posts</Link></li>
      </ul>
    )
    if (location.pathname === rootPath) {
      header = (
        <div style={{ textAlign: 'center' }}>
          <Link
            style={{
              boxShadow: 'none',
              color: 'inherit',
            }}
            to={'/'}
          >
            <img src='./logo.png' style={{
              maxHeight: rhythm(2),
            }} />
          </Link>
        </div>
      )
    } else {
      header = (
        <div css={{
          '@media (min-width:480px)': {
            position: 'absolute',
            top: 0,
            left: 0,
          },
          textAlign: 'center',
          margin: rhythm(1 / 2),
        }} >
          <Link
            style={{
              boxShadow: 'none',
              color: 'inherit',
            }}
            to={'/'}
          >
            <img css={{
              maxHeight: rhythm(1),
            }} src='./logo.png' />
          </Link>
        </div>
      )
    }
    return (
      <Container
        style={{
          padding: `${rhythm(1 / 2)} ${rhythm(3 / 4)}`,
          margin: '0 auto',
        }}
      >
        <Helmet title={siteTitle}>
          <script type="text/javascript" src="//typesquare.com/accessor/script/typesquare.js?WyiY7Lng~iE%3D" charset="utf-8"></script>
        </Helmet>
        {header}
        {navbar}
        {children()}
      </Container>
    )
  }
}

export default Template

export const pageQuery = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const a = `
<script type="text/javascript" src="//typesquare.com/accessor/script/typesquare.js?WyiY7Lng~iE%3D" charset="utf-8"></script>
`
