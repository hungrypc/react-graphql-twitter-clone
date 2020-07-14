import React, { Fragment } from 'react'

function ProfileActions(props) {

  if (props.user.id === props.me.id) {
    return (
      <Fragment>
        Edit profile   
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        Follow
      </Fragment>
    )
  }

}

export default ProfileActions
