import React from "react";
import text from "../../constants/resources.json";

const columns = [
  // Cột 1
  [
    {
      title: text.CongNgheThongTin,
      items: [
        text.CongNgheThongTin1,
        text.CongNgheThongTin2,
        text.CongNgheThongTin3,
        text.CongNgheThongTin4,
        text.CongNgheThongTin5,
        text.CongNgheThongTin6,
        text.CongNgheThongTin7,
      ],
    },
    {
      title: text.QuanTriKinhDoanh,
      items: [
        text.QuanTriKinhDoanh1,
        text.QuanTriKinhDoanh2,
        text.QuanTriKinhDoanh3,
        text.QuanTriKinhDoanh4,
        text.QuanTriKinhDoanh5,
        text.QuanTriKinhDoanh6,
        text.QuanTriKinhDoanh7,
        text.QuanTriKinhDoanh8,
        text.QuanTriKinhDoanh9,
      ],
    },
  ],
  // Cột 2
  [
    {
      title: text.CongNgheTruyenThong,
      items: [text.CongNgheTruyenThong1, text.CongNgheTruyenThong2],
    },
    {
      title: text.NgonNguAnh,
      items: [text.NgonNguAnh],
    },
    {
      title: text.NgonNguNhat,
      items: [text.NgonNguNhat1],
    },
  ],
  // Cột 3
  [
    {
      title: text.Luat,
      items: [text.Luat1, text.Luat2],
    },
    {
      title: text.NgonNguHan,
      items: [text.NgonNguHan1],
    },
    {
      title: text.NgonNguTrung,
      items: [text.NgonNguTrung1],
    },
  ],
];

const HotMajor = () => {
  return (
    <div >
      <div className="text-orange-500 font-bold text-2xl flex justify-center p-8">
        {text.NganhHot}
      </div>
      <div className="flex justify-center gap-6 items-stretch h-[800px] ">
        {columns.map((column, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-6 w-[25%] h-full">
            {column.map((major, majorIdx) => (
              <div
                key={majorIdx}
                className="bg-orange-100 rounded-xl p-4 flex flex-col gap-2 flex-1"
              >
                <div className="text-orange-500 font-bold text-xl pl-6 py-3">
                  {major.title}
                </div>
                {major.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex items-start">
                    <p className="text-orange-500 pl-10 pr-3">
                      {text.ChamDauCau}
                    </p>
                    <button className="hover:text-orange-500 text-left">
                      {item}
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotMajor;
