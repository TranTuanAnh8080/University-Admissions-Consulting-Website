import React from "react";
import Toolbar from "../Header/Toolbar";
import Footer from "../Footer/Footer";
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton";

const newsList1 = [
    {
        title: "FPT University công bố phương thức tuyển sinh năm 2025",
        image: "https://daihoc.fpt.edu.vn/wp-content/uploads/2025/06/z6750195980950_6e5cb009218b935a2abe53937beb15d8-2048x1365.avif",
        date: "15/06/2025",
        summary:
            "Trường Đại học FPT chính thức công bố phương thức tuyển sinh năm 2025 với nhiều điểm mới, tạo điều kiện thuận lợi cho thí sinh trên toàn quốc.",
        link: "https://daihoc.fpt.edu.vn/fpt-university-cong-bo-phuong-thuc-tuyen-sinh-2025/"
    },
    {
        title: "Ngày hội tư vấn tuyển sinh 2025: Cơ hội gặp gỡ chuyên gia",
        image: "https://daihoc.fpt.edu.vn/wp-content/uploads/2025/06/CI_07073-650x433.avif",
        date: "10/06/2025",
        summary:
            "Ngày hội tư vấn tuyển sinh 2025 của Đại học FPT thu hút hàng ngàn học sinh và phụ huynh tham dự, giải đáp mọi thắc mắc về ngành học, học phí, học bổng.",
        link: "https://daihoc.fpt.edu.vn/ngay-hoi-tu-van-tuyen-sinh-2025/"
    },
    {
        title: "FPT University trao học bổng tài năng 2025 cho tân sinh viên",
        image: "https://daihoc.fpt.edu.vn/wp-content/uploads/2025/06/DG_08512-650x433.avif",
        date: "05/06/2025",
        summary:
            "Năm 2025, Đại học FPT tiếp tục trao nhiều suất học bổng tài năng cho tân sinh viên xuất sắc trên toàn quốc, khuyến khích tinh thần học tập và sáng tạo.",
        link: "https://daihoc.fpt.edu.vn/fpt-university-trao-hoc-bong-tai-nang-2025/"
    },
    {
        title: "FPT University mở rộng hợp tác quốc tế trong đào tạo",
        image: "https://daihoc.fpt.edu.vn/wp-content/uploads/2025/06/1200x600-01-2048x1024.avif",
        date: "01/06/2025",
        summary:
            "Trường Đại học FPT ký kết hợp tác với nhiều trường đại học quốc tế, mở rộng cơ hội trao đổi sinh viên và thực tập nước ngoài cho sinh viên FPT.",
        link: "https://daihoc.fpt.edu.vn/fpt-university-mo-rong-hop-tac-quoc-te/"
    },
    {
        title: "Thông báo lịch thi đánh giá năng lực đầu vào 2025",
        image: "https://daihoc.fpt.edu.vn/wp-content/uploads/2025/06/Secathon-02-2048x1152.avif",
        date: "28/05/2025",
        summary:
            "Đại học FPT thông báo lịch thi đánh giá năng lực đầu vào năm 2025 dành cho thí sinh đăng ký xét tuyển vào trường.",
        link: "https://daihoc.fpt.edu.vn/thong-bao-lich-thi-danh-gia-nang-luc-2025/"
    },
    {
        title: "FPT University tổ chức hội thảo hướng nghiệp cho học sinh THPT",
        image: "https://daihoc.fpt.edu.vn/wp-content/uploads/2025/06/CI_06839.avif",
        date: "20/05/2025",
        summary:
            "Hội thảo hướng nghiệp do Đại học FPT tổ chức giúp học sinh THPT định hướng ngành nghề, lựa chọn lộ trình học tập phù hợp với bản thân.",
        link: "https://daihoc.fpt.edu.vn/fpt-university-to-chuc-hoi-thao-huong-nghiep/"
    }
];

const newsList2 = [
    {
        title: "Thí sinh FPT Hackathon 2025 giải bài toán về AI và logistics thông minh",
        image: "https://daihoc.fpt.edu.vn/wp-content/uploads/2025/05/DSC07665-2048x1365.avif",
        date: "27/05/2025",
        summary:
            "Trường Đại học FPT chính thức công bố phương thức tuyển sinh năm 2025 với nhiều điểm mới, tạo điều kiện thuận lợi cho thí sinh trên toàn quốc.",
        link: "https://daihoc.fpt.edu.vn/fpt-university-cong-bo-phuong-thuc-tuyen-sinh-2025/"
    },
    {
        title: "Hàng trăm đội thi tham gia cuộc thi AI và Robotics dành cho học sinh THPT",
        image: "https://daihoc.fpt.edu.vn/wp-content/uploads/2025/04/z6533899435803_2f6562bb2132983cffcc25849c91d0cc-2048x1365.avif",
        date: "26/05/2025",
        summary:
            "Ngày hội tư vấn tuyển sinh 2025 của Đại học FPT thu hút hàng ngàn học sinh và phụ huynh tham dự, giải đáp mọi thắc mắc về ngành học, học phí, học bổng.",
        link: "https://daihoc.fpt.edu.vn/ngay-hoi-tu-van-tuyen-sinh-2025/"
    },
    {
        title: "FPT University trao học bổng tài năng 2025 cho tân sinh viên",
        image: "https://daihoc.fpt.edu.vn/wp-content/uploads/2025/03/Screen-Shot-2025-04-02-at-13.17.45-png.avif",
        date: "05/06/2025",
        summary:
            "Năm 2025, Đại học FPT tiếp tục trao nhiều suất học bổng tài năng cho tân sinh viên xuất sắc trên toàn quốc, khuyến khích tinh thần học tập và sáng tạo.",
        link: "https://daihoc.fpt.edu.vn/fpt-university-trao-hoc-bong-tai-nang-2025/"
    },
    {
        title: "FPT University mở rộng hợp tác quốc tế trong đào tạo",
        image: "https://daihoc.fpt.edu.vn/wp-content/uploads/2025/04/Screen-Shot-2025-04-02-at-13.20.11-png.avif",
        date: "01/06/2025",
        summary:
            "Trường Đại học FPT ký kết hợp tác với nhiều trường đại học quốc tế, mở rộng cơ hội trao đổi sinh viên và thực tập nước ngoài cho sinh viên FPT.",
        link: "https://daihoc.fpt.edu.vn/fpt-university-mo-rong-hop-tac-quoc-te/"
    },
    {
        title: "Trường Đại học FPT hỗ trợ 1.000 tân sinh viên “Học trước – Trả sau”",
        image: "https://daihoc.fpt.edu.vn/wp-content/uploads/2025/04/Screenshot-2025-04-17-at-3.19.32%E2%80%AFPM-2048x1427.avif",
        date: "28/05/2025",
        summary:
            "Đại học FPT thông báo lịch thi đánh giá năng lực đầu vào năm 2025 dành cho thí sinh đăng ký xét tuyển vào trường.",
        link: "https://daihoc.fpt.edu.vn/thong-bao-lich-thi-danh-gia-nang-luc-2025/"
    },
    {
        title: "Trường Đại học FPT và VietinBank ký thoả thuận hợp tác toàn diện",
        image: "https://daihoc.fpt.edu.vn/wp-content/uploads/2025/03/vnn-01.avif",
        date: "07/03/2025",
        summary:
            "Hội thảo hướng nghiệp do Đại học FPT tổ chức giúp học sinh THPT định hướng ngành nghề, lựa chọn lộ trình học tập phù hợp với bản thân.",
        link: "https://daihoc.fpt.edu.vn/fpt-university-to-chuc-hoi-thao-huong-nghiep/"
    }
];


const newsList3 = [
    {
        title: "Chiến dịch truyền thông vì người khuyết tật, người yếu thế của sinh viên Trường ĐH FPT",
        image: "https://daihoc.fpt.edu.vn/wp-content/uploads/2025/05/LeeSyx-55-2048x1365.jpg",
        date: "14/05/2025",
        summary:
            "Trường Đại học FPT chính thức công bố phương thức tuyển sinh năm 2025 với nhiều điểm mới, tạo điều kiện thuận lợi cho thí sinh trên toàn quốc.",
        link: "https://daihoc.fpt.edu.vn/fpt-university-cong-bo-phuong-thuc-tuyen-sinh-2025/"
    },
    {
        title: "Hơn 500 giáo viên THPT được tập huấn ứng dụng STEM trong 2 ngày",
        image: "https://daihoc.fpt.edu.vn/wp-content/uploads/2025/03/487854234_1109307084542996_5182350749549920575_n.avif",
        date: "31/03/2025",
        summary:
            "Ngày hội tư vấn tuyển sinh 2025 của Đại học FPT thu hút hàng ngàn học sinh và phụ huynh tham dự, giải đáp mọi thắc mắc về ngành học, học phí, học bổng.",
        link: "https://daihoc.fpt.edu.vn/ngay-hoi-tu-van-tuyen-sinh-2025/"
    },
    {
        title: "Trường Đại học FPT đồng hành cùng “Điều tử tế bay xa”",
        image: "https://daihoc.fpt.edu.vn/wp-content/uploads/2025/03/ROO-0017-01437-2048x1365.avif",
        date: "13/03/2025",
        summary:
            "Năm 2025, Đại học FPT tiếp tục trao nhiều suất học bổng tài năng cho tân sinh viên xuất sắc trên toàn quốc, khuyến khích tinh thần học tập và sáng tạo.",
        link: "https://daihoc.fpt.edu.vn/fpt-university-trao-hoc-bong-tai-nang-2025/"
    },
    {
        title: "Trường Đại học FPT tập huấn AI cho cán bộ Đoàn quy mô toàn quốc",
        image: "https://daihoc.fpt.edu.vn/wp-content/uploads/2025/03/Thumb-AI-kho-png.avif",
        date: "04/03/2025",
        summary:
            "Trường Đại học FPT ký kết hợp tác với nhiều trường đại học quốc tế, mở rộng cơ hội trao đổi sinh viên và thực tập nước ngoài cho sinh viên FPT.",
        link: "https://daihoc.fpt.edu.vn/fpt-university-mo-rong-hop-tac-quoc-te/"
    },
    {
        title: "Trường Đại học FPT phổ cập kiến thức AI cho học sinh THPT",
        image: "https://daihoc.fpt.edu.vn/wp-content/uploads/2025/03/vne-1.avif",
        date: "03/03/2025",
        summary:
            "Đại học FPT thông báo lịch thi đánh giá năng lực đầu vào năm 2025 dành cho thí sinh đăng ký xét tuyển vào trường.",
        link: "https://daihoc.fpt.edu.vn/thong-bao-lich-thi-danh-gia-nang-luc-2025/"
    },
    {
        title: "Trường Đại học FPT lan tỏa niềm đam mê tiếng Anh cho hơn 3.000 học sinh",
        image: "https://daihoc.fpt.edu.vn/wp-content/uploads/2025/03/474078827_1010106697814989_7849601307145530429_n.avif",
        date: "01/03/2025",
        summary:
            "Hội thảo hướng nghiệp do Đại học FPT tổ chức giúp học sinh THPT định hướng ngành nghề, lựa chọn lộ trình học tập phù hợp với bản thân.",
        link: "https://daihoc.fpt.edu.vn/fpt-university-to-chuc-hoi-thao-huong-nghiep/"
    }
];


const News = () => {
    return (
        <div className="bg-white min-h-screen">
            <div className="flex flex-col items-center space-y-4 mt-2 md:mr-[2%]">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/FPT_Education_logo.svg/2560px-FPT_Education_logo.svg.png"
          alt="Trường Đại học FPT"
          className="h-16 object-contain contrast-100 saturate-150 brightness-100"
        />

      </div>
            <Toolbar />
            {/* Banner */}
            <div className="relative h-64 w-full">
                <img
                    src="https://daihoc.fpt.edu.vn/wp-content/uploads/2025/01/header-2024-png.avif"
                    alt="Tin tức và sự kiện FPT"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h1 className="text-4xl md:text-5xl font-semibold text-white text-center px-4">
                        TIN TỨC & SỰ KIỆN
                    </h1>
                </div>
            </div>

            <div className="w-auto md:w-3/4 rounded-xl bg-[#dd5524] flex items-center px-6 py-3 mb-8 ml-32 mt-10">
                {/* Icon giống hình ảnh (dùng SVG) */}
                <svg
                    className="w-8 h-6 mr-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="6" cy="12" r="2" />
                    <circle cx="18" cy="12" r="2" />
                    <rect x="9" y="11" width="6" height="2" rx="1" fill="#fff" />
                    <rect x="11" y="9" width="2" height="6" rx="1" fill="#fff" />
                </svg>
                <span className="text-white font-bold text-2xl tracking-wide">
                    TIN TỨC CHUNG
                </span>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-12 ">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newsList1.map((news, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition"
                        >
                            <a href={news.link} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={news.image}
                                    alt={news.title}
                                    className="w-full h-48 object-cover"
                                />
                            </a>
                            <div className="p-6 flex flex-col flex-1">
                                <span className="text-sm text-gray-500 mb-2">{news.date}</span>
                                <a
                                    href={news.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xl font-bold text-orange-600 hover:underline mb-2"
                                >
                                    {news.title}
                                </a>
                                <p className="text-gray-700 mb-4 flex-1">{news.summary}</p>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-auto md:w-3/4 rounded-xl bg-[#dd5524] flex items-center px-6 py-3 mb-8 ml-32 mt-10">
                {/* Icon giống hình ảnh (dùng SVG) */}
                <svg
                    className="w-8 h-6 mr-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="6" cy="12" r="2" />
                    <circle cx="18" cy="12" r="2" />
                    <rect x="9" y="11" width="6" height="2" rx="1" fill="#fff" />
                    <rect x="11" y="9" width="2" height="6" rx="1" fill="#fff" />
                </svg>
                <span className="text-white font-bold text-2xl tracking-wide">
                    BÁO CHÍ NÓI VỀ FPTU
                </span>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-12 ">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newsList2.map((news, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition"
                        >
                            <a href={news.link} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={news.image}
                                    alt={news.title}
                                    className="w-full h-48 object-cover"
                                />
                            </a>
                            <div className="p-6 flex flex-col flex-1">
                                <span className="text-sm text-gray-500 mb-2">{news.date}</span>
                                <a
                                    href={news.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xl font-bold text-orange-600 hover:underline mb-2"
                                >
                                    {news.title}
                                </a>
                                <p className="text-gray-700 mb-4 flex-1">{news.summary}</p>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-auto md:w-3/4 rounded-xl bg-[#dd5524] flex items-center px-6 py-3 mb-8 ml-32 mt-10">
                {/* Icon giống hình ảnh (dùng SVG) */}
                <svg
                    className="w-8 h-6 mr-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="6" cy="12" r="2" />
                    <circle cx="18" cy="12" r="2" />
                    <rect x="9" y="11" width="6" height="2" rx="1" fill="#fff" />
                    <rect x="11" y="9" width="2" height="6" rx="1" fill="#fff" />
                </svg>
                <span className="text-white font-bold text-2xl tracking-wide">
                    TRÁCH NHIỆM CỘNG ĐỒNG
                </span>

            </div>
            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-12 ">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newsList3.map((news, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition"
                        >
                            <a href={news.link} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={news.image}
                                    alt={news.title}
                                    className="w-full h-48 object-cover"
                                />
                            </a>
                            <div className="p-6 flex flex-col flex-1">
                                <span className="text-sm text-gray-500 mb-2">{news.date}</span>
                                <a
                                    href={news.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xl font-bold text-orange-600 hover:underline mb-2"
                                >
                                    {news.title}
                                </a>
                                <p className="text-gray-700 mb-4 flex-1">{news.summary}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ScrollToTopButton />
            <Footer />
        </div>
    );
};

export default News;