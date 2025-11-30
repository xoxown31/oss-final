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

This project uses **Netlify CLI** to run the frontend and serverless functions together in a local development environment that closely mirrors production.

### Prerequisites

- Node.js and npm (or yarn).
- **Netlify CLI:** You'll need to install this globally.
- A `mockapi.io` account with two resources: `users` and `readingRecords`.
- A Naver Developers account with API credentials for the Book Search API.

### 1. Installation

1.  **Clone the repository:**
    ```sh
    git clone <your-repository-url>
    cd <repository-folder>
    ```

2.  **Install project dependencies:**
    ```sh
    npm install
    ```

3.  **Install and configure the Netlify CLI:**
    ```sh
    # Install the CLI globally
    npm install -g netlify-cli

    # Log in to your Netlify account
    netlify login
    ```

### 2. Environment Variables

This project requires API keys to function. They are managed differently for local development and the live deployed site.

#### For Local Development

1.  Create a file named `.env` in the root of the project.
2.  Add your API keys to this file. **Note:** The `REACT_APP_` prefix is no longer used.

    ```
    # .env file
    NAVER_CLIENT_ID=your_local_naver_client_id
    NAVER_CLIENT_SECRET=your_local_naver_client_secret
    ```
    The `.env` file is listed in `.gitignore` and will not be committed.

#### For Production (Live Site)

Your secret keys must be set in the Netlify UI to be available to the live serverless function.

1.  Go to your project's dashboard on the Netlify website.
2.  Navigate to `Site configuration` > `Build & deploy` > `Environment variables`.
3.  Add two variables:
    - `NAVER_CLIENT_ID`: Your Naver Client ID.
    - `NAVER_CLIENT_SECRET`: Your Naver Client Secret.

### 3. Running the Project Locally

Instead of `npm start`, use the `netlify dev` command. This will start the React app and run your serverless functions at the same time.

```sh
netlify dev
```

The application will open at a local URL (e.g., `http://localhost:8888`).

### 4. Mock API Setup

Ensure the API functions in `src/api/index.js` point to your correct `mockapi.io` project URL. The `readingRecords` resource needs an `isPublic` (Boolean) field, and the `users` resource needs an `isNewUser` (Boolean) field for all features to work correctly.

---
This project was built to fulfill the requirements of the 2025-2 Open Source Studio course.