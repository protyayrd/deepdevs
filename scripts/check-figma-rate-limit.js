#!/usr/bin/env node

/**
 * Figma Rate Limit Checker
 * Checks rate limit status and handles 429 responses
 */

const FIGMA_API_KEY = process.env.FIGMA_API_KEY || '';
const FIGMA_API_BASE = 'https://api.figma.com/v1';

if (!FIGMA_API_KEY) {
  console.error('Error: FIGMA_API_KEY environment variable is not set');
  process.exit(1);
}

async function checkRateLimit(fileKey, nodeId) {
  const url = `${FIGMA_API_BASE}/files/${fileKey}/nodes?ids=${nodeId}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Figma-Token': FIGMA_API_KEY,
      },
    });

    // Check rate limit headers even on success
    const retryAfter = response.headers.get('Retry-After');
    const rateLimitType = response.headers.get('X-Figma-Rate-Limit-Type');
    const upgradeLink = response.headers.get('X-Figma-Upgrade-Link');
    const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining');
    const rateLimitReset = response.headers.get('X-RateLimit-Reset');

    if (response.status === 429) {
      console.log('\n❌ Rate Limit Exceeded (429)');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      
      if (retryAfter) {
        const waitSeconds = parseInt(retryAfter, 10);
        const waitMinutes = Math.ceil(waitSeconds / 60);
        const retryTime = new Date(Date.now() + waitSeconds * 1000);
        
        console.log(`⏰ Retry After: ${waitSeconds} seconds (${waitMinutes} minute${waitMinutes !== 1 ? 's' : ''})`);
        console.log(`🕐 Retry Time: ${retryTime.toLocaleString()}`);
        console.log(`📅 Retry At: ${retryTime.toISOString()}`);
      } else {
        console.log('⏰ Retry After: Not specified in headers');
      }

      if (rateLimitType) {
        console.log(`📊 Rate Limit Type: ${rateLimitType}`);
      }

      if (upgradeLink) {
        console.log(`🔗 Upgrade Link: ${upgradeLink}`);
      }

      if (rateLimitReset) {
        const resetTime = new Date(parseInt(rateLimitReset, 10) * 1000);
        console.log(`🔄 Rate Limit Resets At: ${resetTime.toLocaleString()}`);
      }

      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      
      return {
        status: 'rate_limited',
        retryAfter: retryAfter ? parseInt(retryAfter, 10) : null,
        rateLimitType,
        upgradeLink,
        retryTime: retryAfter ? new Date(Date.now() + parseInt(retryAfter, 10) * 1000) : null,
      };
    }

    if (response.ok) {
      console.log('\n✅ Request Successful');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      
      if (rateLimitRemaining !== null) {
        console.log(`📊 Remaining Requests: ${rateLimitRemaining}`);
      }

      if (rateLimitReset) {
        const resetTime = new Date(parseInt(rateLimitReset, 10) * 1000);
        console.log(`🔄 Rate Limit Resets At: ${resetTime.toLocaleString()}`);
      }

      if (rateLimitType) {
        console.log(`📊 Rate Limit Type: ${rateLimitType}`);
      }

      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

      return {
        status: 'success',
        rateLimitRemaining: rateLimitRemaining ? parseInt(rateLimitRemaining, 10) : null,
        rateLimitReset: rateLimitReset ? new Date(parseInt(rateLimitReset, 10) * 1000) : null,
        rateLimitType,
      };
    }

    // Other error
    const errorText = await response.text();
    console.error(`\n❌ Error ${response.status}: ${errorText}\n`);
    return {
      status: 'error',
      statusCode: response.status,
      error: errorText,
    };
  } catch (error) {
    console.error(`\n❌ Network Error: ${error.message}\n`);
    return {
      status: 'network_error',
      error: error.message,
    };
  }
}

// Main execution
const args = process.argv.slice(2);

if (args.length < 2) {
  console.log('Usage: node check-figma-rate-limit.js <fileKey> <nodeId>');
  console.log('Example: node check-figma-rate-limit.js bQ9Y5QdguSIPN93oIDRc6C 6690-3208');
  process.exit(1);
}

const [fileKey, nodeId] = args;

console.log(`\n🔍 Checking Figma API Rate Limit Status...`);
console.log(`📁 File Key: ${fileKey}`);
console.log(`🆔 Node ID: ${nodeId}\n`);

checkRateLimit(fileKey, nodeId)
  .then((result) => {
    if (result.status === 'rate_limited' && result.retryTime) {
      console.log(`\n💡 You can retry after: ${result.retryTime.toLocaleString()}`);
      process.exit(1);
    } else if (result.status === 'success') {
      process.exit(0);
    } else {
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('Unexpected error:', error);
    process.exit(1);
  });

