import React from 'react'
import Link from 'gatsby-link'
import {get, times} from 'lodash'

import { rhythm } from '../../utils/typography'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')
    const blank = times((3 - posts.length % 3) % 3, _ => <li></li>)
    return (
      <ul css={{
        display: "flex",
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        '& li': {
          width: rhythm(12),
          height: rhythm(14)
        },
      }}>
        {posts.map(({ node }) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug
          const thumbnail = get(node, 'frontmatter.thumbnail.childImageSharp.resolutions.src')
          const link = get(node, 'frontmatter.redirect')
          const panel = (
            <div key={node.fields.slug} css={{
              fontSize: rhythm(1/2),
              textAlign: 'center'
            }}>
              <img src={thumbnail} css={{
                maxWidth: rhythm(8),
                maxHeight: rhythm(8)
              }}/>
              <div css={{ wordBreak: 'keep-all'}}>{title}</div>
              <small>{node.frontmatter.date}</small>
            </div>
          )
          const a = link ?
            <a href={link}>{panel}</a> :
            <Link to={node.fields.slug}>{panel}</Link>
          return (
            <li>
              {a}
            </li>
          )
        }).concat(blank)}
      </ul>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query ProductsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC },
      filter: {fields: {slug: {regex: "//products//"}}},
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            thumbnail {
              childImageSharp {
                resolutions {
                  src
                }
              }
            }
            redirect
          }
        }
      }
    }
  }
`
