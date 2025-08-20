import React, { useState } from "react";
import axios from "axios";

const UpdateUserModal = ({ user, onClose, onSuccess }) => {
  const [fullName, setFullName] = useState(user.fullName || "");
  const [isActive, setIsActive] = useState(user.isActive);
  const [isDeleted, setIsDeleted] = useState(user.isDeleted);
  const [error, setError] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        import.meta.env.VITE_UPDATE_USER,
        {
          userId: user.id,
          fullName,
          isActive,
          isDeleted,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      onSuccess(); // refresh danh sách
      onClose(); // đóng modal
    } catch (err) {
      console.error("Lỗi khi cập nhật người dùng:", err);
      setError("Đã xảy ra lỗi khi cập nhật.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Cập nhật người dùng</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Họ tên</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="active"
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            <label htmlFor="active">Kích hoạt</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="deleted"
              type="checkbox"
              checked={isDeleted}
              onChange={(e) => setIsDeleted(e.target.checked)}
            />
            <label htmlFor="deleted">Đã xóa</label>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserModal;
