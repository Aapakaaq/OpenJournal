import { NavLink } from 'react-router-dom';
import './NavigationBar.css'

export default function NavigationBar(){
    return (
        <nav className="navigation-bar">
                    <NavLink to='/write'
                        className={({ isActive }) => (isActive ? "link-active" : "link")}
                        >
                        Write
                    </NavLink>
                    <NavLink to='/review'
                        className={({ isActive }) => (isActive ? "link-active" : "link")}
                        >
                        Review
                    </NavLink>
                    <NavLink to='/settings'
                        className={({ isActive }) => (isActive ? "link-active" : "link")}
                        >
                        Settings
                    </NavLink>
        </nav>
    );
}
