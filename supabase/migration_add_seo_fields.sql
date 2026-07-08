-- Add SEO and additional fields to site_settings table
ALTER TABLE site_settings
ADD COLUMN IF NOT EXISTS meta_title TEXT,
ADD COLUMN IF NOT EXISTS meta_description TEXT,
ADD COLUMN IF NOT EXISTS meta_keywords TEXT,
ADD COLUMN IF NOT EXISTS og_title TEXT,
ADD COLUMN IF NOT EXISTS og_description TEXT,
ADD COLUMN IF NOT EXISTS og_image TEXT,
ADD COLUMN IF NOT EXISTS canonical_url TEXT;

-- Update existing record if exists
UPDATE site_settings
SET
  meta_title = COALESCE(meta_title, site_name),
  og_title = COALESCE(og_title, site_name),
  canonical_url = COALESCE(canonical_url, 'https://cherry4pet.com')
WHERE id IS NOT NULL;

COMMENT ON COLUMN site_settings.meta_title IS '사이트 메타 제목';
COMMENT ON COLUMN site_settings.meta_description IS '사이트 메타 설명';
COMMENT ON COLUMN site_settings.meta_keywords IS '사이트 메타 키워드';
COMMENT ON COLUMN site_settings.og_title IS 'Open Graph 제목';
COMMENT ON COLUMN site_settings.og_description IS 'Open Graph 설명';
COMMENT ON COLUMN site_settings.og_image IS 'Open Graph 이미지 URL';
COMMENT ON COLUMN site_settings.canonical_url IS '사이트 Canonical URL';
