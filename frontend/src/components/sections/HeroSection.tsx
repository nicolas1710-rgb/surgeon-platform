"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Award, Users, Clock } from "lucide-react";


interface HeroSectionProps {
    profile: {
        firstName?: string;
        lastName?: string;
        specialty?: string;
        yearsOfExperience?: number;
        heroVideoUrl?: string;
        profileImageUrl?: string;
    } | null;
}

function StatBadge({ icon: Icon, label, sub }: { icon: any, label: string, sub?: string }) {
    return (
        <div className="flex items-center gap-3 bg-[#F1F5F9] backdrop-blur-md rounded-full px-5 py-2.5 shadow-sm border border-white/50">
            <Icon size={20} className="text-[#0A1929]" />
            <div className="flex flex-col leading-none">
                <span className="text-[16px] font-bold text-[#0A1929] tracking-tight">{label}</span>
                {sub && <span className="text-[10px] text-[#475569] uppercase tracking-wider font-semibold">{sub}</span>}
            </div>
        </div>
    );
}

const FALLBACK_PHOTO = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400";

export default function HeroSection({ profile }: HeroSectionProps) {
    const name = profile ? `Dr. ${profile.firstName || ""} ${profile.lastName || ""}`.trim() : "Dr. Hamilton";
    const specialty = profile?.specialty || "Cirujano Plástico Certificado";
    const photoUrl = profile?.profileImageUrl || FALLBACK_PHOTO;

    return (
        <section id="hero" className="scroll-mt-24 relative h-[100dvh] min-h-[700px] grid lg:grid-cols-2 overflow-hidden bg-white">

            {/* ── LEFT: Info Stack ── */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative flex flex-col justify-start px-8 md:px-16 lg:px-24 pt-20 pb-20 order-2 lg:order-1 z-20 h-full"
            >
                <div className="w-full max-w-[520px] mx-auto lg:mx-0 flex flex-col gap-6 py-2">

                    {/* Top Group: Identity & Photo */}
                    <div className="flex flex-col gap-6">
                        <div>
                            <span className="block text-[22px] font-sans text-[#0A1929] mb-1 font-normal">DH</span>
                            <h1 className="text-4xl lg:text-5xl font-serif text-[#0A1929] leading-tight">
                                {name}
                            </h1>
                            <p className="text-[#64748B] text-sm font-medium uppercase tracking-widest mt-2">
                                {specialty}
                            </p>
                        </div>

                        {/* Photo */}
                        <div className="relative w-[160px] h-[160px] group">
                            <div className="absolute inset-0 rounded-full border-[1px] border-[#4A90E2]/20 scale-110 group-hover:scale-125 transition-transform duration-500 ease-out" />
                            <img
                                src={photoUrl}
                                alt={name}
                                className="w-full h-full rounded-full object-cover shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] group-hover:scale-105 transition-transform duration-500 ease-out z-10 relative bg-white"
                            />
                        </div>
                    </div>

                    {/* Bottom Group: Info & CTA */}
                    <div className="flex flex-col gap-4">
                        <p className="text-[#334155] text-[18px] font-light italic leading-relaxed">
                            "Resultados naturales con precisión quirúrgica"
                        </p>

                        {/* Credentials */}
                        <ul className="space-y-3 text-[15px] text-[#0F172A] font-medium">
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#4A90E2]" />
                                15+ años experiencia quirúrgica
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#4A90E2]" />
                                Certificación Internacional
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#4A90E2]" />
                                Top Doctor 2024
                            </li>
                        </ul>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-4 w-full">
                            <StatBadge icon={Award} label="+15" sub="AÑOS" />
                            <StatBadge icon={Users} label="+2500" sub="PACIENTES" />
                            <StatBadge icon={Clock} label="24/7" sub="ATENCIÓN" />
                        </div>

                        {/* CTA */}
                        <div>
                            <a href="#appointment" className="inline-flex items-center gap-2 btn-primary rounded-full px-8 py-4 bg-[#0A1929] text-white hover:bg-[#0f233a] hover:scale-[1.02] shadow-[0_8px_20px_rgba(10,25,41,0.25)] transition-all">
                                Agendar Consulta <ArrowRight size={18} />
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* ── RIGHT: VIDEO LOOP CORREGIDO ── */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative w-full lg:w-[110%] lg:-ml-[5%] h-[40vh] lg:h-screen bg-[#8B0000] overflow-hidden group order-1 lg:order-2 cursor-pointer"

            >
                <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 z-10">
                    {/* ✅ VIDEO DIRECTO CON RUTA IMPORTADA - SIN CONDICIÓN */}
                    <video
                        src="/videos/video2.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-500"
                    />
                </div>
                {/* ✅ OVERLAY OSCURO SUTIL QUE DESAPARECE AL HOVER */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-colors duration-500 z-20" />
            </motion.div>

        </section>
    );
}
