"use client";

import { motion } from "framer-motion";
import { Calendar, CheckCircle2, Phone, Clock } from "lucide-react";

interface AppointmentSectionProps {
    profile: {
        appointmentUrl?: string;
        phone?: string;
        whatsappNumber?: string;
    } | null;
}

export default function AppointmentSection({ profile }: AppointmentSectionProps) {
    const whatsapp = profile?.whatsappNumber || "3024587763";
    const phone = profile?.phone || "+57 3024587763";

    // Construct pre-filled message with requested text
    const message = encodeURIComponent(
        "Hola, estoy interesado en agendar una cita.\n\n" +
        "Estoy interesado en: Escribe aqui tu mensaje.\n\n" +
        "*Mis datos personales:*\n" +
        "- Nombre:\n" +
        "- Telefono:\n" +
        "- Ciudad:"
    );
    const whatsappLink = `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${message}`;

    return (
        <section id="appointment" className="scroll-mt-24 section-padding bg-transparent">
            <div className="container-main">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="max-w-4xl mx-auto rounded-3xl bg-transparent text-white p-8 md:p-12 lg:p-16 relative overflow-hidden"
                >
                    {/* Background Accents - Subtly adjusted for navy background */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue opacity-5 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gold opacity-5 rounded-full blur-[80px] pointer-events-none" />

                    <div className="relative z-10 text-center">
                        <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-white text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm border border-white/10">
                            Agenda Prioritaria
                        </span>

                        <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
                            Comience su transformación hoy mismo
                        </h2>

                        <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                            Reserve una valoración personalizada con el Dr. Hamilton para discutir sus objetivos
                            y diseñar un plan de tratamiento a su medida.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto btn-primary bg-white text-navy hover:bg-white/90 hover:scale-[1.02] shadow-xl border-0"
                            >
                                <Calendar size={18} />
                                Agendar por WhatsApp
                            </a>

                            <a
                                href={`tel:${phone.replace(/\D/g, "")}`}
                                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-full border border-white/10 text-white/50 font-medium hover:bg-white/5 hover:text-white transition-all"
                            >
                                <Phone size={18} className="mr-2" />
                                Llamar al Consultorio
                            </a>
                        </div>

                        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={14} className="text-[#4A90E2]" />
                                <span>Valoración confidencial</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={14} className="text-[#4A90E2]" />
                                <span>Plan quirúrgico detallado</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={14} className="text-[#4A90E2]" />
                                <span>Seguimiento post-operatorio</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
