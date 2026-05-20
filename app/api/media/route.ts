import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { storage } from '@/lib/storage';
import { ensureDatabase } from '@/lib/db-init';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    await ensureDatabase();
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const assets = await db.mediaAsset.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(assets);
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch media assets' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureDatabase();
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const formData = await request.formData();
    const file = formData.get('file') as File;
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Use the abstraction (local or S3)
    const url = await storage.upload(buffer, file.name, file.type);

    const asset = await db.mediaAsset.create({
      data: {
        url,
        filename: file.name,
        mimeType: file.type,
        size: file.size,
        uploaderId: session.userId || null
      }
    });

    return NextResponse.json(asset);
  } catch (error: any) {
    console.error("Media Upload Error:", error);
    return NextResponse.json({ error: 'Upload failed: ' + error.message }, { status: 500 });
  }
}
