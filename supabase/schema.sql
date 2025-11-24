-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users Table
create table users (
  id uuid references auth.users not null primary key,
  email text,
  name text,
  measurements jsonb,
  photo_url text,
  preferences text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Designs Table
create table designs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references users(id) not null,
  design_code text unique not null,
  name text,
  description text,
  image_urls text[],
  video_url text,
  visibility text check (visibility in ('private', 'shared', 'public')) default 'private',
  specs jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Orders Table
create table orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references users(id) not null,
  design_id uuid references designs(id) not null,
  status text check (status in ('pending', 'production', 'shipped', 'delivered')) default 'pending',
  tracking_number text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Shared Codes Table
create table shared_codes (
  id uuid default uuid_generate_v4() primary key,
  design_code text references designs(design_code) not null,
  owner_id uuid references users(id) not null,
  granted_to_email text,
  status text check (status in ('active', 'revoked')) default 'active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies (Basic)
alter table users enable row level security;
alter table designs enable row level security;
alter table orders enable row level security;
alter table shared_codes enable row level security;

-- Users can read/update their own data
create policy "Users can view own data" on users for select using (auth.uid() = id);
create policy "Users can update own data" on users for update using (auth.uid() = id);

-- Designs: Owners can view/edit. Others can view if public or shared.
create policy "Users can view own designs" on designs for select using (auth.uid() = user_id);
create policy "Users can create designs" on designs for insert with check (auth.uid() = user_id);

-- Orders: Users can view their orders
create policy "Users can view own orders" on orders for select using (auth.uid() = user_id);
