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

### 1. 투어 예약 신청

투어예약을 신청합니다.
신청된 투어 시작일과 같은 투어가 5개 이하일 경우 신청시 자동 승인 처리됩니다.
이 외의 예약된 투어는 [3. 투어 예약 승인] API를 통해 직접 승인 처리가 가능합니다.

- URL: POST /tour-reservations

### 2. 투어 예약 취소

투어 예약을 취소합니다.

- URL: DELETE /tour-reservations/{tourReservationId}
- 투어예약취소에 실패하는 경우
  - 존재하지 않는 투어 예약인 경우
  - 취소 마감일(여행 시작 3일전)을 지나서 취소신청을 하는 경우

### 3. 투어 예약 승인

예약된 투어를 직접 승인합니다.

- URL: POST /tour-reservations/{tourReservationId}/approve
- 승인에 실패하는 경우
  - 존재하지 않는 투어 예약인 경우
  - 이미 취소처리된 경우

### 4. 예약 가능 일정 조회

  투어의 예약가능 일정을 월 단위로 조회합니다.

- URL: GET /tours/{tourId}/available-schedules
- 조회에 실패하는 경우
  - 투어가 존재하지 않은 경우

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
