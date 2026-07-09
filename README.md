# 게임 포털

Next.js + TypeScript + Kotlin Spring Boot로 구축된 웹게임 포털 사이트입니다. **완전 무료**로 개발 및 배포 가능합니다!

## 🏗️ 아토믹 디자인 구조

```
apps/web/src/
├── components/
│   ├── atoms/           # 원자 컴포넌트 (가장 작은 단위)
│   │   ├── Button/
│   │   ├── Input/
│   │   └── SnakePreview/
│   ├── molecules/       # 분자 컴포넌트 (원자들의 조합)
│   │   ├── AuthForm/
│   │   └── GameCard/
│   ├── organisms/       # 유기체 컴포넌트 (분자들의 조합)
│   │   ├── AuthModal/
│   │   └── GameList/
│   └── templates/       # 템플릿 (페이지 레이아웃)
│       └── HomeTemplate/
├── games/               # 게임 컴포넌트들
│   └── snake/
├── styles/              # 전역 스타일
└── app/                 # Next.js App Router
    ├── games/
    │   └── snake/
    └── page.tsx
```

## 🎮 현재 구현된 게임

### 지렁이 게임

- **기능**: 클래식 스네이크 게임
- **특징**:
  - 방향키로 조작
  - 먹이를 먹어서 성장
  - 100점마다 장애물 생성
  - 30점마다 속도 증가
  - 무채색 디자인

## 🔐 인증 시스템

- **회원가입**: 아이디, 비밀번호, 비밀번호 확인, 비밀번호 힌트
- **로그인**: 아이디, 비밀번호
- **보안**: JWT 토큰 기반 인증, BCrypt 비밀번호 해싱
- **데이터베이스**: Supabase (PostgreSQL)

## 🚀 개발 환경 설정

### 전체 (Turborepo + pnpm)

```bash
# 루트에서 의존성 설치
pnpm install

# 프론트엔드 개발 서버
pnpm dev

# 프론트엔드 빌드
pnpm build

# 프론트엔드 프로덕션 서버
pnpm start
```

### API (Kotlin Spring Boot + Supabase)

1. [Supabase](https://supabase.com)에서 프로젝트 생성
2. `apps/api/.env.example`을 복사해 `apps/api/.env` 작성
3. Supabase Dashboard > **Project Settings > Database > Connection string (JDBC)** 값 입력

```bash
cp apps/api/.env.example apps/api/.env
# .env 파일에 DATABASE_URL, DATABASE_USERNAME, DATABASE_PASSWORD 설정

pnpm dev:api
```

## 📁 Monorepo 구조

```
pixel-worm/
├── apps/
│   ├── web/              # Next.js 프론트엔드
│   └── api/              # Kotlin Spring Boot API
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## 📁 폴더 구조 설명

### Atoms (원자)

- **Button**: 재사용 가능한 버튼 컴포넌트
- **Input**: 재사용 가능한 입력 필드 컴포넌트
- **SnakePreview**: 게임 미리보기용 지렁이 컴포넌트

### Molecules (분자)

- **AuthForm**: 로그인/회원가입 폼 컴포넌트
- **GameCard**: 게임 정보를 표시하는 카드 컴포넌트

### Organisms (유기체)

- **AuthModal**: 인증 모달 컴포넌트
- **GameList**: 게임 목록을 관리하는 컴포넌트

### Templates (템플릿)

- **HomeTemplate**: 홈페이지 레이아웃

### Games (게임)

- **snake**: 지렁이 게임 컴포넌트

## 🎯 기술 스택

### Frontend

- **Framework**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Monorepo**: Turborepo + pnpm
- **Architecture**: Atomic Design
- **Build Tool**: Next.js (Webpack)

### Backend

- **Language**: Kotlin
- **Framework**: Spring Boot 3.2.0
- **Database**: Supabase (PostgreSQL)
- **Security**: Spring Security + JWT
- **Build Tool**: Gradle

## 💰 무료 호스팅 가이드

### 프론트엔드 배포 (Vercel - 무료)

1. GitHub에 코드 푸시
2. Vercel 계정 생성
3. GitHub 저장소 연결
4. 자동 배포 완료

### 백엔드 배포 (Railway - 무료)

1. GitHub에 코드 푸시
2. Railway 계정 생성
3. GitHub 저장소 연결
4. 환경변수 설정
5. 자동 배포 완료

## 🔮 향후 계획

- [ ] 테트리스 게임 추가
- [ ] 2048 게임 추가
- [ ] 퀴즈 게임 추가
- [ ] 게임 점수 저장 시스템
- [ ] 사용자 프로필 관리
- [ ] 실시간 채팅 기능
- [ ] 무료 클라우드 배포 자동화

## 📝 라이선스

MIT License - 완전 무료 사용 가능
