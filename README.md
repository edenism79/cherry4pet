# CHERRY for PET - 랜딩페이지 + 관리자 CMS MVP

반려동물을 위한 투명한 기부 플랫폼 **CHERRY for PET**의 랜딩페이지와 관리자 CMS 시스템입니다.

## 📋 프로젝트 개요

이 프로젝트는 **결제 기능을 직접 구현하지 않고**, 관리자가 콘텐츠(섹션, 캠페인, 파트너, 이미지 등)를 자유롭게 수정할 수 있는 **MVP(Minimum Viable Product)**입니다.

### 주요 기능

✅ **공개 랜딩페이지**
- Hero 섹션 (제목, 이미지, CTA)
- Why PET 섹션 (반려동물 기부 필요성)
- 진행 중인 캠페인 카드
- 파트너 로고 그리드
- 푸터 (SNS 링크, 회사 정보)

✅ **관리자 CMS**
- 로그인/로그아웃
- 대시보드 (통계 요약)
- 섹션 관리 (Hero, Why, 기타 섹션 편집)
- 캠페인 관리 (CRUD, 외부 URL 연결)
- 파트너 관리 (로고 업로드, 노출 제어)
- 미디어 관리 (이미지 업로드)
- 문의 관리
- SEO 설정
- 사이트 설정

✅ **데이터베이스**
- Supabase PostgreSQL
- Row Level Security (RLS) 적용
- 역할 기반 권한 제어 (super_admin, content_admin, viewer)
- Audit Log 자동 기록

## 🛠 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Database | Supabase PostgreSQL |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| Deployment | Vercel |

## 📁 프로젝트 구조

```
cherry4pet/
├── app/
│   ├── page.tsx                    # 메인 랜딩페이지
│   ├── layout.tsx
│   ├── globals.css
│   ├── admin/
│   │   ├── layout.tsx              # 관리자 레이아웃
│   │   ├── page.tsx                # 관리자 대시보드
│   │   ├── login/page.tsx          # 관리자 로그인
│   │   ├── sections/               # 섹션 관리
│   │   ├── campaigns/              # 캠페인 관리
│   │   ├── partners/               # 파트너 관리
│   │   ├── media/                  # 미디어 관리
│   │   ├── inquiries/              # 문의 관리
│   │   ├── seo/                    # SEO 관리
│   │   └── settings/               # 사이트 설정
│   └── ...
├── components/
│   ├── landing/                    # 랜딩페이지 컴포넌트
│   │   ├── HeroSection.tsx
│   │   ├── WhyPetSection.tsx
│   │   ├── FeaturedCampaigns.tsx
│   │   ├── PartnersSection.tsx
│   │   └── SiteFooter.tsx
│   ├── admin/                      # 관리자 컴포넌트
│   │   ├── AdminSidebar.tsx
│   │   ├── AdminHeader.tsx
│   │   └── ...
│   └── ui/                         # shadcn/ui 컴포넌트
├── lib/
│   ├── supabase/
│   │   ├── client.ts               # 클라이언트 사이드
│   │   ├── server.ts               # 서버 사이드
│   │   └── middleware.ts           # 인증 미들웨어
│   ├── auth.ts                     # 인증 유틸리티
│   ├── audit.ts                    # 감사 로그
│   ├── validations.ts              # Zod 스키마
│   └── utils.ts                    # 유틸리티 함수
├── types/
│   ├── database.ts                 # DB 타입 정의
│   └── cms.ts                      # CMS 타입 정의
├── supabase/
│   ├── schema.sql                  # DB 스키마
│   ├── seed.sql                    # 초기 데이터
│   └── policies.sql                # RLS 정책
├── public/
│   └── placeholder/                # 플레이스홀더 이미지
├── .env.example                    # 환경변수 예시
└── README.md
```

## 🚀 로컬 실행 방법

### 1. 프로젝트 클론

```bash
git clone <repository-url>
cd cherry4pet
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경변수 설정

`.env.local` 파일을 생성하고 다음 내용을 입력하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Supabase 설정

#### 4.1 Supabase 프로젝트 생성
1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. 프로젝트 URL과 API Keys를 `.env.local`에 입력

#### 4.2 데이터베이스 스키마 적용
Supabase SQL Editor에서 다음 순서로 실행:

```sql
-- 1. schema.sql (테이블 생성)
-- 2. seed.sql (초기 데이터)
-- 3. policies.sql (RLS 정책)
```

#### 4.3 Storage Bucket 생성
1. Supabase Dashboard → Storage
2. `public-assets` 버킷 생성
3. Public 설정 활성화
4. 정책 추가:
   - 읽기: 모든 사용자
   - 쓰기/수정/삭제: 인증된 관리자만

### 5. 관리자 계정 생성

Supabase Authentication에서 관리자 계정 생성:

```sql
-- 1. Supabase Auth UI에서 사용자 생성
-- 2. SQL Editor에서 admin_profiles에 등록

insert into admin_profiles (id, email, role, display_name)
values (
  'auth-user-id',  -- Supabase Auth에서 생성된 UUID
  'admin@cherry4pet.com',
  'super_admin',
  '관리자'
);
```

### 6. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 다음 주소로 접속:
- 공개 페이지: http://localhost:3000
- 관리자 페이지: http://localhost:3000/admin

## 📝 관리자 사용 가이드

### 로그인
1. `/admin/login` 접속
2. Supabase Auth에 등록된 관리자 계정으로 로그인

### 섹션 관리
1. 사이드바 → "섹션 관리"
2. Hero, Why PET 등 각 섹션의 제목, 이미지, CTA 수정
3. 저장 시 자동으로 audit log 기록

### 캠페인 추가
1. 사이드바 → "캠페인 관리" → "새 캠페인"
2. 제목, 단체명, 요약, 목표금액, 현재금액 입력
3. **외부 URL** 설정 (기부 버튼 클릭 시 이동할 URL)
4. 대표 캠페인 설정 (메인 페이지 노출)

### 파트너 추가
1. 사이드바 → "파트너 관리" → "새 파트너"
2. 파트너명, 유형, 웹사이트 URL 입력
3. 로고 이미지 업로드
4. 노출 여부 및 정렬 순서 설정

### 이미지 업로드
1. 사이드바 → "미디어 관리"
2. 이미지 업로드 (PNG, JPG, WebP, SVG, 최대 5MB)
3. 업로드된 이미지 URL 복사
4. 섹션/캠페인/파트너 편집 시 URL 입력

## 🔒 보안 주의사항

- ✅ Row Level Security (RLS) 적용됨
- ✅ 관리자 권한은 서버 사이드에서 검증
- ✅ 이미지 업로드 시 MIME 타입 검증
- ✅ Service Role Key는 서버 환경에만 사용
- ⚠️ `.env.local` 파일은 절대 커밋하지 마세요
- ⚠️ 운영 환경에서는 Vercel Environment Variables 사용

## 🚢 Vercel 배포 방법

### 1. GitHub Repository 연결
1. 코드를 GitHub에 푸시
2. [Vercel](https://vercel.com) 로그인
3. "New Project" → GitHub Repository 선택

### 2. 환경변수 설정
Vercel Project Settings → Environment Variables에 추가:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_SITE_URL
```

### 3. 배포
- `main` 브랜치에 푸시하면 자동 배포
- Preview 배포: PR 생성 시 자동 생성

## 🔄 향후 개발 로드맵

### Phase 1: 현재 MVP ✅
- 랜딩페이지
- 관리자 CMS
- 외부 URL 연동

### Phase 2: CHERRY 플랫폼 연동 🔜
- CHERRY API 연동
- 실시간 기부금 동기화
- 블록체인 기록 조회
- 기부자 대시보드

### Phase 3: 고도화 🔜
- 다국어 지원 (i18n)
- 캠페인 상세 페이지
- 스토리 콘텐츠 확장
- Impact Metrics 자동화
- 이메일 알림 (Resend)
- Analytics 대시보드

## 📊 권한 체계

| Role | 권한 |
|------|------|
| **super_admin** | 모든 생성/수정/삭제/설정 변경 |
| **content_admin** | 콘텐츠 생성/수정 (설정 변경 불가) |
| **viewer** | 조회만 가능 |

## 🐛 알려진 한계

1. **기부 결제 미구현**: 외부 URL로 연결만 가능
2. **블록체인 기록 미구현**: 향후 CHERRY API 연동 시 추가 예정
3. **이메일 발송 미구현**: 문의 폼은 DB 저장만 가능
4. **다국어 미지원**: 한국어만 지원
5. **캠페인 상세 페이지 없음**: 외부 URL로만 이동

## 📞 문의 및 지원

- GitHub Issues: [링크]
- 이메일: admin@cherry4pet.com

## 📄 라이선스

Copyright © 2026 CHERRY for PET. All rights reserved.

---

**Made with ❤️ for Pets**
