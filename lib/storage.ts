import { writeFile, unlink } from 'fs/promises';
import path from 'path';

export interface StorageProvider {
  upload(file: Buffer, filename: string, mimeType: string): Promise<string>;
  delete(url: string): Promise<void>;
}

// Local Storage Implementation
export class LocalStorageProvider implements StorageProvider {
  private uploadDir = path.join(process.cwd(), 'public', 'uploads');

  async upload(file: Buffer, filename: string, mimeType: string): Promise<string> {
    const timestamp = Date.now();
    const safeFilename = filename.replace(/[^a-zA-Z0-9.\-_]/g, '');
    const uniqueFilename = `${timestamp}-${safeFilename}`;
    const filePath = path.join(this.uploadDir, uniqueFilename);
    
    // In a real environment, ensure dir exists first.
    // For now we'll write and assume public/uploads exists (create it in setup if needed)
    try {
      await writeFile(filePath, file);
    } catch (e) {
      // If dir doesn't exist, you'd handle creating it.
      const fs = require('fs');
      if (!fs.existsSync(this.uploadDir)) {
        fs.mkdirSync(this.uploadDir, { recursive: true });
      }
      await writeFile(filePath, file);
    }
    
    return `/uploads/${uniqueFilename}`;
  }

  async delete(url: string): Promise<void> {
    if (!url.startsWith('/uploads/')) return;
    const filename = url.replace('/uploads/', '');
    const filePath = path.join(this.uploadDir, filename);
    try {
      await unlink(filePath);
    } catch (e) {
      console.error(`Failed to delete local file: ${filePath}`, e);
    }
  }
}

// Future implementations (S3, Cloudinary) can be swapped here
export const storage: StorageProvider = new LocalStorageProvider();
