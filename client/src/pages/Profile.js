import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { getUserProfileData } from '../modules/actions'

function Profile(props) {

  useEffect(() => {
    props.getUserProfileData(props.match.params.username)
  }, [])

  return (
    <div className="page">
      <div className="profile">
        <div className="profile__header">
          <div className="profile__header--username">{props.user.data.name}</div>
          <div className="profile__header--tweetcount">
            {props.user.data.tweets.length} Tweets
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__info--banner"></div>
          <div className="profile__info--dp">
            <div></div>
          </div>
          <div className="profile__info--user">
            <div className="profile__info--user-name">
              {props.user.data.name}
            </div>
            <div className="profile__info--user-username">
              @{props.user.data.username}
            </div>
            <div className="profile__info--user-follow">
              <div className="profile__info--user-follow-following">
                <span>{props.user.data.following.length}</span>
              </div>
              <div className="profile__info--user-follow-followers">
                <span>{props.user.data.followers.length}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="profile__filter"></div>
        <div className="profile__tweets"></div>
      </div>
      <div className="sidebar"></div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.userProfileData
  }
}

export default connect(mapStateToProps, {
  getUserProfileData
})(Profile)
