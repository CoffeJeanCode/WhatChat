import React, { useState } from 'react'
import { useLocation } from 'wouter'
import { useTitle } from '../hooks/useTitle'

export default function Join() {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [, setLocation] = useLocation()
  useTitle(`WhatChat`)
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setLocation(`/chat/${room}/${name}`)
          }}
        >
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
          <button className="button mt-20" type="submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
