# ⚡ 빠른 배포 가이드 (cherry4pet.com)

## 🚀 5분 배포

### Step 1: GitHub에 코드 업로드 (2분)

```bash
# Git 저장소 초기화 (처음만)
git init
git add .
git commit -m "CHERRY for PET MVP"

# GitHub 저장소 생성 후 연결
git remote add origin https://github.com/YOUR_USERNAME/cherry4pet.git
git branch -M main
git push -u origin main
```

### Step 2: Vercel 배포 (2분)

1. https://vercel.com 접속
2. GitHub 계정으로 로그인
3. **New Project** 클릭
4. `cherry4pet` 저장소 선택
5. **Environment Variables** 추가:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://axjeomgrityxoatzpgid.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=(Supabase anon key)
   SUPABASE_SERVICE_ROLE_KEY=(Supabase service role key)
   NEXT_PUBLIC_SITE_URL=https://cherry4pet.com
   ```
6. **Deploy** 클릭!

### Step 3: Cafe24 DNS 설정 (1분)

#### 방법 A: DNS 레코드 설정 (권장)

Cafe24 → 도메인 관리 → cherry4pet.com → DNS 설정

| 타입 | 호스트 | 값 |
|------|--------|-----|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

#### 방법 B: 네임서버 변경

Cafe24 → 네임서버 설정:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

### Step 4: Vercel에 도메인 추가

1. Vercel 프로젝트 → **Settings** → **Domains**
2. `cherry4pet.com` 입력 → **Add**
3. `www.cherry4pet.com` 입력 → **Add**

---

## ✅ 완료!

24-48시간 후:
- 🌐 https://cherry4pet.com
- 🔐 https://cherry4pet.com/admin/login

---

## 🎯 Admin 페이지

도메인 연결 후 자동으로 사용 가능:
- https://cherry4pet.com/admin/login
- https://cherry4pet.com/admin
- https://cherry4pet.com/admin/campaigns
- https://cherry4pet.com/admin/settings

별도 설정 불필요!

---

## 📞 지원

문제 발생 시: `DEPLOYMENT_GUIDE.md` 참고
