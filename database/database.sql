--
-- PostgreSQL database dump
--

\restrict bw36Ue6vu2rgndp2UkRdznTgUcLunihGu2CpuL6Qk5RhiO3bkf7s126aLvTTuSW

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-09-28 17:22:22

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 219 (class 1259 OID 81937)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 81951)
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    id text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    location text NOT NULL,
    "eventDate" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "publicId" integer NOT NULL
);


ALTER TABLE public.events OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 82225)
-- Name: events_publicId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."events_publicId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."events_publicId_seq" OWNER TO postgres;

--
-- TOC entry 5037 (class 0 OID 0)
-- Dependencies: 222
-- Name: events_publicId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."events_publicId_seq" OWNED BY public.events."publicId";


--
-- TOC entry 221 (class 1259 OID 81966)
-- Name: tickets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tickets (
    id text NOT NULL,
    "eventId" text NOT NULL,
    "customerName" text NOT NULL,
    "customerEmail" text NOT NULL,
    quantity integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "publicId" integer NOT NULL
);


ALTER TABLE public.tickets OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 82455)
-- Name: tickets_publicId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."tickets_publicId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."tickets_publicId_seq" OWNER TO postgres;

--
-- TOC entry 5038 (class 0 OID 0)
-- Dependencies: 223
-- Name: tickets_publicId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."tickets_publicId_seq" OWNED BY public.tickets."publicId";


--
-- TOC entry 4868 (class 2604 OID 82226)
-- Name: events publicId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events ALTER COLUMN "publicId" SET DEFAULT nextval('public."events_publicId_seq"'::regclass);


--
-- TOC entry 4870 (class 2604 OID 82456)
-- Name: tickets publicId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets ALTER COLUMN "publicId" SET DEFAULT nextval('public."tickets_publicId_seq"'::regclass);


--
-- TOC entry 5027 (class 0 OID 81937)
-- Dependencies: 219
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
6c7c880f-d25f-4d9c-bb59-9fe908a1c136	ee0e9c022b4136b01b09953a3af92e19d64ee2b778b87c93fa3ffdf35a6a8ee3	2026-09-28 07:12:46.424083+07	20260928001246_init	\N	\N	2026-09-28 07:12:46.387482+07	1
a5742367-0477-4e7b-98d7-5415ddcb8d9d	2aa7daa39ca6a520b566a5c5fc25834d7357bc61fd8984249b10175c02e971cb	2026-09-28 11:46:16.826045+07	20260928044616_add_public_id	\N	\N	2026-09-28 11:46:16.626357+07	1
2d8e321b-93cf-4b35-a44a-12d35391653a	eea318c6fa53e53d4dbeab5eb273e9a7092b18f62b53c1d882805248f41a9aee	2026-09-28 11:57:39.544909+07	20260928045739_add_public_id	\N	\N	2026-09-28 11:57:39.461588+07	1
c165f76c-4a72-41d7-8e5f-9f387120fb25	e411fd0680a807aa5b56335af7f5ead2c41090bf9fa87911db1d83ea373c5b67	2026-09-28 12:07:16.69868+07	20260928050716_add_public_id	\N	\N	2026-09-28 12:07:16.555489+07	1
53c7f471-8e39-4059-ba99-26202d176e47	860addf5012d003a097230ac321f19104cc2ccf874cfb9fe17526fbb71ae59dd	2026-09-28 16:48:20.813533+07	20260928094820_change_event_delete_to_cascade	\N	\N	2026-09-28 16:48:20.756814+07	1
\.


--
-- TOC entry 5028 (class 0 OID 81951)
-- Dependencies: 220
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events (id, title, description, location, "eventDate", "createdAt", "updatedAt", "publicId") FROM stdin;
733b3659-eaec-4f8c-a06c-0827294c9309	Jakarta Music Festival	Festival musik tahunan di Jakarta	Jakarta Convention Center	2026-12-20 19:00:00	2026-09-28 01:04:23.15	2026-09-28 01:04:23.15	1
2279c0ff-820a-45b8-8e2c-5cfe2b699b33	Tech Conference 2026	Conference teknologi	Jakarta	2026-12-20 19:00:00	2026-09-28 01:48:37.801	2026-09-28 01:48:37.801	2
97d41b9d-d66e-405e-99f2-cf54fcb01872	Tech Conference Updated	Updated description	Bandung	2026-12-25 19:00:00	2026-09-28 01:48:15.213	2026-09-28 01:50:21.195	3
5e8d54bd-f252-4cc7-b510-d14e4c98349f	Tech Conference 2027	Conference teknologi	Jakarta	2027-12-20 19:00:00	2026-09-28 05:14:32.338	2026-09-28 05:14:32.338	5
183b3ff5-4213-4fb8-8c6e-3234c642cb90	Festival Cosplay Bandung	Festival bertema nusantara	bandung	2026-10-01 06:49:00	2026-09-28 06:49:29.994	2026-09-28 06:49:29.994	8
a549efeb-1ae7-471b-96d1-681db59ed964	Bandung Cosplay Festival	cosplay anime sebandung	bandung	2026-09-30 11:37:00	2026-09-28 06:37:36.876	2026-09-28 07:19:05.443	6
67cedc02-329f-4079-b0cf-7f94d6e1d92f	bandung cosplay festival	festival bertema jepang	bandung	2026-10-01 08:40:00	2026-09-28 06:40:16.231	2026-09-28 07:37:51.03	7
\.


--
-- TOC entry 5029 (class 0 OID 81966)
-- Dependencies: 221
-- Data for Name: tickets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tickets (id, "eventId", "customerName", "customerEmail", quantity, "createdAt", "publicId") FROM stdin;
2f67acca-f1e2-4b08-aa33-6203449fcecd	733b3659-eaec-4f8c-a06c-0827294c9309	Lukman	lukman@example.com	5	2026-09-28 02:01:33.086	1
a5a8377c-8aee-442d-8bfb-9e57e8792195	733b3659-eaec-4f8c-a06c-0827294c9309	Yusuf	Yusuf@example.com	2	2026-09-28 02:01:53.595	2
82cf884d-175b-462d-a221-7f859e24ba9a	733b3659-eaec-4f8c-a06c-0827294c9309	Hendra	Hendra@example.com	10	2026-09-28 02:02:09.938	3
2c3c1b14-391e-46af-a70d-2f3fd2e558b0	2279c0ff-820a-45b8-8e2c-5cfe2b699b33	Mada	Mada@example.com	5	2026-09-28 02:02:55.865	4
f83389dc-db3b-411c-bdb0-ecea23b0fd36	2279c0ff-820a-45b8-8e2c-5cfe2b699b33	Doni	DOni@example.com	2	2026-09-28 02:03:09.795	5
aad3dc04-300c-45ed-8cd1-7fdd3644446e	2279c0ff-820a-45b8-8e2c-5cfe2b699b33	Yuni	Yuni@example.com	2	2026-09-28 02:03:28.641	6
b8200585-bd5f-4192-869d-9098af38d394	97d41b9d-d66e-405e-99f2-cf54fcb01872	Delwin	Delwin@example.com	8	2026-09-28 02:04:23.632	7
75f692e9-b8a5-418f-85e2-37b6df156d6b	733b3659-eaec-4f8c-a06c-0827294c9309	fulan	fulan@Explemd.com	5	2026-09-28 04:19:44.007	8
ecf67c88-0d6d-4a1f-84c7-f5e73b61bf37	5e8d54bd-f252-4cc7-b510-d14e4c98349f	iqbal	iqbal@example.com	5	2026-09-28 06:03:08.76	9
a71a0189-4429-495b-a549-8ee5cb0b2636	67cedc02-329f-4079-b0cf-7f94d6e1d92f	facri	facry@example.com	4	2026-09-28 06:41:38.458	10
850ce249-9ba8-4f8e-9800-436120f663c9	67cedc02-329f-4079-b0cf-7f94d6e1d92f	Tamara	Tamara@example.com	4	2026-09-28 07:01:23.631	11
\.


--
-- TOC entry 5039 (class 0 OID 0)
-- Dependencies: 222
-- Name: events_publicId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."events_publicId_seq"', 10, true);


--
-- TOC entry 5040 (class 0 OID 0)
-- Dependencies: 223
-- Name: tickets_publicId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."tickets_publicId_seq"', 12, true);


--
-- TOC entry 4872 (class 2606 OID 81950)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4874 (class 2606 OID 81965)
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- TOC entry 4877 (class 2606 OID 81979)
-- Name: tickets tickets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_pkey PRIMARY KEY (id);


--
-- TOC entry 4875 (class 1259 OID 82234)
-- Name: events_publicId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "events_publicId_key" ON public.events USING btree ("publicId");


--
-- TOC entry 4878 (class 1259 OID 82464)
-- Name: tickets_publicId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "tickets_publicId_key" ON public.tickets USING btree ("publicId");


--
-- TOC entry 4879 (class 2606 OID 90266)
-- Name: tickets tickets_eventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT "tickets_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES public.events(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2026-09-28 17:22:23

--
-- PostgreSQL database dump complete
--

\unrestrict bw36Ue6vu2rgndp2UkRdznTgUcLunihGu2CpuL6Qk5RhiO3bkf7s126aLvTTuSW

