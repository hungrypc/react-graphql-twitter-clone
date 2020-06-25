import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { getUserProfileData } from '../modules/actions'

function Profile(props) {

  console.log(props.match.params.username)
  useEffect(() => {
    if(!props.userProfileData.user) {
      props.getUserProfileData(props.match.params.username)
    }
  }, [props.userProfileData.user])

  const renderProfile = () => {
    if (!props.userProfileData.user.username) {
      return <div>user does not exist</div>
    } else {
        return (
          <h1>{props.userProfile.user.username}</h1>
        )
    }
  }

  return (
    <div>
      {renderProfile()}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    userProfileData: state.userProfileData
  }
}

export default connect(mapStateToProps, {
  getUserProfileData
})(Profile)
