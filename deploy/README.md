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

Setelah baseline, setiap perubahan koleksi wajib disertai migrasi baru melalui
`npm run payload -- migrate:create nama_perubahan`.
