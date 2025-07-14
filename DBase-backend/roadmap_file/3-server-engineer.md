## 서울디지텍고등학교 학생을 위한 서버 엔지니어 3개월 로드맵: 간단한 온라인 쇼핑몰 백엔드 구축

> 목표: 간단한 온라인 쇼핑몰 백엔드 구축을 통해 서버 엔지니어링 기초를 다지고, 웹 개발의 핵심 개념을 이해합니다. (Spring Boot, MySQL 활용)

### 추천 기술 스택:

*   **언어:** Java
*   **프레임워크:** Spring Boot
*   **데이터베이스:** MySQL
*   **빌드 도구:** Gradle
*   **API:** REST API
*   **버전 관리:** Git/GitHub
*   **배포:** AWS EC2 (선택 사항)

### 1개월차: Spring Boot 기초 다지기 & API 설계

*   **1주차: Java & Spring Boot 기초**
    *   Java 기본 문법 복습 (변수, 자료형, 조건문, 반복문, 객체 지향 프로그래밍)
    *   Spring Boot 소개 및 개발 환경 구축 (IntelliJ IDEA, JDK, Gradle 설정)
    *   Spring Initializr를 사용하여 간단한 Spring Boot 프로젝트 생성 및 실행
    *   REST API 기본 개념 학습 (GET, POST, PUT, DELETE 메서드 이해)
*   **2주차: Spring Boot 핵심 기능 학습**
    *   Spring Bean, IoC 컨테이너, DI (Dependency Injection) 개념 학습 및 실습
    *   @Controller, @RestController, @RequestMapping 어노테이션 학습 및 API 엔드포인트 구현
    *   HTTP 요청 파라미터 처리 (@RequestParam, @PathVariable)
    *   HTTP 응답 처리 (JSON 응답 반환)
*   **3주차: MySQL 데이터베이스 & JPA 설정**
    *   MySQL 설치 및 데이터베이스 생성
    *   JPA (Java Persistence API) 및 Hibernate 소개
    *   Spring Data JPA를 사용하여 데이터베이스 연결 설정
    *   Entity 클래스 정의 (상품, 사용자)
    *   Repository 인터페이스 생성 (CRUD 메서드 활용)
*   **4주차: 쇼핑몰 API 설계 및 간단한 기능 구현**
    *   쇼핑몰 API 명세 정의 (상품 목록 조회, 상품 상세 조회, 사용자 등록)
    *   상품 목록 조회 API 구현 (GET /products)
    *   상품 상세 조회 API 구현 (GET /products/{id})
    *   테스트 코드 작성 (JUnit, Mockito)

### 2개월차: 쇼핑몰 기능 구현 및 테스트

*   **5주차: 사용자 관리 기능 구현**
    *   사용자 등록 API 구현 (POST /users)
    *   비밀번호 암호화 (bcrypt)
    *   Valid 어노테이션을 활용한 입력 유효성 검사
*   **6주차: 상품 관리 기능 구현**
    *   상품 등록 API 구현 (POST /products)
    *   상품 수정 API 구현 (PUT /products/{id})
    *   상품 삭제 API 구현 (DELETE /products/{id})
*   **7주차: 주문 기능 구현**
    *   주문 생성 API 구현 (POST /orders)
    *   주문 조회 API 구현 (GET /orders/{id})
    *   상품 재고 관리 (동시성 문제 고려)
*   **8주차: API 테스트 및 예외 처리**
    *   Postman 또는 Insomnia를 사용하여 API 테스트
    *   예외 처리 핸들러 구현 (@ControllerAdvice)
    *   커스텀 예외 정의 (예: 상품 재고 부족 예외)
    *   로그 설정 (SLF4J, Logback)

### 3개월차: 프로젝트 고도화 및 배포 준비

*   **9주차: 성능 개선 및 보안 강화**
    *   쿼리 성능 최적화 (인덱스 활용)
    *   SQL Injection 방지
    *   CSRF (Cross-Site Request Forgery) 방지
    *   XSS (Cross-Site Scripting) 방지
*   **10주차: 인증 및 권한 부여**
    *   Spring Security를 사용하여 인증 및 권한 부여 기능 구현
    *   JWT (JSON Web Token)를 사용하여 토큰 기반 인증 구현
    *   사용자 역할 기반 접근 제어 (Role-Based Access Control)
*   **11주차: 배포 준비**
    *   Gradle을 사용하여 실행 가능한 JAR 파일 생성
    *   Dockerfile 작성 및 Docker 이미지 빌드
    *   AWS EC2에 Docker Container 배포 (선택 사항)
*   **12주차: 프로젝트 마무리 및 배포**
    *   코드 리팩토링 및 가독성 향상
    *   에러 핸들링 및 사용자 경험 개선
    *   프로젝트 빌드 및 AWS EC2 또는 클라우드 서비스에 배포 (선택 사항)
    *   README.md 파일 작성 (프로젝트 설명, 사용 기술, 설치 및 실행 방법 등)
    *   Git/GitHub를 통한 최종 코드 관리 및 포트폴리오 준비

### 최종: 프로젝트 마무리 및 배포

*   코드 리팩토링 및 가독성 향상
*   에러 핸들링 및 사용자 경험 개선
*   프로젝트 빌드 및 AWS EC2 (선택 사항) 또는 클라우드 서비스에 배포
*   README.md 파일 작성 (프로젝트 설명, 사용 기술, 설치 및 실행 방법 등)
*   Git/GitHub를 통한 최종 코드 관리 및 포트폴리오 준비

[🔗 서버 엔지니어 로드맵](https://roadmap.sh/docker)
