import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import Tweet from '../components/Tweet'
import ProfileActions from '../components/subcomponents/ProfileActions'
import { getUserProfileData } from '../modules/actions'

function Profile(props) {

  const renderProfile = () => {
    if (props.user.id) {
      return (
        <Fragment>
          <div className="profile__header">
            <div className="profile__header--username">{props.user.name}</div>
            <div className="profile__header--tweetcount">
              {props.user.tweets.length} Tweets
            </div>
          </div>
          <div className="profile__info">
            <div className="profile__info--banner"></div>
            <div className="profile__info--dp">
              <div className="profile__info--dp-image"></div>
              <div className="profile__info--dp-actions">
                <ProfileActions user={props.user} me={props.me} />
              </div>
            </div>
            <div className="profile__info--user">
              <div className="profile__info--user-name">
                {props.user.name} {props.user.public ? null : (<i className="fas fa-lock"></i>)}
              </div>
              <div className="profile__info--user-username">
                @{props.user.username}
              </div>
              <div className="profile__info--user-createdAt">
                <i className="far fa-calendar-alt"></i> Joined {moment(props.user.createdAt).format('MMMM YYYY')}
              </div>
              <div className="profile__info--user-follow">
                <div className="profile__info--user-follow-container">
                  <span className="follow-count">{props.user.following.length}</span><span>Following</span>
                </div>
                <div className="profile__info--user-follow-container">
                  <span className="follow-count">{props.user.followers.length}</span><span>Followers</span>
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
            {props.user.tweets.map(tweet => <Tweet key={tweet.id} data={tweet}/>)}
          </div>
        </Fragment>
      )
    } else {
      return null
    }
  }


  useEffect(() => {
    props.getUserProfileData(props.match.params.username)
  }, [props.match.params.username])

  return (
    <div className="page">
      <div className="profile content">
        {renderProfile()}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.userProfileData.data,
    me: state.auth.user
  }
}

export default connect(mapStateToProps, {
  getUserProfileData
})(Profile)
