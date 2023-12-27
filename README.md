# TourReservation

- 투어 상품 예약을 처리하는 API 서버

## Features

### 판매자

1. 투어 예약 승인
    1. 자동 승인
        - 하루 5건까지 자동 승인됩니다.
    2. 추가 예약 승인
2. 휴일 지정
    1. 휴일 조회
    2. 휴일 등록
        1. 지정 휴일 등록
            - 일단위
        2. 규칙 휴일 등록
    3. 휴일 삭제
         1. 지정 휴일 삭제
         2. 규칙 휴일 삭제
3. 고객 예약 여부 확인

### 고객

1. 예약 가능 일정 조회
2. 예약 신청
3. 예약 확인 (필요 기능 1)
4. 예약 취소
    - 여행 3일전까지 예약 취소 가능합니다.

## API

==TODO==

## 실행

> docker has been installed

### 인프라자원 실행

`docker-compose up -d`

### 어플리케이션 실행

```text
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```
