import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function fetchEvents() {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/kegiatan`);
    if (response.status === 200 && Array.isArray(response.data)) {
      // Pastikan properti 'materi' selalu berupa array
      const processedData = response.data.map(event => ({
        ...event,
        materi: typeof event.materi === 'string' ? JSON.parse(event.materi) : [],
      }));

      console.log('Processed data fetched successfully:', processedData);
      return processedData;
    } else {
      console.warn('Unexpected response format or status:', response);
      return []; // Kembalikan array kosong jika respons tidak sesuai
    }
  } catch (err) {
    console.error('Error fetching data:', {
      message: err.message,
      ...(err.response && {
        status: err.response.status,
        data: err.response.data,
      }),
    });
    throw new Error('Failed to fetch events. Please try again later.');
  }
}
