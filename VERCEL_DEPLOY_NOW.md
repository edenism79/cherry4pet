# 🚀 Vercel 배포 시작!

## ✅ Step 1: GitHub 업로드 완료!

코드가 성공적으로 GitHub에 업로드되었습니다:
https://github.com/edenism79/cherry4pet

---

## 📌 Step 2: Vercel 배포 (지금 바로 하세요!)

### 1. Vercel 접속
https://vercel.com

### 2. 로그인
- **Continue with GitHub** 클릭
- GitHub 계정(edenism79@gmail.com)으로 로그인

### 3. 프로젝트 Import
- **Add New...** → **Project** 클릭
- 또는 https://vercel.com/new 직접 접속

### 4. 저장소 선택
- `edenism79/cherry4pet` 저장소 찾기
- **Import** 클릭

### 5. 프로젝트 설정

**Configure Project** 화면에서:

#### Framework Preset
- ✅ Next.js (자동 감지됨)

#### Root Directory
- ✅ `./` (기본값)

#### Build Settings
- Build Command: `npm run build` (기본값)
- Output Directory: `.next` (기본값)

### 6. 환경변수 추가 ⚠️ 중요!

**Environment Variables** 섹션에서 다음을 추가:

```
NEXT_PUBLIC_SUPABASE_URL
https://axjeomgrityxoatzpgid.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4amVvbWdyaXR5eG9hdHpwZ2lkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0NzY1ODIsImV4cCI6MjA5OTA1MjU4Mn0.Zl6papnBqoGVp-SamO7wQbQ9TxvQiSujG4QIf7YiEIc

SUPABASE_SERVICE_ROLE_KEY
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4amVvbWdyaXR5eG9hdHpwZ2lkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzQ3NjU4MiwiZXhwIjoyMDk5MDUyNTgyfQ.xjg4IGgL6wEjN3eVHp7rJWlqCDjoM7WXC3iteFAMcLo

NEXT_PUBLIC_SITE_URL
https://cherry4pet.com
```

#### 환경변수 입력 방법:
1. **Key** 입력: `NEXT_PUBLIC_SUPABASE_URL`
2. **Value** 입력: URL 또는 키 붙여넣기
3. **Add** 클릭
4. 4개 모두 반복

### 7. 배포 시작!
- **Deploy** 버튼 클릭!
- 빌드 진행 중... (약 2-5분)

---

## ⏳ 배포 진행 중

빌드가 완료되면:
- ✅ Vercel URL 생성 (예: `cherry4pet.vercel.app`)
- ✅ 자동으로 HTTPS 적용
- ✅ 자동 배포 성공 알림

---

## 📋 다음 단계: 커스텀 도메인 연결

배포가 완료되면 알려주세요!
다음 단계로 `cherry4pet.com` 도메인을 연결하겠습니다.

---

## 🆘 문제 발생 시

### 빌드 실패
- 빌드 로그 확인
- 환경변수가 모두 입력되었는지 확인

### 환경변수 누락
- Settings → Environment Variables에서 추가
- Redeploy 필요

---

**지금 바로 Vercel 배포를 시작하세요!** 🚀

완료되면 Vercel URL을 알려주세요!
