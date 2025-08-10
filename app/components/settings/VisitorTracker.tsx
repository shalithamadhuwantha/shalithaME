'use client'
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Track the visit
    const trackVisit = async () => {
      try {
        // Convert pathname to endpoint name
        let endpoint = pathname;
        if (pathname === '/') {
          endpoint = 'home';
        } else {
          endpoint = pathname.replace('/', '').replace(/\//g, '-') || 'home';
        }

        // console.log('📊 Tracking visit to:', endpoint);

        const response = await fetch('/api/settings/track-visit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            endpoint: endpoint,
            timestamp: new Date().toISOString()
          })
        });

        if (response.ok) {
          const data = await response.json();
          // console.log('✅ Visit tracked:', data);
        } else {
          // console.warn('⚠️ Failed to track visit:', response.status);
        }
      } catch (error) {
        // console.error('❌ Tracking error:', error);
      }
    };

    // Small delay to ensure page is loaded
    const timer = setTimeout(trackVisit, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  // This component doesn't render anything
  return null;
}
