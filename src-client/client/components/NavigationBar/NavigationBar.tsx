import {NavLink} from 'react-router-dom';
import './NavigationBar.css'
import '../../global CSS/DisabledText.css'
export default function NavigationBar() {
  return (
    <nav className="navigation-bar">
      <NavLink to='/write'
               className={({isActive}) => (isActive ? "link-active" : "disabled-font")}
      >
        Write
      </NavLink>
      <NavLink to='/review'
               className={({isActive}) => (isActive ? "link-active" : "disabled-font")}
      >
        Review
      </NavLink>
      <NavLink to='/settings'
               className={({isActive}) => (isActive ? "link-active" : "disabled-font")}
      >
        Settings
      </NavLink>
    </nav>
  );
}
