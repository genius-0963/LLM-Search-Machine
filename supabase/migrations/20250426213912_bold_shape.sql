/*
  # Create products search tables and functions

  1. New Tables
    - `product_embeddings`
      - `id` (uuid, primary key)
      - `product_id` (text, references products)
      - `embedding` (vector(1536))
      - `created_at` (timestamp)

  2. Functions
    - `match_products` - Performs similarity search on product embeddings
    
  3. Security
    - Enable RLS on `product_embeddings` table
    - Add policy for authenticated users to read embeddings
*/

-- Enable the vector extension
create extension if not exists vector;

-- Create the products table if it doesn't exist
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  price decimal(10,2) not null,
  image_url text not null,
  category text not null,
  created_at timestamp with time zone default now()
);

-- Create the product embeddings table
create table if not exists product_embeddings (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  embedding vector(1536),
  created_at timestamp with time zone default now()
);

-- Create the similarity search function
create or replace function match_products(
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id uuid,
  name text,
  description text,
  similarity float
)
language sql stable
as $$
  select
    products.id,
    products.name,
    products.description,
    1 - (product_embeddings.embedding <=> query_embedding) as similarity
  from product_embeddings
  join products on products.id = product_embeddings.product_id
  where 1 - (product_embeddings.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;

-- Enable RLS
alter table products enable row level security;
alter table product_embeddings enable row level security;

-- Create policies
create policy "Enable read access for authenticated users"
  on products for select
  to authenticated
  using (true);

create policy "Enable read access for authenticated users"
  on product_embeddings for select
  to authenticated
  using (true);