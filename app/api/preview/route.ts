import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    // If it's a local URL, return a branded fallback
    if (url.includes('localhost') || url.includes('127.0.0.1')) {
      return NextResponse.json({
        title: "StaffSchedule.io Intelligence",
        description: "Experience the future of workforce management with StaffSchedule.io.",
        image: "https://staffschedule.io/hero-master.png",
        isLocal: true
      });
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; StaffScheduleBot/1.0; +https://staffschedule.io)',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) throw new Error('Failed to fetch');

    const html = await response.text();
    
    // Simple regex-based OG tag extraction
    const getMeta = (property: string) => {
      const regex = new RegExp(`<meta[^>]+(?:property|name)=["'](?:og:)?${property}["'][^>]+content=["']([^"']+)["']`, 'i');
      const match = html.match(regex);
      if (match) return match[1];
      
      // Try alternative order
      const regexAlt = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["'](?:og:)?${property}["']`, 'i');
      const matchAlt = html.match(regexAlt);
      return matchAlt ? matchAlt[1] : null;
    };

    const title = getMeta('title') || html.match(/<title>([^<]+)<\/title>/i)?.[1] || 'No Title';
    const description = getMeta('description') || 'No description available.';
    const image = getMeta('image');

    return NextResponse.json({ title, description, image });
  } catch (error) {
    console.error('Preview API Error:', error);
    return NextResponse.json({ 
      title: "Preview Not Available",
      description: "We couldn't load a preview for this link.",
      image: null
    }, { status: 200 }); // Return 200 to handle gracefully on frontend
  }
}
