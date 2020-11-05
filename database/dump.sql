--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

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

ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_lastname_key;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_firstname_key;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_email_key;
ALTER TABLE IF EXISTS ONLY public.checklist DROP CONSTRAINT IF EXISTS checklist_pkey;
ALTER TABLE IF EXISTS ONLY public.checklist DROP CONSTRAINT IF EXISTS checklist_checklistitem_key;
ALTER TABLE IF EXISTS public.users ALTER COLUMN userid DROP DEFAULT;
ALTER TABLE IF EXISTS public.checklist ALTER COLUMN checklistitemid DROP DEFAULT;
ALTER TABLE IF EXISTS public.checklist ALTER COLUMN userid DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.users_userid_seq;
DROP TABLE IF EXISTS public.users;
DROP SEQUENCE IF EXISTS public.checklist_userid_seq;
DROP SEQUENCE IF EXISTS public.checklist_checklistitemid_seq;
DROP TABLE IF EXISTS public.checklist;
DROP EXTENSION IF EXISTS plpgsql;
DROP SCHEMA IF EXISTS public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: checklist; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.checklist (
    userid integer NOT NULL,
    checklistitemid integer NOT NULL,
    checklistitem character varying(1000) NOT NULL,
    iscompleted boolean NOT NULL
);


--
-- Name: checklist_checklistitemid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.checklist_checklistitemid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: checklist_checklistitemid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.checklist_checklistitemid_seq OWNED BY public.checklist.checklistitemid;


--
-- Name: checklist_userid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.checklist_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: checklist_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.checklist_userid_seq OWNED BY public.checklist.userid;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    userid integer NOT NULL,
    firstname character varying(50) NOT NULL,
    lastname character varying(50) NOT NULL,
    password character varying(50) NOT NULL,
    email character varying(255) NOT NULL
);


--
-- Name: users_userid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;


--
-- Name: checklist userid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.checklist ALTER COLUMN userid SET DEFAULT nextval('public.checklist_userid_seq'::regclass);


--
-- Name: checklist checklistitemid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.checklist ALTER COLUMN checklistitemid SET DEFAULT nextval('public.checklist_checklistitemid_seq'::regclass);


--
-- Name: users userid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);


--
-- Data for Name: checklist; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.checklist (userid, checklistitemid, checklistitem, iscompleted) FROM stdin;
1	1	this is the first thing on my agenda today	f
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (userid, firstname, lastname, password, email) FROM stdin;
1	Mason	Keiser	6679309	mkman@gmail.com
\.


--
-- Name: checklist_checklistitemid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.checklist_checklistitemid_seq', 1, true);


--
-- Name: checklist_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.checklist_userid_seq', 1, true);


--
-- Name: users_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_userid_seq', 1, true);


--
-- Name: checklist checklist_checklistitem_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.checklist
    ADD CONSTRAINT checklist_checklistitem_key UNIQUE (checklistitem);


--
-- Name: checklist checklist_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.checklist
    ADD CONSTRAINT checklist_pkey PRIMARY KEY (checklistitemid);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_firstname_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_firstname_key UNIQUE (firstname);


--
-- Name: users users_lastname_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_lastname_key UNIQUE (lastname);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

