-- Supabase SQL Editor에서 실행하세요
-- 광견병 캠페인 섹션의 extra 데이터 확인

SELECT
  id,
  section_key,
  title,
  extra->>'background_image' as background_image,
  extra->>'background_opacity' as background_opacity,
  extra
FROM landing_sections
WHERE section_key = 'rabies_campaign';
