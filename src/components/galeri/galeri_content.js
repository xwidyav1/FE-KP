import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function fetchPosts() {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/galleries`);
    console.log('Data fetched successfully:', response.data);
    return response.data; // Mengembalikan data yang di-fetch
  } catch (err) {
    console.error('Error fetching data:', err.message);
    throw err; // Melemparkan error jika ada
  }
}