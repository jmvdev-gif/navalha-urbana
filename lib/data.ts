/**
 * Conteúdo da Navalha Urbana — barbearia FICTÍCIA (projeto conceito JMVTECH).
 * Endereço, telefone e perfil de Instagram não são reais.
 * Fotos: Unsplash (Unsplash License, uso livre).
 */

const unsplash = (id: string, width: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

export const BUSINESS = {
  name: "Navalha Urbana",
  street: "Rua das Tesouras, 214",
  district: "Vila Madalena",
  city: "São Paulo – SP",
  /** Número fictício usado no link do WhatsApp (formato internacional, só dígitos). */
  whatsappNumber: "5511900000000",
  whatsappDisplay: "(11) 90000-0000",
  instagram: "@navalhaurbana.sp",
  payment: "Pix, cartão ou dinheiro",
};

/** Minutos desde 00:00. `null` = fechado. Índice = dia da semana (0 = domingo). */
export const OPENING_HOURS: Record<number, { open: number; close: number } | null> = {
  0: null,
  1: null,
  2: { open: 9 * 60, close: 20 * 60 },
  3: { open: 9 * 60, close: 20 * 60 },
  4: { open: 9 * 60, close: 20 * 60 },
  5: { open: 9 * 60, close: 20 * 60 },
  6: { open: 8 * 60, close: 18 * 60 },
};

export const OPENING_SUMMARY = [
  { days: "Terça a sexta", hours: "9h às 20h", weekdays: [2, 3, 4, 5] },
  { days: "Sábado", hours: "8h às 18h", weekdays: [6] },
  { days: "Domingo e segunda", hours: "Fechado", weekdays: [0, 1] },
];

export type ServiceCategory = "cabelo" | "barba" | "combo" | "extra";

export const CATEGORIES: { id: ServiceCategory; label: string }[] = [
  { id: "cabelo", label: "Cabelo" },
  { id: "barba", label: "Barba" },
  { id: "combo", label: "Combos" },
  { id: "extra", label: "Extras" },
];

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  durationMin: number;
  price: number;
  highlight?: string;
}

export const SERVICES: Service[] = [
  {
    id: "corte",
    name: "Corte masculino",
    category: "cabelo",
    description: "Máquina e tesoura, lavagem e finalização com pomada.",
    durationMin: 40,
    price: 55,
  },
  {
    id: "degrade",
    name: "Degradê (fade)",
    category: "cabelo",
    description: "Low, mid ou high fade com transição limpa e acabamento na navalha.",
    durationMin: 45,
    price: 60,
  },
  {
    id: "tesoura",
    name: "Corte na tesoura",
    category: "cabelo",
    description: "Para quem usa o cabelo mais comprido em cima. Todo feito na tesoura.",
    durationMin: 50,
    price: 65,
  },
  {
    id: "infantil",
    name: "Corte infantil",
    category: "cabelo",
    description: "Até 12 anos, com calma e sem pressa.",
    durationMin: 30,
    price: 45,
  },
  {
    id: "barba",
    name: "Barba completa",
    category: "barba",
    description: "Toalha quente, navalha e hidratação com óleo.",
    durationMin: 30,
    price: 45,
  },
  {
    id: "alinhamento",
    name: "Alinhamento de barba",
    category: "barba",
    description: "Contorno na navalha para manter o desenho em dia.",
    durationMin: 15,
    price: 25,
  },
  {
    id: "corte-barba",
    name: "Corte + barba",
    category: "combo",
    description: "O combo da casa: corte, barba completa e toalha quente.",
    durationMin: 70,
    price: 90,
    highlight: "Combo da casa",
  },
  {
    id: "completo",
    name: "Corte + barba + sobrancelha",
    category: "combo",
    description: "O pacote inteiro para sair pronto para qualquer ocasião.",
    durationMin: 80,
    price: 105,
  },
  {
    id: "sobrancelha",
    name: "Sobrancelha na navalha",
    category: "extra",
    description: "Limpeza discreta, sem deixar artificial.",
    durationMin: 10,
    price: 20,
  },
  {
    id: "pigmentacao",
    name: "Pigmentação de barba",
    category: "extra",
    description: "Preenche falhas e uniformiza a cor, com resultado natural.",
    durationMin: 30,
    price: 40,
  },
  {
    id: "pezinho",
    name: "Pezinho",
    category: "extra",
    description: "Acabamento rápido entre um corte e outro.",
    durationMin: 15,
    price: 20,
  },
];

export interface Barber {
  id: string;
  name: string;
  firstName: string;
  specialty: string;
  bio: string;
  photo: string;
  /** Dias da semana em que atende (0 = domingo). */
  workDays: number[];
}

export const BARBERS: Barber[] = [
  {
    id: "rafael",
    name: "Rafael Moreira",
    firstName: "Rafael",
    specialty: "Tesoura e cortes clássicos",
    bio: "Fundador da casa. Gosta de corte bem pensado e de conversa boa.",
    photo: unsplash("1553521041-d168abd31de3", 900),
    workDays: [2, 3, 4, 5, 6],
  },
  {
    id: "lucas",
    name: "Lucas Andrade",
    firstName: "Lucas",
    specialty: "Degradê e texturas",
    bio: "Transição limpa, sem marca. O fade é a especialidade dele.",
    photo: unsplash("1598524374912-6b0b0bab43dd", 900),
    workDays: [2, 3, 4, 5, 6],
  },
  {
    id: "diego",
    name: "Diego Santos",
    firstName: "Diego",
    specialty: "Barba e navalha",
    bio: "Toalha quente, navalha afiada e mão firme no contorno.",
    photo: unsplash("1595294572864-ddb46d169dbb", 900),
    workDays: [3, 4, 5, 6],
  },
  {
    id: "mateus",
    name: "Mateus Lima",
    firstName: "Mateus",
    specialty: "Cortes modernos e desenhos",
    bio: "Risquinho, freestyle e cortes que pedem um pouco de ousadia.",
    photo: unsplash("1585581905588-9e91f63bdd47", 900),
    workDays: [2, 4, 5, 6],
  },
];

export interface GalleryItem {
  id: string;
  title: string;
  detail: string;
  photo: string;
}

export const GALLERY: GalleryItem[] = [
  { id: "g1", title: "Textura + mid fade", detail: "Cabelo", photo: unsplash("1618049049816-43a00d5b0c3d", 1200) },
  { id: "g2", title: "Barba desenhada", detail: "Barba", photo: unsplash("1630827020718-3433092696e7", 1000) },
  { id: "g3", title: "Risco na navalha", detail: "Desenho", photo: unsplash("1568339434343-2a640a1a9946", 1000) },
  { id: "g4", title: "Low fade", detail: "Cabelo", photo: unsplash("1640301133543-41fe25ad6450", 1000) },
  { id: "g5", title: "Topo texturizado", detail: "Cabelo", photo: unsplash("1622286342621-4bd786c2447c", 1000) },
  { id: "g6", title: "Toalha quente e navalha", detail: "Barba", photo: unsplash("1733995471058-3d6ff2013de3", 1000) },
  { id: "g7", title: "Contorno de barba", detail: "Barba", photo: unsplash("1701891123509-e983d6c45259", 1000) },
  { id: "g8", title: "Primeiro corte do mês", detail: "Infantil", photo: unsplash("1704072650662-76df3af134a7", 1000) },
];

export const PHOTOS = {
  hero: unsplash("1582771498000-8ad44e6c84db", 2400),
  interior: unsplash("1585747860715-2ba37e788b70", 1600),
  chair: unsplash("1592647420148-bfcc177e2117", 1600),
  tools: unsplash("1621605815971-fbc98d665033", 1200),
};

export const FAQ = [
  {
    q: "Preciso pagar alguma coisa pelo site?",
    a: `Não. Você só escolhe o horário. O pagamento é feito na barbearia, depois do serviço, com ${BUSINESS.payment}.`,
  },
  {
    q: "Como sei que meu horário está confirmado?",
    a: "Ao final do agendamento, o site abre o WhatsApp com a mensagem pronta. Você envia e a barbearia responde confirmando.",
  },
  {
    q: "E se eu precisar desmarcar ou atrasar?",
    a: "É só responder a mesma conversa no WhatsApp. Pedimos aviso com pelo menos 2 horas de antecedência para liberar a cadeira para outra pessoa.",
  },
  {
    q: "Atendem sem horário marcado?",
    a: "Se tiver cadeira livre, sim. Mas com horário marcado você não espera.",
  },
];
