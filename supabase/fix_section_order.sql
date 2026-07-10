-- Fix section order: cherry_photo -> impact -> partners
-- Current: cherry_photo(6) -> partners(7) -> impact(8)
-- Target: cherry_photo(6) -> impact(7) -> partners(8)

UPDATE landing_sections
SET sort_order = 7, updated_at = NOW()
WHERE section_key = 'impact';

UPDATE landing_sections
SET sort_order = 8, updated_at = NOW()
WHERE section_key = 'partners';

-- Verify the order
SELECT section_key, title, sort_order
FROM landing_sections
ORDER BY sort_order;
