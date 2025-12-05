# 멀티 공유 화이트보드 ( DrawToGether )

혼자 또는 여러 사용자가 함께 그릴 수 있는 화이트 보드 웹입니다.
실시간으로 여러 사용자가 동시에 그리기, 지우기, 색상/브러시 변경, 채팅 등을 할 수 있습니다.

## 목차

1. 프로젝트 소개

2. 핵심 기능

3. 데모 / 스크린샷

4. 기술 스택
   
5. 환경변수 예시


## 1. 프로젝트 소개

혼자 또는 여러 사용자가 함께 그릴 수 있는 화이트 보드 웹입니다.

그리기 -> 다같이 그리기를 선택해 멀티플레이 방을 만들 수 있습니다.

방목록에서 참여 가능한 멀티플레이 방 목록을 볼 수 있습니다.


## 2. 핵심 기능

그리기

  - 실시간 드로잉(펜, 지우개, 선 굵기 조절)
  
  - 색상 선택 및 투명도 지원
  
  - 그리기 이력(undo / redo)
  
  
멀티플레이

  - 여러 방(room) 생성 및 참여
  
  - 참가자 표시(커서 위치 / 이름)
  
  - 채팅
  
  
계정

  - 회원가입 시 이메일 인증
  
  - 프로필 사진 직접 그리기
  


## 3. 데모 / 스크린샷
<img width="900" height="500" alt="image" src="https://github.com/user-attachments/assets/5dbaadf6-45d4-4eab-b884-92de9f009a79" />
<img width="900" height="500" alt="image" src="https://github.com/user-attachments/assets/15707a64-1be1-434f-a3de-303e37d37471" />
<img width="900" height="500" alt="image" src="https://github.com/user-attachments/assets/e616bea7-8334-4485-a277-647d3660cabd" />


## 4. 기술 스택

**Frontend**

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">

**Backend**

<img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=Java&logoColor=white"> <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> <img src="https://img.shields.io/badge/springsecurity-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white">

**Real-time Communication**

<img src="https://img.shields.io/badge/STOMP-C93CD7?style=for-the-badge&logo=STOMP&logoColor=white"> <img src="https://img.shields.io/badge/SockJS-A82C32?style=for-the-badge&logo=SockJS&logoColor=white"> <img src="https://img.shields.io/badge/RESTful_API-1092AC?style=for-the-badge&logo=RESTful_API&logoColor=white">


**Database**

<img src="https://img.shields.io/badge/mariadb-003545?style=for-the-badge&logo=mariadb&logoColor=white">


**Deployment**

<img src="https://img.shields.io/badge/AWS-FFB71B?style=for-the-badge&logo=AWS&logoColor=white"> <img src="https://img.shields.io/badge/ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white">


## 5. 환경변수 예시

**server/.env**
```
DB_USERNAME=
DB_PASSWORD=
DB_NAME=

SERVER_PORT=

OAUTH_GOOGLE_ID=
OAUTH_GOOGLE_PASSWORD=

MAIL_VERIFICATION_USERNAME=
MAIL_VERIFICATION_PASSWORD=
```

**client/.env**
```
#API 요청 보낼 서버 주소
REACT_APP_API_URL=
```


## 6. 시작 방법
**client**

```npm start```


**server**

 - Window
```
#컴파일
javac -d out (Get-ChildItem -Recurse src/*.java)

#실행
java -cp out com.example.Main
```
- Ubuntu/Linux
```
#컴파일
javac -d out $(find src -name "*.java")

#실행
java -cp out com.example.Main
```
