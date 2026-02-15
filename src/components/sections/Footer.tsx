"use client";

import { motion } from "framer-motion";
import { ArrowUp, Instagram, Facebook, Youtube, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <footer className="bg-navy pt-20 pb-10">
            <div className="container-main">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-5">
                        <div className="flex items-center gap-2.5 mb-6">
                            <div className="w-9 h-9 rounded-lg bg-blue flex items-center justify-center">
                                <span className="text-white font-bold text-sm">SP</span>
                            </div>
                            <span className="text-lg font-bold text-white tracking-tight">
                                Surgeon<span className="font-normal text-white/40">Platform</span>
                            </span>
                        </div>
                        <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-8">
                            Dedicados a la excelencia quirúrgica y resultados naturales.
                            Transformamos vidas con tecnología de vanguardia y atención personalizada.
                        </p>
                        <div className="flex gap-3">
                            {[Instagram, Facebook, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:bg-blue hover:text-white transition-all duration-300">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="lg:col-span-3">
                        <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/30 mb-6">Navegación</h4>
                        <nav className="flex flex-col gap-3.5">
                            {[
                                { label: "Inicio", href: "#hero" },
                                { label: "Especialidades", href: "#expertise" },
                                { label: "Galería", href: "#gallery" },
                                { label: "Ubicación", href: "#location" },
                                { label: "Agendar Cita", href: "#appointment" },
                            ].map((item, i) => (
                                <a key={i} href={item.href} className="text-sm text-white/50 hover:text-white transition-colors">
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Contact */}
                    <div className="lg:col-span-4">
                        <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/30 mb-6">Sede Central</h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <MapPin size={16} className="text-blue flex-shrink-0 mt-1" />
                                <p className="text-sm text-white/50 leading-relaxed">Hospital Departamental Universitario del Quindío San Juan de Dios</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={16} className="text-blue flex-shrink-0" />
                                <p className="text-sm text-white/50">+52 55 5255 9600</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={16} className="text-blue flex-shrink-0" />
                                <p className="text-sm text-white/50">contacto@drhamilton.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gold Accent Line */}
                <div className="h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-10" />

                {/* Bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[11px] text-white/20 font-medium text-center">
                        © {new Date().getFullYear()} SurgeonPlatform. Todos los derechos reservados.
                    </p>
                    <div className="flex items-center gap-8">
                        <a href="#" className="text-[10px] font-semibold uppercase tracking-widest text-white/20 hover:text-white/50 transition-colors">Privacidad</a>
                        <a href="#" className="text-[10px] font-semibold uppercase tracking-widest text-white/20 hover:text-white/50 transition-colors">Términos</a>
                        <button
                            onClick={scrollToTop}
                            className="group flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-white/30 hover:text-white transition-all"
                        >
                            Subir
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue transition-all duration-300">
                                <ArrowUp size={14} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
