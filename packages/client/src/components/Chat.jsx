import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import InfoBar from './InfoBar'
import Input from './Input'
import Messages from './Messages'
import TextContainer from './TextContainer'

import notification from '../assets/juntos.mp3'

let socket
const ENDPOINT = 'https://chattie-sockets.herokuapp.com/'
export default function Chat({ location }) {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])

  useEffect(() => {
    socket = io(ENDPOINT)

    const { name, room } = queryString.parse(location.search)

    setRoom(room)
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      error && alert(error)
    })
  }, [ENDPOINT, location.search])

  useEffect(() => {
    const notificationRef = useRef(null)
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
    // eslint-disable-next-line
  }, [])

  const sendMessage = (e) => {
    e.preventDefault()

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
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
