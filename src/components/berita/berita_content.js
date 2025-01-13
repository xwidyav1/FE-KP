import axios from 'axios';

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/-+/g, '-') // Replace multiple dashes with single dash
    .trim(); // Remove whitespace from start and end
};

export async function fetchPosts() {
  try {
    const response = await axios.get('http://localhost:8000/berita');
    const postsWithSlug = response.data.map(post => ({
      ...post,
      slug: generateSlug(post.title)
    }));
    console.log('Data fetched successfully:', postsWithSlug);
    return postsWithSlug;
  } catch (err) {
    console.error('Error fetching data:', err.message);
    throw err;
  }
}