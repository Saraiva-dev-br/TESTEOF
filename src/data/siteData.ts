import { Opportunity, Hire, VideoStory, StateItem, VocationalQuestion, Holiday, LectureSession, StudentNotice, TeamMember } from '../types';

export const SITE_INFO = {
  name: 'Oficina do Aprendiz',
  tagline: 'Conectando jovens ao mercado de trabalho.',
  subtagline: 'Ajudamos jovens a se conectarem com oportunidades reais por meio de encaminhamento e intermediação profissional qualificada.',
  phone: '(86) 99822-0894',
  whatsappRaw: '5586998220894',
  whatsappUrlDirceu: 'https://wa.me/5586998220894?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20o%20cadastro%20de%20curr%C3%ADculo%20na%20Unidade%20Dirceu.',
  whatsappUrlCentro: 'https://wa.me/5586998220894?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20o%20cadastro%20de%20curr%C3%ADculo%20na%20Unidade%20Centro.',
  whatsappUrlGeneral: 'https://wa.me/5586998220894?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20as%20vagas%20de%20Aprendiz%20em%20Teresina.',
  aboutFull: 'A Oficina do Aprendiz é uma iniciativa privada criada por um empreendedor nordestino que conheceu de perto as dificuldades de ingressar no mercado de trabalho. Em parceria com empresas locais, nacionais e projetos consolidados, chegou a Teresina em agosto de 2025 para aproximar jovens de oportunidades, realizando intermediação e encaminhamento profissional. No Brasil, a iniciativa parceira atua há mais de 15 anos.',
  units: [
    {
      id: 'dirceu',
      name: 'Unidade Dirceu',
      region: 'Zona Sudeste · Teresina - PI',
      address: 'R. Dr. Pedro Teixeira, 2964 - Parque Ideal, Teresina - PI',
      description: 'Polo de atendimento especializado com salas de capacitação prática e encaminhamento direto.',
      hours: 'Segunda a Sexta: 08h às 17h · Sábados: 08h às 12h',
      whatsapp: 'https://wa.me/5586998220894?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20o%20cadastro%20de%20curr%C3%ADculo%20na%20Unidade%20Dirceu.',
      badge: 'Polo Zona Sudeste',
      coordinator: {
        name: 'Regislane da Silva',
        role: 'Coordenadora Pedagógica',
        photoUrl: '/media/regislane-da-silva.jpg'
      }
    },
    {
      id: 'centro',
      name: 'Unidade Centro',
      region: 'Centro · Teresina - PI',
      address: 'Edifício Coronel Otávio Miranda: Rua Rui Barbosa, nº 68, Centro - 6º Andar, Sala 613',
      description: 'Localização privilegiada com fácil acesso via transporte público de todas as zonas da capital.',
      hours: 'Segunda a Sexta: 08h às 17h · Sábados: 08h às 12h',
      whatsapp: 'https://wa.me/5586998220894?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20o%20cadastro%20de%20curr%C3%ADculo%20na%20Unidade%20Centro.',
      badge: 'Polo Central'
    }
  ]
};

export const NATIONAL_METRICS = {
  resumes: '310 mil+',
  resumesLabel: 'Currículos cadastrados no Brasil',
  opportunities: '37 mil',
  opportunitiesLabel: 'Oportunidades geradas no Brasil',
  referrals: '11,1 mil',
  referralsLabel: 'Jovens encaminhados no Brasil',
  hires: '5.550',
  hiresLabel: 'Jovens contratados no Brasil'
};

export const REGIONAL_METRICS = {
  resumes: '1.012',
  resumesLabel: 'Currículos cadastrados em Teresina',
  opportunities: '498',
  opportunitiesLabel: 'Oportunidades geradas em Teresina',
  referrals: '320',
  referralsLabel: 'Jovens encaminhados em Teresina',
  hires: '145',
  hiresLabel: 'Jovens contratados em Teresina'
};

export const VIDEO_STORIES: VideoStory[] = [
  {
    id: 1,
    mediaKey: 'story-b91193e7-2c0e-4a27-9eb5-42e4a62a7576',
    mediaType: 'video/mp4',
    caption: '“Vi o anúncio no Instagram, acreditei, cliquei e fiz minha entrevista.”',
    authorName: 'Jovem Aprendiz Contratada',
    authorAge: 18,
    authorNeighborhood: 'Teresina - PI',
    duration: '0:42'
  },
  {
    id: 2,
    mediaKey: 'story-e33b348d-d82a-447c-8ecd-6d30feefbc52',
    mediaType: 'video/mp4',
    caption: '“Graças ao projeto eu consegui pagar minha faculdade.”',
    authorName: 'Jovem Profissional Encaminhado',
    authorAge: 19,
    authorNeighborhood: 'Zona Sul, Teresina',
    duration: '1:15'
  },
  {
    id: 3,
    mediaKey: 'story-c6c21272-6d5c-44bc-8c76-6078f0889f1a',
    mediaType: 'video/mp4',
    caption: '“Em tão pouco tempo aprendi tanta coisa…”',
    authorName: 'Aprendiz em Capacitação',
    authorAge: 17,
    authorNeighborhood: 'Dirceu, Teresina',
    duration: '1:08'
  },
  {
    id: 4,
    mediaKey: 'story-73e2293b-9e5a-4679-a747-1940523ce733',
    mediaType: 'video/mp4',
    caption: '“Muita coisa mudou em minha vida, antes do projeto eu não pensava muito em meu futuro…”',
    authorName: 'História de Transformação Real',
    authorAge: 18,
    authorNeighborhood: 'Zona Sudeste, Teresina',
    duration: '1:24'
  }
];

export const HIRED_STUDENTS: Hire[] = [
  {
    id: 10,
    name: 'Regislane da Silva',
    age: 28,
    unit: 'Unidade Dirceu',
    photoKey: 'regislane-da-silva.jpg',
    role: 'Coordenadora Pedagógica',
    companySector: 'Coordenação Pedagógica'
  },
  {
    id: 9,
    name: 'Eloá',
    age: 17,
    unit: 'Centro e Dirceu',
    photoKey: 'hire-46097766-6e90-4de5-983d-c0dfaec3928d',
    role: 'Jovem Aprendiz · Marketing',
    companySector: 'Marketing'
  },
  {
    id: 8,
    name: 'Lauryani',
    age: 18,
    unit: 'Unidade Centro',
    photoKey: 'hire-4fa8472d-8d52-4b55-a67c-6281a0956ed5',
    role: 'Jovem Aprendiz · Administrativo',
    companySector: 'Administrativo'
  },
  {
    id: 7,
    name: 'Yasmin',
    age: 18,
    unit: 'Unidade Dirceu',
    photoKey: 'hire-cfc9ddf8-f178-42a3-8f7c-092906aacbc1',
    role: 'Jovem Aprendiz · Serviços Administrativos',
    companySector: 'Serviços Administrativos'
  },
  {
    id: 6,
    name: 'Joyce',
    age: 18,
    unit: 'Unidade Dirceu',
    photoKey: 'hire-d6159eb3-d79c-4304-b971-54f12eccf7e2',
    role: 'Jovem Aprendiz · Atendimento ao Cliente',
    companySector: 'Atendimento ao Cliente'
  },
  {
    id: 5,
    name: 'José Elias',
    age: 17,
    unit: 'Unidade Dirceu',
    photoKey: 'hire-b0302458-1496-40b3-b88d-ac5381a31daf',
    role: 'Jovem Aprendiz · Pedagógico',
    companySector: 'Pedagógico'
  },
  {
    id: 4,
    name: 'Tiago Saraiva',
    age: 20,
    unit: 'Unidade Dirceu',
    photoKey: 'hire-8f4a1371-b1ff-45eb-b791-08068670cd36',
    role: 'Jovem Aprendiz · Pedagógico',
    companySector: 'Pedagógico'
  },
  {
    id: 3,
    name: 'Niana',
    age: 14,
    unit: 'Unidade Dirceu',
    photoKey: 'hire-16f4a0c6-4d70-4047-abbd-11bc86fb2da7',
    role: 'Jovem Aprendiz · Recepção',
    companySector: 'Recepção'
  },
  {
    id: 2,
    name: 'Gabriele',
    age: 16,
    unit: 'Unidade Dirceu',
    photoKey: 'hire-a424829f-b474-412c-84b0-009462a1dee1',
    role: 'Jovem Aprendiz · Recepção',
    companySector: 'Recepção'
  },
  {
    id: 1,
    name: 'Maria Rita',
    age: 18,
    unit: 'Unidade Dirceu',
    photoKey: 'hire-031189a9-9a64-43d9-934c-b00c97b1b2a5',
    role: 'Jovem Aprendiz · Recepção',
    companySector: 'Recepção'
  }
];

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: 2,
    category: 'Aprendiz',
    title: 'Secretária / Recepcionista',
    description: 'Inscreva-se e participe do processo de seleção para encaminhamento profissional.',
    sex: 'Feminino / Todos',
    sector: 'Administrativo & Atendimento',
    ageRange: 'De 14 a 24 anos',
    salary: 'Bolsa Aprendiz compatível com a carga horária + VT',
    workload: 'Duas vezes por semana · meio período (4h/dia)',
    city: 'Teresina',
    requirements: 'Estar cursando ou ter concluído o Ensino Médio; renda familiar preferencial de até 3 salários mínimos; noções básicas de informática e boa comunicação.',
    benefits: ['Vale-transporte', 'Certificado de capacitação profissional', 'Seguro de acidentes pessoais', 'Férias remuneradas coincidentes com escolares'],
    tags: ['Início Imediato', 'Treinamento Prático', 'Dirceu & Centro']
  },
  {
    id: 1,
    category: 'Aprendiz',
    title: 'Auxiliar Administrativo',
    description: 'Inscreva-se e participe da seleção para atuar no suporte corporativo e nas rotinas de escritório.',
    sex: 'Feminino / Todos',
    sector: 'Administrativo',
    ageRange: 'De 14 a 24 anos',
    salary: 'Bolsa Aprendiz compatível com a carga horária + VT',
    workload: 'Duas vezes por semana · meio período (4h/dia)',
    city: 'Teresina',
    requirements: 'Estar cursando áreas afins ou Ensino Médio; ter renda familiar menor que três salários mínimos; ter conhecimento básico de informática e organização.',
    benefits: ['Vale-transporte', 'Assinatura em carteira de trabalho (CTPS)', 'Desenvolvimento de liderança', 'Acompanhamento pedagógico'],
    tags: ['Vaga Aberta', 'Teresina - PI', 'Capacitação Inclusa']
  }
];

export const STATES_PRESENCE: StateItem[] = [
  { uf: 'PI', name: 'Piauí', capital: 'Teresina', polos: 2, details: 'Polos Dirceu e Centro com atendimento ativo para toda a Grande Teresina e região metropolitana.' },
  { uf: 'CE', name: 'Ceará', capital: 'Fortaleza', polos: 2, details: 'Polos estratégicos na capital cearense aproximando jovens de grandes redes de varejo e serviços.' },
  { uf: 'PE', name: 'Pernambuco', capital: 'Recife', polos: 2, details: 'Atuação consolidada no polo metropolitano de Recife com empresas parceiras industriais e comerciais.' },
  { uf: 'BA', name: 'Bahia', capital: 'Salvador', polos: 2, details: 'Presença sólida na capital baiana facilitando a inserção no primeiro emprego.' },
  { uf: 'RJ', name: 'Rio de Janeiro', capital: 'Rio de Janeiro', polos: 3, details: 'Ampla rede com 3 polos articulando vagas corporativas e de atendimento.' },
  { uf: 'SP', name: 'São Paulo', capital: 'São Paulo', polos: 6, details: 'Maior rede da iniciativa parceira com 6 polos e milhares de jovens encaminhados anualmente.' },
  { uf: 'PR', name: 'Paraná', capital: 'Curitiba', polos: 5, details: '5 polos de excelência técnica com alta taxa de efetivação pós-aprendizagem.' },
  { uf: 'SC', name: 'Santa Catarina', capital: 'Florianópolis', polos: 3, details: 'Polos capacitadores focados em serviços, tecnologia e administração.' },
  { uf: 'RS', name: 'Rio Grande do Sul', capital: 'Porto Alegre', polos: 4, details: '4 polos metropolitanos conectando jovens ao mercado formal.' },
  { uf: 'MG', name: 'Minas Gerais', capital: 'Belo Horizonte', polos: 2, details: 'Polos em Minas Gerais com forte histórico de integração jovem-empresa.' }
];

export const VOCATIONAL_QUESTIONS: VocationalQuestion[] = [
  {
    title: 'Em qual ambiente você se imagina trabalhando melhor no dia a dia?',
    description: 'Pense no estilo de rotina que te deixaria mais confortável e motivado(a).',
    options: [
      { label: 'Cercado de pessoas, conversando, orientando e usando bastante a comunicação direta.', scores: { recepcao: 3, telemarketing: 2 } },
      { label: 'Com poucas pessoas ao redor, ambiente silencioso e mais foco em tarefas concentradas.', scores: { administrativo: 2, pedagogico: 2 } },
      { label: 'Consigo me adaptar muito bem a ambos os estilos, dependendo da necessidade da equipe.', scores: { recepcao: 1, administrativo: 2, pedagogico: 1 } }
    ]
  },
  {
    title: 'Que tipo de ferramenta e instrumento de trabalho combina mais com você?',
    description: 'Identifique suas ferramentas preferidas de organização e produtividade.',
    options: [
      { label: 'Computador, planilhas digitais, celular ou tablet.', scores: { administrativo: 3, telemarketing: 2, recepcao: 1 } },
      { label: 'Caderno, anotações detalhadas, livros e materiais didáticos físicos.', scores: { pedagogico: 3, administrativo: 1 } },
      { label: 'Gosto de misturar os dois: organizar arquivos no computador e fazer anotações manuais.', scores: { administrativo: 2, pedagogico: 2, recepcao: 1 } }
    ]
  },
  {
    title: 'Como você avalia sua capacidade de organização e atenção aos detalhes?',
    description: 'Seja sincero(a) sobre seu momento atual de planejamento pessoal.',
    options: [
      { label: 'Sou extremamente organizado(a), gosto de tudo etiquetado, em ordem e no prazo.', scores: { administrativo: 3, recepcao: 3 } },
      { label: 'Tenho uma organização boa, cumpro prazos, mas não sou perfeccionista exagerado(a).', scores: { administrativo: 2, recepcao: 2, pedagogico: 1 } },
      { label: 'Ainda estou desenvolvendo essa habilidade prática e busco aprender técnicas novas.', scores: { telemarketing: 1, pedagogico: 1 } }
    ]
  },
  {
    title: 'Como é sua facilidade de comunicação e poder de persuasão com os outros?',
    description: 'Como você se expressa diante de desconhecidos ou em apresentações?',
    options: [
      { label: 'Comunico-me com grande naturalidade, sou persuasivo(a) e convenço com facilidade.', scores: { telemarketing: 4, recepcao: 2 } },
      { label: 'Comunico-me de forma educada, objetiva e clara sempre que necessário.', scores: { recepcao: 3, administrativo: 1 } },
      { label: 'Prefiro ouvir com atenção, observar o cenário e orientar com calma quem precisa.', scores: { pedagogico: 3, administrativo: 1 } }
    ]
  },
  {
    title: 'Como você lida quando uma pessoa chega chateada ou precisando de ajuda urgente?',
    description: 'A empatia e inteligência emocional fazem toda a diferença profissional.',
    options: [
      { label: 'Tenho paciência de ouro para escutar, acolher e explicar tudo passo a passo.', scores: { pedagogico: 4, recepcao: 1 } },
      { label: 'Atendo com muita calma, transmito segurança e procuro uma solução rápida e eficiente.', scores: { recepcao: 3, administrativo: 2 } },
      { label: 'Sou muito ágil, direto(a) ao ponto e busco resolver o problema imediatamente.', scores: { telemarketing: 2, administrativo: 2 } }
    ]
  }
];

export const VOCATIONAL_RESULTS: Record<string, { title: string; description: string; skills: string[]; idealVacancies: string[] }> = {
  recepcao: {
    title: 'Secretária / Recepcionista e Atendimento',
    description: 'Você demonstra excelente capacidade de comunicação interpessoal, acolhimento e organização para receber pessoas, orientar visitantes e gerenciar a recepção de empresas e clínicas com simpatia e equilíbrio.',
    skills: ['Comunicação empática', 'Organização de agenda', 'Atendimento telefônico e presencial', 'Apresentação profissional'],
    idealVacancies: ['Secretária / Recepcionista', 'Recepcionista de Clínicas e Escritórios', 'Atendente de Recepção Comercial']
  },
  administrativo: {
    title: 'Setor Administrativo & Rotinas Corporativas',
    description: 'Você demonstra foco acurado, alto senso de organização, disciplina e facilidade nata para lidar com fluxos de informações, documentos, ferramentas digitais e rotinas de escritório.',
    skills: ['Organização de arquivos e cadastros', 'Domínio de pacote Office e planilhas', 'Controle de fluxo documental', 'Atenção aos detalhes e prazos'],
    idealVacancies: ['Auxiliar Administrativo Aprendiz', 'Assistente de Recursos Humanos', 'Apoio em Faturamento e Logística']
  },
  pedagogico: {
    title: 'Auxiliar Pedagógico & Mediação Educacional',
    description: 'Você demonstra notável paciência, capacidade de escuta ativa e vocação natural para orientar pessoas no seu desenvolvimento e apoiar ambientes de ensino e capacitação.',
    skills: ['Escuta ativa e didática', 'Mediação de grupos', 'Apoio a instrutores e professores', 'Cuidado e sensibilidade humana'],
    idealVacancies: ['Auxiliar de Coordenação Pedagógica', 'Monitor(a) de Apoio Educacional', 'Assistente de Cursos Profissionalizantes']
  },
  telemarketing: {
    title: 'Operador(a) de Atendimento & Telemarketing',
    description: 'Você demonstra agilidade verbal, energia, poder de persuasão e dinamismo para conectar clientes, conduzir atendimentos via telefone ou WhatsApp e solucionar dúvidas com rapidez.',
    skills: ['Persuasão e negociação', 'Agilidade no WhatsApp e multicanais', 'Resolução imediata de pendências', 'Comunicação assertiva'],
    idealVacancies: ['Operador de Atendimento ao Cliente', 'Consultor(a) de Relacionamento WhatsApp', 'Assistente Comercial Júnior']
  }
};

export const STEPS_DATA = [
  {
    step: 1,
    title: 'Cadastramento do Currículo no Polo Parceiro',
    desc: 'Visite a Unidade Dirceu ou Unidade Centro em Teresina com seus documentos ou inicie pelo WhatsApp oficial para registrar suas informações.',
    tip: 'RG, CPF e comprovante de escolaridade.'
  },
  {
    step: 2,
    title: 'Entrevista Qualitativa Individual',
    desc: 'Conversa orientativa com nossa equipe de psicopedagogos e analistas para mapear suas aptidões, horários disponíveis e perfil comportamental.',
    tip: 'Descobrimos suas forças e áreas de destaque.'
  },
  {
    step: 3,
    title: 'Seleção com os Aprovados',
    desc: 'Encaminhamento prioritário do seu perfil para entrevistas com empresas parceiras que possuem vagas compatíveis com suas aptidões.',
    tip: 'Apresentação formal da oportunidade.'
  },
  {
    step: 4,
    title: 'Exame Admissional',
    desc: 'Realização de exames de saúde ocupacional exigidos por lei para garantir o seu bem-estar antes do início das atividades formais.',
    tip: '100% custeado pela empresa contratante.'
  },
  {
    step: 5,
    title: 'Treinamento Preparatório de Cinco Dias',
    desc: 'Módulo preparatório intensivo de postura profissional, ética corporativa, inteligência emocional e atendimento de alta performance.',
    tip: 'Você entra pronto(a) para brilhar no trabalho.'
  }
];

export const HOLIDAYS_2026: Holiday[] = [
  { date: '01/01/2026', name: 'Confraternização Universal', scope: 'Nacional' },
  { date: '03/04/2026', name: 'Paixão de Cristo', scope: 'Nacional' },
  { date: '21/04/2026', name: 'Tiradentes', scope: 'Nacional' },
  { date: '01/05/2026', name: 'Dia do Trabalho', scope: 'Nacional' },
  { date: '04/06/2026', name: 'Corpus Christi', scope: 'Feriado observado no Piauí' },
  { date: '16/08/2026', name: 'Aniversário de Teresina', scope: 'Municipal' },
  { date: '07/09/2026', name: 'Independência do Brasil', scope: 'Nacional' },
  { date: '12/10/2026', name: 'Nossa Senhora Aparecida', scope: 'Nacional' },
  { date: '19/10/2026', name: 'Dia do Piauí', scope: 'Estadual' },
  { date: '02/11/2026', name: 'Finados', scope: 'Nacional' },
  { date: '15/11/2026', name: 'Proclamação da República', scope: 'Nacional' },
  { date: '20/11/2026', name: 'Dia da Consciência Negra', scope: 'Nacional' },
  { date: '08/12/2026', name: 'Nossa Senhora da Conceição', scope: 'Municipal' },
  { date: '25/12/2026', name: 'Natal', scope: 'Nacional' }
];

export const LECTURE_SESSIONS: LectureSession[] = [
  {
    id: 'segunda-manha',
    label: 'Turma da Manhã · 09h',
    period: 'Manhã',
    eventTime: '09:00',
    eventDate: 'Toda segunda-feira',
    maxSlots: 10,
    registrations: 3
  },
  {
    id: 'segunda-tarde',
    label: 'Turma da Tarde · 14h30',
    period: 'Tarde',
    eventTime: '14:30',
    eventDate: 'Toda segunda-feira',
    maxSlots: 10,
    registrations: 4
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'regislane-silva',
    name: 'Regislane da Silva',
    role: 'Coordenadora Pedagógica',
    unit: 'Unidade Dirceu',
    photoUrl: '/media/regislane-da-silva.jpg',
    bio: 'Responsável pelo acolhimento, desenvolvimento de competências, acompanhamento da frequência e orientação socioemocional dos jovens aprendizes e suas famílias no Polo Dirceu.',
    responsibilities: [
      'Acolhimento humanizado e orientação personalizada a jovens e responsáveis',
      'Acompanhamento pedagógico e avaliação contínua do desenvolvimento',
      'Treinamento prático de postura corporativa, ética profissional e redação comercial',
      'Intermediação direta com gestores de recursos humanos das empresas parceiras'
    ]
  }
];

export const STUDENT_NOTICES: StudentNotice[] = [
  {
    id: 1,
    title: 'Orientações Pedagógicas · Unidade Dirceu',
    body: 'A Coordenadora Pedagógica Regislane da Silva realiza atendimento e acompanhamento individual para aprendizes e responsáveis de segunda a sexta, das 08h às 17h, no Polo Dirceu.',
    date: '18/09/2026',
    priority: 'alta'
  }
];

export const INITIAL_LECTURE_SESSIONS: LectureSession[] = LECTURE_SESSIONS;

export const INITIAL_NOTICES: StudentNotice[] = STUDENT_NOTICES;


