/**
 * Figma API Utility with Rate Limit Handling
 */

const FIGMA_API_KEY = process.env.FIGMA_API_KEY || '';
const FIGMA_API_BASE = 'https://api.figma.com/v1';

if (!FIGMA_API_KEY) {
  throw new Error('FIGMA_API_KEY environment variable is not set');
}

/**
 * Parse rate limit information from response headers
 */
function parseRateLimitInfo(response) {
  const retryAfter = response.headers.get('Retry-After');
  const rateLimitType = response.headers.get('X-Figma-Rate-Limit-Type');
  const upgradeLink = response.headers.get('X-Figma-Upgrade-Link');
  const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining');
  const rateLimitReset = response.headers.get('X-RateLimit-Reset');

  const info = {
    retryAfter: retryAfter ? parseInt(retryAfter, 10) : null,
    rateLimitType,
    upgradeLink,
    rateLimitRemaining: rateLimitRemaining ? parseInt(rateLimitRemaining, 10) : null,
    rateLimitReset: rateLimitReset ? new Date(parseInt(rateLimitReset, 10) * 1000) : null,
  };

  if (retryAfter) {
    info.retryTime = new Date(Date.now() + info.retryAfter * 1000);
    info.retryAfterMinutes = Math.ceil(info.retryAfter / 60);
    info.retryAfterHours = Math.ceil(info.retryAfter / 3600);
  }

  return info;
}

/**
 * Make a request to Figma API with rate limit handling
 */
async function figmaRequest(endpoint, options = {}) {
  const url = `${FIGMA_API_BASE}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'X-Figma-Token': FIGMA_API_KEY,
      ...options.headers,
    },
  });

  const rateLimitInfo = parseRateLimitInfo(response);

  if (response.status === 429) {
    const error = new Error('Figma API Rate Limit Exceeded');
    error.status = 429;
    error.rateLimitInfo = rateLimitInfo;
    throw error;
  }

  if (!response.ok) {
    const errorText = await response.text();
    const error = new Error(`Figma API Error: ${errorText}`);
    error.status = response.status;
    error.rateLimitInfo = rateLimitInfo;
    throw error;
  }

  return {
    data: await response.json(),
    rateLimitInfo,
  };
}

/**
 * Get file nodes from Figma
 */
async function getFileNodes(fileKey, nodeIds, depth = 1) {
  const ids = Array.isArray(nodeIds) ? nodeIds.join(',') : nodeIds;
  return figmaRequest(`/files/${fileKey}/nodes?ids=${ids}&depth=${depth}`);
}

/**
 * Get file data from Figma
 */
async function getFile(fileKey) {
  return figmaRequest(`/files/${fileKey}`);
}

/**
 * Format rate limit info for display
 */
function formatRateLimitInfo(rateLimitInfo) {
  if (!rateLimitInfo.retryAfter) {
    return 'No rate limit information available';
  }

  const parts = [];
  
  if (rateLimitInfo.retryTime) {
    parts.push(`Retry at: ${rateLimitInfo.retryTime.toLocaleString()}`);
  }
  
  if (rateLimitInfo.retryAfterHours) {
    parts.push(`Wait time: ~${rateLimitInfo.retryAfterHours} hours`);
  } else if (rateLimitInfo.retryAfterMinutes) {
    parts.push(`Wait time: ~${rateLimitInfo.retryAfterMinutes} minutes`);
  }
  
  if (rateLimitInfo.rateLimitType) {
    parts.push(`Limit type: ${rateLimitInfo.rateLimitType}`);
  }
  
  if (rateLimitInfo.upgradeLink) {
    parts.push(`Upgrade: ${rateLimitInfo.upgradeLink}`);
  }

  return parts.join(' | ');
}

module.exports = {
  figmaRequest,
  getFileNodes,
  getFile,
  parseRateLimitInfo,
  formatRateLimitInfo,
  FIGMA_API_KEY,
};

