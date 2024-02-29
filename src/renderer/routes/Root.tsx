import { Outlet } from "react-router-dom";
import { NavigationBar } from "../components/NavigationBar";
import './Root.css'
export default function Root() {
    return (
        <>
            <NavigationBar />
        <div className="content">
            <Outlet />
        </div>
    </>
  );
}
