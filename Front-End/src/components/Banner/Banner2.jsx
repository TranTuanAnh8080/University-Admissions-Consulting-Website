import React from "react";
import banner from "../../assets/Banner.png";


const Banner2 = () => {

  return (
    <div className="relative">
      {/* Hiển thị LoadingPage khi đang tải */}
      
      <img src={banner} alt="" className="w-full h-auto" />
    </div>
  );
};

export default Banner2;
