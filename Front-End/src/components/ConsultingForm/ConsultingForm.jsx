import React, { useState } from "react";
import axios from "axios";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../LoadingPage/LoadingPage";
import Footer from "../Footer/Footer";
const ConsultingForm = () => {

    const provinces = [
        "Hà Nội", "Hải Phòng", "Huế", "Đà Nẵng",
        "Cần Thơ", "TP. Hồ Chí Minh", "Lai Châu", "Điện Biên", "Sơn La", "Lạng Sơn", "Quảng Ninh",
        "Thanh Hóa", "Nghệ An", "Hà Tĩnh", "Cao Bằng", "Tuyên Quang", "Lào Cai", "Thái Nguyên", "Phú Thọ",
        "Bắc Ninh", "Hưng Yên", "Hải Dương", "Ninh Bình", "Quảng Trị", "Gia Lai", "Khánh Hòa", "Lâm Đồng", "Đắk Lắk", "Đồng Nai",
        "Tây Ninh", "Vĩnh Long", "Đồng Tháp", "Cà Mau", "An Giang"
    ];

    const sortedProvinces = [...provinces].sort((a, b) => a.localeCompare(b, 'vi'));

    const majors = [
        'Kỹ thuật phần mềm', 'An toàn thông tin', 'Trí tuệ nhân tạo', 'Vi mạch bán dẫn',
        'Thiết kế mỹ thuật số', 'Truyền thông đa phương tiện', 'Digital Marketing',
        'Luật kinh tế', 'Kinh doanh quốc tế', 'Ngôn ngữ Anh', 'Ngôn ngữ Nhật', 'Ngôn ngữ Hàn', 'Ngôn ngữ Trung Quốc',
    ];

    const campuses = [
        'Hà Nội',
        'TP. Hồ Chí Minh',
        'Đà Nẵng',
        'Quy Nhơn',
        'Cần Thơ'
    ];

    const [isLoadingPage, setIsLoadingPage] = useState(false);

    // Separate states for each field
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [province, setProvince] = useState('');
    const [major, setMajor] = useState('');
    const [campus, setCampus] = useState('');
    const [reason, setReason] = useState('');

    // Error states
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = {};
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

        // const phoneNumberRegex = !/^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;

        // Validate each field independently
        if (!name && !email && !phoneNumber && !reason) {
            newErrors.name = "Please fill out this field";
            newErrors.email = "Please fill out this field";
            newErrors.phoneNumber = "Please fill out this field";
            newErrors.reason = "Please fill out this field";
        }

        else if (!name) {
            newErrors.name = "Please fill out this field";
        }
        else if (!/^[AÀÁẠẢÃĂẰẮẶẲẴÂẦẤẬẨẪBCDĐEÈÉẸẺẼÊỀẾỆỂỄFGHIÌÍỊỈĨJKLMNOÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠPQRSTUÙÚỤỦŨƯỪỨỰỬỮVWXYỲÝỴỶỸZ][aàáạảãăằắặẳẵâầấậẩẫbcdđeèéẹẻẽêềếệểễfghiìíịỉĩjklmnoòóọỏõôồốộổỗơờớợởỡpqrstuùúụủũưừứựửữvwxyỳýỵỷỹz]+ [AÀÁẠẢÃĂẰẮẶẲẴÂẦẤẬẨẪBCDĐEÈÉẸẺẼÊỀẾỆỂỄFGHIÌÍỊỈĨJKLMNOÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠPQRSTUÙÚỤỦŨƯỪỨỰỬỮVWXYỲÝỴỶỸZ][aàáạảãăằắặẳẵâầấậẩẫbcdđeèéẹẻẽêềếệểễfghiìíịỉĩjklmnoòóọỏõôồốộổỗơờớợởỡpqrstuùúụủũưừứựửữvwxyỳýỵỷỹz]+(?: [AÀÁẠẢÃĂẰẮẶẲẴÂẦẤẬẨẪBCDĐEÈÉẸẺẼÊỀẾỆỂỄFGHIÌÍỊỈĨJKLMNOÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠPQRSTUÙÚỤỦŨƯỪỨỰỬỮVWXYỲÝỴỶỸZ][aàáạảãăằắặẳẵâầấậẩẫbcdđeèéẹẻẽêềếệểễfghiìíịỉĩjklmnoòóọỏõôồốộổỗơờớợởỡpqrstuùúụủũưừứựửữvwxyỳýỵỷỹz]+)*$/.test(name)) {
            newErrors.name = "Please enter a valid Vietnamese name\n(e.g. Nguyễn Văn A)";
        }
        if (!email) {
            newErrors.email = "Please fill out this field";
        }
        else if (!emailRegex.test(email)) {
            newErrors.email = "Please enter valid email address with format (...@gmail.com)";
        }
        if (!phoneNumber.trim()) {
            newErrors.phoneNumber = "Please fill out this field";
        }
        else if (!/^(0|\+84)(3|5|7|8|9)[0-9]{8}$/.test(phoneNumber)) {
            newErrors.phoneNumber = "Please enter a valid Vietnamese phone number with 10 characters (e.g. 0912345678 or +84912345678)";
        }

        if (!province) {
            newErrors.province = "Please select your province";
        }

        // Major Validation
        if (!major) {
            newErrors.major = "Please select your major";
        }

        // Campus Validation
        if (!campus) {
            newErrors.campus = "Please select your campus";
        }


        if (!reason) {
            newErrors.reason = "Please fill out this field";
        }


        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(
                'http://localhost:8080/bookings/create-consult-booking',
                {
                    userFullName: name,
                    userEmail: email,
                    userPhoneNumber: phoneNumber,
                    interestedCampus: campus,
                    interestedSpecialization: major,
                    location: province,
                    reason: reason,
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200 || response.status === 201) {
                setShowSuccess(true);

                // Show loading page before navigation
                setIsLoadingPage(true);
                setTimeout(() => {
                    setShowSuccess(false);

                    setIsLoadingPage(false);
                    navigate('/');
                }, 2000);
            }
        } catch (error) {
            console.error('Booking error:', error);
            // Show error toast
            setErrorMessage(error.response?.data?.message || "Đăng ký tư vấn thất bại. Vui lòng thử lại.");
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 2000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-blue-50 py-10  bg-cover bg-center bg-no-repeat contrast-more:150 saturate-150 brightness-90"
            style={{ backgroundImage: "url('https://vinaconex25.com.vn/wp-content/uploads/2025/02/phoi-canh-01-scaled.jpg')" }}>
            {isLoadingPage && <LoadingPage />}
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 mb-10">
                <div className="flex justify-center mb-6">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/FPT_Education_logo.svg/2560px-FPT_Education_logo.svg.png"
                        alt="FPT Education Logo"
                        className="h-16 w-auto"
                    />
                </div>
                <h2 className="text-3xl text-center text-orange-600 mb-6 font-bold font-mono mt-3">Đăng Ký Tư Vấn</h2>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Họ và tên <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            autoComplete="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 text-gray-700 "
                            placeholder="Nhập họ và tên"

                        />
                        {errors.name && (
                            <div className="text-red-500 text-xs flex items-center font-mono font-bold mt-auto">
                                <AlertCircle size={12} className="mr-1" />
                                {errors.name}
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Số điện thoại <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nhập số điện thoại"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            value={phoneNumber}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50"
                        />
                        {errors.phoneNumber && (
                            <div className="text-red-500 text-xs flex items-center font-mono mt-auto font-bold ">
                                <AlertCircle size={16} className="mr-1" />
                                {errors.phoneNumber}
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nhập email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50"
                        />
                        {errors.email && (
                            <div className="text-red-500 text-xs flex items-center font-mono font-bold mt-auto">
                                <AlertCircle size={16} className="mr-1" />
                                {errors.email}
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Tỉnh/Thành phố <span className="text-red-500">*</span></label>
                        <select
                            name="province"
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50"
                        >
                            <option value="">-- Chọn tỉnh/thành phố --</option>
                            {sortedProvinces.map((p) => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>
                        {errors.province && (
                            <div className="text-red-500 text-xs flex items-center font-mono font-bold mt-auto">
                                <AlertCircle size={12} className="mr-1" />
                                {errors.province}
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ngành học <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={major}
                            onChange={(e) => setMajor(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                            <option value="">Chọn ngành học</option>
                            {majors.map((major) => (
                                <option key={major} value={major}>{major}</option>
                            ))}
                        </select>
                        {errors.major && (
                            <div className="text-red-500 text-xs flex items-center font-mono font-bold mt-auto">
                                <AlertCircle size={12} className="mr-1" />
                                {errors.major}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cơ sở đào tạo <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={campus}
                            onChange={(e) => setCampus(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                            <option value="">Chọn cơ sở</option>
                            {campuses.map((campus) => (
                                <option key={campus} value={campus}>{campus}</option>
                            ))}
                        </select>
                        {errors.campus && (
                            <div className="text-red-500 text-xs flex items-center font-mono font-bold mt-auto">
                                <AlertCircle size={12} className="mr-1" />
                                {errors.campus}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Ghi chú <span className="text-red-500">*</span></label>
                        <input
                            name="notes"
                            placeholder="Ghi chú thêm (nếu có)"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50"
                            rows={3}
                        />
                        {errors.reason && (
                            <div className="text-red-500 text-xs flex items-center font-mono font-bold mt-auto">
                                <AlertCircle size={16} className="mr-1" />
                                {errors.reason}
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-all duration-200 shadow-lg"
                    >
                        Đăng ký tư vấn
                    </button>
                </form>
                {showSuccess && (
                    <div className="fixed top-6 right-6 z-50 flex items-start">
                        <div className="flex bg-white rounded-lg shadow-lg border-l-4 border-green-500 p-4 min-w-[320px] transition-transform duration-500 ease-out transform scale-105"
                            style={{ transform: showSuccess ? 'translateX(0)' : 'translateX(100%)' }}>
                            <div className="flex-shrink-0">
                                <div className="h-8 w-8 rounded-full bg-green-400 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-4 flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="font-bold text-lg text-gray-900">Thành công</div>
                                        <div className="text-gray-500 text-base">Bạn đã đăng ký tư vấn thành công!</div>
                                    </div>
                                    <button
                                        onClick={() => setShowSuccess(false)}
                                        className="text-gray-400 hover:text-gray-700 ml-4"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {showError && (
                    <div className="fixed top-6 right-6 z-50 flex items-start">
                        <div className="flex bg-white rounded-lg shadow-lg border-l-4 border-red-500 p-4 min-w-[320px] transition-transform duration-500 ease-out transform scale-105"
                            style={{ transform: showError ? 'translateX(0)' : 'translateX(100%)' }}>
                            <div className="flex-shrink-0">
                                <div className="h-8 w-8 rounded-full bg-red-400 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-4 flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="font-bold text-lg text-gray-900">Thất bại</div>
                                        <div className="text-gray-500 text-base">{errorMessage}</div>
                                    </div>
                                    <button
                                        onClick={() => setShowError(false)}
                                        className="text-gray-400 hover:text-gray-700 ml-4"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
          
        </div>
    );
};

export default ConsultingForm;