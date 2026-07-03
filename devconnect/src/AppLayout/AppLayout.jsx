import Navbar from "@/components/navbar/Navbar";
import { Outlet } from "react-router-dom"

const AppLayout = () => {
    return (
        <div className="layout">
            <Navbar />

            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default AppLayout;