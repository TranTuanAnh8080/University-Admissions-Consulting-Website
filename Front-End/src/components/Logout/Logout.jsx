import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Xoá token khỏi localStorage
    localStorage.removeItem("token");

    // (Tùy chọn) Xoá thêm dữ liệu người dùng nếu có
    // localStorage.removeItem('user');

    // Chuyển hướng về trang login
    navigate("/login");
  }, [navigate]);

  return null; // Không cần render gì cả
};

export default Logout;
