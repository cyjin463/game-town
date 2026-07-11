# dev37 게임 타운

브라우저에서 즐기는 웹게임 포털입니다. Turborepo 모노레po로 Next.js 프론트엔드와 Kotlin Spring Boot API를 함께 관리합니다.

- **프론트엔드:** [game-town-web.vercel.app](https://game-town-web.vercel.app)
- **백엔드 API:** [game-town-fmzk.onrender.com](https://game-town-fmzk.onrender.com)
- **저장소:** [github.com/cyjin463/game-town](https://github.com/cyjin463/game-town)

## 주요 기능

- **지렁이 게임** — 방향키(PC) / 화면 탭(모바일) 조작
- **회원 인증** — JWT 기반 로그인·회원가입, 세션 복원
- **주간 리더보드** — TOP 10 순위, 매주 월요일 00:00(KST) 초기화
- **내 최고점** — 로그인 사용자 개인 기록 조회 및 최고점만 갱신
- **Open Graph** — 카카오톡·SNS 링크 미리보기 지원

## 기술 스택

| 구분 | 기술 |
|------|------|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS, TanStack Query |
| Backend | Kotlin, Spring Boot 3.2, Spring Security, JWT, JPA |
| Database | Supabase (PostgreSQL) |
| Monorepo | Turborepo, pnpm workspace |
| Frontend 배포 | Vercel |
| Backend 배포 | Render (Docker) |

## Monorepo 구조

```
pixel-worm/
├── apps/
│   ├── web/                    # Next.js 프론트엔드
│   │   ├── public/             # 정적 파일 (og-image.png 등)
│   │   └── src/
│   │       ├── app/            # App Router (layout, pages)
│   │       ├── components/     # 페이지·게임별 컴포넌트
│   │       │   ├── Home/
│   │       │   └── games/Snake/
│   │       ├── shared/         # 공통 Atomic Design 컴포넌트
│   │       ├── providers/      # AuthProvider, QueryProvider
│   │       ├── hooks/
│   │       └── lib/            # API 클라이언트, 게임 메타 등
│   └── api/                    # Kotlin Spring Boot API
│       ├── Dockerfile
│       └── src/main/kotlin/com/gameportal/
├── .github/workflows/          # CI (dev → main PR 빌드)
├── render.yaml                 # Render 배포 설정
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

## 지렁이 게임

| 항목 | 내용 |
|------|------|
| 조작 | PC: 방향키 / 모바일: 탭(시계방향 회전) |
| 점수 | 먹이 1개당 +10점 |
| 속도 | 40 / 110 / 160 / 300점 구간별 5단계 가속 |
| 장애물 | 30점마다 랜덤 크기(1×1 ~ 3×3) 생성 |
| 점수 저장 | 로그인 사용자, 기존 최고점보다 높을 때만 제출 |

## API

Next.js `rewrites`로 `/api/*` 요청을 백엔드로 프록시합니다.

### Auth (`/api/auth`)

| Method | Path | 인증 | 설명 |
|--------|------|------|------|
| POST | `/register` | - | 회원가입 + JWT 발급 |
| POST | `/login` | - | 로그인 + JWT 발급 |
| GET | `/me` | JWT | 현재 사용자 확인 |

### Scores (`/api/scores`)

| Method | Path | 인증 | 설명 |
|--------|------|------|------|
| POST | `/` | JWT | 점수 제출 (최고점만 갱신) |
| GET | `/leaderboard` | - | TOP 10 리더보드 |
| GET | `/me` | JWT | 내 점수·순위 (기록 없으면 null) |

## 로컬 개발

### 사전 요구

- Node.js 24+
- pnpm 11+
- Java 17+ (백엔드)
- Supabase PostgreSQL (또는 로컬 PostgreSQL)

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 백엔드 환경 변수

```bash
cp apps/api/.env.example apps/api/.env
```

`apps/api/.env`에 Supabase JDBC 연결 정보와 JWT 시크릿을 설정합니다.

```env
DATABASE_URL=jdbc:postgresql://db.YOUR_PROJECT_REF.supabase.co:5432/postgres?sslmode=require
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your-password
JWT_SECRET=your-secret-key-at-least-32-chars
```

### 3. 실행

```bash
# 터미널 1 — API (http://localhost:8080)
pnpm dev:api

# 터미널 2 — Web (http://localhost:3000)
pnpm dev
```

프론트엔드는 `API_URL` 미설정 시 `http://localhost:8080`으로 API를 프록시합니다.

### 빌드

```bash
pnpm build        # 프론트엔드
pnpm build:api    # 백엔드
pnpm lint         # ESLint
```

## 배포

### 프론트엔드 (Vercel)

1. GitHub 저장소 연결
2. Root Directory: `apps/web` (또는 monorepo 설정)
3. 환경 변수

| 변수 | 설명 |
|------|------|
| `API_URL` | 백엔드 URL (예: `https://game-town-fmzk.onrender.com`) |
| `NEXT_PUBLIC_SITE_URL` | (선택) OG 메타용 프로덕션 도메인 |

### 백엔드 (Render + Docker)

`render.yaml` 또는 Render 대시보드에서 Docker 서비스로 배포합니다.

- **Dockerfile:** `apps/api/Dockerfile`
- **Docker Context:** `apps/api`
- **Health Check:** `/api/scores/leaderboard`

| 변수 | 설명 |
|------|------|
| `DATABASE_URL` | Supabase JDBC URL |
| `DATABASE_USERNAME` | DB 사용자 |
| `DATABASE_PASSWORD` | DB 비밀번호 |
| `JWT_SECRET` | JWT 서명 키 |

> Turborepo 구조에서 `apps/api/package.json` 때문에 Render가 Node 프로젝트로 인식할 수 있어, **Docker 런타임**으로 배포하는 것을 권장합니다.

## CI

`dev` → `main` PR 생성 시 GitHub Actions에서 프론트엔드 빌드를 검증합니다.

- 워크플로: `.github/workflows/pr-dev-to-main-build.yml`
- Node.js 24, pnpm 11.5.0

## 브랜치 전략

| 브랜치 | 용도 |
|--------|------|
| `main` | 프로덕션 |
| `dev` | 개발 통합 |
| `feature/GT-N` | 기능별 작업 |

## 향후 계획

- [ ] 테트리스
- [ ] 총알 피하기
- [ ] 지뢰찾기
- [ ] 사용자 프로필
- [ ] 추가 게임별 리더보드

## 라이선스

MIT License
