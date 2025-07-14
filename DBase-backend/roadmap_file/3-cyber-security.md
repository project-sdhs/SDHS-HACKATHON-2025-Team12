## 서울디지텍고등학교 학생을 위한 정보보안 3개월 로드맵

> 목표: 웹 취약점 분석 및 방어 시스템 개발을 통해 정보보안 실력 향상 및 실무 경험 습득

### 프로젝트 주제: 웹 취약점 분석 및 방어 시스템 개발 (Python, Flask, OWASP ZAP, Burp Suite)

**프로젝트 개요:** OWASP Top 10과 같은 주요 웹 취약점을 이해하고, 실제 웹 애플리케이션을 대상으로 취약점 분석 및 공격 시뮬레이션을 수행하며, 이를 방어할 수 있는 시스템을 개발합니다.

### 1개월차: 웹 기초 및 취약점 분석 환경 구축

- **1주차: 웹 기초 학습 및 개발 환경 구축**
    - HTML, CSS, JavaScript 기본 개념 학습 및 간단한 웹 페이지 제작 (정적 페이지)
    - Python 기초 문법 학습 및 개발 환경 설정 (VS Code, PyCharm 등)
    - Flask 프레임워크 소개 및 간단한 웹 서버 구축 (Hello World 예제)
    - Git/GitHub 사용법 학습 및 프로젝트 저장소 생성
- **2주차: 웹 애플리케이션 아키텍처 및 HTTP 프로토콜 이해**
    - 웹 애플리케이션 동작 방식 (클라이언트-서버 구조, Request/Response) 학습
    - HTTP 프로토콜 상세 분석 (Header, Method, Status Code)
    - 웹 서버 구조 및 동작 원리 이해 (Apache, Nginx)
    - 간단한 웹 애플리케이션 개발 (Form 데이터 처리, GET/POST 방식)
- **3주차: OWASP Top 10 취약점 학습 및 분석 도구 소개**
    - OWASP Top 10 취약점 개념 학습 (SQL Injection, XSS, CSRF 등)
    - 웹 취약점 분석 도구 소개 (OWASP ZAP, Burp Suite)
    - OWASP ZAP 설치 및 기본 사용법 학습 (Proxy 설정, 스캔 기능)
- **4주차: 취약점 분석 환경 구축 및 간단한 웹 애플리케이션 스캔**
    - 가상 환경(VirtualBox, Docker)을 이용한 취약한 웹 애플리케이션 구축 (DVWA, WebGoat)
    - OWASP ZAP을 이용하여 구축한 웹 애플리케이션 스캔
    - 스캔 결과 분석 및 취약점 이해 (SQL Injection, XSS 등)

### 2개월차: 웹 취약점 분석 및 공격 시뮬레이션

- **5주차: SQL Injection 공격 및 방어**
    - SQL Injection 공격 원리 및 유형 학습 (Union-based, Error-based, Blind SQL Injection)
    - OWASP ZAP을 이용한 SQL Injection 공격 시뮬레이션
    - Python을 이용한 SQL Injection 방어 코드 구현 (Prepared Statement, Parameter Binding)
- **6주차: XSS 공격 및 방어**
    - XSS 공격 원리 및 유형 학습 (Reflected XSS, Stored XSS, DOM-based XSS)
    - OWASP ZAP을 이용한 XSS 공격 시뮬레이션
    - Python을 이용한 XSS 방어 코드 구현 (HTML Encoding, Input Validation)
- **7주차: CSRF 공격 및 방어**
    - CSRF 공격 원리 학습
    - OWASP ZAP을 이용한 CSRF 공격 시뮬레이션
    - Python을 이용한 CSRF 방어 코드 구현 (CSRF Token)
- **8주차: 기타 웹 취약점 학습 및 분석**
    - Command Injection, File Upload 취약점 등 기타 웹 취약점 학습
    - OWASP ZAP을 이용한 공격 시뮬레이션 및 방어 방법 연구

### 3개월차: 웹 방어 시스템 개발 및 개선

- **9주차: 웹 방어 시스템 아키텍처 설계**
    - WAF(Web Application Firewall) 개념 학습 및 종류 소개
    - 웹 방어 시스템 아키텍처 설계 (취약점 탐지, 공격 차단, 로깅)
    - Flask 프레임워크를 이용한 웹 방어 시스템 기본 구조 구축
- **10주차: 취약점 탐지 모듈 개발**
    - SQL Injection, XSS, CSRF 공격 탐지 모듈 개발 (정규 표현식, 블랙리스트/화이트리스트 기반)
    - OWASP ZAP API를 이용한 자동 취약점 스캔 기능 구현
- **11주차: 공격 차단 및 로깅 모듈 개발**
    - 공격 트래픽 차단 모듈 개발 (IP 차단, 세션 차단)
    - 공격 시도 로깅 모듈 개발 (데이터베이스 저장, 로그 파일 생성)
- **12주차: 웹 방어 시스템 테스트 및 성능 개선**
    - 개발한 웹 방어 시스템 테스트 (모의 해킹, 침투 테스트)
    - 성능 개선 (코드 최적화, 캐싱)
    - 사용자 인터페이스 개선

### 최종: 프로젝트 마무리 및 배포

- 코드 리팩토링 및 가독성 향상
- 에러 핸들링 및 사용자 경험 개선
- 프로젝트 빌드 및 Heroku, AWS 또는 자체 서버를 통한 배포
- README.md 파일 작성 (프로젝트 설명, 사용 기술, 설치 및 실행 방법, 취약점 분석 및 방어 결과 등)
- Git/GitHub를 통한 최종 코드 관리 및 포트폴리오 준비
- 프로젝트 발표 준비 (발표 자료 제작, 시연 시나리오 작성)

[🔗 정보보안 로드맵](https://roadmap.sh/cyber-security)
