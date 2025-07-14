## 서울디지텍고등학교 학생을 위한 AI 엔지니어 6개월 로드맵: 이미지 기반 상품 추천 프로젝트

> 목표: 이미지 기반 상품 추천 모델을 개발하고, 웹/앱 환경에서 사용자에게 시각적으로 매력적인 추천 결과를 제공합니다.

**사용 기술 스택:** Python, TensorFlow/PyTorch, OpenCV, Flask/FastAPI, HTML/CSS/JavaScript (선택 사항: Docker, AWS/GCP)

### 1개월차: Python 기초 및 이미지 처리 입문

- **1주차:**
    - Python 문법 복습 및 심화 학습 (변수, 자료형, 조건문, 반복문, 함수, 클래스)
    - Python 개발 환경 설정 (Anaconda, VS Code)
    - Python 패키지 관리 (pip) 및 가상 환경 설정
- **2주차:**
    - NumPy를 이용한 배열 연산 및 데이터 분석 기초
    - Pandas를 이용한 데이터 프레임 생성, 조작, 분석
    - Matplotlib/Seaborn을 이용한 데이터 시각화
- **3주차:**
    - OpenCV를 이용한 이미지 불러오기, 저장하기, 기본 필터 적용 (grayscale, blur, edge detection)
    - 이미지 데이터 전처리 및 Augmentation 기법 학습 (rotation, scaling, cropping)
    - 이미지 데이터셋 구축 및 관리 방법 학습 (파일 구조, 데이터 어노테이션)
- **4주차:**
    - 1개월차 학습 내용 복습 및 간단한 이미지 처리 프로젝트 진행 (예: 특정 색상 추출, 객체 검출 시도)

### 2개월차: 딥러닝 기초 및 이미지 분류 모델 구현

- **5주차:**
    - 딥러닝 개념 이해 (인공 신경망, 활성화 함수, 손실 함수, 경사 하강법)
    - TensorFlow 또는 PyTorch 튜토리얼 학습 및 환경 설정
    - 간단한 신경망 모델 구현 (MNIST 손글씨 분류)
- **6주차:**
    - Convolutional Neural Network (CNN) 구조 이해 및 구현 (합성곱, 풀링, Fully Connected Layer)
    - 이미지 분류를 위한 CNN 모델 설계 및 학습 (CIFAR-10 데이터셋)
    - 모델 성능 평가 지표 (Accuracy, Precision, Recall, F1-score) 학습 및 적용
- **7주차:**
    - Transfer Learning 개념 이해 및 활용 (Pre-trained 모델: VGG, ResNet, Inception)
    - Transfer Learning을 이용한 이미지 분류 모델 학습 (자체 구축한 상품 이미지 데이터셋)
    - 모델 성능 개선을 위한 Hyperparameter Tuning (Learning Rate, Batch Size, Optimizer)
- **8주차:**
    - 2개월차 학습 내용 복습 및 이미지 분류 모델 개선 (데이터 Augmentation 추가, 모델 구조 변경)

### 3개월차: 상품 특징 추출 및 유사도 측정

- **9주차:**
    - Feature Extraction 개념 이해 (색상 히스토그램, SIFT, HOG)
    - Pre-trained CNN 모델을 이용한 Feature Extraction (예: ResNet50의 중간 레이어 활용)
    - 추출된 Feature Vector를 이용한 상품 표현
- **10주차:**
    - Cosine Similarity, Euclidean Distance 등 유사도 측정 방법 학습
    - 추출된 Feature Vector 기반으로 상품 간 유사도 계산
    - 유사도 기반 상품 추천 알고리즘 구현 (Top-K 추천)
- **11주차:**
    - 이미지 검색 시스템 구현 (Query 이미지와 유사한 상품 검색)
    - 검색 결과 시각화 및 사용자 인터페이스 디자인
    - 검색 성능 개선을 위한 인덱싱 기법 학습 (KD-Tree, Annoy)
- **12주차:**
    - 3개월차 학습 내용 복습 및 이미지 검색 시스템 개선 (인덱싱 적용, 유사도 측정 방식 변경)

### 4개월차: 웹/앱 연동 및 API 개발

- **13주차:**
    - 웹 프레임워크 (Flask 또는 FastAPI) 학습 및 환경 설정
    - 웹 API 설계 및 구현 (RESTful API)
    - 상품 이미지 업로드 API, 추천 결과 반환 API 개발
- **14주차:**
    - HTML/CSS/JavaScript를 이용한 웹 프론트엔드 개발 (선택 사항)
    - React, Vue.js, Angular 등 프론트엔드 프레임워크 학습 (선택 사항)
    - 웹 인터페이스를 통한 상품 검색 및 추천 결과 시각화
- **15주차:**
    - 모바일 앱 개발 환경 설정 (Android Studio 또는 Flutter) (선택 사항)
    - 웹 API를 이용한 모바일 앱 개발 (상품 검색 및 추천 결과 표시)
    - 사용자 인터랙션 디자인 및 구현 (선택 사항)
- **16주차:**
    - 4개월차 학습 내용 복습 및 웹/앱 연동 개선 (API 성능 개선, 사용자 인터페이스 개선)

### 5개월차: 모델 배포 및 성능 모니터링

- **17주차:**
    - Docker를 이용한 컨테이너 환경 구축 (선택 사항)
    - AWS, GCP 등 클라우드 플랫폼 학습 및 계정 설정 (선택 사항)
    - Docker 컨테이너를 이용한 모델 배포 (선택 사항)
- **18주차:**
    - 웹 API를 클라우드 플랫폼에 배포 (선택 사항)
    - 웹/앱 서비스 배포 및 설정
    - 사용자 트래픽 모니터링 및 서버 관리
- **19주차:**
    - 모델 성능 모니터링 (추천 정확도, 사용자 클릭률)
    - A/B 테스팅을 통한 추천 알고리즘 개선
    - 사용자 피드백 수집 및 반영
- **20주차:**
    - 5개월차 학습 내용 복습 및 배포 환경 개선 (자동 배포 시스템 구축, 스케일링)

### 6개월차: 프로젝트 마무리 및 심화 학습

- **21주차:**
    - 프로젝트 코드 리팩토링 및 가독성 향상
    - 에러 핸들링 및 예외 처리 강화
    - 성능 개선을 위한 코드 최적화
- **22주차:**
    - 프로젝트 발표 자료 준비 (PPT, 발표 스크립트)
    - 프로젝트 결과 시연 및 질의응답 준비
    - 기술 블로그 작성 및 GitHub 저장소 관리
- **23주차:**
    - 딥러닝 최신 기술 트렌드 학습 (Transformer, GAN, Self-Supervised Learning)
    - 추천 시스템 관련 논문 읽기 및 스터디
    - 개인 프로젝트 아이디어 발굴 및 기획
- **24주차:**
    - 6개월 로드맵 전체 복습 및 부족한 부분 보충
    - 졸업 작품 제작 및 포트폴리오 작성
    - 취업/진학 준비 (이력서 작성, 면접 연습)

### 최종: 프로젝트 마무리 및 배포

- 코드 리팩토링 및 가독성 향상
- 에러 핸들링 및 사용자 경험 개선
- 프로젝트 빌드 및 Netlify, Vercel 또는 GitHub Pages를 통한 배포 (선택 사항)
- README.md 파일 작성 (프로젝트 설명, 사용 기술, 설치 및 실행 방법 등)
- Git/GitHub를 통한 최종 코드 관리 및 포트폴리오 준비

[🔗 AI 엔지니어 로드맵](https://roadmap.sh/ai-engineer)
