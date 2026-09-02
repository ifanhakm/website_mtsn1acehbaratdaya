# Deployment produksi

Deployment menggunakan image `ghcr.io/ifanhakm/website_mtsn1acehbaratdaya:production`,
Docker Compose, dan Caddy. Media, dokumen, cache ISR, serta data Caddy disimpan
di Docker named volumes agar tetap ada saat container diperbarui.

## GitHub Actions

Tambahkan Actions secrets berikut pada environment `production`:

- `VPS_HOST`: alamat IP atau hostname VPS.
- `VPS_USER`: pengguna SSH deployment.
- `VPS_SSH_KEY`: private key SSH khusus deployment (tanpa password akun VPS).
- `VPS_HOST_KEY`: baris host key dari `ssh-keyscan`, diverifikasi terhadap host key VPS.

Tambahkan repository variables berikut:

- `VPS_DEPLOY_ENABLED=true` untuk mengaktifkan job deployment.
- `NEXT_PUBLIC_SERVER_URL=http://43.173.7.84` sampai DNS domain aktif; setelah itu
  ubah ke URL HTTPS domain dan jalankan ulang workflow.

Tanpa `VPS_DEPLOY_ENABLED=true`, workflow tetap menguji dan menerbitkan image,
tetapi sengaja melewati akses ke VPS.

## File VPS

Direktori `/opt/mtsn1acehbaratdaya` memerlukan dua file yang tidak masuk Git:

- `.env.production`: kredensial aplikasi dan database.
- `.env.deploy`: salinan `deploy/.env.deploy.example` berisi alamat situs dan image.

Setelah DNS domain mengarah ke VPS, ubah `SITE_ADDRESS` pada `.env.deploy` menjadi
nama domain HTTPS, ubah `NEXT_PUBLIC_SERVER_URL` pada `.env.production`, lalu jalankan:

```sh
docker compose --env-file .env.deploy up -d
```

## Migrasi database

Skema produksi dikelola oleh migrasi di `src/migrations`. Untuk database baru,
set `RUN_DATABASE_MIGRATIONS=true` pada `.env.production`; aplikasi akan
menjalankan migrasi yang belum tercatat sebelum menerima request.

Pertahankan `ALLOW_DEV_SCHEMA_PUSH=false` untuk database production. Opsi ini
hanya boleh diaktifkan sementara pada database development yang terpisah.

Database lama yang sebelumnya dibuat melalui schema push development harus
dibaseline satu kali sebelum opsi tersebut diaktifkan:

1. Buat backup PostgreSQL/Supabase.
2. Pastikan skema database sudah sama dengan commit yang akan dideploy.
3. Hapus hanya catatan development migration (`batch = -1`) dari tabel
   `payload_migrations`; jangan menghapus tabel atau data aplikasi.
4. Set `RUN_DATABASE_MIGRATIONS=true` dan deploy. Migrasi awal mendeteksi tabel
   yang sudah ada dan hanya dicatat sebagai baseline.

Selama baseline belum dilakukan, workflow deployment sengaja menetapkan
`RUN_DATABASE_MIGRATIONS=false`. Mengaktifkannya pada database yang masih memiliki
catatan `batch = -1` akan membuka prompt interaktif saat Payload pertama kali
diinisialisasi dan membuat seluruh route berbasis database menunggu. Setelah
baseline selesai dan terverifikasi, ubah pengaturan workflow tersebut menjadi
`true` agar migrasi berikutnya kembali berjalan otomatis.

Setelah baseline, setiap perubahan koleksi wajib disertai migrasi baru melalui
`npm run payload -- migrate:create nama_perubahan`.

## Pool database dan pemeriksaan kesehatan

Deployment VPS memakai Supavisor session mode pada port `5432`. Untuk satu
container aplikasi, gunakan nilai awal berikut di `.env.production`:

```env
DATABASE_POOL_MAX=5
DATABASE_CONNECTION_TIMEOUT_MS=5000
DATABASE_STATEMENT_TIMEOUT_MS=10000
DATABASE_QUERY_TIMEOUT_MS=12000
DATABASE_LOCK_TIMEOUT_MS=3000
DATABASE_IDLE_TRANSACTION_TIMEOUT_MS=10000
```

`/health` hanya memeriksa apakah proses Next.js hidup dan dipakai oleh
healthcheck Docker. `/ready` turut memeriksa database dan menjadi gerbang akhir
workflow deployment. Pemisahan ini mencegah pemeriksaan Docker menambah antrean
query ketika database sedang mengalami gangguan, sekaligus mencegah deployment
berstatus sukses ketika hanya proses Next.js yang hidup.

Jika sebuah migrasi terencana memang memerlukan lebih dari 10 detik per
statement, naikkan sementara `DATABASE_STATEMENT_TIMEOUT_MS` dan
`DATABASE_QUERY_TIMEOUT_MS`, jalankan deployment terkontrol, lalu kembalikan
ke nilai normal.
