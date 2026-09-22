import React, { useState } from 'react';
import { 
  Building2, 
  HeartHandshake, 
  MapPin, 
  Award, 
  ShieldCheck, 
  Compass, 
  CheckCircle2,
  Calendar,
  Sparkles,
  Camera
} from 'lucide-react';
import { getMediaUrl, handleImageFallback, useRegisPhoto } from '../utils/media';
import { RegisPhotoModal } from './RegisPhotoModal';

export const AboutSection: React.FC = () => {
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const regisPhoto = useRegisPhoto();
  return (
    <section id="sobre" className="py-16 md:py-24 bg-white border-b border-[#eadfeb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f1e2f4] border border-[#e5d9e8] text-[#812392] text-sm font-black tracking-wider uppercase mb-3">
            <Sparkles className="w-4 h-4 text-[#812392]" />
            <span>QUEM SOMOS · NOSSA HISTÓRIA</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#25102b] tracking-tight leading-tight">
            Uma ponte sólida e humana entre a formação e o mercado formal.
          </h2>
          <p className="text-[#6c6570] text-base sm:text-lg mt-3 leading-relaxed">
            Iniciativa de impacto social criada para transformar o potencial de jovens teresinenses em realização profissional, com capacitação e encaminhamento 100% gratuitos.
          </p>
        </div>

        {/* Two-column Main Block: Institutional Story & Pedagogical Coordination */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-12">
          
          {/* Left Column: The Narrative Story */}
          <div className="lg:col-span-7 bg-[#f7f3f8] rounded-3xl p-6 sm:p-8 border border-[#eadfeb] flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#eadfeb] flex items-center justify-center p-2 shadow-xs">
                  <img 
                    src="/logo-icon.png" 
                    alt="Oficina do Aprendiz" 
                    className="w-full h-full object-contain" 
                    onError={(e) => {
                      const el = e.currentTarget;
                      el.onerror = null;
                      el.src = '/logo-oficina.jpeg';
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#25102b] leading-tight">
                    Oficina do Aprendiz em Teresina
                  </h3>
                  <span className="text-xs font-bold text-[#812392] uppercase tracking-wider">
                    Iniciativa de Empregabilidade Jovem
                  </span>
                </div>
              </div>

              <p className="text-base sm:text-lg text-[#534657] leading-relaxed">
                A <strong className="text-[#25102b] font-bold">Oficina do Aprendiz</strong> nasceu da vivência real de um empreendedor nordestino que sentiu na pele os obstáculos de conquistar o primeiro emprego.
              </p>

              <p className="text-base text-[#6c6570] leading-relaxed">
                Em parceria com empresas locais, organizações nacionais e projetos consolidados, a iniciativa chegou à capital piauiense para aproximar os jovens de oportunidades concretas através de <strong className="text-[#812392]">intermediação ética, capacitação prática e encaminhamento direcionado</strong>.
              </p>

              <p className="text-base text-[#6c6570] leading-relaxed">
                No Brasil, a metodologia parceira atua há mais de 15 anos, já tendo cadastrado mais de 310 mil currículos e viabilizado mais de 37 mil inserções profissionais no mercado de trabalho formal.
              </p>
            </div>

            {/* Quick credentials badges row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t border-[#eadfeb]">
              <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-[#eadfeb]">
                <Calendar className="w-5 h-5 text-[#812392] shrink-0" />
                <div className="text-xs">
                  <span className="text-[#716575] block">Em Teresina</span>
                  <strong className="text-[#25102b] font-black">Desde Ago/2025</strong>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-[#eadfeb]">
                <Award className="w-5 h-5 text-[#ffc928] shrink-0 fill-[#ffc928]/20" />
                <div className="text-xs">
                  <span className="text-[#716575] block">Metodologia</span>
                  <strong className="text-[#25102b] font-black">15+ Anos no País</strong>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-[#eadfeb]">
                <MapPin className="w-5 h-5 text-[#812392] shrink-0" />
                <div className="text-xs">
                  <span className="text-[#716575] block">Atendimento</span>
                  <strong className="text-[#25102b] font-black">Dirceu e Centro</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pedagogical Coordination Spotlight */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#faf5fc] to-white rounded-3xl p-6 sm:p-8 border-2 border-[#812392]/25 flex flex-col justify-between shadow-md">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#812392] text-white text-xs font-black uppercase tracking-wider mb-4">
                <Compass className="w-3.5 h-3.5" />
                <span>Coordenação Pedagógica</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <div className="relative shrink-0 self-start sm:self-auto group">
                  <img 
                    src={regisPhoto} 
                    alt="Regislane da Silva - Coordenadora Pedagógica" 
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover object-[center_15%] border-3 border-white ring-2 ring-[#812392] shadow-md"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/media/regislane-da-silva.jpg';
                    }}
                  />
                  <span className="absolute -bottom-1.5 -right-1 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#531062] text-[#ffc928] shadow-xs">
                    Dirceu
                  </span>
                  
                  {/* Camera icon button to open upload modal */}
                  <button
                    type="button"
                    onClick={() => setIsPhotoModalOpen(true)}
                    title="Fazer Upload da Foto Real da Regis"
                    aria-label="Fazer Upload da Foto Real da Regis"
                    className="absolute -top-2 -right-2 p-1.5 rounded-full bg-[#531062] hover:bg-[#812392] text-[#ffc928] shadow-md border-2 border-white transition cursor-pointer hover:scale-110 active:scale-95"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xl sm:text-2xl font-black text-[#25102b]">
                      Regislane da Silva
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-[#812392]">
                    Coordenação Pedagógica · Unidade Dirceu
                  </p>
                  <p className="text-xs text-[#716575] mt-0.5">
                    Teresina - PI
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsPhotoModalOpen(true)}
                    className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#f1e2f4] hover:bg-[#e6d0ea] text-[#531062] text-xs font-bold transition cursor-pointer"
                  >
                    <Camera className="w-3 h-3 text-[#812392]" />
                    <span>Upload Foto da Regis</span>
                  </button>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#534657] leading-relaxed">
                Responsável pelo acolhimento humanizado dos jovens e suas famílias, orientação socioemocional, acompanhamento de frequência e condução dos treinamentos pré-admissionais para as empresas parceiras.
              </p>
            </div>

            <div className="space-y-2.5 pt-5 mt-5 border-t border-[#eadfeb] text-xs sm:text-sm font-semibold text-[#4d3e51]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#812392] shrink-0" />
                <span>Acolhimento socioemocional individualizado</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#812392] shrink-0" />
                <span>Orientação vocacional e postura profissional</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#812392] shrink-0" />
                <span>Treinamento prático para entrevistas de emprego</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom 3 Core Pillars: full width, clean and harmonious */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-[#f7f3f8] border border-[#eadfeb] hover:border-[#812392]/50 hover:bg-white transition-all shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-white border border-[#eadfeb] flex items-center justify-center text-[#812392] mb-4 shadow-xs">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h4 className="font-black text-[#25102b] text-lg mb-1">Acolhimento Real</h4>
            <p className="text-sm text-[#6c6570] leading-relaxed">
              Escuta atenta e orientação humanizada para cada jovem e família, entendendo a realidade social de cada comunidade de Teresina.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#f7f3f8] border border-[#eadfeb] hover:border-[#812392]/50 hover:bg-white transition-all shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-white border border-[#eadfeb] flex items-center justify-center text-[#ffc928] mb-4 shadow-xs">
              <Award className="w-6 h-6 fill-[#ffc928]/20" />
            </div>
            <h4 className="font-black text-[#25102b] text-lg mb-1">Preparação Prática</h4>
            <p className="text-sm text-[#6c6570] leading-relaxed">
              Treinamento focado no mundo corporativo real: atendimento, rotinas administrativas, comunicação e comportamento profissional.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#f7f3f8] border border-[#eadfeb] hover:border-[#812392]/50 hover:bg-white transition-all shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-white border border-[#eadfeb] flex items-center justify-center text-[#531062] mb-4 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-black text-[#25102b] text-lg mb-1">Transparência Total</h4>
            <p className="text-sm text-[#6c6570] leading-relaxed">
              Processo de cadastro e encaminhamento 100% gratuito para o jovem, em conformidade com as diretrizes da Lei do Aprendiz (Lei 10.097/2000).
            </p>
          </div>
        </div>

      </div>

      <RegisPhotoModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
      />
    </section>
  );
};
