import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // Hoặc dùng react-icons nếu thích
import text from "../../constants/resources.json";
import { Link, useNavigate } from "react-router-dom"
import LoadingPage from "../LoadingPage/LoadingPage";
import { Button } from "@material-tailwind/react";
const Toolbar2 = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen((prev) => !prev);

    const [showRegisterOptions, setShowRegisterOptions] = useState(false); // Quản lý hiển thị menu đăng ký xét tuyển

    const navigate = useNavigate();

    const menuItems = [
        text.TrangChu,
        text.GioiThieu,
        text.TinTuc,
        text.NganhHoc,
        text.TuyenSinh,
        text.LienHe,
        text.QuanLyHoSo
    ];

    const [loading, setLoading] = useState(false);

    const handleNavigateWithLoading = (path) => {
        setLoading(true);
        setShowRegisterOptions(false);
        setTimeout(() => {
            setLoading(false);
            navigate(path);
        }, 1000);
    };
    return (
        <div className="w-full mt-2 bg-orange-600">

            {/*  Hiển thị LoadingPage khi đang tải */}
            {loading && <LoadingPage />}
            {/* Desktop Toolbar */}
            <div className="hidden md:flex justify-center gap-3 w-full h-auto">
                {menuItems.map((item, index) => (
                    <button
                        key={index}
                        className="h-full text-white font-medium p-4 hover:text-black hover:underline hover:bg-orange-700"
                    >
                        {item === text.QuanLyHoSo ? (
                            <div className="relative inline-block">
                                <button
                                    className="text-white"
                                    // Hàm xử lý sự kiện click để hiển thị menu dropdown đăng ký xét tuyển
                                    onClick={() => setShowRegisterOptions((prev) => !prev)} // Hàm xử lý sự kiện click 
                                >
                                    {item}
                                </button>
                                {showRegisterOptions && (
                                    <div className="absolute right-(-1) mt-2 w-42 bg-white rounded-lg shadow-lg z-10">
                                        <Button
                                            className="w-full px-4 py-3 hover:bg-orange-400 text-gray-800 border-b border-gray-100 font-mono whitespace-nowrap text-sm "
                                            onClick={() => handleNavigateWithLoading("/consultingBriefCase")}
                                        >
                                            Hồ Sơ Tư Vấn
                                        </Button>

                                        <Button
                                            className="w-full block px-4 py-3 hover:bg-orange-400 text-gray-800 font-mono whitespace-nowrap text-sm"
                                            onClick={() => handleNavigateWithLoading("/admissionBriefCase")}
                                        >
                                            Hồ Sơ  Xét Tuyển
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ) : item === text.TrangChu ? (
                            <button
                                className="text-white"
                                onClick={() => handleNavigateWithLoading("/consultant")}
                            >
                                {item}
                            </button>
                        )
                            : item === text.TraCuu ? (
                                <button
                                    className="text-white"
                                    onClick={() => handleNavigateWithLoading("/lookup-profile")}
                                >
                                    {item}
                                </button>
                            ) : item === text.GioiThieu ? (
                                <button
                                    className="text-white"
                                    onClick={() => handleNavigateWithLoading("/introduction")}
                                >
                                    {item}
                                </button>
                            ) : item === text.TinTuc ? (
                                <button
                                    className="text-white"
                                    onClick={() => handleNavigateWithLoading("/news")}
                                >
                                    {item}
                                </button>
                            ) : item === text.LienHe ? (
                                <button
                                    className="text-white"
                                    onClick={() => handleNavigateWithLoading("/contact")}
                                >
                                    {item}
                                </button>
                            ) : item === text.TuyenSinh ? (
                                <button
                                    className="text-white"
                                    onClick={() => handleNavigateWithLoading("/")}
                                >
                                    {item}
                                </button>
                            ) : item === text.NganhHoc ? (
                                <button
                                    className="text-white"
                                    onClick={() => handleNavigateWithLoading("/majors")}
                                >
                                    {item}
                                </button>
                            )
                                : (
                                    item
                                )}

                    </button>
                ))}
            </div>
        </div>
    );
};

export default Toolbar2;
