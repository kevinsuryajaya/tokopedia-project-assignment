import * as React from 'react';
import { Link } from 'react-router-dom';
import '../../css/navigation-bar.css';
import test from '../../assets/images/profile.jpg';

export default function NavigationBar() {
  const [toggle, setToggle] = React.useState(false);

  return (
    <React.Fragment>
      <nav className={toggle === true ? 'open' : ''}>
        <div className='navigation'>
          <Link to='/'>
            <div className='nav-brand'>Pokemon Project</div>
          </Link>
          {/* This is only for better UI */}
          <div className='search-feature'>
            <i className='fa fa-search icon' aria-hidden='true'></i>
            <input className='input-search' placeholder='Find Pokemon' />
          </div>
          <div className='icon-section'>
            <i className='fa fa-heart ui-icon' aria-hidden='true'></i>
            <i className='fa fa-envelope ui-icon' aria-hidden='true'></i>
            <i className='fa fa-bell ui-icon' aria-hidden='true'></i>
            <Link className='desktop-link' to='/my-pokemon'>
              <i className='fa fa-user ui-icon' aria-hidden='true'></i>
              <span>My Pokemon</span>
            </Link>
          </div>
          {/* // */}
          <button className='toggler' onClick={() => setToggle(!toggle)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className='nav-collapse'>
            <span className='navbar-link'>
              <Link to='/'>
                <div onClick={() => setToggle(false)}>
                  <i className='fa fa-home' aria-hidden='true'></i>
                  <span>Pokemon List</span>
                </div>
              </Link>
            </span>
            <span className='navbar-link'>
              <Link to='/my-pokemon'>
                <div onClick={() => setToggle(false)}>
                  <img src={test} alt='Avatar' className='avatar' />
                  <span>My Pokemon</span>
                </div>
              </Link>
            </span>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}
