
# FullNextAuth

This repository demonstrates how to set up and use Next.js with dynamic routing, authentication, and database integration, including examples of login functionality, password reset, and user verification.

## Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Technologies Used](#technologies-used)
* [Folder Structure](#folder-structure)
* [Installation](#installation)
* [Usage](#usage)
* [Dynamic Routes](#dynamic-routes)
* [Middleware and Helpers](#middleware-and-helpers)
* [Database Integration](#database-integration)
* [Error Handling](#error-handling)
* [Future Enhancements](#future-enhancements)
* [License](#license)

---

## Overview

This project serves as a foundational example of dynamic routing, authentication, and parameter handling in Next.js 15. It focuses on the following aspects:

* Creating dynamic routes with `[id]`.
* Implementing authentication features like login, signup, password reset, and user verification.
* Middleware and helper functions to enhance app functionality.
* Integration with MongoDB for user data storage.
* Email notifications for password resets and user verification using Nodemailer.

## Features

* **Dynamic Routing:** Handles dynamic routes like `/profile/[id]`.
* **Authentication:** Login and signup pages with secure user authentication.
* **Password Reset:** Email-based password reset functionality.
* **User Verification:** Email-based user verification system.
* **Middleware:** Protect routes and handle authentication logic.
* **Database Integration:** MongoDB for storing user information securely.
* **TypeScript Support:** Strongly typed route parameters for enhanced developer experience.
* **Error Handling:** Graceful handling of missing or invalid parameters.
* **Responsive Design:** Fully responsive and styled with TailwindCSS.

## Technologies Used

![Technologies](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) ![Nodemailer](https://img.shields.io/badge/Nodemailer-yellow?style=for-the-badge&logo=maildotru&logoColor=white)

## Folder Structure

```
├── app
│   ├── profile
│   │   └── [id]
│   │       └── page.tsx
│   ├── login
│   │   └── page.tsx
│   ├── signup
│   │   └── page.tsx
│   ├── verify-email
│   │   └── page.tsx
│   ├── forgot-password
│   │   └── page.tsx
│   ├── middleware.ts
├── helpers
│   ├── auth.ts
│   ├── db.ts
│   └── email.ts
├── styles
├── public
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/fullnextauth.git
   ```
2. Navigate to the project directory:
   ```bash
   cd fullnextauth
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   Create a `.env.local` file and add the following:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   EMAIL_HOST=your_email_smtp_server
   EMAIL_PORT=your_email_smtp_port
   EMAIL_USER=your_email_user
   EMAIL_PASSWORD=your_email_password
   JWT_SECRET=your_jwt_secret
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Open your browser and navigate to `http://localhost:3000`.

## Usage

### Login

Navigate to `/login` to access the login page. Enter your credentials to log in.

### Signup

Navigate to `/signup` to create a new account. A verification email will be sent to your registered email address.

### Verify Email

After signing up, check your email for a verification link. Clicking the link will verify your account.

### Forgot Password

If you forgot your password, navigate to `/forgot-password`. Enter your email to receive a password reset link.

### Password Reset

Use the link sent to your email to reset your password securely.

### View Profile

To view a user profile, navigate to `/profile/[id]`, replacing `[id]` with the desired user ID. For example:

```
http://localhost:3000/profile/123
```

This will display the profile page for the user with ID `123`.

## Dynamic Routes

The dynamic route is implemented in the `app/profile/[id]/page.tsx` file. Below is an overview of the component:

```tsx
import { notFound } from 'next/navigation';

interface UserProfileProps {
  params: {
    id: string;
  };
}

export default function UserProfile({ params }: UserProfileProps) {
  if (!params?.id) {
    notFound();
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-5xl font-bold tracking-wide">Profile</h1>
      <hr className="w-1/2 my-6 border-gray-300" />
      <p className="text-4xl font-semibold tracking-wide">
        Profile page
        <span className="bg-orange-500 text-black rounded-full px-4 py-2 ml-4">
          {params.id}
        </span>
      </p>
    </div>
  );
}
```

### Key Features of the Component:

* Accepts `params` containing `id`.
* Validates that `id` is present; otherwise, triggers the `notFound()` function.

## Middleware and Helpers

* **Middleware:** Protects sensitive routes by verifying authentication tokens or session data.
* **Helpers:**
  * `auth.ts`: Contains authentication logic.
  * `db.ts`: Manages database connections and queries.
  * `email.ts`: Handles sending emails for password reset and verification using Nodemailer.

## Database Integration

This project uses MongoDB as the database for storing user information. Ensure you set up the connection string in the `.env.local` file.

## Error Handling

If a user navigates to a route without an ID or with an invalid ID, the `notFound()` function from `next/navigation` ensures the user sees a 404 error page.

For authentication errors, users are redirected to the login page with an appropriate error message.

## Future Enhancements

* Add OAuth authentication with providers like Google and GitHub.
* Implement role-based access control (RBAC).
* Add unit and integration tests for key components.
* Enhance UI with additional features for user management.

## License

This project is licensed under the MIT License. See the [LICENSE]() file for details.

---

Feel free to contribute to this repository by submitting issues or pull requests!
