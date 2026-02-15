"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const result = await api.login(email, password);
            localStorage.setItem("token", result.accessToken);
            localStorage.setItem("user", JSON.stringify(result.user));
            router.push("/admin/dashboard");
        } catch (err: any) {
            setError(err.message || "Credenciales inválidas");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-6 relative overflow-hidden">
            {/* Decoration */}
            <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-primary/2 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-primary/2 rounded-full blur-3xl -z-10" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-lg"
            >
                <div className="text-center mb-12">
                    <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center mx-auto mb-8 shadow-lg shadow-primary/20">
                        <Lock size={28} className="text-white" />
                    </div>
                    <span className="eyebrow">ACCESO RESTRINGIDO</span>
                    <h1 className="text-4xl mb-4">Portal de Gestión</h1>
                    <p className="text-body max-w-xs mx-auto text-sm leading-relaxed">
                        Inicie sesión para administrar su práctica médica con seguridad de nivel hospitalario.
                    </p>
                </div>

                <div className="premium-card p-10 lg:p-12">
                    <form onSubmit={handleLogin} className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-muted">Correo Electrónico</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input-premium pl-12"
                                    placeholder="admin@drhamilton.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-muted">Contraseña</label>
                            <div className="relative">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-premium pl-12 pr-12"
                                    placeholder="••••••••"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors">
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-xs font-bold text-red-500 bg-red-50 px-5 py-4 rounded-sm border border-red-100 uppercase tracking-widest"
                            >
                                {error}
                            </motion.p>
                        )}

                        <button type="submit" disabled={loading} className="btn-luxury w-full py-5 text-sm justify-center shadow-lg transform hover:-translate-y-1">
                            {loading ? <Loader2 size={20} className="animate-spin" /> : "ACCEDER AL PANEL"}
                        </button>
                    </form>
                </div>

                <div className="mt-12 text-center">
                    <a href="/" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-muted hover:text-primary transition-all">
                        ← Volver al sitio principal
                    </a>
                </div>

                <p className="mt-12 text-center text-[10px] text-muted/30 font-bold uppercase tracking-widest leading-loose">
                    PROTOCOLOS DE ENCRIPTACIÓN AES-256 ACTIVOS <br />
                    ACCESO MONITOREADO
                </p>
            </motion.div>
        </div>
    );
}
