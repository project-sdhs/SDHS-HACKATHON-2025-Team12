## 웹 프론트엔드 개발: 영화 리뷰 웹사이트 개발 (HTML, CSS, JavaScript, React)

> 목표: HTML, CSS, JavaScript, React를 활용하여 영화 리뷰 웹사이트를 개발하고, 프론트엔드 개발의 전반적인 과정을 경험하며 실력 향상.

### 1개월차: HTML/CSS 기초 및 레이아웃 구성

- **1주차:** HTML 기본 구조 학습 및 웹 페이지 구조 이해
    - HTML 태그 (head, body, div, p, span, ul, li, a, img 등) 학습
    - 웹 페이지 기본 레이아웃 (header, main, footer, section) 구성 연습
    - 간단한 자기소개 페이지 또는 랜딩 페이지 제작
- **2주차:** CSS 기초 및 스타일링 적용
    - CSS 선택자 (태그, 클래스, ID) 학습
    - 박스 모델 (margin, padding, border) 이해 및 활용
    - 텍스트 스타일링 (font, color, size) 및 배경 스타일링
    - 영화 리뷰 웹사이트의 기본 디자인 컨셉 및 레이아웃 구상 (와이어프레임 제작)
- **3주차:** CSS 레이아웃 및 반응형 디자인
    - Flexbox 및 Grid 레이아웃 학습 및 활용
    - 미디어 쿼리를 이용한 반응형 디자인 구현
    - 영화 리뷰 웹사이트 메인 페이지 레이아웃 완성 (영화 목록, 검색창, 네비게이션)
- **4주차:** Semantic HTML 및 웹 접근성
    - Semantic HTML 태그 (article, aside, nav, footer) 학습 및 적용
    - 웹 접근성 (ARIA 속성, 시맨틱 마크업) 기초 이해
    - 크롬 개발자 도구 활용법 익히기 (element inspector, network tab, console)

### 2개월차: JavaScript 기초 및 DOM 조작

- **5주차:** JavaScript 기본 문법 학습
    - 변수, 상수, 자료형 (number, string, boolean, array, object)
    - 조건문 (if, else, switch) 및 반복문 (for, while)
    - 함수 선언 및 호출, 매개변수, 반환값
- **6주차:** DOM (Document Object Model) 조작
    - document 객체 및 요소 선택 (getElementById, getElementsByClassName, querySelector, querySelectorAll)
    - 요소 생성, 추가, 삭제 및 속성 변경
    - 이벤트 리스너 등록 및 이벤트 처리 (click, mouseover, keydown 등)
- **7주차:** 영화 데이터 가져오기 및 화면에 표시
    - Open API (TMDB 등) 사용법 학습 및 API 키 발급
    - `fetch` API를 사용하여 영화 데이터 가져오기
    - 가져온 영화 데이터를 DOM을 조작하여 화면에 표시 (영화 제목, 포스터, 평점 등)
- **8주차:** JavaScript 심화 학습
    - ES6+ 문법 (let, const, arrow function, template literals, destructuring)
    - 배열 메소드 (map, filter, reduce) 활용
    - 비동기 프로그래밍 (Promise, async/await) 기초

### 3개월차: React 기초 학습 및 컴포넌트 개발

- **9주차:** React 기본 개념 학습
    - React 컴포넌트 (함수형 컴포넌트, 클래스형 컴포넌트) 이해
    - JSX 문법 학습 및 활용
    - React state 및 props 개념 이해
- **10주차:** React 컴포넌트 만들기
    - 영화 목록 컴포넌트, 영화 상세 정보 컴포넌트 생성
    - state를 사용하여 영화 목록 관리 및 화면 업데이트
    - props를 사용하여 부모 컴포넌트에서 자식 컴포넌트로 데이터 전달
- **11주차:** React 이벤트 처리 및 데이터 바인딩
    - 이벤트 핸들러 함수 작성 및 컴포넌트에 연결
    - 양방향 데이터 바인딩 (onChange 이벤트 활용)
    - 영화 검색 기능 구현 (검색어 입력 및 영화 목록 필터링)
- **12주차:** React Lifecycle Methods (함수형 컴포넌트에서는 useEffect Hook)
    - `useEffect` Hook을 사용하여 컴포넌트가 마운트/언마운트/업데이트 될 때 특정 작업 수행
    - API 호출 및 데이터 로딩 시점 관리

### 4개월차: React 심화 학습 및 라우팅

- **13주차:** React Router DOM을 이용한 페이지 이동
    - React Router DOM 설치 및 설정
    - `BrowserRouter`, `Route`, `Link` 컴포넌트 사용법 학습
    - 영화 목록 페이지, 영화 상세 페이지, 사용자 프로필 페이지 라우팅 설정
- **14주차:** Context API를 이용한 상태 관리
    - Context API 생성 및 Provider 설정
    - 전역 상태 (예: 사용자 로그인 정보, 테마 설정) 관리
    - useContext Hook을 사용하여 컴포넌트에서 전역 상태 접근
- **15주차:** 사용자 입력 폼 및 유효성 검사
    - controlled component 및 uncontrolled component 이해
    - 사용자 입력 폼 (예: 리뷰 작성 폼, 로그인 폼) 구현
    - 입력 값 유효성 검사 (정규 표현식 활용)
- **16주차:** API 연동 및 데이터 처리
    - 서버 API (예: 영화 리뷰 API) 연동
    - `axios` 또는 `fetch` API를 사용하여 데이터 POST, GET, PUT, DELETE 요청 처리
    - 에러 핸들링 및 로딩 상태 표시

### 5개월차: 스타일링 및 UI 라이브러리 활용

- **17주차:** CSS Modules 또는 Styled Components를 이용한 스타일링
    - CSS Modules 또는 Styled Components 설치 및 설정
    - 컴포넌트별 스타일링 적용 (재사용 가능한 스타일 컴포넌트 생성)
    - 영화 리뷰 웹사이트 디자인 개선
- **18주차:** UI 라이브러리 (Material UI, Ant Design, Bootstrap) 사용
    - UI 라이브러리 설치 및 설정
    - UI 컴포넌트 (Button, TextField, Card 등) 활용
    - 영화 리뷰 웹사이트 UI 개선 및 생산성 향상
- **19주차:** Redux 또는 Zustand를 이용한 전역 상태 관리 (선택 사항)
    - Redux 또는 Zustand 설치 및 설정
    - 액션, 리듀서, 스토어 개념 이해
    - 전역 상태 관리 (예: 사용자 인증 상태, 영화 목록 상태)
- **20주차:** 테스트 코드 작성 (Jest, React Testing Library) (선택 사항)
    - Jest 및 React Testing Library 설치 및 설정
    - 컴포넌트 테스트 코드 작성 (단위 테스트, 통합 테스트)
    - 코드 품질 향상 및 안정성 확보

### 6개월차: 프로젝트 마무리 및 배포

- **21주차:** 코드 리팩토링 및 성능 최적화
    - 불필요한 코드 제거 및 중복 코드 제거
    - 컴포넌트 분리 및 재사용성 향상
    - 성능 측정 도구 (Chrome DevTools)를 사용하여 성능 병목 지점 파악 및 개선
    - 이미지 최적화 및 코드 압축
- **22주차:** 에러 핸들링 및 사용자 경험 개선
    - 에러 핸들링 로직 추가 (try...catch 문, 에러 경계 컴포넌트)
    - 사용자 입력 유효성 검사 강화
    - 로딩 상태 표시 및 에러 메시지 표시
    - 반응형 디자인 개선 및 웹 접근성 향상
- **23주차:** 프로젝트 빌드 및 배포
    - 프로젝트 빌드 (create-react-app build script 사용)
    - Netlify, Vercel 또는 GitHub Pages를 통한 배포
    - 도메인 연결 및 SSL 인증서 설정
- **24주차:** 포트폴리오 준비 및 발표 자료 제작
    - README.md 파일 작성 (프로젝트 설명, 사용 기술, 설치 및 실행 방법 등)
    - 프로젝트 시연 영상 촬영 및 발표 자료 제작
    - Git/GitHub를 통한 최종 코드 관리 및 포트폴리오 웹사이트에 프로젝트 추가

### 최종: 프로젝트 마무리 및 배포

- 코드 리팩토링 및 가독성 향상
- 에러 핸들링 및 사용자 경험 개선
- 프로젝트 빌드 및 Netlify, Vercel 또는 GitHub Pages를 통한 배포
- README.md 파일 작성 (프로젝트 설명, 사용 기술, 설치 및 실행 방법 등)
- Git/GitHub를 통한 최종 코드 관리 및 포트폴리오 준비

[🔗 프론트엔드 개발자 로드맵](https://roadmap.sh/frontend)
