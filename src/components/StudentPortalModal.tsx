import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  X, 
  Bell, 
  Calendar, 
  MessageSquareText, 
  Users, 
  Clock, 
  CheckCircle2, 
  GraduationCap, 
  MapPin, 
  Send, 
  AlertCircle, 
  Building2, 
  Lightbulb, 
  MessageCircle,
  Share2,
  Filter,
  Search,
  Ticket,
  Tag,
  Copy,
  Check,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  HOLIDAYS_2026, 
  LECTURE_SESSIONS, 
  STUDENT_NOTICES, 
  SITE_INFO 
} from '../data/siteData';
import { StudentNotice, LectureSession } from '../types';
import { generateProtocol, formatBrazilianDate } from '../utils/formatters';

interface StudentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'avisos' | 'palestra' | 'feriados' | 'sugestao';
  notices?: StudentNotice[];
}

export const StudentPortalModal: React.FC<StudentPortalModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'avisos',
  notices = STUDENT_NOTICES
}) => {
  const [activeTab, setActiveTab] = useState<'avisos' | 'palestra' | 'feriados' | 'sugestao'>(initialTab);
  const [selectedSessionId, setSelectedSessionId] = useState<string>(LECTURE_SESSIONS[0]?.id || '');
  const [holidayFilter, setHolidayFilter] = useState<'todos' | 'Nacional' | 'Estadual' | 'Municipal'>('todos');
  const [holidaySearch, setHolidaySearch] = useState<string>('');
  
  // Notice search & filter
  const [noticeSearch, setNoticeSearch] = useState<string>('');
  const [noticePriority, setNoticePriority] = useState<'todos' | 'alta' | 'normal'>('todos');

  // Lecture Protocol State
  const [lectureProtocol, setLectureProtocol] = useState<string>('');
  const [ticketCopied, setTicketCopied] = useState<boolean>(false);

  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  // Lecture Form State
  const [lectureForm, setLectureForm] = useState({
    studentName: '',
    birthDate: '',
    course: '',
    neighborhood: '',
    zone: 'Zona Sudeste',
    sessionId: LECTURE_SESSIONS[0]?.id || ''
  });
  const [lectureSubmitted, setLectureSubmitted] = useState<boolean>(false);

  // Suggestion Form State
  const [suggestionForm, setSuggestionForm] = useState({
    studentName: '',
    birthDate: '',
    responsibleName: '',
    neighborhood: '',
    zone: 'Zona Sudeste',
    course: '',
    category: 'Pedagógico & Aulas',
    message: ''
  });
  const [suggestionSubmitted, setSuggestionSubmitted] = useState<boolean>(false);

  // Filtered Notices
  const filteredNotices = useMemo(() => {
    return notices.filter((n) => {
      const q = noticeSearch.toLowerCase().trim();
      const matchesText = !q || n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q);
      const matchesPriority = noticePriority === 'todos' || n.priority === noticePriority;
      return matchesText && matchesPriority;
    });
  }, [notices, noticeSearch, noticePriority]);

  if (!isOpen) return null;

  const handleRegisterLecture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lectureForm.studentName.trim() || !lectureForm.birthDate || !lectureForm.course.trim()) {
      return;
    }
    const proto = generateProtocol('PALESTRA');
    setLectureProtocol(proto);
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
    setLectureSubmitted(true);
  };

  const handleSendLectureToWhatsApp = () => {
    const session = LECTURE_SESSIONS.find((s: LectureSession) => s.id === (lectureForm.sessionId || selectedSessionId));
    const locationInfo = lectureForm.neighborhood 
      ? `*Bairro:* ${lectureForm.neighborhood} (${lectureForm.zone})\n`
      : `*Zona:* ${lectureForm.zone}\n`;
    const protoInfo = lectureProtocol ? `*Protocolo de Inscrição:* ${lectureProtocol}\n` : '';
    const text = encodeURIComponent(
      `Olá! Realizei minha inscrição na *Palestra de Empregabilidade* da Oficina do Aprendiz:\n\n` +
      protoInfo +
      `*Aluno:* ${lectureForm.studentName}\n` +
      `*Nascimento:* ${lectureForm.birthDate}\n` +
      `*Curso:* ${lectureForm.course}\n` +
      locationInfo +
      `*Horário Escolhido:* ${session?.label || 'Segunda-feira'} (${session?.eventTime})\n\n` +
      `Por favor, confirmem minha vaga no polo presencial de Teresina.`
    );
    window.open(`https://wa.me/${SITE_INFO.whatsappRaw}?text=${text}`, '_blank');
  };

  const handleSendSuggestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestionForm.studentName.trim() || !suggestionForm.message.trim()) {
      return;
    }
    try {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
    setSuggestionSubmitted(true);
  };

  const handleSendSuggestionToWhatsApp = () => {
    const locationInfo = suggestionForm.neighborhood 
      ? `*Bairro / Zona:* ${suggestionForm.neighborhood} (${suggestionForm.zone})\n`
      : `*Zona:* ${suggestionForm.zone}\n`;
    const text = encodeURIComponent(
      `Olá, Diretoria da Oficina do Aprendiz! Sou aluno e gostaria de registrar a seguinte sugestão:\n\n` +
      `*Categoria:* ${suggestionForm.category}\n` +
      `*Aluno:* ${suggestionForm.studentName}\n` +
      `*Curso:* ${suggestionForm.course}\n` +
      locationInfo +
      (suggestionForm.responsibleName ? `*Responsável:* ${suggestionForm.responsibleName}\n` : '') +
      `*Mensagem:* ${suggestionForm.message}`
    );
    window.open(`https://wa.me/${SITE_INFO.whatsappRaw}?text=${text}`, '_blank');
  };

  const filteredHolidays = HOLIDAYS_2026.filter(h => {
    const matchesScope = holidayFilter === 'todos' || h.scope.toLowerCase().includes(holidayFilter.toLowerCase());
    const q = holidaySearch.toLowerCase().trim();
    const matchesSearch = !q || h.name.toLowerCase().includes(q) || h.date.includes(q);
    return matchesScope && matchesSearch;
  });

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="student-portal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#eadfeb] my-auto flex flex-col max-h-[92dvh] sm:max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#4b0d59] via-[#3d094a] to-[#25102b] p-4 sm:p-6 text-white relative shrink-0 border-b border-[#380a43]">
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none active:scale-95"
            aria-label="Fechar área do aluno"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffc928]/25 border border-[#ffc928]/40 text-[#ffc928] text-xs sm:text-sm font-black uppercase tracking-wider mb-2">
            <GraduationCap className="w-4 h-4 text-[#ffc928]" />
            <span>ÁREA EXCLUSIVA DOS ALUNOS · TERESINA</span>
          </div>

          <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight pr-10">
            Informação, formação e oportunidades em um só lugar
          </h3>
          <p className="text-xs sm:text-base text-[#e9dfea] mt-1.5 leading-relaxed">
            Acompanhe os avisos da Oficina do Aprendiz, participe das palestras e consulte o calendário letivo.
          </p>

          {/* Navigation Sub-Tabs matching original site - scrollable on mobile */}
          <div className="flex items-center gap-2 mt-4 sm:mt-5 overflow-x-auto pb-1 -mx-1 px-1 no-scrollbar sm:flex-wrap">
            <button
              onClick={() => setActiveTab('avisos')}
              className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 whitespace-nowrap min-h-[44px] ${
                activeTab === 'avisos'
                  ? 'bg-[#ffc928] text-[#28102d] shadow-xs'
                  : 'bg-[#380a43] text-[#e9dfea] hover:text-white hover:bg-[#531062]'
              }`}
            >
              <Bell className="w-4 h-4 shrink-0" />
              <span>Mural de Avisos</span>
            </button>

            <button
              onClick={() => setActiveTab('palestra')}
              className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 whitespace-nowrap min-h-[44px] ${
                activeTab === 'palestra'
                  ? 'bg-[#ffc928] text-[#28102d] shadow-xs'
                  : 'bg-[#380a43] text-[#e9dfea] hover:text-white hover:bg-[#531062]'
              }`}
            >
              <Users className="w-4 h-4 shrink-0" />
              <span>Palestra de Empregabilidade</span>
            </button>

            <button
              onClick={() => setActiveTab('feriados')}
              className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 whitespace-nowrap min-h-[44px] ${
                activeTab === 'feriados'
                  ? 'bg-[#ffc928] text-[#28102d] shadow-xs'
                  : 'bg-[#380a43] text-[#e9dfea] hover:text-white hover:bg-[#531062]'
              }`}
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span>Calendário 2026 (Feriados)</span>
            </button>

            <button
              onClick={() => setActiveTab('sugestao')}
              className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 whitespace-nowrap min-h-[44px] ${
                activeTab === 'sugestao'
                  ? 'bg-[#ffc928] text-[#28102d] shadow-xs'
                  : 'bg-[#380a43] text-[#e9dfea] hover:text-white hover:bg-[#531062]'
              }`}
            >
              <MessageSquareText className="w-4 h-4 shrink-0" />
              <span>Deixe sua Sugestão</span>
            </button>
          </div>
        </div>

        {/* Modal Content Scrollable Area */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: MURAL DE AVISOS */}
          {activeTab === 'avisos' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#eadfeb] pb-3 gap-3">
                <div>
                  <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#812392] block">
                    Informações Importantes
                  </span>
                  <h4 className="text-2xl font-black text-[#25102b] mt-0.5">
                    Mural de Avisos
                  </h4>
                </div>

                {/* Priority filters */}
                <div className="flex items-center gap-1.5 bg-[#f7f3f8] p-1 rounded-xl border border-[#eadfeb]">
                  {(['todos', 'alta', 'normal'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setNoticePriority(lvl)}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition cursor-pointer ${
                        noticePriority === lvl
                          ? 'bg-[#531062] text-[#ffc928]'
                          : 'text-[#716575] hover:text-[#25102b]'
                      }`}
                    >
                      {lvl === 'todos' ? 'Todos' : lvl === 'alta' ? 'Destaques' : 'Informativos'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Box */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#716575] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Pesquisar avisos por palavra-chave..."
                  value={noticeSearch}
                  onChange={(e) => setNoticeSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm font-medium text-[#25102b] bg-[#f7f3f8] border border-[#eadfeb] rounded-xl focus:outline-hidden focus:border-[#812392] focus:bg-white transition"
                />
              </div>

              {filteredNotices.length > 0 ? (
                <div className="space-y-3">
                  {filteredNotices.map((notice: StudentNotice) => (
                    <article key={notice.id} className="p-4.5 rounded-2xl bg-[#f7f3f8] border border-[#eadfeb] space-y-1.5 hover:border-[#812392]/40 transition">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                          notice.priority === 'alta' 
                            ? 'bg-[#812392] text-white' 
                            : 'bg-[#f1e2f4] text-[#812392]'
                        }`}>
                          {notice.priority === 'alta' ? '★ Destaque Pedagógico' : 'Informativo'}
                        </span>
                        <span className="text-xs font-bold text-[#716575]">
                          Publicado em {notice.date}
                        </span>
                      </div>
                      <h5 className="font-bold text-[#25102b] text-base">{notice.title}</h5>
                      <p className="text-sm text-[#534657] leading-relaxed">{notice.body}</p>
                    </article>
                  ))}
                </div>
              ) : (
                /* Authentic empty notice state as in original site */
                <div className="p-8 text-center rounded-2xl bg-[#f7f3f8] border border-[#eadfeb] space-y-2.5">
                  <Bell className="w-9 h-9 text-[#812392]/50 mx-auto" />
                  <p className="text-base font-semibold text-[#534657]">
                    Nenhum aviso publicado no momento.
                  </p>
                  <p className="text-sm text-[#716575]">
                    Fique atento aos comunicados presenciais nos Polos Dirceu e Centro.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PALESTRA DE EMPREGABILIDADE */}
          {activeTab === 'palestra' && (
            <div className="space-y-6">
              
              {/* Poster Header */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#531062] to-[#380a43] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs sm:text-sm font-black text-[#ffc928] uppercase tracking-wider block">
                    SEGUNDA-FEIRA
                  </span>
                  <h4 className="text-xl sm:text-2xl font-black text-white mt-1">
                    Palestra de Empregabilidade
                  </h4>
                  <p className="text-sm text-[#e9dfea] mt-1">
                    Toda segunda-feira · Cada turma possui até 10 vagas.
                  </p>
                </div>
                <div className="px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 text-sm text-white font-bold self-start sm:self-auto">
                  Vagas Limitadas (10 por turma)
                </div>
              </div>

              {!lectureSubmitted ? (
                <form onSubmit={handleRegisterLecture} className="space-y-4">
                  <div>
                    <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#812392] block">
                      PALESTRA DE EMPREGABILIDADE
                    </span>
                    <h5 className="text-lg font-black text-[#25102b] mt-0.5">
                      Clique e Inscreva-se
                    </h5>
                    <p className="text-sm text-[#6c6570] mt-0.5">
                      Escolha o horário da manhã ou da tarde.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-[#eadfeb]">
                    <div>
                      <label className="block text-sm font-bold text-[#25102b] mb-1">
                        Nome Completo do Jovem *
                      </label>
                      <input
                        name="studentName"
                        type="text"
                        required
                        placeholder="Seu nome completo"
                        value={lectureForm.studentName}
                        onChange={(e) => setLectureForm({ ...lectureForm, studentName: e.target.value })}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-[#eadfeb] focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b] transition"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-bold text-[#25102b] mb-1">
                          Data de Nascimento *
                        </label>
                        <input
                          name="birthDate"
                          type="date"
                          required
                          value={lectureForm.birthDate}
                          onChange={(e) => setLectureForm({ ...lectureForm, birthDate: e.target.value })}
                          className="w-full px-4 py-3 text-sm rounded-xl border border-[#eadfeb] focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b] transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-[#25102b] mb-1">
                          Curso em Andamento *
                        </label>
                        <input
                          name="course"
                          type="text"
                          required
                          placeholder="Ex: Auxiliar Administrativo"
                          value={lectureForm.course}
                          onChange={(e) => setLectureForm({ ...lectureForm, course: e.target.value })}
                          className="w-full px-4 py-3 text-sm rounded-xl border border-[#eadfeb] focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b] transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-bold text-[#25102b] mb-1">
                          Bairro em Teresina *
                        </label>
                        <input
                          name="neighborhood"
                          type="text"
                          required
                          placeholder="Ex: Dirceu, Promorar, Saci..."
                          value={lectureForm.neighborhood}
                          onChange={(e) => setLectureForm({ ...lectureForm, neighborhood: e.target.value })}
                          className="w-full px-4 py-3 text-sm rounded-xl border border-[#eadfeb] focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b] transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-[#25102b] mb-1">
                          Zona da Cidade *
                        </label>
                        <select
                          name="zone"
                          value={lectureForm.zone}
                          onChange={(e) => setLectureForm({ ...lectureForm, zone: e.target.value })}
                          className="w-full px-4 py-3 text-sm rounded-xl border border-[#eadfeb] focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b] transition font-medium"
                        >
                          <option value="Zona Sudeste">Zona Sudeste</option>
                          <option value="Zona Sul">Zona Sul</option>
                          <option value="Zona Leste">Zona Leste</option>
                          <option value="Zona Norte">Zona Norte</option>
                          <option value="Centro">Centro</option>
                          <option value="Região Metropolitana">Região Metropolitana</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#25102b] mb-2">
                        Escolha o Horário:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {LECTURE_SESSIONS.map((session: LectureSession) => (
                          <button
                            type="button"
                            key={session.id}
                            onClick={() => {
                              setSelectedSessionId(session.id);
                              setLectureForm({ ...lectureForm, sessionId: session.id });
                            }}
                            className={`p-4 rounded-2xl border-2 text-left transition cursor-pointer flex flex-col justify-between ${
                              (lectureForm.sessionId || selectedSessionId) === session.id
                                ? 'border-[#812392] bg-[#f1e2f4]'
                                : 'border-[#eadfeb] bg-white hover:border-[#812392]/50'
                            }`}
                          >
                            <span className="text-sm font-black text-[#531062]">{session.label}</span>
                            <span className="text-xs sm:text-sm text-[#716575] mt-1">{session.eventTime} · {session.period}</span>
                            <span className="text-xs font-bold text-emerald-700 mt-2">
                              {session.maxSlots - session.registrations} vagas restantes
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-4 px-6 text-sm sm:text-base font-black text-[#28102d] bg-[#ffc928] hover:bg-[#e6b420] active:bg-[#d4a317] rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#28102d]" />
                        <span>Confirmar Inscrição na Palestra</span>
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="p-6 rounded-2xl bg-[#f7f3f8] border border-[#eadfeb] text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#4b0d59] text-[#ffc928] flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h5 className="font-black text-[#25102b] text-xl">
                      Inscrição Registrada com Sucesso!
                    </h5>
                    <p className="text-sm text-[#534657] max-w-md mx-auto mt-1.5 leading-relaxed">
                      Sua solicitação de vaga para a Palestra de Empregabilidade foi confirmada. Guarde o protocolo para apresentação no polo.
                    </p>
                  </div>

                  {/* Protocol Ticket Card */}
                  <div className="bg-white border-2 border-[#812392]/30 rounded-2xl p-4 text-left space-y-2 max-w-md mx-auto">
                    <div className="flex items-center justify-between pb-2 border-b border-[#eadfeb]">
                      <div>
                        <span className="text-xs font-bold text-[#716575] uppercase block">
                          Protocolo do Participante
                        </span>
                        <span className="text-lg font-black text-[#531062] font-mono">
                          {lectureProtocol}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (navigator.clipboard) {
                            navigator.clipboard.writeText(lectureProtocol);
                            setTicketCopied(true);
                            setTimeout(() => setTicketCopied(false), 2000);
                          }
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#f7f3f8] hover:bg-[#efe3f2] text-xs font-bold text-[#531062] transition cursor-pointer"
                      >
                        {ticketCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#812392]" />}
                        <span>{ticketCopied ? 'Copiado!' : 'Copiar'}</span>
                      </button>
                    </div>
                    <div className="text-xs text-[#4d3e51] space-y-1">
                      <p><strong className="text-[#25102b]">Aluno:</strong> {lectureForm.studentName}</p>
                      <p><strong className="text-[#25102b]">Sessão:</strong> {LECTURE_SESSIONS.find((s: LectureSession) => s.id === (lectureForm.sessionId || selectedSessionId))?.label || 'Segunda-feira'}</p>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleSendLectureToWhatsApp}
                      className="w-full sm:w-auto px-6 py-3.5 text-sm font-black text-[#28102d] bg-[#ffc928] hover:bg-[#e6b420] rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Confirmar Presença via WhatsApp</span>
                    </button>

                    <button
                      onClick={() => {
                        setLectureSubmitted(false);
                        setLectureForm({ studentName: '', birthDate: '', course: '', neighborhood: '', zone: 'Zona Sudeste', sessionId: '' });
                        setLectureProtocol('');
                      }}
                      className="w-full sm:w-auto px-5 py-3.5 text-sm font-bold text-[#4b0d59] bg-white border border-[#eadfeb] rounded-xl hover:bg-[#f1e2f4] transition cursor-pointer active:scale-98"
                    >
                      Fazer Nova Inscrição
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CALENDÁRIO 2026 (FERIADOS - NÃO HAVERÁ AULA) */}
          {activeTab === 'feriados' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#eadfeb] pb-3 gap-2">
                <div>
                  <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#812392] block">
                    CALENDÁRIO 2026
                  </span>
                  <h4 className="text-2xl font-black text-[#25102b] mt-0.5">
                    Feriados — Não Haverá Aula
                  </h4>
                  <p className="text-sm text-[#6c6570] mt-0.5">
                    Datas nacionais, estaduais do Piauí e municipais de Teresina.
                  </p>
                </div>

                {/* Filter Scope */}
                <div className="flex items-center gap-1 bg-[#f7f3f8] p-1.5 rounded-xl border border-[#eadfeb]">
                  {(['todos', 'Nacional', 'Estadual', 'Municipal'] as const).map((scope) => (
                    <button
                      key={scope}
                      onClick={() => setHolidayFilter(scope)}
                      className={`px-3 py-1 text-xs sm:text-sm font-bold rounded-lg transition cursor-pointer ${
                        holidayFilter === scope
                          ? 'bg-[#531062] text-[#ffc928]'
                          : 'text-[#716575] hover:text-[#25102b]'
                      }`}
                    >
                      {scope}
                    </button>
                  ))}
                </div>
              </div>

              {/* Holiday Search Box */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#716575] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Pesquisar feriado (ex: Carnaval, Piauí, Natal)..."
                  value={holidaySearch}
                  onChange={(e) => setHolidaySearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm font-medium text-[#25102b] bg-[#f7f3f8] border border-[#eadfeb] rounded-xl focus:outline-hidden focus:border-[#812392] focus:bg-white transition"
                />
              </div>

              <div className="divide-y divide-[#eadfeb] border border-[#eadfeb] rounded-2xl overflow-hidden bg-white">
                {filteredHolidays.length === 0 ? (
                  <div className="p-8 text-center text-[#716575]">
                    <p className="text-sm font-medium">Nenhum feriado correspondente à sua busca.</p>
                  </div>
                ) : (
                  filteredHolidays.map((h, i) => (
                    <article key={i} className="p-4 flex items-center justify-between hover:bg-[#f7f3f8] transition">
                      <div className="flex items-center gap-3.5">
                        <time className="w-12 h-12 rounded-xl bg-[#f7f3f8] text-[#4b0d59] font-black flex flex-col items-center justify-center text-sm leading-tight shrink-0 border border-[#eadfeb]">
                          <span>{h.date.slice(0, 2)}</span>
                          <span className="text-xs text-[#812392] font-semibold">{h.date.slice(3, 5)}/26</span>
                        </time>
                        <div>
                          <b className="font-bold text-[#25102b] text-sm sm:text-base block">
                            {h.name}
                          </b>
                          <small className="text-xs sm:text-sm text-[#716575]">
                            {h.scope}
                          </small>
                        </div>
                      </div>
                      <em className="text-xs font-bold text-[#b91c1c] bg-[#fef2f2] px-3 py-1 rounded-full border border-[#fecaca] not-italic shrink-0">
                        SEM AULA
                      </em>
                    </article>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 4: DEIXE SUA SUGESTÃO (SUA OPINIÃO IMPORTA) */}
          {activeTab === 'sugestao' && (
            <div className="space-y-5">
              <div className="border-b border-[#eadfeb] pb-3">
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#812392] block">
                  SUA OPINIÃO IMPORTA
                </span>
                <h4 className="text-2xl font-black text-[#25102b] mt-0.5">
                  Deixe Sua Sugestão
                </h4>
                <p className="text-sm text-[#6c6570] mt-0.5">
                  A mensagem será recebida diretamente pela coordenação e direção da Oficina do Aprendiz.
                </p>
              </div>

              {!suggestionSubmitted ? (
                <form onSubmit={handleSendSuggestion} className="space-y-3.5">
                  <div>
                    <label className="block text-sm font-bold text-[#25102b] mb-1">
                      Nome Completo do Aluno *
                    </label>
                    <input
                      name="studentName"
                      type="text"
                      required
                      placeholder="Nome completo do aluno"
                      value={suggestionForm.studentName}
                      onChange={(e) => setSuggestionForm({ ...suggestionForm, studentName: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-[#eadfeb] focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b] transition"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-bold text-[#25102b] mb-1">
                        Data de Nascimento
                      </label>
                      <input
                        name="birthDate"
                        type="date"
                        value={suggestionForm.birthDate}
                        onChange={(e) => setSuggestionForm({ ...suggestionForm, birthDate: e.target.value })}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-[#eadfeb] focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#25102b] mb-1">
                        Nome do Responsável <small className="text-xs text-[#716575] font-normal">(se for menor de idade)</small>
                      </label>
                      <input
                        name="responsibleName"
                        type="text"
                        placeholder="Nome do responsável"
                        value={suggestionForm.responsibleName}
                        onChange={(e) => setSuggestionForm({ ...suggestionForm, responsibleName: e.target.value })}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-[#eadfeb] focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b] transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-bold text-[#25102b] mb-1">
                        Bairro em Teresina
                      </label>
                      <input
                        name="neighborhood"
                        type="text"
                        placeholder="Ex: Dirceu, Promorar, Saci..."
                        value={suggestionForm.neighborhood}
                        onChange={(e) => setSuggestionForm({ ...suggestionForm, neighborhood: e.target.value })}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-[#eadfeb] focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#25102b] mb-1">
                        Zona da Cidade
                      </label>
                      <select
                        name="zone"
                        value={suggestionForm.zone}
                        onChange={(e) => setSuggestionForm({ ...suggestionForm, zone: e.target.value })}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-[#eadfeb] focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b] transition font-medium"
                      >
                        <option value="Zona Sudeste">Zona Sudeste</option>
                        <option value="Zona Sul">Zona Sul</option>
                        <option value="Zona Leste">Zona Leste</option>
                        <option value="Zona Norte">Zona Norte</option>
                        <option value="Centro">Centro</option>
                        <option value="Região Metropolitana">Região Metropolitana</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-bold text-[#25102b] mb-1">
                        Curso em Andamento
                      </label>
                      <input
                        name="course"
                        type="text"
                        placeholder="Ex: Auxiliar Administrativo / Atendimento"
                        value={suggestionForm.course}
                        onChange={(e) => setSuggestionForm({ ...suggestionForm, course: e.target.value })}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-[#eadfeb] focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#25102b] mb-1">
                        Assunto / Categoria
                      </label>
                      <select
                        name="category"
                        value={suggestionForm.category}
                        onChange={(e) => setSuggestionForm({ ...suggestionForm, category: e.target.value })}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-[#eadfeb] focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b] transition font-medium"
                      >
                        <option value="Pedagógico & Aulas">Pedagógico & Aulas</option>
                        <option value="Infraestrutura dos Polos">Infraestrutura dos Polos</option>
                        <option value="Horários & Frequência">Horários & Frequência</option>
                        <option value="Elogio / Reconhecimento">Elogio / Reconhecimento</option>
                        <option value="Dúvidas Gerais">Dúvidas Gerais</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-sm font-bold text-[#25102b]">
                        Sua Sugestão ou Dúvida *
                      </label>
                      <span className="text-xs text-[#716575]">
                        {suggestionForm.message.length}/600 caracteres
                      </span>
                    </div>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      maxLength={600}
                      placeholder="Escreva sua mensagem com clareza para a coordenação..."
                      value={suggestionForm.message}
                      onChange={(e) => setSuggestionForm({ ...suggestionForm, message: e.target.value })}
                      className="w-full p-4 text-sm rounded-xl border border-[#eadfeb] focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b] transition"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 text-sm sm:text-base font-black text-[#28102d] bg-[#ffc928] hover:bg-[#e6b420] active:bg-[#d4a317] rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <Lightbulb className="w-5 h-5" />
                    <span>Registrar Minha Sugestão</span>
                  </button>
                </form>
              ) : (
                <div className="p-6 rounded-2xl bg-[#f7f3f8] border border-[#eadfeb] text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#4b0d59] text-[#ffc928] flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h5 className="font-black text-[#25102b] text-xl">
                      Sugestão Registrada com Sucesso!
                    </h5>
                    <p className="text-sm text-[#534657] max-w-md mx-auto mt-1.5 leading-relaxed">
                      Sua mensagem foi protocolada na categoria <strong>{suggestionForm.category}</strong>. Se preferir, você pode encaminhá-la diretamente à coordenação pelo WhatsApp.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleSendSuggestionToWhatsApp}
                      className="w-full sm:w-auto px-6 py-3.5 text-sm font-black text-[#28102d] bg-[#ffc928] hover:bg-[#e6b420] rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Encaminhar via WhatsApp</span>
                    </button>

                    <button
                      onClick={() => {
                        setSuggestionSubmitted(false);
                        setSuggestionForm({ studentName: '', birthDate: '', responsibleName: '', neighborhood: '', zone: 'Zona Sudeste', course: '', category: 'Pedagógico & Aulas', message: '' });
                      }}
                      className="w-full sm:w-auto px-5 py-3.5 text-sm font-bold text-[#4b0d59] bg-white border border-[#eadfeb] rounded-xl hover:bg-[#f1e2f4] transition cursor-pointer active:scale-98"
                    >
                      Enviar Outra Sugestão
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#f7f3f8] border-t border-[#eadfeb] flex items-center justify-between text-sm text-[#534657]">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#812392]" />
            <span className="font-medium">Polos Dirceu e Centro · Teresina - PI</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-[#eadfeb] bg-white hover:bg-[#eadfeb] font-bold text-[#25102b] transition cursor-pointer text-sm"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
