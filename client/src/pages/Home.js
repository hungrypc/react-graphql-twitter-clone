import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { me } from '../modules/actions'


function Home(props) {

  let history = useHistory()

  useEffect(() => {
    props.me()
    if (!props.isSignedIn) {
      history.push('/login')
    }
  }, [props.isSignedIn])
  
  return (
    <div className="page">
      Home
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn,
    user: state.auth.user
  }
}

export default connect(mapStateToProps, {
  me
})(Home)
