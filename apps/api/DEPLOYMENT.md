# 🚀 무료 배포 가이드

이 프로젝트는 **완전 무료**로 배포할 수 있습니다! 다음 가이드를 따라하세요.

## 📋 사전 준비

### 1. GitHub 저장소 생성

1. GitHub에 로그인
2. 새 저장소 생성 (예: `game-portal`)
3. 코드 푸시

### 2. 무료 도구들

- **GitHub**: 코드 저장소 (무료)
- **Vercel**: 프론트엔드 호스팅 (무료)
- **Railway**: 백엔드 호스팅 (무료)
- **Supabase**: PostgreSQL 데이터베이스 (무료)

## 🌐 프론트엔드 배포 (Vercel)

### 1. Vercel 계정 생성

1. [vercel.com](https://vercel.com) 방문
2. GitHub 계정으로 로그인

### 2. 프로젝트 배포

1. Vercel 대시보드에서 "New Project" 클릭
2. GitHub 저장소 선택
3. 프레임워크: Next.js 자동 감지
4. "Deploy" 클릭

### 3. 환경변수 설정

```bash
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
```

## 🔧 백엔드 배포 (Railway)

### 1. Railway 계정 생성

1. [railway.app](https://railway.app) 방문
2. GitHub 계정으로 로그인

### 2. 프로젝트 배포

1. "New Project" 클릭
2. "Deploy from GitHub repo" 선택
3. 저장소 선택
4. API 디렉토리 선택: `apps/api`

### 3. 환경변수 설정

Supabase Dashboard > **Project Settings > Database > Connection string (JDBC)** 에서 값을 확인합니다.

```bash
DATABASE_URL=jdbc:postgresql://db.YOUR_PROJECT_REF.supabase.co:5432/postgres?sslmode=require
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your-supabase-database-password
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRATION=86400000
```

### 4. 포트 설정

Railway는 자동으로 `PORT` 환경변수를 제공합니다.

## 🔗 프론트엔드와 백엔드 연결

### 1. CORS 설정 확인

백엔드의 `SecurityConfig.kt`에서 프론트엔드 URL 허용:

```kotlin
@CrossOrigin(origins = ["https://your-frontend-url.vercel.app"])
```

### 2. API URL 업데이트

프론트엔드에서 백엔드 URL을 환경변수로 설정:

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
```

## 💰 무료 호스팅 한도

### Vercel (프론트엔드)

- ✅ 무제한 무료 배포
- ✅ 무제한 대역폭
- ✅ 자동 HTTPS
- ✅ 글로벌 CDN

### Railway (백엔드)

- ✅ 월 500시간 무료
- ✅ 512MB RAM
- ✅ 1GB 디스크
- ✅ 자동 HTTPS

### H2 Database

- ✅ 인메모리 데이터베이스
- ✅ 별도 설치 불필요
- ✅ 애플리케이션 재시작 시 데이터 초기화

## 🔄 데이터 지속성

H2 인메모리 데이터베이스는 애플리케이션 재시작 시 데이터가 초기화됩니다.
무료 환경에서는 이 제한을 받아들여야 합니다.

### 대안 (유료)

- **Railway PostgreSQL**: 월 $5
- **Supabase**: 무료 티어 있음
- **PlanetScale**: 무료 티어 있음

## 🚨 주의사항

1. **JWT Secret**: 프로덕션에서는 강력한 비밀키 사용
2. **CORS**: 정확한 프론트엔드 URL 설정
3. **환경변수**: 민감한 정보는 환경변수로 관리
4. **데이터 백업**: H2 사용 시 데이터 손실 가능성 있음

## 📊 모니터링

### Vercel

- 배포 상태 확인
- 성능 메트릭
- 에러 로그

### Railway

- 애플리케이션 로그
- 리소스 사용량
- 배포 상태

## 🔧 문제 해결

### 일반적인 문제들

1. **CORS 에러**

   - 백엔드 CORS 설정 확인
   - 프론트엔드 URL 정확성 확인

2. **API 연결 실패**

   - 백엔드 URL 확인
   - 환경변수 설정 확인

3. **빌드 실패**
   - Java 17 설치 확인
   - Gradle 버전 확인

## 📞 지원

문제가 발생하면:

1. GitHub Issues 생성
2. 로그 확인
3. 환경변수 재확인

---

**🎉 축하합니다! 이제 완전 무료로 게임 포털을 운영할 수 있습니다!**
