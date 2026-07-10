-- Update impact section with default body text and proper settings
UPDATE landing_sections
SET
  title = '함께 만들어가는 변화',
  subtitle = null,
  body = '여러분의 참여로 만들어질 목표입니다',
  extra = COALESCE(extra, '{}'::jsonb) || jsonb_build_object(
    'body_font', 'Pretendard',
    'body_size', '18',
    'body_color', 'rgba(255, 255, 255, 0.8)',
    'title_color', '#FFFFFF',
    'subtitle_color', 'rgba(255, 255, 255, 0.9)',
    'metrics', '[
      {"label": "누적 기부금", "value": 500000000, "unit": "원", "prefix": ""},
      {"label": "참여자 수", "value": 10000, "unit": "명", "prefix": ""},
      {"label": "지원 캠페인", "value": 200, "unit": "개", "prefix": ""},
      {"label": "구조/치료 동물", "value": 1000, "unit": "마리", "prefix": ""},
      {"label": "파트너", "value": 100, "unit": "곳", "prefix": ""}
    ]'::jsonb
  ),
  updated_at = NOW()
WHERE section_key = 'impact';
