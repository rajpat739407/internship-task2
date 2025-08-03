import axios from 'axios';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [editingUserId, setEditingUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all users
const fetchUsers = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/users");
    setUsers(response.data);
  } catch (err) {
    toast.error("Failed to fetch users");
  }
};


  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
const handleAddUser = async () => {
  try {
    await axios.post("http://localhost:5000/api/users/register", {
      username,
      email,
      password,
      confirmPassword,
    });
    toast.success("User added");
    fetchUsers();
  } catch (err) {
    toast.error(err.response?.data?.message || "Add failed");
  }
};




  // Edit user
const handleUpdateUser = async () => {
  try {
    await axios.put("http://localhost:5000/api/users/update", {
      userId: selectedUserId,
      username,
      email,
      password, // optional
    });
    toast.success("User updated");
    fetchUsers();
  } catch (err) {
    toast.error(err.response?.data?.message || "Update failed");
  }
};


  // Delete user
const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this user?")) return;
  setIsLoading(true);

  try {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    toast.success("User deleted successfully");
    fetchUsers();
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to delete user");
  } finally {
    setIsLoading(false);
  }
};


  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setEditingUserId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Panel</h1>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingUserId ? 'Edit User' : 'Create New User'}
          </h2>
          <form onSubmit={handleAddUser}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required={!editingUserId}
                  minLength={6}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required={!editingUserId}
                  minLength={6}
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                {isLoading ? 'Processing...' : editingUserId ? 'Update' : 'Create'}
              </button>
              {editingUserId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Users List</h2>
          </div>
          {isLoading && users.length === 0 ? (
            <div className="p-8 text-center">Loading users...</div>
          ) : users.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No users found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">
                        <button
                          className="text-blue-600 hover:underline mr-4"
                          onClick={() => handleUpdateUser()}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
