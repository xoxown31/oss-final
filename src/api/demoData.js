
import { register, createRecord } from './index';

// --- Sample Data ---
const sampleUsers = [
  { username: 'alice', password: 'password123' },
  { username: 'bob', password: 'password123' },
  { username: 'charlie', password: 'password123' },
];

const sampleBooks = [
  { title: 'Dune', author: 'Frank Herbert', coverImage: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1555447414l/44767458.jpg' },
  { title: 'The Three-Body Problem', author: 'Cixin Liu', coverImage: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1415428227l/20518872.jpg' },
  { title: 'Project Hail Mary', author: 'Andy Weir', coverImage: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1597695864l/54493401.jpg' },
  { title: '1984', author: 'George Orwell', coverImage: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1532714506l/40961427.jpg' },
  { title: 'Brave New World', author: 'Aldous Huxley', coverImage: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1575509280l/5129.jpg' },
  { title: 'Fahrenheit 451', author: 'Ray Bradbury', coverImage: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1383718290l/13079982.jpg' },
];

const sampleNotes = [
  "An absolute classic, a must-read.",
  "Interesting concepts, but the pacing was a bit slow.",
  "Couldn't put it down! Highly recommended.",
  "The ending was a complete surprise.",
  "A thought-provoking story that will stay with me.",
  "The characters felt very real and relatable.",
];

// --- Generator Logic ---

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export const generateDemoData = async () => {
  try {
    console.log('--- Starting Demo Data Generation ---');

    // 1. Create users
    const createdUsers = await Promise.all(sampleUsers.map(u => register(u.username, u.password)));
    console.log(`${createdUsers.length} users created.`);

    // 2. Create records
    const recordPromises = [];
    for (let i = 0; i < 20; i++) {
      const user = getRandom(createdUsers);
      const book = getRandom(sampleBooks);
      
      // Ensure some books get multiple reviews for ranking
      const bookForReview = i < sampleBooks.length ? sampleBooks[i] : getRandom(sampleBooks);

      const record = {
        userId: user.id,
        username: user.username,
        title: bookForReview.title,
        author: bookForReview.author,
        coverImage: bookForReview.coverImage,
        publisher: 'Demo Publisher',
        userRating: Math.floor(Math.random() * 5) + 1, // 1-5 stars
        notes: getRandom(sampleNotes),
        startDate: getRandomDate(new Date(2023, 0, 1), new Date()).toISOString().split('T')[0],
        endDate: getRandomDate(new Date(), new Date(2024, 11, 31)).toISOString().split('T')[0],
        isPublic: Math.random() > 0.3, // 70% chance of being public
      };
      recordPromises.push(createRecord(record));
    }

    await Promise.all(recordPromises);
    console.log(`${recordPromises.length} records created.`);
    console.log('--- Demo Data Generation Complete ---');
    return { success: true, message: `${createdUsers.length} users and ${recordPromises.length} records created.` };

  } catch (error) {
    console.error('Failed to generate demo data:', error);
    return { success: false, message: 'Failed to generate demo data. See console for details.' };
  }
};
