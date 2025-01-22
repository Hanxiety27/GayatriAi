// src/BiodataPage.jsx
import React from 'react';
import Developer1Image from './assets/aku.jpg';
import Developer2Image from './assets/dika.jpg';

import './BiodataPage.css'; // Impor file CSS untuk styling halaman biodata

function BiodataPage() {
    return (
        <div className="biodata-page">
            <h2 className="text-3xl font-bold mb-6 text-center">Para Pengembang Gayatri Ai</h2> <br />

            <div className="creator">
                <img src={Developer1Image} alt="Muhammad Reihan Febyawan" className="creator-photo" />
                <h3 className="creator-name">Muhammad Reihan Febyawan</h3>
                <p className="creator-role">Full Stack Developer</p>
                <p className="creator-bio">
                    Saya yang bertanggung jawab atas pengembangan tampilan aplikasi dan integrasi API AI. Menggunakan React.js, Vite.js, dan Tailwind CSS, saya menciptakan antarmuka yang responsif dan efisien, serta memastikan konektivitas yang lancar antara frontend dan backend. Dengan fokus pada performa dan pengalaman pengguna.
                </p>
            </div>

            <div className="creator">
                <img src={Developer2Image} alt="Muhamad Prawira Mahardika" className="creator-photo" />
                <h3 className="creator-name">Muhamad Prawira Mahardika</h3>
                <p className="creator-role">Desain UI/UX</p>
                <p className="creator-bio">
                    Sebagai UI/UX Designer, saya bertanggung jawab merancang antarmuka yang ramah pengguna melalui prototipe di Figma. Selain desain, saya juga mengembangkan ERD dan PDM untuk struktur data, memastikan alur data yang efisien. Dengan Business Model Canvas, saya merumuskan strategi agar aplikasi memenuhi kebutuhan pengguna dan tujuan bisnis.
                </p>
            </div>
            <footer className="text-center text-white mt-8 text-sm opacity-75">
                &copy; 2024 Putra Mandala Team
            </footer>
        </div>
    );
}

export default BiodataPage;
