## 서울디지텍고등학교 학생을 위한 웹 백엔드 개발 6개월 로드맵: **간단한 쇼핑몰 API 서버 구축 프로젝트** (Python, Flask, SQLite)

> 목표: Flask 프레임워크와 SQLite 데이터베이스를 활용하여 쇼핑몰 API 서버를 구축하고, 백엔드 개발의 핵심 개념을 익힙니다.

**프로젝트 개요:**

*   **기능:** 상품 목록 조회, 상품 상세 정보 조회, 장바구니 추가, 주문 생성 기능 제공
*   **사용 기술 스택:**
    *   **언어:** Python
    *   **프레임워크:** Flask
    *   **데이터베이스:** SQLite
    *   **API 설계:** RESTful API
    *   **버전 관리:** Git/GitHub

### 1개월차: Python 및 Flask 기초 다지기

*   **1주차:** Python 기본 문법 학습
    *   변수, 자료형, 조건문, 반복문, 함수, 클래스, 예외 처리 학습
    *   온라인 강의 (Codecademy, Udemy, Coursera 등) 활용
    *   간단한 Python 문제 풀이 (백준, 프로그래머스 등)
*   **2주차:** Flask 프레임워크 기본 학습
    *   Flask 설치 및 기본 앱 생성
    *   라우팅, Request/Response 객체 이해
    *   템플릿 엔진 (Jinja2) 사용법 학습
    *   Flask 공식 문서 및 튜토리얼 참고
*   **3주차:** 데이터베이스 (SQLite) 기초 학습
    *   SQLite 설치 및 기본 명령어 학습
    *   CRUD (Create, Read, Update, Delete) 연산 이해
    *   파이썬 SQLite 라이브러리 (sqlite3) 사용법 학습
*   **4주차:** 간단한 API 서버 구축 연습
    *   Flask와 SQLite를 연동하여 간단한 데이터 조회 API 개발 (GET 요청)
    *   Postman 또는 Insomnia를 사용하여 API 테스트

### 2개월차: 쇼핑몰 API 서버 기본 기능 구현

*   **5주차:** 데이터베이스 스키마 설계
    *   상품 테이블 (id, name, price, description 등) 설계
    *   주문 테이블 (id, user_id, order_date, total_price 등) 설계
    *   상품 이미지 테이블 (id, product_id, image_url 등) 설계
*   **6주차:** 상품 목록 조회 API 개발
    *   `GET /products` 엔드포인트 구현
    *   데이터베이스에서 상품 목록을 조회하여 JSON 형식으로 반환
    *   페이지네이션 기능 추가 (선택 사항)
*   **7주차:** 상품 상세 정보 조회 API 개발
    *   `GET /products/{product_id}` 엔드포인트 구현
    *   특정 상품 ID에 해당하는 상품 정보를 데이터베이스에서 조회하여 JSON 형식으로 반환
*   **8주차:** 장바구니 추가 API 개발
    *   `POST /cart` 엔드포인트 구현
    *   요청 바디에서 상품 ID와 수량을 받아와 장바구니에 추가

### 3개월차: 주문 생성 및 API 고도화

*   **9주차:** 주문 생성 API 개발
    *   `POST /orders` 엔드포인트 구현
    *   요청 바디에서 장바구니 정보를 받아와 주문을 생성
    *   데이터베이스에 주문 정보 저장
*   **10주차:** API 유효성 검사 (Validation) 추가
    *   요청 데이터 유효성 검사 (예: 상품 ID 유효성, 수량 유효성)
    *   유효하지 않은 요청에 대한 에러 처리
*   **11주차:** API 예외 처리 (Exception Handling) 추가
    *   데이터베이스 오류, 네트워크 오류 등 예외 상황 처리
    *   사용자에게 친절한 에러 메시지 반환
*   **12주차:** 로깅 (Logging) 추가
    *   API 요청 및 응답 로깅
    *   에러 발생 시 로그 기록

### 4개월차: 사용자 인증 및 보안 강화

*   **13주차:** 사용자 인증 (Authentication) 구현
    *   회원 가입, 로그인 API 개발
    *   비밀번호 암호화 (bcrypt 등 사용)
*   **14주차:** JWT (JSON Web Token)를 이용한 인증 구현
    *   로그인 성공 시 JWT 발급
    *   API 요청 시 JWT 검증
*   **15주차:** API 권한 부여 (Authorization) 구현
    *   관리자 권한, 사용자 권한 구분
    *   각 권한에 따라 API 접근 권한 제어
*   **16주차:** API 보안 강화
    *   CORS (Cross-Origin Resource Sharing) 설정
    *   SQL Injection 방지

### 5개월차: API 테스트 및 성능 개선

*   **17주차:** 단위 테스트 (Unit Test) 작성
    *   pytest 또는 unittest 라이브러리 사용
    *   각 API 기능에 대한 단위 테스트 작성
*   **18주차:** 통합 테스트 (Integration Test) 작성
    *   API 전체 흐름에 대한 통합 테스트 작성
*   **19주차:** API 성능 측정 및 개선
    *   Flask Profiler 등을 사용하여 성능 측정
    *   데이터베이스 쿼리 최적화
    *   캐싱 적용 (선택 사항)
*   **20주차:** API 문서화 (Swagger 또는 OpenAPI)
    *   API 엔드포인트, 요청/응답 형식, 에러 코드 등을 문서화

### 6개월차: 배포 및 유지보수

*   **21주차:** API 서버 배포 준비
    *   Gunicorn 또는 uWSGI를 사용하여 Flask 앱 실행
    *   환경 변수 설정
*   **22주차:** 클라우드 환경 (AWS, Google Cloud, Azure)에 API 서버 배포
    *   Docker를 사용하여 컨테이너화 (선택 사항)
*   **23주차:** API 서버 모니터링
    *   Prometheus 또는 Grafana를 사용하여 API 서버 모니터링
*   **24주차:** 프로젝트 마무리 및 문서화
    *   코드 리팩토링 및 가독성 향상
    *   에러 핸들링 및 사용자 경험 개선
    *   README.md 파일 작성 (프로젝트 설명, 사용 기술, 설치 및 실행 방법 등)
    *   Git/GitHub를 통한 최종 코드 관리 및 포트폴리오 준비

### 최종: 프로젝트 마무리 및 배포

*   코드 리팩토링 및 가독성 향상
*   에러 핸들링 및 사용자 경험 개선
*   프로젝트 빌드 및 서버 배포 (AWS EC2, Google Cloud Compute Engine 등)
*   README.md 파일 작성 (프로젝트 설명, 사용 기술, 설치 및 실행 방법 등)
*   Git/GitHub를 통한 최종 코드 관리 및 포트폴리오 준비

[🔗 백엔드 개발자 로드맵](https://roadmap.sh/backend)
