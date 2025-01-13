import axios from 'axios';

export async function fetchPosts() {
  try {
    const response = await axios.get('http://localhost:8000/berita'); // Ganti dengan endpoint backend Anda
    console.log('Data fetched successfully:', response.data);
    return response.data; // Mengembalikan data yang di-fetch
  } catch (err) {
    console.error('Error fetching data:', err.message);
    throw err; // Melemparkan error jika ada
  }
}