# Claude Code 개발 지시문

# CHERRY for PET Landing + Admin CMS MVP

## 0. 프로젝트 목표

`CHERRY for PET`은 기존 CHERRY 기부 플랫폼의 반려동물 전용 브랜드 랜딩페이지다.

이번 개발의 목표는 **완전한 기부 플랫폼을 새로 만드는 것**이 아니라, 다음 MVP를 완성하는 것이다.

1. 반려동물 전용 기부 브랜드 랜딩페이지
2. 관리자 페이지에서 문구, 이미지, 캠페인, 파트너, CTA 링크 수정 가능
3. 기부 버튼은 기존 CHERRY 캠페인 URL 또는 외부 URL로 연결
4. 결제, 회원가입, 블록체인 기록, 기부금 영수증 기능은 직접 구현하지 않음
5. 향후 CHERRY 본 플랫폼 API 연동이 가능하도록 데이터 구조를 분리

---

## 1. 핵심 개발 방향

다음 원칙을 반드시 지켜라.

* 랜딩페이지의 모든 주요 콘텐츠는 하드코딩하지 말고 DB에서 불러오도록 한다.
* 관리자 페이지에서 로고, 히어로 이미지, 섹션 이미지, 캠페인 이미지, 파트너 로고를 교체할 수 있어야 한다.
* 1차 MVP에서는 기부 결제를 직접 구현하지 않고, 캠페인별 `externalUrl`로 이동하게 한다.
* 디자인은 매우 모던하고 신뢰감 있게 만든다.
* 반려동물, 기부, 투명성, 블록체인 기반 CHERRY의 신뢰 이미지를 살린다.
* 모바일 우선 반응형으로 개발한다.
* 관리자 수정 내역은 반드시 `audit_logs`에 남긴다.
* 향후 다국어, 캠페인 상세, API 연동이 가능하도록 확장 가능한 구조로 만든다.

---

## 2. 기술 스택

다음 스택으로 개발하라.

* Framework: Next.js 15 App Router
* Language: TypeScript
* Styling: Tailwind CSS
* UI Library: shadcn/ui
* Database: Supabase PostgreSQL
* Auth: Supabase Auth
* Storage: Supabase Storage
* ORM 또는 DB Client: Supabase client 우선 사용
* Deployment Target: Vercel
* Form Email: Resend 또는 일단 DB 저장 후 추후 연동 가능 구조
* Analytics: Vercel Analytics 또는 GA4 연동 가능 구조

---

## 3. 프로젝트 구조

아래 구조로 생성하라.

```txt
cherry-for-pet/
  app/
    page.tsx
    layout.tsx
    globals.css

    campaigns/
      page.tsx

    stories/
      page.tsx

    partners/
      page.tsx

    contact/
      page.tsx

    admin/
      layout.tsx
      page.tsx
      login/
        page.tsx
      sections/
        page.tsx
      campaigns/
        page.tsx
        new/
          page.tsx
        [id]/
          page.tsx
      partners/
        page.tsx
        new/
          page.tsx
        [id]/
          page.tsx
      media/
        page.tsx
      inquiries/
        page.tsx
      seo/
        page.tsx
      settings/
        page.tsx

  components/
    landing/
      HeroSection.tsx
      WhyPetSection.tsx
      HowItWorksSection.tsx
      FeaturedCampaigns.tsx
      TransparencySection.tsx
      CherryPhotoSection.tsx
      PartnersSection.tsx
      ImpactMetricsSection.tsx
      StoriesSection.tsx
      FinalCTASection.tsx
      SiteFooter.tsx

    admin/
      AdminSidebar.tsx
      AdminHeader.tsx
      SectionEditor.tsx
      CampaignForm.tsx
      PartnerForm.tsx
      ImageUploader.tsx
      SeoEditor.tsx

    ui/
      shadcn components

  lib/
    supabase/
      client.ts
      server.ts
      middleware.ts
    auth.ts
    validations.ts
    utils.ts
    audit.ts

  types/
    database.ts
    cms.ts

  supabase/
    schema.sql
    seed.sql
    policies.sql

  public/
    placeholder/
      hero-pet.jpg
      campaign-placeholder.jpg
      partner-placeholder.svg

  middleware.ts
  .env.example
  README.md
```

---

## 4. 공개 랜딩페이지 요구사항

메인 페이지 `/`는 다음 섹션으로 구성하라.

### 4.1 Hero Section

관리자에서 수정 가능한 필드:

* 로고
* 제목
* 서브타이틀
* 설명 문구
* 대표 이미지
* CTA 1 라벨
* CTA 1 URL
* CTA 2 라벨
* CTA 2 URL

기본 문구 예시:

```txt
CHERRY for PET

반려동물을 위한 가장 투명한 기부 플랫폼

사진 한 장, 작은 참여, 투명한 기부가 반려동물의 생명을 지킵니다.
```

CTA:

* `지금 기부하기`
* `파트너 문의하기`

---

### 4.2 Why PET Section

반려동물 전용 기부 플랫폼이 필요한 이유를 설명한다.

포함 내용:

* 유기동물 구조
* 치료비 지원
* 보호소 지원
* 입양 연결
* 광견병 예방 및 국제 협력 캠페인
* 기업 CSR/ESG 참여

---

### 4.3 How It Works Section

다음 흐름을 시각적으로 보여준다.

```txt
참여 또는 기부
→ 캠페인 연결
→ 구조/치료/보호 진행
→ 기부금 사용 내역 기록
→ 결과 리포트 공개
```

아이콘 카드 형태로 구현한다.

---

### 4.4 Featured Campaigns Section

캠페인 카드를 3~6개 노출한다.

카드 필드:

* 캠페인 이미지
* 캠페인명
* 단체명
* 요약
* 목표금액
* 현재금액
* 달성률
* D-day
* 카테고리
* 버튼
* 외부 URL

버튼 클릭 시 `externalUrl`로 이동한다.

---

### 4.5 Transparency Section

CHERRY의 핵심 가치인 투명성을 설명한다.

표현 방향:

* 기부금 흐름 공개
* 캠페인별 사용 내역 관리
* 블록체인 기반 기록 가능성
* 기부자에게 결과 리포트 제공
* 보호단체/동물병원/기업이 함께 참여하는 구조

주의:

* 실제 블록체인 API를 구현하지 말 것.
* “연동 예정”, “CHERRY 플랫폼 기반으로 확장 가능”이라는 구조로 표현할 것.

---

### 4.6 CHERRY Photo for PET Section

체리포토 기반 오프라인 참여형 기부 모델을 설명한다.

구성 예시:

```txt
포토부스에서 반려동물과 함께 사진을 촬영하면,
일부 금액이 구조·치료·보호 캠페인에 기부됩니다.
```

---

### 4.7 Partners Section

파트너 로고를 그리드로 노출한다.

파트너 유형:

* 동물병원
* 동물보호단체
* 기업
* 수의사회
* 국제 협력기관
* 브랜드 후원사

관리자에서 로고, 이름, 설명, 링크, 노출 여부를 수정할 수 있어야 한다.

---

### 4.8 Impact Metrics Section

관리자에서 직접 숫자를 입력할 수 있게 한다.

필드 예시:

* 누적 기부금
* 참여자 수
* 지원 캠페인 수
* 구조/치료 동물 수
* 파트너 수

---

### 4.9 Stories Section

초기 MVP에서는 간단한 카드형 소식으로 구현한다.

필드:

* 제목
* 요약
* 이미지
* 작성일
* 링크
* 노출 여부

---

### 4.10 Final CTA Section

마지막 전환 섹션.

문구 예시:

```txt
작은 참여가 한 생명을 지킵니다.
CHERRY for PET과 함께 투명한 반려동물 기부를 시작하세요.
```

CTA:

* `지금 기부하기`
* `파트너로 참여하기`

---

## 5. 관리자 페이지 요구사항

관리자 페이지는 `/admin` 아래에 구현한다.

### 5.1 관리자 인증

* Supabase Auth 사용
* 로그인하지 않은 사용자는 `/admin/login`으로 리다이렉트
* 관리자 role 확인
* role은 `super_admin`, `content_admin`, `viewer`로 구분

권한:

| Role          | 권한                   |
| ------------- | -------------------- |
| super_admin   | 전체 생성, 수정, 삭제, 설정 변경 |
| content_admin | 콘텐츠 생성, 수정           |
| viewer        | 조회만 가능               |

---

### 5.2 Admin Dashboard

`/admin`

표시 항목:

* 전체 캠페인 수
* 공개 캠페인 수
* 문의 수
* 최근 수정 내역
* 최근 등록 캠페인
* 주요 CTA URL 상태

---

### 5.3 Sections 관리

`/admin/sections`

기능:

* Hero, Why, How, Transparency, Cherry Photo, Final CTA 등 섹션 수정
* 제목, 부제목, 본문, 이미지, CTA 라벨, CTA URL 수정
* 노출 여부 설정
* 정렬 순서 설정
* 저장 시 audit log 기록

---

### 5.4 Campaigns 관리

`/admin/campaigns`

기능:

* 캠페인 목록
* 캠페인 생성
* 캠페인 수정
* 캠페인 삭제 또는 비공개
* 대표 캠페인 설정
* 정렬 순서 변경

필드:

```ts
title
organization
summary
imageUrl
goalAmount
raisedAmount
startDate
endDate
externalUrl
category
isFeatured
isVisible
sortOrder
```

---

### 5.5 Partners 관리

`/admin/partners`

기능:

* 파트너 등록
* 로고 업로드
* 유형 선택
* 웹사이트 링크 등록
* 노출 여부 설정
* 정렬 순서 설정

---

### 5.6 Media 관리

`/admin/media`

기능:

* 이미지 업로드
* 이미지 목록 확인
* 이미지 URL 복사
* alt 텍스트 등록
* 사용 중인 이미지 확인
* 삭제는 soft delete 방식

업로드 제한:

* PNG, JPG, JPEG, WebP, SVG
* 최대 5MB
* MIME type 검증
* 파일명은 UUID 기반으로 저장

---

### 5.7 Inquiries 관리

`/admin/inquiries`

문의 폼으로 들어온 내용을 조회한다.

필드:

```ts
type
name
organization
email
phone
message
status
createdAt
```

상태값:

* new
* in_progress
* done

---

### 5.8 SEO 관리

`/admin/seo`

수정 가능 필드:

* site title
* meta description
* keywords
* OG title
* OG description
* OG image
* canonical URL

---

### 5.9 Settings 관리

`/admin/settings`

수정 가능 필드:

* 사이트명
* 로고
* 파비콘
* 대표 CTA URL
* SNS 링크
* 푸터 회사정보
* 개인정보처리방침 URL
* 이용약관 URL
* 사이트 공개 여부

---

## 6. 데이터베이스 스키마

Supabase SQL로 다음 테이블을 생성하라.

### 6.1 admin_profiles

```sql
create table admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null check (role in ('super_admin', 'content_admin', 'viewer')),
  display_name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

---

### 6.2 site_settings

```sql
create table site_settings (
  id uuid primary key default gen_random_uuid(),
  site_name text not null default 'CHERRY for PET',
  logo_url text,
  favicon_url text,
  primary_cta_label text default '지금 기부하기',
  primary_cta_url text,
  footer_company_name text,
  footer_business_info text,
  privacy_url text,
  terms_url text,
  sns_links jsonb default '{}'::jsonb,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

---

### 6.3 landing_sections

```sql
create table landing_sections (
  id uuid primary key default gen_random_uuid(),
  section_key text not null unique,
  title text,
  subtitle text,
  body text,
  image_url text,
  cta_label text,
  cta_url text,
  extra jsonb default '{}'::jsonb,
  sort_order int default 0,
  is_visible boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

---

### 6.4 campaigns

```sql
create table campaigns (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  organization text,
  summary text,
  image_url text,
  goal_amount numeric default 0,
  raised_amount numeric default 0,
  start_date date,
  end_date date,
  external_url text,
  category text,
  is_featured boolean default false,
  is_visible boolean default true,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

---

### 6.5 partners

```sql
create table partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text,
  logo_url text,
  website_url text,
  description text,
  is_visible boolean default true,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

---

### 6.6 stories

```sql
create table stories (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text,
  image_url text,
  link_url text,
  published_at date,
  is_visible boolean default true,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

---

### 6.7 inquiries

```sql
create table inquiries (
  id uuid primary key default gen_random_uuid(),
  type text not null default 'general',
  name text not null,
  organization text,
  email text not null,
  phone text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'in_progress', 'done')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

---

### 6.8 media_assets

```sql
create table media_assets (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  file_url text not null,
  mime_type text,
  size_bytes bigint,
  alt_text text,
  bucket text default 'public-assets',
  is_deleted boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

---

### 6.9 audit_logs

```sql
create table audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  action text not null,
  target_table text not null,
  target_id uuid,
  before_data jsonb,
  after_data jsonb,
  created_at timestamptz default now()
);
```

---

## 7. Seed 데이터

초기 랜딩이 비어 보이지 않도록 `seed.sql`을 작성하라.

포함할 기본 섹션:

* hero
* why_pet
* how_it_works
* transparency
* cherry_photo
* partners
* impact
* final_cta

초기 캠페인 예시 3개:

1. 구조견 치료비 지원 캠페인
2. 유기묘 보호소 사료 지원 캠페인
3. 아시아 광견병 예방 캠페인

초기 파트너 예시:

1. CHERRY
2. EasyPet
3. CHERRY for PET
4. Animal Hospital Partner
5. Rescue Organization Partner

단, 실제 로고는 placeholder를 사용하고, 관리자에서 교체 가능하게 한다.

---

## 8. 디자인 요구사항

디자인은 평범한 템플릿처럼 만들지 말고, 글로벌 브랜드 랜딩페이지 수준으로 제작하라.

### 8.1 톤앤매너

* 따뜻함
* 투명성
* 신뢰감
* 기술 기반 기부
* 반려동물 보호
* 프리미엄 CSR 브랜드

### 8.2 색상

기본 팔레트:

```txt
Cherry Red: #E9415A
Deep Cherry: #B91C3B
Warm Cream: #FFF7F2
Soft Pink: #FFE4EA
Dark Text: #1F2937
Muted Text: #6B7280
White: #FFFFFF
```

### 8.3 UI 스타일

* 넓은 여백
* 큰 타이포그래피
* 둥근 카드
* 부드러운 그림자
* 마이크로 인터랙션
* 모바일 CTA 고정 버튼
* 카드 hover 효과
* 캠페인 달성률 progress bar
* 반려동물 감성 이미지 영역

---

## 9. 보안 요구사항

반드시 구현하라.

* Supabase RLS 정책 적용
* 관리자 권한 서버 사이드 검증
* 이미지 업로드 MIME 검증
* 파일 크기 제한
* 문의 폼 rate limit 구조
* 관리자 라우트 보호
* 환경변수 `.env.local` 사용
* service role key는 클라이언트에 노출 금지
* 모든 create/update/delete는 audit log 기록
* 삭제는 가능하면 soft delete 우선

---

## 10. 환경변수

`.env.example`을 반드시 작성하라.

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

NEXT_PUBLIC_SITE_URL=http://localhost:3000

RESEND_API_KEY=
ADMIN_EMAIL=
```

---

## 11. Supabase Storage

버킷명:

```txt
public-assets
```

정책:

* 공개 읽기 가능
* 업로드/수정/삭제는 관리자만 가능
* 이미지 파일만 허용

---

## 12. 컴포넌트 요구사항

### 12.1 ImageUploader

기능:

* drag and drop
* 파일 선택
* 업로드 진행률
* 업로드 성공 후 URL 반환
* alt text 입력
* 미리보기
* 오류 메시지 표시

---

### 12.2 CampaignCard

표시:

* 이미지
* 카테고리 badge
* 제목
* 단체명
* 요약
* 달성률
* 현재금액 / 목표금액
* D-day
* CTA 버튼

---

### 12.3 AdminForm

공통 요구:

* React Hook Form 사용
* Zod validation 사용
* 저장 중 loading 상태
* 저장 성공 toast
* 저장 실패 toast
* viewer role은 저장 버튼 비활성화

---

## 13. 유효성 검증

Zod schema를 작성하라.

검증 예시:

* title: required
* email: email format
* externalUrl: URL format
* goalAmount: 0 이상
* raisedAmount: 0 이상
* imageUrl: optional URL
* sortOrder: number
* status: enum

---

## 14. SEO 요구사항

`generateMetadata`를 사용하라.

기본 메타:

```txt
title: CHERRY for PET | 반려동물을 위한 투명한 기부 플랫폼
description: CHERRY for PET은 구조, 치료, 보호, 입양을 위한 반려동물 전용 기부 브랜드입니다.
```

OG 이미지도 관리자에서 교체 가능하도록 한다.

---

## 15. 접근성 요구사항

* 모든 이미지에 alt 적용
* 버튼에 명확한 label 적용
* 키보드 포커스 스타일 제공
* 명도 대비 확보
* form input label 필수
* aria-invalid, aria-describedby 적용

---

## 16. 성능 요구사항

* Next/Image 사용
* 이미지 lazy loading
* Server Component 우선
* 관리자 폼만 Client Component 사용
* LCP 이미지 priority 적용
* 캠페인 카드는 필요한 데이터만 조회
* 불필요한 JS 최소화

---

## 17. README 작성 요구사항

README.md에는 다음을 포함하라.

1. 프로젝트 소개
2. 기술 스택
3. 로컬 실행 방법
4. 환경변수 설정 방법
5. Supabase 세팅 방법
6. DB schema 적용 방법
7. Storage bucket 생성 방법
8. 관리자 계정 생성 방법
9. Vercel 배포 방법
10. 운영자가 콘텐츠를 수정하는 방법
11. 보안 주의사항
12. 향후 개발 로드맵

---

## 18. 개발 완료 기준

다음 조건을 만족하면 MVP 완료로 본다.

* `/` 랜딩페이지가 정상 표시된다.
* 모든 주요 섹션이 DB 데이터 기반으로 렌더링된다.
* `/admin/login`에서 로그인 가능하다.
* `/admin` 접근 제어가 작동한다.
* 관리자에서 Hero 문구와 이미지를 수정하면 공개 페이지에 반영된다.
* 관리자에서 캠페인을 추가하면 공개 페이지에 카드가 노출된다.
* 관리자에서 파트너 로고를 추가하면 공개 페이지에 노출된다.
* 문의 폼 제출 시 DB에 저장된다.
* 이미지 업로드가 가능하다.
* SEO 정보 수정이 가능하다.
* audit log가 기록된다.
* 모바일 화면에서 정상 작동한다.
* README만 보고 로컬 실행과 배포가 가능하다.

---

## 19. 금지사항

다음은 하지 마라.

* 기부 결제 기능을 직접 구현하지 마라.
* 블록체인 기록 기능을 직접 구현하지 마라.
* 관리자 수정 콘텐츠를 코드에 하드코딩하지 마라.
* service role key를 클라이언트에 노출하지 마라.
* 인증 없는 사용자가 `/admin`에 접근 가능하게 하지 마라.
* 이미지 업로드 파일 검증 없이 저장하지 마라.
* placeholder 이미지를 최종 이미지처럼 고정하지 마라.
* 랜딩페이지를 단순 템플릿 수준으로 만들지 마라.

---

## 20. 최종 산출물

개발이 끝나면 다음을 제공하라.

1. 전체 프로젝트 코드
2. Supabase schema.sql
3. Supabase seed.sql
4. Supabase policies.sql
5. .env.example
6. README.md
7. 관리자 사용 매뉴얼
8. 배포 체크리스트
9. 향후 CHERRY 본 플랫폼 API 연동 계획
10. 알려진 한계와 추가 개발 항목

---

## 21. 첫 작업 순서

다음 순서대로 진행하라.

1. Next.js 프로젝트 생성
2. Tailwind CSS, shadcn/ui 설정
3. Supabase client/server 설정
4. DB schema.sql 작성
5. seed.sql 작성
6. 공개 랜딩페이지 구현
7. 관리자 로그인 구현
8. 관리자 레이아웃 구현
9. Sections CMS 구현
10. Campaign CMS 구현
11. Partner CMS 구현
12. Media upload 구현
13. Inquiry form 구현
14. SEO 관리 구현
15. audit log 구현
16. README 작성
17. 로컬 테스트
18. Vercel 배포 준비

각 단계가 끝날 때마다 다음을 보고하라.

* 완료한 파일 목록
* 구현한 기능
* 남은 작업
* 실행 방법
* 테스트 방법
* 발견된 문제
