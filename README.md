# LadyAngel • IN – The Female Reference

![App Preview](https://imgix.cosmicjs.com/b306cbe0-3d6e-11f1-a386-4d54a5265133-autopilot-photo-1511795409834-ef04bbd61622-1776768108438.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A classified and community site where independent female advertisers create profiles, list businesses, share bookmarks, post galleries, write blogs, and organize events across Social Dating, Wellness, Casting & Jobs, Women-owned Startups, and Event Organizer categories.

## Features
- 🏠 Dynamic homepage featuring advertisers, listings, events, and blog posts
- 👤 Advertiser profiles with linked content aggregation
- 🏢 Business listings with gallery, pricing, and location
- 📅 Events with registration links and ticket details
- 🖼️ Gallery posts supporting images and videos
- 📝 Blog posts with rich HTML content
- 🔖 Curated bookmarks with thumbnails
- 🏷️ Category pages with filtered content
- 📱 Fully responsive mobile-first design

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69e753f490067b42f59fc986&clone_repository=69e7554c90067b42f59fc9fd)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: A classified or community site titled as "LadyAngel • IN – The Female Reference" , Where independent advertisers can create social profile, list businesses, upload bookmarks, post images and videos, create blog and more can creator do in these categories like Social Dating, Wellness and Therapies, Casting & Jobs, Women owned startups, event organiser. and Users can seek them"

### Code Generation Prompt

> Build a Next.js application for a website called "LadyAngel • IN". The content is managed in Cosmic CMS with the following object types: categories, advertisers, listings, bookmarks, gallery-posts, blog-posts, events. Create a beautiful, modern, responsive design with a homepage and pages for each content type.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Cosmic SDK

## Getting Started

### Prerequisites
- Bun or Node.js 18+
- A Cosmic account with configured bucket

### Installation
```bash
bun install
bun run dev
```

## Cosmic SDK Examples

```typescript
// Fetch all advertisers
const { objects } = await cosmic.objects
  .find({ type: 'advertisers' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration
This app connects to 7 object types with object relationship metafields linking advertisers to their content.

## Deployment
Deploy to Vercel or Netlify with your Cosmic environment variables.
<!-- README_END -->