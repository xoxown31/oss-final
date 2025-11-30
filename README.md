# Bookend: Your Personal Reading Journey

**Bookend** is a modern, feature-rich social reading tracker application built with React. It allows users to track their reading progress, share their thoughts with a community, and discover what's new and trending in the world of literature.

![Bookend Screenshot Placeholder](https://via.placeholder.com/800x450.png?text=App+Screenshot+Here)
*(A placeholder for your app's screenshot)*

---

## ✨ Key Features

- **📖 User Authentication:** Secure login and registration system with client-side validation.
- **🏠 Personalized Dashboard:** An "at a glance" view of your reading world, including:
  - Dynamic charts visualizing your reading activity over the past months.
  - Statistic cards for total books read and your average rating.
  - A searchable and sortable list of all your personal records.
- **📚 Full CRUD for Records:** Easily Create, Read, Update, and Delete your reading records.
- **🔍 Naver Book Search:** Seamlessly search for books using the Naver API when adding a new record. The system also prevents you from adding the same book twice.
- **💖 Community Feed:** Optionally share your reading records with the community and see what others are reading on a beautifully designed feed.
- **🏆 Rankings Page:** Discover new books through dynamic leaderboards:
  - **Hot:** See what's currently trending based on recent reviews.
  - **Most Read:** Find the all-time most popular books in the community.
  - **Top Rated:** See the highest-rated books, calculated with a fair, weighted ranking system (Bayesian average).
- **🚀 Modern UX/UI:**
  - Fully responsive design with a stunning, modern aesthetic.
  - A persistent sidebar for easy navigation.
  - Smooth page transitions and subtle micro-interactions powered by Framer Motion.
  - A welcome tutorial for new users.
- **🛠️ Developer Tools:** Includes a built-in tool to generate high-quality, curated demo data for easy testing and demonstration.


## 💻 Tech Stack

- **Frontend:** React, React Router
- **Styling:** styled-components
- **Animations:** Framer Motion
- **Data Visualization:** Recharts
- **API Communication:** Axios
- **Code Quality:** ESLint
- **Icons:** React Icons
- **Intersection Observer:** React Intersection Observer (for scroll animations)

## 🚀 Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

- Node.js and npm (or yarn) installed.
- A `mockapi.io` account with two resources: `users` and `readingRecords`.
- A Naver Developers account with API credentials for the Book Search API.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone <your-repository-url>
    cd <repository-folder>
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env.local` in the root of your project and add your Naver API credentials:
    ```
    REACT_APP_NAVER_CLIENT_ID=your_naver_client_id
    REACT_APP_NAVER_CLIENT_SECRET=your_naver_client_secret
    ```
    Replace the placeholder values with your actual keys.

4.  **Verify mockapi.io setup:**
    Ensure the API functions in `src/api/index.js` point to your correct `mockapi.io` project URL. The `readingRecords` resource needs an `isPublic` (Boolean) field, and the `users` resource needs an `isNewUser` (Boolean) field.

5.  **Run the development server:**
    ```sh
    npm start
    ```
    The application will open at `http://localhost:3000`.

---
This project was built to fulfill the requirements of the 2025-2 Open Source Studio course.