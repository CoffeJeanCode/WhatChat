import React from 'react'

export default function Input({ message, setMessage, sendMessage }) {
  const handleMessageValue = ({ currentTarget: { value } }) => setMessage(value)

  const handleSendMessage = (e) => {
    e.preventDefault()
    sendMessage(e)
  }

  return (
    <form className="form" onSubmit={handleSendMessage}>
      <input
        className="input"
        type="text"
        value={message}
        onChange={handleMessageValue}
        autoFocus
      />
      <button className="sendButton">
        <i className="fal fa-paper-plane"></i>
      </button>
    </form>
  )
}
