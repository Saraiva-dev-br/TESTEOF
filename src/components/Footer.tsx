import React from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageCircle, 
  BrainCircuit, 
  GraduationCap, 
  ShieldCheck, 
  Heart,
  ChevronRight
} from 'lucide-react';
import { SITE_INFO } from '../data/siteData';

interface FooterProps {
  onOpenVocational: () => void;
  onOpenStudentPortal: () => void;
  onOpenCurriculum: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenVocational,
  onOpenStudentPortal,
  onOpenCurriculum
}) => {
  return (
    <footer className="bg-[#17081d] text-[#d7a8df] pt-16 pb-12 border-t border-[#381044]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#381044]">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="overflow-hidden rounded-2xl bg-white p-1.5 sm:p-2 shadow-md shrink-0 flex items-center justify-center">
                <img 
                  src="/logo-icon.png" 
                  alt="Oficina do Aprendiz" 
                  className="h-12 sm:h-14 w-auto object-contain" 
                  onError={(e) => {
                    const el = e.currentTarget;
                    el.onerror = null;
                    el.src = '/logo-oficina.jpeg';
                  }}
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-xl sm:text-2xl font-black text-white block leading-tight">
                  Oficina do Aprendiz
                </span>
                <span className="text-xs sm:text-sm font-black text-[#ffc928] uppercase tracking-wider mt-0.5">
                  Teresina · Piauí
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#d7a8df] max-w-sm leading-relaxed">
              Iniciativa dedicada à intermediação, capacitação e encaminhamento de jovens ao mercado de trabalho formal em Teresina e em todo o Brasil.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={SITE_INFO.whatsappUrlGeneral}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#ffc928] hover:bg-[#e6b420] text-[#28102d] text-sm font-black transition shadow-xs cursor-pointer active:scale-98"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: {SITE_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-sm font-black uppercase tracking-wider text-white">
              Navegação Rápida
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#inicio" className="hover:text-[#ffc928] transition">Início</a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-[#ffc928] transition">Quem Somos</a>
              </li>
              <li>
                <a href="#etapas" className="hover:text-[#ffc928] transition">Etapas do Encaminhamento</a>
              </li>
              <li>
                <a href="#resultados" className="hover:text-[#ffc928] transition">Resultados em Teresina</a>
              </li>
              <li>
                <a href="#oportunidades" className="hover:text-[#ffc928] transition">Vagas de Aprendiz Abertas</a>
              </li>
              <li>
                <a href="#videos-historias" className="hover:text-[#ffc928] transition">Vídeos de Depoimentos Reais</a>
              </li>
              <li>
                <a href="#presenca" className="hover:text-[#ffc928] transition">Polos Dirceu e Centro</a>
              </li>
            </ul>
          </div>

          {/* Units in Teresina */}
          <div className="lg:col-span-4 space-y-3">
            <h5 className="text-sm font-black uppercase tracking-wider text-white">
              Polos em Teresina - PI
            </h5>
            
            <div className="space-y-3 text-sm">
              <div className="p-4 rounded-xl bg-[#23092c] border border-[#381044]">
                <div className="flex items-center justify-between text-[#ffc928] font-black mb-1">
                  <span className="text-base">Unidade Dirceu</span>
                  <span className="text-xs text-[#d7a8df] font-medium">Parque Ideal</span>
                </div>
                <p className="text-[#e9dfea] text-sm leading-relaxed">R. Dr. Pedro Teixeira, 2964 - Parque Ideal</p>
                <p className="text-[#c2b3c5] text-xs mt-1">Seg. a sex.: 08h às 17h · Sáb.: 08h às 12h</p>
              </div>

              <div className="p-4 rounded-xl bg-[#23092c] border border-[#381044]">
                <div className="flex items-center justify-between text-[#ffc928] font-black mb-1">
                  <span className="text-base">Unidade Centro</span>
                  <span className="text-xs text-[#d7a8df] font-medium">Ed. Cel. Otávio Miranda</span>
                </div>
                <p className="text-[#e9dfea] text-sm leading-relaxed">Edifício Coronel Otávio Miranda: Rua Rui Barbosa, nº 68, Centro - 6º Andar, sala 613</p>
                <p className="text-[#c2b3c5] text-xs mt-1">Seg. a sex.: 08h às 17h · Sáb.: 08h às 12h</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onOpenVocational}
                className="text-sm text-[#ffc928] hover:underline font-bold cursor-pointer"
              >
                Teste Vocacional
              </button>
              <span className="text-[#531062]">·</span>
              <button
                onClick={onOpenStudentPortal}
                className="text-sm text-[#d7a8df] hover:text-white font-bold cursor-pointer"
              >
                Portal do Aluno
              </button>
            </div>

          </div>

        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 text-xs sm:text-sm text-[#c2b3c5] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-center sm:text-left max-w-2xl leading-relaxed">
            © {new Date().getFullYear()} Oficina do Aprendiz · Teresina - PI. Todos os direitos reservados. Projeto parceiro em conformidade com a Lei do Aprendiz (Lei Federal nº 10.097/2000). A participação nos processos seletivos é 100% gratuita para os candidatos.
          </p>
          <div className="flex items-center gap-2 text-[#d7a8df] shrink-0">
            <ShieldCheck className="w-4 h-4 text-[#ffc928]" />
            <span>Encaminhamento seguro e ético</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
