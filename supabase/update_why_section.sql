-- Update Why PET Section for Rabies Campaign Focus
UPDATE landing_sections
SET
  title = '왜 광견병 제로 캠페인인가요?',
  subtitle = '아시아 광견병 사망자의 중심에 아시아가 있다면',
  body = '그 중심의 리더십도 아시아에서 시작되어야 합니다. 그리고 그 리더십의 최전선에 한국 수의사가 설 수 있습니다.',
  extra = jsonb_build_object(
    'point1_title', '예방 가능한 비극',
    'point1_desc', '전쟁은 세계가 바라보는 비극입니다. 기아는 세계가 의연할 수 없는 비극입니다. 광견병은 세계가 이미 막을 방법을 알고도, 아직 끝내지 못한 비극입니다.',
    'point2_title', '사진 한 장, 백신 한 걸음',
    'point2_desc', '오늘의 기부가 아시아의 아이들과 동물들을 광견병으로부터 지킵니다.',
    'point3_title', '투명한 기록, 명확한 결과',
    'point3_desc', '사람과 동물, 지역사회의 생명을 함께 지키는 One Health 가치를 바탕으로 광견병으로부터 자유로운 더 안전한 세상을 만들고 그 과정을 투명하게 기록합니다.'
  )
WHERE section_key = 'why_pet';
