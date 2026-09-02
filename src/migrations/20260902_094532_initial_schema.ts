import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Database yang dibuat melalui schema push Payload sebelum sistem migrasi
  // diaktifkan sudah memiliki tabel ini. Pada kasus tersebut migrasi awal
  // bertindak sebagai baseline dan tidak membuat ulang tabel yang ada.
  const existingSchema = await db.execute(sql`
    SELECT to_regclass('public.payload_migrations') AS table_name;
  `);
  if (existingSchema.rows[0]?.table_name) return;

  await db.execute(sql`
   CREATE TYPE "public"."enum_staf_jenis_ptk" AS ENUM('guru', 'staf');
  CREATE TYPE "public"."enum_berita_category" AS ENUM('Akademik', 'Kesiswaan', 'Pengumuman', 'Prestasi');
  CREATE TYPE "public"."enum_berita_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_dokumen_category" AS ENUM('siswa', 'kepegawaian', 'umum');
  CREATE TYPE "public"."enum_kategori_layanan_items_icon" AS ENUM('rdm', 'emis', 'pusaka', 'download', 'aktif', 'asn', 'ppdb', 'saran', 'absensi');
  CREATE TYPE "public"."enum_galeri_category" AS ENUM('kegiatan', 'fasilitas', 'prestasi', 'keagamaan');
  CREATE TYPE "public"."enum_galeri_aspect_ratio" AS ENUM('aspect-square', 'aspect-video', 'aspect-[4/3]');
  CREATE TABLE "users_sessions" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "created_at" timestamp(3) with time zone,
    "expires_at" timestamp(3) with time zone NOT NULL
  );

  CREATE TABLE "users" (
    "id" serial PRIMARY KEY NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "email" varchar NOT NULL,
    "reset_password_token" varchar,
    "reset_password_expiration" timestamp(3) with time zone,
    "salt" varchar,
    "hash" varchar,
    "login_attempts" numeric DEFAULT 0,
    "lock_until" timestamp(3) with time zone
  );

  CREATE TABLE "staf" (
    "id" serial PRIMARY KEY NOT NULL,
    "nama_lengkap" varchar NOT NULL,
    "nip" varchar,
    "jabatan" varchar NOT NULL,
    "jenis_ptk" "enum_staf_jenis_ptk" DEFAULT 'guru' NOT NULL,
    "foto_id" integer NOT NULL,
    "urutan" numeric DEFAULT 99 NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "berita" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar NOT NULL,
    "slug" varchar,
    "category" "enum_berita_category" DEFAULT 'Akademik' NOT NULL,
    "excerpt" varchar NOT NULL,
    "content" varchar NOT NULL,
    "image_id" integer NOT NULL,
    "author_id" integer NOT NULL,
    "read_time" varchar DEFAULT '3 Menit' NOT NULL,
    "date" timestamp(3) with time zone NOT NULL,
    "is_featured" boolean DEFAULT false,
    "status" "enum_berita_status" DEFAULT 'draft' NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "media" (
    "id" serial PRIMARY KEY NOT NULL,
    "alt" varchar NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "url" varchar,
    "thumbnail_u_r_l" varchar,
    "filename" varchar,
    "mime_type" varchar,
    "filesize" numeric,
    "width" numeric,
    "height" numeric,
    "focal_x" numeric,
    "focal_y" numeric
  );

  CREATE TABLE "dokumen" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar NOT NULL,
    "description" varchar NOT NULL,
    "category" "enum_dokumen_category" DEFAULT 'siswa' NOT NULL,
    "badge" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "url" varchar,
    "thumbnail_u_r_l" varchar,
    "filename" varchar,
    "mime_type" varchar,
    "filesize" numeric,
    "width" numeric,
    "height" numeric,
    "focal_x" numeric,
    "focal_y" numeric
  );

  CREATE TABLE "kategori_layanan_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "title" varchar NOT NULL,
    "description" varchar NOT NULL,
    "href" varchar NOT NULL,
    "is_external" boolean DEFAULT true,
    "icon" "enum_kategori_layanan_items_icon" DEFAULT 'pusaka' NOT NULL,
    "badge" varchar
  );

  CREATE TABLE "kategori_layanan" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar NOT NULL,
    "description" varchar NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "galeri" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar NOT NULL,
    "description" varchar NOT NULL,
    "category" "enum_galeri_category" DEFAULT 'kegiatan' NOT NULL,
    "date" varchar NOT NULL,
    "aspect_ratio" "enum_galeri_aspect_ratio" DEFAULT 'aspect-video' NOT NULL,
    "image_id" integer NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "payload_kv" (
    "id" serial PRIMARY KEY NOT NULL,
    "key" varchar NOT NULL,
    "data" jsonb NOT NULL
  );

  CREATE TABLE "payload_locked_documents" (
    "id" serial PRIMARY KEY NOT NULL,
    "global_slug" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "payload_locked_documents_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "users_id" integer,
    "staf_id" integer,
    "berita_id" integer,
    "media_id" integer,
    "dokumen_id" integer,
    "kategori_layanan_id" integer,
    "galeri_id" integer
  );

  CREATE TABLE "payload_preferences" (
    "id" serial PRIMARY KEY NOT NULL,
    "key" varchar,
    "value" jsonb,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "payload_preferences_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "users_id" integer
  );

  CREATE TABLE "payload_migrations" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar,
    "batch" numeric,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "profil_sekolah_lini_masa" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "tahun" varchar NOT NULL,
    "judul_peristiwa" varchar NOT NULL,
    "deskripsi_peristiwa" varchar NOT NULL
  );

  CREATE TABLE "profil_sekolah_misi" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "teks_misi" varchar NOT NULL
  );

  CREATE TABLE "profil_sekolah_tujuan" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "teks_tujuan" varchar NOT NULL
  );

  CREATE TABLE "profil_sekolah" (
    "id" serial PRIMARY KEY NOT NULL,
    "sambutan_kepala" varchar,
    "sejarah_panjang" varchar,
    "visi" varchar NOT NULL,
    "updated_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone
  );

  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "staf" ADD CONSTRAINT "staf_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "berita" ADD CONSTRAINT "berita_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "berita" ADD CONSTRAINT "berita_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "kategori_layanan_items" ADD CONSTRAINT "kategori_layanan_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kategori_layanan"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "galeri" ADD CONSTRAINT "galeri_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_staf_fk" FOREIGN KEY ("staf_id") REFERENCES "public"."staf"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_berita_fk" FOREIGN KEY ("berita_id") REFERENCES "public"."berita"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_dokumen_fk" FOREIGN KEY ("dokumen_id") REFERENCES "public"."dokumen"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_kategori_layanan_fk" FOREIGN KEY ("kategori_layanan_id") REFERENCES "public"."kategori_layanan"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_galeri_fk" FOREIGN KEY ("galeri_id") REFERENCES "public"."galeri"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "profil_sekolah_lini_masa" ADD CONSTRAINT "profil_sekolah_lini_masa_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."profil_sekolah"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "profil_sekolah_misi" ADD CONSTRAINT "profil_sekolah_misi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."profil_sekolah"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "profil_sekolah_tujuan" ADD CONSTRAINT "profil_sekolah_tujuan_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."profil_sekolah"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "staf_foto_idx" ON "staf" USING btree ("foto_id");
  CREATE INDEX "staf_updated_at_idx" ON "staf" USING btree ("updated_at");
  CREATE INDEX "staf_created_at_idx" ON "staf" USING btree ("created_at");
  CREATE UNIQUE INDEX "berita_slug_idx" ON "berita" USING btree ("slug");
  CREATE INDEX "berita_image_idx" ON "berita" USING btree ("image_id");
  CREATE INDEX "berita_author_idx" ON "berita" USING btree ("author_id");
  CREATE INDEX "berita_updated_at_idx" ON "berita" USING btree ("updated_at");
  CREATE INDEX "berita_created_at_idx" ON "berita" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "dokumen_updated_at_idx" ON "dokumen" USING btree ("updated_at");
  CREATE INDEX "dokumen_created_at_idx" ON "dokumen" USING btree ("created_at");
  CREATE UNIQUE INDEX "dokumen_filename_idx" ON "dokumen" USING btree ("filename");
  CREATE INDEX "kategori_layanan_items_order_idx" ON "kategori_layanan_items" USING btree ("_order");
  CREATE INDEX "kategori_layanan_items_parent_id_idx" ON "kategori_layanan_items" USING btree ("_parent_id");
  CREATE INDEX "kategori_layanan_updated_at_idx" ON "kategori_layanan" USING btree ("updated_at");
  CREATE INDEX "kategori_layanan_created_at_idx" ON "kategori_layanan" USING btree ("created_at");
  CREATE INDEX "galeri_image_idx" ON "galeri" USING btree ("image_id");
  CREATE INDEX "galeri_updated_at_idx" ON "galeri" USING btree ("updated_at");
  CREATE INDEX "galeri_created_at_idx" ON "galeri" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_staf_id_idx" ON "payload_locked_documents_rels" USING btree ("staf_id");
  CREATE INDEX "payload_locked_documents_rels_berita_id_idx" ON "payload_locked_documents_rels" USING btree ("berita_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_dokumen_id_idx" ON "payload_locked_documents_rels" USING btree ("dokumen_id");
  CREATE INDEX "payload_locked_documents_rels_kategori_layanan_id_idx" ON "payload_locked_documents_rels" USING btree ("kategori_layanan_id");
  CREATE INDEX "payload_locked_documents_rels_galeri_id_idx" ON "payload_locked_documents_rels" USING btree ("galeri_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "profil_sekolah_lini_masa_order_idx" ON "profil_sekolah_lini_masa" USING btree ("_order");
  CREATE INDEX "profil_sekolah_lini_masa_parent_id_idx" ON "profil_sekolah_lini_masa" USING btree ("_parent_id");
  CREATE INDEX "profil_sekolah_misi_order_idx" ON "profil_sekolah_misi" USING btree ("_order");
  CREATE INDEX "profil_sekolah_misi_parent_id_idx" ON "profil_sekolah_misi" USING btree ("_parent_id");
  CREATE INDEX "profil_sekolah_tujuan_order_idx" ON "profil_sekolah_tujuan" USING btree ("_order");
  CREATE INDEX "profil_sekolah_tujuan_parent_id_idx" ON "profil_sekolah_tujuan" USING btree ("_parent_id");`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "staf" CASCADE;
  DROP TABLE "berita" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "dokumen" CASCADE;
  DROP TABLE "kategori_layanan_items" CASCADE;
  DROP TABLE "kategori_layanan" CASCADE;
  DROP TABLE "galeri" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "profil_sekolah_lini_masa" CASCADE;
  DROP TABLE "profil_sekolah_misi" CASCADE;
  DROP TABLE "profil_sekolah_tujuan" CASCADE;
  DROP TABLE "profil_sekolah" CASCADE;
  DROP TYPE "public"."enum_staf_jenis_ptk";
  DROP TYPE "public"."enum_berita_category";
  DROP TYPE "public"."enum_berita_status";
  DROP TYPE "public"."enum_dokumen_category";
  DROP TYPE "public"."enum_kategori_layanan_items_icon";
  DROP TYPE "public"."enum_galeri_category";
  DROP TYPE "public"."enum_galeri_aspect_ratio";`);
}
