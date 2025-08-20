import React from "react";

const campuses = [
  {
    name: "HÀ NỘI",
    address: "Khu Giáo dục và Đào tạo – Khu Công nghệ cao Hòa Lạc – Km29 Đại lộ Thăng Long, H. Thạch Thất, TP. Hà Nội",
    phone: "(024) 7300 5588",
    email: "tuyensinhhanoi@fpt.edu.vn",
  },
  {
    name: "TP.HCM",
    address: "Lô E2a-7, Đường D1 Khu Công nghệ cao, P. Long Thạnh Mỹ, TP. Thủ Đức, Thành Phố Hồ Chí Minh",
    phone: "(028) 7300 5588",
    email: "tuyensinhhcm@fpt.edu.vn",
  },
  {
    name: "ĐÀ NẴNG",
    address: "Khu đô thị công nghệ FPT Đà Nẵng, P. Hoà Hải, Quận Ngũ Hành Sơn, Thành Phố Đà Nẵng",
    phone: "(0236) 730 0999",
    email: "tuyensinhdanang@fpt.edu.vn",
  },
  {
    name: "CẦN THƠ",
    address: "Số 600 Đường Nguyễn Văn Cừ (nối dài), Phường An Bình, Quận Ninh Kiều, Thành Phố Cần Thơ",
    phone: "(0292) 730 3636",
    email: "tuyensinhcantho@fpt.edu.vn",
  },
  {
    name: "QUY NHƠN",
    address: "Khu đô thị mới An Phú Thịnh, Phường Nhơn Bình & Phường Đống Đa, TP. Quy Nhơn, Bình Định",
    phone: "(0256) 7300 999",
    email: "tuyensinhquynhon@fpt.edu.vn",
  },
];

const socialLinks = [
  {
    href: "https://www.facebook.com/daihocfpt",
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
        <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692V11.01h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.696h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
      </svg>
    ),
  },
  {
    href: "mailto:daihocfpt@fpt.edu.vn",
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
        <path d="M12 13.065L1.8 6.6V19.2c0 .66.54 1.2 1.2 1.2h18c.66 0 1.2-.54 1.2-1.2V6.6l-10.2 6.465zm10.2-10.2H1.8c-.66 0-1.2.54-1.2 1.2v.24l11.4 7.23 11.4-7.23v-.24c0-.66-.54-1.2-1.2-1.2z"/>
      </svg>
    ),
  },
  {
    href: "https://daihoc.fpt.edu.vn",
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18c-4.418 0-8-3.582-8-8 0-1.306.314-2.537.872-3.617l11.745 11.745A7.963 7.963 0 0 1 12 20zm7.128-3.617L7.383 4.638A7.963 7.963 0 0 1 12 4c4.418 0 8 3.582 8 8 0 1.306-.314 2.537-.872 3.617z"/>
      </svg>
    ),
  },
];

const Footer = () => (
  <footer className="bg-white border-gray-200 mt-12">
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-8 brightness-100 ex">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/FPT_Education_logo.svg/2560px-FPT_Education_logo.svg.png"
          alt="FPT University Logo"
          className="h-12 mb-4 md:mb-0"
        />
        <div className="flex space-x-4">
          {socialLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:text-orange-800 transition"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-gray-700">
        {campuses.map((campus, idx) => (
          <div key={idx}>
            <h4 className="font-bold text-orange-600 mb-2">{campus.name}</h4>
            <p className="mb-2">{campus.address}</p>
            <p className="mb-1">Điện thoại: <span className="font-semibold">{campus.phone}</span></p>
            <p>Email: <a href={`mailto:${campus.email}`} className="text-orange-600 hover:underline">{campus.email}</a></p>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center text-gray-500 text-sm font-semibold">
        © {new Date().getFullYear()} FPT University. All Rights Reserved.
      </div>
    </div>
  </footer>
);

export default Footer;