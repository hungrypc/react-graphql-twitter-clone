import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function Nav(props) {
  console.log(props.currentUser)

  const showNav = () => {
    if (props.currentUser) {
      return (
        <div className="navbar__nav-container">
          <div className="nav--logo">
            <div><i class="fab fa-twitter"></i></div>
          </div>
          <div className="navbar__nav--loc">
            <div className="navbar__nav-link">
              <Link to="/home">
                <div className="navbar__nav-link--a">
                  <i className="fas fa-home"></i> <span>Home</span>
                </div>
              </Link>
            </div>
            <div className="navbar__nav-link">
              <Link to="/home">
                <div className="navbar__nav-link--a">
                  <i class="fas fa-hashtag"></i> <span>Explore</span>
                </div>
              </Link>
            </div>
            <div className="navbar__nav-link">
              <Link to="/home">
                <div className="navbar__nav-link--a">
                  <i class="fas fa-bell"></i> <span>Notifications</span>
                </div>
              </Link>
            </div>
            <div className="navbar__nav-link">
              <Link to="/home">
                <div className="navbar__nav-link--a">
                  <i class="fas fa-envelope"></i> <span>Messages</span>
                </div>
              </Link>
            </div>
            <div className="navbar__nav-link">
              <Link to="/home">
                <div className="navbar__nav-link--a">
                  <i class="fas fa-bookmark"></i> <span>Bookmarks</span>
                </div>
              </Link>
            </div>
            <div className="navbar__nav-link">
              <Link to={`/${props.currentUser.username}`}>
                <div className="navbar__nav-link--a">
                  <i class="fas fa-user"></i> <span>Profile</span>
                </div>
              </Link>
            </div>
          </div>
          {/* <div className=""></div> */}
        </div>
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
