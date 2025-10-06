const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin', 'moderator'], default: 'user' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

async function testAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/ecommerce');
    console.log('✅ Connected to MongoDB');

    // Find admin user
    const admin = await User.findOne({ email: 'admin@example.com' });
    
    if (!admin) {
      console.log('❌ Admin account not found!');
      console.log('Run: node setup-admin.js');
      return;
    }

    console.log('✅ Admin account found:');
    console.log('📧 Email:', admin.email);
    console.log('👑 Role:', admin.role);
    console.log('🟢 Active:', admin.isActive);
    console.log('📅 Created:', admin.createdAt);

    // Test password
    const isValidPassword = await bcrypt.compare('admin123', admin.password);
    console.log('🔑 Password test:', isValidPassword ? '✅ Valid' : '❌ Invalid');

    // Test role check
    const isAdmin = admin.role === 'admin' || admin.role === 'moderator';
    console.log('🔐 Admin access:', isAdmin ? '✅ Allowed' : '❌ Denied');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

testAdmin();
