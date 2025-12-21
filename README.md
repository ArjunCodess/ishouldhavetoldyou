<p align="center">
  <a href="https://ishouldhavetoldyou.vercel.app" rel="noopener">
 <img width=750px height=394px src="https://ishouldhavetoldyou.vercel.app/og.png" alt="i should have told you. - A Personal Archive"></a>
</p>

<h2 align="center">i should have told you.</h2>

---

<p align="center">
  A personal archive of letters I never had the courage to send.<br />Each sealed box contains words meant for someone special.
</p>

<p align="center">
  <em>This setup can also be used as a template for your own confessions and unsent letters.</em>
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)
- [Content Management](#content_management)
- [Deployment](#deployment)
- [Privacy & Access Control](#privacy)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

This is a personal website I built because I'm leaving school and there are things I could never tell some people. You know those times when you want to tell someone something important, but you just can't bring yourself to say it? That's what these "sealed boxes" are for.

Each box represents someone in my life. Inside it is a letter containing words I couldn't say to them. At the time of my leaving, I'll send them this website and their code and if they want they can read it. Those sealed boxes are my sealed emotions, and when they are opened by that person - they are replaced with the image of an opened box on the home page so for me to know that they opened it.

The letters are written in markdown, so they can be simple or detailed, whatever needed to be said. Apologies, love letters, things I should have said when I had the chance.

You can actually use this as a template for your own confessions. If you've got words you've been holding back, this setup lets you create your own archive of unsent letters. The whole system is designed to be private and respectful.

What I like about it:
- Each letter needs a unique access code, so only the right person can open it
- The design is clean and simple, so the words themselves get the attention
- It works well on any device, from phones to computers
- Easy to update and manage with Sanity CMS

## 🏁 Getting Started

Want to set this up for yourself? Here's what you'll need and how to get it running.

### Prerequisites

- Node.js 18 or later
- pnpm (faster than npm, but you can use npm if you prefer)
- A Sanity account (they have a generous free tier)
- Git for cloning the repository

### Installation Steps

First, grab the code:
```bash
git clone https://github.com/arjuncodess/ishouldhavetoldyou.git
cd ishouldhavetoldyou
```

Install all the dependencies:
```bash
pnpm install
```

Set up a Sanity project at [sanity.io](https://sanity.io) and get your project ID and API tokens.

Create a `.env.local` file with your Sanity credentials:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token_here
SANITY_API_WRITE_TOKEN=your_write_token_here
```

Deploy the content schemas to your Sanity project:
```bash
cd sanity
sanity deploy
cd ..
```

Finally, start the development server:
```bash
pnpm dev
```

Your site will be running at `http://localhost:3000`, and you can access the content editor at `http://localhost:3000/studio`.

## 🎈 How It Works

### For You (The Creator)

Go to `/studio` to access the content management interface.

Create an entry for each person you want to write to. You'll need:
- A simple slug (like "mom" or "old-friend")
- A brief description if you want
- The letter itself, written in markdown

When you're ready, generate access codes for everyone:
```bash
pnpm generate-codes
```

This creates random 8-character codes for each person. Save these somewhere secure because once they're generated, you can't recover them.

At the time of leaving school, send each person the website link and their unique access code. Only they can use their code to open their box.

### For the People You're Writing To

When someone visits your site, they'll see a grid of sealed boxes. They find their name, click on it, and enter the code you gave them.

Once they enter the correct code, their sealed box opens and they can read your letter. There's even a little confetti animation the first time they open it, just to make the moment special. And on the homepage, that person's box changes from a sealed box to an opened box so you know they've read it.

If they come back within 24 hours, they won't need to enter the code again. It works on any device, and the design is clean so the words themselves get the attention.

## 🔧 Content Management

I use Sanity CMS for managing all the content because it's simple and stays out of your way.

The studio gives you a clean interface to write your letters. You can write in markdown, see changes as you type, and even go back to previous versions if you change your mind.

There are two main types of content:
- **People**: Each person gets their own entry with a letter, description, and a unique identifier
- **My Story**: One page that explains why you created this archive

Every person entry includes the letter content, the hashed access code, and a flag that tracks whether they've opened their box yet.

## 🚀 Going Live

This works great on Vercel, but you can deploy it anywhere that supports Next.js.

### Deploying to Vercel

Connect your GitHub repository to Vercel. It will automatically detect this is a Next.js project and set everything up.

Just add your environment variables in the Vercel dashboard:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token
SANITY_API_WRITE_TOKEN=your_write_token
```

You can add a custom domain if you want it to look more personal.

That's it - Vercel handles the rest.

## 🔒 Privacy & Security

This whole thing is built around keeping things private, because these are personal letters.

Each letter gets a randomly generated 8-character code. The codes are hashed using SHA256 before they're stored, so even I can't see what they are. The actual codes are never kept in plain text anywhere.

When someone enters a code, it's validated right in their browser using the same hashing. The codes aren't sent to any server, so they stay private.

Once someone opens their letter, they can come back for 24 hours without entering the code again. After that, they'll need it again.

Important things to know:
- Save the codes somewhere secure when you generate them - you can't get them back later
- Share codes privately, never publicly
- Back up your Sanity content regularly
- You can see which boxes have been opened through the Sanity studio

## ⛏️ Tech Stack

### The Basics
- Next.js 16 with the App Router
- React 19 for the UI
- TypeScript to catch errors early
- Node.js to run everything

### Content Management
- Sanity CMS for storing and editing the letters
- Sanity Studio for the content editing interface

### Design & Interactions
- Tailwind CSS for styling
- Motion library for smooth animations
- Canvas Confetti for that celebratory moment
- React Markdown for rendering the letters nicely

### Development Tools
- pnpm for package management
- ESLint to keep the code clean
- Vercel for hosting and deployment
- Git and GitHub for version control

## ✍️ Who Built This

**Arjun (arjuncodess)** - I'm a 10th grader leaving school, and this is my way of saying the things I couldn't say in person.

The code is open source because sharing builds better things. If you're inspired to create something similar or want to contribute improvements, you're welcome to participate.

## 🎉 Thanks

Thanks to the people who built the tools that made this possible:
- Sanity for the content management system
- Vercel for making deployment so straightforward
- The creators of React, Next.js, and Tailwind CSS
- Everyone who contributes to open source software

This wouldn't exist without the work of so many developers who share their tools freely.

---

<div align="center">

**i should have told you.** - A personal archive

_Built with care for words that needed to be said_

</div>