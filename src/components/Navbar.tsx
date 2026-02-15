"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    // Handle Scroll for sticky contrast & active section
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            // Determine active section for indicator
            const sections = ["hero", "expertise", "gallery", "location"];
            const current = sections.find(id => {
                const el = document.getElementById(id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: "Inicio", href: "#hero", id: "hero" },
        { label: "Especialidades", href: "#expertise", id: "expertise" },
        { label: "Galería", href: "#gallery", id: "gallery" },
        { label: "Ubicación", href: "#location", id: "location" },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b ${scrolled
                        ? "bg-white shadow-[0_2px_12px_rgba(10,25,41,0.03)] border-[#4A90E2]/10 py-4"
                        : "bg-white/95 backdrop-blur-sm border-transparent py-5"
                    }`}
            >
                <div className="container-main flex items-center justify-between">

                    {/* LEFT: Logo - Strict #0A1929 */}
                    <a href="#" className="text-[22px] font-sans font-normal text-[#0A1929] tracking-tight hover:opacity-80 transition-opacity">
                        DH
                    </a>

                    {/* CENTER: Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link, i) => (
                            <div key={i} className="flex items-center">
                                <a
                                    href={link.href}
                                    className={`relative text-[15px] font-normal transition-colors duration-250 ${activeSection === link.id ? "text-[#4A90E2]" : "text-[#475569] hover:text-[#0A1929]"
                                        }`}
                                >
                                    {link.label}
                                    {activeSection === link.id && (
                                        <motion.div
                                            layoutId="nav-indicator"
                                            className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#4A90E2] rounded-full"
                                        />
                                    )}
                                </a>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT: CTA Button - Strict Colors */}
                    <div className="hidden lg:block">
                        <a
                            href="#appointment"
                            className="inline-flex items-center justify-center px-6 py-2 rounded-full border-[1.5px] border-[#0A1929] text-[#0A1929] text-sm font-medium hover:bg-[#0A1929] hover:text-white transition-all duration-300"
                        >
                            Agendar Consulta
                        </a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMenuOpen(true)}
                        className="lg:hidden p-2 text-[#0A1929] hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMenuOpen(false)}
                            className="fixed inset-0 bg-[#0A1929]/20 backdrop-blur-sm z-[110] lg:hidden"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 bottom-0 w-[80%] max-w-[320px] bg-white shadow-2xl z-[120] lg:hidden flex flex-col p-8"
                        >
                            <div className="flex justify-between items-center mb-10">
                                <span className="text-2xl font-sans text-[#0A1929]">DH</span>
                                <button onClick={() => setMenuOpen(false)} className="p-2 text-gray-400 hover:text-[#0A1929] rounded-full hover:bg-gray-50 transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <nav className="flex flex-col gap-6 flex-1">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.id}
                                        href={link.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="text-lg text-[#475569] hover:text-[#0A1929] font-medium flex items-center justify-between group"
                                    >
                                        {link.label}
                                        <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#4A90E2]" />
                                    </a>
                                ))}
                            </nav>

                            <a
                                href="#appointment"
                                onClick={() => setMenuOpen(false)}
                                className="w-full btn-primary justify-center mt-auto bg-[#0A1929] text-white hover:bg-[#0A1929]/90"
                            >
                                Agendar Consulta
                            </a>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
