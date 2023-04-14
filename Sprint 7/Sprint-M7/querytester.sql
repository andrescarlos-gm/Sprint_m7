CREATE TABLE "public"."auth_mngs" (
    "mng_id" integer DEFAULT nextval('auth_mngs_mng_id_seq') NOT NULL,
    "author_id" integer NOT NULL,
    "isbn" character varying(15) NOT NULL,
    CONSTRAINT "auth_mngs_pkey" PRIMARY KEY ("mng_id")
) WITH (oids = false);

INSERT INTO "auth_mngs" ("mng_id", "author_id", "isbn") VALUES
(1,	3,	'111-1111111-111'),
(3,	5,	'444-4444444-444'),
(4,	1,	'222-2222222-222'),
(5,	2,	'333-3333333-333'),
(2,	4,	'111-1111111-111');

CREATE SEQUENCE authors_author_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."authors" (
    "author_id" integer DEFAULT nextval('authors_author_id_seq') NOT NULL,
    "author_name" character varying(45) NOT NULL,
    "author_lastname" character varying(45) NOT NULL,
    "born_date" date NOT NULL,
    "died_date" date,
    CONSTRAINT "authors_pkey" PRIMARY KEY ("author_id")
) WITH (oids = false);

INSERT INTO "authors" ("author_id", "author_name", "author_lastname", "born_date", "died_date") VALUES
(1,	'Andrés',	'Ulloa',	'1982-01-01',	NULL),
(2,	'Sergio',	'Mardones',	'1950-01-01',	'2012-01-01'),
(3,	'Jose',	'Salgado',	'1968-01-01',	'2020-01-01'),
(4,	'Ana',	'Salgado',	'1972-01-01',	NULL),
(5,	'Martin',	'Porta',	'1976-01-01',	NULL);

CREATE TABLE "public"."books" (
    "isbn" character varying(15) NOT NULL,
    "title" character varying(45) NOT NULL,
    "pages" integer NOT NULL,
    "author_id" integer NOT NULL,
    CONSTRAINT "books_pkey" PRIMARY KEY ("isbn")
) WITH (oids = false);

INSERT INTO "books" ("isbn", "title", "pages", "author_id") VALUES
('222-2222222-222',	'Poesías Contemporáneas',	167,	1),
('333-3333333-333',	'Historia de Asia',	511,	2),
('111-1111111-111',	'Cuentos de terror',	344,	3),
('444-4444444-444',	'Manual de Mecánica',	298,	5);

CREATE SEQUENCE borrows_borrow_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."borrows" (
    "borrow_id" integer DEFAULT nextval('borrows_borrow_id_seq') NOT NULL,
    "member_rut" character varying(10) NOT NULL,
    "isbn" character varying(15) NOT NULL,
    "borrow_date" date NOT NULL,
    "due_date" date NOT NULL,
    "return_date" date,
    CONSTRAINT "borrows_pkey" PRIMARY KEY ("borrow_id")
) WITH (oids = false);

INSERT INTO "borrows" ("borrow_id", "member_rut", "isbn", "borrow_date", "due_date", "return_date") VALUES
(1,	'1111111-1',	'111-1111111-111',	'2020-01-20',	'2020-01-27',	'2020-01-27'),
(3,	'4444444-4',	'444-4444444-444',	'2020-01-23',	'2020-01-30',	'2020-01-30'),
(4,	'2222222-2',	'111-1111111-111',	'2020-01-27',	'2020-02-03',	'2020-02-04'),
(2,	'5555555-5',	'222-2222222-222',	'2020-01-20',	'2020-01-27',	'2020-01-30'),
(5,	'3333333-3',	'333-3333333-333',	'2020-01-22',	'2020-01-29',	'2020-01-30'),
(6,	'1111111-1',	'444-4444444-444',	'2020-01-31',	'2020-02-07',	'2020-02-12'),
(7,	'3333333-3',	'222-2222222-222',	'2020-01-31',	'2020-02-07',	'2020-02-12');

CREATE TABLE "public"."members" (
    "member_rut" character varying(10) NOT NULL,
    "member_name" character varying(45) NOT NULL,
    "member_lastname" character varying(45) NOT NULL,
    "address" character varying(100) NOT NULL,
    "phone_num" integer NOT NULL,
    CONSTRAINT "members_address_key" UNIQUE ("address"),
    CONSTRAINT "members_phone_num_key" UNIQUE ("phone_num"),
    CONSTRAINT "members_pkey" PRIMARY KEY ("member_rut")
) WITH (oids = false);

INSERT INTO "members" ("member_rut", "member_name", "member_lastname", "address", "phone_num") VALUES
('1111111-1',	'Juan',	'Soto',	'Avenida 1, Santiago',	911111111),
('2222222-2',	'Ana',	'Perez',	'Pasaje 2, Santiago',	922222222),
('3333333-3',	'Sandra',	'Aguilar',	'Avenida 2, Santiago',	933333333),
('4444444-4',	'Esteban',	'Jerez',	'Avenida 3, Santiago',	94444444),
('5555555-5',	'Silvana',	'Muñoz',	'Pasaje 3, Santiago',	955555555);

ALTER TABLE ONLY "public"."auth_mngs" ADD CONSTRAINT "auth_mngs_author_id_fkey" FOREIGN KEY (author_id) REFERENCES authors(author_id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;
ALTER TABLE ONLY "public"."auth_mngs" ADD CONSTRAINT "auth_mngs_isbn_fkey" FOREIGN KEY (isbn) REFERENCES books(isbn) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;

ALTER TABLE ONLY "public"."books" ADD CONSTRAINT "books_author_id_fkey" FOREIGN KEY (author_id) REFERENCES authors(author_id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;

ALTER TABLE ONLY "public"."borrows" ADD CONSTRAINT "borrows_isbn_fkey" FOREIGN KEY (isbn) REFERENCES books(isbn) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;