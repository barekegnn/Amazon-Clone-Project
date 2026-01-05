import React, { useEffect, useState } from 'react';
import { Mail, Shield, ShieldOff, Search, User } from 'lucide-react';
import { getAllUsers, updateUserRole } from '../../services/adminUserApi';
import { useAuth } from '../../context/AuthContextAPI';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

const UserList = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to load users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    const action = newRole === 'admin' ? 'Promote' : 'Demote';
    
    if (!window.confirm(`Are you sure you want to ${action} this user?`)) return;

    try {
      setUpdatingId(userId);
      await updateUserRole(userId, newRole);
      
      // Update local state
      setUsers(users.map(u => 
        u.uid === userId ? { ...u, role: newRole } : u
      ));
    } catch {
      alert('Failed to update role');
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredUsers = users.filter(u => 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.displayName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="flex justify-center p-12"><LoadingSpinner /></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Users</h2>
        <span className="text-sm text-gray-500">{users.length} Users</span>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-700 font-semibold uppercase">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((u) => (
                <tr key={u.uid} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                        <User size={16} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{u.displayName || 'No Name'}</p>
                        <p className="text-gray-500">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                      u.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                      u.disabled 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {u.disabled ? 'Disabled' : 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleRoleChange(u.uid, u.role)}
                      disabled={updatingId === u.uid || u.uid === currentUser?.uid}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded border transition-colors ${
                        u.role === 'admin'
                          ? 'border-red-200 text-red-700 hover:bg-red-50'
                          : 'border-blue-200 text-blue-700 hover:bg-blue-50'
                      } ${updatingId === u.uid || u.uid === currentUser?.uid ? 'opacity-50 cursor-not-allowed' : ''}`}
                      title={u.role === 'admin' ? 'Demote to User' : 'Promote to Admin'}
                    >
                      {u.role === 'admin' ? <ShieldOff size={14} /> : <Shield size={14} />}
                      {u.role === 'admin' ? 'Demote' : 'Promote'}
                      {updatingId === u.uid && <LoadingSpinner size="sm" />}
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
