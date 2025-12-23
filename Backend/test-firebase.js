// Test script to verify Firebase configuration
// Run with: node test-firebase.js

import { auth, db } from './src/config/firebase.config.js';
import { getAllProducts } from './src/services/firestore.service.js';

console.log('🔥 Testing Firebase Configuration...\n');

// Test 1: Check Firebase Auth
console.log('✅ Firebase Auth initialized:', auth ? 'SUCCESS' : 'FAILED');
console.log('   Auth instance:', auth.app.name);

// Test 2: Check Firestore
console.log('✅ Firestore initialized:', db ? 'SUCCESS' : 'FAILED');
console.log('   Database instance:', db.app.name);

// Test 3: Try to fetch products (will be empty if no products exist)
console.log('\n📦 Testing Firestore connection...');
getAllProducts(5)
  .then(result => {
    if (result.success) {
      console.log('✅ Firestore connection: SUCCESS');
      console.log(`   Found ${result.count} products`);
      if (result.count > 0) {
        console.log('   Sample product:', result.products[0]);
      } else {
        console.log('   Note: No products in database yet (this is normal for a new setup)');
      }
    } else {
      console.log('⚠️  Firestore query failed:', result.error);
    }
  })
  .catch(error => {
    console.error('❌ Error testing Firestore:', error.message);
  });

console.log('\n✨ Firebase configuration test complete!\n');
