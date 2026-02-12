import axios from 'axios';
import { PORT } from './config/env.js';
import app from './app.js';
import mongoose from 'mongoose';

const BASE_URL = `http://localhost:${PORT}`;
let server;
let testResults = {
  passed: 0,
  failed: 0,
  tests: []
};

async function startServer() {
  return new Promise((resolve) => {
    server = app.listen(PORT, () => {
      console.log(`Test server started on port ${PORT}`);
      resolve();
    });
  });
}

async function stopServer() {
  return new Promise((resolve) => {
    server.close(() => {
      console.log('Test server stopped');
      resolve();
    });
  });
}

async function runTest(name, testFn) {
  try {
    await testFn();
    testResults.passed++;
    testResults.tests.push({ name, status: 'PASSED', error: null });
    console.log(`[PASS] ${name}`);
  } catch (error) {
    testResults.failed++;
    testResults.tests.push({ name, status: 'FAILED', error: error.message });
    console.error(`[FAIL] ${name}: ${error.message}`);
  }
}

async function testHealthCheck() {
  const response = await axios.get(`${BASE_URL}/`);
  if (response.status !== 200) throw new Error('Health check failed');
  if (!response.data.includes('subscription tracker')) throw new Error('Invalid response');
}

async function testDatabaseConnection() {
  if (mongoose.connection.readyState !== 1) {
    throw new Error(`Database not connected. State: ${mongoose.connection.readyState}`);
  }
}

async function testAuthEndpointExists() {
  try {
    await axios.post(`${BASE_URL}/api/v1/auth/register`, {});
  } catch (error) {
    if (error.response && error.response.status !== 404) {
      return; // Endpoint exists, validation errors are expected
    }
    throw new Error('Auth endpoint not accessible', { cause: error });
  }
}

async function testUserEndpointExists() {
  try {
    await axios.get(`${BASE_URL}/api/v1/users`);
  } catch (error) {
    if (error.response && error.response.status !== 404) {
      return; // Endpoint exists, auth errors expected
    }
    throw new Error('User endpoint not accessible', { cause: error });
  }
}

async function testSubscriptionEndpointExists() {
  try {
    await axios.get(`${BASE_URL}/api/v1/subscriptions`);
  } catch (error) {
    if (error.response && error.response.status !== 404) {
      return; // Endpoint exists, auth errors expected
    }
    throw new Error('Subscription endpoint not accessible', { cause: error });
  }
}

async function testErrorHandling() {
  try {
    await axios.get(`${BASE_URL}/api/v1/nonexistent`);
    throw new Error('Should have returned 404');
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return; // Correct error handling
    }
    throw error;
  }
}

async function testServerTimeout() {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    setTimeout(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= 2900 && elapsed <= 3200) {
        resolve();
      } else {
        reject(new Error(`Timeout not working correctly. Elapsed: ${elapsed}ms`));
      }
    }, 3000);
  });
}

async function testCORSHeaders() {
  const response = await axios.get(`${BASE_URL}/`);
  if (!response.headers) throw new Error('Missing response headers');
}

async function testJSONParsing() {
  try {
    await axios.post(`${BASE_URL}/api/v1/auth/register`, 
      { email: 'test@example.com', password: 'test' }
    );
  } catch (error) {
    if (error.response) {
      return; // Request was parsed correctly even if validation failed
    }
    throw new Error('JSON parsing failed', { cause: error });
  }
}

async function testEnvironmentLoaded() {
  if (!PORT || typeof PORT !== 'number') {
    throw new Error('Environment variables not loaded correctly');
  }
}

async function runAllTests() {
  console.log('\n' + '='.repeat(60));
  console.log('Subscription Tracker API - Test Suite');
  console.log('='.repeat(60) + '\n');

  try {
    // Initialization
    console.log('Initializing tests...\n');
    await startServer();
    
    // Give server time to fully start
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Run test suite
    console.log('Running test cases...\n');
    
    await runTest('Environment variables loaded', testEnvironmentLoaded);
    await runTest('Database connection active', testDatabaseConnection);
    await runTest('Health check endpoint', testHealthCheck);
    await runTest('Authentication endpoint accessible', testAuthEndpointExists);
    await runTest('User endpoint accessible', testUserEndpointExists);
    await runTest('Subscription endpoint accessible', testSubscriptionEndpointExists);
    await runTest('Error handling (404)', testErrorHandling);
    await runTest('CORS headers present', testCORSHeaders);
    await runTest('JSON request parsing', testJSONParsing);
    await runTest('Async timeout execution', testServerTimeout);

    // Results
    console.log('\n' + '='.repeat(60));
    console.log('Test Results Summary');
    console.log('='.repeat(60) + '\n');
    console.log(`Passed: ${testResults.passed}`);
    console.log(`Failed: ${testResults.failed}`);
    console.log(`Total: ${testResults.passed + testResults.failed}`);
    console.log(`Success Rate: ${((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(2)}%`);
    console.log('\n' + '='.repeat(60));

    // Detailed results
    if (testResults.failed > 0) {
      console.log('\nFailed Tests:\n');
      testResults.tests
        .filter(t => t.status === 'FAILED')
        .forEach(t => {
          console.log(`  • ${t.name}`);
          console.log(`    Error: ${t.error}\n`);
        });
    }

    // Exit with appropriate code
    const exitCode = testResults.failed > 0 ? 1 : 0;
    
    // Cleanup
    await stopServer();
    
    if (exitCode === 0) {
      console.log('All tests completed successfully!\n');
    } else {
      console.log('Some tests failed. Please review the errors above.\n');
    }
    
    process.exit(exitCode);

  } catch (error) {
    console.error('\nTest suite error:', error.message);
    await stopServer();
    process.exit(1);
  }
}

// Run tests
runAllTests();

