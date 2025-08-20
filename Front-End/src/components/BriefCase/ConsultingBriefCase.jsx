import React, { useEffect, useState } from "react";
import { Search, Trash2, Edit, CheckCircle, Loader2, Briefcase, Delete, View } from "lucide-react";
import axios from "axios";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LogOutIcon } from "lucide-react";
import LoadingPage from "../LoadingPage/LoadingPage";
const ConsultingBriefCase = () => {
    const PAGE_SIZE = 5;
    const [processPage, setProcessPage] = useState(1);

    const [applicants, setApplicants] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [selectedApplicant, setSelectedApplicant] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [claimedBookings, setClaimedBookings] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    const [activeTab, setActiveTab] = useState("view"); // 'view' hoặc 'process'

    const [processSearch, setProcessSearch] = useState(""); // Thêm state riêng cho tab process

    const [updateStatus, setUpdateStatus] = useState({}); // { [bookingId]: "Completed" | "Discarded" }
    const [updatingId, setUpdatingId] = useState(null); // Để disable nút khi đang cập nhật

    const handleStatusChange = (bookingId, value) => {
        setUpdateStatus(prev => ({ ...prev, [bookingId]: value }));
    };

    const [discardedBookings, setDiscardedBookings] = useState([]);
    const [toast, setToast] = useState("");

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(""), 2000);
    };

    const [notificationCount, setNotificationCount] = useState(0);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);

    // Kết nối WebSocket (giả sử backend hỗ trợ socket.io hoặc ws)
    useEffect(() => {
        // Thay thế URL này bằng endpoint WebSocket thực tế của bạn
        const ws = new WebSocket("ws://localhost:8080/notifications");

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "NEW_APPLICATION") {
                setNotificationCount(count => count + 1);
                setNotifications(list => [
                    { message: "Có đơn xét tuyển mới!", time: new Date().toLocaleTimeString() },
                    ...list,
                ]);
            }
        };

        return () => ws.close();
    }, []);

    // MÀU SẮC CHO TỪNG TRẠNG THÁI HỒ SƠ
    const StatusBadge = ({ status }) => {
        const base = "px-2 py-1 rounded text-xs font-semibold";
        const color =
            status === 'Waiting'
                ? "bg-yellow-400 text-white"
                : status === 'InProgress'
                    ? "bg-blue-500 text-white"
                    : status === 'Discarded'
                        ? "bg-red-500 text-white"
                        : status === 'Completed'
                            ? "bg-green-600 text-white"
                            : "bg-gray-300 text-black";

        const displayText =

            status === 'Waiting' ? 'Đang Chờ Xử Lý' :
                status === 'InProgress'
                    ? 'Đang Trong Quá Trình Tư Vấn' :
                    status === 'Completed' ? 'Đã Hoàn Thành'
                        : 'Bị Loại Bỏ';

        return <span className={`${base} ${color}`}>{displayText}</span>;
    };


    const fetchBriefcases = async (searchValue = "", page = 1) => {
        setLoading(true);
        setError("");
        try {
            let params = {
                pageIndex: page,
                pageSize: PAGE_SIZE,
                status: "Waiting",
            };

            const removeVietnameseTones = (str) => {
                return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
            }

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
                'Cần Thơ',
            ];

            // Nếu searchValue là số hoặc uuid thì tìm theo id, còn lại tìm theo tên/email/sđt
            if (searchValue) {
                const normalized = removeVietnameseTones(searchValue).toLowerCase();

                if (/^[0-9a-fA-F-]{36}$/.test(searchValue)) {
                    params.id = searchValue.trim();
                } else if (/^(0|\+84)(3|5|7|8|9)[0-9]{8}$/.test(searchValue)) {
                    params.userPhoneNumber = searchValue.trim();
                } else if (searchValue.includes("@")) {
                    params.userEmail = searchValue.trim();
                } else if (majors.some(m => removeVietnameseTones(m).toLowerCase() === normalized)) {
                    params.interestedSpecialization = searchValue;
                } else if (campuses.some(c => removeVietnameseTones(c).toLowerCase() === normalized)) {
                    params.interestedCampus = searchValue.trim();
                } else {
                    params.userFullName = searchValue.trim();
                }
            }
            const res = await axios.get("http://localhost:8080/bookings/get-all-bookings", { params });
            const items = res.data?.data?.items || []; // Lấy danh sách hồ sơ từ response
            setApplicants(items);
            setTotalPages(res.data?.data?.totalPages || 1); // Cập nhật tổng số trang

        } catch (error) {
            setError("Không thể tải danh sách hồ sơ.");
            setApplicants([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (activeTab === "view") {
            fetchBriefcases(search, currentPage);
        }
    }, [search, currentPage, activeTab]);


    const handleViewDetails = (applicant) => {
        setSelectedApplicant(applicant);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);

    };

    const ResolveBriefcase = async (bookingId) => {
        const token = localStorage.getItem("token");
        const userRole = localStorage.getItem("role");
        if (userRole != 'Consultant') {
            alert("Bạn không có quyền xử lý hồ sơ này.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/bookings/claim-consult-booking",
                {
                    bookingId: bookingId,

                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );

            if (response.data?.code === "Success!") { 
                showToast("Đã chuyển sang mục Xử lý hồ sơ");
                fetchBriefcases(); // gọi lại list
            } else {
                alert("Không thể claim hồ sơ. Vui lòng thử lại.");
            }
        } catch (error) {
            if (error.response) {
                console.log("lỗi từ server:", error.response.status);
                console.log("Thông điệp:", error.response.data);
                alert(error.response.data.message || "Lỗi từ server.");
            } else if (error.request) {
                console.log("⏳ Không có phản hồi:", error.request);
                alert("Không nhận được phản hồi từ server.");
            } else {
                console.log("Lỗi khác:", error.message);
                alert("Lỗi không xác định.");
            }
        }
    };

    const getSubFromToken = () => { // Hàm này sẽ lấy sub từ token JWT
        const token = localStorage.getItem('token');
        if (!token) return null; 

        try {
            const payload = token.split('.')[1]; // Lấy phần payload của token
            const decodedPayload = JSON.parse(atob(payload)); // Giải mã base64
            return decodedPayload.sub || null;
        } catch (err) {
            console.error("Lỗi khi decode JWT:", err);
            return null;
        }
    };

    const fetchClaimedBookings = async (searchValue = "", page = 1) => {
        const token = localStorage.getItem("token");
        const consultantId = getSubFromToken();

        if (!consultantId) {
            console.error("Không thể lấy Consultant ID từ token.");
            return;
        }

        setLoading(true);
        setError("");

        let baseParams = {
            claimedByConsultantId: consultantId,
            pageIndex: page,
            pageSize: PAGE_SIZE,
        };

        const removeVietnameseTones = (str) => {
            return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
        }

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
            'Cần Thơ',
        ];

        // Nếu searchValue là số hoặc uuid thì tìm theo id, còn lại tìm theo tên/email/sđt
        if (searchValue) {
            const normalized = removeVietnameseTones(searchValue).toLowerCase();

            if (/^[0-9a-fA-F-]{36}$/.test(searchValue)) {
                baseParams.id = searchValue.trim();
            } else if (/^(0|\+84)(3|5|7|8|9)[0-9]{8}$/.test(searchValue)) {
                baseParams.userPhoneNumber = searchValue.trim();
            } else if (searchValue.includes("@")) {
                baseParams.userEmail = searchValue.trim();
            } else if (majors.some(m => removeVietnameseTones(m).toLowerCase() === normalized)) {
                baseParams.interestedSpecialization = searchValue;
            } else if (campuses.some(c => removeVietnameseTones(c).toLowerCase() === normalized)) {
                baseParams.interestedCampus = searchValue.trim();
            } else {
                baseParams.userFullName = searchValue.trim();
            }
        }

        // Lấy InProgress
        const paramsInProgress = { ...baseParams, status: "InProgress" };
        // Lấy Completed
        const paramsCompleted = { ...baseParams, status: "Completed" };

        try {
            const [resInProgress, resCompleted] = await Promise.all([ // Gọi API song song 
                axios.get("http://localhost:8080/bookings/get-all-bookings", {
                    params: paramsInProgress,
                    headers: { Authorization: `Bearer ${token}` },
                }),
                axios.get("http://localhost:8080/bookings/get-all-bookings", {
                    params: paramsCompleted,
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ]);

            // Gộp kết quả
            const itemsInProgress = resInProgress.data?.data?.items || []; // Lấy danh sách hồ sơ đang xử lý
            const itemsCompleted = resCompleted.data?.data?.items || [];
            let allItems = [...itemsInProgress, ...itemsCompleted]; // Gộp cả 2 danh sách

            setClaimedBookings(allItems);

            setTotalPages( // Tính tổng số trang từ cả 2 danh sách
                resInProgress.data?.data?.totalPages || 1,
                resCompleted.data?.data?.totalPages || 1,
            );
        } catch (error) {
            console.error("Lỗi khi tải danh sách xử lý:", error);
            setError("Không thể tải danh sách hồ sơ đang xử lý.");
        }

        setLoading(false);
    };

    useEffect(() => {
        if (activeTab === "process") {
            fetchClaimedBookings(processSearch, processPage);
        }
    }, [processSearch, processPage, activeTab]);



    const handleUpdateStatus = async (bookingId) => {
        const status = updateStatus[bookingId];
        if (!status) {
            alert("Vui lòng chọn trạng thái!");
            return;
        }
        setUpdatingId(bookingId);
        try {
            await axios.put(
                "http://localhost:8080/bookings/update-status",
                {},
                {
                    params: { Id: bookingId, Status: status },
                    headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
                }
            );
            alert("Cập nhật trạng thái thành công!");
            fetchClaimedBookings(); // Refresh lại danh sách
        } catch (error) {
            alert("Cập nhật thất bại!");
        }
        setUpdatingId(null);
    };


    // DANH SÁCH HỒ SƠ "BỊ LOẠI BỎ"
    const fetchDiscardedBookings = async (searchValue = "", page = 1) => {
        const token = localStorage.getItem("token");
        const consultantId = getSubFromToken();

        if (!consultantId) return;

        setLoading(true);
        setError("");

        let params = {
            claimedByConsultantId: consultantId,
            status: "Discarded",
            pageIndex: page,
            pageSize: PAGE_SIZE,
        };

        // ...xử lý searchValue như cũ...

        try {
            const response = await axios.get("http://localhost:8080/bookings/get-all-bookings", {
                params,
                headers: { Authorization: `Bearer ${token}` },
            });
            setDiscardedBookings(response.data?.data?.items || []);
            setTotalPages(response.data?.data?.totalPages || 1); // Tính tổng số trang
        } catch (error) {
            setError("Không thể tải danh sách hồ sơ bị loại bỏ.");
        }
        setLoading(false);
    };

    const handleShowViewTab = () => {
        setSelectedApplicant(true);
        setActiveTab("view");
        fetchBriefcases(search, 1);
    }

    const handleShowProcessTab = () => {
        setActiveTab("process");
        fetchClaimedBookings();
    };


    const handleLogout = () => {
        setLoading(true);
        setTimeout(() => {
            localStorage.removeItem("token");
            navigate("/");
        }, 1500);
    };

    return (

        <div className="flex min-h-screen">
            {/* Sidebar */}
            {toast && (
                <div className="fixed top-6 right-6 z-50
                 bg-green-500 text-white px-6 py-3 rounded shadow-lg animate-fade-in">
                    {toast}
                </div>
            )}

            {loading && <LoadingPage />}

            <aside className="w-64 bg-orange-600 text-white flex flex-col py-6 px-10">
                <div className="mb-10">
                    <div className="text-2xl font-bold mb-2 flex items-center gap-2">
                        <Briefcase size={32} className="inline" /> Quản Lý Hồ Sơ Đăng Ký Tư Vấn
                    </div>
                </div>
                <button
                    className="flex gap-2"
                    onClick={handleShowViewTab}
                >
                    <div className="bg-orange-500 rounded px-3 py-2 font-semibold flex items-center gap-2 whitespace-nowrap
                      active:bg-orange-800 transition">
                        <View size={22} />
                        <span>Xem danh sách hồ sơ</span>
                    </div>
                </button>

                <button className="flex flex-col gap-2 mt-2 " onClick={handleShowProcessTab}>
                    <div className="bg-orange-500 rounded px-3 py-2 font-semibold flex items-center gap-2 whitespace-nowrap
                      active:bg-orange-800 transition">
                        <Edit size={20} /> Xử lý hồ sơ
                    </div>
                </button>

                <button className="flex flex-col gap-2 mt-2" onClick={() => {
                    setActiveTab("deleted");
                    fetchDiscardedBookings();
                }}>
                    <div className="bg-orange-500 rounded px-3 py-2 font-semibold flex items-center gap-2 whitespace-nowrap
                     hover:bg-orange-700 active:bg-orange-800 transition">
                        <Delete size={20} /> Xóa hồ sơ
                    </div>
                </button>

                <div className="p-1 border-t border-orange-400 bg-orange-500 mt-auto">
                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-center gap-2 w-full hover:bg-orange-600 px-2 py-2 text-center rounded transition text-sm"
                        style={{ minHeight: 0 }}
                    >
                        <LogOutIcon size={18} />
                        {!collapsed && <span className="font-semibold">Log out</span>}
                    </button>
                </div>

            </aside>



            {/* Hiển thị hình ảnh khi chưa chọn chức năng nào */}
            {!selectedApplicant && (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                    <img
                        src=
                        "https://upload.wikimedia.org/wikipedia/commons/6/68/Logo_FPT_Education.png"
                        alt="Consultant illustration"
                        className="max-w-md w-full object-contain"
                    />
                </div>
            )}

            {/* Main Content */}
            {selectedApplicant && activeTab === "view" && (
                <main className="flex-1 bg-gray-50 p-8">
                    <h2 className="text-3xl font-bold mb-6 text-orange-600">Danh Sách Hồ Sơ Đăng Ký Tư Vấn</h2>

                    {/* Search */}
                    <form className="mb-4 flex items-center gap-2"
                        onSubmit={e => {
                            e.preventDefault();
                            setCurrentPage(1); // reset về trang 1 khi tìm kiếm mới
                            fetchBriefcases(search, 1);
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên, email, số điện thoại..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-xs"
                        />
                        <button
                            type="submit"
                            className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-orange-600"
                        >
                            <Search size={18} /> Tìm kiếm
                        </button>
                    </form>

{/* ================================================================== */}
                    <div className="fixed top-6 right-10 z-50">
                        <button
                            className="relative"
                            onClick={() => setShowNotifications(v => !v)}
                            aria-label="Thông báo"
                        >
                            <Bell size={28} className="text-orange-500" />
                            {notificationCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
                                    {notificationCount}
                                </span>
                            )}
                        </button>
                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg p-4">
                                <h4 className="font-bold mb-2">Thông báo mới</h4>
                                {notifications.length === 0 ? (
                                    <div className="text-gray-500 text-sm">Không có thông báo mới.</div>
                                ) : (
                                    <ul>
                                        {notifications.map((n, i) => (
                                            <li key={i} className="mb-1 text-sm flex justify-between">
                                                <span>{n.message}</span>
                                                <span className="text-gray-400">{n.time}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <button
                                    className="mt-2 text-orange-500 hover:underline text-xs"
                                    onClick={() => { setNotificationCount(0); setShowNotifications(false); }}
                                >
                                    Đánh dấu đã đọc
                                </button>
                            </div>
                        )}
                    </div>
{/* ================================================================== */}

                    {/* Alerts */}
                    {/* ...table... */}
                    <div className="overflow-x-auto bg-white rounded-xl shadow text-nowrap">
                        <table className="min-w-full text-sm">
                            {/* ...thead... */}
                            <thead>
                                <tr className="bg-orange-100 text-gray-700">
                                    <th className="p-3 text-left">ID</th>
                                    
                                    <th className="p-3 text-left">Xem Chi Tiết</th>
                                    <th className="p-3 text-left">Họ và Tên</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">Số Điện Thoại</th>
                                    <th className="p-3 text-left">Tỉnh/Thành Phố</th>
                                    <th className="p-3 text-left">Ngành Học</th>
                                    <th className="p-3 text-left">Campus</th>
                                    <th className="p-3 text-left">Thắc Mắc</th>
                                    <th className="p-3 text-left">Trạng Thái Hồ Sơ</th>

                                    <th className="p-3 text-left">Xử Lý Hồ Sơ</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-8">
                                            <Loader2 className="animate-spin inline mr-2" /> Đang tải...
                                        </td>
                                    </tr>
                                ) : applicants.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-8 text-gray-500">
                                            Không có hồ sơ nào.
                                        </td>
                                    </tr>
                                ) : (
                                    applicants.map((applicant, idx) => (
                                        <tr key={applicant.id} className="border-b hover:bg-orange-50">
                                            <td className="p-3">{(currentPage - 1) * PAGE_SIZE + idx + 1}</td>
                                            <td className="p-3">
                                                <button
                                                    onClick={() => handleViewDetails(applicant)}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    Chi tiết hồ sơ
                                                </button>
                                            </td>
                                            <td className="p-3">{applicant.userFullName}</td>
                                            <td className="p-3">{applicant.userEmail}</td>
                                            <td className="p-3">{applicant.userPhoneNumber}</td>
                                            <td className="p-3">{applicant.location}</td>
                                            <td className="p-3">{applicant.interestedSpecialization}</td>
                                            <td className="p-3">{applicant.interestedCampus}</td>
                                            <td className="p-3 text-wrap">{applicant.reason}</td>
                                            <td className="p-3"><StatusBadge status={applicant.status} /></td>

                                            <td className="p-3">
                                                <button
                                                    onClick={() => ResolveBriefcase(applicant.id)}
                                                    className="bg-orange-500 hover:bg-orange-600 transition text-white px-4 py-2 rounded flex items-center gap-2"
                                                >
                                                    <Edit size={18} /> Xử lý hồ sơ
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-4 gap-2">
                            <button
                                className="px-3 py-1 rounded bg-orange-200 hover:bg-orange-400 disabled:opacity-50"
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                            >
                                Trang trước
                            </button>
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-orange-500 text-white" : "bg-orange-200 hover:bg-orange-400"}`}
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                className="px-3 py-1 rounded bg-orange-200 hover:bg-orange-400 disabled:opacity-50"
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                            >
                                Trang sau
                            </button>
                        </div>
                    )}
                </main>
            )}



            {activeTab === "process" && (
                <main className="flex-1 bg-gray-50 p-8">
                    <h2 className="text-2xl font-bold mb-6 text-orange-600">Danh Sách Hồ Sơ Đã Xác Nhận</h2>
                    <form
                        className="mb-4 flex items-center gap-2"
                        onSubmit={e => {
                            e.preventDefault();
                            setCurrentPage(1); // reset về trang 1 khi tìm kiếm mới
                            fetchClaimedBookings(processSearch, 1);
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên, email, số điện thoại, mã hồ sơ..."
                            value={processSearch}
                            onChange={e => setProcessSearch(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-xs"
                        />
                        <button
                            type="submit"
                            className="bg-orange-500 text-white px-4 py-2
                             rounded-lg flex items-center gap-1 hover:bg-orange-600"
                        >
                            <Search size={18} /> Tìm kiếm
                        </button>
                    </form>
{/* ================================================================== */}
                    <div className="fixed top-6 right-10 z-50">
                        <button
                            className="relative"
                            onClick={() => setShowNotifications(v => !v)}
                            aria-label="Thông báo"
                        >
                            <Bell size={28} className="text-orange-500" />
                            {notificationCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
                                    {notificationCount}
                                </span>  
                            )}
                        </button>
                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg p-4">
                                <h4 className="font-bold mb-2">Thông báo mới</h4>
                                {notifications.length === 0 ? (
                                    <div className="text-gray-500 text-sm">Không có thông báo mới.</div>
                                ) : (
                                    <ul>
                                        {notifications.map((n, i) => (
                                            <li key={i} className="mb-1 text-sm flex justify-between">
                                                <span>{n.message}</span>
                                                <span className="text-gray-400">{n.time}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <button
                                    className="mt-2 text-orange-500 hover:underline text-xs"
                                    onClick={() => { setNotificationCount(0); setShowNotifications(false); }}
                                >
                                    Đánh dấu đã đọc
                                </button>
                            </div>
                        )}
                    </div>

{/* ================================================================== */}       
             
                    <div className="overflow-x-auto bg-white rounded-xl shadow text-nowrap">
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="bg-orange-100 text-gray-700">
                                    <th className="p-3 text-left">STT</th>
                                    <th className="p-3 text-left">Trạng Thái Hồ Sơ</th>
                                    <th className="p-3 text-left">Họ tên</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">Ngành Học</th>
                                    <th className="p-3 text-left">Campus Đăng Ký</th>
                                    <th className="p-3 text-left">Thắc Mắc</th>
                                    <th className="p-3 text-left">Hành Động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {claimedBookings.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="text-center py-8 text-gray-500">
                                            Không có hồ sơ nào.
                                        </td>
                                    </tr>
                                ) : (
                                    claimedBookings.map((booking, idx) => (
                                        <tr key={booking.id} className="border-b hover:bg-orange-50 transition">
                                            <td className="p-3">{(processPage - 1) * PAGE_SIZE + idx + 1}</td>
                                        
                                            <td className="p-3">
                                                <StatusBadge status={booking.status} />
                                            </td>
                                            <td className="p-3">{booking.userFullName}</td>
                                            <td className="p-3">{booking.userEmail}</td>
                                            <td className="p-3">{booking.interestedSpecialization}</td>
                                            <td className="p-3">{booking.interestedCampus}</td>
                                            <td className="p-3 text-wrap">{booking.reason}</td>

                                            <td className="p-3 flex items-center gap-2">
                                                <select
                                                    className="border rounded px-2 py-1"
                                                    value={updateStatus[booking.id] || ""}
                                                    onChange={e => handleStatusChange(booking.id, e.target.value)}
                                                    disabled={booking.status === "Completed" || booking.status === "Discarded"}
                                                >
                                                    <option value="">Chọn trạng thái</option>
                                                    <option value="Completed">Đã hoàn thành</option>
                                                    <option value="Discarded">Bị Loại Bỏ</option>
                                                </select>
                                                <button
                                                    className={`bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition
                                                         ${booking.status === "Completed" || booking.status === "Discarded" ? "opacity-35 cursor-not-allowed" : ""}`}
                                                    disabled={
                                                        !updateStatus[booking.id] || 
                                                        updatingId === booking.id || // Đang cập nhật
                                                        booking.status === "Completed" ||
                                                        booking.status === "Discarded"
                                                    }
                                                    onClick={() => handleUpdateStatus(booking.id)}
                                                >
                                                    {updatingId === booking.id ? "Đang cập nhật..." : "Cập nhật"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 1 && ( // Hiển thị phân trang nếu có nhiều trang
                        <div className="flex justify-center mt-4 gap-2">
                            <button
                                className="px-3 py-1 rounded bg-orange-200 hover:bg-orange-400 disabled:opacity-50"

                                onClick={() => setProcessPage(p => Math.max(1, p - 1))} // Giảm trang xuống 1
                                disabled={processPage === 1}
                            >
                                Trang trước
                            </button>
                            {[...Array(totalPages)].map((_, i) => ( // Tạo nút cho từng trang
                                <button
                                    key={i}
                                    className={`px-3 py-1 rounded ${processPage === i + 1 ? "bg-orange-500 text-white" : "bg-orange-200 hover:bg-orange-400"}`}
                                    onClick={() => setProcessPage(i + 1)} // Chuyển đến trang i + 1
                                >
                                    {i + 1} 
                                </button>
                            ))}
                            <button
                                className="px-3 py-1 rounded bg-orange-200 hover:bg-orange-400 disabled:opacity-50"
                                onClick={() => setProcessPage(p => Math.min(totalPages, p + 1))} // Tăng trang lên 1
                                disabled={processPage === totalPages}
                            >
                                Trang sau
                            </button>
                        </div>
                    )}
                </main>
            )}


            {activeTab === "deleted" && (
                <main className="flex-1 bg-gray-50 p-8">
                    <h2 className="text-2xl font-bold mb-6 text-orange-600">Danh Sách Hồ Sơ Bị Loại Bỏ</h2>
                    <div className="overflow-x-auto bg-white rounded-xl shadow text-nowrap">
                        <table className="min-w-full text-sm">

                            <thead>
                                <tr className="bg-orange-100 text-gray-700">
                                    <th className="p-3 text-left">STT</th>
                                    <th className="p-3 text-left">Trạng thái</th>
                                    <th className="p-3 text-left">Mã Tư vấn viên</th>
                                    <th className="p-3 text-left">Họ tên</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">Ngành Học</th>
                                    <th className="p-3 text-left">Campus Đăng Ký</th>
                                    <th className="p-3 text-left">Thắc Mắc</th>


                                </tr>
                            </thead>

                            <tbody>
                                {discardedBookings.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="text-center py-8 text-gray-500">
                                            Không có hồ sơ nào bị loại bỏ.
                                        </td>
                                    </tr>
                                ) : (
                                    discardedBookings.map((booking, idx) => (
                                        <tr key={booking.id} className="border-b hover:bg-orange-50 transition">
                                            <td className="p-3">{(processPage - 1) * PAGE_SIZE + idx + 1}</td>
                                            <td className="p-3">
                                                <StatusBadge status={booking.status} />
                                            </td>

                                            <td className="p-3">{booking.claimedByConsultantId}</td>
                                            <td className="p-3">{booking.userFullName}</td>
                                            <td className="p-3">{booking.userEmail}</td>
                                            <td className="p-3">{booking.interestedSpecialization}</td>
                                            <td className="p-3">{booking.interestedCampus}</td>
                                            <td className="p-3 text-wrap">{booking.reason}</td>

                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
            )}


            {/* XEM CHI TIẾT HỒ SƠ */}
            {showModal && selectedApplicant && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 border-t-8 border-orange-500 animate-fade-in-up">
                        <div className="flex items-center justify-center mb-4 ">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/FPT_Education_logo.svg/2560px-FPT_Education_logo.svg.png"
                                alt="FPT Education Logo"
                                className="h-16 w-auto contrast-100 saturate-100"
                                style={{ backgroundColor: 'transparent' }} // Đảm bảo logo có nền trong suốt

                            />
                        </div>
                        <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">CHI TIẾT HỒ SƠ ĐĂNG KÝ TƯ VẤN</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
                            <div><span className="font-semibold font-mono">Họ và Tên:</span> {selectedApplicant.userFullName}</div>
                            <div><span className="font-semibold font-mono">Email:</span> {selectedApplicant.userEmail}</div>
                            <div><span className="font-semibold font-mono">Số Điện Thoại:</span> {selectedApplicant.userPhoneNumber}</div>
                            <div><span className="font-semibold font-mono">Tỉnh/Thành Phố:</span> {selectedApplicant.location}</div>
                            <div><span className="font-semibold font-mono">Ngành Học Quan Tâm:</span> {selectedApplicant.interestedSpecialization}</div>
                            <div><span className="font-semibold font-mono">Campus Đăng Ký:</span> {selectedApplicant.interestedCampus}</div>
                            <div className="md:col-span-2"><span className="font-semibold">Thắc Mắc:</span> {selectedApplicant.reason}</div>
                            <div className="md:col-span-2"><span className="font-semibold">
                                Trạng Thái Hồ Sơ:</span> <StatusBadge status={selectedApplicant.status} /></div>

                        </div>

                        <div className="mt-8 text-right">
                            <button
                                onClick={closeModal}
                                className="px-5 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition duration-300"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}



        </div >
    );
};

export default ConsultingBriefCase;