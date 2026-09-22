import React, { useState, useMemo } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  HelpCircle, 
  MessageCircle,
  DollarSign,
  GraduationCap,
  Filter,
  ChevronDown,
  Share2,
  Check,
  X
} from 'lucide-react';
import { OPPORTUNITIES, SITE_INFO } from '../data/siteData';
import { Opportunity } from '../types';
import { OpportunityModal } from './OpportunityModal';
import { AnimatedCounter } from './AnimatedCounter';

interface OpportunitiesSectionProps {
  onOpenCurriculum: (unit?: 'dirceu' | 'centro') => void;
  opportunities?: Opportunity[];
}

export const OpportunitiesSection: React.FC<OpportunitiesSectionProps> = ({ 
  onOpenCurriculum,
  opportunities = OPPORTUNITIES
}) => {
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [showRightsGuide, setShowRightsGuide] = useState<boolean>(false);
  const [copiedOpId, setCopiedOpId] = useState<number | null>(null);

  // Filter logic
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter(op => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        op.title.toLowerCase().includes(q) ||
        op.description.toLowerCase().includes(q) ||
        op.sector.toLowerCase().includes(q) ||
        op.city.toLowerCase().includes(q) ||
        (op.category && op.category.toLowerCase().includes(q));
      
      const matchesCategory = 
        selectedCategory === 'todos' ||
        op.sector.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        op.category.toLowerCase().includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [opportunities, searchQuery, selectedCategory]);

  const categories = [
    { id: 'todos', label: 'Todas as Vagas' },
    { id: 'administrativo', label: 'Administrativo' },
    { id: 'recepção', label: 'Recepção / Atendimento' },
    { id: 'comercio', label: 'Comércio / Varejo' }
  ];

  const handleShareOpportunity = (op: Opportunity) => {
    const text = `🎯 *Oportunidade Jovem Aprendiz em Teresina!*\n\n*Cargo:* ${op.title}\n*Área:* ${op.sector} (${op.category})\n*Faixa Etária:* ${op.ageRange}\n*Carga Horária:* ${op.workload}\n*Bolsa:* ${op.salary}\n*Local:* ${op.city} - PI\n*Requisitos:* ${op.requirements}\n\nCadastre-se gratuitamente pelo portal oficial da Oficina do Aprendiz:\nhttps://oficinadoaprendizpi.com.br`;
    
    if (navigator.share) {
      navigator.share({
        title: `Vaga: ${op.title} - Oficina do Aprendiz`,
        text: text,
        url: window.location.href
      }).catch(() => {
        // fallback to clipboard
        copyText(text, op.id);
      });
    } else {
      copyText(text, op.id);
    }
  };

  const copyText = (text: string, id: number) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedOpId(id);
      setTimeout(() => setCopiedOpId(null), 2500);
    }
  };

  const hasActiveFilters = searchQuery.trim() !== '' || selectedCategory !== 'todos';

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('todos');
  };

  return (
    <section id="oportunidades" className="py-16 md:py-24 bg-[#f3edf5] border-b border-[#e5d9e8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#f1e2f4] border border-[#e5d9e8] text-[#812392] text-sm font-black tracking-wider uppercase mb-3">
              <Sparkles className="w-4 h-4 text-[#812392]" />
              <span>PAINEL DE OPORTUNIDADES OFICIAIS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#25102b] tracking-tight">
              Seu próximo passo pode começar aqui.
            </h2>
            <p className="text-[#6c6570] text-base sm:text-lg mt-2 max-w-2xl">
              Consulte as oportunidades de aprendizagem abertas para os polos de Teresina. Processo 100% gratuito para o jovem.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 text-sm font-bold px-4 py-2.5 rounded-xl bg-white text-[#531062] border border-[#e5d9e8] shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Vagas em Processo de Avaliação</span>
            </span>
          </div>
        </div>

        {/* Big Counter Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 border-2 border-[#812392]/30 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-sm font-bold uppercase tracking-wider text-[#716575]">
                Oportunidades Disponíveis em Teresina
              </span>
              <div className="text-4xl sm:text-5xl font-black text-[#531062] mt-1">
                <AnimatedCounter value={opportunities.length} /> {opportunities.length === 1 ? 'vaga' : 'vagas'}
              </div>
              <p className="text-sm text-[#716575] mt-1 font-medium">
                Candidaturas abertas para avaliação nos polos
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-[#f1e2f4] text-[#812392] flex items-center justify-center">
              <Briefcase className="w-7 h-7" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#e5d9e8] shadow-xs flex items-center justify-between">
            <div>
              <span className="text-sm font-bold uppercase tracking-wider text-[#716575]">
                Oportunidades Esgotadas em Teresina
              </span>
              <div className="text-4xl sm:text-5xl font-black text-[#25102b] mt-1">
                <AnimatedCounter value="498" />
              </div>
              <p className="text-sm text-[#716575] mt-1 font-medium">
                Impacto acumulado no último ano
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-[#f7f3f8] text-[#531062] flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl border border-[#e5d9e8] p-4 mb-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#716575] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por cargo, bairro ou função..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm font-semibold text-[#25102b] bg-[#f7f3f8] border border-[#eadfeb] rounded-xl focus:outline-hidden focus:border-[#812392] focus:bg-white transition"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-sm font-bold transition cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#531062] text-[#ffc928] shadow-xs'
                    : 'bg-[#f7f3f8] text-[#716575] hover:text-[#25102b] hover:bg-[#efe3f2]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters Bar */}
        <div className="flex items-center justify-between px-2 mb-6 text-sm text-[#716575]">
          <span>
            Exibindo <strong className="text-[#25102b]">{filteredOpportunities.length}</strong> de {opportunities.length} vagas
          </span>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#812392] hover:text-[#531062] cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Limpar filtros de busca</span>
            </button>
          )}
        </div>

        {/* Opportunities Grid */}
        {filteredOpportunities.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#e5d9e8] p-10 text-center text-[#716575] my-6">
            <Briefcase className="w-10 h-10 text-[#812392] mx-auto mb-3 opacity-60" />
            <h4 className="text-lg font-black text-[#25102b]">Nenhuma vaga encontrada para esta busca</h4>
            <p className="text-sm mt-1">Tente remover os filtros ou cadastre seu currículo para oportunidades imediatas nos polos.</p>
            <div className="mt-4 flex items-center justify-center gap-3">
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-5 py-2.5 rounded-xl bg-[#f7f3f8] text-[#531062] text-sm font-bold border border-[#eadfeb] hover:bg-[#efe3f2] transition cursor-pointer"
                >
                  Ver Todas as Vagas
                </button>
              )}
              <button
                onClick={() => onOpenCurriculum()}
                className="px-6 py-2.5 rounded-xl bg-[#531062] text-[#ffc928] text-sm font-black shadow-xs hover:bg-[#812392] transition cursor-pointer"
              >
                Cadastrar Currículo Geral
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            {filteredOpportunities.map((op) => (
              <div
                key={op.id}
                className="bg-white rounded-2xl border border-[#e5d9e8] p-6 sm:p-7 shadow-xs hover:shadow-lg hover:border-[#812392] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Badges and Share Action */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-md text-sm font-black uppercase bg-[#f1e2f4] text-[#812392]">
                        {op.category}
                      </span>
                      <span className="px-3 py-1 rounded-md text-sm font-semibold bg-[#f7f3f8] text-[#4d3e51]">
                        {op.sector}
                      </span>
                      <span className="px-3 py-1 rounded-md text-sm font-bold bg-[#ffc928]/20 text-[#531062] border border-[#ffc928]/40">
                        {op.city?.includes('PI') ? op.city : `${op.city} - PI`}
                      </span>
                    </div>

                    <button
                      onClick={() => handleShareOpportunity(op)}
                      title="Compartilhar vaga"
                      className="p-2 rounded-xl text-[#716575] hover:text-[#531062] hover:bg-[#f1e2f4] transition cursor-pointer shrink-0"
                      aria-label="Compartilhar oportunidade"
                    >
                      {copiedOpId === op.id ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                          <Check className="w-4 h-4" />
                          <span>Copiado!</span>
                        </span>
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-black text-[#25102b] mb-2 group-hover:text-[#812392] transition">
                    {op.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#6c6570] mb-5 leading-relaxed">
                    {op.description}
                  </p>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-3 p-4.5 rounded-xl bg-[#f7f3f8] border border-[#eadfeb] text-sm text-[#4d3e51] mb-5">
                    <div>
                      <span className="text-[#716575] block font-medium">Faixa Etária:</span>
                      <span className="font-black text-[#25102b] text-base">{op.ageRange}</span>
                    </div>
                    <div>
                      <span className="text-[#716575] block font-medium">Carga Horária:</span>
                      <span className="font-black text-[#25102b] text-base">{op.workload}</span>
                    </div>
                    <div>
                      <span className="text-[#716575] block font-medium">Bolsa / Salário:</span>
                      <span className="font-black text-[#812392] text-base">{op.salary}</span>
                    </div>
                    <div>
                      <span className="text-[#716575] block font-medium">Perfil Solicitado:</span>
                      <span className="font-black text-[#25102b] text-base">{op.sex || 'Ambos os sexos'}</span>
                    </div>
                  </div>

                  {/* Requirements Preview */}
                  <div className="text-sm text-[#6c6570] bg-[#faf6fb] p-3.5 rounded-xl border border-[#eadfeb] mb-6">
                    <strong className="text-[#25102b]">Requisitos:</strong> {op.requirements}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-[#eadfeb] flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedOpportunity(op)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 text-sm font-bold text-[#531062] bg-[#f1e2f4] hover:bg-[#efe3f2] rounded-xl transition cursor-pointer"
                  >
                    <span>Ver Requisitos Completos</span>
                    <ArrowRight className="w-4 h-4 text-[#812392]" />
                  </button>

                  <button
                    onClick={() => onOpenCurriculum()}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-sm sm:text-base font-black text-[#28102d] bg-[#ffc928] hover:bg-[#e6b420] active:bg-[#d4a317] rounded-xl shadow-xs transition cursor-pointer active:scale-98"
                  >
                    <span>Cadastrar para Esta Vaga</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Guia de Direitos do Aprendiz (Accordion) */}
        <div className="bg-white rounded-2xl border border-[#e5d9e8] p-6 sm:p-8 shadow-xs">
          <button
            onClick={() => setShowRightsGuide(!showRightsGuide)}
            className="w-full flex items-center justify-between text-left focus:outline-hidden cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#f1e2f4] text-[#812392] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#25102b]">
                  Dúvidas sobre o Programa Jovem Aprendiz e Direitos Garantidos por Lei
                </h3>
                <p className="text-sm text-[#716575] mt-0.5">
                  Saiba como funciona a Lei 10.097/2000, remuneração, carga horária e proteção escolar.
                </p>
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 text-[#812392] transition-transform duration-300 ${showRightsGuide ? 'rotate-180' : ''}`} />
          </button>

          {showRightsGuide && (
            <div className="mt-6 pt-6 border-t border-[#eadfeb] grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-[#4d3e51] animate-in fade-in duration-200">
              <div className="p-4.5 rounded-xl bg-[#f7f3f8] border border-[#eadfeb]">
                <h4 className="font-black text-[#25102b] text-base mb-1.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#812392]" />
                  <span>100% Gratuito</span>
                </h4>
                <p className="leading-relaxed text-sm text-[#6c6570]">
                  O jovem não paga nenhum valor para se cadastrar, participar de entrevistas ou receber orientações da Oficina do Aprendiz.
                </p>
              </div>

              <div className="p-4.5 rounded-xl bg-[#f7f3f8] border border-[#eadfeb]">
                <h4 className="font-black text-[#25102b] text-base mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-4.5 h-4.5 text-[#812392]" />
                  <span>Jornada Reduzida</span>
                </h4>
                <p className="leading-relaxed text-sm text-[#6c6570]">
                  Carga horária compatível com a vida escolar (geralmente de 4h a 6h diárias), preservando a dedicação aos estudos regulares.
                </p>
              </div>

              <div className="p-4.5 rounded-xl bg-[#f7f3f8] border border-[#eadfeb]">
                <h4 className="font-black text-[#25102b] text-base mb-1.5 flex items-center gap-1.5">
                  <GraduationCap className="w-4.5 h-4.5 text-[#812392]" />
                  <span>Carteira Assinada & FGTS</span>
                </h4>
                <p className="leading-relaxed text-sm text-[#6c6570]">
                  Contrato formal com direito a remuneração mensal, férias remuneradas coincidentes com o recesso escolar e FGTS (2%).
                </p>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Opportunity Detail Modal */}
      <OpportunityModal
        opportunity={selectedOpportunity}
        onClose={() => setSelectedOpportunity(null)}
        onOpenCurriculum={onOpenCurriculum}
      />
    </section>
  );
};
