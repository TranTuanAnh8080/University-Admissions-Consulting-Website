import React, { useEffect, useState } from "react";
import axios from "axios";
import AddUserModal from "./AddUserModal";
import UpdateUserModal from "./UpdateUserModal";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(import.meta.env.VITE_GET_ALL_USERS);
      setUsers(res.data.data.items || []);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách người dùng:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className=" min-h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Quản lý người dùng</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
        >
          + Thêm người dùng
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-3">Họ tên</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Kích hoạt</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-6">
                  Đang tải danh sách người dùng...
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{user.fullName}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-1 rounded text-white text-xs ${
                        user.isActive ? "bg-green-500" : "bg-gray-400"
                      }`}
                    >
                      {user.isActive ? "Đã xác thực" : "Chưa xác thực"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-1 rounded text-white text-xs ${
                        user.isDeleted ? "bg-red-600" : "bg-green-500"
                      }`}
                    >
                      {user.isDeleted ? "Đã xóa" : "Hoạt động"}
                    </span>
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setShowEditModal(true);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Sửa
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-red-500">
                  Không có người dùng nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <AddUserModal
          onClose={() => setShowAddModal(false)}
          onSuccess={fetchUsers}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && selectedUser && (
        <UpdateUserModal
          user={selectedUser}
          onClose={() => {
            setShowEditModal(false);
            setSelectedUser(null);
          }}
          onSuccess={fetchUsers}
        />
      )}
    </div>
  );
};

export default User;
