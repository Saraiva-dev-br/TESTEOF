import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  BrainCircuit, 
  GraduationCap, 
  MessageCircle, 
  FileText,
  MapPin,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { SITE_INFO } from '../data/siteData';

interface HeaderProps {
  onOpenVocational: () => void;
  onOpenStudentPortal: () => void;
  onOpenCurriculum: () => void;
  activeSection?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenVocational,
  onOpenStudentPortal,
  onOpenCurriculum,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#eadfeb] shadow-xs transition-all">
      {/* Skip to main content link for keyboard & screen readers */}
      <a 
        href="#inicio" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#531062] focus:text-white focus:rounded-xl focus:ring-2 focus:ring-[#ffc928] focus:outline-hidden text-sm font-bold"
      >
        Pular para o conteúdo principal
      </a>

      {/* Top micro banner */}
      <div className="bg-[#17081d] text-white text-[11px] sm:text-xs py-2 px-3 sm:px-6 lg:px-8 flex items-center justify-between border-b border-[#2d1238] gap-2">
        <div className="flex items-center gap-2 font-medium tracking-wide truncate">
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffc928] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffc928]"></span>
          </span>
          <span className="text-[#e9dfea] truncate">Atendimento presencial em Teresina - PI · Polos Dirceu e Centro</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[#d7a8df] text-[11px] shrink-0">
          <a 
            href={SITE_INFO.whatsappUrlGeneral} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[#ffc928] transition flex items-center gap-1 font-semibold"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#ffc928]" />
            WhatsApp: {SITE_INFO.phone}
          </a>
          <span className="text-[#531062]">|</span>
          <span className="text-[#e9dfea]">Seg. a Sex.: 08h às 17h</span>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 py-2 gap-2 sm:gap-3">
          
          {/* Brand Logo */}
          <a 
            href="#inicio" 
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-hidden shrink-0"
            id="nav-brand"
          >
            <div className="relative flex items-center justify-center overflow-hidden rounded-xl bg-white p-1 sm:p-1.5 border border-[#eadfeb] shadow-xs group-hover:shadow-md transition-all duration-300">
              <img 
                src="/logo-icon.png" 
                alt="Oficina do Aprendiz" 
                className="h-9 sm:h-11 w-auto object-contain transform group-hover:scale-105 transition-transform duration-300" 
                onError={(e) => {
                  const el = e.currentTarget;
                  el.onerror = null;
                  el.src = '/logo-oficina.jpeg';
                }}
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-base sm:text-xl font-black tracking-tight text-[#25102b] leading-tight whitespace-nowrap">
                Oficina do Aprendiz
              </span>
              <span className="text-[10px] sm:text-[11px] font-black tracking-wider uppercase text-[#812392] whitespace-nowrap">
                Teresina · Piauí
              </span>
            </div>
          </a>

          {/* Desktop Nav Links (Visible on xl and above) */}
          <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1 shrink-0">
            <a 
              href="#sobre" 
              className="px-2.5 py-1.5 text-xs 2xl:text-sm font-bold text-[#4d3e51] hover:text-[#812392] hover:bg-[#f7f3f8] rounded-lg transition whitespace-nowrap"
            >
              Quem Somos
            </a>
            <a 
              href="#etapas" 
              className="px-2.5 py-1.5 text-xs 2xl:text-sm font-bold text-[#4d3e51] hover:text-[#812392] hover:bg-[#f7f3f8] rounded-lg transition whitespace-nowrap"
            >
              Etapas
            </a>
            <a 
              href="#resultados" 
              className="px-2.5 py-1.5 text-xs 2xl:text-sm font-bold text-[#4d3e51] hover:text-[#812392] hover:bg-[#f7f3f8] rounded-lg transition whitespace-nowrap"
            >
              Resultados
            </a>
            <a 
              href="#oportunidades" 
              className="px-2.5 py-1.5 text-xs 2xl:text-sm font-bold text-[#4d3e51] hover:text-[#812392] hover:bg-[#f7f3f8] rounded-lg transition whitespace-nowrap"
            >
              Oportunidades
            </a>
            <a 
              href="#videos-historias" 
              className="px-2.5 py-1.5 text-xs 2xl:text-sm font-bold text-[#4d3e51] hover:text-[#812392] hover:bg-[#f7f3f8] rounded-lg transition whitespace-nowrap"
            >
              Vídeos
            </a>
            <a 
              href="#presenca" 
              className="px-2.5 py-1.5 text-xs 2xl:text-sm font-bold text-[#4d3e51] hover:text-[#812392] hover:bg-[#f7f3f8] rounded-lg transition whitespace-nowrap"
            >
              Onde Estamos
            </a>
          </nav>

          {/* Desktop Action CTAs (xl and above) */}
          <div className="hidden xl:flex items-center gap-1.5 2xl:gap-2 shrink-0">
            {/* Teste Vocacional Button */}
            <button
              onClick={onOpenVocational}
              id="btn-nav-vocational"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs 2xl:text-sm font-bold text-[#531062] bg-[#f7f3f8] hover:bg-[#efe3f2] border border-[#eadfeb] rounded-xl transition shadow-2xs hover:shadow-xs active:scale-98 cursor-pointer whitespace-nowrap shrink-0"
            >
              <BrainCircuit className="w-4 h-4 text-[#812392] shrink-0" />
              <span>Teste Vocacional</span>
            </button>

            {/* Portal do Aluno Button */}
            <button
              onClick={onOpenStudentPortal}
              id="btn-nav-student"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs 2xl:text-sm font-bold text-[#4d3e51] bg-[#f7f3f8] hover:bg-[#efe3f2] border border-[#eadfeb] rounded-xl transition active:scale-98 cursor-pointer whitespace-nowrap shrink-0"
            >
              <GraduationCap className="w-4 h-4 text-[#812392] shrink-0" />
              <span>Área do Aluno</span>
            </button>

            {/* Cadastrar Currículo CTA - Official Yellow Button */}
            <button
              onClick={onOpenCurriculum}
              id="btn-nav-curriculum"
              className="inline-flex items-center gap-1.5 px-3.5 2xl:px-4 py-2 text-xs 2xl:text-sm font-black text-[#28102d] bg-[#ffc928] hover:bg-[#e6b420] active:bg-[#d4a317] rounded-xl shadow-xs hover:shadow-md transition duration-200 active:scale-98 cursor-pointer whitespace-nowrap shrink-0"
            >
              <FileText className="w-4 h-4 shrink-0 text-[#28102d]" />
              <span>Cadastrar Currículo</span>
            </button>
          </div>

          {/* Mobile & Tablet Controls (Below xl) */}
          <div className="flex xl:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Quick access to Área do Aluno on medium screens */}
            <button
              onClick={onOpenStudentPortal}
              className="hidden md:inline-flex items-center gap-1 px-2.5 py-2 text-xs font-bold text-[#4d3e51] bg-[#f7f3f8] hover:bg-[#efe3f2] border border-[#eadfeb] rounded-xl transition cursor-pointer whitespace-nowrap shrink-0"
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#812392] shrink-0" />
              <span>Área do Aluno</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onOpenCurriculum}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 text-xs sm:text-sm font-black text-[#28102d] bg-[#ffc928] hover:bg-[#e6b420] active:bg-[#d4a317] rounded-xl shadow-xs cursor-pointer whitespace-nowrap shrink-0"
            >
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-[#28102d]" />
              <span>Cadastrar Currículo</span>
            </button>

            {/* Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="btn-mobile-toggle"
              aria-label={mobileMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              className="p-2 min-h-[38px] min-w-[38px] flex items-center justify-center text-[#4d3e51] hover:text-[#25102b] bg-[#f7f3f8] hover:bg-[#efe3f2] border border-[#eadfeb] rounded-xl transition cursor-pointer shrink-0"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Drawer Menu for screens below xl */}
      {mobileMenuOpen && (
        <div 
          id="mobile-navigation"
          role="region"
          aria-label="Menu de navegação móvel"
          className="xl:hidden bg-white border-b border-[#eadfeb] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto shadow-lg"
        >
          <div className="flex flex-col space-y-1">
            <a
              href="#sobre"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 text-sm sm:text-base font-semibold text-[#4d3e51] hover:bg-[#f7f3f8] rounded-xl transition flex items-center justify-between"
            >
              <span>Quem Somos</span>
              <span className="text-xs text-[#812392] font-semibold">A Iniciativa</span>
            </a>
            <a
              href="#etapas"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 text-sm sm:text-base font-semibold text-[#4d3e51] hover:bg-[#f7f3f8] rounded-xl transition flex items-center justify-between"
            >
              <span>Etapas do Encaminhamento</span>
              <span className="text-xs text-[#812392] font-semibold">5 Passos</span>
            </a>
            <a
              href="#resultados"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 text-sm sm:text-base font-semibold text-[#4d3e51] hover:bg-[#f7f3f8] rounded-xl transition flex items-center justify-between"
            >
              <span>Resultados em Teresina & Brasil</span>
              <span className="text-xs text-[#812392] font-semibold">Números</span>
            </a>
            <a
              href="#oportunidades"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 text-sm sm:text-base font-semibold text-[#4d3e51] hover:bg-[#f7f3f8] rounded-xl transition flex items-center justify-between"
            >
              <span>Oportunidades em Aberto</span>
              <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">Vagas</span>
            </a>
            <a
              href="#videos-historias"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 text-sm sm:text-base font-semibold text-[#4d3e51] hover:bg-[#f7f3f8] rounded-xl transition flex items-center justify-between"
            >
              <span>Vídeos de Histórias Reais</span>
              <span className="text-xs text-[#812392] font-semibold">Depoimentos</span>
            </a>
            <a
              href="#presenca"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 text-sm sm:text-base font-semibold text-[#4d3e51] hover:bg-[#f7f3f8] rounded-xl transition flex items-center justify-between"
            >
              <span>Onde Estamos</span>
              <span className="text-xs text-[#812392] font-semibold">Dirceu & Centro</span>
            </a>
          </div>

          <div className="pt-3 border-t border-[#eadfeb] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVocational();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-[#531062] bg-[#f7f3f8] rounded-xl border border-[#eadfeb] active:bg-[#efe3f2] min-h-[44px] cursor-pointer"
            >
              <BrainCircuit className="w-4.5 h-4.5 text-[#812392] shrink-0" />
              <span>Fazer Teste Vocacional Grátis</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenStudentPortal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-[#4d3e51] bg-[#f7f3f8] rounded-xl border border-[#eadfeb] active:bg-[#efe3f2] min-h-[44px] cursor-pointer"
            >
              <GraduationCap className="w-4.5 h-4.5 text-[#812392] shrink-0" />
              <span>Acessar Área do Aluno</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCurriculum();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 text-sm sm:text-base font-black text-[#28102d] bg-[#ffc928] hover:bg-[#e6b420] active:bg-[#d4a317] rounded-xl shadow-xs min-h-[48px] cursor-pointer"
            >
              <FileText className="w-4.5 h-4.5 shrink-0 text-[#28102d]" />
              <span>Cadastrar Currículo Agora</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
