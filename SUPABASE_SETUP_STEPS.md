# 🚀 Supabase 프로젝트 생성 가이드

## 1단계: Supabase 대시보드 접속

브라우저가 자동으로 열렸습니다: https://supabase.com/dashboard

### 계정이 없는 경우
1. "Sign Up" 클릭
2. GitHub 계정으로 로그인 (권장) 또는 이메일로 가입
3. 이메일 인증

### 계정이 있는 경우
1. "Sign In" 클릭
2. 로그인

---

## 2단계: 새 프로젝트 생성

1. **"New Project"** 버튼 클릭
   
2. **Organization 선택**
   - 기존 조직 선택 또는 새로 만들기

3. **프로젝트 정보 입력**:
   ```
   Name: cherry-for-pet
   Database Password: [안전한 비밀번호 생성] ⚠️ 반드시 저장!
   Region: Northeast Asia (Seoul) - ap-northeast-2
   Pricing Plan: Free (무료)
   ```

4. **"Create new project"** 클릭

5. **대기** (약 2분)
   - 프로젝트 생성 중...
   - ☕ 커피 한 모금

---

## 3단계: API 키 확인 (프로젝트 생성 완료 후)

프로젝트가 생성되면:

1. **Settings** (왼쪽 사이드바 하단) 클릭

2. **API** 메뉴 클릭

3. **다음 정보 복사**:

   📋 **Project URL**
   ```
   https://xxxxxxxxxxxxx.supabase.co
   ```

   📋 **anon public** key
   ```
   eyJhbGc...매우긴문자열...
   ```

   📋 **service_role** key (⚠️ Show를 클릭해야 보임)
   ```
   eyJhbGc...매우긴문자열...
   ```

---

## 4단계: 환경변수 파일 생성

프로젝트 폴더에서:

1. `.env.example` 파일을 복사하여 `.env.local` 생성

2. `.env.local` 파일 편집:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...여기에_anon_key_붙여넣기...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...여기에_service_role_key_붙여넣기...

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3001

# Email (선택 사항 - 나중에 설정 가능)
RESEND_API_KEY=
ADMIN_EMAIL=
```

3. 파일 저장

---

## 5단계: 데이터베이스 스키마 설정

### A. SQL Editor 열기

1. Supabase Dashboard 좌측 메뉴
2. **SQL Editor** 클릭
3. **"New query"** 클릭

### B. 스키마 파일 실행 (순서대로)

#### ① schema.sql 실행

1. 프로젝트 폴더의 `supabase/schema.sql` 파일 열기
2. 전체 내용 복사 (Ctrl+A, Ctrl+C)
3. SQL Editor에 붙여넣기 (Ctrl+V)
4. **"RUN"** 버튼 클릭 (또는 Ctrl+Enter)
5. ✅ "Success. No rows returned" 확인

#### ② seed.sql 실행

1. `supabase/seed.sql` 파일 열기
2. 전체 내용 복사
3. SQL Editor에 붙여넣기
4. **"RUN"** 클릭
5. ✅ 성공 메시지 확인

#### ③ policies.sql 실행

1. `supabase/policies.sql` 파일 열기
2. 전체 내용 복사
3. SQL Editor에 붙여넣기
4. **"RUN"** 클릭
5. ✅ 성공 메시지 확인

#### ④ migration_add_seo_fields.sql 실행

1. `supabase/migration_add_seo_fields.sql` 파일 열기
2. 전체 내용 복사
3. SQL Editor에 붙여넣기
4. **"RUN"** 클릭
5. ✅ 성공 메시지 확인

---

## 6단계: 테이블 확인

1. 좌측 메뉴 **Table Editor** 클릭
2. 다음 테이블들이 보이는지 확인:
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

## 7단계: Storage Bucket 생성

### A. Storage 메뉴

1. 좌측 메뉴 **Storage** 클릭
2. **"New bucket"** 클릭

### B. Bucket 설정

```
Name: public-assets
Public bucket: ✅ 체크
```

3. **"Create bucket"** 클릭

### C. Storage 정책 설정

1. SQL Editor로 돌아가기
2. 다음 쿼리 실행:

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

4. **"RUN"** 클릭

---

## 8단계: 관리자 계정 생성

### A. 사용자 생성

1. 좌측 메뉴 **Authentication** 클릭
2. **Users** 탭
3. **"Add user"** 버튼 클릭
4. 정보 입력:
   ```
   Email: admin@cherry4pet.com (또는 원하는 이메일)
   Password: [안전한 비밀번호]
   Auto Confirm User: ✅ 체크
   ```
5. **"Create user"** 클릭

### B. 사용자 UUID 확인

1. 방금 생성한 사용자 클릭
2. **UID** 복사 (예: `12345678-1234-1234-1234-123456789abc`)

### C. admin_profiles에 추가

1. SQL Editor로 이동
2. 다음 쿼리 실행 (UUID를 위에서 복사한 것으로 교체):

```sql
-- 사용자 UUID 확인
SELECT id, email FROM auth.users;

-- admin_profiles에 추가 (UUID를 실제 값으로 교체)
INSERT INTO admin_profiles (id, email, role, display_name)
VALUES (
  '여기에_복사한_UUID_붙여넣기',
  'admin@cherry4pet.com',
  'super_admin',
  '관리자'
);
```

3. **"RUN"** 클릭

---

## 9단계: 개발 서버 재시작

터미널에서:

```bash
# 현재 서버 종료 (Ctrl+C)
# 그리고 다시 시작
npm run dev
```

---

## 10단계: 로그인 테스트

1. 브라우저에서 http://localhost:3001/admin/login 접속
2. 8단계에서 생성한 이메일/비밀번호 입력
3. **로그인** 클릭
4. ✅ 대시보드로 이동하면 성공!

---

## 🎉 완료!

### 테스트할 것들

1. **/admin** - 대시보드
2. **/admin/sections** - 섹션 수정
3. **/admin/campaigns** - 캠페인 추가
4. **/admin/partners** - 파트너 추가
5. **/admin/media** - 이미지 업로드
6. **/admin/inquiries** - 문의 확인
7. **/admin/seo** - SEO 설정
8. **/admin/settings** - 사이트 설정

---

## ⚠️ 중요 사항

1. **데이터베이스 비밀번호** - 반드시 안전한 곳에 저장!
2. **service_role key** - 절대 GitHub에 커밋하지 말 것
3. **`.env.local`** - .gitignore에 포함되어 있음 (자동으로 Git에서 제외됨)

---

## 🆘 문제 발생 시

### "Invalid JWT" 오류
- 환경변수를 다시 확인
- 개발 서버 재시작

### 로그인 실패
- Supabase Dashboard → Authentication → Users에서 사용자 확인
- admin_profiles 테이블에 해당 UUID가 있는지 확인

### 이미지 업로드 실패
- Storage bucket이 `public-assets`로 생성되었는지 확인
- Storage 정책이 적용되었는지 확인

---

**완료 체크리스트**:
- [ ] Supabase 프로젝트 생성
- [ ] API 키 복사
- [ ] .env.local 파일 생성
- [ ] schema.sql 실행
- [ ] seed.sql 실행
- [ ] policies.sql 실행
- [ ] migration_add_seo_fields.sql 실행
- [ ] Storage bucket 생성
- [ ] Storage 정책 적용
- [ ] 관리자 계정 생성
- [ ] admin_profiles 레코드 추가
- [ ] 개발 서버 재시작
- [ ] 로그인 테스트

모든 단계를 완료하면 CHERRY for PET이 완전히 작동합니다! 🚀
