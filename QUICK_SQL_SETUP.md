# 🚀 빠른 SQL 설정 가이드

SQL Editor가 열렸습니다! 아래 순서대로 복사 & 붙여넣기 & RUN 하세요.

---

## ✅ 단계 1/4: schema.sql 실행

**프로젝트 폴더**에서 `supabase/schema.sql` 파일을 엽니다.

### 실행 방법:
1. `schema.sql` 파일 전체 내용 복사 (Ctrl+A → Ctrl+C)
2. Supabase SQL Editor에 붙여넣기 (Ctrl+V)
3. **RUN** 버튼 클릭 (또는 Ctrl+Enter)
4. ✅ "Success" 메시지 확인

**생성되는 것**: 9개 테이블 + 인덱스 + 트리거

---

## ✅ 단계 2/4: seed.sql 실행

**프로젝트 폴더**에서 `supabase/seed.sql` 파일을 엽니다.

### 실행 방법:
1. SQL Editor를 비웁니다 (Ctrl+A → Delete)
2. `seed.sql` 파일 전체 내용 복사
3. SQL Editor에 붙여넣기
4. **RUN** 버튼 클릭
5. ✅ "Success" 메시지 확인

**생성되는 것**: 초기 데이터 (섹션, 캠페인, 파트너, 설정)

---

## ✅ 단계 3/4: policies.sql 실행

**프로젝트 폴더**에서 `supabase/policies.sql` 파일을 엽니다.

### 실행 방법:
1. SQL Editor를 비웁니다
2. `policies.sql` 파일 전체 내용 복사
3. SQL Editor에 붙여넣기
4. **RUN** 버튼 클릭
5. ✅ "Success" 메시지 확인

**생성되는 것**: RLS 정책 (보안 설정)

---

## ✅ 단계 4/4: migration_add_seo_fields.sql 실행

**프로젝트 폴더**에서 `supabase/migration_add_seo_fields.sql` 파일을 엽니다.

### 실행 방법:
1. SQL Editor를 비웁니다
2. `migration_add_seo_fields.sql` 파일 전체 내용 복사
3. SQL Editor에 붙여넣기
4. **RUN** 버튼 클릭
5. ✅ "Success" 메시지 확인

**생성되는 것**: SEO 필드 (meta_title, og_image 등)

---

## 🎉 완료 확인

### Table Editor에서 확인
Supabase Dashboard → **Table Editor** 클릭

다음 테이블들이 보이면 성공:
- ✅ admin_profiles
- ✅ audit_logs
- ✅ campaigns
- ✅ inquiries
- ✅ landing_sections
- ✅ media_assets
- ✅ partners
- ✅ site_settings
- ✅ stories

---

## 다음 단계: Storage 설정

SQL 실행이 모두 끝나면 알려주세요!
Storage bucket 설정을 진행하겠습니다.
