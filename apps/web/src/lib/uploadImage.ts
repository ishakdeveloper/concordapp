import { client } from './client';

export async function uploadImage(file: File) {
  const buffer = await file.arrayBuffer();
  //   const response = await client.api.advertisements.upload.post(buffer);
  //   return response;
}
