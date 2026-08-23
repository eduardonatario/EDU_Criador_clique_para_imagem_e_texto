import { PresetTemplate } from '../types';

export const PRESET_TEMPLATES: PresetTemplate[] = [
  {
    id: 'corpo-humano',
    name: 'Sistemas do Corpo Humano',
    description: 'Arraste cada sistema para o painel e entenda sua função no organismo.',
    category: 'Biologia & Ciências',
    icon: 'heart-pulse',
    settings: {
      title: 'Sistemas do Corpo Humano',
      subtitle: 'Clique ou arraste os os itens para o painel central para ter a explicação ou a imagem.',
      categoryTitle: 'Anatomia Humana',
      layoutMode: 'inspector',
      theme: 'nordic',
      borderRadius: 16,
      fontScale: 'md',
      showAccentCircle: false,
      useAccentAsBackground: false,
      clickedCardColor: '#f0fdf4',
      enableSound: true,
      enableConfetti: true,
      showResetBtn: true,
      allowClickToReveal: true,
      completionMessage: '',
      customCss: ''
    },
    items: [
      {
        id: 'item-1',
        title: 'Sistema Circulatório',
        subtitle: '',
        badge: '',
        icon: 'heart',
        color: '#ef4444',
        details: 'O sistema circulatório é responsável por transportar oxigênio, nutrientes e hormônios para todas as células do corpo através do sangue. É composto pelo coração, artérias, veias e capilares.\n\n• Coração: Funciona como uma bomba muscular contínua.\n• Sangue: Transporta hemácias, leucócitos e plaquetas.'
      },
      {
        id: 'item-2',
        title: 'Sistema Nervoso',
        subtitle: '',
        badge: '',
        icon: 'brain',
        color: '#8b5cf6',
        details: 'Coordena todas as ações voluntárias e involuntárias do organismo, processando estímulos sensoriais e transmitindo impulsos elétricos super velozes.\n\n• Sistema Nervoso Central (SNC): Cérebro e Medula Espinhal.\n• Sistema Nervoso Periférico (SNP): Nervos que se espalham pelo corpo todo.'
      },
      {
        id: 'item-3',
        title: 'Sistema Respiratório',
        subtitle: '',
        badge: '',
        icon: 'wind',
        color: '#06b6d4',
        details: 'Permite a troca gasosa entre o organismo e o meio ambiente: absorve oxigênio (O₂) vital e elimina o dióxido de carbono (CO₂).\n\n• Diafragma: Músculo principal responsável pelo movimento respiratório de inspiração e expiração.'
      },
      {
        id: 'item-4',
        title: 'Sistema Digestório',
        subtitle: '',
        badge: '',
        icon: 'utensils',
        color: '#f59e0b',
        details: 'Transforma os alimentos ingeridos em nutrientes simples que o corpo consegue absorver para gerar energia e reconstruir tecidos.\n\n• Digestão mecânica: Mastigação.\n• Digestão química: Ação de enzimas e suco gástrico.'
      }
    ]
  },
  {
    id: 'pensamento-computacional',
    name: 'Pilares do Pensamento Computacional',
    description: 'Explore os 4 pilares fundamentais da resolução de problemas com tecnologia.',
    category: 'Tecnologia & Programação',
    icon: 'cpu',
    settings: {
      title: 'Pilares do Pensamento Computacional',
      subtitle: 'Arraste cada pilar para a área de análise para compreender como aplicá-lo.',
      categoryTitle: 'Resolução de Problemas',
      layoutMode: 'inspector',
      theme: 'nordic',
      borderRadius: 16,
      fontScale: 'md',
      showAccentCircle: false,
      enableSound: true,
      enableConfetti: true,
      showResetBtn: true,
      allowClickToReveal: true,
      completionMessage: 'Excelente! Você domina os 4 pilares do Pensamento Computacional! 🚀',
      customCss: ''
    },
    items: [
      {
        id: 'pc-1',
        title: 'Decomposição',
        subtitle: 'Dividir para conquistar',
        badge: 'Etapa 1',
        icon: 'scissors',
        color: '#2563eb',
        details: 'Dividir um problema complexo em partes menores, mais simples e gerenciáveis. Ao focar em um pedaço por vez, a solução geral torna-se muito mais fácil de alcançar.'
      },
      {
        id: 'pc-2',
        title: 'Reconhecimento de Padrões',
        subtitle: 'Identificar semelhanças',
        badge: 'Etapa 2',
        icon: 'search',
        color: '#7c3aed',
        details: 'Buscar similaridades, tendências e padrões dentro dos problemas ou entre problemas diferentes. Permite reaproveitar soluções anteriores e prever comportamentos.'
      },
      {
        id: 'pc-3',
        title: 'Abstração',
        subtitle: 'Filtrar o que é essencial',
        badge: 'Etapa 3',
        icon: 'filter',
        color: '#059669',
        details: 'Focar apenas nas informações realmente relevantes e ignorar detalhes desnecessários. Cria modelos simplificados da realidade para facilitar o raciocínio.'
      },
      {
        id: 'pc-4',
        title: 'Algoritmos',
        subtitle: 'Passo a passo organizado',
        badge: 'Etapa 4',
        icon: 'list-ordered',
        color: '#d97706',
        details: 'Criar uma sequência finita, clara e ordenada de instruções ou regras que devem ser seguidas para resolver o problema de forma reproduzível.'
      }
    ]
  },
  {
    id: 'camadas-terra',
    name: 'Camadas do Planeta Terra',
    description: 'Conheça a estrutura interna da Terra, da Crosta ao Núcleo.',
    category: 'Geografia',
    icon: 'globe',
    settings: {
      title: 'Estrutura Interna da Terra',
      subtitle: 'Arraste cada camada para o detector geológico para ler dados sobre temperatura e composição.',
      categoryTitle: 'Geologia',
      layoutMode: 'inspector',
      theme: 'nordic',
      borderRadius: 16,
      fontScale: 'md',
      showAccentCircle: false,
      useAccentAsBackground: false,
      clickedCardColor: '#f0fdf4',
      enableSound: true,
      enableConfetti: true,
      showResetBtn: true,
      allowClickToReveal: true,
      completionMessage: 'Impressionante! Você explorou o interior da Terra até o núcleo! 🌋',
      customCss: ''
    },
    items: [
      {
        id: 'geo-1',
        title: 'Crosta Terrestre',
        subtitle: 'Superfície e Placas Tectônicas',
        badge: '0 a 70 km',
        icon: 'mountain',
        color: '#16a34a',
        details: 'A camada mais fina e sólida externa onde vivemos. Dividida em Crosta Continental (mais espessa) e Crosta Oceânica (mais densa e fina).\n\n• Composição principal: Silício e Alumínio.'
      },
      {
        id: 'geo-2',
        title: 'Manto Terrestre',
        subtitle: 'Rocha semifundida em movimento',
        badge: 'Até 2.900 km',
        icon: 'flame',
        color: '#ea580c',
        details: 'A camada mais extensa da Terra. Formada por rochas pastosas (magma) em constante movimento de convenção, o que empurra as placas tectônicas na crosta.\n\n• Temperatura: 1.000°C a 3.000°C.'
      },
      {
        id: 'geo-3',
        title: 'Núcleo Externo',
        subtitle: 'Metal líquido em alta rotação',
        badge: '2.900 a 5.150 km',
        icon: 'zap',
        color: '#dc2626',
        details: 'Camada líquida composta predominantemente de Ferro e Níquel derretidos. As correntes de metal líquido geram o Campo Magnético protetor do planeta Terra.\n\n• Temperatura: ~4.500°C.'
      },
      {
        id: 'geo-4',
        title: 'Núcleo Interno',
        subtitle: 'Esfera metálica sólida',
        badge: 'Até 6.371 km',
        icon: 'sparkles',
        color: '#ca8a04',
        details: 'Apesar de atingir temperaturas próximas às da superfície do Sol (~5.400°C), a pressão extrema faz com que o Ferro e Níquel permaneçam em estado SÓLIDO no centro do planeta.'
      }
    ]
  }
];
