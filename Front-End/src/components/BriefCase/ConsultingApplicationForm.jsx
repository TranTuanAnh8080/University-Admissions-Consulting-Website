import React, { useEffect, useState } from "react";
import { Search, Trash2, Edit, CheckCircle, Loader2, Briefcase, Delete, View } from "lucide-react";
import axios from "axios";

import { Bell } from "lucide-react"; // Thêm icon chuông

const ConsultingApplicationForm = () => {
    const PAGE_SIZE = 10;
    const [processPage, setProcessPage] = useState(1);
    const [applicants, setApplicants] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [selectedApplicant, setSelectedApplicant] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [processSearch, setProcessSearch] = useState(""); // Thêm state riêng cho tab process
    const [claimedBookings, setClaimedBookings] = useState([]);
    const [showModal, setShowModal] = useState(false);


    const handleStatusChange = (bookingId, value) => {
        setUpdateStatus(prev => ({ ...prev, [bookingId]: value }));
    };

    const [discardedBookings, setDiscardedBookings] = useState([]);

    const [updateStatus, setUpdateStatus] = useState({}); // { [bookingId]: "Completed" | "Discarded" }
    const [updatingId, setUpdatingId] = useState(null); // Để disable nút khi đang cập nhật

    const [toast, setToast] = useState("");

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

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(""), 2000);
    };

    const [activeTab, setActiveTab] = useState("view"); // 'view' hoặc 'process'

    // 1. Add state for modal mode (add/edit), form data, and delete confirmation
    const [modalMode, setModalMode] = useState(null); // 'add' | 'edit' | null
    const [formData, setFormData] = useState({
        userFullName: '',
        userEmail: '',
        userPhoneNumber: '',
        birthDate: '',
        gender: '',
        province: '',
        address: '',
        school: '',
        graduationYear: '',
        campus: '',
        interestedAcademicField: '',
        mathScore: '',
        literatureScore: '',
        englishScore: '',
    });
    const [deleteId, setDeleteId] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

            status === 'Waiting' ? 'Đang Chờ Xử Lý' :
                status === 'InProgress'
                    ? 'Đang Trong Quá Trình Xét Tuyển' :
                    status === 'Approved' ? 'Đã Phê Duyệt Thành Công'
                        : 'Hồ Sơ Bị Loại Bỏ';

        return <span className={`${base} ${color}`}>{displayText}</span>;
    };


    const fetchApplicationForm = async (searchValue = "", page = 1) => {
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

            const provinces = [
                "Hà Nội", "Hải Phòng", "Huế", "Đà Nẵng",
                "Cần Thơ", "TP. Hồ Chí Minh", "Lai Châu", "Điện Biên", "Sơn La", "Lạng Sơn", "Quảng Ninh",
                "Thanh Hóa", "Nghệ An", "Hà Tĩnh", "Cao Bằng", "Tuyên Quang", "Lào Cai", "Thái Nguyên", "Phú Thọ",
                "Bắc Ninh", "Hưng Yên", "Hải Dương", "Ninh Bình", "Quảng Trị", "Gia Lai", "Khánh Hòa", "Lâm Đồng", "Đắk Lắk", "Đồng Nai",
                "Tây Ninh", "Vĩnh Long", "Đồng Tháp", "Cà Mau", "An Giang"
            ];

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
                }
                else if (provinces.some(m => removeVietnameseTones(m).toLowerCase() === normalized)) {
                    params.province = searchValue;
                }
                else if (majors.some(m => removeVietnameseTones(m).toLowerCase() === normalized)) {
                    params.interestedAcademicField = searchValue;
                } else if (campuses.some(c => removeVietnameseTones(c).toLowerCase() === normalized)) {
                    params.interestedCampus = searchValue.trim();
                } else {
                    params.userFullName = searchValue.trim();
                }
            }
            const res = await axios.get("http://localhost:8080/applicationbooking/get-all-applications", { params });
            const items = res.data?.data?.items || [];
            setApplicants(items);
            setTotalPages(res.data?.data?.totalPages || 1);

        } catch (error) {
            setError("Không thể tải danh sách hồ sơ.");
            setApplicants([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (activeTab === "view") {
            fetchApplicationForm(search, currentPage);
        }
    }, [search, currentPage, activeTab]);




    const handleViewDetails = (applicant) => {
        setSelectedApplicant(applicant);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);

    };

    // XỬ LÝ HỒ SƠ
    const claimApplication = async (bookingId) => {
        const token = localStorage.getItem("token");
        const userRole = localStorage.getItem("role");
        if (userRole != 'Consultant') {
            alert("Bạn không có quyền xử lý hồ sơ này.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/applicationbooking/claim-application-booking",
                {
                    applicationId: bookingId,

                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );

            if (response.data?.code === "Success!") {
                // Có thể cập nhật lại danh sách hoặc reload
                showToast("Đã chuyển sang mục Xử lý hồ sơ");
                fetchApplicationForm(); // gọi lại list
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
                console.log("⚠️ Lỗi khác:", error.message);
                alert("Lỗi không xác định.");
            }
        }
    };

    const getSubFromToken = () => {
        const token = localStorage.getItem('token');
        if (!token) return null;

        try {
            const payload = token.split('.')[1];
            const decodedPayload = JSON.parse(atob(payload));
            return decodedPayload.sub || null;
        } catch (err) {
            console.error("Lỗi khi decode JWT:", err);
            return null;
        }
    };

    const fetchClaimedBookings = async (searchValue = "", page = 1) => {
        const token = localStorage.getItem("token");
        const consultantId = getSubFromToken(); // 👈 Lấy ID riêng của Consultant

        if (!consultantId) {
            console.error("Không thể lấy Consultant ID từ token.");
            return;
        }

        setLoading(true);
        setError("");

        // Xác định query param phù hợp
        let params = {
            ClaimedByConsultantId: consultantId,
            pageIndex: page,
            pageSize: PAGE_SIZE,
        };

        const removeVietnameseTones = (str) => {
            return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
        }

        const provinces = [
            "Hà Nội", "Hải Phòng", "Huế", "Đà Nẵng",
            "Cần Thơ", "TP. Hồ Chí Minh", "Lai Châu", "Điện Biên", "Sơn La", "Lạng Sơn", "Quảng Ninh",
            "Thanh Hóa", "Nghệ An", "Hà Tĩnh", "Cao Bằng", "Tuyên Quang", "Lào Cai", "Thái Nguyên", "Phú Thọ",
            "Bắc Ninh", "Hưng Yên", "Hải Dương", "Ninh Bình", "Quảng Trị", "Gia Lai", "Khánh Hòa", "Lâm Đồng", "Đắk Lắk", "Đồng Nai",
            "Tây Ninh", "Vĩnh Long", "Đồng Tháp", "Cà Mau", "An Giang"
        ];

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
            }
            else if (provinces.some(m => removeVietnameseTones(m).toLowerCase() === normalized)) {
                params.province = searchValue;
            }
            else if (majors.some(m => removeVietnameseTones(m).toLowerCase() === normalized)) {
                params.interestedAcademicField = searchValue;
            } else if (campuses.some(c => removeVietnameseTones(c).toLowerCase() === normalized)) {
                params.interestedCampus = searchValue.trim();
            } else {
                params.userFullName = searchValue.trim();
            }
        }

        // Lấy InProgress
        const paramsInProgress = { ...params, status: "InProgress" };
        // Lấy Completed
        const paramsCompleted = { ...params, status: "Approved" };


        try {
            const [resInProgress, resCompleted] = await Promise.all([
                axios.get("http://localhost:8080/applicationbooking/get-all-applications", {
                    params: paramsInProgress,
                    headers: { Authorization: `Bearer ${token}` },
                }),
                axios.get("http://localhost:8080/applicationbooking/get-all-applications", {
                    params: paramsCompleted,
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ]);

            // Gộp kết quả
            const itemsInProgress = resInProgress.data?.data?.items || [];
            const itemsCompleted = resCompleted.data?.data?.items || [];
            let allItems = [...itemsInProgress, ...itemsCompleted];

            setClaimedBookings(allItems);
            setTotalPages(
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



    // CẬP NHẬT HỒ SƠ
    const handleUpdateStatus = async (bookingId) => {
        const status = updateStatus[bookingId];
        if (!status) {
            alert("Vui lòng chọn trạng thái!");
            return;
        }
        setUpdatingId(bookingId);
        try {
            await axios.put(
                "http://localhost:8080/applicationbooking/update-status",
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
            status: "Rejected",
            pageIndex: page,
            pageSize: PAGE_SIZE,
        };

        // ...xử lý searchValue như cũ...

        try {
            const response = await axios.get("http://localhost:8080/applicationbooking/get-all-applications", {
                params,
                headers: { Authorization: `Bearer ${token}` },
            });
            setDiscardedBookings(response.data?.data?.items || []);
            setTotalPages(response.data?.data?.totalPages || 1);
        } catch (error) {
            setError("Không thể tải danh sách hồ sơ bị loại bỏ.");
        }
        setLoading(false);
    };

    const handleShowViewTab = () => {
        setSelectedApplicant(true);
        setActiveTab("view");
        fetchApplicationForm(search, 1);
    }

    const handleShowProcessTab = () => {
        setActiveTab("process");
        fetchClaimedBookings();
    };



    // 3. Add placeholder CRUD functions
    const createApplication = async (data) => {
        // TODO: Replace with API call
        alert('Create application (API to be implemented)');
        setShowModal(false);
        fetchApplicationForm(currentPage);
    };
    const updateApplication = async (data) => {
        // TODO: Replace with API call
        alert('Update application (API to be implemented)');
        setShowModal(false);
        fetchApplicationForm(currentPage);
    };

    // 4. Add form submit handler
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (modalMode === 'add') {
            createApplication(formData);
        } else if (modalMode === 'edit') {
            updateApplication(formData);
        }
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

            <aside className="w-64 bg-orange-600 text-white flex flex-col py-6 px-10">
                <div className="mb-10">
                    <div className="text-2xl font-bold mb-2 flex items-center gap-2">
                        <Briefcase size={32} className="inline" /> Quản Lý Hồ Sơ Đăng Ký Xét Tuyển
                    </div>
                </div>
                <button
                    className="flex gap-2"
                    onClick={handleShowViewTab}
                >
                    <div className="bg-orange-500 rounded px-3 py-2 font-semibold flex items-center gap-2 whitespace-nowrap">
                        <View size={22} />
                        <span>Xem danh sách hồ sơ</span>
                    </div>
                </button>

                <button className="flex flex-col gap-2 mt-2 " onClick={handleShowProcessTab}>
                    <div className="bg-orange-500 rounded px-3 py-2 font-semibold flex items-center gap-2 text-nowrap">
                        <Edit size={20} /> Xử lý hồ sơ
                    </div>
                </button>

                <button className="flex flex-col gap-2 mt-2"
                    onClick={() => {
                        setActiveTab("deleted");
                        fetchDiscardedBookings();
                    }}
                >
                    <div className="bg-orange-500 rounded px-3 py-2 font-semibold flex items-center gap-2 text-nowrap">
                        <Delete size={20} /> Xóa hồ sơ
                    </div>
                </button>
            </aside>

            {/* Hiển thị hình ảnh khi chưa chọn chức năng nào */}
            {!selectedApplicant && (
                <div className="flex-1 flex items-center justify-center bg-gray-50 transition-all duration-500">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/6/68/Logo_FPT_Education.png"
                        alt="Consultant illustration"
                        className="max-w-md w-full object-contain"
                    />
                </div>
            )}

            {/* Main Content */}
            {selectedApplicant && activeTab === "view" && (
                <main className="flex-1 bg-gray-50 p-8">
                    <h2 className="text-3xl font-bold mb-6 text-orange-600">Danh Sách Hồ Sơ Đăng Ký Xét Tuyển</h2>

                    {/* Search */}
                    <form className="mb-4 flex items-center gap-2"
                        onSubmit={e => {
                            e.preventDefault();
                            setCurrentPage(1); // reset về trang 1 khi tìm kiếm mới
                            fetchApplicationForm(search, 1);
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

                    {/* ...table... */}
                    <div className="overflow-x-auto bg-white rounded-xl shadow text-nowrap">
                        <table className="min-w-full text-sm">
                            {/* ...thead... */}
                            <thead>
                                <tr className="bg-orange-100 text-gray-700">
                                    <th className="p-3 text-left">ID</th>
                                    <th className="p-3 text-left">Mã Hồ Sơ</th>
                                    <th className="p-3 text-left">Ngày Tạo</th>
                                    <th className="p-3 text-left">Xem Chi Tiết</th>
                                    <th className="p-3 text-left">Họ và Tên</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">Số Điện Thoại</th>
                                    <th className="p-3 text-left">Giới tính</th>
                                    <th className="p-3 text-left">Tỉnh/Thành Phố</th>
                                    <th className="p-3 text-left">Địa chỉ</th>
                                    <th className="p-3 text-left">Trường</th>
                                    <th className="p-3 text-left">Năm tốt nghiệp</th>
                                    <th className="p-3 text-left">Campus</th>
                                    <th className="p-3 text-left">Ngành học</th>
                                    <th className="p-3 text-left">Điểm Toán</th>
                                    <th className="p-3 text-left">Điểm Văn</th>
                                    <th className="p-3 text-left">Điểm Anh</th>
                                    <th className="p-3 text-left">Trạng Thái Hồ Sơ</th>
                                    <th className="p-3 text-left">Xử Lý Hồ Sơ</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={19} className="text-center py-8">
                                            <Loader2 className="animate-spin inline mr-2" /> Đang tải...
                                        </td>
                                    </tr>
                                ) : applicants.length === 0 ? (
                                    <tr>
                                        <td colSpan={19} className="text-center py-8 text-gray-500">
                                            Không có hồ sơ nào.
                                        </td>
                                    </tr>
                                ) : (
                                    applicants.map((applicant, idx) => (
                                        <tr key={applicant.id} className="border-b hover:bg-orange-50">
                                            <td className="p-3">{(currentPage - 1) * PAGE_SIZE + idx + 1}</td>
                                            <td className="p-3">{applicant.id}</td>
                                            <td className="p-3">
                                                {new Date(applicant.createdAt).toLocaleDateString('vi-VN')}
                                            </td>
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
                                            <td className="p-3">{applicant.gender}</td>
                                            <td className="p-3">{applicant.province}</td>
                                            <td className="p-3">{applicant.address}</td>
                                            <td className="p-3">{applicant.school}</td>
                                            <td className="p-3">{applicant.graduationYear}</td>
                                            <td className="p-3">{applicant.campus}</td>
                                            <td className="p-3">{applicant.interestedAcademicField}</td>
                                            <td className="p-3">{applicant.mathScore}</td>
                                            <td className="p-3">{applicant.literatureScore}</td>
                                            <td className="p-3">{applicant.englishScore}</td>
                                            <td className="p-3"><StatusBadge status={applicant.status} /></td>
                                            <td className="p-3 flex gap-2">
                                                <button
                                                    onClick={() => claimApplication(applicant.id)}
                                                    className="bg-green-500 hover:bg-green-600 transition text-white px-3 py-1 rounded flex items-center gap-1"
                                                >
                                                    <CheckCircle size={16} /> Nhận Hồ Sơ
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

                    <div className="overflow-x-auto bg-white rounded-xl shadow text-nowrap">
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="bg-orange-100 text-gray-700">
                                    <th className="p-3 text-left">ID</th>
                                    <th className="p-3 text-left">Mã Hồ Sơ</th>
                                    <th className="p-3 text-left">Trạng Thái Hồ Sơ</th>
                                    <th className="p-3 text-left">Họ và Tên</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">Số Điện Thoại</th>
                                    <th className="p-3 text-left">Ngày sinh</th>
                                    <th className="p-3 text-left">Giới tính</th>
                                    <th className="p-3 text-left">Tỉnh/Thành Phố</th>
                                    <th className="p-3 text-left">Địa chỉ</th>
                                    <th className="p-3 text-left">Trường</th>
                                    <th className="p-3 text-left">Năm tốt nghiệp</th>
                                    <th className="p-3 text-left">Campus</th>
                                    <th className="p-3 text-left">Ngành học</th>
                                    <th className="p-3 text-left">Điểm Toán</th>
                                    <th className="p-3 text-left">Điểm Văn</th>
                                    <th className="p-3 text-left">Điểm Anh</th>
                                    <th className="p-3 text-left">Xử Lý Hồ Sơ</th>
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
                                            <td className="p-3">{booking.id}</td>
                                            <td className="p-3"><StatusBadge status={booking.status} /></td>
                                            {/* <td className="p-3">{booking.ClaimedByConsultantId}</td> */}
                                            <td className="p-3">{booking.userFullName}</td>
                                            <td className="p-3">{booking.userEmail}</td>
                                            <td className="p-3">{booking.userPhoneNumber}</td>
                                            <td className="p-3">{booking.birthDate}</td>
                                            <td className="p-3">{booking.gender}</td>
                                            <td className="p-3">{booking.province}</td>
                                            <td className="p-3">{booking.address}</td>
                                            <td className="p-3">{booking.school}</td>
                                            <td className="p-3">{booking.graduationYear}</td>
                                            <td className="p-3">{booking.campus}</td>
                                            <td className="p-3">{booking.interestedAcademicField}</td>
                                            <td className="p-3">{booking.mathScore}</td>
                                            <td className="p-3">{booking.literatureScore}</td>
                                            <td className="p-3">{booking.englishScore}</td>

                                            <td className="p-3 flex items-center gap-2">
                                                <select
                                                    className="border rounded px-2 py-1"
                                                    value={updateStatus[booking.id] || ""}
                                                    onChange={e => handleStatusChange(booking.id, e.target.value)}
                                                    disabled={booking.status === "Approved" || booking.status === "Rejected"}
                                                >
                                                    <option value="">Chọn trạng thái</option>
                                                    <option value="Approved">Đã Phê Duyệt Thành Công</option>
                                                    <option value="Rejected">Hồ Sơ Bị Loại Bỏ</option>
                                                </select>
                                                <button
                                                    className={`bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition
                                                         ${booking.status === "Approved" || booking.status === "Rejected" ? "opacity-35 cursor-not-allowed" : ""}`}
                                                    disabled={
                                                        !updateStatus[booking.id] ||
                                                        updatingId === booking.id ||
                                                        booking.status === "Approved" ||
                                                        booking.status === "Rejected"
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
                </main>
            )}

            {activeTab === "deleted" && (
                <main className="flex-1 bg-gray-50 p-8">
                    <h2 className="text-2xl font-bold mb-6 text-orange-600">Danh Sách Hồ Sơ Bị Loại Bỏ</h2>
                    <div className="overflow-x-auto bg-white rounded-xl shadow text-nowrap">
                        <table className="min-w-full text-sm">

                            <thead>
                                <tr className="bg-orange-100 text-gray-700">
                                    <th className="p-3 text-left">ID</th>
                                    <th className="p-3 text-left">Mã Hồ Sơ</th>
                                    <th className="p-3 text-left">Trạng Thái Hồ Sơ</th>
                                    <th className="p-3 text-left">Họ và Tên</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">Số Điện Thoại</th>
                                    <th className="p-3 text-left">Ngày sinh</th>
                                    <th className="p-3 text-left">Giới tính</th>
                                    <th className="p-3 text-left">Tỉnh/Thành Phố</th>
                                    <th className="p-3 text-left">Địa chỉ</th>
                                    <th className="p-3 text-left">Trường</th>
                                    <th className="p-3 text-left">Năm tốt nghiệp</th>
                                    <th className="p-3 text-left">Campus</th>
                                    <th className="p-3 text-left">Ngành học</th>
                                    <th className="p-3 text-left">Điểm Toán</th>
                                    <th className="p-3 text-left">Điểm Văn</th>
                                    <th className="p-3 text-left">Điểm Anh</th>
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
                                            <td className="p-3">{booking.id}</td>
                                            <td className="p-3"><StatusBadge status={booking.status} /></td>
                                            {/* <td className="p-3">{booking.ClaimedByConsultantId}</td> */}
                                            <td className="p-3">{booking.userFullName}</td>
                                            <td className="p-3">{booking.userEmail}</td>
                                            <td className="p-3">{booking.userPhoneNumber}</td>
                                            <td className="p-3">{booking.birthDate}</td>
                                            <td className="p-3">{booking.gender}</td>
                                            <td className="p-3">{booking.province}</td>
                                            <td className="p-3">{booking.address}</td>
                                            <td className="p-3">{booking.school}</td>
                                            <td className="p-3">{booking.graduationYear}</td>
                                            <td className="p-3">{booking.campus}</td>
                                            <td className="p-3">{booking.interestedAcademicField}</td>
                                            <td className="p-3">{booking.mathScore}</td>
                                            <td className="p-3">{booking.literatureScore}</td>
                                            <td className="p-3">{booking.englishScore}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
            )}



            {/* XEM CHI TIẾT HỒ SƠ */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 border-t-8 border-orange-500 animate-fade-in-up">
                        {modalMode ? (
                            <form onSubmit={handleFormSubmit}>
                                <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">
                                    {modalMode === 'add' ? 'Thêm Hồ Sơ Mới' : 'Chỉnh Sửa Hồ Sơ'}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
                                    <div><label className="font-semibold">Họ và Tên:</label><input type="text" className="border rounded w-full px-2 py-1" value={formData.userFullName} onChange={e => setFormData({ ...formData, userFullName: e.target.value })} required /></div>
                                    <div><label className="font-semibold">Email:</label><input type="email" className="border rounded w-full px-2 py-1" value={formData.userEmail} onChange={e => setFormData({ ...formData, userEmail: e.target.value })} required /></div>
                                    <div><label className="font-semibold">Số Điện Thoại:</label><input type="text" className="border rounded w-full px-2 py-1" value={formData.userPhoneNumber} onChange={e => setFormData({ ...formData, userPhoneNumber: e.target.value })} required /></div>
                                    <div><label className="font-semibold">Ngày sinh:</label><input type="date" className="border rounded w-full px-2 py-1" value={formData.birthDate} onChange={e => setFormData({ ...formData, birthDate: e.target.value })} required /></div>
                                    <div><label className="font-semibold">Giới tính:</label><input type="text" className="border rounded w-full px-2 py-1" value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })} required /></div>
                                    <div><label className="font-semibold">Tỉnh/Thành Phố:</label><input type="text" className="border rounded w-full px-2 py-1" value={formData.province} onChange={e => setFormData({ ...formData, province: e.target.value })} required /></div>
                                    <div className="md:col-span-2"><label className="font-semibold">Địa chỉ:</label><input type="text" className="border rounded w-full px-2 py-1" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} required /></div>
                                    <div><label className="font-semibold">Trường:</label><input type="text" className="border rounded w-full px-2 py-1" value={formData.school} onChange={e => setFormData({ ...formData, school: e.target.value })} required /></div>
                                    <div><label className="font-semibold">Năm tốt nghiệp:</label><input type="text" className="border rounded w-full px-2 py-1" value={formData.graduationYear} onChange={e => setFormData({ ...formData, graduationYear: e.target.value })} required /></div>
                                    <div><label className="font-semibold">Campus:</label><input type="text" className="border rounded w-full px-2 py-1" value={formData.campus} onChange={e => setFormData({ ...formData, campus: e.target.value })} required /></div>
                                    <div><label className="font-semibold">Ngành học:</label><input type="text" className="border rounded w-full px-2 py-1" value={formData.interestedAcademicField} onChange={e => setFormData({ ...formData, interestedAcademicField: e.target.value })} required /></div>
                                    <div><label className="font-semibold">Điểm Toán:</label><input type="number" className="border rounded w-full px-2 py-1" value={formData.mathScore} onChange={e => setFormData({ ...formData, mathScore: e.target.value })} required /></div>
                                    <div><label className="font-semibold">Điểm Văn:</label><input type="number" className="border rounded w-full px-2 py-1" value={formData.literatureScore} onChange={e => setFormData({ ...formData, literatureScore: e.target.value })} required /></div>
                                    <div><label className="font-semibold">Điểm Anh:</label><input type="number" className="border rounded w-full px-2 py-1" value={formData.englishScore} onChange={e => setFormData({ ...formData, englishScore: e.target.value })} required /></div>
                                </div>
                                <div className="mt-8 text-right flex gap-2 justify-end">
                                    <button type="button" onClick={closeModal} className="px-5 py-2 rounded-xl bg-gray-300 text-gray-700 hover:bg-gray-400 transition duration-300">Hủy</button>
                                    <button type="submit" className="px-5 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition duration-300">
                                        {modalMode === 'add' ? 'Thêm' : 'Cập nhật'}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            // Show details (view mode)
                            <>
                                <div className="flex items-center justify-center mb-4 ">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/FPT_Education_logo.svg/2560px-FPT_Education_logo.svg.png"
                                        alt="FPT Education Logo"
                                        className="h-16 w-auto contrast-100 saturate-100"
                                        style={{ backgroundColor: 'transparent' }}
                                    />
                                </div>
                                <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">CHI TIẾT HỒ SƠ ĐĂNG KÝ XÉT TUYỂN </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
                                    <div><span className="font-semibold font-mono">Họ và Tên:</span> {selectedApplicant.userFullName}</div>
                                    <div><span className="font-semibold font-mono">Email:</span> {selectedApplicant.userEmail}</div>
                                    <div><span className="font-semibold font-mono">Số Điện Thoại:</span> {selectedApplicant.userPhoneNumber}</div>
                                    <div><span className="font-semibold font-mono">Giới tính:</span> {selectedApplicant.gender}</div>
                                    <div><span className="font-semibold font-mono">Tỉnh/Thành Phố:</span> {selectedApplicant.province}</div>
                                    <div><span className="font-semibold font-mono">Địa chỉ:</span> {selectedApplicant.address}</div>
                                    <div><span className="font-semibold font-mono">Trường:</span> {selectedApplicant.school}</div>
                                    <div><span className="font-semibold font-mono">Năm tốt nghiệp:</span> {selectedApplicant.graduationYear}</div>
                                    <div><span className="font-semibold font-mono">Campus:</span> {selectedApplicant.campus}</div>
                                    <div><span className="font-semibold font-mono">Ngành học:</span> {selectedApplicant.interestedAcademicField}</div>
                                    <div><span className="font-semibold font-mono">Điểm Toán:</span> {selectedApplicant.mathScore}</div>
                                    <div><span className="font-semibold font-mono">Điểm Văn:</span> {selectedApplicant.literatureScore}</div>
                                    <div><span className="font-semibold font-mono">Điểm Anh:</span> {selectedApplicant.englishScore}</div>
                                    <div>
                                        <span className="font-semibold font-mono">Tổng Điểm Xét Tuyển:</span>
                                        <span
                                            className="ml-2 px-3 py-1 rounded-lg bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold text-lg border-2 border-orange-400"
                                            style={{ letterSpacing: "1px" }}
                                        >
                                            {Number(selectedApplicant.mathScore) + Number(selectedApplicant.literatureScore) + Number(selectedApplicant.englishScore)}
                                        </span>
                                    </div>     <div className="md:col-span-2"><span className="font-semibold">Trạng Thái Hồ Sơ:</span> <StatusBadge status={selectedApplicant.status} /></div>
                                </div>
                                <div className="mt-8 text-right">
                                    <button
                                        onClick={closeModal}
                                        className="px-5 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition duration-300"
                                    >
                                        Đóng
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}


        </div >
    );
};

export default ConsultingApplicationForm;