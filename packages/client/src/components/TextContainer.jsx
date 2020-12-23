import React from "react";

const TextContainer = ({ users }) => (
  <div className="textContainer">
    {users && window.innerWidth > 480 && (
      <div>
        <h1>People currently chatting:</h1>
        <div className="activeContainer">
          <h2>
            {users.map(({ name }) => (
              <div key={name} className="activeItem">
                {name}
                <img alt="Online" src="/onlineIcon.png" />
              </div>
            ))}
          </h2>
        </div>
      </div>
    )}
  </div>
)

export default TextContainer;
