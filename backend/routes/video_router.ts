import fs from 'fs';
import path from 'path';
import { logger } from '../utils/logger';

let fileStream: fs.WriteStream | null = null;

interface DataChunk {
  chunk: Blob;
  isLast: boolean;
}
const storageDir = path.join(__dirname, '..', '..', 'streams');

function writeVideoStream({ chunk, isLast }: DataChunk) {
  if (!fileStream) {
    const fileName = `stream-${Date.now()}.mp4`;
    fileStream = fs.createWriteStream(path.join(storageDir, fileName), { encoding: 'binary' });
  }

  logger.log('writing video chunk...');
  fileStream.write(chunk);

  if (isLast) {
    logger.log('stopping stream recording...');
    fileStream.end();
  }
}

export { writeVideoStream };
