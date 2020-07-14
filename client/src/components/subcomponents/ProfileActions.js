import React from 'react'
import { useDispatch } from 'react-redux'

import { followUser, unfollowUser } from '../../modules/actions'

function ProfileActions(props) {

  const dispatch = useDispatch()

  const renderFollow = () => {
    const isFollowing = props.me.following.find(user => user.id === props.user.id)
    if (isFollowing) {
      return (
        <div 
          className="profile-actions__following-btn"
          onClick={() => dispatch(unfollowUser(props.user.id))}
        >
          Following
        </div>
      )
    } else {
      return (
      <div 
        className="profile-actions__primary-btn"
        onClick={() => dispatch(followUser(props.user.id))}
      >
        Follow
      </div>
      )
    }
  }

  if (props.user.id === props.me.id) {
    return (      
      <div className="profile-actions__primary-btn">
        Edit profile   
      </div>
    )
  } else {
    return renderFollow()
  }
}

export default ProfileActions
