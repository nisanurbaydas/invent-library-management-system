--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

-- Started on 2022-10-12 02:40:52

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 211 (class 1259 OID 17592)
-- Name: Books; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Books" (
    id integer NOT NULL,
    name character varying(255),
    loan_count integer DEFAULT 0,
    average_rating real DEFAULT '0'::real,
    on_loan boolean DEFAULT false
);


ALTER TABLE public."Books" OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 17590)
-- Name: Books_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Books_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Books_id_seq" OWNER TO postgres;

--
-- TOC entry 3336 (class 0 OID 0)
-- Dependencies: 209
-- Name: Books_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Books_id_seq" OWNED BY public."Books".id;


--
-- TOC entry 213 (class 1259 OID 17607)
-- Name: Loans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Loans" (
    loaned_at date DEFAULT '2022-10-12'::date NOT NULL,
    returned_at date,
    ratings integer,
    "userId" integer NOT NULL,
    "bookId" integer NOT NULL
);


ALTER TABLE public."Loans" OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 17595)
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    name character varying(255)
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 17591)
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_id_seq" OWNER TO postgres;

--
-- TOC entry 3337 (class 0 OID 0)
-- Dependencies: 210
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- TOC entry 3173 (class 2604 OID 17596)
-- Name: Books id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Books" ALTER COLUMN id SET DEFAULT nextval('public."Books_id_seq"'::regclass);


--
-- TOC entry 3177 (class 2604 OID 17602)
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- TOC entry 3328 (class 0 OID 17592)
-- Dependencies: 211
-- Data for Name: Books; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Books" (id, name, loan_count, average_rating, on_loan) FROM stdin;
3	1984	0	0	f
4	The Martian	0	0	f
1	Homo Deus: A History of Tomorrow	2	8	f
2	Sapiens: A Brief History of Humankind	1	6	f
\.


--
-- TOC entry 3330 (class 0 OID 17607)
-- Dependencies: 213
-- Data for Name: Loans; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Loans" (loaned_at, returned_at, ratings, "userId", "bookId") FROM stdin;
2022-10-12	2022-10-12	6	1	1
2022-10-12	2022-10-12	6	2	1
2022-10-12	2022-10-12	6	1	2
\.


--
-- TOC entry 3329 (class 0 OID 17595)
-- Dependencies: 212
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" (id, name) FROM stdin;
1	Nisa Nur Baydaş
2	Ömer Faruk Baydaş
\.


--
-- TOC entry 3338 (class 0 OID 0)
-- Dependencies: 209
-- Name: Books_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Books_id_seq"', 4, true);


--
-- TOC entry 3339 (class 0 OID 0)
-- Dependencies: 210
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_id_seq"', 2, true);


--
-- TOC entry 3180 (class 2606 OID 17605)
-- Name: Books Books_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Books"
    ADD CONSTRAINT "Books_pkey" PRIMARY KEY (id);


--
-- TOC entry 3184 (class 2606 OID 17612)
-- Name: Loans Loans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Loans"
    ADD CONSTRAINT "Loans_pkey" PRIMARY KEY ("userId", "bookId");


--
-- TOC entry 3182 (class 2606 OID 17606)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- TOC entry 3186 (class 2606 OID 17618)
-- Name: Loans Loans_bookId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Loans"
    ADD CONSTRAINT "Loans_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES public."Books"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3185 (class 2606 OID 17613)
-- Name: Loans Loans_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Loans"
    ADD CONSTRAINT "Loans_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2022-10-12 02:40:53

--
-- PostgreSQL database dump complete
--

