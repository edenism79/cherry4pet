-- Reorder all sections according to requirements
-- Target order:
-- 1. hero
-- 2. why_pet
-- 3. rabies_campaign
-- 4. how_it_works (note: campaigns component appears in page.tsx here)
-- 5. transparency
-- 6. cherry_photo
-- 7. impact
-- 8. partners
-- 9. final_cta

-- Step 1: Move all sections to temporary high numbers to avoid conflicts
UPDATE landing_sections SET sort_order = 101 WHERE section_key = 'hero';
UPDATE landing_sections SET sort_order = 102 WHERE section_key = 'why_pet';
UPDATE landing_sections SET sort_order = 103 WHERE section_key = 'rabies_campaign';
UPDATE landing_sections SET sort_order = 104 WHERE section_key = 'how_it_works';
UPDATE landing_sections SET sort_order = 105 WHERE section_key = 'transparency';
UPDATE landing_sections SET sort_order = 106 WHERE section_key = 'cherry_photo';
UPDATE landing_sections SET sort_order = 107 WHERE section_key = 'impact';
UPDATE landing_sections SET sort_order = 108 WHERE section_key = 'partners';
UPDATE landing_sections SET sort_order = 109 WHERE section_key = 'final_cta';

-- Step 2: Set final sort order
UPDATE landing_sections SET sort_order = 1, updated_at = NOW() WHERE section_key = 'hero';
UPDATE landing_sections SET sort_order = 2, updated_at = NOW() WHERE section_key = 'why_pet';
UPDATE landing_sections SET sort_order = 3, updated_at = NOW() WHERE section_key = 'rabies_campaign';
UPDATE landing_sections SET sort_order = 4, updated_at = NOW() WHERE section_key = 'how_it_works';
UPDATE landing_sections SET sort_order = 5, updated_at = NOW() WHERE section_key = 'transparency';
UPDATE landing_sections SET sort_order = 6, updated_at = NOW() WHERE section_key = 'cherry_photo';
UPDATE landing_sections SET sort_order = 7, updated_at = NOW() WHERE section_key = 'impact';
UPDATE landing_sections SET sort_order = 8, updated_at = NOW() WHERE section_key = 'partners';
UPDATE landing_sections SET sort_order = 9, updated_at = NOW() WHERE section_key = 'final_cta';

-- Step 3: Update impact body text if empty
UPDATE landing_sections
SET body = '여러분의 참여로 만들어질 목표입니다'
WHERE section_key = 'impact'
  AND (body IS NULL OR body = '');

-- Verify the new order
SELECT sort_order, section_key, title
FROM landing_sections
ORDER BY sort_order;
