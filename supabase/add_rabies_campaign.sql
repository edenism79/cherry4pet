-- ADD Rabies Campaign (keep existing content)
-- This SQL adds the FAVA x CHERRY rabies campaign without removing existing data

-- 1. Add FAVA as a new partner
INSERT INTO partners (name, type, website_url, description, is_visible, sort_order)
VALUES (
  'FAVA (아시아태평양수의사회)',
  '국제 협력기관',
  'https://fava-apo.org',
  'Federation of Asian Veterinary Associations - 아시아 광견병 위원회와 함께하는 One Asia, One Health, Zero Rabies 캠페인',
  true,
  0
)
ON CONFLICT DO NOTHING;

-- 2. Add main rabies campaign as the FIRST featured campaign
INSERT INTO campaigns (
  title,
  organization,
  summary,
  goal_amount,
  raised_amount,
  start_date,
  end_date,
  external_url,
  category,
  is_featured,
  is_visible,
  sort_order
)
VALUES (
  'One Asia, One Health, Zero Rabies',
  'FAVA x CHERRY for PET',
  '아시아 광견병 사망자의 중심에 아시아가 있다면, 그 중심의 리더십도 아시아에서 시작되어야 합니다. CHERRY for PET의 첫 런칭 캠페인에 함께해주세요.',
  100000000,
  0,
  '2026-07-14',
  '2027-12-31',
  'https://cherry.pet/campaigns/rabies-zero',
  '국제 협력',
  true,
  true,
  0
)
ON CONFLICT DO NOTHING;

-- 3. Increase sort_order of existing campaigns so rabies campaign comes first
UPDATE campaigns
SET sort_order = sort_order + 1
WHERE title != 'One Asia, One Health, Zero Rabies';

-- 4. Add a new section for the rabies campaign (insert after hero)
INSERT INTO landing_sections (
  section_key,
  title,
  subtitle,
  body,
  cta_label,
  cta_url,
  sort_order,
  is_visible,
  extra
)
VALUES (
  'rabies_campaign',
  'CHERRY for PET 첫 런칭 캠페인',
  'One Asia, One Health, Zero Rabies',
  '아시아태평양수의사회(FAVA) 아시아 광견병 위원회와 CHERRY for PET은 사람과 동물, 지역사회의 생명을 함께 지키는 One Health 가치를 바탕으로 광견병으로부터 자유로운 더 안전한 세상을 만들기 위해 업무협약(MOU)을 체결합니다.',
  '캠페인 참여하기',
  '/campaigns/rabies-zero',
  2,
  true,
  jsonb_build_object(
    'launch_date', '2026년 7월 14일(월) 오후 2시',
    'venue', '24시 로얄동물메디컬센터 본원 (서울특별시 중랑구 동일로 640, 로얄동물메디컬센터 본원 2F, 3F)',
    'organizer', 'FAVA 아시아 광견병 위원회',
    'hosts', 'CHERRY for PET | (주)체리 | (주)이지펫',
    'stat1_label', '광견병 전체 사망',
    'stat1_value', '매년 약 6만명',
    'stat2_label', '광견병 아동 사망',
    'stat2_value', '50% 약 3만명',
    'stat3_label', '전쟁(무력분쟁) 아동 사망 및 부상',
    'stat3_value', '약 1만 5천명',
    'stat4_label', '광견병 등록 사망',
    'stat4_value', '약 300만 마리',
    'quote', '전쟁은 세계가 바라보는 비극입니다. 기아는 세계가 의연할 수 없는 비극입니다. 광견병은 세계가 이미 막을 방법을 알고도, 아직 끝내지 못한 비극입니다.'
  )
)
ON CONFLICT (section_key) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  body = EXCLUDED.body,
  cta_label = EXCLUDED.cta_label,
  cta_url = EXCLUDED.cta_url,
  extra = EXCLUDED.extra;

-- 5. Adjust sort_order of other sections
UPDATE landing_sections
SET sort_order = sort_order + 1
WHERE section_key != 'hero'
  AND section_key != 'rabies_campaign'
  AND sort_order >= 2;
