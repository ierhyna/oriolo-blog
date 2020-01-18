import React from 'react'
import moment from 'moment'

const Footer = () => {
  const year = moment().format('YYYY')
  return (
    <footer>
      <div
        style={{
          margin: '0 auto',
          maxWidth: 960,
          padding: '1.45rem 1.0875rem',
          textAlign: 'center',
        }}
      >
        © Ирина Соколовская,&nbsp;
        <time dateTime={'2012'}>2012</time>—<time dateTime={year}>{year}</time>
      </div>
    </footer>
  )
}

export default Footer
