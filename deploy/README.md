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

