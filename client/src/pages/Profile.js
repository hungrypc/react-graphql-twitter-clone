import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { getUserProfileData } from '../modules/actions'

function Profile(props) {

  useEffect(() => {
    props.getUserProfileData(props.match.params.username)
  }, [])

  return (
    <div>
      <h1>{props.user.data.name}</h1>
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
