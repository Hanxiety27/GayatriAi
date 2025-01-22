// src/WelcomePage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import WelcomeAudio from './assets/audio/welcome.mp3';
import './WelcomePage.css';
import './App.css';

import GayatriLogo from './assets/Gayatri-Logo.png';

function WelcomePage() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  const handleGoClick = () => {
    const audio = new Audio(WelcomeAudio);
    audio.play().catch((error) => {
      console.error("Audio failed to play:", error);
    });

    setFadeOut(true);

    setTimeout(() => {
      navigate("/chat");
    }, 1000);
  };

  return (
    <div className={`welcome-page ${fadeOut ? "fade-out" : ""}`}>
      <div className="content">
        <h1 className="font-bold mb-4 welcome">
          <span className="text-white">Welcome to </span>
          <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
            Gayatri AI
          </span>
        </h1>


        <img
          src={GayatriLogo} // Ganti dengan path logo Anda nanti
          alt="Gayatri AI Logo"
          className="logo-image" // Kelas untuk styling logo
        /> <br />

        <p className="text-white text-lg mb-6">
          Gayatri AI adalah platform yang dirancang untuk memberikan akses cepat dan akurat terhadap informasi.
          Mengoptimalkan kecerdasan buatan, Gayatri AI bertujuan untuk mempermudah pengguna, terutama di dunia
          pemrograman, dalam mencari solusi terhadap masalah-masalah teknis, kode yang kompleks, atau bahkan panduan pengembangan aplikasi.
          Meskipun sangat dianjurkan untuk penggunaan terkait pemrograman, Gayatri AI juga dapat diandalkan
          untuk menjawab pertanyaan umum. Anda dapat mengajukan berbagai pertanyaan dan menemukan jawaban yang
          relevan dengan cepat dan mudah. Jadi, apapun kebutuhan Anda, Gayatri AI siap membantu Anda dalam mencari solusi.          {/* Teks deskripsi aplikasi */}
        </p>

        <button onClick={handleGoClick} className="go-button">Get Started</button>

        <footer className="text-center text-white mt-8 text-sm opacity-75">
          &copy; 2024 <Link to="/biodata" className=" hover:text-gray-300">Putra Mandala Team</Link>
        </footer>
      </div>
    </div>
  );
}

export default WelcomePage;
