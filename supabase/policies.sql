-- CHERRY for PET Row Level Security Policies

-- Enable RLS on all tables
alter table admin_profiles enable row level security;
alter table site_settings enable row level security;
alter table landing_sections enable row level security;
alter table campaigns enable row level security;
alter table partners enable row level security;
alter table stories enable row level security;
alter table inquiries enable row level security;
alter table media_assets enable row level security;
alter table audit_logs enable row level security;

-- Admin Profiles Policies
create policy "Admin profiles are viewable by authenticated admins"
  on admin_profiles for select
  using (auth.uid() = id);

create policy "Admin profiles are updatable by super_admin"
  on admin_profiles for update
  using (
    exists (
      select 1 from admin_profiles
      where id = auth.uid() and role = 'super_admin'
    )
  );

-- Site Settings Policies
create policy "Site settings are viewable by everyone"
  on site_settings for select
  using (true);

create policy "Site settings are updatable by super_admin"
  on site_settings for update
  using (
    exists (
      select 1 from admin_profiles
      where id = auth.uid() and role in ('super_admin')
    )
  );

-- Landing Sections Policies
create policy "Published landing sections are viewable by everyone"
  on landing_sections for select
  using (is_visible = true or auth.uid() is not null);

create policy "Landing sections are insertable by content admins"
  on landing_sections for insert
  with check (
    exists (
      select 1 from admin_profiles
      where id = auth.uid() and role in ('super_admin', 'content_admin')
    )
  );

create policy "Landing sections are updatable by content admins"
  on landing_sections for update
  using (
    exists (
      select 1 from admin_profiles
      where id = auth.uid() and role in ('super_admin', 'content_admin')
    )
  );

create policy "Landing sections are deletable by super_admin"
  on landing_sections for delete
  using (
    exists (
      select 1 from admin_profiles
      where id = auth.uid() and role = 'super_admin'
    )
  );

-- Campaigns Policies
create policy "Visible campaigns are viewable by everyone"
  on campaigns for select
  using (is_visible = true or auth.uid() is not null);

create policy "Campaigns are insertable by content admins"
  on campaigns for insert
  with check (
    exists (
      select 1 from admin_profiles
      where id = auth.uid() and role in ('super_admin', 'content_admin')
    )
  );

create policy "Campaigns are updatable by content admins"
  on campaigns for update
  using (
    exists (
      select 1 from admin_profiles
      where id = auth.uid() and role in ('super_admin', 'content_admin')
    )
  );

create policy "Campaigns are deletable by super_admin"
  on campaigns for delete
  using (
    exists (
      select 1 from admin_profiles
      where id = auth.uid() and role = 'super_admin'
    )
  );

-- Partners Policies
create policy "Visible partners are viewable by everyone"
  on partners for select
  using (is_visible = true or auth.uid() is not null);

create policy "Partners are insertable by content admins"
  on partners for insert
  with check (
    exists (
      select 1 from admin_profiles
      where id = auth.uid() and role in ('super_admin', 'content_admin')
    )
  );

create policy "Partners are updatable by content admins"
  on partners for update
  using (
    exists (
      select 1 from admin_profiles
      where id = auth.uid() and role in ('super_admin', 'content_admin')
    )
  );

create policy "Partners are deletable by super_admin"
  on partners for delete
  using (
    exists (
      select 1 from admin_profiles
      where id = auth.uid() and role = 'super_admin'
    )
  );

-- Stories Policies
create policy "Visible stories are viewable by everyone"
  on stories for select
  using (is_visible = true or auth.uid() is not null);

create policy "Stories are insertable by content admins"
  on stories for insert
  with check (
    exists (
      select 1 from admin_profiles
      where id = auth.uid() and role in ('super_admin', 'content_admin')
    )
  );

create policy "Stories are updatable by content admins"
  on stories for update
  using (
    exists (
      select 1 from admin_profiles
      where id = auth.uid() and role in ('super_admin', 'content_admin')
    )
  );

create policy "Stories are deletable by super_admin"
  on stories for delete
  using (
    exists (
      select 1 from admin_profiles
      where id = auth.uid() and role = 'super_admin'
    )
  );

-- Inquiries Policies
create policy "Inquiries are insertable by everyone"
  on inquiries for insert
  with check (true);

create policy "Inquiries are viewable by admins"
  on inquiries for select
  using (
    exists (
      select 1 from admin_profiles
      where id = auth.uid()
    )
  );

create policy "Inquiries are updatable by content admins"
  on inquiries for update
  using (
    exists (
      select 1 from admin_profiles
      where id = auth.uid() and role in ('super_admin', 'content_admin')
    )
  );

-- Media Assets Policies
create policy "Non-deleted media assets are viewable by everyone"
  on media_assets for select
  using (is_deleted = false or auth.uid() is not null);

create policy "Media assets are insertable by content admins"
  on media_assets for insert
  with check (
    exists (
      select 1 from admin_profiles
      where id = auth.uid() and role in ('super_admin', 'content_admin')
    )
  );

create policy "Media assets are updatable by content admins"
  on media_assets for update
  using (
    exists (
      select 1 from admin_profiles
      where id = auth.uid() and role in ('super_admin', 'content_admin')
    )
  );

create policy "Media assets are deletable by super_admin"
  on media_assets for delete
  using (
    exists (
      select 1 from admin_profiles
      where id = auth.uid() and role = 'super_admin'
    )
  );

-- Audit Logs Policies
create policy "Audit logs are viewable by admins"
  on audit_logs for select
  using (
    exists (
      select 1 from admin_profiles
      where id = auth.uid()
    )
  );

create policy "Audit logs are insertable by admins"
  on audit_logs for insert
  with check (
    exists (
      select 1 from admin_profiles
      where id = auth.uid()
    )
  );
