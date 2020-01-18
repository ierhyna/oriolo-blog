import React from 'react'
import { Link } from 'gatsby'

const Header = ({ siteTitle, menuLinks }) => (
  <header
    style={{
      background: '#dc6005',
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
      <nav style={{ marginTop: '1rem' }}>
        <ul
          style={{ display: 'flex', flex: 1, listStyleType: 'none', margin: 0 }}
        >
          {menuLinks.map(link => (
            <li key={link.name} style={{ margin: '0 1rem 0 0' }}>
              <Link to={link.link} style={{ textDecoration: 'none', color: '#fff' }}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </header>
)

export default Header
