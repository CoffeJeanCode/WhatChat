import React from 'react'

const IconType = ({ type }) => {
  switch (type) {
    case 'closeIcon':
      return <img src="/closeIcon.png" alt="icon" />
    case 'onlineIcon':
      return <img src="/onlineIcon.png" alt="icon" />
  }
}

export default function Icon({ type }) {
  return (
    <div className="icon">
      <IconType type={type} />
    </div>
  )
}
