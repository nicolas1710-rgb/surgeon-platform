"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ExternalLink, Navigation } from "lucide-react";

interface LocationSectionProps {
    location: {
        clinicName?: string;
        address?: string;
        city?: string;
        state?: string;
        phone?: string;
        email?: string;
        googleMapsUrl?: string;
        googleMapsEmbedUrl?: string;
    } | null;
}

export default function LocationSection({ location }: LocationSectionProps) {
    const clinic = location?.clinicName || "Hospital Departamental Universitario del Quindío San Juan de Dios";
    const address = location?.address || "Carrera 19 # 12-105";
    const city = location?.city || "Armenia";
    const state = location?.state || "Quindío";
    const phone = location?.phone || "+52 55 5255 9600";
    const email = location?.email || "contacto@drhamilton.com";
    const mapsUrl = location?.googleMapsUrl || "https://maps.app.goo.gl/jMiAuJ7CddPgeVbx8";
    const embedUrl = location?.googleMapsEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4729.7244884300135!2d-75.6591932337879!3d4.556509204725508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e38f4e609128105%3A0xb1208d9eb0624e7a!2sHospital%20Departamental%20Universitario%20del%20Quind%C3%ADo%20San%20Juan%20de%20Dios!5e0!3m2!1ses-419!2sco!4v1771115015657!5m2!1ses-419!2sco";
    const contactItems = [
        { icon: MapPin, label: "Dirección", value: `${address}, ${city}, ${state}` },
        { icon: Phone, label: "Teléfono", value: phone, href: `tel:${phone.replace(/\D/g, "")}` },
        { icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
        { icon: Clock, label: "Horario Premium", value: "Lun – Vie: 10:00 – 19:00" },
    ];

    return (
        <section id="location" className="scroll-mt-24 section-padding bg-transparent">
            <div className="container-main">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="section-header"
                >
                    <span className="eyebrow">CONTACTO</span>
                    <h2>Ubicación & Hospitalidad</h2>
                    <p>
                        Nuestras instalaciones están diseñadas para ofrecerle
                        la máxima comodidad y privacidad durante su visita.
                    </p>
                </motion.div>

                {/* 50/50 Split */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* LEFT: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="card-premium p-8 lg:p-10 h-full">
                            <div className="mb-8 pb-6 border-b border-gray-100">
                                <h3 className="text-2xl font-bold text-gray-900 mb-1">{clinic}</h3>
                                <p className="text-sm text-[#475569]">Centro Médico de Alta Especialidad</p>
                            </div>

                            <div className="space-y-6">
                                {contactItems.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 + i * 0.1 }}
                                        className="flex items-start gap-4 group"
                                    >
                                        <div className="w-11 h-11 rounded-xl bg-blue/5 flex items-center justify-center flex-shrink-0 group-hover:bg-blue group-hover:scale-110 transition-all duration-300">
                                            <item.icon size={18} className="text-blue group-hover:text-white transition-colors duration-300" />
                                        </div>
                                        <div className="pt-0.5">
                                            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1">{item.label}</p>
                                            {item.href ? (
                                                <a href={item.href} className="text-base text-gray-900 font-medium hover:text-blue transition-colors">
                                                    {item.value}
                                                </a>
                                            ) : (
                                                <p className="text-base text-gray-900 font-medium">{item.value}</p>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <a
                                    href={mapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary w-full"
                                >
                                    <Navigation size={16} />
                                    Cómo Llegar
                                    <ExternalLink size={14} />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT: Map */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                    >
                        <div className="rounded-2xl overflow-hidden shadow-premium h-full min-h-[480px] bg-gray-100">
                            {embedUrl ? (
                                <iframe
                                    src={embedUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, minHeight: "480px" }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Ubicación de la clínica"
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center p-10 text-center bg-gradient-to-br from-gray-50 to-gray-100">
                                    <div className="w-20 h-20 rounded-full bg-blue/5 flex items-center justify-center mb-6">
                                        <MapPin size={36} className="text-blue" />
                                    </div>
                                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{clinic}</h4>
                                    <p className="text-sm text-gray-400 max-w-xs">{address}, {city}, {state}</p>
                                    <a
                                        href={mapsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue hover:underline"
                                    >
                                        Abrir en Google Maps <ExternalLink size={14} />
                                    </a>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
