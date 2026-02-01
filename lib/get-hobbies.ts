
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface HobbyMedia {
    id: string;
    src: string;
    type: 'image';
    alt: string;
}

const HOBBIES_DIR = path.join(process.cwd(), 'public', 'hobbies');

function getFilesRecursively(dir: string, fileList: string[] = []) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            getFilesRecursively(filePath, fileList);
        } else {
            if (/\.(jpg|jpeg|png|webp|gif)$/i.test(file)) {
                fileList.push(filePath);
            }
        }
    });

    return fileList;
}



export function getAllHobbiesMedia(): HobbyMedia[] {
    try {
        if (!fs.existsSync(HOBBIES_DIR)) {
            console.warn('Hobbies directory not found:', HOBBIES_DIR);
            return [];
        }

        const files = getFilesRecursively(HOBBIES_DIR);

        return files.map((filePath) => {
            // Get relative path for src (e.g., /hobbies/cricket/photo.jpg)
            // Ensure we replace properly by calculating relative path from process.cwd() + public
            const publicDir = path.join(process.cwd(), 'public');
            let relativePath = filePath.replace(publicDir, '');

            // Ensure path starts with slash and uses forward slashes (for consistency across OS)
            relativePath = relativePath.split(path.sep).join('/');
            if (!relativePath.startsWith('/')) {
                relativePath = '/' + relativePath;
            }

            // Get folder name for alt text (e.g., cricket -> Cricket)
            const folderName = path.basename(path.dirname(filePath));
            const alt = folderName.charAt(0).toUpperCase() + folderName.slice(1);

            // Generate robust ID using MD5 hash of the full path
            const id = crypto.createHash('md5').update(relativePath).digest('hex').substring(0, 12);

            return {
                id,
                src: relativePath,
                type: 'image',
                alt,
            };
        });
    } catch (error) {
        console.error('Error reading hobbies directory:', error);
        return [];
    }
}
