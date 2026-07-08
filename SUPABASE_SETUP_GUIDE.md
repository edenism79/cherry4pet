# Supabase 설정 가이드

CHERRY for PET 프로젝트를 Supabase와 연동하기 위한 완전한 설정 가이드입니다.

---

## 1단계: Supabase 프로젝트 생성

1. [Supabase](https://supabase.com) 접속 및 로그인
2. "New Project" 클릭
3. 프로젝트 정보 입력:
   - **Name**: cherry-for-pet
   - **Database Password**: 안전한 비밀번호 생성
   - **Region**: Northeast Asia (Seoul) 권장
4. 프로젝트 생성 완료 (약 2분 소요)

---

## 2단계: 데이터베이스 스키마 설정

### 2.1 SQL Editor 접속

Supabase Dashboard → SQL Editor

### 2.2 스키마 실행

다음 순서대로 SQL 파일을 실행하세요:

#### ① 기본 스키마 생성

```sql
-- supabase/schema.sql 내용을 복사하여 실행
```

실행 방법:
1. `supabase/schema.sql` 파일 내용 전체 복사
2. SQL Editor에 붙여넣기
3. "RUN" 버튼 클릭

#### ② Seed 데이터 삽입

```sql
-- supabase/seed.sql 내용을 복사하여 실행
```

#### ③ RLS 정책 설정

```sql
-- supabase/policies.sql 내용을 복사하여 실행
```

#### ④ SEO 필드 추가

```sql
-- supabase/migration_add_seo_fields.sql 내용을 복사하여 실행
```

### 2.3 테이블 확인

Table Editor에서 다음 테이블이 생성되었는지 확인:

- ✅ admin_profiles
- ✅ site_settings
- ✅ landing_sections
- ✅ campaigns
- ✅ partners
- ✅ stories
- ✅ inquiries
- ✅ media_assets
- ✅ audit_logs

---

## 3단계: Storage 설정

### 3.1 Bucket 생성

1. Supabase Dashboard → Storage
2. "Create bucket" 클릭
3. Bucket 정보 입력:
   - **Name**: `public-assets`
   - **Public bucket**: ✅ 체크
4. "Create bucket" 클릭

### 3.2 Storage RLS 정책 설정

SQL Editor에서 다음 쿼리 실행:

```sql
-- 공개 읽기 정책
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'public-assets');

-- 관리자 업로드 정책
CREATE POLICY "Admin upload access"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'public-assets' 
  AND auth.uid() IN (
    SELECT id FROM admin_profiles
  )
);

-- 관리자 업데이트 정책
CREATE POLICY "Admin update access"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'public-assets' 
  AND auth.uid() IN (
    SELECT id FROM admin_profiles
  )
);

-- 관리자 삭제 정책
CREATE POLICY "Admin delete access"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'public-assets' 
  AND auth.uid() IN (
    SELECT id FROM admin_profiles
  )
);
```

---

## 4단계: 환경변수 설정

### 4.1 API 키 확인

Supabase Dashboard → Project Settings → API

다음 두 값을 복사:
- **Project URL**
- **anon public** key
- **service_role** key (Settings → Show)

### 4.2 .env.local 파일 생성

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용 입력:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=여기에_Project_URL_붙여넣기
NEXT_PUBLIC_SUPABASE_ANON_KEY=여기에_anon_key_붙여넣기
SUPABASE_SERVICE_ROLE_KEY=여기에_service_role_key_붙여넣기

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Email (선택 사항 - 나중에 설정 가능)
RESEND_API_KEY=
ADMIN_EMAIL=
```

**⚠️ 주의**: `.env.local` 파일은 절대 Git에 커밋하지 마세요!

---

## 5단계: 관리자 계정 생성

### 5.1 첫 번째 관리자 사용자 생성

Supabase Dashboard → Authentication → Users → "Add user"

1. Email 입력
2. Password 입력
3. "Auto Confirm User" ✅ 체크
4. "Create user" 클릭

### 5.2 관리자 프로필 생성

SQL Editor에서 실행 (위에서 생성한 사용자의 UUID로 교체):

```sql
-- 사용자 UUID 확인
SELECT id, email FROM auth.users;

-- admin_profiles에 추가 (UUID를 실제 값으로 교체)
INSERT INTO admin_profiles (id, email, role, display_name)
VALUES (
  '여기에_사용자_UUID_붙여넣기',
  'admin@example.com',
  'super_admin',
  '관리자'
);
```

---

## 6단계: 로컬 테스트

### 6.1 개발 서버 시작

```bash
npm run dev
```

### 6.2 접속 테스트

1. **공개 페이지**: http://localhost:3000
2. **관리자 로그인**: http://localhost:3000/admin/login
3. 5.1에서 생성한 이메일/비밀번호로 로그인

### 6.3 기능 테스트

로그인 후 다음 기능 테스트:

- ✅ `/admin/sections` - 섹션 수정
- ✅ `/admin/campaigns` - 캠페인 추가
- ✅ `/admin/partners` - 파트너 추가
- ✅ `/admin/media` - 이미지 업로드
- ✅ `/admin/inquiries` - 문의 확인
- ✅ `/admin/seo` - SEO 설정
- ✅ `/admin/settings` - 사이트 설정

---

## 7단계: 프로덕션 배포 (Vercel)

### 7.1 GitHub Repository 생성

```bash
git init
git add .
git commit -m "Initial commit: CHERRY for PET MVP"
git branch -M main
git remote add origin https://github.com/your-username/cherry-for-pet.git
git push -u origin main
```

### 7.2 Vercel 배포

1. [Vercel](https://vercel.com) 접속 및 로그인
2. "New Project" 클릭
3. GitHub repository 선택
4. Environment Variables 설정:
   ```
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   ```
5. "Deploy" 클릭

### 7.3 도메인 설정

Vercel Dashboard → Project → Settings → Domains

1. 커스텀 도메인 추가 (예: cherry4pet.com)
2. DNS 설정 (Vercel이 안내하는 대로 진행)
3. SSL 자동 적용 확인

### 7.4 프로덕션 환경변수 업데이트

`.env.local` 파일의 `NEXT_PUBLIC_SITE_URL`을 실제 도메인으로 변경:

```env
NEXT_PUBLIC_SITE_URL=https://cherry4pet.com
```

---

## 8단계: Supabase URL 허용 목록 설정

Supabase Dashboard → Authentication → URL Configuration

**Redirect URLs**에 추가:
```
http://localhost:3000/**
https://your-domain.vercel.app/**
https://cherry4pet.com/**
```

---

## 트러블슈팅

### 문제: "Invalid JWT" 오류

**원인**: 환경변수가 제대로 설정되지 않음

**해결**:
1. `.env.local` 파일 확인
2. 개발 서버 재시작 (`npm run dev`)

### 문제: 이미지 업로드 실패

**원인**: Storage 정책이 제대로 설정되지 않음

**해결**:
1. Storage RLS 정책 재확인 (3.2 단계)
2. `public-assets` bucket이 Public인지 확인

### 문제: 관리자 로그인 후 접근 불가

**원인**: `admin_profiles` 테이블에 사용자가 없음

**해결**:
1. 5.2 단계 다시 실행
2. 사용자 UUID와 admin_profiles의 id가 일치하는지 확인

### 문제: "Row Level Security" 오류

**원인**: RLS 정책이 활성화되었지만 정책이 없음

**해결**:
1. `supabase/policies.sql` 파일 다시 실행
2. Table Editor에서 각 테이블의 RLS 상태 확인

---

## 다음 단계

### 데이터 입력

1. `/admin/sections` - Hero, Why PET 섹션 수정
2. `/admin/campaigns` - 실제 캠페인 3-6개 추가
3. `/admin/partners` - 파트너 로고 및 정보 추가
4. `/admin/media` - 고품질 이미지 업로드
5. `/admin/seo` - 메타 태그 최적화
6. `/admin/settings` - 실제 로고, SNS 링크 설정

### 선택 사항

- Contact 폼 실제 작동 (Resend API 연동)
- Stories 상세 페이지 구현
- Partners 상세 페이지 구현
- Google Analytics 연동
- 성능 최적화 (이미지 WebP 변환 등)

---

## 지원

문제가 발생하면 다음을 확인하세요:

1. [Supabase 공식 문서](https://supabase.com/docs)
2. [Next.js 공식 문서](https://nextjs.org/docs)
3. 프로젝트 README.md
4. DEPLOYMENT_CHECKLIST.md

---

**설정 완료!** 🎉

CHERRY for PET 관리자 CMS가 성공적으로 설정되었습니다.
