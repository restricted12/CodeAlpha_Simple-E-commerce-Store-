import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { authGet, authPost, authPut, authDelete } from '../../utils/api';
import './AdminCategories.css';

const AdminCategories = () => {
  const { categories, fetchProducts } = useAuth();
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#3b82f6',
    icon: '📦',
    featured: false
  });

  const categoryIcons = [
    '📦', '📱', '💻', '🎮', '👕', '👟', '📚', '🏠', 
    '🚗', '⚽', '💄', '🎨', '🔧', '🍎', '☕', '🎵'
  ];

  const categoryColors = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
    '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1'
  ];

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      // For now, we'll create a mock list based on existing categories
      // In a real app, this would fetch from a categories API
      const mockCategories = [
        { _id: '1', name: 'Electronics', description: 'Electronic devices and gadgets', color: '#3b82f6', icon: '📱', featured: true, productCount: 15 },
        { _id: '2', name: 'Clothing', description: 'Fashion and apparel', color: '#10b981', icon: '👕', featured: true, productCount: 23 },
        { _id: '3', name: 'Books', description: 'Books and literature', color: '#f59e0b', icon: '📚', featured: false, productCount: 8 },
        { _id: '4', name: 'Home & Garden', description: 'Home improvement and garden supplies', color: '#8b5cf6', icon: '🏠', featured: false, productCount: 12 },
        { _id: '5', name: 'Sports', description: 'Sports equipment and accessories', color: '#ef4444', icon: '⚽', featured: true, productCount: 7 },
        { _id: '6', name: 'Beauty', description: 'Beauty and personal care products', color: '#ec4899', icon: '💄', featured: false, productCount: 19 },
        { _id: '7', name: 'Toys', description: 'Toys and games for all ages', color: '#06b6d4', icon: '🎮', featured: false, productCount: 14 },
        { _id: '8', name: 'Automotive', description: 'Car parts and automotive accessories', color: '#6366f1', icon: '🚗', featured: false, productCount: 6 }
      ];
      
      setCategoryList(mockCategories);
    } catch (err) {
      setError('Failed to load categories');
      console.error('Error loading categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categoryList.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Note: This would need proper API endpoints for categories
      if (editingCategory) {
        // Update existing category
        setCategoryList(prev => 
          prev.map(cat => 
            cat._id === editingCategory._id 
              ? { ...cat, ...formData }
              : cat
          )
        );
        setSuccess('Category updated successfully!');
      } else {
        // Create new category
        const newCategory = {
          _id: Date.now().toString(),
          ...formData,
          productCount: 0
        };
        setCategoryList(prev => [...prev, newCategory]);
        setSuccess('Category created successfully!');
      }

      handleCloseModal();
    } catch (err) {
      setError('Failed to save category');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      color: category.color,
      icon: category.icon,
      featured: category.featured
    });
    setShowModal(true);
  };

  const handleDelete = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      return;
    }

    try {
      setCategoryList(prev => prev.filter(cat => cat._id !== categoryId));
      setSuccess('Category deleted successfully!');
    } catch (err) {
      setError('Failed to delete category');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      color: '#3b82f6',
      icon: '📦',
      featured: false
    });
    setError(null);
    setSuccess(null);
  };

  const toggleFeatured = async (categoryId, currentFeatured) => {
    try {
      setCategoryList(prev => 
        prev.map(cat => 
          cat._id === categoryId 
            ? { ...cat, featured: !currentFeatured }
            : cat
        )
      );
      setSuccess(`Category ${!currentFeatured ? 'featured' : 'unfeatured'} successfully!`);
    } catch (err) {
      setError('Failed to update category');
    }
  };

  return (
    <div className="admin-categories">
      <div className="categories-header">
        <div className="header-content">
          <h1>Categories Management</h1>
          <p>Organize your products with categories</p>
        </div>
        <button 
          className="add-category-btn"
          onClick={() => setShowModal(true)}
        >
          ➕ Add Category
        </button>
      </div>

      {/* Search */}
      <div className="categories-search">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
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

      {/* Categories Grid */}
      <div className="categories-grid">
        {loading ? (
          <div className="loading">Loading categories...</div>
        ) : (
          filteredCategories.map((category) => (
            <div key={category._id} className="category-card">
              <div 
                className="category-header"
                style={{ backgroundColor: category.color }}
              >
                <div className="category-icon">{category.icon}</div>
                <div className="category-actions">
                  <button
                    className={`featured-btn ${category.featured ? 'active' : ''}`}
                    onClick={() => toggleFeatured(category._id, category.featured)}
                    title={category.featured ? 'Remove from featured' : 'Add to featured'}
                  >
                    ⭐
                  </button>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(category)}
                    title="Edit category"
                  >
                    ✏️
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(category._id)}
                    title="Delete category"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              
              <div className="category-content">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                
                <div className="category-stats">
                  <div className="stat">
                    <span className="stat-number">{category.productCount}</span>
                    <span className="stat-label">Products</span>
                  </div>
                  <div className="stat">
                    <span className={`status ${category.featured ? 'featured' : 'normal'}`}>
                      {category.featured ? 'Featured' : 'Normal'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {filteredCategories.length === 0 && !loading && (
          <div className="empty-state">
            <p>No categories found matching your search.</p>
          </div>
        )}
      </div>

      {/* Add/Edit Category Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="category-form">
              <div className="form-group">
                <label htmlFor="name">Category Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="icon">Icon</label>
                  <div className="icon-selector">
                    {categoryIcons.map(icon => (
                      <button
                        key={icon}
                        type="button"
                        className={`icon-option ${formData.icon === icon ? 'selected' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, icon }))}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="color">Color</label>
                  <div className="color-selector">
                    {categoryColors.map(color => (
                      <button
                        key={color}
                        type="button"
                        className={`color-option ${formData.color === color ? 'selected' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setFormData(prev => ({ ...prev, color }))}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  Featured Category
                </label>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={actionLoading}
                >
                  {actionLoading ? 'Saving...' : (editingCategory ? 'Update Category' : 'Create Category')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
