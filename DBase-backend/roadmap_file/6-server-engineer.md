## 서울디지텍고등학교 학생을 위한 서버 엔지니어 6개월 로드맵: 간단한 쇼핑몰 API 서버 구축

> 목표: Django REST Framework를 사용하여 간단한 쇼핑몰 API 서버를 구축하고, 배포까지 완료합니다. 이를 통해 서버 엔지니어링의 기초를 다지고, 실제 서비스 개발 과정을 경험합니다.

### 사용 기술 스택

*   **언어:** Python
*   **프레임워크:** Django, Django REST Framework
*   **데이터베이스:** SQLite (개발 초기), PostgreSQL (배포)
*   **서버:** Gunicorn, Nginx
*   **배포:** Docker, AWS EC2 (무료 티어)
*   **버전 관리:** Git, GitHub
*   **API 테스트:** Postman, Insomnia

### 1개월차: Python & Django 기초 다지기

*   **1주차:** Python 기초 문법 복습 및 심화 학습
    *   변수, 자료형, 조건문, 반복문, 함수, 클래스/객체 등 핵심 문법 학습
    *   PEP 8 코딩 컨벤션 학습 및 적용
    *   Python 가상 환경(venv) 설정 및 사용법 익히기
*   **2주차:** Django 프레임워크 기본 개념 학습 및 환경 설정
    *   Django 설치 및 기본 프로젝트 생성
    *   MTV 패턴 (Model, Template, View) 이해
    *   Django ORM을 이용한 데이터베이스 모델 정의 및 관리 (SQLite)
    *   Django Admin 페이지 설정 및 활용
*   **3주차:** Django 기본 기능 구현 및 웹 페이지 개발
    *   템플릿 엔진을 활용한 간단한 HTML 페이지 생성
    *   View 함수 작성 및 URL 연결
    *   Form을 이용한 사용자 입력 처리
    *   Static 파일 (CSS, JavaScript) 관리
*   **4주차:** Django REST Framework 소개 및 API 기초 학습
    *   RESTful API 개념 이해
    *   Django REST Framework 설치 및 설정
    *   Serializer를 이용한 데이터 직렬화/역직렬화 학습
    *   APIView, GenericAPIView, ViewSet 등 다양한 View 클래스 학습

### 2개월차: 쇼핑몰 API 서버 모델링 및 API 개발

*   **5주차:** 쇼핑몰 데이터베이스 모델 설계
    *   상품(Product), 카테고리(Category), 사용자(User), 주문(Order) 등 주요 모델 정의
    *   모델 간의 관계 설정 (One-to-Many, Many-to-Many)
    *   Django ORM을 사용하여 모델 생성 및 마이그레이션
*   **6주차:** 상품 API 개발 (CRUD)
    *   상품 목록 조회 API (GET)
    *   상품 상세 조회 API (GET)
    *   상품 생성 API (POST)
    *   상품 수정 API (PUT, PATCH)
    *   상품 삭제 API (DELETE)
*   **7주차:** 카테고리 API 개발 (CRUD) 및 관계 설정 테스트
    *   카테고리 목록 조회 API (GET)
    *   카테고리 상세 조회 API (GET)
    *   카테고리 생성 API (POST)
    *   카테고리 수정 API (PUT, PATCH)
    *   카테고리 삭제 API (DELETE)
    *   상품과 카테고리 간의 관계 설정 테스트
*   **8주차:** 사용자 인증 및 권한 관리 API 개발
    *   회원가입 API (POST)
    *   로그인 API (POST)
    *   JWT (JSON Web Token) 기반 인증 구현
    *   Permission 클래스를 이용한 권한 관리 (Admin, User)

### 3개월차: 고급 API 기능 구현 및 테스트

*   **9주차:** 주문 API 개발 (CRUD)
    *   주문 생성 API (POST) - 장바구니 기능 연동 고려
    *   주문 목록 조회 API (GET) - 사용자별 주문 목록 조회
    *   주문 상세 조회 API (GET)
    *   주문 상태 변경 API (PUT, PATCH) - (배송중, 배송완료 등)
    *   주문 취소 API (DELETE)
*   **10주차:** 검색 API 및 필터링 기능 구현
    *   상품명, 카테고리별 검색 기능 구현
    *   가격, 평점 등 다양한 필터링 기능 구현
*   **11주차:** Pagination 구현 및 API 성능 개선
    *   PageNumberPagination, LimitOffsetPagination 등을 이용한 페이지네이션 구현
    *   Django Debug Toolbar를 이용한 쿼리 성능 분석 및 개선
*   **12주차:** API 테스트 (Postman, Insomnia) 및 문서화 (Swagger)
    *   Postman, Insomnia를 이용한 API 엔드포인트별 테스트
    *   Swagger 또는 drf-yasg를 이용한 API 문서 자동 생성

### 4개월차: 데이터베이스 변경 및 서버 환경 설정

*   **13주차:** SQLite에서 PostgreSQL로 데이터베이스 변경
    *   PostgreSQL 설치 및 설정
    *   Django settings.py 파일 수정 (데이터베이스 설정 변경)
    *   Django ORM을 사용하여 데이터베이스 마이그레이션
*   **14주차:** Gunicorn을 이용한 Django 서버 실행
    *   Gunicorn 설치 및 설정
    *   Gunicorn을 이용한 Django 서버 실행 테스트
*   **15주차:** Nginx 설정 및 Reverse Proxy 구성
    *   Nginx 설치 및 설정
    *   Nginx를 이용한 Reverse Proxy 구성
    *   HTTPS 설정 (Let's Encrypt)
*   **16주차:** Docker를 이용한 환경 구축 및 컨테이너화
    *   Dockerfile 작성
    *   Docker Compose를 이용한 multi-container 환경 구축
    *   Docker 이미지 빌드 및 실행 테스트

### 5개월차: AWS EC2 배포 및 CI/CD 구축

*   **17주차:** AWS EC2 인스턴스 생성 및 설정
    *   AWS 계정 생성 및 EC2 인스턴스 (Ubuntu) 생성
    *   보안 그룹 설정 (SSH, HTTP, HTTPS)
    *   EC2 인스턴스에 Docker 설치
*   **18주차:** Docker Compose를 이용한 EC2 배포
    *   Docker Compose 파일을 EC2 인스턴스로 전송
    *   Docker Compose up 명령어를 이용하여 애플리케이션 실행
    *   Nginx를 이용한 Reverse Proxy 설정
*   **19주차:** GitHub Actions를 이용한 CI/CD 파이프라인 구축 (자동 빌드 및 배포)
    *   GitHub Repository 설정 (secrets 설정)
    *   GitHub Actions workflow 파일 작성 (.github/workflows)
    *   코드 변경 시 자동 빌드 및 배포 테스트
*   **20주차:** 배포 환경 모니터링 및 로깅 설정
    *   AWS CloudWatch를 이용한 서버 모니터링
    *   Sentry를 이용한 에러 로깅 및 트래킹

### 6개월차: 프로젝트 마무리 및 유지보수

*   **21주차:** 코드 리팩토링 및 가독성 향상
    *   코드 스타일 가이드 준수 (PEP 8)
    *   중복 코드 제거 및 모듈화
    *   변수명 및 함수명 개선
*   **22주차:** 에러 핸들링 및 사용자 경험 개선
    *   예외 처리 및 에러 메시지 개선
    *   API 응답 시간 최적화
    *   사용자 인터페이스 개선 (필수 사항은 아님, 시간 여유가 있다면)
*   **23주차:** 프로젝트 성능 테스트 및 보안 강화
    *   Load Testing (Apache Bench, Locust)
    *   보안 취약점 점검 (OWASP Top 10)
    *   보안 관련 라이브러리 업데이트
*   **24주차:** 프로젝트 발표 준비 및 포트폴리오 작성
    *   프로젝트 소개 자료 준비 (PPT, Markdown)
    *   프로젝트 데모 영상 제작
    *   GitHub Repository에 README.md 파일 작성 (프로젝트 설명, 사용 기술, 설치 및 실행 방법 등)
    *   포트폴리오 웹사이트 또는 이력서에 프로젝트 내용 추가

### 최종: 프로젝트 마무리 및 배포

*   코드 리팩토링 및 가독성 향상
*   에러 핸들링 및 사용자 경험 개선
*   프로젝트 빌드 및 AWS EC2를 통한 배포
*   README.md 파일 작성 (프로젝트 설명, 사용 기술, 설치 및 실행 방법 등)
*   Git/GitHub를 통한 최종 코드 관리 및 포트폴리오 준비

[🔗 서버 엔지니어 로드맵](https://roadmap.sh/docker)
