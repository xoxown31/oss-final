import { register, createRecord } from './index';

// --- Curated Persona & Book Data ---

const personas = {
  'alice': { username: 'alice', password: 'password123', isNewUser: false }, // Sci-Fi Lover
  'bob': { username: 'bob', password: 'password123', isNewUser: false },     // Classics Critic
  'charlie': { username: 'charlie', password: 'password123', isNewUser: true }, // New user for tutorial testing
};

const curatedRecords = [
  // Alice's Sci-Fi Ratings
  { user: 'alice', title: 'Dune', author: 'Frank Herbert', rating: 5, notes: "A masterpiece of world-building. The political intrigue is just as compelling as the sci-fi elements.", isPublic: true },
  { user: 'alice', title: 'The Three-Body Problem', author: 'Cixin Liu', rating: 5, notes: "Mind-bending science fiction that completely changed my perspective on the genre.", isPublic: true },
  { user: 'alice', title: 'Project Hail Mary', author: 'Andy Weir', rating: 4, notes: "Fun, witty, and incredibly smart. A great read!", isPublic: false },

  // Bob's Classics Ratings
  { user: 'bob', title: '1984', author: 'George Orwell', rating: 5, notes: "More relevant today than ever. A chilling and essential read.", isPublic: true },
  { user: 'bob', title: 'Brave New World', author: 'Aldous Huxley', rating: 4, notes: "A fascinating dystopia, though the characters felt a bit distant. The concepts are brilliant.", isPublic: true },
  { user: 'bob', title: 'Dune', author: 'Frank Herbert', rating: 4, notes: "An epic, but the pacing drags in the middle. Still, a monumental work.", isPublic: true }, // Duplicate book for ranking test
  { user: 'bob', title: 'Fahrenheit 451', author: 'Ray Bradbury', rating: 3, notes: "A powerful message, but the plot felt a little thin in comparison to its contemporaries.", isPublic: true },
  
  // Charlie's first steps
  { user: 'charlie', title: 'Project Hail Mary', author: 'Andy Weir', rating: 5, notes: "My first book in a while, and it was amazing! Can't wait to read more.", isPublic: true }, // Duplicate book for ranking test
];

const bookDetails = {
  'Dune': { coverImage: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1555447414l/44767458.jpg', publisher: 'Chilton Books' },
  'The Three-Body Problem': { coverImage: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1415428227l/20518872.jpg', publisher: 'Chongqing Press' },
  'Project Hail Mary': { coverImage: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1597695864l/54493401.jpg', publisher: 'Ballantine Books' },
  '1984': { coverImage: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1532714506l/40961427.jpg', publisher: 'Secker & Warburg' },
  'Brave New World': { coverImage: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1575509280l/5129.jpg', publisher: 'Chatto & Windus' },
  'Fahrenheit 451': { coverImage: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1383718290l/13079982.jpg', publisher: 'Ballantine Books' },
};

// --- Generator Logic ---

export const generateDemoData = async () => {
  try {
    console.log('--- Starting Curated Demo Data Generation ---');

    // 1. Create users from personas
    const userCreationPromises = Object.values(personas).map(p => register(p.username, p.password, p.isNewUser));
    const createdUsers = await Promise.all(userCreationPromises);
    console.log(`${createdUsers.length} users created.`);
    
    // Map usernames to their new IDs
    const userIdMap = createdUsers.reduce((acc, user) => {
      acc[user.username] = user.id;
      return acc;
    }, {});

    // 2. Create curated records
    const recordPromises = curatedRecords.map((record, index) => {
      const fullRecord = {
        userId: userIdMap[record.user],
        username: record.user,
        title: record.title,
        author: record.author,
        coverImage: bookDetails[record.title].coverImage,
        publisher: bookDetails[record.title].publisher,
        userRating: record.rating,
        notes: record.notes,
        startDate: `2024-0${index + 1}-01`,
        endDate: `2024-0${index + 1}-15`,
        isPublic: record.isPublic,
      };
      return createRecord(fullRecord);
    });

    await Promise.all(recordPromises);
    console.log(`${recordPromises.length} curated records created.`);
    console.log('--- Demo Data Generation Complete ---');
    return { success: true, message: `${createdUsers.length} users and ${recordPromises.length} records created.` };

  } catch (error) {
    console.error('Failed to generate demo data:', error);
    return { success: false, message: 'Failed to generate demo data. See console for details.' };
  }
};