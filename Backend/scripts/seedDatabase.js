/**
 * Database Seeding Script
 * Run this script to populate the Firebase database with real e-commerce products
 * 
 * Usage: node scripts/seedDatabase.js
 */

import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const API_URL = process.env.BACKEND_URL || 'https://amazon-clone-project-kv7m.onrender.com';

async function seedDatabase() {
    console.log('🌱 Starting database seeding...');
    console.log(`📡 API URL: ${API_URL}`);
    
    try {
        const response = await fetch(`${API_URL}/api/products/seed`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (response.ok) {
            console.log('✅ Database seeded successfully!');
            console.log(`📦 Created ${data.count} products out of ${data.total} total`);
            
            if (data.errors && data.errors.length > 0) {
                console.log('\n⚠️  Some products failed to create:');
                data.errors.forEach(err => {
                    console.log(`   - ${err.product}: ${err.error}`);
                });
            }
        } else {
            console.error('❌ Failed to seed database:', data.message || data.error);
        }
    } catch (error) {
        console.error('❌ Error seeding database:', error.message);
    }
}

// Run the seeding
seedDatabase();
