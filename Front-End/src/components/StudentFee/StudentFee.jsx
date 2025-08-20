import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { IMAGES } from "../../constants/images";
import text from "../../constants/resources.json";
const images = [IMAGES.CS1, IMAGES.CS2, IMAGES.CS3, IMAGES.CS4, IMAGES.CS5];
const cities = [text.HANOI, text.DANANG, text.CANTHO, text.TPHCM, text.CANTHO];
const studentFees = [text.HPHANOI, text.HPDANANG, text.HPCANTHO, text.HPTPHCM, text.HPCANTHO]
export default function StudentFee() {
  return (
    <div className="flex MyGradient w-[76%] mx-[12%] py-10 overflow-hidden">
      <motion.div
        initial={{ x: `0` }}
        animate={{ x: `-100%` }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="flex flex-shrink-0"
      >
        {images.map((images, index) => {
          return (
            <div className="bg-orange-500 mx-[2%] w-[40%] h-80 rounded-2xl flex flex-col gap-4 items-start justify-start">
              <img className=" w-full max-h-[70%] object-contain rounded-2xl" src={images} key={index} />
              <div className="pl-4 text-xl font-bold text-white">
                {cities[index]}
              </div>
              <div className="pl-4 text-base font-medium text-white">
                {studentFees[index]}
              </div>
            </div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ x: `0` }}
        animate={{ x: `-100%` }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="flex flex-shrink-0"
      >
        {images.map((images, index) => {
          return (
            <div className="bg-orange-500 mx-[2%] w-[40%] h-80 rounded-2xl flex flex-col gap-4 items-start justify-start">
              <img className=" w-full max-h-[70%] object-contain rounded-2xl" src={images} key={index} />  
              <div className="pl-4 text-xl font-bold text-white">
                {cities[index]}
              </div>
              <div className="pl-4 text-base font-medium text-white">
                {studentFees[index]}
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
