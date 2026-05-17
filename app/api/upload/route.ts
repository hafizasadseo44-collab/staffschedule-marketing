// Trigger rebuild for uuid fix
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path, { join } from 'path';
import { existsSync } from 'fs';
import { getSession } from '@/lib/auth';
 
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const ext = file.name.split('.').pop();
    const filename = `${crypto.randomUUID()}.${ext}`;
    const relativePath = `/uploads/${filename}`;

    // Resolve the real project root directory in Hostinger standalone mode
    let projectRoot = process.cwd();
    if (projectRoot.endsWith('standalone')) {
      projectRoot = join(projectRoot, '..', '..');
    } else if (projectRoot.includes('.next' + path.sep + 'standalone')) {
      projectRoot = projectRoot.split('.next' + path.sep + 'standalone')[0];
    } else if (projectRoot.includes('.next/standalone')) {
      projectRoot = projectRoot.split('.next/standalone')[0];
    }

    // Try multiple possible upload directories relative to the real project root
    const possibleDirs = [
      join(projectRoot, 'public', 'uploads'),
      join(projectRoot, '.next', 'static', 'uploads'),
      join(projectRoot, 'uploads'),
    ];

    let uploadDir = possibleDirs[0];
    
    // Ensure the uploads directory exists
    try {
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
      }
    } catch (mkdirErr: any) {
      console.warn('[Upload] Could not create primary dir:', mkdirErr.message);
      // Try fallback directories
      for (const dir of possibleDirs.slice(1)) {
        try {
          if (!existsSync(dir)) {
            await mkdir(dir, { recursive: true });
          }
          uploadDir = dir;
          break;
        } catch (e) {
          continue;
        }
      }
    }

    const absolutePath = join(uploadDir, filename);
    
    try {
      await writeFile(absolutePath, buffer);
      console.log('[Upload] File written successfully to:', absolutePath);
    } catch (writeErr: any) {
      console.error('[Upload] writeFile failed:', writeErr.message);
      // If filesystem write fails entirely, return a helpful error
      return NextResponse.json({ 
        error: 'Upload failed: Server filesystem is read-only. Use an external image URL instead.',
        details: writeErr.message
      }, { status: 500 });
    }

    return NextResponse.json({ url: relativePath });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed: ' + (error.message || 'Unknown error') }, { status: 500 });
  }
}
