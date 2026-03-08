import SideBar from "./common/sidebar"
import { Outlet } from 'react-router'
import { useLocation } from "react-router";


function App() {
  const location = useLocation();
  const hideSideBar = location.pathname === "/" || location.pathname === "/registration";

  return (
    <>
      <div className="flex">
        {!hideSideBar && <SideBar />}
        <div className="flex-1 bg-slate-50 min-h-screen">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default App;
