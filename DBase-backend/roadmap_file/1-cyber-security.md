## 서울디지텍고등학교 학생을 위한 정보보안 1개월 로드맵: 웹 취약점 스캐너 개발

> 목표: 웹 취약점 스캐너를 개발하고, 웹 보안의 기본 원리와 다양한 취약점 유형을 학습합니다.

### 프로젝트 주제: 간단한 웹 취약점 스캐너 개발 (Python, Requests, Beautiful Soup, HTML)

*   **사용 기술 스택:** Python, Requests, Beautiful Soup (HTML 파싱), HTML, 정규 표현식 (선택 사항: threading)

### 1주차: 웹 보안 기초 학습 및 스캐너 설계

-   웹 보안의 기본 개념 (OWASP Top 10, 취약점 유형) 학습
-   HTTP 통신 원리 이해 (GET, POST, Header, Response Code)
-   Requests 라이브러리를 사용한 HTTP 요청/응답 처리 방법 학습
-   프로젝트 아키텍처 설계 (스캐너의 기능 범위 및 동작 방식 정의)
-   스캔 대상 웹 사이트 선정 및 정보 수집 (robots.txt 분석, 디렉토리 구조 파악)

### 2주차: 기본적인 취약점 스캔 기능 구현 (XSS, SQL Injection)

-   XSS (Cross-Site Scripting) 취약점 스캔 로직 구현:
    -   GET/POST 파라미터에 특수 문자 삽입 후 응답 내용 검사
    -   JavaScript 코드 실행 가능성 확인
-   SQL Injection 취약점 스캔 로직 구현:
    -   SQL 구문 삽입 시 에러 발생 여부 확인 (Error-based SQLi)
    -   특정 조건에 따른 응답 내용 변화 감지 (Blind SQLi, 시간 기반)
-   Beautiful Soup 라이브러리를 사용한 HTML 파싱 및 취약점 검사

### 3주차: 스캔 기능 강화 및 결과 분석 기능 구현

-   취약점 스캔 기능 확장 (CSRF, 클릭재킹, 디렉토리 리스팅 등)
-   정규 표현식을 활용한 패턴 기반 취약점 검사 (선택 사항)
-   스캔 결과를 저장하고 분석하는 기능 구현 (CSV, JSON 파일 형식)
-   스캔 결과 시각화 (선택 사항: matplotlib, seaborn)
-   threading 모듈을 사용하여 스캔 속도 향상 (선택 사항)

### 최종: 프로젝트 마무리 및 배포 (4주차)

-   코드 리팩토링 및 가독성 향상
-   에러 핸들링 및 예외 처리 강화
-   사용자 인터페이스 개선 (CLI 또는 간단한 GUI)
-   스캔 결과 보고서 생성 기능 추가
-   README.md 파일 작성 (프로젝트 설명, 사용 기술, 설치 및 실행 방법, 사용 예시 등)
-   Git/GitHub를 통한 최종 코드 관리 및 포트폴리오 준비
-   본인이 개발한 스캐너를 활용하여, CTF(Capture The Flag) 웹 문제 풀어보기

[🔗 정보보안 로드맵](https://roadmap.sh/cyber-security)
