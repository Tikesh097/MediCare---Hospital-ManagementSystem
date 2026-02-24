import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';
import { Trash2, User, Shield, Stethoscope, UserCircle } from 'lucide-react';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await adminService.getAllUsers();
        setUsers(res.data.users);
      } catch {
        toast.error('Failed to load users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user? This cannot be undone.')) return;
    try {
      await adminService.deleteUser(id);
      toast.success('User deleted');
      setUsers(users.filter((u) => u._id !== id));
    } catch {
      toast.error('Failed to delete user');
    }
  };

  const roleIcon = { admin: Shield, doctor: Stethoscope, patient: UserCircle };
  const roleColor = { admin: 'text-purple-600 bg-purple-50', doctor: 'text-green-600 bg-green-50', patient: 'text-blue-600 bg-blue-50' };

  const filteredUsers = filter === 'all' ? users : users.filter((u) => u.role === filter);

  if (loading) return <LoadingSpinner size="lg" className="mt-20" />;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Users List</h1>
        <p className="text-gray-500">{users.length} registered users</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {['all', 'admin', 'doctor', 'patient'].map((role) => (
          <button
            key={role}
            onClick={() => setFilter(role)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
              filter === role ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border'
            }`}
          >
            {role}
          </button>
        ))}
      </div>

      <div className="card overflow-hidden p-0">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">User</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Role</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Joined</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredUsers.map((user) => {
              const RoleIcon = roleIcon[user.role] || User;
              return (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${roleColor[user.role]}`}>
                      <RoleIcon className="h-3 w-3" />
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <div className="text-center py-12 text-gray-500">No users found</div>
        )}
      </div>
    </div>
  );
};

export default UsersList;
