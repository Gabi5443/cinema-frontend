
export interface Movie {
  id: string;
  titulo: string;
  subtitulo: string;
  classificacao: string;
  duracao: string;
  categorias: string;
  sinopse: string;
  imagem: any;
}

export const moviesData: Movie[] = [
  {
    id: '1',
    titulo: 'HOMEM-ARANHA',
    subtitulo: 'UM NOVO DIA',
    classificacao: '12',
    duracao: '2h24',
    categorias: 'Ação, Aventura, Fantasia',
    sinopse:
      'Em uma Nova York onde ninguém mais sabe sua verdadeira identidade, Peter Parker enfrenta novos vilões enquanto descobre o real significado de recomeçar.',
    imagem: require('../assets/images/homem-aranha.png'),
  },

  {
    id: '2',
    titulo: 'BATMAN',
    subtitulo: 'O CAVALEIRO DAS TREVAS',
    classificacao: '14',
    duracao: '2h32',
    categorias: 'Ação, Crime, Drama',
    sinopse:
      'Batman enfrenta uma ameaça que coloca Gotham em caos enquanto precisa lidar com um inimigo que desafia seus limites e sua determinação.',
    imagem: require('../assets/images/batman.png'),
  },

  {
    id: '3',
    titulo: 'SUPERMAN',
    subtitulo: 'O HOMEM DE AÇO',
    classificacao: '12',
    duracao: '2h23',
    categorias: 'Ação, Aventura, Ficção Científica',
    sinopse:
      'Um jovem com poderes extraordinários precisa descobrir seu lugar no mundo enquanto decide como usar suas habilidades para proteger as pessoas.',
    imagem: require('../assets/images/superman.png'),
  },

  {
    id: '4',
    titulo: 'JURASSIC WORLD',
    subtitulo: 'REINO AMEAÇADO',
    classificacao: '12',
    duracao: '2h08',
    categorias: 'Aventura, Ficção Científica',
    sinopse:
      'Uma nova ameaça coloca humanos e dinossauros em perigo quando uma ilha isolada se torna palco de uma corrida pela sobrevivência.',
    imagem: require('../assets/images/jurassic-world.png'),
  },

  {
    id: '5',
    titulo: 'AVATAR',
    subtitulo: 'O CAMINHO DA ÁGUA',
    classificacao: '12',
    duracao: '3h12',
    categorias: 'Ação, Aventura, Fantasia',
    sinopse:
      'Uma família busca refúgio em uma nova região de Pandora e precisa aprender a viver em harmonia com um ambiente completamente diferente.',
    imagem: require('../assets/images/avatar.png'),
  },

  {
    id: '6',
    titulo: 'INTERESTELAR',
    subtitulo: 'UMA VIAGEM PELO UNIVERSO',
    classificacao: '10',
    duracao: '2h49',
    categorias: 'Ficção Científica, Drama',
    sinopse:
      'Quando a sobrevivência da humanidade está ameaçada, uma equipe parte em uma missão espacial em busca de um novo lugar para viver.',
    imagem: require('../assets/images/interestelar.png'),
  },

  {
    id: '7',
    titulo: 'CORINGA',
    subtitulo: 'UM SORRISO PERIGOSO',
    classificacao: '16',
    duracao: '2h02',
    categorias: 'Crime, Drama, Suspense',
    sinopse:
      'Um homem solitário enfrenta uma série de acontecimentos que transforma completamente sua relação com a sociedade e consigo mesmo.',
    imagem: require('../assets/images/coringa.png'),
  },

  {
    id: '8',
    titulo: 'TOY STORY',
    subtitulo: 'UMA NOVA AVENTURA',
    classificacao: 'Livre',
    duracao: '1h40',
    categorias: 'Animação, Aventura, Comédia',
    sinopse:
      'Um grupo de brinquedos embarca em uma nova aventura enquanto tenta proteger seu dono e permanecer unido diante das mudanças.',
    imagem: require('../assets/images/toy-story.png'),
  },

  {
    id: '9',
    titulo: 'MOANA',
    subtitulo: 'UM MAR DE AVENTURAS',
    classificacao: 'Livre',
    duracao: '1h47',
    categorias: 'Animação, Aventura, Fantasia',
    sinopse:
      'Uma jovem embarca em uma viagem pelo oceano para descobrir a origem de seu povo e ajudar sua ilha a superar uma antiga ameaça.',
    imagem: require('../assets/images/moana.png'),
  },

  {
    id: '10',
    titulo: 'FROZEN',
    subtitulo: 'UMA AVENTURA CONGELANTE',
    classificacao: 'Livre',
    duracao: '1h42',
    categorias: 'Animação, Fantasia, Musical',
    sinopse:
      'Duas irmãs precisam enfrentar seus medos e reconstruir sua relação quando poderes mágicos transformam o reino em um lugar congelado.',
    imagem: require('../assets/images/frozen.png'),
  },

  {
    id: '11',
    titulo: 'OS VINGADORES',
    subtitulo: 'HERÓIS UNIDOS',
    classificacao: '12',
    duracao: '2h23',
    categorias: 'Ação, Aventura, Ficção Científica',
    sinopse:
      'Um grupo de heróis precisa deixar suas diferenças de lado para enfrentar uma ameaça capaz de colocar o mundo inteiro em perigo.',
    imagem: require('../assets/images/vingadores.png'),
  },

  {
    id: '12',
    titulo: 'GUARDIÕES DA GALÁXIA',
    subtitulo: 'UMA EQUIPE IMPROVÁVEL',
    classificacao: '12',
    duracao: '2h01',
    categorias: 'Ação, Aventura, Comédia',
    sinopse:
      'Um grupo de personagens completamente diferentes precisa trabalhar junto para impedir que uma poderosa ameaça destrua a galáxia.',
    imagem: require('../assets/images/guardioes-galaxia.png'),
  },

  {
    id: '13',
    titulo: 'PANERA NEGRA',
    subtitulo: 'O REINO DE WAKANDA',
    classificacao: '12',
    duracao: '2h14',
    categorias: 'Ação, Aventura, Ficção Científica',
    sinopse:
      'Após assumir uma importante posição em seu reino, um jovem líder precisa proteger seu povo enquanto enfrenta desafios internos e externos.',
    imagem: require('../assets/images/pantera-negra.png'),
  },

  {
    id: '14',
    titulo: 'DE VOLTA PARA O FUTURO',
    subtitulo: 'UMA VIAGEM NO TEMPO',
    classificacao: 'Livre',
    duracao: '1h56',
    categorias: 'Aventura, Comédia, Ficção Científica',
    sinopse:
      'Um adolescente viaja acidentalmente para o passado e precisa encontrar uma maneira de voltar para sua época sem alterar o futuro.',
    imagem: require('../assets/images/de-volta-para-o-futuro.png'),
  },

  {
    id: '15',
    titulo: 'HARRY POTTER',
    subtitulo: 'A PEDRA FILOSOFAL',
    classificacao: 'Livre',
    duracao: '2h32',
    categorias: 'Aventura, Fantasia',
    sinopse:
      'Um jovem descobre que possui habilidades mágicas e começa seus estudos em uma escola cheia de mistérios, amizades e aventuras.',
    imagem: require('../assets/images/harry-potter.png'),
  },

  {
    id: '16',
    titulo: 'O SENHOR DOS ANÉIS',
    subtitulo: 'A SOCIEDADE DO ANEL',
    classificacao: '12',
    duracao: '2h58',
    categorias: 'Aventura, Fantasia, Drama',
    sinopse:
      'Um jovem recebe a missão de proteger um objeto poderoso e parte em uma jornada ao lado de um grupo de companheiros.',
    imagem: require('../assets/images/senhor-dos-aneis.png'),
  },

  {
    id: '17',
    titulo: 'PIRATAS DO CARIBE',
    subtitulo: 'A MALDIÇÃO DO PÉROLA NEGRA',
    classificacao: '12',
    duracao: '2h23',
    categorias: 'Ação, Aventura, Fantasia',
    sinopse:
      'Um pirata excêntrico se envolve em uma aventura perigosa para recuperar seu navio e enfrentar uma tripulação marcada por uma antiga maldição.',
    imagem: require('../assets/images/piratas-caribe.png'),
  },

  {
    id: '18',
    titulo: 'JUMANJI',
    subtitulo: 'BEM-VINDO À SELVA',
    classificacao: '12',
    duracao: '1h59',
    categorias: 'Aventura, Comédia, Fantasia',
    sinopse:
      'Quatro adolescentes ficam presos dentro de um jogo e precisam completar uma missão para conseguir voltar para casa.',
    imagem: require('../assets/images/jumanji.png'),
  },

  {
    id: '19',
    titulo: 'COMO TREINAR O SEU DRAGÃO',
    subtitulo: 'UMA AMIZADE INESPERADA',
    classificacao: 'Livre',
    duracao: '1h38',
    categorias: 'Animação, Aventura, Fantasia',
    sinopse:
      'Um jovem viking faz amizade com um dragão e começa a questionar tudo o que aprendeu sobre essas criaturas.',
    imagem: require('../assets/images/como-treinar-seu-dragao.png'),
  },

  {
    id: '20',
    titulo: 'O REI LEÃO',
    subtitulo: 'O CICLO DA VIDA',
    classificacao: 'Livre',
    duracao: '1h58',
    categorias: 'Animação, Aventura, Drama',
    sinopse:
      'Um jovem leão precisa superar grandes desafios e descobrir seu verdadeiro papel para assumir seu lugar no ciclo da vida.',
    imagem: require('../assets/images/rei-leao.png'),
  },
];

export const getMovieById = (
  id: string | number
): Movie | undefined => {
  return moviesData.find(
    (movie) => String(movie.id) === String(id)
  );
};
```
