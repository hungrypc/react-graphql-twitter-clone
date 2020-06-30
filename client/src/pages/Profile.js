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
        <div className="profile__info"></div>
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
