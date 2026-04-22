# Supabase Database Setup

To make the Daily Pulse Journal app work with your Supabase project, you need to run the following SQL in your Supabase SQL Editor:

```sql
-- Create the entries table
create table public.entries (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  content text not null,
  date date not null default current_date,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Set up Row Level Security (RLS)
alter table public.entries enable row level security;

-- Create policies
create policy "Users can create their own entries"
  on public.entries for insert
  with check (auth.uid() = user_id);

create policy "Users can view their own entries"
  on public.entries for select
  using (auth.uid() = user_id);

create policy "Users can update their own entries"
  on public.entries for update
  using (auth.uid() = user_id);

create policy "Users can delete their own entries"
  on public.entries for delete
  using (auth.uid() = user_id);
```

Please run this SQL to ensure the application can store and retrieve journal entries securely.
