import React, { useState, useEffect } from 'react';
import { MessageCircle, BrainCircuit, ArrowUp, FileText } from 'lucide-react';
import { SITE_INFO } from '../data/siteData';

interface FloatingWhatsAppProps {
  onOpenVocational: () => void;
  onOpenCurriculum: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  onOpenVocational,
  onOpenCurriculum
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowScrollTop(window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-3">
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Voltar ao topo"
          className="p-2.5 rounded-full bg-white text-slate-700 shadow-md border border-slate-200 hover:bg-slate-100 transition transform hover:scale-105 active:scale-95"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Teste Vocacional Quick Pill */}
      <button
        onClick={onOpenVocational}
        className="hidden sm:flex items-center gap-2.5 px-4.5 py-3 rounded-full bg-[#531062] hover:bg-[#6c167f] text-[#ffc928] border border-[#ffc928]/50 text-sm font-black shadow-xl transition transform hover:scale-105 active:scale-95 cursor-pointer"
      >
        <BrainCircuit className="w-5 h-5 text-[#ffc928] shrink-0" />
        <span>Teste Vocacional Grátis</span>
      </button>

      {/* Main WhatsApp Button */}
      <a
        href={SITE_INFO.whatsappUrlGeneral}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="group flex items-center gap-2.5 px-4.5 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-white/40 cursor-pointer"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="text-sm sm:text-base font-black tracking-wide">
          WhatsApp Oficial
        </span>
      </a>
    </div>
  );
};
