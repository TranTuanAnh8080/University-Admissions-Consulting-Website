import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, AlertCircle, GraduationCap, Mail, Lock, User } from "lucide-react";
import axios from "axios";
import LoadingPage from "../LoadingPage/LoadingPage";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false); // Thêm state cho toast

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); // Hook để điều hướng

  // "Microsoft Identity Claims": Backend sử dụng Microsoft Identity framework,
  //  nên role được lưu theo format claim standard của Microsoft

  // Hàm decode JWT token để lấy role
  const decodeJWTToken = (token) => { // Hàm này sẽ decode JWT token
    try {
      // JWT có 3 phần: header.payload.signature
      const base64Url = token.split(".")[1]; // Payload được mã hóa dưới dạng Base64URL
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Hàm này chuyển đổi về định dạng Base64 chuẩn

      // Decode Base64 và xử lý UTF-8
      const jsonPayload = decodeURIComponent(  // Payload có thể chứa ký tự Unicode, cần xử lý đúng encoding
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload); // Chuyển đổi chuỗi JSON thành object JavaScript
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return null;
    }
  };

  // Trích xuất thông tin role/quyền từ JWT token Payload đã được decode
  const getRoleFromToken = (decodedToken) => {
    if (!decodedToken) return null;

    // Kiểm tra các trường role có thể có
    const roleClaims = [
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role", // Claim chuẩn của Microsoft Identity
      "role",
      "userRole",
      "user_role",
      "authority",
      "authorities",
      "scope",
    ];

    for (const claim of roleClaims) { // Duyệt qua từng claim để tìm role
      if (decodedToken[claim]) {
        return decodedToken[claim];
      }
    }

    return null;
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form (submit, reload trang, v.v.)
    let newErrors = {};

    // email regex để kiểm tra định dạng email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!username && !password) {
      newErrors.password = "Please fill out this field";
      newErrors.username = "Please fill out this field";
    } else if (!username) {
      newErrors.username = "Please fill out this field";
    } else if (!password) {
      newErrors.password = "Please fill out this field";
    } else if (!emailRegex.test(username)) {
      newErrors.username = "Please enter a valid email address";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) { // Nếu có lỗi, không thực hiện đăng nhập
      setIsLoading(false);
      return;
    }

    setIsLoading(true); // Bắt đầu quá trình đăng nhập

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login", // Địa chỉ API đăng nhập
        {
          email: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Full response:", response);
      console.log("Response data:", response.data);

      if (response.status === 200) {
        const { data } = response; // Lấy dữ liệu từ response

        // Lấy token từ response
        const token = data.token || data.accessToken || data.access_token;

        if (token) { // Kiểm tra xem token có tồn tại không ?

          // Decode JWT token để lấy role
          const decodedToken = decodeJWTToken(token);
          console.log("Decoded token payload:", decodedToken);

          const role = getRoleFromToken(decodedToken);
          console.log("Extracted role:", role);

          // Lưu token và role vào localStorage
          localStorage.setItem("token", token);
          if (role) {
            localStorage.setItem("role", role);
          }

          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);

          setTimeout(() => {

            const userRole = role ? role.toUpperCase() : ""; // Chuyển role về chữ hoa để so sánh

            if (userRole === "ADMIN") {
              navigate("/admin");
            } else if (
              userRole === "CONSULTANT"
            ) {
              navigate("/consultant");
            } else {
              navigate("/");
            }
          }, 2500);
        } else {
          setErrors("Login response missing token");
          setErrorMessage("Login response missing token");
          setShowError(true);
          setTimeout(() => setShowError(false), 3000);
        }
      } else {
        setErrors("Unexpected response status: " + response.status);
        setErrorMessage("Unexpected response status: " + response.status);
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      }
    } catch (error) {
      console.error("Login error:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message); // Lấy thông báo lỗi từ response
      } else {
        setErrors({ username: "Network error. Please try again." });
        setErrorMessage("Network error. Please try again."); // Thông báo lỗi chung nếu không có thông tin cụ thể
      }

      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 to-orange-50 contrast:150 saturate-150 brightness-100">
      {/* Background Image */}

      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://fptcity.vn/wp-content/uploads/FPT_bridview_final-1-scaled.jpg')`,
        }}
      />
      <div className="overflow-hidden bg-gradient-to-br from-blue-50 to-orange-50">
        {/* Notification Bar */}
        {showSuccess && (
          <div className="fixed top-6 right-6 z-50">
            <div className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg animate-fade-in-down font-serif">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Đăng nhập thành công!
            </div>
          </div>
        )}

        {showError && (
          <div className="fixed top-6 right-6 z-50">
            <div
              className="flex items-center px-6 py-3 bg-red-500 text-white rounded-lg shadow-2xl transition-transform duration-500 ease-out transform scale-105"
              style={{
                transform: showError ? "translateX(0)" : "translateX(100%)",
                boxShadow:
                  "0 8px 32px 0 rgba(239,68,68,0.45), 0 1.5px 8px 0 rgba(0,0,0,0.15)",
              }}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span className="font-serif text-lg drop-shadow-lg">
                {errorMessage}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Login Form Container */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-95">
            {/* Logo Section */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/FPT_Education_logo.svg/2560px-FPT_Education_logo.svg.png"
                  alt="FPT Education Logo"
                  className="h-16 w-auto ml-4"
                  style={{ backgroundColor: "transparent" }} // Đảm bảo logo có nền trong suốt
                />
              </div>
              <h1 className="text-3xl font-bold text-orange-500 mb-2">
                TRƯỜNG ĐẠI HỌC FPT
              </h1>
              <div className="flex items-center justify-center mt-4 space-x-2 text-sm text-gray-500 mr-3">
                <GraduationCap className="w-4 h-4 " />
                <span>Dành cho cán bộ, giảng viên & nhân viên</span>
              </div>
            </div>

            {/* Login Form */}
            <div className="space-y-4">
              {/* Username Field */}
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Địa chỉ email
              </label>
              <div className="relative">
                <input
                  type="email"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 text-x border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 text-gray-700 "
                  placeholder="Nhập email"
                  required
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                {errors.username && (
                  <div className="text-red-500 text-sm flex items-center font-serif mt-auto">
                    <AlertCircle size={16} className="mr-1" />
                    {errors.username}
                  </div>
                )}
              </div>

              {/* Password Field */}
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 text-gray-700 pr-12"
                  placeholder="Nhập mật khẩu"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors flex items-center justify-center"
                  style={{ pointerEvents: "auto" }} // Đảm bảo nút luôn ở vị trí này
                  tabIndex={-1} // Không bị focus khi tab qua lỗi
                >
                  {showPassword ? (
                    <EyeOff size={20} flex items-center justify-center />
                  ) : (
                    <Eye size={20} flex items-center justify-center />
                  )}
                </button>
                {errors.password && (
                  <div className="text-red-500 text-sm flex items-center font-serif absolute left-0 w-full mt-auto">
                    <AlertCircle size={16} className="mr-1" />
                    {errors.password}
                  </div>
                )}
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                disabled={isLoading} // khi nút đang loading thì không cho người dùng click nữa
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 mt-10 ${isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 active:scale-95"
                  } shadow-lg hover:shadow-xl cursor-grab`}
              >
                {isLoading ? ( // Hiển thị loading khi đang đăng nhập
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Đang đăng nhập...
                  </div>
                ) : showSuccess ? ( // Hiển thị loading khi đang điều hướng
                  <div className="flex items-center justify-center opacity-60">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Đang điều hướng trang...
                  </div>
                ) : (
                  "Đăng nhập"
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
