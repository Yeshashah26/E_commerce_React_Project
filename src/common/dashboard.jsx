import Sidebar from "./sidebar" 
import HeaderBar from "./headerbar"
const Dashboard = () => {
    console.log("dashboard")
    const userData = JSON.parse(localStorage.getItem('user')) 

    console.log(userData)
    return (
        <>  
        <div className="flex " >
            <HeaderBar />
            {/* <h1>
               Dashboard
            </h1> */}
        </div>
        </>
    );
}

export default Dashboard;