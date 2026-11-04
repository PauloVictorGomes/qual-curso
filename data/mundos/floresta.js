// Mundo: Expedição Rio Encantado (selva/floresta)
// Segue as regras de escrita do topo de data/mundos/medieval.js.
// Pares de perfis que cada cena deixa de fora, na ordem das cenas:
// AC, RI, SE, IA, RC, AE, IS, RE, SC, IE, RA, EC, IC, RS, AS (os 15 pares, uma vez cada).

window.MUNDOS = window.MUNDOS || [];
window.MUNDOS.push({
  id: "floresta",
  nome: "Expedição Rio Encantado",
  noMundo: "na Expedição Rio Encantado",
  genero: "Selva",
  emoji: "🌴",
  resumo: "Trinta dias numa floresta tropical para descobrir por que um rio inteiro está secando.",
  intro: "O Rio Encantado corta uma das florestas mais preservadas do país, e há dois anos ele vem secando sem explicação. Uma expedição de 30 dias vai se juntar à comunidade ribeirinha do Remanso para descobrir o motivo. Você está no barco, rio acima, e a floresta parece não ter fim.",
  acampamento: "Última noite na floresta. Na varanda da base, com o barulho do rio voltando, o grupo combina uma conversa diferente: cada um conta quem é fora desta expedição, na vida real.",
  tema: { a: "#15803d", b: "#0f766e" },

  personagens: [
    { nome: "Caio", emoji: "👦🏾", item: "🗺️", descricao: "Sabe ler qualquer mapa e nunca se perde numa trilha." },
    { nome: "Bia", emoji: "👩🏻", item: "📷", descricao: "Não sai de casa sem a câmera, nem para ir à padaria." },
    { nome: "Clara", emoji: "👧🏿", item: "🌺", descricao: "Cresceu cuidando do jardim da avó e conhece cada planta pelo nome." },
    { nome: "Tomé", emoji: "👨🏽", item: "🛶", descricao: "Nasceu na beira de um rio e rema desde criança." }
  ],

  titulos: {
    R: { nome: "Passo da Trilha", frase: "resolve as coisas com as próprias mãos" },
    I: { nome: "Olho da Copa", frase: "quer entender o porquê de tudo" },
    A: { nome: "Canto da Mata", frase: "cria o que ninguém tinha imaginado" },
    S: { nome: "Abrigo do Rio", frase: "cuida de quem está por perto" },
    E: { nome: "Voz da Expedição", frase: "toma a frente e convence as pessoas" },
    C: { nome: "Bússola do Grupo", frase: "coloca ordem onde tem bagunça" }
  },

  cenas: [
    {
      titulo: "Motor no meio do rio",
      texto: "No segundo dia de viagem, o motor do barco morre no meio do rio. A correnteza começa a empurrar todo mundo para perto de um trecho cheio de pedras.",
      opcoes: [
        { perfil: "R", texto: "Abrir o motor e tentar fazer ele pegar de novo.", reacao: "Era a mangueira de combustível solta. O motor ronca, e o barqueiro dá um tapinha no seu ombro." },
        { perfil: "I", texto: "Observar a correnteza e o mapa para achar um ponto seguro para encostar.", reacao: "Você acha uma prainha protegida. O barco encosta sem um arranhão." },
        { perfil: "S", texto: "Acalmar a pesquisadora que está apavorada com a correnteza.", reacao: "Ela respira fundo e até ajuda a remar. Depois agradece baixinho." },
        { perfil: "E", texto: "Assumir o comando e dividir quem rema e quem segura o leme.", reacao: "Todo mundo obedece sem discutir, e o barco sai do trecho de pedras." }
      ]
    },
    {
      titulo: "A base flutuante",
      texto: "A expedição chega à base, uma casa flutuante perto do Remanso. Está tudo bagunçado, e a comunidade ribeirinha observa de longe, sem saber se pode confiar nos recém-chegados.",
      opcoes: [
        { perfil: "A", texto: "Desenhar mapas ilustrados da região para a parede da base.", reacao: "Os moradores do Remanso param para ver os mapas e corrigem o nome de dois igarapés." },
        { perfil: "S", texto: "Ir até o Remanso conhecer as famílias e ouvir as histórias do rio.", reacao: "Dona Lourdes conta que o rio começou a secar depois que algo mudou rio acima." },
        { perfil: "E", texto: "Propor ao líder do Remanso uma parceria: a comunidade guia, a expedição ajuda.", reacao: "Seu Ademar aceita, com uma condição: tudo o que for descoberto será contado primeiro ao Remanso." },
        { perfil: "C", texto: "Organizar o estoque de equipamentos e o rodízio de tarefas da base.", reacao: "Em uma tarde, cada coisa tem seu lugar. Ninguém mais perde lanterna." }
      ]
    },
    {
      titulo: "O rio que encolhe",
      texto: "Os moradores mostram marcas nas árvores: há dois anos, a água chegava muito mais alto. Agora é preciso descobrir quanto o rio está baixando e onde.",
      opcoes: [
        { perfil: "R", texto: "Instalar as réguas de medição em vários pontos do rio.", reacao: "Água até a cintura o dia todo, mas as réguas ficam firmes, prontas para medir." },
        { perfil: "I", texto: "Comparar as medidas de hoje com dados de anos atrás.", reacao: "Você percebe que a queda começa num ponto exato, rio acima. Agora a busca tem direção." },
        { perfil: "A", texto: "Fotografar as margens e montar um diário visual da seca.", reacao: "As fotos lado a lado mostram a seca melhor do que qualquer tabela." },
        { perfil: "C", texto: "Montar uma planilha com o nível do rio, dia a dia e ponto a ponto.", reacao: "Sua planilha vira a base de todos os relatórios da expedição." }
      ]
    },
    {
      titulo: "Tempestade de verão",
      texto: "Uma tempestade forte chega de repente. Um raio derruba uma árvore em cima do depósito da base, e a chuva começa a entrar onde estão os equipamentos.",
      opcoes: [
        { perfil: "R", texto: "Tirar os galhos e remendar o telhado do depósito.", reacao: "Encharcado, mas com o telhado de pé. Os equipamentos ficam secos." },
        { perfil: "S", texto: "Cuidar de quem se machucou de leve durante a correria.", reacao: "Um curativo aqui, um chá quente ali. Ninguém fica sem atenção." },
        { perfil: "E", texto: "Coordenar o grupo para tirar os equipamentos do depósito a tempo.", reacao: "Você monta uma corrente humana, e tudo sai antes da água subir." },
        { perfil: "C", texto: "Listar o que foi perdido e o que ainda dá para recuperar.", reacao: "Com a sua lista, a expedição pede só o que realmente faltou." }
      ]
    },
    {
      titulo: "A escola do Remanso",
      texto: "As crianças do Remanso aparecem na base todo dia, curiosas com os equipamentos. A professora da comunidade pergunta se a expedição pode fazer algo com elas.",
      opcoes: [
        { perfil: "I", texto: "Mostrar o microscópio e ensinar a ver os bichinhos da água do rio.", reacao: "Um menino jura que vai ser cientista. Ele volta no outro dia com mais três amigos." },
        { perfil: "A", texto: "Criar com as crianças um livro ilustrado sobre a floresta.", reacao: "O livro fica pronto e vai para a biblioteca da escola, com o nome de cada criança." },
        { perfil: "S", texto: "Ajudar a professora com as crianças menores durante a semana.", reacao: "No fim da semana, as crianças pequenas correm para te abraçar." },
        { perfil: "E", texto: "Convidar a comunidade para uma apresentação da expedição na escola.", reacao: "A escola lota. Pela primeira vez, o Remanso inteiro sabe o que a expedição faz." }
      ]
    },
    {
      titulo: "Trilha perdida",
      texto: "Dois pesquisadores saíram de manhã para uma trilha curta e não voltaram. O sol está baixando, e o rádio deles não responde.",
      opcoes: [
        { perfil: "R", texto: "Entrar na mata com o guia e abrir caminho até o último ponto conhecido.", reacao: "Você encontra os dois perto de um igarapé, cansados, mas bem." },
        { perfil: "I", texto: "Usar o último sinal de GPS e as pegadas para deduzir onde estão.", reacao: "Você calcula que eles desviaram para o leste. A equipe vai direto ao lugar certo." },
        { perfil: "S", texto: "Ficar com os colegas mais preocupados e manter o grupo calmo.", reacao: "Ninguém entra em pânico. Quando os dois voltam, tem sopa quente esperando." },
        { perfil: "C", texto: "Dividir a busca em áreas, com horários e pontos de encontro.", reacao: "A busca fica organizada, e ninguém mais se perde procurando os perdidos." }
      ]
    },
    {
      titulo: "Uma plataforma na copa",
      texto: "Para entender a floresta, a expedição quer montar uma plataforma no alto de uma árvore gigante, a 40 metros do chão.",
      opcoes: [
        { perfil: "R", texto: "Subir com as cordas e ajudar a amarrar a plataforma.", reacao: "Lá de cima, você vê o rio inteiro serpenteando pela floresta." },
        { perfil: "A", texto: "Projetar a plataforma para se misturar à árvore sem machucar.", reacao: "Os pássaros nem se incomodam. Seu projeto entra no relatório como exemplo." },
        { perfil: "E", texto: "Conseguir que uma empresa de equipamentos doe as cordas e os cintos.", reacao: "Duas ligações depois, os equipamentos chegam de barco, sem custo." },
        { perfil: "C", texto: "Checar a lista de segurança antes de qualquer pessoa subir.", reacao: "Você acha um mosquetão com defeito. Ninguém sobe com ele." }
      ]
    },
    {
      titulo: "O filhote caído",
      texto: "Um filhote de macaco cai de uma árvore perto da base e fica parado no chão. A mãe grita lá do alto, e o veterinário mais próximo está a horas de barco.",
      opcoes: [
        { perfil: "I", texto: "Observar o filhote com calma para entender o que aconteceu.", reacao: "Ele só está com uma pata machucada. Você avisa o veterinário pelo rádio, com detalhes." },
        { perfil: "A", texto: "Desenhar e fotografar o caso para uma campanha de proteção dos macacos.", reacao: "A campanha circula nas redes, e uma ONG oferece ajuda para a região." },
        { perfil: "S", texto: "Manter o filhote aquecido e protegido até a ajuda chegar.", reacao: "No dia seguinte, o filhote volta para a árvore, e a mãe o recebe." },
        { perfil: "C", texto: "Registrar tudo no protocolo de resgate de animais da expedição.", reacao: "Com o seu registro, o veterinário sabe exatamente o que fazer quando chega." }
      ]
    },
    {
      titulo: "A barragem esquecida",
      texto: "Rio acima, a expedição encontra a causa: uma barragem velha de uma fazenda abandonada, entupida de galhos, desvia quase metade da água para um brejo.",
      opcoes: [
        { perfil: "R", texto: "Ajudar a equipe a desentupir a barragem com a comunidade.", reacao: "No terceiro dia de mutirão, a água volta a correr pelo leito antigo." },
        { perfil: "I", texto: "Estudar como a barragem mudou o caminho do rio ao longo dos anos.", reacao: "Seu estudo prova que, sem a barragem, o rio se recupera sozinho." },
        { perfil: "A", texto: "Gravar um vídeo mostrando o antes e o depois para chamar atenção.", reacao: "O vídeo chega à TV regional, e o caso ganha apoio de todo lado." },
        { perfil: "E", texto: "Liderar a conversa com os herdeiros da fazenda para remover a barragem.", reacao: "Depois de uma longa reunião, os herdeiros assinam a autorização." }
      ]
    },
    {
      titulo: "Noite na mata",
      texto: "Para chegar a um ponto distante, o grupo precisa dormir uma noite inteira dentro da floresta. Tem barulho de bicho por todo lado, e a escuridão é total.",
      opcoes: [
        { perfil: "R", texto: "Montar as redes, o abrigo e a fogueira antes de escurecer.", reacao: "Quando a noite cai, todo mundo já está seco, protegido e com comida no fogo." },
        { perfil: "A", texto: "Contar histórias na fogueira para a noite passar mais leve.", reacao: "Suas histórias fazem até o guia mais sério dar risada." },
        { perfil: "S", texto: "Ficar perto de quem está com medo do escuro.", reacao: "Uma colega que nunca tinha dormido na mata consegue pegar no sono." },
        { perfil: "C", texto: "Organizar os turnos de vigia e a divisão da comida.", reacao: "Cada um sabe sua hora de vigiar, e a comida dura até o fim da trilha." }
      ]
    },
    {
      titulo: "A febre",
      texto: "Uma das pesquisadoras acorda com febre alta. O posto de saúde mais próximo fica a meio dia de barco, e não se sabe o que causou a doença.",
      opcoes: [
        { perfil: "I", texto: "Anotar os sintomas e descobrir o que ela pode ter pegado.", reacao: "Você liga os pontos e passa ao médico pelo rádio uma suspeita certeira." },
        { perfil: "S", texto: "Cuidar dela e fazer companhia enquanto a ajuda não chega.", reacao: "Ela diz depois que sua companhia fez a espera parecer bem mais curta." },
        { perfil: "E", texto: "Chamar o barco de resgate e organizar a ida ao posto de saúde.", reacao: "Em uma hora o barco está pronto, e ela chega ao posto antes de anoitecer." },
        { perfil: "C", texto: "Conferir o kit de primeiros socorros e registrar remédios e horários.", reacao: "O médico elogia o registro: ajudou a acertar o tratamento." }
      ]
    },
    {
      titulo: "Uma planta desconhecida",
      texto: "Numa trilha, você encontra uma flor que não aparece em nenhum livro da expedição. Pode ser uma espécie nunca descrita pela ciência.",
      opcoes: [
        { perfil: "R", texto: "Coletar uma amostra com cuidado e montar uma estufa improvisada.", reacao: "A muda sobrevive à viagem e chega viva ao laboratório." },
        { perfil: "I", texto: "Comparar com catálogos e anotar cada detalhe da planta.", reacao: "Nada parecido existe nos registros. Pode mesmo ser uma espécie nova." },
        { perfil: "A", texto: "Ilustrar a flor em detalhes, como faziam os naturalistas antigos.", reacao: "Sua ilustração vai para a capa do relatório da expedição." },
        { perfil: "S", texto: "Perguntar aos mais velhos do Remanso o que eles sabem dessa planta.", reacao: "Seu Ademar conhece a flor desde criança e conta para que ela serve. A ciência é que estava atrasada." }
      ]
    },
    {
      titulo: "A festa do rio",
      texto: "O rio voltou a subir, e o Remanso decide fazer uma festa para comemorar e se despedir da expedição.",
      opcoes: [
        { perfil: "R", texto: "Ajudar a montar o palco e as barracas na beira do rio.", reacao: "O palco fica firme, mesmo com a comunidade inteira dançando em cima." },
        { perfil: "A", texto: "Preparar uma apresentação de música ou dança com o pessoal do Remanso.", reacao: "A apresentação vira o momento mais aplaudido da noite." },
        { perfil: "S", texto: "Ajudar as famílias a preparar a comida da festa.", reacao: "Você aprende a fazer um peixe na folha que nunca mais vai esquecer." },
        { perfil: "E", texto: "Apresentar os resultados da expedição para a comunidade.", reacao: "Quando você conta que o rio vai se recuperar, a festa explode em aplausos." }
      ]
    },
    {
      titulo: "O relatório final",
      texto: "A expedição precisa entregar um relatório ao governo para proteger o rio de vez. O prazo é curto, e cada parte precisa de alguém.",
      opcoes: [
        { perfil: "I", texto: "Analisar os dados e escrever as conclusões científicas.", reacao: "Suas conclusões são tão claras que ninguém consegue contestar." },
        { perfil: "A", texto: "Criar um minidocumentário que acompanhe o relatório.", reacao: "O documentário é exibido na escola do Remanso e na capital do estado." },
        { perfil: "E", texto: "Apresentar o relatório às autoridades e pedir a proteção da área.", reacao: "Depois da sua apresentação, a área entra na lista de proteção ambiental." },
        { perfil: "C", texto: "Organizar os dados, as fotos e as referências do relatório.", reacao: "O relatório sai impecável, com cada número no lugar certo." }
      ]
    },
    {
      titulo: "Depois da expedição",
      texto: "O rio está salvo, e a coordenação quer você na próxima expedição. Que lugar você escolhe na equipe?",
      opcoes: [
        { perfil: "R", texto: "A equipe de campo, abrindo trilhas e cuidando dos equipamentos.", reacao: "Já tem um par de botas com o seu nome esperando no barco." },
        { perfil: "I", texto: "O laboratório, estudando a água, as plantas e os bichos.", reacao: "A primeira tarefa: descrever oficialmente a flor que você encontrou." },
        { perfil: "E", texto: "A coordenação, cuidando das parcerias com comunidades e governos.", reacao: "Seu Ademar manda um recado: o Remanso quer você de volta." },
        { perfil: "C", texto: "O banco de dados da floresta, organizando tudo o que foi descoberto.", reacao: "Você recebe a chave de anos de registros que ninguém nunca organizou." }
      ]
    }
  ]
});
