import axios from "axios";
import React, { useState } from "react";

const AddUserModal = ({ onClose, onSuccess }) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        import.meta.env.VITE_ADD_NEW_USER,
        {
          email,
          fullName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("User added:", res.data);
      onSuccess(); // refetch user list
      onClose(); // close modal
    } catch (err) {
      console.error(err);
      if (
        err.response &&
        err.response.data &&
        err.response.data.message?.includes("email")
      ) {
        setError("Email này đã được sử dụng.");
      } else {
        setError("Đã có lỗi xảy ra.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Thêm người dùng mới</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              required
            />
          </div>
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

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Thêm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
