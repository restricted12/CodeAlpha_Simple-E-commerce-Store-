import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { authGet, authPut, authDelete } from '../../utils/api';
import './AdminUsers.css';

const AdminUsers = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [userStats, setUserStats] = useState({
    total: 0,
    active: 0,
    inactive: 0
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Note: This would need a proper API endpoint to fetch all users
      // For now, we'll simulate with the current user
      const mockUsers = [
        {
          _id: currentUser._id,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
          isActive: true,
          role: 'admin',
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        }
      ];
      
      setUsers(mockUsers);
      
      // Calculate stats
      setUserStats({
        total: mockUsers.length,
        active: mockUsers.filter(u => u.isActive).length,
        inactive: mockUsers.filter(u => !u.isActive).length
      });
    } catch (err) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users
    .filter(user => {
      const matchesSearch = 
        user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
        case 'email':
          return a.email.localeCompare(b.email);
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'last-login':
          return new Date(b.lastLogin) - new Date(a.lastLogin);
        default:
          return 0;
      }
    });

  const handleToggleUserStatus = async (userId, currentStatus) => {
    setActionLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Note: This would need a proper API endpoint to update user status
      const newStatus = !currentStatus;
      
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user._id === userId 
            ? { ...user, isActive: newStatus }
            : user
        )
      );

      setSuccess(`User ${newStatus ? 'activated' : 'deactivated'} successfully!`);
    } catch (err) {
      setError('Failed to update user status');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    setActionLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Note: This would need a proper API endpoint to delete users
      setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
      setSuccess('User deleted successfully!');
    } catch (err) {
      setError('Failed to delete user');
    } finally {
      setActionLoading(false);
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setError(null);
    setSuccess(null);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRoleColor = (role) => {
    const colors = {
      admin: '#dc2626',
      user: '#059669',
      moderator: '#7c3aed'
    };
    return colors[role] || '#6b7280';
  };

  const getStatusColor = (isActive) => {
    return isActive ? '#059669' : '#dc2626';
  };

  return (
    <div className="admin-users">
      <div className="users-header">
        <div className="header-content">
          <h1>Users Management</h1>
          <p>Manage user accounts and permissions</p>
        </div>
        <div className="user-stats">
          <div className="stat-item">
            <span className="stat-number">{userStats.total}</span>
            <span className="stat-label">Total Users</span>
          </div>
          <div className="stat-item active">
            <span className="stat-number">{userStats.active}</span>
            <span className="stat-label">Active</span>
          </div>
          <div className="stat-item inactive">
            <span className="stat-number">{userStats.inactive}</span>
            <span className="stat-label">Inactive</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="users-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filter-group">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">Name A-Z</option>
            <option value="email">Email A-Z</option>
            <option value="last-login">Last Login</option>
          </select>
        </div>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="alert success">
          <span>✅</span>
          {success}
        </div>
      )}

      {error && (
        <div className="alert error">
          <span>❌</span>
          {error}
        </div>
      )}

      {/* Users Table */}
      <div className="users-table-container">
        {loading ? (
          <div className="loading">Loading users...</div>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">
                        {user.firstName?.charAt(0) || 'U'}
                      </div>
                      <div className="user-details">
                        <h4>{user.firstName} {user.lastName}</h4>
                        <p>ID: {user._id.slice(-8)}</p>
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span 
                      className="role-badge"
                      style={{ backgroundColor: getRoleColor(user.role) }}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(user.isActive) }}
                    >
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{formatDate(user.createdAt)}</td>
                  <td>{formatDate(user.lastLogin)}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="view-btn"
                        onClick={() => handleViewUser(user)}
                      >
                        👁️
                      </button>
                      <button
                        className={`toggle-btn ${user.isActive ? 'deactivate' : 'activate'}`}
                        onClick={() => handleToggleUserStatus(user._id, user.isActive)}
                        disabled={actionLoading}
                      >
                        {user.isActive ? '⏸️' : '▶️'}
                      </button>
                      {user._id !== currentUser._id && (
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteUser(user._id)}
                          disabled={actionLoading}
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {filteredUsers.length === 0 && !loading && (
          <div className="empty-state">
            <p>No users found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {showModal && selectedUser && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>User Details</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                ✕
              </button>
            </div>

            <div className="user-details">
              <div className="user-profile">
                <div className="profile-avatar">
                  {selectedUser.firstName?.charAt(0) || 'U'}
                </div>
                <div className="profile-info">
                  <h3>{selectedUser.firstName} {selectedUser.lastName}</h3>
                  <p>{selectedUser.email}</p>
                  <div className="profile-badges">
                    <span 
                      className="role-badge"
                      style={{ backgroundColor: getRoleColor(selectedUser.role) }}
                    >
                      {selectedUser.role}
                    </span>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(selectedUser.isActive) }}
                    >
                      {selectedUser.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="user-stats-detail">
                <div className="stat-card">
                  <h4>Account Information</h4>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>User ID:</label>
                      <span>{selectedUser._id}</span>
                    </div>
                    <div className="info-item">
                      <label>Joined:</label>
                      <span>{formatDate(selectedUser.createdAt)}</span>
                    </div>
                    <div className="info-item">
                      <label>Last Login:</label>
                      <span>{formatDate(selectedUser.lastLogin)}</span>
                    </div>
                    <div className="info-item">
                      <label>Status:</label>
                      <span>{selectedUser.isActive ? 'Active' : 'Inactive'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  className={`action-btn ${selectedUser.isActive ? 'deactivate' : 'activate'}`}
                  onClick={() => {
                    handleToggleUserStatus(selectedUser._id, selectedUser.isActive);
                    handleCloseModal();
                  }}
                  disabled={actionLoading}
                >
                  {selectedUser.isActive ? 'Deactivate User' : 'Activate User'}
                </button>
                {selectedUser._id !== currentUser._id && (
                  <button
                    className="action-btn delete"
                    onClick={() => {
                      handleDeleteUser(selectedUser._id);
                      handleCloseModal();
                    }}
                    disabled={actionLoading}
                  >
                    Delete User
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
