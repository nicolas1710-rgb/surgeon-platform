"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cookie } from "lucide-react";

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const accepted = localStorage.getItem("cookies-accepted");
        if (!accepted) {
            const timer = setTimeout(() => setVisible(true), 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    const accept = () => {
        localStorage.setItem("cookies-accepted", "true");
        setVisible(false);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    className="fixed bottom-6 right-6 left-6 md:left-auto md:max-w-md z-[100]"
                >
                    <div className="bg-white rounded-2xl p-6 shadow-premium border border-gray-100 relative">
                        <button onClick={accept} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors">
                            <X size={18} />
                        </button>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue/5 flex items-center justify-center flex-shrink-0">
                                <Cookie size={20} className="text-blue" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-900 mb-1">Cookies</h4>
                                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                                    Utilizamos cookies para garantizar la mejor experiencia. Al continuar, acepta nuestras políticas.
                                </p>
                                <div className="flex items-center gap-3">
                                    <button onClick={accept} className="px-5 py-2 bg-blue text-white text-xs font-semibold rounded-lg hover:bg-blue-dark transition-all">
                                        Aceptar
                                    </button>
                                    <button onClick={accept} className="text-xs font-semibold text-gray-400 hover:text-gray-900 transition-colors">
                                        Rechazar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
