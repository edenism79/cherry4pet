# CHERRY Photo 섹션 이미지 생성 가이드

## AI 이미지 생성 프롬프트 (한글)

```
행복한 젊은 여성과 귀여운 골든 리트리버가 함께 밝고 화려한 포토부스에서 
셀카를 찍고 있는 모습. 둘 다 활짝 웃으며 카메라를 바라보고 있음. 
배경에는 하트와 별 모양의 귀여운 소품들이 있고, 밝고 따뜻한 조명. 
자연스럽고 생동감 넘치는 분위기. 현대적이고 세련된 포토부스 스타일. 
고품질, 사진 같은 리얼리즘, 밝고 경쾌한 톤.
```

## AI 이미지 생성 프롬프트 (영문 - DALL-E, Midjourney용)

```
A joyful young woman and an adorable golden retriever taking a selfie 
together in a bright, colorful photo booth. Both smiling happily at the 
camera. Background features cute props like hearts and stars, with warm 
bright lighting. Natural and energetic atmosphere. Modern and stylish 
photo booth aesthetic. High quality, photorealistic, bright and cheerful 
tone. Professional photography style.
```

## Midjourney 전용 프롬프트

```
happy young woman and golden retriever dog taking selfie in photo booth, 
both smiling at camera, colorful background with hearts and stars props, 
warm bright lighting, energetic atmosphere, modern photo booth style, 
photorealistic, bright cheerful tone, professional photography --ar 1:1 
--style raw --v 6
```

## 이미지 사양
- **비율**: 1:1 (정사각형)
- **권장 크기**: 800x800px 이상
- **형식**: JPG 또는 PNG
- **톤**: 밝고 따뜻하며 행복한 분위기
- **주요 요소**: 
  - 반려동물 (강아지 또는 고양이)
  - 보호자 (행복한 표정)
  - 포토부스 배경 (소품, 조명)
  - 자연스러운 포즈

## 이미지 생성 방법

### 옵션 1: DALL-E 3 (ChatGPT Plus/Pro)
1. ChatGPT에 접속
2. 위의 영문 프롬프트 입력
3. 생성된 이미지 다운로드

### 옵션 2: Midjourney
1. Discord에서 Midjourney 접속
2. `/imagine` 명령어와 함께 Midjourney 프롬프트 입력
3. 생성된 이미지 중 마음에 드는 것 선택 후 Upscale
4. 다운로드

### 옵션 3: 무료 대안
- **Leonardo.ai**: https://leonardo.ai (무료 크레딧 제공)
- **Playground AI**: https://playground.com
- **Lexica.art**: 기존 AI 생성 이미지 검색

## 이미지 적용 방법

### 방법 1: 코드에서 직접 변경
`components/landing/CherryPhotoSection.tsx` 파일에서:

```typescript
const PHOTO_BOOTH_IMAGE = '생성한_이미지_URL'
```

### 방법 2: 미디어 라이브러리에 업로드
1. `/admin/media` 접속
2. 생성한 이미지 업로드
3. URL 복사
4. 위의 코드에 URL 붙여넣기

## 대체 이미지 소스
무료 스톡 이미지 사이트에서 유사한 이미지 검색:
- **Unsplash**: https://unsplash.com/s/photos/dog-selfie
- **Pexels**: https://pexels.com/search/pet-photo-booth
- **Pixabay**: https://pixabay.com

검색 키워드: "dog selfie", "pet photo booth", "happy dog owner"
