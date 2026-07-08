# 🚀 CHERRY for PET 배포 가이드

## 📋 준비사항

### 1. GitHub 저장소 생성
1. https://github.com 접속
2. 새 저장소 생성 (public 또는 private)
3. 저장소명: `cherry4pet` (또는 원하는 이름)

### 2. 로컬 프로젝트를 GitHub에 푸시

```bash
# Git 초기화 (아직 안 했다면)
git init

# .gitignore 확인 (.env.local이 포함되어 있는지 확인)
cat .gitignore

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: CHERRY for PET MVP"

# GitHub 저장소 연결 (본인의 GitHub 주소로 변경)
git remote add origin https://github.com/YOUR_USERNAME/cherry4pet.git

# 푸시
git branch -M main
git push -u origin main
```

---

## 🌐 Vercel 배포

### 1. Vercel 가입 및 프로젝트 연결

1. https://vercel.com 접속
2. **Sign Up** (GitHub 계정으로 가입 권장)
3. **New Project** 클릭
4. **Import Git Repository** - cherry4pet 저장소 선택
5. **Import** 클릭

### 2. 프로젝트 설정

**Framework Preset**: Next.js (자동 감지됨)

**Root Directory**: `./` (기본값)

**Build Command**: `npm run build` (기본값)

**Output Directory**: `.next` (기본값)

### 3. 환경변수 설정

**Environment Variables** 섹션에서 다음을 추가:

```env
NEXT_PUBLIC_SUPABASE_URL=https://axjeomgrityxoatzpgid.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4amVvbWdyaXR5eG9hdHpwZ2lkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0NzY1ODIsImV4cCI6MjA5OTA1MjU4Mn0.Zl6papnBqoGVp-SamO7wQbQ9TxvQiSujG4QIf7YiEIc
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4amVvbWdyaXR5eG9hdHpwZ2lkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzQ3NjU4MiwiZXhwIjoyMDk5MDUyNTgyfQ.xjg4IGgL6wEjN3eVHp7rJWlqCDjoM7WXC3iteFAMcLo
NEXT_PUBLIC_SITE_URL=https://cherry4pet.com
```

⚠️ **주의**: NEXT_PUBLIC_SITE_URL은 배포 후 실제 도메인으로 변경

### 4. 배포 시작

**Deploy** 버튼 클릭!

- 빌드 진행 (약 2-5분)
- 성공하면 Vercel URL 생성 (예: `cherry4pet.vercel.app`)

---

## 🌐 Cafe24 도메인 연결

### 1. Vercel에서 커스텀 도메인 추가

1. Vercel 프로젝트 대시보드
2. **Settings** 탭
3. **Domains** 메뉴
4. **Add** 버튼 클릭
5. 도메인 입력: `cherry4pet.com` 및 `www.cherry4pet.com`
6. **Add** 클릭

Vercel이 제공하는 DNS 레코드 정보를 확인합니다:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 2. Cafe24 DNS 설정

1. Cafe24 로그인
2. **나의 서비스 관리**
3. **도메인 관리**
4. `cherry4pet.com` 선택
5. **DNS 설정** 또는 **네임서버 설정** 클릭

#### 옵션 A: Cafe24 DNS 사용 (권장)

**DNS 레코드 추가**:

| 타입 | 호스트 | 값 | TTL |
|------|--------|-----|-----|
| A | @ | 76.76.21.21 | 3600 |
| CNAME | www | cname.vercel-dns.com | 3600 |

#### 옵션 B: Vercel 네임서버 사용 (더 쉬움)

Cafe24에서 **네임서버 변경**:

```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

⚠️ 네임서버 변경은 24-48시간 소요될 수 있습니다.

### 3. 도메인 전파 대기

- DNS 변경 후 최대 24-48시간 소요
- 빠르면 몇 분 ~ 몇 시간 내 적용
- https://dnschecker.org 에서 전파 상태 확인

---

## 🔐 Admin 페이지 접근

도메인 연결 후 자동으로 다음 경로로 접근 가능:

- **홈페이지**: https://cherry4pet.com
- **관리자 로그인**: https://cherry4pet.com/admin/login
- **관리자 대시보드**: https://cherry4pet.com/admin

별도 설정 불필요! 이미 `/admin` 경로로 구성되어 있습니다.

---

## ✅ 배포 후 확인사항

### 1. Supabase 설정 업데이트

Supabase Dashboard → **Authentication** → **URL Configuration**:

```
Site URL: https://cherry4pet.com
Redirect URLs:
  https://cherry4pet.com
  https://cherry4pet.com/admin
  https://cherry4pet.com/admin/login
```

### 2. 환경변수 업데이트

Vercel Dashboard → **Settings** → **Environment Variables**:

```env
NEXT_PUBLIC_SITE_URL=https://cherry4pet.com
```

변경 후 **Redeploy** 필요!

### 3. 테스트

- ✅ https://cherry4pet.com - 홈페이지 로드
- ✅ https://cherry4pet.com/admin/login - 로그인 작동
- ✅ https://cherry4pet.com/admin - 대시보드 접근
- ✅ 이미지 로드 확인
- ✅ 모든 CMS 기능 테스트

---

## 🔒 SSL 인증서

Vercel이 자동으로 Let's Encrypt SSL 인증서를 발급합니다.

- 도메인 연결 후 자동 생성
- HTTPS 자동 적용
- 인증서 자동 갱신

---

## 📧 이메일 설정 (선택사항)

### Cafe24에서 이메일 계정 생성

1. Cafe24 → 이메일 호스팅
2. `admin@cherry4pet.com` 계정 생성
3. 문의 폼 이메일로 사용

---

## 🚨 문제 해결

### 도메인이 연결되지 않아요

1. DNS 전파 대기 (최대 48시간)
2. https://dnschecker.org 에서 확인
3. 브라우저 캐시 삭제
4. 시크릿 모드로 접속 테스트

### 빌드 실패

1. Vercel 빌드 로그 확인
2. 환경변수 누락 확인
3. TypeScript 오류 확인

### Admin 로그인 안 됨

1. Supabase URL Configuration 확인
2. 환경변수 `NEXT_PUBLIC_SITE_URL` 확인
3. 브라우저 쿠키 삭제 후 재시도

---

## 📞 추가 지원

- Vercel Docs: https://vercel.com/docs
- Cafe24 고객센터: https://help.cafe24.com
- Next.js Deployment: https://nextjs.org/docs/deployment

---

## 🎉 완료!

이제 `cherry4pet.com`으로 접속 가능합니다!

- 🌐 https://cherry4pet.com - 공개 랜딩페이지
- 🔐 https://cherry4pet.com/admin - 관리자 페이지
