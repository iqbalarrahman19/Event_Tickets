# Event Ticket

## Fitur yang Dibuat

Aplikasi **Event Ticket** merupakan aplikasi fullstack untuk mengelola event dan pemesanan tiket. Fitur yang dibuat meliputi:

### Daftar Event

Menampilkan daftar event yang tersedia beserta informasi dasar event.

### Detail Event

Menampilkan informasi lengkap event seperti judul, deskripsi, lokasi, dan tanggal pelaksanaan.

### Pemesanan Tiket

Pengguna dapat melakukan pemesanan tiket dengan mengisi nama customer, email, dan jumlah tiket.

### Daftar Tiket

Menampilkan tiket yang sudah dipesan beserta informasi customer dan event.

### Filtering Tiket

Pengguna dapat melakukan filtering tiket berdasarkan event dan email customer.

### Tambah Event

Pengguna dapat menambahkan event baru melalui form yang telah dilengkapi validasi.

### Edit Event

Informasi event yang sudah dibuat dapat diperbarui.

### Hapus Event

Event dapat dihapus melalui proses konfirmasi sebelum penghapusan dilakukan.

### Validasi dan Error Handling

Sistem melakukan validasi input dan menangani kondisi error seperti data tidak valid atau event tidak ditemukan.

### Event Kadaluarsa

Sistem mencegah pemesanan tiket pada event yang tanggal pelaksanaannya sudah terlewati.

### Statistik Event

Menampilkan event dengan jumlah tiket terbanyak dan event dengan jumlah tiket terendah.

---

## Database

Aplikasi menggunakan **PostgreSQL** untuk menyimpan data event dan tiket.

Tabel event dan tiket memiliki relasi **one-to-many**, yaitu satu event dapat memiliki banyak tiket.

File SQL database:

```text
database/database.sql

Teknologi
Frontend
Next.js
React
TypeScript
Tailwind CSS
Backend
Node.js
Express
TypeScript
Database
PostgreSQL
Tantangan & Cara Penyelesaian

Beberapa tantangan yang ditemukan dalam proses pembuatan aplikasi antara lain:

Menghubungkan frontend dengan REST API pada backend.
Mengelola relasi antara data event dan tiket.
Melakukan validasi input pada proses pembuatan event dan pemesanan tiket.
Menangani event yang sudah melewati tanggal pelaksanaan agar tidak dapat dipesan.
Menampilkan feedback kepada pengguna menggunakan alert dan confirmation modal.
Mengurutkan dan menampilkan statistik jumlah tiket berdasarkan event.
Improvement Jika Ada Waktu

Beberapa pengembangan yang dapat dilakukan selanjutnya:

Menambahkan sistem autentikasi dan authorization.
Menambahkan pagination pada daftar event dan tiket.
Menambahkan fitur pencarian event.
Menambahkan dashboard statistik yang lebih lengkap.
Menambahkan upload gambar untuk event.
Menambahkan sistem pembayaran tiket.
Meningkatkan desain UI agar lebih responsif dan interaktif.
```
