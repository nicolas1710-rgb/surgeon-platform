"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";

interface ExpertiseSectionProps {
    procedures: {
        id: number;
        title: string;
        description: string;
        iconName?: string;
    }[];
}

const iconMap: Record<string, any> = {
    Stethoscope: LucideIcons.Stethoscope,
    Heart: LucideIcons.Heart,
    Eye: LucideIcons.Eye,
    Smile: LucideIcons.Smile,
    Scissors: LucideIcons.Scissors,
    Shield: LucideIcons.Shield,
    Star: LucideIcons.Star,
    Activity: LucideIcons.Activity,
    Sparkles: LucideIcons.Sparkles,
    Scan: LucideIcons.Scan,
};

const fallbackProcedures = [
    { id: 1, title: "Rinoplastia Avanzada", description: "Remodelación nasal con técnicas estructurales de última generación para resultados naturales y armónicos.", iconName: "Eye" },
    { id: 2, title: "Lifting Facial", description: "Rejuvenecimiento facial avanzado con técnicas mínimamente invasivas y recuperación acelerada.", iconName: "Sparkles" },
    { id: 3, title: "Liposucción HD", description: "Escultura corporal de alta definición con tecnología VASER para contornos precisos y naturales.", iconName: "Activity" },
    { id: 4, title: "Aumento Mamario", description: "Implantes de última generación con técnica submuscular para resultados superiores y seguros.", iconName: "Heart" },
    { id: 5, title: "Blefaroplastia", description: "Cirugía de párpados para eliminar signos de cansancio y devolver vitalidad a la mirada.", iconName: "Scan" },
    { id: 6, title: "Abdominoplastia", description: "Remodelación abdominal completa con reparación muscular y eliminación de exceso cutáneo.", iconName: "Shield" },
];

export default function ExpertiseSection({ procedures }: ExpertiseSectionProps) {
    const items = procedures.length > 0 ? procedures : fallbackProcedures;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut" as const
            }
        }
    };

    return (
        <section
            id="expertise"
            className="scroll-mt-24 relative overflow-hidden"
        >
            {/* Fondo visible real */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC] to-[#EEF2F7] -z-10" />

            <div className="section-padding">
                <div className="container-main">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                        className="section-header"
                    >
                        <span className="eyebrow">ESPECIALIDADES</span>
                        <h2>Áreas de Especialización</h2>
                        <p>
                            Procedimientos realizados con técnicas de vanguardia y un enfoque
                            personalizado para cada paciente, garantizando resultados seguros y estéticamente superiores.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                    >
                        {items.map((proc) => {
                            const Icon = iconMap[proc.iconName || "Stethoscope"] || LucideIcons.Stethoscope;
                            return (
                                <motion.div
                                    key={proc.id}
                                    variants={cardVariants}
                                    whileHover={{
                                        y: -8,
                                        scale: 1.03,
                                        transition: { type: "spring", stiffness: 200 }
                                    }}
                                    className="card-premium cursor-default group"
                                >
                                    <div className="w-14 h-14 rounded-xl bg-blue/5 flex items-center justify-center mb-6 group-hover:bg-blue group-hover:scale-110 transition-all duration-300">
                                        <Icon size={24} className="text-blue group-hover:text-white transition-colors duration-300" />
                                    </div>

                                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue transition-colors duration-300">
                                        {proc.title}
                                    </h3>

                                    <p className="text-sm text-[#475569] leading-[1.6]">
                                        {proc.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
