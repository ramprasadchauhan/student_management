import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "./DashSidebar";
import DashProfile from "./DashProfile";
import DashUsers from "../components/DashUsers";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    console.log(tabFromUrl);
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashSidebar />
      </div>
      {tab === "profile" && <DashProfile />}
      {tab === "users" && <DashUsers />}
    </div>
  );
};

export default Dashboard;
