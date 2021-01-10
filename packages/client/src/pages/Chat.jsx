import React, { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'

import InfoBar from '../components/InfoBar'
import Input from '../components/Input'
import Messages from '../components/Messages'
import TextContainer from '../components/TextContainer'

import notification from '../assets/notification.mp3'
import { useTitle } from '../hooks/useTitle'

let socket

const ENDPOINT = 'https://chattie-sockets.herokuapp.com/'

export default function Chat({ params }) {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])
  const notificationRef = useRef(null)
  useTitle(`${params.name} | WhatChat`)

  useEffect(() => {
    socket = io(ENDPOINT)

    const { name, room } = params

    setRoom(room)
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      error && alert(error)
    })
    notificationRef.current.volume = 50 / 100

    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message])

      const { user } = message
      const trimedName = name.trim().toLowerCase()

      if (user !== trimedName) {
        notificationRef.current.play()
      }
    })

    socket.on('roomData', ({ users }) => {
      setUsers(users)
    })
  }, [])

  const sendMessage = (e) => {
    e.preventDefault()

    if (message) {
      socket.emit('sendMessage', message)
      setMessage('')
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
        <audio ref={notificationRef} src={notification}></audio>
      </div>
      <TextContainer users={users}></TextContainer>
    </div>
  )
}
