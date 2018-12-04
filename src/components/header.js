import React from 'react'
import { Link } from 'gatsby'

const Header = ({ siteTitle, menuLinks }) => (
  <div
    style={{
      background: 'rebeccapurple',
      marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <nav style={{ display: 'flex', flex: 1 }}>
        {menuLinks.map(link => (
          <li key={link.name} style={{ listStyleType: 'none' }}>
            <Link to={link.link}>{link.name}</Link>
          </li>
        ))}
      </nav>
    </div>
  </div>
)

export default Header
