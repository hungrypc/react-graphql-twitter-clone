import React from 'react'
import moment from 'moment'

function Tweet(props) {
  return (
    <div className="tweet">
      <div className="tweet__dp">
        <div className="tweet__dp--img"></div>
      </div>
      <div className="tweet__container">
        <div className="tweet__container--header">
          <div className="tweet__container--header-name">{props.data.author.name}</div>
          <div className="tweet__container--header-username">@{props.data.author.username}</div>
          <div className="tweet__container--header-createdAt">
            ·&nbsp; {moment(props.data.createdAt).format("MMM Do, YYYY")}
          </div>
        </div>
        <div className="tweet__container--content">
          {props.data.text}
        </div>
        <div className="tweet__container--actions">
          <div><i className="far fa-comment"></i></div>
          <div><i className="fas fa-retweet"></i></div>
          <div><i className="far fa-heart"></i></div>
          <div><i className="fas fa-share-alt"></i></div>
          <div><i className="far fa-chart-bar"></i></div>
        </div>
      </div>
    </div>
  )
}

export default Tweet
