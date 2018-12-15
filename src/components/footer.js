import React from 'react'
import moment from 'moment'

const Footer = () => {
  const year = moment().format('YYYY')
  return (
    <footer>
      © Ирина Соколовская,&nbsp;
      <time dateTime={'2012'}>2012</time>—<time dateTime={year}>{year}</time>
    </footer>
  )
}

export default Footer
