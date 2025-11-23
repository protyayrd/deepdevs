#!/bin/bash

# Quick script to check Figma API rate limit status
# Usage: ./scripts/check-rate-limit.sh [fileKey] [nodeId]

FILE_KEY="${1:-bQ9Y5QdguSIPN93oIDRc6C}"
NODE_ID="${2:-6690-3208}"

echo ""
echo "🔍 Checking Figma API Rate Limit Status..."
echo "📁 File Key: $FILE_KEY"
echo "🆔 Node ID: $NODE_ID"
echo ""

node scripts/check-figma-rate-limit.js "$FILE_KEY" "$NODE_ID"

