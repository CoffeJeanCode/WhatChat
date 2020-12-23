import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Join() {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <form>
          <h1 className="title">What Chat</h1>
          <h2 className="heading">Join</h2>
          <div>
            <input
              required
              type="text"
              placeholder="Name"
              className="joinInput"
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </div>
          <div>
            <input
              required
              type="text"
              placeholder="Room"
              className="joinInput mt-20"
              onChange={(e) => setRoom(e.target.value)}
            />
          </div>
          <Link
            onClick={(e) => (!name || !room ? e.preventDefault() : null)}
            onKeyPress={(e) => (e.key === 'Enter' ? e.preventDefault() : null)}
            to={`/chat/?name=${name}&room=${room}`}
          >
            <button className="button mt-20" type="submit">
              Sign In
            </button>
          </Link>
        </form>
      </div>
    </div>
  )
}
