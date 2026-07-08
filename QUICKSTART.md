# 🚀 CHERRY for PET 빠른 시작 가이드

## 1분 안에 시작하기

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경변수 설정
`.env.local` 파일 생성:
```env
NEXT_PUBLIC_SUPABASE_URL=your-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-key-here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Supabase 설정
1. [Supabase](https://supabase.com)에서 프로젝트 생성
2. SQL Editor에서 실행:
   - `supabase/schema.sql`
   - `supabase/seed.sql`
   - `supabase/policies.sql`

### 4. 관리자 계정 생성
Supabase Auth에서 사용자 생성 후:
```sql
insert into admin_profiles (id, email, role, display_name)
values ('USER_ID', 'admin@test.com', 'super_admin', 'Admin');
```

### 5. 실행
```bash
npm run dev
```

접속:
- 공개: http://localhost:3000
- 관리자: http://localhost:3000/admin

---

완료! 🎉
