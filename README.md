# stunote

Stunote is a study platform for Swedish university students. It brings course material and a second-hand textbook marketplace together in one web app. AI-generated quizzes are in progress.

Awarded the Chalmers Mastercard Scholarship.

## Features

- **Course library**: search courses by name or course code. Results can be filtered by the student's school, programme and year. Students can subscribe to and favourite courses.
- **Study material**: each course has documents such as old exams and solutions, lecture material, notes, summaries, assignments and formula collections. Documents open as PDFs in the browser and can be filtered by type or saved as favourites. Only student ambassadors can upload them.
- **StuMarket**: buy and sell used textbooks. A listing has a photo, a price in SEK, condition, city, delivery method, school and contact details. Listings can be searched, filtered and sorted by date or price.
- **Accounts and roles**: Appwrite auth with email/password, Google and LinkedIn sign-in, email verification and password reset. Profiles hold the student's school and programme, and phone numbers can be verified. Admin, premium and ambassador roles are stored as Appwrite user labels.
- **Premium subscriptions**: Stripe Embedded Checkout with monthly, term and yearly plans and a 7-day free trial. Some courses are marked premium and are locked for free accounts.
- **AI quiz generation (work in progress)**: an API route reads an uploaded PDF and has GPT-4, through LangChain, write multiple-choice questions about it. The app does not link to it yet.

## Tech stack

Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Radix UI, Appwrite (auth, database, storage), Stripe, LangChain with OpenAI, Vercel Analytics.

## Getting started

### Prerequisites

- Node.js 18.17 or later, and npm
- An [Appwrite](https://appwrite.io) project. File URLs point to Appwrite Cloud (`cloud.appwrite.io`). The database collections and storage buckets are not defined in this repo, so you have to create them yourself.
- A Stripe account, for subscriptions
- An OpenAI API key, for quiz generation

### Install

```bash
git clone https://github.com/SimonC03/stunote.git
cd stunote
npm install
```

### Environment variables

Create a `.env.local` file in the project root and set these variables:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_APPWRITE_ENDPOINT` | Appwrite API endpoint |
| `NEXT_PUBLIC_APPWRITE_PROJECT_ID` | Appwrite project ID |
| `NEXT_PUBLIC_APPWRITE_API_KEY` | Appwrite server API key, used server-side to set user labels |
| `NEXT_PUBLIC_APPWRITE_VERIFICATION_URL` | Link target for verification emails |
| `NEXT_PUBLIC_APPWRITE_DATABASE_ID` | Appwrite database ID |
| `NEXT_PUBLIC_APPWRITE_<NAME>_COLLECTION_ID` | One per collection: `USERS`, `COURSES`, `DOCUMENTS`, `SUBSCRIPTIONS`, `BOOKADS`, `PAYMENTS`, `APPLICATIONS`, `MESSAGES`, `QUIZES`, `QUESTIONS`, `ANSWERS` |
| `NEXT_PUBLIC_APPWRITE_STORAGE_ID` | Storage bucket for course documents |
| `NEXT_PUBLIC_APPWRITE_USERICON_ID` | Storage bucket for profile pictures (upload not wired up yet) |
| `NEXT_PUBLIC_APPWRITE_MARKETMEDIA_ID` | Storage bucket for StuMarket photos |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `OPENAI_API_KEY` | OpenAI API key |

### Run

```bash
npm run dev     # development server at http://localhost:3000
npm run build   # production build
npm start       # serve the production build
npm run lint    # ESLint
```

## Project structure

```
app/
  (auth)/       landing page, sign-in, sign-up, password reset
  (root)/       signed-in pages: home, explore, course, stumarket, upload, profile, subscription
  api/          route handlers: Stripe checkout, quiz generation, user roles
components/     UI components, route guards, Stripe checkout, PDF viewers
constants/      navigation and school/programme/course data
lib/            Appwrite client and data access, payments, quiz helpers
```
