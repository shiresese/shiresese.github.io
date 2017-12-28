import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'

import { rhythm } from '../../utils/typography'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')
    return (
      <div css={{
        maxWidth: rhythm(24),
        margin: '0 auto',
      }}>
        {posts.map(({ node }) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h2>{title}</h2>
              <p dangerouslySetInnerHTML={{ __html: node.html }} />
            </div>
          )
        })}
      </div>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query AboutQuery {
    allMarkdownRemark(
      filter: {fields: {slug: {regex: "//about//"}}},
    ) {
      edges {
        node {
          html
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
