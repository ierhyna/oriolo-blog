import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment/locale/ru'

const Date = ({ dateString, format }) => {
  const dateTime = moment(dateString)
    .locale('ru')
    .format()

  const date = moment(dateString)
    .locale('ru')
    .format(format)

  return <time dateTime={dateTime}>{date}</time>
}

Date.propTypes = {
  dateString: PropTypes.string,
  format: PropTypes.string,
}

export default Date
