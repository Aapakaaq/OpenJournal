import {Outlet} from "react-router-dom";
import {NavigationBar} from "../components/NavigationBar";
import './Root.css'
import { JournalProvider } from "../contexts/JournalContext";

export default function Root() {
  return (
    <>
      <NavigationBar/>
      <div className="content">
        <JournalProvider>
        <Outlet/>
        </JournalProvider>
      </div>
    </>
  );
}
