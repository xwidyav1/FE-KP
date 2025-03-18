import axios from 'axios';

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/-+/g, '-') // Replace multiple dashes with single dash
    .trim(); // Remove whitespace from start and end
};
const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day} ${month} ${year}, ${hours}:${minutes}`;
};
export async function fetchPosts() {
  try {
    const response = await axios.get('http://localhost:8000/berita');
    const postsWithSlug = response.data.map(post => ({
      ...post,
      slug: generateSlug(post.title),
      updated_at: formatDateTime(post.updated_at)
    }));
    console.log('Data fetched successfully:', postsWithSlug);
    return postsWithSlug;
  } catch (err) {
    console.error('Error fetching data:', err.message);
    throw err;
  }
}