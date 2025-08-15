# Supabase Integration Setup Guide

This guide will help you set up Supabase integration for the IBAG Brochure application.

## Prerequisites

- A Supabase account (sign up at [supabase.com](https://supabase.com))
- Node.js and npm installed
- The IBAG Brochure application cloned locally

## Setup Steps

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `ibag-brochure`
   - Database Password: Choose a strong password
   - Region: Choose the closest to your users
5. Click "Create new project"

### 2. Get Your Project Credentials

1. Go to Settings → API in your Supabase dashboard
2. Copy the following:
   - Project URL
   - `anon` `public` key
   - `service_role` `secret` key (keep this secure!)

### 3. Set Up Environment Variables

The `.env.local` file has already been created with your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://iiiieqrhsmxskonwanww.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 4. Set Up Database Schema

1. Go to the SQL Editor in your Supabase dashboard
2. Copy the contents of `supabase-schema.sql`
3. Paste it into the SQL Editor
4. Click "Run" to execute the schema

This will create:
- Tables: `events`, `news`, `members`, `gallery`
- Storage buckets for file uploads
- Row Level Security policies
- Sample data

### 5. Configure Authentication

1. Go to Authentication → Settings in your Supabase dashboard
2. Configure your site URL:
   - Site URL: `http://localhost:3000` (for development)
   - Redirect URLs: `http://localhost:3000/**`

### 6. Set Up Storage (Optional)

If you want to upload images:

1. Go to Storage in your Supabase dashboard
2. The buckets (`events`, `news`, `gallery`) should already be created by the schema
3. Configure CORS if needed for your domain

## Usage

### Authentication

The app now uses Supabase Auth with fallback to the original admin credentials:

- **Admin Login**: `admin@ibag-ghana.org` / `ibag2024admin`
- **New Users**: Can sign up through Supabase Auth

### Data Services

Use the provided services in `lib/supabase-service.ts`:

```typescript
import { eventsService, newsService, membersService, galleryService } from '@/lib/supabase-service'

// Get all events
const events = await eventsService.getAll()

// Create new event
const newEvent = await eventsService.create({
  title: 'New Event',
  description: 'Event description',
  date: '2024-12-25T18:00:00Z',
  location: 'Event Location'
})
```

### File Uploads

```typescript
import { fileService } from '@/lib/supabase-service'

// Upload file
const imageUrl = await fileService.uploadFile('events', 'event-image.jpg', file)

// Delete file
await fileService.deleteFile('events', 'event-image.jpg')
```

## Database Schema

### Tables

#### Events
- `id` (UUID, Primary Key)
- `title` (VARCHAR)
- `description` (TEXT)
- `date` (TIMESTAMP)
- `location` (VARCHAR)
- `image_url` (TEXT, Optional)
- `created_at`, `updated_at` (TIMESTAMP)

#### News
- `id` (UUID, Primary Key)
- `title` (VARCHAR)
- `content` (TEXT)
- `excerpt` (TEXT)
- `author` (VARCHAR)
- `published_date` (TIMESTAMP)
- `image_url` (TEXT, Optional)
- `created_at`, `updated_at` (TIMESTAMP)

#### Members
- `id` (UUID, Primary Key)
- `name` (VARCHAR)
- `email` (VARCHAR, Unique)
- `phone` (VARCHAR, Optional)
- `company` (VARCHAR, Optional)
- `position` (VARCHAR, Optional)
- `membership_type` (VARCHAR)
- `joined_date` (DATE)
- `created_at`, `updated_at` (TIMESTAMP)

#### Gallery
- `id` (UUID, Primary Key)
- `title` (VARCHAR)
- `description` (TEXT, Optional)
- `image_url` (TEXT)
- `event_id` (UUID, Foreign Key to Events)
- `created_at`, `updated_at` (TIMESTAMP)

## Security

- Row Level Security (RLS) is enabled on all tables
- Public read access for all content
- Authenticated users can manage content
- Storage policies protect file uploads

## Migration from Mock Data

The integration maintains backward compatibility:

1. **Authentication**: Existing admin login still works
2. **Data**: Mock data can be migrated to Supabase
3. **APIs**: Existing components will work with new data services

## Troubleshooting

### Common Issues

1. **Environment Variables**: Make sure `.env.local` is in the root directory
2. **CORS Errors**: Check your site URL in Supabase Auth settings
3. **RLS Policies**: Ensure you're authenticated when trying to modify data
4. **Database Connection**: Verify your project URL and API keys

### Getting Help

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord Community](https://discord.supabase.com)
- Check the browser console for detailed error messages

## Next Steps

1. **Production Setup**: Update environment variables for production
2. **Custom Domain**: Configure custom domain in Supabase
3. **Email Templates**: Customize auth email templates
4. **Backup Strategy**: Set up database backups
5. **Monitoring**: Enable logging and monitoring

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Your IBAG Brochure application is now powered by Supabase! 🚀