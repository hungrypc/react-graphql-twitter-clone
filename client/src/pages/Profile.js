import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import Tweet from '../components/Tweet'
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
              {props.user.data.name} {props.user.data.public ? null : (<i class="fas fa-lock"></i>)}
            </div>
            <div className="profile__info--user-username">
              @{props.user.data.username}
            </div>
            <div className="profile__info--user-createdAt">
              <i class="far fa-calendar-alt"></i> Joined {moment(props.user.data.createdAt).format('MMMM YYYY')}
            </div>
            <div className="profile__info--user-follow">
              <div className="profile__info--user-follow-container">
                <span className="follow-count">{props.user.data.following.length}</span><span>Following</span>
              </div>
              <div className="profile__info--user-follow-container">
                <span className="follow-count">{props.user.data.followers.length}</span><span>Followers</span>
              </div>
            </div>
          </div>
        </div>
        <div className="profile__filter">
          <div className="profile__filter--item">Tweets</div>
          <div className="profile__filter--item">Replies</div>
          <div className="profile__filter--item">Media</div>
          <div className="profile__filter--item">Likes</div>
        </div>
        <div className="profile__tweets">
          {props.user.data.tweets.map(tweet => <Tweet data={tweet}/>)}
        </div>
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
