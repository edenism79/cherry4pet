-- CHERRY for PET Database Schema

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Admin Profiles Table
create table admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null check (role in ('super_admin', 'content_admin', 'viewer')),
  display_name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Site Settings Table
create table site_settings (
  id uuid primary key default gen_random_uuid(),
  site_name text not null default 'CHERRY for PET',
  logo_url text,
  favicon_url text,
  primary_cta_label text default '지금 기부하기',
  primary_cta_url text,
  footer_company_name text,
  footer_business_info text,
  privacy_url text,
  terms_url text,
  sns_links jsonb default '{}'::jsonb,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Landing Sections Table
create table landing_sections (
  id uuid primary key default gen_random_uuid(),
  section_key text not null unique,
  title text,
  subtitle text,
  body text,
  image_url text,
  cta_label text,
  cta_url text,
  extra jsonb default '{}'::jsonb,
  sort_order int default 0,
  is_visible boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Campaigns Table
create table campaigns (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  organization text,
  summary text,
  image_url text,
  goal_amount numeric default 0,
  raised_amount numeric default 0,
  start_date date,
  end_date date,
  external_url text,
  category text,
  is_featured boolean default false,
  is_visible boolean default true,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Partners Table
create table partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text,
  logo_url text,
  website_url text,
  description text,
  is_visible boolean default true,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Stories Table
create table stories (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text,
  image_url text,
  link_url text,
  published_at date,
  is_visible boolean default true,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Inquiries Table
create table inquiries (
  id uuid primary key default gen_random_uuid(),
  type text not null default 'general',
  name text not null,
  organization text,
  email text not null,
  phone text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'in_progress', 'done')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Media Assets Table
create table media_assets (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  file_url text not null,
  mime_type text,
  size_bytes bigint,
  alt_text text,
  bucket text default 'public-assets',
  is_deleted boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Audit Logs Table
create table audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  action text not null,
  target_table text not null,
  target_id uuid,
  before_data jsonb,
  after_data jsonb,
  created_at timestamptz default now()
);

-- Create indexes
create index idx_landing_sections_key on landing_sections(section_key);
create index idx_campaigns_featured on campaigns(is_featured) where is_visible = true;
create index idx_campaigns_visible on campaigns(is_visible);
create index idx_partners_visible on partners(is_visible);
create index idx_stories_visible on stories(is_visible);
create index idx_inquiries_status on inquiries(status);
create index idx_media_assets_deleted on media_assets(is_deleted);
create index idx_audit_logs_user on audit_logs(user_id);
create index idx_audit_logs_target on audit_logs(target_table, target_id);

-- Create updated_at trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply updated_at triggers
create trigger update_admin_profiles_updated_at before update on admin_profiles
  for each row execute function update_updated_at_column();

create trigger update_site_settings_updated_at before update on site_settings
  for each row execute function update_updated_at_column();

create trigger update_landing_sections_updated_at before update on landing_sections
  for each row execute function update_updated_at_column();

create trigger update_campaigns_updated_at before update on campaigns
  for each row execute function update_updated_at_column();

create trigger update_partners_updated_at before update on partners
  for each row execute function update_updated_at_column();

create trigger update_stories_updated_at before update on stories
  for each row execute function update_updated_at_column();

create trigger update_inquiries_updated_at before update on inquiries
  for each row execute function update_updated_at_column();

create trigger update_media_assets_updated_at before update on media_assets
  for each row execute function update_updated_at_column();
