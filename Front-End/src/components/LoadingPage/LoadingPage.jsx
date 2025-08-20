import React from "react";

const LoadingPage = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-blue-50 bg-or">
    {/* Logo FPT Education */}
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/FPT_Education_logo.svg/2560px-FPT_Education_logo.svg.png"
      alt="FPT Education Logo"
      className="h-20 w-auto mb-6 animate-pulse contrast-125 saturate-150"
    />
    {/* Spinner */}
    <div className="flex items-center space-x-3 mb-3">
      <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-xl font-semibold text-orange-600 font-sans
       animate-pulse contrast-125 saturate-150">
        Đang chuyển trang...
      </span>
    </div>
    <p className="mt-4 text-lg-500 text-xl animate-pulse">FPT University - Hành trình tri thức</p>
  </div>
);

export default LoadingPage;