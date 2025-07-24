const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'avfzfro0',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // You'll need to get this from Sanity
  useCdn: false,
});

async function configureCORS() {
  try {
    console.log('Configuring CORS settings...');
    
    // Add localhost origins for development
    const corsOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://localhost:3000',
      'https://localhost:3001'
    ];

    console.log('CORS configuration would need to be done through Sanity Studio or CLI.');
    console.log('Please visit: https://www.sanity.io/manage/personal/project/avfzfro0/api');
    console.log('And add these origins:', corsOrigins);
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

configureCORS();
