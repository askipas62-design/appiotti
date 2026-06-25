-- Profiles table for extra user data
create table if not exists public.profiles (
  id uuid references auth.users not null primary key,
  first_name text,
  last_name text,
  email text,
  is_admin boolean default false,
  created_at timestamp with time zone default now()
);

-- Products table
create table if not exists public.products (
  id text primary key,
  name text not null,
  category text not null,
  price_ht numeric not null,
  stock integer default 0,
  badge text,
  rating numeric default 0,
  "desc" text,
  image text,
  created_at timestamp with time zone default now()
);

-- Orders table
create table if not exists public.orders (
  id text primary key,
  user_id uuid references auth.users not null,
  items jsonb not null,
  total_ttc numeric not null,
  status text default 'En attente de virement',
  proof_url text,
  proof_uploaded boolean default false,
  created_at timestamp with time zone default now()
);

-- Reviews table
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id text references public.products(id),
  user_id uuid references auth.users not null,
  user_name text,
  rating integer not null,
  comment text,
  created_at timestamp with time zone default now()
);

-- Wishlist table
create table if not exists public.wishlist (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  product_id text references public.products(id),
  created_at timestamp with time zone default now(),
  unique(user_id, product_id)
);

-- Enable RLS (Row Level Security)
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.reviews enable row level security;
alter table public.wishlist enable row level security;

-- Policies (with IF NOT EXISTS so it's safe to run multiple times)
-- Products: Read for everyone, Write for admin only (via Service Role or custom function)
do $$ begin
  create policy "Allow public read access for products" on public.products for select using (true);
exception when duplicate_object then null;
end $$;

-- Profiles: Read and Update for owner
do $$ begin
  create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
exception when duplicate_object then null;
end $$;

-- Orders: Read and Create for owner
do $$ begin
  create policy "Users can view own orders" on public.orders for select using (auth.uid() = user_id);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "Users can create own orders" on public.orders for insert with check (auth.uid() = user_id);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "Users can update own orders" on public.orders for update using (auth.uid() = user_id);
exception when duplicate_object then null;
end $$;

-- Reviews: Read for everyone, Create for authenticated users
do $$ begin
  create policy "Allow public read access for reviews" on public.reviews for select using (true);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "Authenticated users can create reviews" on public.reviews for insert with check (auth.role() = 'authenticated');
exception when duplicate_object then null;
end $$;

-- Wishlist: Owner only
do $$ begin
  create policy "Users can view own wishlist" on public.wishlist for select using (auth.uid() = user_id);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "Users can manage own wishlist" on public.wishlist for all using (auth.uid() = user_id);
exception when duplicate_object then null;
end $$;
