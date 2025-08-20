import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import axios from 'axios'; 
import dayjs from 'dayjs'; // Thư viện để định dạng ngày tháng
const ProfileResearch = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState("");
    const [toast1, setToast1] = useState("");


    // Error states
    const [errors, setErrors] = useState({});

    // MÀU SẮC CHO TỪNG TRẠNG THÁI HỒ SƠ
    const StatusBadge = ({ status }) => {
        const base = "px-2 py-1 rounded text-xs font-semibold";
        const color =
            status === 'Waiting'
                ? "bg-yellow-400 text-white"
                : status === 'InProgress'
                    ? "bg-blue-500 text-white"
                    : status === 'Rejected'
                        ? "bg-red-500 text-white"
                        : status === 'Approved'
                            ? "bg-green-600 text-white"
                            : "bg-gray-300 text-black";

        const displayText =

            status === 'Waiting' ? 'Đang Chờ Xử Lý' : // Hiển thị trạng thái tương ứng
                status === 'InProgress'
                    ? 'Đang Trong Quá Trình Xét Tuyển' :
                    status === 'Approved' ? 'Đã Phê Duyệt Thành Công'
                        : 'Hồ Sơ Bị Loại Bỏ';

        return <span className={`${base} ${color}`}>{displayText}</span>;
    };

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(""), 2000);
    };

    const showToast1 = (message) => {
        setToast1(message);
        setTimeout(() => setToast1(""), 2000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = {};
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

        // Validate each field independently
        if (!name && !email && !phoneNumber) {
            newErrors.name = "Please fill out this field";
            newErrors.email = "Please fill out this field";
            newErrors.phoneNumber = "Please fill out this field";
            newErrors.reason = "Please fill out this field";
        }

        else if (!name) {
            newErrors.name = "Please fill out this field";
        }
        else if (!/^[AÀÁẠẢÃĂẰẮẶẲẴÂẦẤẬẨẪBCDĐEÈÉẸẺẼÊỀẾỆỂỄFGHIÌÍỊỈĨJKLMNOÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠPQRSTUÙÚỤỦŨƯỪỨỰỬỮVWXYỲÝỴỶỸZ][aàáạảãăằắặẳẵâầấậẩẫbcdđeèéẹẻẽêềếệểễfghiìíịỉĩjklmnoòóọỏõôồốộổỗơờớợởỡpqrstuùúụủũưừứựửữvwxyỳýỵỷỹz]+ [AÀÁẠẢÃĂẰẮẶẲẴÂẦẤẬẨẪBCDĐEÈÉẸẺẼÊỀẾỆỂỄFGHIÌÍỊỈĨJKLMNOÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠPQRSTUÙÚỤỦŨƯỪỨỰỬỮVWXYỲÝỴỶỸZ][aàáạảãăằắặẳẵâầấậẩẫbcdđeèéẹẻẽêềếệểễfghiìíịỉĩjklmnoòóọỏõôồốộổỗơờớợởỡpqrstuùúụủũưừứựửữvwxyỳýỵỷỹz]+(?: [AÀÁẠẢÃĂẰẮẶẲẴÂẦẤẬẨẪBCDĐEÈÉẸẺẼÊỀẾỆỂỄFGHIÌÍỊỈĨJKLMNOÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠPQRSTUÙÚỤỦŨƯỪỨỰỬỮVWXYỲÝỴỶỸZ][aàáạảãăằắặẳẵâầấậẩẫbcdđeèéẹẻẽêềếệểễfghiìíịỉĩjklmnoòóọỏõôồốộổỗơờớợởỡpqrstuùúụủũưừứựửữvwxyỳýỵỷỹz]+)*$/.test(name)) {
            newErrors.name = "Please enter a valid Vietnamese name\n(e.g. Nguyễn Văn Anh)";
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

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setLoading(true);

        try {
            const response = await axios.get('http://localhost:8080/applicationbooking/get-all-applications', {
                params: {
                    userFullName: name,
                    userEmail: email,
                    userPhoneNumber: phoneNumber,
                },
            });

            const application = response.data?.data?.items?.[0];

            if (application) {
                setResult(application);
                showToast("Tra cứu hồ sơ xét tuyển thành công !");
            } else {
                setError('Không tìm thấy hồ sơ. Vui lòng kiểm tra lại.');
                showToast1("Không tìm thấy hồ sơ. Vui lòng kiểm tra lại !");
                setResult(null);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Đã xảy ra lỗi khi tra cứu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat 
        py-10 contrast-125 saturate-150 brightness-90"
            style={{
                backgroundImage:
                    "url('https://fptcity.vn/wp-content/uploads/FPT_bridview_final-1-scaled.jpg')"
            }}>

            {toast && ( // THÔNG BÁO KẾT QUẢ XÉT TUYỂN THÀNH CÔNG
                <div className="fixed top-6 right-6 z-50
                 bg-green-600 text-white px-6 py-3 rounded  animate-fade-in ">
                    {toast}
                </div>
            )}

            {toast1 && (  // THÔNG BÁO KẾT QUẢ XÉT TUYỂN KHÔNG THÀNH CÔNG
                <div className="fixed top-6 right-6 z-50
                 bg-red-500 text-white px-6 py-3 rounded shadow-lg animate-fade-in border-10">
                    {toast1}
                </div>
            )}

            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
                {/* Logo FPT */}
                <div className="flex justify-center mb-6">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/FPT_Education_logo.svg/2560px-FPT_Education_logo.svg.png"
                        alt="FPT Education Logo"
                        className="h-16"
                    />
                </div>
                <h2 className="text-2xl font-bold text-center text-orange-600 mb-2 drop-shadow">Tra Cứu Hồ Sơ Xét Tuyển</h2>
                <p className="text-center text-gray-500 mb-6">Vui lòng nhập thông tin để tra cứu trạng thái hồ sơ của bạn</p>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Họ và tên <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="hoTen"
                            placeholder="Nhập họ và tên"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 text-gray-700"
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
                            name="sdt"
                            placeholder="Nhập số điện thoại"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 text-gray-700"
                        />
                        {errors.phoneNumber && (
                            <div className="text-red-500 text-xs flex items-center font-mono font-bold mt-auto">
                                <AlertCircle size={12} className="mr-1" />
                                {errors.phoneNumber}
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Nhập email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 text-gray-700"
                        />
                        {errors.email && (
                            <div className="text-red-500 text-xs flex items-center font-mono font-bold mt-auto">
                                <AlertCircle size={12} className="mr-1" />
                                {errors.email}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 mt-2
              ${loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-orange-500 hover:bg-orange-600 active:scale-95'
                            } shadow-lg hover:shadow-xl cursor-grab`}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Đang tra cứu...
                            </div>
                        ) : (
                            'Tra cứu hồ sơ'
                        )}
                    </button>
                </form>

                {result != null && (
                    <div className="mt-8 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-2xl shadow-lg overflow-hidden animate-fade-in-down">
                        {/* Header với logo và title */}
                        <div className="bg-gradient-to-r from-orange-600 to-amber-600 px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div className="text-white text-left">
                                    <p className="text-sm  font-bold">Mã Hồ Sơ</p>
                                    <p className="text-lg font-bold">#{result.id}</p>
                                </div>
                            </div>
                        </div>

                        {/* Nội dung chính */}
                        <div className="p-6">
                            {/* Thông báo trạng thái */}
                            <div className="mb-6 text-center">
                                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white shadow-md border border-orange-200">
                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-gray-700 font-medium">Hồ sơ của bạn đã được tìm thấy</span>
                                </div>
                            </div>

                            {/* Thông tin cá nhân */}
                            <div className="mb-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                                        <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-800">Thông Tin Cá Nhân</h4>
                                </div>
                                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 px-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-xs font-medium text-gray-500 tracking-wide">Họ và Tên</label>
                                                <p className="text-gray-900 font-semibold text-lg">{result.userFullName}</p>
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-gray-500 tracking-wide">Ngày Sinh</label>
                                                <p className="text-gray-700">{result.userBirthDate || "Chưa cập nhật"}</p>
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-gray-500 tracking-wide">Giới Tính</label>
                                                <p className="text-gray-700">{result.gender}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-xs font-medium text-gray-500 tracking-wide">Email</label>
                                                <p className="text-gray-700 text-nowrap">{result.userEmail}</p>
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-gray-500 tracking-wide">Số Điện Thoại</label>
                                                <p className="text-gray-700">{result.userPhoneNumber}</p>
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-gray-500 tracking-wide">Tỉnh/Thành Phố</label>
                                                <p className="text-gray-700">{result.province}</p>
                                            </div>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="text-xs font-medium text-gray-500 tracking-wide">Địa Chỉ</label>
                                            <p className="text-gray-700">{result.address}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Thông tin học vấn */}
                            <div className="mb-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-800">Thông Tin Học Vấn</h4>
                                </div>
                                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs font-medium text-gray-500 tracking-wide">Trường THPT</label>
                                            <p className="text-gray-700 font-medium">{result.school}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-gray-500 tracking-wide">Năm Tốt Nghiệp</label>
                                            <p className="text-gray-700">{result.graduationYear}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Thông tin đăng ký */}
                            <div className="mb-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-800">Thông Tin Đăng Ký</h4>
                                </div>
                                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs font-medium text-gray-500 tracking-wide">Campus Đăng Ký</label>
                                            <p className="text-gray-700 font-medium">FPT {result.campus}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-gray-500 tracking-wide">Ngành Học</label>
                                            <p className="text-gray-700 font-medium">{result.interestedAcademicField}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-gray-500 tracking-wide">Ngày Tạo Hồ Sơ</label>
                                            <p className="text-gray-700">{dayjs(result.createdAt).format('DD/MM/YYYY')}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-gray-500 tracking-wide ">Trạng Thái Hồ Sơ</label>
                                            <div className="mt-1 text-nowrap mr-6">
                                                <StatusBadge status={result.status} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl p-4 border border-orange-200">
                                <div className="flex items-center flex-col">
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm text-gray-600 text-center">
                                            Nếu có thắc mắc, liên hệ phòng tư vấn tuyển sinh !
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-500 text-center py-2">
                                        <p className='font-bold'>Hotline: (024) 7300 5588</p>
                                        <p>Email: tuyensinh@fpt.edu.vn</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileResearch;