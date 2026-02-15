"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, GripVertical } from "lucide-react";

interface GallerySectionProps {
    gallery: {
        id: number;
        title?: string;
        description?: string;
        beforeImageUrl?: string;
        afterImageUrl?: string;
    }[];
}

const fallbackGallery = [
    { id: 1, title: "Rinoplastia Estructural", description: "Afinamiento de punta y dorso nasal con injertos autólogos.", beforeImageUrl: "/images/rinoplastia.jpg", afterImageUrl: "/images/rinoplastia b.jpg" },
    { id: 2, title: "Lifting de Cuello y Rostro", description: "Reposicionamiento de planos profundos (SMAS) para rejuvenecimiento natural.", beforeImageUrl: "/images/lifting.jpg ", afterImageUrl: "/images/lifting after.jpg " },
    { id: 3, title: "Lipoescultura HD", description: "Marcación abdominal y definición de cintura mediante técnica VASER.", beforeImageUrl: "/images/lipoesculturabefore.jpg", afterImageUrl: "images/lipoesculturaafter.jpg " },
    { id: 4, title: "Blefaroplastia Superior", description: "Eliminación de piel excedente en párpados para una mirada rejuvenecida.", beforeImageUrl: "/images/blefaroplastia b.jpg ", afterImageUrl: "images/blefaroplastia a.jpg " },
    { id: 5, title: "Aumento Mamario", description: "Implantes de alta cohesividad colocados vía submuscular dual plane.", beforeImageUrl: "/images/aumento b.jpg ", afterImageUrl: "/images/aumento.jpg " },
    { id: 6, title: "Abdominoplastia Completa", description: "Remodelación abdominal con plicatura muscular y eliminación de exceso.", beforeImageUrl: "/images/abdominoplastia b.jpg ", afterImageUrl: "/images/abdominoplastia.jpg " },
];

/* ── Before/After Card with Fail-Proof Draggable Divider ── */
function BeforeAfterCard({ item, variants }: {
    item: {
        id: number;
        title?: string;
        description?: string;
        beforeImageUrl?: string;
        afterImageUrl?: string;
    };
    variants?: any;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);

    const handleMove = useCallback((clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setSliderPosition(percent);
    }, []);

    const onMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
        handleMove(e.clientX);
    }, [handleMove]);

    const onTouchStart = useCallback((e: React.TouchEvent) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
    }, [handleMove]);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                e.preventDefault();
                handleMove(e.clientX);
            }
        };
        const onTouchMove = (e: TouchEvent) => {
            if (isDragging) {
                // Prevent scrolling while dragging the slider
                if (e.cancelable) e.preventDefault();
                handleMove(e.touches[0].clientX);
            }
        };
        const onEnd = () => setIsDragging(false);

        if (isDragging) {
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onEnd);
            window.addEventListener("touchmove", onTouchMove, { passive: false });
            window.addEventListener("touchend", onEnd);
        }

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onEnd);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onEnd);
        };
    }, [isDragging, handleMove]);

    const hasImages = item.beforeImageUrl && item.afterImageUrl;

    return (
        <motion.div
            variants={variants}
            className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-center"
        >
            <div className="card-premium overflow-hidden h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
                {/* Visual Area */}
                <div
                    ref={containerRef}
                    className="relative aspect-[4/5] bg-gray-100 cursor-ew-resize select-none overflow-hidden touch-none"
                    onMouseDown={onMouseDown}
                    onTouchStart={onTouchStart}
                >
                    {/* AFTER Image (Background) */}
                    <div className="absolute inset-0 z-0">
                        {hasImages ? (
                            <img
                                src={item.afterImageUrl}
                                alt="Resultado Después"
                                className="w-full h-full object-cover pointer-events-none"
                                draggable={false}
                            />
                        ) : (
                            <div className="w-full h-full bg-blue/10 flex items-center justify-center text-blue/40 font-bold uppercase tracking-widest">Después</div>
                        )}
                        {/* AFTER Label - only visible in its area */}
                        <span className="absolute top-4 right-4 z-10 px-2 py-1 bg-blue/80 text-white text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm rounded">Después</span>
                    </div>

                    {/* BEFORE Image (Clipped) */}
                    <div
                        className="absolute inset-0 z-10 overflow-hidden bg-gray-200"
                        style={{ width: `${sliderPosition}%`, borderRight: "1px solid rgba(255,255,255,0.5)" }}
                    >
                        {hasImages ? (
                            <img
                                src={item.beforeImageUrl}
                                alt="Estado Antes"
                                className="absolute inset-0 h-full max-w-none object-cover pointer-events-none"
                                style={{ width: containerRef.current?.offsetWidth || "100%" }}
                                draggable={false}
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest">Antes</div>
                        )}
                        {/* BEFORE Label - only visible in its area */}
                        <span className="absolute top-4 left-4 z-20 px-2 py-1 bg-black/50 text-white text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm rounded whitespace-nowrap">Antes</span>
                    </div>

                    {/* Drag Handle */}
                    <div
                        className="absolute top-0 bottom-0 z-20 w-10 -ml-5 flex items-center justify-center group cursor-ew-resize"
                        style={{ left: `${sliderPosition}%` }}
                    >
                        <div className="w-[2px] h-full bg-white shadow-[0_0_10px_rgba(0,0,0,0.2)]" />
                        <div className="absolute w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform">
                            <GripVertical size={14} />
                        </div>
                    </div>

                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-end">
                    <h3 className="text-lg font-bold text-navy mb-2">{item.title || "Procedimiento"}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.description || "Descripción del resultado obtenido."}</p>
                </div>
            </div>
        </motion.div>
    );
}

export default function GallerySection({ gallery }: GallerySectionProps) {
    const items = gallery.length > 0 ? gallery : fallbackGallery;
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (offset: number) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section id="gallery" className="scroll-mt-24 section-padding bg-transparent relative">
            <div className="container-main">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="section-header"
                >
                    <span className="eyebrow">RESULTADOS REALES</span>
                    <h2>Galería Antes y Después</h2>
                    <p>Deslice el control central en cada imagen para visualizar la transformación.</p>
                </motion.div>

                <div className="relative group">
                    {/* Navigation Buttons */}
                    <button
                        onClick={() => scroll(-350)}
                        className="absolute -left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-navy hover:scale-110 transition-all opacity-0 group-hover:opacity-100 duration-300 disabled:opacity-0"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={() => scroll(350)}
                        className="absolute -right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-navy hover:scale-110 transition-all opacity-0 group-hover:opacity-100 duration-300 disabled:opacity-0"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Scroll Container */}
                    <motion.div
                        ref={scrollRef}
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex gap-6 overflow-x-auto pb-8 pt-4 snap-x snap-mandatory scrollbar-hide"
                        style={{ scrollbarWidth: "none" }}
                    >
                        {items.map((item) => (
                            <BeforeAfterCard key={item.id} item={item} variants={cardVariants} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
