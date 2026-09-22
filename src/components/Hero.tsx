import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  BrainCircuit, 
  CheckCircle2, 
  Building2, 
  MapPin, 
  Users, 
  ShieldCheck, 
  ChevronRight, 
  Briefcase 
} from 'lucide-react';
import { HIRED_STUDENTS, SITE_INFO } from '../data/siteData';
import { Hire } from '../types';
import { getMediaUrl, handleImageFallback, useRegisPhoto } from '../utils/media';

interface HeroProps {
  onOpenVocational: () => void;
  onOpenCurriculum: (unit?: 'dirceu' | 'centro') => void;
  onSelectHire?: (hire: Hire) => void;
  hires?: Hire[];
}

export const Hero: React.FC<HeroProps> = ({
  onOpenVocational,
  onOpenCurriculum,
  onSelectHire,
  hires = HIRED_STUDENTS
}) => {
  const [activeHireIdx, setActiveHireIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const regisPhoto = useRegisPhoto();

  // Auto-cycle through the hired students every 3.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveHireIdx((prev) => (prev + 1) % hires.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused, hires.length]);

  const activeHire = hires[activeHireIdx] || hires[0];

  return (
    <>
      {/* Official Notice Marquee Bar from oficinaaprendizpi.com.br */}
      <div className="bg-[#ffc928] text-[#25102b] py-3 px-4 sm:px-6 shadow-xs border-b border-[#e6b420]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-3 text-center">
          <span className="bg-[#531062] text-white text-xs sm:text-sm font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-2xs">
            OPORTUNIDADE
          </span>
          <span className="text-sm sm:text-base font-extrabold tracking-tight">
            VAGAS DE JOVEM APRENDIZ ABERTAS EM TERESINA · POLOS DIRCEU E CENTRO
          </span>
          <button
            onClick={() => onOpenCurriculum()}
            className="text-sm font-black underline underline-offset-2 hover:text-[#531062] transition ml-1 cursor-pointer"
          >
            Cadastre-se Agora &rarr;
          </button>
        </div>
      </div>

      <section id="inicio" className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 bg-gradient-to-br from-[#1a071f] via-[#4b0d59] to-[#23092c] text-white border-b border-[#3b0a46]">
        {/* Glow accents */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#812392]/25 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#ffc928]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Hero Copy */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              
              {/* Live Kicker */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#531062]/80 border border-[#812392] text-[#ffc928] text-xs sm:text-base font-bold mb-4 sm:mb-6 shadow-xs max-w-full">
                <span className="flex h-2 w-2 relative shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffc928] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffc928]"></span>
                </span>
                <Sparkles className="w-3.5 h-3.5 text-[#ffc928] shrink-0" />
                <span className="tracking-wide truncate">CONTRATADOS EM TEMPO REAL · TERESINA-PI</span>
              </div>

              {/* Headline */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] sm:leading-[1.12] mb-4 sm:mb-5">
                Conectando jovens ao <span className="text-[#ffc928]">mercado de trabalho</span>.
              </h1>

              {/* Paragraph */}
              <p className="text-sm sm:text-lg text-[#e9dfea] leading-relaxed mb-6 sm:mb-8 max-w-2xl font-normal">
                Ajudamos jovens a se conectarem com oportunidades por meio de encaminhamento, preparação e intermediação profissional qualificada em Teresina - PI.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-10">
                <button
                  onClick={() => onOpenCurriculum()}
                  id="btn-hero-curriculum"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-black text-[#28102d] bg-[#ffc928] hover:bg-[#e6b420] active:bg-[#d4a317] rounded-xl shadow-lg hover:shadow-xl transition duration-200 active:scale-98"
                >
                  <span>Cadastrar Currículo Agora</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenVocational}
                  id="btn-hero-vocational"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-bold text-white bg-white/10 hover:bg-white/20 border border-white/25 rounded-xl transition duration-200 active:scale-98"
                >
                  <BrainCircuit className="w-5 h-5 text-[#ffc928]" />
                  <span>Fazer Teste Vocacional Grátis</span>
                </button>

                <a
                  href="#oportunidades"
                  id="btn-hero-opportunities"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 text-sm sm:text-base font-bold text-[#ffc928] hover:text-white transition"
                >
                  <span>Ver Vagas Abertas</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>

              {/* Trust Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/15 w-full text-[#e9dfea] text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#ffc928] shrink-0" />
                  <span>100% Gratuito para o Jovem</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#ffc928] shrink-0" />
                  <span>Polos Dirceu e Centro</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <ShieldCheck className="w-4 h-4 text-[#ffc928] shrink-0" />
                  <span>Mais de 15 Anos no Brasil</span>
                </div>
              </div>

            </div>

            {/* Right Hero: Dynamic Hired Showcase Card */}
            <div 
              className="lg:col-span-5"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="relative bg-white text-[#25102b] rounded-2xl border border-white/20 shadow-2xl p-5 sm:p-6 overflow-hidden">
                {/* Header of the card */}
                <div className="flex items-center justify-between pb-4 border-b border-[#eadfeb] mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-black uppercase tracking-wider text-[#531062]">
                      Contratados em Teresina
                    </span>
                  </div>
                  <span className="text-sm font-bold px-2.5 py-0.5 rounded-full bg-[#f1e2f4] text-[#812392] border border-[#e5d9e8]">
                    Histórias Reais
                  </span>
                </div>

                {/* Active Featured Hired Youth */}
                {activeHire && (
                  <div 
                    role="button"
                    tabIndex={0}
                    aria-label={`Ver perfil de ${activeHire.name}, contratado(a) na ${activeHire.unit || 'Unidade Dirceu'}`}
                    onClick={() => onSelectHire && onSelectHire(activeHire)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectHire && onSelectHire(activeHire);
                      }
                    }}
                    className="flex items-center gap-4 sm:gap-5 p-4 rounded-xl bg-[#f7f3f8] border border-[#eadfeb] hover:border-[#812392] transition-all duration-300 cursor-pointer group focus-visible:ring-2 focus-visible:ring-[#812392] focus-visible:outline-none select-none"
                  >
                    <div className="relative shrink-0">
                      <img
                        src={activeHire.name.toLowerCase().includes('regis') ? regisPhoto : getMediaUrl(activeHire.photoKey)}
                        alt={`Foto de ${activeHire.name}`}
                        className={`w-18 h-18 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-white shadow-md ring-3 ring-[#ffc928] group-hover:scale-105 transition-transform ${
                          activeHire.name.toLowerCase().includes('regis') ? 'object-[center_15%]' : 'object-center'
                        }`}
                        onError={(e) => {
                          if (activeHire.name.toLowerCase().includes('regis')) {
                            (e.target as HTMLImageElement).src = '/media/regislane-da-silva.jpg';
                          } else {
                            handleImageFallback(e);
                          }
                        }}
                      />
                      <span className="absolute bottom-0 right-0 p-1 bg-[#ffc928] text-[#25102b] rounded-full shadow-xs">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h2 className="text-lg font-black text-[#25102b] truncate group-hover:text-[#812392] transition">
                          {activeHire.name}
                        </h2>
                        <span className="text-sm font-black px-2.5 py-0.5 bg-[#ffc928] text-[#28102d] rounded-md">
                          {activeHire.age} anos
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-[#534657] flex items-center gap-1.5 mb-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#812392] shrink-0" />
                        <span>{activeHire.unit || 'Unidade Dirceu'}</span>
                      </p>
                      <div className="inline-flex items-center gap-1.5 text-sm font-bold text-[#531062] bg-[#f1e2f4] px-2.5 py-1 rounded-md">
                        <Briefcase className="w-3.5 h-3.5 text-[#812392] shrink-0" />
                        <span>{activeHire.companySector || activeHire.role || 'Jovem Aprendiz'}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Grid of Mini-Avatars for all youth */}
                <div className="mt-5">
                  <div className="flex items-center justify-between text-sm text-[#534657] mb-2 font-semibold">
                    <span>Conquistas recentes de jovens de Teresina:</span>
                    <span className="font-black text-[#531062]">{activeHireIdx + 1} de {hires.length}</span>
                  </div>
                  <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-2">
                    {hires.map((hire, idx) => (
                      <button
                        key={hire.id}
                        onClick={() => setActiveHireIdx(idx)}
                        aria-label={`Ver conquista de ${hire.name}, ${hire.age} anos - ${hire.unit || 'Unidade Dirceu'}`}
                        title={`${hire.name}, ${hire.age} anos - ${hire.unit || 'Unidade Dirceu'}`}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#812392] focus:outline-hidden ${
                          idx === activeHireIdx 
                            ? 'border-[#ffc928] ring-2 ring-[#ffc928]/60 scale-105 shadow-xs' 
                            : 'border-transparent opacity-75 hover:opacity-100 hover:scale-102'
                        }`}
                      >
                        <img
                          src={hire.name.toLowerCase().includes('regis') ? regisPhoto : getMediaUrl(hire.photoKey)}
                          alt={hire.name}
                          className={`w-full h-full object-cover ${
                            hire.name.toLowerCase().includes('regis') ? 'object-[center_15%]' : 'object-center'
                          }`}
                          onError={(e) => {
                            if (hire.name.toLowerCase().includes('regis')) {
                              (e.target as HTMLImageElement).src = '/media/regislane-da-silva.jpg';
                            } else {
                              handleImageFallback(e);
                            }
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bottom Quick Callout */}
                <div className="mt-5 pt-4 border-t border-[#eadfeb] flex items-center justify-between text-sm text-[#534657]">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#812392]" />
                    Mais de <b className="text-[#25102b]">145</b> jovens contratados só na capital
                  </span>
                  <button
                    onClick={() => onOpenCurriculum()}
                    className="text-sm font-black text-[#812392] hover:text-[#531062] transition hover:underline cursor-pointer"
                  >
                    Quero Ser o Próximo &rarr;
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};
