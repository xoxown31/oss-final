// src/api/demoData.js

import { register, createRecord, updateUser } from './index'; // updateUser 추가

// --- Data from Naver API (provided by user) ---
const naverBookData = [
  { "title": "1984", "link": "https://search.shopping.naver.com/book/catalog/32486053981", "image": "https://shopping-phinf.pstatic.net/main_3248605/32486053981.20230614072451.jpg", "author": "조지 오웰", "discount": "9900", "publisher": "민음사", "pubdate": "20070330", "isbn": "9788937460777", "description": "..." },
  { "title": "Dune (The Best of the SF Masterworks)", "link": "https://search.shopping.naver.com/book/catalog/36049595625", "image": "https://shopping-phinf.pstatic.net/main_3604959/36049595625.20221123202413.jpg", "author": "Frank Herbert", "discount": "34120", "publisher": "Orion Publishing Co", "pubdate": "20221208", "isbn": "9781399611176", "description": "..." },
  { "title": "BRAVE NEW WORLD", "link": "https://search.shopping.naver.com/book/catalog/54395168774", "image": "https://shopping-phinf.pstatic.net/main_5439516/54395168774.20250424120054.jpg", "author": "Aldous Huxley", "discount": "35360", "publisher": "Repro India Limited", "pubdate": "20241212", "isbn": "9789361449345", "description": "..." },
  { "title": "The Three-Body Problem (the epic 10-volume graphic novel boxset)", "link": "https://search.shopping.naver.com/book/catalog/51958392954", "image": "https://shopping-phinf.pstatic.net/main_5195839/51958392954.20250507071111.jpg", "author": "Cixin Liu", "discount": "200900", "publisher": "Bloomsbury Publishing PLC", "pubdate": "20241107", "isbn": "9781035912421", "description": "..." },
  { "title": "Fahrenheit 451 (A Novel)", "link": "https://search.shopping.naver.com/book/catalog/32464888744", "image": "https://shopping-phinf.pstatic.net/main_3246488/32464888744.20221228074447.jpg", "author": "레이 브래드버리", "discount": "6500", "publisher": "Simon & Schuster", "pubdate": "20120501", "isbn": "9781451690316", "description": "..." },
  { "title": "Project Hail Mary (영화 『프로젝트 헤일메리』 원작 소설)", "link": "https://search.shopping.naver.com/book/catalog/34830696674", "image": "https://shopping-phinf.pstatic.net/main_3483069/34830696674.20250610084934.jpg", "author": "앤디 위어", "discount": "9900", "publisher": "Ballantine Books", "pubdate": "20221004", "isbn": "9780593135228", "description": "..." }
];


// --- Curated Persona & Review Data ---
const personas = {
  'alice': { 
    username: 'alice', 
    password: 'password123', 
    isNewUser: false, 
    profileImageUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Alice' 
  },
  'bob': { 
    username: 'bob', 
    password: 'password123', 
    isNewUser: false, 
    profileImageUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Bob' 
  },
  'charlie': { 
    username: 'charlie', 
    password: 'password123', 
    isNewUser: true, 
    profileImageUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Charlie' 
  },
};

const curatedReviews = [
  { user: 'alice', titleKey: 'Dune', rating: 5, notes: "A masterpiece of world-building. The political intrigue is just as compelling as the sci-fi elements.", isPublic: true },
  { user: 'alice', titleKey: 'The Three-Body Problem', rating: 5, notes: "Mind-bending science fiction that completely changed my perspective on the genre.", isPublic: true },
  { user: 'alice', titleKey: 'Project Hail Mary', rating: 4, notes: "Fun, witty, and incredibly smart. A great read!", isPublic: false },

  { user: 'bob', titleKey: '1984', rating: 5, notes: "More relevant today than ever. A chilling and essential read.", isPublic: true },
  { user: 'bob', titleKey: 'Brave New World', rating: 4, notes: "A fascinating dystopia, though the characters felt a bit distant. The concepts are brilliant.", isPublic: true },
  { user: 'bob', titleKey: 'Dune', rating: 4, notes: "An epic, but the pacing drags in the middle. Still, a monumental work.", isPublic: true },
  { user: 'bob', titleKey: 'Fahrenheit 451', rating: 3, notes: "A powerful message, but the plot felt a little thin.", isPublic: true },
  
  { user: 'charlie', titleKey: 'Project Hail Mary', rating: 5, notes: "My first book in a while, and it was amazing! Can't wait to read more.", isPublic: true },
];


// --- Generator Logic ---
export const generateDemoData = async () => {
  try {
    console.log('--- Starting Curated Demo Data Generation using Naver API data ---');

    // 1. Create users from personas
    const userCreationPromises = Object.values(personas).map(p => register(p.username, p.password, p.isNewUser));
    const createdUsers = await Promise.all(userCreationPromises);
    console.log(`${createdUsers.length} users created.`);
    
    const userUpdatePromises = createdUsers.map(user => {
        const persona = Object.values(personas).find(p => p.username === user.username);
        if (persona && persona.profileImageUrl) {
            return updateUser(user.id, { profileImageUrl: persona.profileImageUrl });
        }
        return Promise.resolve(user);
    });
    await Promise.all(userUpdatePromises);
    console.log('User profiles updated with images.');

    const useridMap = createdUsers.reduce((acc, user) => {
      acc[user.username] = user.id;
      return acc;
    }, {});

    // 2. Create curated records using Naver data
    const recordPromises = curatedReviews.map((review, index) => {
      // Find the corresponding book data from Naver API results
      const bookData = naverBookData.find(b => b.title.includes(review.titleKey));
      if (!bookData) return null;

      const fullRecord = {
        userid: useridMap[review.user],
        username: review.user,
        userProfileImageUrl: personas[review.user].profileImageUrl,
        title: bookData.title,
        author: bookData.author,
        coverImage: bookData.image,
        publisher: bookData.publisher,
        isbn: bookData.isbn,
        userRating: review.rating,
        notes: review.notes,
        startDate: `2024-0${Math.floor(index/2) + 1}-01`,
        endDate: `2024-0${Math.floor(index/2) + 1}-15`,
        isPublic: review.isPublic,
      };
      return createRecord(fullRecord);
    }).filter(p => p !== null); // Filter out nulls if book not found

    await Promise.all(recordPromises);
    console.log(`${recordPromises.length} curated records created.`);
    console.log('--- Demo Data Generation Complete ---');
    return { success: true, message: `${createdUsers.length} users and ${recordPromises.length} records created.` };

  } catch (error) {
    console.error('Failed to generate demo data:', error);
    return { success: false, message: 'Failed to generate demo data. See console for details.' };
  }
};