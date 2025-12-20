import { config } from 'dotenv';
import { createClient } from '@sanity/client';
import { hashAccessCode } from '../lib/hash.js';

config({ path: '.env.local' });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const writeToken = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error('❌ Error: NEXT_PUBLIC_SANITY_PROJECT_ID is not set in .env.local');
  console.error('Please add your Sanity project ID to .env.local');
  process.exit(1);
}

if (!dataset) {
  console.error('❌ Error: NEXT_PUBLIC_SANITY_DATASET is not set in .env.local');
  console.error('Please add your Sanity dataset to .env.local');
  process.exit(1);
}

if (!writeToken) {
  console.error('❌ Error: SANITY_API_WRITE_TOKEN is not set in .env.local');
  console.error('Please add your Sanity write token to .env.local');
  console.error('You can create one at: https://sanity.io/manage');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: writeToken,
});

function generateRandomCode(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

async function generateAccessCodes() {
  try {
    console.log('Fetching all people...');

    const people = await client.fetch('*[_type == "person"]{_id, "slug": slug.current}');

    console.log(`Found ${people.length} people. Generating access codes...`);

    const results = [];

    for (const person of people) {
      const accessCode = generateRandomCode();
      const accessCodeHash = hashAccessCode(accessCode);

      console.log(`Updating ${person.slug} (${person._id}) with hash: ${accessCodeHash.substring(0, 16)}...`);

      try {
        const result = await client
          .patch(person._id)
          .set({ accessCodeHash })
          .commit();

        console.log(`✓ Updated ${person.slug} - result:`, result ? 'success' : 'no result');

        results.push({
          slug: person.slug,
          accessCode,
          hash: accessCodeHash
        });

        console.log(`✓ Updated ${person.slug} with access code: ${accessCode}`);
      } catch (error) {
        console.error(`❌ Failed to update ${person.slug}:`, error);
      }
    }

    console.log('\n=== ACCESS CODES GENERATED ===');
    console.log('Save these codes securely - they cannot be recovered:');
    console.log('');

    results.forEach(result => {
      console.log(`${result.slug}: ${result.accessCode}`);
    });

    console.log('\n=== PROCESS COMPLETE ===');
    console.log(`Updated ${results.length} people with unique access codes.`);

  } catch (error) {
    console.error('Error generating access codes:', error);
    process.exit(1);
  }
}

generateAccessCodes();
