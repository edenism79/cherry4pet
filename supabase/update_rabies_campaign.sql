-- Update Hero Section for CHERRY for PET Launch Campaign
UPDATE landing_sections
SET
  title = 'CHERRY for PET',
  subtitle = '첫 런칭 캠페인: One Asia, One Health, Zero Rabies',
  body = 'CHERRY for PET과 아시아태평양수의사회(FAVA)가 함께하는 아시아 광견병 제로 프로젝트. 사진 한 장, 작은 참여로 광견병 없는 아시아를 만듭니다.',
  cta_label = '캠페인 참여하기',
  cta_url = '/campaigns/rabies-zero',
  extra = jsonb_build_object(
    'cta2_label', '자세히 알아보기',
    'cta2_url', '#about-campaign'
  )
WHERE section_key = 'hero';

-- Update Main Campaign
UPDATE campaigns
SET
  title = 'One Asia, One Health, Zero Rabies',
  organization = 'FAVA (아시아태평양수의사회) x CHERRY for PET',
  summary = '아시아 광견병 사망자의 증심에 아시아가 있다면, 그 중심의 리더십도 아시아에서 시작되어야 합니다. 함께 만드는 광견병 없는 아시아를 향한 첫 걸음.',
  goal_amount = 100000000,
  raised_amount = 0,
  start_date = '2026-07-14',
  end_date = '2027-12-31',
  external_url = '/campaigns/rabies-zero',
  category = '국제 협력',
  is_featured = true,
  is_visible = true,
  sort_order = 1,
  image_url = NULL
WHERE title LIKE '%광견병%' OR title LIKE '%rabies%';

-- If campaign doesn't exist, insert it
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
SELECT
  'One Asia, One Health, Zero Rabies',
  'FAVA (아시아태평양수의사회) x CHERRY for PET',
  '아시아 광견병 사망자의 증심에 아시아가 있다면, 그 중심의 리더십도 아시아에서 시작되어야 합니다. 함께 만드는 광견병 없는 아시아를 향한 첫 걸음.',
  100000000,
  0,
  '2026-07-14',
  '2027-12-31',
  '/campaigns/rabies-zero',
  '국제 협력',
  true,
  true,
  1
WHERE NOT EXISTS (
  SELECT 1 FROM campaigns WHERE title LIKE '%Zero Rabies%'
);

-- Add FAVA as partner if not exists
INSERT INTO partners (name, type, website_url, description, is_visible, sort_order)
SELECT
  'FAVA (아시아태평양수의사회)',
  '국제 협력기관',
  'https://fava-apo.org',
  'Federation of Asian Veterinary Associations - 아시아 광견병 위원회',
  true,
  1
WHERE NOT EXISTS (
  SELECT 1 FROM partners WHERE name LIKE '%FAVA%'
);

-- Update or insert impact metrics section with rabies data
UPDATE landing_sections
SET
  title = 'One Asia, One Health, Zero Rabies',
  subtitle = '숫자로 보는 광견병의 현실',
  body = '전쟁은 세계가 바라보는 비극입니다. 기아는 세계가 의연할 수 없는 비극입니다. 광견병은 세계가 이미 막을 방법을 알고도, 아직 끝내지 못한 비극입니다.',
  extra = jsonb_build_object(
    'stat1_label', '광견병 전체 사망',
    'stat1_value', '매년 약 6만명',
    'stat2_label', '광견병 아동 사망',
    'stat2_value', '50% 약 3만명',
    'stat3_label', '전쟁(무력분쟁) 아동 사망 및 부상',
    'stat3_value', '약 1만 5천명',
    'stat4_label', '광견병 등록 사망',
    'stat4_value', '약 300만 마리'
  )
WHERE section_key = 'impact';
