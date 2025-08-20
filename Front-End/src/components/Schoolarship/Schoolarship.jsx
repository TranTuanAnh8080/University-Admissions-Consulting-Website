import React from "react";
import text from "../../constants/resources.json";
import { IMAGES } from "../../constants/images";
import play from "../../assets/play.svg";

const Schoolarship = () => {
  const pics = [IMAGES.HOCBONG1, IMAGES.HOCBONG2, IMAGES.HOCBONG3];

  return (
    <div>
      <div className="text-orange-500 font-bold text-2xl flex justify-center p-8">
        {text.HocBongSlogan}
      </div>

      <div className="flex justify-center gap-4">
        {[1, 2, 3].map((i, index) => {
          const title = text[`HocBong${i}`];
          const detail = text[`HocBongChiTiet${i}`];

          return (
            <div
              key={index}
              className="w-[25%] h-64 bg-[#f2f0f1] rounded-3xl text-gray-600 flex items-start pt-11 justify-between p-4"
            >
              <div className="flex-1 pr-4 pl-2 ">
                <div className="text-orange-500 text-2xl font-bold mb-2">
                  {title}
                </div>
                <div className="">{detail}</div>
              </div>

              <div className="w-[40%] h-full flex items-center justify-center">
                <img
                  src={pics[index]}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-8">
        <button className="flex justify-center gap-3 py-2 bg-orange-500  rounded-2xl text-white hover:bg-orange-600">
          <img src={play} alt="" className="w-[2%] h-auto text-white" />
          {text.DangKyHocBong}
        </button>
      </div>
    </div>
  );
};

export default Schoolarship;
