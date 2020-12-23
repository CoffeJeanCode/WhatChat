import { config } from 'dotenv'
config()

import express from 'express'
import cors from 'cors'
import SocketIO from 'socket.io'
import http from 'http'
import router from './router/index.route.js'

import {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} from './controllers/user.ctr'

// Intialization
const app = express()
const server = http.createServer(app)
const io = SocketIO(server)

app.set('port', process.env.PORT || 4000)

// Socket IO
io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room })

    if (error) return callback(error)

    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to room ${user.room}`,
    })

    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name} has join!` })

    socket.join(user.room)

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom({ room: user.room }),
    })

    callback()
  })

  socket.on('sendMessage', (message, callback) => {
    const user = getUser({ id: socket.id })

    if (!user) return

    io.to(user.room).emit('message', { user: user.name, text: message })
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom({ room: user.room }),
    })

    callback()
  })

  socket.on('disconnect', () => {
    const user = removeUser({ id: socket.id })

    if (user) {
      io.to(user.room).emit('message', {
        user: 'admin',
        text: `${user.name} has left.`,
      })
    }
  })
})

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use(router)

export { app, server }
