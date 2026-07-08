-- CHERRY for PET Seed Data

-- Insert initial site settings
insert into site_settings (
  site_name,
  primary_cta_label,
  primary_cta_url,
  footer_company_name,
  footer_business_info,
  sns_links,
  is_published
) values (
  'CHERRY for PET',
  '지금 기부하기',
  'https://cherry.pet/donate',
  'CHERRY for PET',
  '사업자등록번호: 123-45-67890 | 대표: 홍길동 | 주소: 서울특별시 강남구',
  '{"instagram": "https://instagram.com/cherry4pet", "facebook": "https://facebook.com/cherry4pet"}'::jsonb,
  true
);

-- Insert landing sections
insert into landing_sections (section_key, title, subtitle, body, cta_label, cta_url, sort_order, is_visible) values
('hero', 'CHERRY for PET', '반려동물을 위한 가장 투명한 기부 플랫폼', '사진 한 장, 작은 참여, 투명한 기부가 반려동물의 생명을 지킵니다.', '지금 기부하기', 'https://cherry.pet/donate', 1, true),
('why_pet', '왜 반려동물 전용 기부 플랫폼이 필요한가요?', '매년 수만 마리의 반려동물이 유기되고 있습니다', '유기동물 구조, 치료비 지원, 보호소 운영, 입양 연결, 그리고 국제 협력 캠페인까지. CHERRY for PET은 반려동물의 생명을 지키고 더 나은 미래를 만들어갑니다.', null, null, 2, true),
('how_it_works', '어떻게 작동하나요?', '투명하고 신뢰할 수 있는 기부 프로세스', '참여 또는 기부 → 캠페인 연결 → 구조/치료/보호 진행 → 기부금 사용 내역 기록 → 결과 리포트 공개', null, null, 3, true),
('transparency', '투명성이 우리의 약속입니다', '블록체인 기반 CHERRY 플랫폼과 함께', '모든 기부금의 흐름을 투명하게 공개하고, 캠페인별 사용 내역을 관리하며, 기부자에게 결과 리포트를 제공합니다. 보호단체, 동물병원, 기업이 함께 참여하는 투명한 생태계를 만들어갑니다.', null, null, 4, true),
('cherry_photo', 'CHERRY Photo for PET', '사진 한 장이 생명을 구합니다', '포토부스에서 반려동물과 함께 사진을 촬영하면, 일부 금액이 구조·치료·보호 캠페인에 자동으로 기부됩니다. 즐거운 추억과 함께 선한 영향력을 만들어보세요.', null, null, 5, true),
('partners', '함께하는 파트너', '신뢰할 수 있는 파트너들과 함께합니다', null, null, null, 6, true),
('impact', '우리가 만든 변화', '투명한 기부로 이뤄낸 성과', null, null, null, 7, true),
('final_cta', '작은 참여가 한 생명을 지킵니다', 'CHERRY for PET과 함께 투명한 반려동물 기부를 시작하세요', null, '지금 기부하기', 'https://cherry.pet/donate', 8, true);

-- Insert sample campaigns
insert into campaigns (
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
) values
(
  '구조견 응급 치료비 지원',
  '사랑의 보호소',
  '교통사고로 다친 구조견 3마리의 응급 수술과 회복 치료를 위한 캠페인입니다. 여러분의 따뜻한 손길이 필요합니다.',
  5000000,
  3200000,
  '2026-06-01',
  '2026-07-31',
  'https://cherry.pet/campaigns/rescue-dogs-emergency',
  '구조/치료',
  true,
  true,
  1
),
(
  '유기묘 보호소 사료 지원',
  '고양이를 부탁해',
  '100마리의 유기묘를 돌보는 보호소에 3개월치 사료와 영양제를 지원합니다. 작은 도움이 큰 힘이 됩니다.',
  2000000,
  1850000,
  '2026-05-15',
  '2026-08-15',
  'https://cherry.pet/campaigns/shelter-food-support',
  '보호소 지원',
  true,
  true,
  2
),
(
  '아시아 광견병 예방 캠페인',
  '국제동물구조연대',
  '동남아시아 지역 유기견 1,000마리에게 광견병 백신을 접종하고 지역사회의 안전을 지킵니다.',
  10000000,
  7500000,
  '2026-04-01',
  '2026-12-31',
  'https://cherry.pet/campaigns/rabies-prevention-asia',
  '국제 협력',
  true,
  true,
  3
);

-- Insert sample partners
insert into partners (
  name,
  type,
  website_url,
  description,
  is_visible,
  sort_order
) values
('CHERRY', '플랫폼', 'https://cherry.io', '블록체인 기반 투명한 기부 플랫폼', true, 1),
('EasyPet', '반려동물 서비스', 'https://easypet.co.kr', '반려동물 종합 서비스 플랫폼', true, 2),
('사랑의 보호소', '동물보호단체', null, '유기동물 구조 및 보호 전문 단체', true, 3),
('24시 반려동물병원', '동물병원', null, '24시간 응급 진료 가능한 동물병원', true, 4),
('한국수의사회', '협회', 'https://kvma.or.kr', '수의사 전문가 네트워크', true, 5);

-- Insert sample stories
insert into stories (
  title,
  summary,
  published_at,
  is_visible,
  sort_order
) values
(
  '교통사고 당한 구조견 희망이의 회복 이야기',
  '여러분의 기부로 희망이는 성공적으로 수술을 마치고 건강을 회복했습니다.',
  '2026-06-15',
  true,
  1
),
(
  'CHERRY Photo 부스 오픈 - 강남역점',
  '강남역 지하상가에 첫 번째 CHERRY Photo 부스가 오픈했습니다. 반려동물과 함께 추억을 남기세요.',
  '2026-06-01',
  true,
  2
),
(
  '100번째 입양 성공 기념',
  'CHERRY for PET을 통해 100마리의 유기동물이 새로운 가족을 만났습니다.',
  '2026-05-20',
  true,
  3
);
