import React from 'react'

function Tweet(props) {
  return (
    <div className="tweet">
      <div className="tweet__dp">
        <div className="tweet__dp--img"></div>
      </div>
      <div className="tweet__container">
        <div className="tweet__container--header"></div>
        <div className="tweet__container--content">
          {props.data.text}
        </div>
        <div className="tweet__container--actions"></div>
      </div>
    </div>
  )
}

export default Tweet
