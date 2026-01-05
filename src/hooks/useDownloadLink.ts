import { useState, useEffect } from 'react';

/**
 * Hook to determine the correct download link based on the user's OS.
 * Defaults to Play Store link for Android and other non-iOS devices.
 * Returns App Store link for iOS devices.
 * 
 * @param playStoreUrl - The URL for the Google Play Store
 * @param appStoreUrl - The URL for the Apple App Store
 * @returns The appropriate download URL
 */
const useDownloadLink = (playStoreUrl: string, appStoreUrl: string) => {
    const [downloadUrl, setDownloadUrl] = useState(playStoreUrl);

    useEffect(() => {
        // Check if window and navigator are available (client-side)
        if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
            const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

            // Simple iOS detection
            if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
                setDownloadUrl(appStoreUrl);
            } else {
                setDownloadUrl(playStoreUrl);
            }
        }
    }, [playStoreUrl, appStoreUrl]);

    return downloadUrl;
};

export default useDownloadLink;
