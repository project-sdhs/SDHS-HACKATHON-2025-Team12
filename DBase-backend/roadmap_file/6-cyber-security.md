## 서울디지텍고등학교 정보보안 6개월 로드맵: 웹 취약점 분석 및 모의 해킹 프로젝트

> 목표: 웹 애플리케이션의 취약점을 분석하고 모의 해킹을 수행하여 웹 보안 역량을 강화합니다.

### 사용 기술 스택:

*   Python
*   Burp Suite
*   OWASP ZAP
*   Kali Linux
*   Metasploit Framework
*   Docker (선택 사항)
*   Git/GitHub

### 1개월차: 웹 보안 기초 다지기

*   **1주차:**
    *   웹 동작 원리 이해 (HTTP, HTTPS 프로토콜, 클라이언트-서버 구조)
    *   HTML, CSS, JavaScript 기초 학습 및 실습
    *   Burp Suite 설치 및 기본적인 사용법 학습 (Proxy 설정, Intercept, Repeater)
*   **2주차:**
    *   웹 애플리케이션 구조 이해 (MVC 패턴 등)
    *   SQL Injection 공격 원리 및 실습 (SQL 쿼리 작성 및 분석)
    *   OWASP ZAP 설치 및 기본적인 사용법 학습 (스캔 설정, 보고서 분석)
*   **3주차:**
    *   Cross-Site Scripting (XSS) 공격 원리 및 실습 (Stored XSS, Reflected XSS)
    *   Kali Linux 설치 및 기본적인 사용법 학습 (터미널 명령어, 네트워크 분석)
*   **4주차:**
    *   OWASP Top 10 취약점 학습 (개념, 공격 방법, 방어 방법)
    *   1개월차 학습 내용 복습 및 퀴즈 (SQL Injection, XSS, OWASP Top 10)
    *   간단한 웹 애플리케이션 취약점 진단 연습 (Burp Suite, OWASP ZAP 활용)

### 2개월차: SQL Injection 심화 및 방어 기술 학습

*   **5주차:**
    *   SQL Injection 종류별 공격 기법 심화 학습 (Blind SQL Injection, Time-based Blind SQL Injection)
    *   SQL Injection 우회 기법 학습 (문자 필터링, WAF 우회)
*   **6주차:**
    *   SQL Injection 공격 도구 활용 (sqlmap)
    *   SQL Injection 방어 기법 학습 (Prepared Statement, Parameterized Query)
*   **7주차:**
    *   SQL Injection 탐지 및 로깅 시스템 구축 (WAF 설정, IDS/IPS 활용)
    *   SQL Injection 실습 (sqlmap을 이용한 자동화 공격, 수동 공격)
*   **8주차:**
    *   2개월차 학습 내용 복습 및 퀴즈 (Blind SQL Injection, sqlmap, 방어 기법)
    *   SQL Injection 취약점이 존재하는 웹 애플리케이션 분석 및 공격/방어 실습

### 3개월차: XSS 심화 및 CSRF 공격 학습

*   **9주차:**
    *   XSS 종류별 공격 기법 심화 학습 (DOM Based XSS, Mutation XSS)
    *   XSS 공격 벡터 분석 및 페이로드 작성
*   **10주차:**
    *   XSS 공격 우회 기법 학습 (HTML Encoding, JavaScript Encoding)
    *   XSS 방어 기법 학습 (Content Security Policy, XSS Filter)
*   **11주차:**
    *   Cross-Site Request Forgery (CSRF) 공격 원리 및 실습
    *   CSRF 방어 기법 학습 (Synchronizer Token Pattern, SameSite Cookie)
*   **12주차:**
    *   3개월차 학습 내용 복습 및 퀴즈 (DOM Based XSS, CSP, CSRF)
    *   XSS 및 CSRF 취약점이 존재하는 웹 애플리케이션 분석 및 공격/방어 실습

### 4개월차: 웹 인증 및 세션 관리 취약점 학습

*   **13주차:**
    *   웹 인증 방식 이해 (Basic Authentication, Form-based Authentication, OAuth)
    *   취약한 인증 방식 공격 (Brute Force, Dictionary Attack)
*   **14주차:**
    *   세션 관리 메커니즘 이해 (Cookie, Session ID)
    *   세션 하이재킹 공격 (Session Fixation, Session Prediction)
*   **15주차:**
    *   세션 관리 취약점 방어 (HTTPS 사용, Cookie 속성 설정, 세션 만료)
    *   다단계 인증 (Multi-Factor Authentication) 구현 및 분석
*   **16주차:**
    *   4개월차 학습 내용 복습 및 퀴즈 (인증 방식, 세션 관리, MFA)
    *   웹 인증 및 세션 관리 취약점이 존재하는 웹 애플리케이션 분석 및 공격/방어 실습

### 5개월차: 웹 서버 및 운영체제 보안 학습

*   **17주차:**
    *   웹 서버 (Apache, Nginx) 설정 및 보안 강화
    *   웹 서버 취약점 분석 (경로 노출, 파일 업로드 취약점)
*   **18주차:**
    *   운영체제 (Linux) 보안 설정 (계정 관리, 권한 설정, 방화벽)
    *   Metasploit Framework를 이용한 시스템 침투 실습
*   **19주차:**
    *   취약한 웹 애플리케이션 서버 환경 구축 (Docker 활용)
    *   웹 서버 로그 분석 및 침해 사고 대응 시나리오 학습
*   **20주차:**
    *   5개월차 학습 내용 복습 및 퀴즈 (웹 서버 보안, 운영체제 보안, Metasploit)
    *   웹 서버 및 운영체제 취약점 분석 및 공격/방어 실습

### 6개월차: 모의 해킹 프로젝트 및 보고서 작성

*   **21주차:**
    *   모의 해킹 대상 웹 애플리케이션 선정 및 정보 수집 (OSINT)
    *   취약점 스캔 및 분석 (Burp Suite, OWASP ZAP 활용)
*   **22주차:**
    *   취약점 공격 및 권한 획득 (Metasploit Framework, 수동 공격)
    *   취약점 악용 시나리오 작성
*   **23주차:**
    *   취약점 분석 결과 및 공격 과정 기록
    *   모의 해킹 보고서 초안 작성 (취약점 개요, 공격 방법, 영향도, 개선 방안)
*   **24주차:**
    *   보고서 검토 및 수정
    *   최종 보고서 제출 및 발표 준비
    *   프로젝트 회고 및 성과 발표

### 최종: 프로젝트 마무리 및 배포

*   코드 리팩토링 및 가독성 향상 (자동화 스크립트, 페이로드 관리 도구 등)
*   에러 핸들링 및 사용자 경험 개선 (Burp Suite 확장 기능 개발)
*   프로젝트 관련 자료 GitHub에 업로드 및 관리
*   README.md 파일 작성 (프로젝트 설명, 사용 기술, 설치 및 실행 방법 등)
*   Git/GitHub를 통한 최종 코드 관리 및 포트폴리오 준비

[🔗 정보보안 로드맵](https://roadmap.sh/cyber-security)
