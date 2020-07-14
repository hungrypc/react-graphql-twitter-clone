import React, { Fragment } from 'react'

function ProfileActions(props) {

  const renderFollow = () => {
    const isFollowing = props.me.following.find(user => user.id === props.user.id)
    if (isFollowing) {
      return <div className="profile-actions__following-btn">Following</div>
    } else {
      return <div className="profile-actions__primary-btn">Follow</div>
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
