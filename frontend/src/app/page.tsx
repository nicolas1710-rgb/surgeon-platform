"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ExpertiseSection from "@/components/sections/ExpertiseSection";
import GallerySection from "@/components/sections/GallerySection";
import LocationSection from "@/components/sections/LocationSection";
import AppointmentSection from "@/components/sections/AppointmentSection";
import Footer from "@/components/sections/Footer";
import CookieBanner from "@/components/CookieBanner";
import { api } from "@/lib/api";

export default function HomePage() {
    const [profile, setProfile] = useState<any>(null);
    const [procedures, setProcedures] = useState<any[]>([]);
    const [gallery, setGallery] = useState<any[]>([]);
    const [location, setLocation] = useState<any>(null);
    const [loaded, setLoaded] = useState(false);

    // ── Global Background Controller ──
    // IMPORTANT: Hooks must be called before any early returns
    const { scrollYProgress } = useScroll();
    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.2, 0.35, 0.55, 0.75, 0.85, 0.95],
        ["#FFFFFF", "#FFFFFF", "#F8FAFC", "#FFFFFF", "#F1F5F9", "#0A1929", "#0A1929"]
    );

    useEffect(() => {
        const loadData = async () => {
            try {
                const [profileRes, proceduresRes, galleryRes, locationRes] = await Promise.allSettled([
                    api.getProfile(),
                    api.getProcedures(),
                    api.getGallery(),
                    api.getLocation(),
                ]);

                if (profileRes.status === "fulfilled") setProfile(profileRes.value);
                if (proceduresRes.status === "fulfilled") setProcedures(proceduresRes.value);
                if (galleryRes.status === "fulfilled") setGallery(galleryRes.value);
                if (locationRes.status === "fulfilled") setLocation(locationRes.value);
            } catch (err) {
                console.log("Using fallback data");
            }
            setLoaded(true);
        };

        loadData();
    }, []);

    if (!loaded) {
        return (
            <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white">
                <div className="relative mb-8">
                    <div className="w-16 h-16 rounded-full border-2 border-gray-100" />
                    <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-transparent border-t-[#0A1929] animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center font-bold text-[#0A1929] text-lg">DH</div>
                </div>
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400 animate-pulse">Cargando Experiencia</p>
            </div>
        );
    }

    return (
        <main className="relative">
            {/* ── Fixed Background Layer for Fluid Transitions ── */}
            <motion.div
                style={{ backgroundColor }}
                className="fixed inset-0 -z-50 pointer-events-none transition-colors duration-500"
            />
            <Navbar />

            {/* Sections passed with transparent backgrounds to reveal global controller */}
            <div className="relative z-0">
                <HeroSection profile={profile} />
                <ExpertiseSection procedures={procedures} />
                <GallerySection gallery={gallery} />
                <LocationSection location={location} />
                <AppointmentSection profile={profile} />
                {/* Footer has its own solid background so it covers the controller at the very end */}
                <Footer />
            </div>

            <CookieBanner />
        </main>
    );
}
