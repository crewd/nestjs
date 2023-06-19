# NestJs 게시판

NestJs로 만든 로그인, 회원가입, 게시글, 댓글 기능이 있는 게시판 API입니다.

## 설치

```
npm install
```

## 실행

- `.env.example` 파일을 참고하여 `.env` 파일 생성

- `docker-compose.yml`을 이용해 `docker-compose up` 명령어 실행

- ```
  # development
  $ npm run start

  # watch mode
  $ npm run start:dev

  # production mode
  $ npm run start:prod
  ```

## API

`http://localhost:3000/api`

### User

- POST `/user/login` 로그인

- POST `/user/signup` 회원가입

- POST `/user/kakao/login` 카카오 로그인

- POST `/user/kakao/signup` 카카오 회원가입

### Email Verification

> **이메일 서비스 사용 기간 종료**

- POST `/email-verification/send` 인증 이메일 전송

- POST `/email-verification/verify` 인증번호 인증

### Post

- GET /post/list 게시글 목록 조회

- GET `/post/{id}` 게시글 상세 조회

- POST `/post/create` 게시글 생성

- PATCH `/post/update` 게시글 수정

- DELETE `/post/delete` 게시글 삭제

### Comment

- POST `/post/{postId}/comment` 댓글 작성

- GET `/post/{postId}/comments` 댓글 목록

- PATCH `/comment/{commentId}` 댓글 수정

- DELETE `/comment/{commentId}` 댓글 삭제
