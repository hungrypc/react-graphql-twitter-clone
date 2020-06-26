import React from 'react'
import { connect } from 'react-redux'

function Nav(props) {

  const showNav = () => {
    if (props.currentUser) {
      return (
        <div>nav content</div>
      )
    } else {
      return null
    }
  }

  return (
    <header className="navbar">
      <div className="navbar__container">
        <div className="navbar__nav">
          {showNav()}
        </div>
      </div>
    </header>
  )

}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.user
  }
}

export default connect(mapStateToProps)(Nav)
