import React from "react";
import play from "../../assets/play.svg";
import { Link } from "react-router-dom";
import text from "../../constants/resources.json";
import { IMAGES } from "../../constants/images";
const RecruitmentMethod = () => {
  return (
    <div>
      <div className="text-orange-500 font-bold text-2xl flex justify-center p-8">
        {text.PhuongThucTuyenSinh}
      </div>
      <div className="flex relative justify-center">
        <div className="w-[30%] h-96 bg-[#f2f0f1] rounded-2xl z-40 relative flex">
          <div className="flex flex-col gap-8 justify-center p-5 items-center ">
            <div className="text-orange-500 font-bold text-2xl ">
              {text.XetKetQua}
            </div>

            <p>
              {text.DatKetQua}
              <Link to="https://schoolrank.fpt.edu.vn/" className="block">
                <div>https://schoolrank.fpt.edu.vn/</div>
              </Link>
              {text.DatKetQua1}
            </p>
            <button className="flex justify-center gap-3 py-2 bg-orange-500  rounded-2xl text-white hover:bg-orange-600">
              <img src={play} alt="" className="w-[5%] h-auto text-white" />
              {text.XemChiTiet}
            </button>
          </div>
          <div className="flex flex-col justify-center">
            <img src={IMAGES.PTTS} alt="" />
          </div>
        </div>
        <div className="w-[19%] h-96 bg-orange-500 rounded-2xl z-30 relative -ml-20 text-white text-xl font-bold flex flex-col justify-center pl-24 pr-10">{text.PTTS1}</div>
        <div className="w-[19%] h-96 bg-orange-600 rounded-2xl z-20 relative -ml-20 text-white text-xl font-bold flex flex-col justify-center pl-24 pr-10">{text.PTTS2}</div>
        <div className="w-[19%] h-96 bg-orange-500 rounded-2xl z-10 relative -ml-20 text-white text-xl font-bold flex flex-col justify-center pl-24 pr-10">{text.PTTS3}</div>
      </div>
    </div>
  );
};

export default RecruitmentMethod;
