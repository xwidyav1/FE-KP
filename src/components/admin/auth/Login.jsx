"use client";
import React, { useState } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";
import Image from "next/image"

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading indicator
  const router = useRouter();

  // Fungsi untuk memvalidasi reCAPTCHA ke backend
  const handleRecaptchaVerify = async (recaptchaToken) => {
    console.log("Memulai validasi reCAPTCHA...");
    console.log("Token reCAPTCHA yang dikirim:", recaptchaToken);
    try {
      const response = await axios.post(
        "http://localhost:8000/validate-recaptcha", // Endpoint Laravel
        { "g-recaptcha-response": recaptchaToken }
      );
      console.log("Hasil respons validasi reCAPTCHA dari backend:", response.data);
      return response.data.success; // Return true jika valid
    } catch (error) {
      console.error("Error verifying reCAPTCHA:", error.response?.data || error.message);
      return false; // Return false jika gagal
    }
  };

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage("Username dan password harus diisi.");
      console.log("Username atau password kosong.");
      return;
    }

    if (!recaptchaToken) {
      setErrorMessage("Harap selesaikan verifikasi reCAPTCHA.");
      console.log("Token reCAPTCHA belum diisi.");
      return;
    }

    setIsSubmitting(true); // Set loading menjadi true
    try {
      // Verifikasi reCAPTCHA terlebih dahulu
      console.log("Memulai proses verifikasi reCAPTCHA...");
      const isValidCaptcha = await handleRecaptchaVerify(recaptchaToken);
      if (!isValidCaptcha) {
        setErrorMessage("Verifikasi reCAPTCHA gagal.");
        console.log("Validasi reCAPTCHA gagal di backend.");
        setIsSubmitting(false); // Reset loading
        return;
      }

      console.log("Validasi reCAPTCHA berhasil. Melanjutkan proses login...");

      // Jika CAPTCHA valid, dapatkan token CSRF
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      // Kirim permintaan login
      const response = await axios.post(
        "http://localhost:8000/login",
        {
          username,
          password,
          recaptchaToken,
        },
        {
          headers: {
            accept: "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Login berhasil. Respons dari backend:", response.data);
      alert(response.data.message); // Tampilkan pesan berhasil
      router.push(response.data.redirect_url || "/admin"); // Redirect ke halaman admin
    } catch (error) {
      console.error("Login gagal:", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || "Login gagal.");
    } finally {
      setIsSubmitting(false); // Reset loading
    }
  };

  const handleRecaptchaChange = (token) => {
    console.log("Token reCAPTCHA diperbarui:", token);
    setRecaptchaToken(token); // Simpan token reCAPTCHA
    setErrorMessage(""); // Reset error
  };

  const handleRecaptchaExpired = () => {
    console.log("Token reCAPTCHA telah kedaluwarsa.");
    setRecaptchaToken(null); // Hapus token jika kadaluarsa
    setErrorMessage("Token reCAPTCHA telah kadaluarsa. Mohon ulangi verifikasi.");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-500">
      <div className="flex flex-row w-[70vw] h-[35vw] bg-gray-100 rounded-[1vw] overflow-hidden shadow-lg">
        <div className="relative w-[40vw] aspect-[1276/1080]">
          <Image
            src="/auth-bg.png"
            alt="background"
            className="absolute w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col w-[30vw] justify-center items-center gap-y-[2vw]">
          <div className="relative w-[15vw] aspect-[2114/579]">
            <Image
              src="/logo-csirt-kemhan.png"
              alt="logo CSIRT Kemhan"
              className="absolute w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col w-[25vw] gap-y-[1vw]">
            <p className="font-semibold text-[1.3vw] text-center">Login</p>
            <div>
              <p>Username</p>
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <p>Password</p>
              <input
                type="password"
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} // Ganti dengan site key Anda
                onChange={handleRecaptchaChange}
                onExpired={handleRecaptchaExpired}
              />
              {errorMessage && (
                <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
              )}
            </div>
            <button
              onClick={handleLogin}
              className="h-[2.5vw] bg-black text-white rounded-[1vw] hover:bg-gray-800 transition duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
