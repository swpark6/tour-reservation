--liquibase formatted sql
--changeset swpark:tour_reservation
create table if not exists tour_reservations
(
    id     varchar(36) not null
        primary key,
    tourId varchar(36) not null,
    userId varchar(36) not null
);
