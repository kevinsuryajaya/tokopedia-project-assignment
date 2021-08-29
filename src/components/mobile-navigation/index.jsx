import * as React from "react";
import { Link } from "react-router-dom";
import "../../css/mobile-navigation.css";

export default function MobileNavigation() {
  return (
    <React.Fragment>
      <ul className="mobile">
        <li className="mobile__tab">
          <Link className="mobile__navigation" to="/">
            <i className="mobile__logo fa fa-home" aria-hidden="true"></i>
            <p className="mobile__title">Pokemon List</p>
          </Link>
        </li>
        <li className="mobile__tab">
          <Link className="mobile__navigation" to="/my-pokemon">
            <i className="mobile__logo fa fa-user" aria-hidden="true"></i>
            <p className="mobile__title">My Pokemon</p>
          </Link>
        </li>
      </ul>
    </React.Fragment>
  );
}
