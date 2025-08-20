import React from "react";
import text from "../../constants/resources.json";
import pic1 from "../../assets/world.svg";
import pic2 from "../../assets/handsake.svg";
import pic3 from "../../assets/lightBulb.svg";
import pic4 from "../../assets/job.svg";
import pic5 from "../../assets/vietnam.svg";

const Reason = () => {
  const pics = [pic1, pic2, pic3, pic4, pic5];

  return (
    <div>
      <div className="text-orange-500 font-bold text-2xl flex justify-center p-8">
        {text.LyDo}
      </div>
      <div className="flex justify-center gap-4">
        {[1, 2, 3, 4, 5].map((i, index) => {
          const title = text[`LyDo${i}`];
          const detail = text[`ChiTietLyDo${i}`];
          return (
            <div
              key={index}
              className="w-[15%] h-80  bg-orange-500 rounded-3xl text-white flex flex-col items-center p-4"
            >
              {/* Fixed image area */}
              <div className="h-[40%] flex items-center justify-center">
                <img
                  src={pics[index]}
                  alt=""
                  className="w-[70%] max-h-full object-contain"
                />
              </div>
              <div className="text-center mt-2 font-semibold">{title}</div>
              <div className="text-center mt-1 text-sm">{detail}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reason;
