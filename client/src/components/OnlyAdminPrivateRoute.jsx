import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const OnlyAdminPrivateRoute = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    if (!currentUser) {
      navigate("/sign-in");
    }
  }, [currentUser, navigate]);
  return currentUser.isAdmin ? <Outlet /> : null;
};

export default OnlyAdminPrivateRoute;
