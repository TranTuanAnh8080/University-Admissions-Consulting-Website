import React from "react";
import banner from "../../assets/Banner.png";
import text from "../../constants/resources.json";
import LoadingPage from "../LoadingPage/LoadingPage";
import { useNavigate } from "react-router-dom";
const Banner = () => {

  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const handleRegisterClick = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate('/admission-form');
    }, 1000); // 1 giây loading, có thể điều chỉnh
  };


  return (
    <div className="relative">
      {/* Hiển thị LoadingPage khi đang tải */}
      {loading && <LoadingPage />}
      <img src={banner} alt="" className="w-full h-auto" />
      <button
        className="absolute top-[81%] left-[26%] transform -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white font-bold text-2xl w-[17%] h-[8%] rounded-3xl border border-white hover:bg-orange-700"
        onClick={handleRegisterClick}
      >
        <span className="w-full h-full flex items-center justify-center">
          {text.DangKyNgay}
        </span>
      </button>
    </div>
  );
};

export default Banner;
