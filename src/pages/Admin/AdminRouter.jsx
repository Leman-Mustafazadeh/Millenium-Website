import React, { useEffect } from "react";
import AdminAppBar from "../../components/layout/Admin/AdminAppBar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const AdminRouter = () => {
  const cookiedata = Cookies.get("ftoken");
  const navigate= useNavigate()
  useEffect(() => {
    if (!cookiedata) {
      navigate("/admin/login");
    }
  }, []);
  return (
    <>
      <div style={{ display: "flex" }}>
        <AdminAppBar className="appbar" />
      </div>
    </>
  );
};

export default AdminRouter;
