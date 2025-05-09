# AI Summarizer - README

### Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Installation](#installation)
5. [Usage](#usage)
6. [API Integration](#api-integration)
7. [Authentication](#authentication)
8. [Token Limits, API Call Limitations, and Error Handling](#token-limits-api-call-limitations-and-error-handling)
9. [Contributing](#contributing)
10. [License](#license)

---

### Project Overview

The **AI Summarizer** is a full-stack web application designed to provide text summarization functionality. The app uses the **Cohere API** to generate concise summaries of long texts. Additionally, it supports user authentication via **Firebase Authentication** for a personalized experience. Users can sign up, log in, and manage their accounts.

---

### Features

- **Text Summarization:** Input long texts and the AI summarizer will generate concise summaries using **Cohere API**.
- **User Authentication:** Firebase Authentication supports:
  - Google login
  - Email/password login with email verification
  - Password reset functionality
- **Responsive Interface:** Built using **React (Vite)** and styled with **TailwindCSS** (or another CSS framework).
- **Future Updates:** Multilingual support and advanced features will be added in future releases.

---

### Tech Stack

- **Frontend:**

  - React (Vite)
  - Firebase Authentication
  - TailwindCSS (or your preferred styling framework)

- **Backend:**
  - Node.js
  - Cohere API (for text summarization)

---

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ai-summarizer.git
cd ai-summarizer
```

2. **Frontend Setup (React):**

   Navigate to the frontend directory and install dependencies:

   ```bash
   cd frontend
   npm install
   ```

3. **Backend Setup (Node.js):**

   Navigate to the backend directory and install dependencies:

   ```bash
   cd backend
   npm install
   ```

4. **Environment Variables:**

   Create a `.env` file in the backend directories and add the necessary environment variables:

   - **Backend (.env):**
     - `COHERE_API_KEY`

5. **Start the application:**

   - Run the frontend:

   ```bash
   npm run dev
   ```

   - Run the backend:

   ```bash
   node index.js
   ```

---

### Usage

Once the application is set up and running:

1. **Sign Up / Log In:** Use Firebase Authentication to create an account or log in.
2. **Summarize Text:** Input a long text and click "Summarize" to generate a concise summary.
3. **Password Management:** If you forget your password, use the "Forgot Password" feature to reset it.

---

### API Integration

The AI Summarizer uses the **Cohere API** for text summarization. You'll need to sign up at [Cohere](https://cohere.ai/) to get an API key and include it in the `.env` file under the variable `COHERE_API_KEY`.

---

### Authentication

Firebase Authentication is used to manage user authentication. The application supports:

- **Google Login:** Allows users to sign in via their Google accounts.
- **Email/Password Signup:** Users can sign up with an email and password. Email verification is required for account activation.
- **Password Reset:** Users can reset their password using their email address.

---

### Token Limits, API Call Limitations, and Error Handling

#### **Token Limits:**

- **Cohere API:** The Cohere API has token limits for each API call. A token can represent a word or part of a word, and the total number of tokens per request may vary. Generally, the token limit for each API call is up to **8,000 tokens** (depending on the Cohere plan you are using). Ensure your input text does not exceed the limit, as it may cause errors or result in incomplete summaries.

  **Handling Token Limits:**

  - If the input text exceeds the token limit, the application will display an error message indicating that the text is too long. Users can then shorten the text or split it into smaller parts for summarization.

#### **API Call Limitations:**

- **Cohere API Call Limits:** The number of API calls that can be made per minute, hour, or day may be limited based on your Cohere plan. Ensure you have a valid API key and sufficient quota for your desired usage.

  **Handling API Call Limits:**

  - If the API call limit is exceeded, the application will prompt the user with an error message stating that the limit has been reached. In this case, users should wait for the limit to reset before making another request.

#### **Error Handling for User Input:**

- **Invalid Input:** If the user enters an invalid or empty text for summarization, the application will display an error message asking the user to provide valid text.
- **API Errors:** If the Cohere API fails or returns an error (e.g., token limit exceeded, invalid API key), the application will handle the error gracefully and display a user-friendly message indicating the issue (e.g., "There was an error with the summarization request, please try again later").
- **Authentication Errors:** If there is an issue with user authentication (e.g., invalid login credentials, token expiration), users will be redirected to the login page and informed of the error.

---

### Contributing

We welcome contributions to the AI Summarizer project. To contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Open a pull request with a description of the changes.

---

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
