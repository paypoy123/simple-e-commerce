import React, { useState } from 'react';
import styles from './CheckoutForm.module.scss';
import { Button } from '../ui/Button';

// Tambahkan tipe untuk prop `onSubmit`
interface CheckoutFormProps {
  onSubmit: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit }) => {
  // State untuk menyimpan input dari user
  const [name, setName] = useState(''); // Nama lengkap
  const [email, setEmail] = useState(''); // Email
  const [error, setError] = useState(''); // Pesan error jika ada

  // Fungsi untuk menangani form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah reload halaman saat submit form

    // Validasi form: Pastikan nama dan email diisi
    if (!name || !email) {
      setError('Semua field harus diisi.'); // Set error jika ada field yang kosong
      console.log('Error: Semua field harus diisi.');
      return;
    }

    // Validasi email: Pastikan format email valid
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Format email tidak valid.'); // Set error jika format email salah
      console.log('Error: Format email tidak valid.');
      return;
    }

    // Jika tidak ada error, reset error dan panggil onSubmit
    setError('');
    console.log('Form submitted with data:', { name, email });
    onSubmit(); // Panggil fungsi onSubmit yang diterima sebagai prop
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Checkout</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Form input untuk nama lengkap */}
        <div className={styles.formGroup}>
          <input
            type='text'
            id='name'
            value={name} // Bind input value dengan state name
            onChange={(e) => setName(e.target.value)} // Update state name saat input berubah
            className={styles.input}
            placeholder=' '
          />
          <label htmlFor='name' className={styles.label}>
            Nama Lengkap
          </label>
        </div>

        {/* Form input untuk email */}
        <div className={styles.formGroup}>
          <input
            type='email'
            id='email'
            value={email} // Bind input value dengan state email
            onChange={(e) => setEmail(e.target.value)} // Update state email saat input berubah
            className={styles.input}
            placeholder=' '
          />
          <label htmlFor='email' className={styles.label}>
            Email
          </label>
        </div>

        {/* Menampilkan error jika ada */}
        {error && <p className={styles.error}>{error}</p>}

        {/* Tombol submit */}
        <Button type='submit' className={styles.submitButton}>
          Lanjutkan Pembayaran
        </Button>
      </form>
    </div>
  );
};

export default CheckoutForm;

/*
Penjelasan Kode:
State name, email, dan error:

name dan email adalah state yang menyimpan nilai input dari pengguna. Setiap perubahan pada input akan memperbarui nilai ini.
error menyimpan pesan kesalahan jika ada validasi yang gagal, seperti jika ada field yang kosong atau format email tidak valid.
Fungsi handleSubmit:

Fungsi ini menangani proses submit form.
e.preventDefault() mencegah form melakukan reload halaman saat disubmit.
Validasi pertama memastikan bahwa name dan email tidak kosong, dan jika kosong, akan mengatur error dan menampilkan pesan kesalahan.
Validasi kedua memeriksa apakah email yang dimasukkan sesuai dengan format email yang benar (menggunakan regex).
Jika tidak ada error, onSubmit() dipanggil dan console.log() mencetak data yang telah diisi (nama dan email).
Input Field untuk name dan email:

Setiap input memiliki atribut value yang diikat ke state (name dan email), yang menjadikannya controlled component.
onChange digunakan untuk memperbarui state ketika pengguna mengetik.
Menampilkan Error:

Jika ada error, pesan error akan ditampilkan di bawah form.
Tombol Submit:

Ketika tombol submit diklik, handleSubmit dipanggil.
Penambahan console.log():
console.log("Error: Semua field harus diisi.") akan dicetak jika ada field yang kosong.
console.log("Error: Format email tidak valid.") akan dicetak jika format email salah.
console.log("Form submitted with data:", { name, email }) akan dicetak ketika form disubmit dengan data yang valid.
Dengan penambahan console.log(), kamu bisa melihat apa yang terjadi saat validasi form dan apa data yang dikirim saat form berhasil disubmit.
*/
