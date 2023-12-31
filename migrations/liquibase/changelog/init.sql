--liquibase formatted sql
--changeset swpark:tour_reservation
create table if not exists tour_reservations
(
    id                  varchar(36)                         not null
        primary key,
    tourId              varchar(36)                         not null,
    userId              varchar(36)                         not null,
    startAt             timestamp                           not null,
    cancellationDueDate timestamp                           not null,
    canceledAt          timestamp                           null,
    approvedAt          timestamp                           null,
    createdAt           timestamp default CURRENT_TIMESTAMP null,
    updatedAt           timestamp                           null
);

--changeset swpark:tours
create table if not exists tours
(
    id              varchar(36)                         not null
        primary key,
    holydays        varchar(255)                        null,
    holydaysOfWeek  varchar(255)                        null,
    createdAt       timestamp default CURRENT_TIMESTAMP not null,
    updatedAt       timestamp                           null
);
