"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard, User, Scissors, Image, MessageSquare,
    MapPin, Calendar, LogOut, Menu, X, ChevronRight, Loader2,
    Plus, Trash2, Save, CheckCircle, Clock, ExternalLink, Shield
} from "lucide-react";
import { api } from "@/lib/api";

type Tab = "dashboard" | "profile" | "procedures" | "gallery" | "location" | "appointments";

const tabs: { key: Tab; label: string; icon: any }[] = [
    { key: "dashboard", label: "Panel General", icon: LayoutDashboard },
    { key: "profile", label: "Perfil Médico", icon: User },
    { key: "procedures", label: "Especialidades", icon: Scissors },
    { key: "gallery", label: "Casos Clínicos", icon: Image },
    { key: "location", label: "Sede & Mapa", icon: MapPin },
    { key: "appointments", label: "Solicitudes", icon: Calendar },
];

export default function AdminDashboardPage() {
    const router = useRouter();
    const [token, setToken] = useState("");
    const [activeTab, setActiveTab] = useState<Tab>("dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [procedures, setProcedures] = useState<any[]>([]);
    const [gallery, setGallery] = useState<any[]>([]);
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [location, setLocation] = useState<any>(null);
    const [appointments, setAppointments] = useState<any[]>([]);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const t = localStorage.getItem("token");
        if (!t) { router.push("/admin/login"); return; }
        setToken(t);
        loadDashboard(t);
    }, [router]);

    const loadDashboard = async (t: string) => {
        setLoading(true);
        try {
            const [dashRes, profRes, procRes, galRes, tesRes, locRes, appRes] = await Promise.allSettled([
                api.admin.getDashboard(t), api.getProfile(), api.admin.getProcedures(t),
                api.admin.getGallery(t), api.admin.getTestimonials(t), api.getLocation(), api.admin.getAppointments(t),
            ]);
            if (dashRes.status === "fulfilled") setStats(dashRes.value?.stats);
            if (profRes.status === "fulfilled") setProfile(profRes.value);
            if (procRes.status === "fulfilled") setProcedures(procRes.value);
            if (galRes.status === "fulfilled") setGallery(galRes.value);
            if (tesRes.status === "fulfilled") setTestimonials(tesRes.value);
            if (locRes.status === "fulfilled") setLocation(locRes.value);
            if (appRes.status === "fulfilled") setAppointments(appRes.value);
        } catch { console.error("Error al cargar panel"); }
        setLoading(false);
    };

    const logout = () => { localStorage.removeItem("token"); localStorage.removeItem("user"); router.push("/admin/login"); };
    const showMessage = (msg: string) => { setMessage(msg); setTimeout(() => setMessage(""), 4000); };

    if (loading) {
        return (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
                <div className="relative mb-8">
                    <div className="w-16 h-16 rounded-full border border-border" />
                    <div className="absolute inset-0 w-16 h-16 rounded-full border border-transparent border-t-primary animate-spin" />
                </div>
                <h2 className="text-xl font-serif italic text-heading mb-2">Protocolo de Carga</h2>
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted">Accediendo a datos seguros</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg-alt flex">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) bg-white border-r border-border ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static`}>
                <div className="h-full flex flex-col pt-10 pb-8 px-6">
                    {/* Brand */}
                    <div className="flex items-center gap-3 mb-12 px-2">
                        <div className="w-10 h-10 rounded-sm bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">S</div>
                        <div>
                            <p className="text-sm font-bold text-heading leading-tight">ADMIN PANEL</p>
                            <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Surgeon Platform</p>
                        </div>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 space-y-1">
                        {tabs.map(tab => {
                            const Icon = tab.icon;
                            const active = activeTab === tab.key;
                            return (
                                <button
                                    key={tab.key}
                                    onClick={() => { setActiveTab(tab.key); setSidebarOpen(false); }}
                                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-lg text-[13px] font-bold uppercase tracking-widest transition-all duration-300 ${active ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-muted hover:bg-bg-alt hover:text-heading"}`}
                                >
                                    <Icon size={18} />
                                    <span>{tab.label}</span>
                                    {active && <motion.div layoutId="sidebar-active" className="ml-auto"><ChevronRight size={14} /></motion.div>}
                                </button>
                            );
                        })}
                    </nav>

                    {/* Footer */}
                    <div className="mt-8 pt-8 border-t border-border">
                        <button onClick={logout} className="w-full flex items-center gap-4 px-4 py-4 rounded-lg text-[13px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all">
                            <LogOut size={18} />
                            <span>Cerrar Sesión</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-border px-8 py-4 flex items-center justify-between">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden w-10 h-10 flex items-center justify-center text-heading">
                        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-primary/5 text-primary">
                            <Shield size={16} />
                        </div>
                        <h1 className="text-xl font-serif italic text-heading">{tabs.find(t => t.key === activeTab)?.label}</h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <a href="/" target="_blank" className="hidden sm:flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-muted hover:text-primary transition-all">
                            Ver Sitio Público <ExternalLink size={12} />
                        </a>
                        <div className="w-10 h-10 rounded-full bg-bg-alt flex items-center justify-center font-bold text-heading text-sm border border-border">AD</div>
                    </div>
                </header>

                {/* Body */}
                <div className="p-8 lg:p-12 max-w-7xl mx-auto w-full">

                    {/* Notification Toast */}
                    <AnimatePresence>
                        {message && (
                            <motion.div
                                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="mb-8 p-5 rounded-lg bg-green-50 border border-green-100 text-green-700 font-bold uppercase tracking-widest text-[11px] flex items-center gap-3 shadow-sm"
                            >
                                <CheckCircle size={18} />
                                {message}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* DASHBOARD TAB */}
                    {activeTab === "dashboard" && (
                        <div className="space-y-12">
                            {/* Summary Stats */}
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    { label: "Solicitudes", value: stats?.totalAppointments || 0, icon: Calendar, color: "text-blue-500", bg: "bg-blue-50" },
                                    { label: "Pendientes", value: stats?.pendingAppointments || 0, icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
                                    { label: "Casos Clínicos", value: stats?.totalGalleryItems || 0, icon: Image, color: "text-purple-500", bg: "bg-purple-50" },
                                    { label: "Especialidades", value: stats?.totalProcedures || 0, icon: Scissors, color: "text-emerald-500", bg: "bg-emerald-50" },
                                ].map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="premium-card p-8"
                                    >
                                        <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6`}>
                                            <stat.icon size={24} />
                                        </div>
                                        <p className="text-4xl font-bold text-heading mb-1 tracking-tight">{stat.value}</p>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted">{stat.label}</p>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Welcome Area */}
                            <div className="premium-card p-10 lg:p-14 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/2 -skew-x-12 translate-x-1/4 -z-10" />
                                <div className="max-w-xl">
                                    <h2 className="text-3xl mb-4 leading-tight">Bienvenido de nuevo, Dr. Hamilton</h2>
                                    <p className="text-body text-base leading-relaxed mb-10">
                                        Administre el contenido médico y las solicitudes de pacientes bajo protocolos de seguridad activa. Su portal está operando con la última actualización de visualización premium.
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        <button onClick={() => setActiveTab("appointments")} className="btn-luxury text-[11px]">Revisar Citas Pendientes</button>
                                        <button onClick={() => setActiveTab("profile")} className="btn-luxury-outline text-[11px]">Ajustar Perfil</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* OTHER TABS (FALLBACK / MOCK) */}
                    {activeTab !== "dashboard" && (
                        <div className="premium-card p-12 text-center">
                            <div className="w-20 h-20 rounded-full bg-bg-alt flex items-center justify-center mx-auto mb-8">
                                <Shield size={40} className="text-muted" />
                            </div>
                            <h3 className="text-2xl mb-4 font-serif italic text-heading">Gestión de {tabs.find(t => t.key === activeTab)?.label}</h3>
                            <p className="text-body max-w-sm mx-auto mb-10 leading-relaxed">
                                Esta sección permite la edición avanzada de datos bajo el nuevo sistema visual de alto rendimiento.
                            </p>
                            <button className="btn-luxury" onClick={() => showMessage("Ajustando estructura de datos...")}>
                                Activar Protocolo de Edición
                            </button>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}
