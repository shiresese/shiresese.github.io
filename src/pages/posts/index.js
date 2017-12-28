import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'

import { rhythm } from '../../utils/typography'

class BlogIndex extends React.Component {
  render() {
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <div css={{
        maxWidth: rhythm(24),
        margin: '0 auto'
      }}>
        {posts.map(({ node }, i) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug
          const style = i > 0 ? {marginTop: rhythm(2)} : {}
          return (
            <div key={node.fields.slug} css={style}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                <small>続きを読む</small>
              </Link>
            </div>
          )
        })}
      </div>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query PostsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC },
      filter: {fields: {slug: {regex: "//posts//"}}},
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
          }
        }
      }
    }
  }
`
