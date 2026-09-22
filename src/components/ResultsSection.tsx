import React, { useState } from 'react';
import { 
  Users, 
  Briefcase, 
  ArrowUpRight, 
  Building2, 
  TrendingUp, 
  MapPin, 
  Globe,
  Award
} from 'lucide-react';
import { NATIONAL_METRICS, REGIONAL_METRICS } from '../data/siteData';
import { AnimatedCounter } from './AnimatedCounter';

export const ResultsSection: React.FC = () => {
  const [viewScope, setViewScope] = useState<'teresina' | 'brasil'>('teresina');

  return (
    <section id="resultados" className="py-16 md:py-24 bg-[#17081d] text-white relative overflow-hidden border-b border-[#300f3a]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#812392]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#531062] border border-[#812392] text-[#ffc928] text-sm font-black tracking-wider uppercase mb-3">
              <TrendingUp className="w-4 h-4" />
              <span>RESULTADOS COMPROVADOS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Uma rede sólida que aproxima talentos e oportunidades.
            </h2>
            <p className="text-[#d7a8df] text-base sm:text-lg mt-2 max-w-2xl">
              Confira os números consolidados que refletem a dedicação da nossa equipe em transformar vidas pelo trabalho.
            </p>
          </div>

          {/* Scope Toggle Tabs */}
          <div className="flex items-center p-1 bg-[#23092c] border border-[#531062] rounded-xl w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setViewScope('teresina')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-black rounded-lg transition min-h-[44px] cursor-pointer ${
                viewScope === 'teresina'
                  ? 'bg-[#ffc928] text-[#28102d] shadow-sm'
                  : 'text-[#d7a8df] hover:text-white'
              }`}
            >
              <MapPin className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">Teresina - PI (1 ano)</span>
            </button>
            <button
              onClick={() => setViewScope('brasil')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-black rounded-lg transition min-h-[44px] cursor-pointer ${
                viewScope === 'brasil'
                  ? 'bg-[#ffc928] text-[#28102d] shadow-sm'
                  : 'text-[#d7a8df] hover:text-white'
              }`}
            >
              <Globe className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">Rede Brasil (15 anos)</span>
            </button>
          </div>
        </div>

        {/* Dynamic Metric Cards */}
        {viewScope === 'teresina' ? (
          <div>
            <div className="mb-4 flex items-center gap-2 text-sm font-bold text-[#ffc928] uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffc928]" />
              <span>Impacto em um ano construído perto de nós · Teresina, Piauí</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-[#531062] border border-[#7b1a90] rounded-2xl p-6 hover:border-[#ffc928] transition duration-300 shadow-md">
                <div className="w-12 h-12 rounded-xl bg-[#23092c] border border-[#812392] text-[#ffc928] flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-[#ffc928] tracking-tight mb-1">
                  <AnimatedCounter value={REGIONAL_METRICS.resumes} />
                </div>
                <div className="text-base font-semibold text-[#e9dfea]">
                  {REGIONAL_METRICS.resumesLabel}
                </div>
              </div>

              <div className="bg-[#531062] border border-[#7b1a90] rounded-2xl p-6 hover:border-[#ffc928] transition duration-300 shadow-md">
                <div className="w-12 h-12 rounded-xl bg-[#23092c] border border-[#812392] text-[#ffc928] flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-[#ffc928] tracking-tight mb-1">
                  <AnimatedCounter value={REGIONAL_METRICS.opportunities} />
                </div>
                <div className="text-base font-semibold text-[#e9dfea]">
                  {REGIONAL_METRICS.opportunitiesLabel}
                </div>
              </div>

              <div className="bg-[#531062] border border-[#7b1a90] rounded-2xl p-6 hover:border-[#ffc928] transition duration-300 shadow-md">
                <div className="w-12 h-12 rounded-xl bg-[#23092c] border border-[#812392] text-[#ffc928] flex items-center justify-center mb-4">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-[#ffc928] tracking-tight mb-1">
                  <AnimatedCounter value={REGIONAL_METRICS.referrals} />
                </div>
                <div className="text-base font-semibold text-[#e9dfea]">
                  {REGIONAL_METRICS.referralsLabel}
                </div>
              </div>

              <div className="bg-[#531062] border border-[#ffc928] rounded-2xl p-6 hover:border-white transition duration-300 shadow-md ring-2 ring-[#ffc928]/40">
                <div className="w-12 h-12 rounded-xl bg-[#ffc928] text-[#28102d] flex items-center justify-center mb-4 shadow-sm">
                  <Building2 className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-1">
                  <AnimatedCounter value={REGIONAL_METRICS.hires} />
                </div>
                <div className="text-base font-bold text-[#ffc928]">
                  {REGIONAL_METRICS.hiresLabel}
                </div>
              </div>

            </div>
          </div>
        ) : (
          <div>
            <div className="mb-4 flex items-center gap-2 text-sm font-bold text-[#ffc928] uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffc928]" />
              <span>Resultados consolidados da rede parceira · 10 estados do Brasil</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-[#531062] border border-[#7b1a90] rounded-2xl p-6 hover:border-[#ffc928] transition duration-300 shadow-md">
                <div className="w-12 h-12 rounded-xl bg-[#23092c] border border-[#812392] text-[#ffc928] flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-[#ffc928] tracking-tight mb-1">
                  <AnimatedCounter value={NATIONAL_METRICS.resumes} />
                </div>
                <div className="text-base font-semibold text-[#e9dfea]">
                  {NATIONAL_METRICS.resumesLabel}
                </div>
              </div>

              <div className="bg-[#531062] border border-[#7b1a90] rounded-2xl p-6 hover:border-[#ffc928] transition duration-300 shadow-md">
                <div className="w-12 h-12 rounded-xl bg-[#23092c] border border-[#812392] text-[#ffc928] flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-[#ffc928] tracking-tight mb-1">
                  <AnimatedCounter value={NATIONAL_METRICS.opportunities} />
                </div>
                <div className="text-base font-semibold text-[#e9dfea]">
                  {NATIONAL_METRICS.opportunitiesLabel}
                </div>
              </div>

              <div className="bg-[#531062] border border-[#7b1a90] rounded-2xl p-6 hover:border-[#ffc928] transition duration-300 shadow-md">
                <div className="w-12 h-12 rounded-xl bg-[#23092c] border border-[#812392] text-[#ffc928] flex items-center justify-center mb-4">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-[#ffc928] tracking-tight mb-1">
                  <AnimatedCounter value={NATIONAL_METRICS.referrals} />
                </div>
                <div className="text-base font-semibold text-[#e9dfea]">
                  {NATIONAL_METRICS.referralsLabel}
                </div>
              </div>

              <div className="bg-[#531062] border border-[#ffc928] rounded-2xl p-6 hover:border-white transition duration-300 shadow-md ring-2 ring-[#ffc928]/40">
                <div className="w-12 h-12 rounded-xl bg-[#ffc928] text-[#28102d] flex items-center justify-center mb-4 shadow-sm">
                  <Building2 className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-1">
                  <AnimatedCounter value={NATIONAL_METRICS.hires} />
                </div>
                <div className="text-base font-bold text-[#ffc928]">
                  {NATIONAL_METRICS.hiresLabel}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
