import React from "react";
import Toolbar from "../Header/Toolbar";
import Footer from "../Footer/Footer";

const Contact = () => {
    return (
        <div className="bg-white min-h-screen">
            <div className="flex flex-col items-center space-y-4 mt-2 md:mr-[2%]">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/FPT_Education_logo.svg/2560px-FPT_Education_logo.svg.png"
                    alt="Trường Đại học FPT"
                    className="h-16 w-auto object-contain contrast-100 saturate-150 brightness-100"
                />
            </div>
            <Toolbar />
            {/* Banner */}
            <div className="relative h-64 w-full">
                <img
                    src="https://daihoc.fpt.edu.vn/wp-content/uploads/2025/01/header-2024-png.avif"
                    alt="Liên hệ FPT University"
                    className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
                        LIÊN HỆ VỚI CHÚNG TÔI
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-4 py-12">
                <div>
                    <h2 className="text-2xl font-bold text-orange-600 mb-4">Thông tin liên hệ</h2>
                    <div className="space-y-4 text-lg">
                        <div>
                            <span className="font-semibold">Địa chỉ:</span>
                            <span className="ml-2">Khu Giáo dục và Đào tạo, Khu Công nghệ cao Hòa Lạc, Km29 Đại lộ Thăng Long, Thạch Thất, Hà Nội</span>
                        </div>
                        <div>
                            <span className="font-semibold">Hotline:</span>
                            <a href="tel:02473005588" className="ml-2 text-orange-600 hover:underline">(024) 7300 5588</a>
                        </div>
                        <div>
                            <span className="font-semibold">Email:</span>
                            <a href="mailto:daihocfpt@fpt.edu.vn" className="ml-2 text-orange-600 hover:underline">daihocfpt@fpt.edu.vn</a>
                        </div>
                        <div>
                            <span className="font-semibold">Website:</span>
                            <a href="https://daihoc.fpt.edu.vn" className="ml-2 text-orange-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                daihoc.fpt.edu.vn
                            </a>
                        </div>
                        <div>
                            <span className="font-semibold">Fanpage:</span>
                            <a href="https://www.facebook.com/daihocfpt" className="ml-2 text-orange-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                facebook.com/daihocfpt
                            </a>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-xl font-bold text-orange-500 mb-2">Các cơ sở trên toàn quốc</h3>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li><span className="font-semibold">Hà Nội:</span> Km29 Đại lộ Thăng Long, Thạch Thất, Hà Nội</li>
                            <li><span className="font-semibold">TP. Hồ Chí Minh:</span> Lô E2a-7, Đường D1, Khu Công nghệ cao, P.Long Thạnh Mỹ, TP.Thủ Đức</li>
                            <li><span className="font-semibold">Đà Nẵng:</span> Khu đô thị FPT City, Ngũ Hành Sơn, Đà Nẵng</li>
                            <li><span className="font-semibold">Cần Thơ:</span> Khu đô thị mới Nam Cần Thơ, Q.Cái Răng, TP.Cần Thơ</li>
                            <li><span className="font-semibold">Quy Nhơn:</span> Khu đô thị An Phú Thịnh, P.Ghềnh Ráng, TP.Quy Nhơn, Bình Định</li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;