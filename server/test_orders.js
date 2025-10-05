const axios = require('axios');

const API_BASE_URL = 'http://localhost:1487/api';

// Test configuration
const testConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
};

// Test user credentials (you'll need to create this user first)
const testUser = {
  email: 'test@example.com',
  password: 'testpassword123'
};

let authToken = '';
let userId = '';
let testOrderId = '';

// Helper function to log test results
const logTest = (testName, success, message = '') => {
  const status = success ? '✅ PASS' : '❌ FAIL';
  console.log(`${status} ${testName}${message ? `: ${message}` : ''}`);
};

// Test 1: User Login
async function testUserLogin() {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, testUser, testConfig);
    authToken = response.data.token;
    userId = response.data.user._id;
    testConfig.headers.Authorization = `Bearer ${authToken}`;
    logTest('User Login', true);
    return true;
  } catch (error) {
    logTest('User Login', false, error.response?.data?.error || error.message);
    return false;
  }
}

// Test 2: Create Test Order
async function testCreateOrder() {
  try {
    const orderData = {
      products: [
        {
          product: '507f1f77bcf86cd799439011', // Mock product ID
          quantity: 2,
          price: 29.99
        },
        {
          product: '507f1f77bcf86cd799439012', // Mock product ID
          quantity: 1,
          price: 49.99
        }
      ],
      total: 109.97
    };

    const response = await axios.post(`${API_BASE_URL}/orders/create-order`, orderData, testConfig);
    testOrderId = response.data._id;
    logTest('Create Order', true, `Order ID: ${testOrderId}`);
    return true;
  } catch (error) {
    logTest('Create Order', false, error.response?.data?.error || error.message);
    return false;
  }
}

// Test 3: Get Orders by User ID
async function testGetOrdersByUser() {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/get-orders-byuser/user/${userId}`, testConfig);
    logTest('Get Orders by User', true, `Found ${response.data.length} orders`);
    return true;
  } catch (error) {
    logTest('Get Orders by User', false, error.response?.data?.error || error.message);
    return false;
  }
}

// Test 4: Get Single Order
async function testGetSingleOrder() {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/get-single-order/${testOrderId}`, testConfig);
    logTest('Get Single Order', true, `Order Status: ${response.data.status}`);
    return true;
  } catch (error) {
    logTest('Get Single Order', false, error.response?.data?.error || error.message);
    return false;
  }
}

// Test 5: Update Order
async function testUpdateOrder() {
  try {
    const updateData = {
      status: 'processing'
    };

    const response = await axios.put(`${API_BASE_URL}/orders/update-order/${testOrderId}`, updateData, testConfig);
    logTest('Update Order', true, `Updated Status: ${response.data.status}`);
    return true;
  } catch (error) {
    logTest('Update Order', false, error.response?.data?.error || error.message);
    return false;
  }
}

// Test 6: Get All Orders (Admin)
async function testGetAllOrders() {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/all-orders`, testConfig);
    logTest('Get All Orders', true, `Total Orders: ${response.data.length}`);
    return true;
  } catch (error) {
    logTest('Get All Orders', false, error.response?.data?.error || error.message);
    return false;
  }
}

// Test 7: Delete Order
async function testDeleteOrder() {
  try {
    const response = await axios.delete(`${API_BASE_URL}/orders/delete-order/${testOrderId}`, testConfig);
    logTest('Delete Order', true, response.data.message);
    return true;
  } catch (error) {
    logTest('Delete Order', false, error.response?.data?.error || error.message);
    return false;
  }
}

// Test 8: Test Authentication (should fail without token)
async function testAuthentication() {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/get-orders-byuser/user/${userId}`);
    logTest('Authentication Check', false, 'Should have failed without token');
    return false;
  } catch (error) {
    if (error.response?.status === 401) {
      logTest('Authentication Check', true, 'Properly rejected unauthorized request');
      return true;
    } else {
      logTest('Authentication Check', false, 'Unexpected error');
      return false;
    }
  }
}

// Main test runner
async function runAllTests() {
  console.log('🚀 Starting Orders API Tests...\n');

  const tests = [
    { name: 'Authentication Check', fn: testAuthentication },
    { name: 'User Login', fn: testUserLogin },
    { name: 'Create Order', fn: testCreateOrder },
    { name: 'Get Orders by User', fn: testGetOrdersByUser },
    { name: 'Get Single Order', fn: testGetSingleOrder },
    { name: 'Update Order', fn: testUpdateOrder },
    { name: 'Get All Orders', fn: testGetAllOrders },
    { name: 'Delete Order', fn: testDeleteOrder }
  ];

  let passedTests = 0;
  let totalTests = tests.length;

  for (const test of tests) {
    try {
      const result = await test.fn();
      if (result) passedTests++;
    } catch (error) {
      console.log(`❌ FAIL ${test.name}: Unexpected error - ${error.message}`);
    }
  }

  console.log('\n📊 Test Results:');
  console.log(`Passed: ${passedTests}/${totalTests}`);
  console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

  if (passedTests === totalTests) {
    console.log('\n🎉 All tests passed! Orders API is working correctly.');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the implementation.');
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests().catch(console.error);
}

module.exports = {
  testUserLogin,
  testCreateOrder,
  testGetOrdersByUser,
  testGetSingleOrder,
  testUpdateOrder,
  testGetAllOrders,
  testDeleteOrder,
  testAuthentication
}; 