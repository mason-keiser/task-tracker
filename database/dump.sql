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

ALTER TABLE IF EXISTS ONLY public.checklistitems DROP CONSTRAINT IF EXISTS checklistitems_userid_fkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_lastname_key;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_firstname_key;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_email_key;
ALTER TABLE IF EXISTS ONLY public.checklistitems DROP CONSTRAINT IF EXISTS checklistitems_pkey;
ALTER TABLE IF EXISTS public.users ALTER COLUMN userid DROP DEFAULT;
ALTER TABLE IF EXISTS public.checklistitems ALTER COLUMN checklistitemid DROP DEFAULT;
ALTER TABLE IF EXISTS public.checklistitems ALTER COLUMN userid DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.users_userid_seq;
DROP TABLE IF EXISTS public.users;
DROP SEQUENCE IF EXISTS public.checklistitems_userid_seq;
DROP SEQUENCE IF EXISTS public.checklistitems_checklistitemid_seq;
DROP TABLE IF EXISTS public.checklistitems;
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
-- Name: checklistitems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.checklistitems (
    userid integer NOT NULL,
    checklistitemid integer NOT NULL,
    checklistitem character varying(1000) NOT NULL,
    iscomplete boolean
);


--
-- Name: checklistitems_checklistitemid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.checklistitems_checklistitemid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: checklistitems_checklistitemid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.checklistitems_checklistitemid_seq OWNED BY public.checklistitems.checklistitemid;


--
-- Name: checklistitems_userid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.checklistitems_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: checklistitems_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.checklistitems_userid_seq OWNED BY public.checklistitems.userid;


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
-- Name: checklistitems userid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.checklistitems ALTER COLUMN userid SET DEFAULT nextval('public.checklistitems_userid_seq'::regclass);


--
-- Name: checklistitems checklistitemid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.checklistitems ALTER COLUMN checklistitemid SET DEFAULT nextval('public.checklistitems_checklistitemid_seq'::regclass);


--
-- Name: users userid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);


--
-- Data for Name: checklistitems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.checklistitems (userid, checklistitemid, checklistitem, iscomplete) FROM stdin;
2	2	get a dog for mel	f
4	7	finish frontend of this application	f
1	31	this is a new active checklist item	f
1	16	this is a new item with a response	f
1	20	new todo to be added	f
1	18	This todo is from my iphone	f
1	30	new todo to be added	t
1	1	updated checklist item	t
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (userid, firstname, lastname, password, email) FROM stdin;
1	Mason	Keiser	6679309	mkman@gmail.com
2	Jimmy	Rodriguez	1234	jrod69@aol.com
3	Melissa	Kim	sirius	melissakim96@gmail.com
4	Cara	Harshman	1973	kraw@gmail.com
\.


--
-- Name: checklistitems_checklistitemid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.checklistitems_checklistitemid_seq', 31, true);


--
-- Name: checklistitems_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.checklistitems_userid_seq', 1, true);


--
-- Name: users_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_userid_seq', 4, true);


--
-- Name: checklistitems checklistitems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.checklistitems
    ADD CONSTRAINT checklistitems_pkey PRIMARY KEY (checklistitemid);


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
-- Name: checklistitems checklistitems_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.checklistitems
    ADD CONSTRAINT checklistitems_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

