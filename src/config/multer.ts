import multer, { StorageEngine } from 'multer';
import path from 'path';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

// Tipagem para os callbacks do multer
type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

// Define o local de armazenamento e o nome do arquivo
const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback): void => {
    cb(null, path.resolve(__dirname, '..', '..', 'uploads'));
  },
  filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback): void => {
    const fileExt = path.extname(file.originalname);
    const fileName = `${uuidv4()}${fileExt}`;
    cb(null, fileName);
  }
});

export const upload = multer({ storage });