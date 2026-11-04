// Cada curso/profissão tem um código de até 3 letras RIASEC, da mais para a menos relevante.
// Exemplo: "ISR" = Investigativo (principal), Social (secundário), Realista (terciário).
// "areas" são especialidades ou áreas de atuação do curso, cada uma com seu próprio código.
// Elas aparecem no organograma do resultado, ordenadas pela afinidade com a pessoa.
// "revisar: true" marca cursos cujos códigos e áreas ainda precisam de revisão profissional.
// "codigoAnterior" guarda o código antigo de cursos que mudaram para desfazer empates.
// Nenhum curso pode repetir o código de outro: códigos iguais empatam sempre.

window.PROFISSOES = [
  { nome: "Medicina", codigo: "ISR", resumo: "Diagnosticar e tratar pessoas, unindo ciência e cuidado.", areas: [
    { nome: "Medicina de Família", codigo: "SIE", descricao: "Acompanhar pessoas e famílias de perto, no posto de saúde." },
    { nome: "Cirurgia", codigo: "RIS", descricao: "Operar pacientes, com muita precisão manual e decisões rápidas." },
    { nome: "Pediatria", codigo: "SIA", descricao: "Cuidar da saúde de bebês, crianças e adolescentes." },
    { nome: "Psiquiatria", codigo: "ISA", descricao: "Tratar a saúde mental, unindo medicina e escuta." },
    { nome: "Radiologia e Patologia", codigo: "IRC", descricao: "Descobrir doenças por exames de imagem e de laboratório." }
  ] },
  { nome: "Enfermagem", codigo: "SIR", resumo: "Cuidar de pacientes no dia a dia e acompanhar a recuperação.", areas: [
    { nome: "Hospital e UTI", codigo: "SRI", descricao: "Cuidar de pacientes graves na rotina do hospital." },
    { nome: "Saúde da Família", codigo: "SEI", descricao: "Atuar em postos de saúde e visitar comunidades." },
    { nome: "Obstetrícia", codigo: "SIR", descricao: "Acompanhar gestantes, partos e recém-nascidos." },
    { nome: "Gestão em Enfermagem", codigo: "ESC", descricao: "Coordenar equipes e a rotina de setores de saúde." }
  ] },
  { nome: "Psicologia", codigo: "SIA", resumo: "Entender o comportamento humano e ajudar pessoas a lidar com a vida.", areas: [
    { nome: "Psicologia Clínica", codigo: "SIA", descricao: "Atender pessoas em terapia, individual ou em grupo." },
    { nome: "Psicologia Escolar", codigo: "SAE", descricao: "Apoiar alunos, famílias e professores na escola." },
    { nome: "Psicologia Organizacional", codigo: "ESC", descricao: "Cuidar de seleção, clima e bem-estar nas empresas." },
    { nome: "Neuropsicologia", codigo: "ISC", descricao: "Avaliar memória, atenção e outras funções do cérebro." },
    { nome: "Psicologia Social", codigo: "SEA", descricao: "Trabalhar com comunidades e políticas públicas." }
  ] },
  { nome: "Fisioterapia", codigo: "SRI", resumo: "Reabilitar o corpo e devolver movimento e qualidade de vida.", areas: [
    { nome: "Fisioterapia Esportiva", codigo: "RSE", descricao: "Prevenir e tratar lesões de atletas." },
    { nome: "Neurofuncional", codigo: "SIR", descricao: "Reabilitar quem teve AVC ou lesões no sistema nervoso." },
    { nome: "Ortopedia", codigo: "RSI", descricao: "Recuperar o movimento depois de fraturas e cirurgias." },
    { nome: "Respiratória e UTI", codigo: "ISR", descricao: "Ajudar pacientes a respirar melhor, inclusive na UTI." }
  ] },
  { nome: "Nutrição", codigo: "SIC", resumo: "Orientar a alimentação para saúde, desempenho e bem-estar.", areas: [
    { nome: "Nutrição Clínica", codigo: "SIC", descricao: "Montar planos alimentares para pacientes, em consultório ou hospital." },
    { nome: "Nutrição Esportiva", codigo: "SRE", descricao: "Planejar a alimentação de atletas e de quem treina." },
    { nome: "Alimentação Coletiva", codigo: "CES", descricao: "Gerenciar cardápios de restaurantes, escolas e hospitais." },
    { nome: "Saúde Pública", codigo: "SIE", descricao: "Criar ações de alimentação saudável para a população." },
    { nome: "Indústria de Alimentos", codigo: "ICR", descricao: "Desenvolver produtos e controlar a qualidade deles." }
  ] },
  { nome: "Odontologia", codigo: "RSI", resumo: "Cuidar da saúde bucal, com trabalho manual de precisão.", areas: [
    { nome: "Clínica Geral", codigo: "RSI", descricao: "Tratar cáries, fazer limpezas e cuidar da saúde da boca." },
    { nome: "Ortodontia", codigo: "RIA", descricao: "Corrigir a posição dos dentes com aparelhos." },
    { nome: "Odontopediatria", codigo: "SRA", descricao: "Cuidar dos dentes de crianças." },
    { nome: "Cirurgia Bucomaxilofacial", codigo: "RIS", descricao: "Operar a boca, a mandíbula e a face." },
    { nome: "Estética Dental", codigo: "RAS", descricao: "Deixar o sorriso mais bonito com técnicas de estética." }
  ] },
  { nome: "Medicina Veterinária", codigo: "RIS", resumo: "Cuidar da saúde de animais, de pets a produção rural.", areas: [
    { nome: "Clínica de Pets", codigo: "SRI", descricao: "Atender cães, gatos e outros animais de estimação." },
    { nome: "Grandes Animais", codigo: "RIE", descricao: "Cuidar de bois, cavalos e rebanhos no campo." },
    { nome: "Animais Silvestres", codigo: "RIS", descricao: "Trabalhar com fauna silvestre, zoológicos e resgates." },
    { nome: "Inspeção de Alimentos", codigo: "ICR", descricao: "Garantir a segurança de carnes, leite e derivados." },
    { nome: "Cirurgia Veterinária", codigo: "RIC", descricao: "Operar animais, com técnica e precisão." }
  ] },
  { nome: "Farmácia", codigo: "ICS", resumo: "Atuar com medicamentos, análises e orientação em saúde.", areas: [
    { nome: "Farmácia Clínica", codigo: "SIC", descricao: "Orientar pacientes sobre o uso certo dos remédios." },
    { nome: "Indústria Farmacêutica", codigo: "ICR", descricao: "Desenvolver e produzir medicamentos." },
    { nome: "Análises Clínicas", codigo: "IRC", descricao: "Fazer exames de sangue e outros em laboratório." },
    { nome: "Farmácia Hospitalar", codigo: "CIS", descricao: "Cuidar de todos os medicamentos de um hospital." },
    { nome: "Cosméticos", codigo: "IAR", descricao: "Criar e testar produtos de beleza e cuidados pessoais." }
  ] },
  { nome: "Biomedicina", codigo: "ISC", revisar: true, codigoAnterior: "IRC", resumo: "Trabalhar com exames, pesquisa e diagnóstico em laboratório.", areas: [
    { nome: "Análises Clínicas", codigo: "IRC", descricao: "Fazer e interpretar exames de laboratório." },
    { nome: "Diagnóstico por Imagem", codigo: "RIC", descricao: "Operar exames como ressonância e tomografia." },
    { nome: "Biomedicina Estética", codigo: "ARS", descricao: "Fazer procedimentos estéticos, como laser e tratamentos de pele." },
    { nome: "Genética", codigo: "ICR", descricao: "Pesquisar DNA, testes genéticos e doenças hereditárias." },
    { nome: "Reprodução Humana", codigo: "ISR", descricao: "Trabalhar em clínicas de fertilização." }
  ] },
  { nome: "Biologia", codigo: "IRS", resumo: "Estudar a vida, do meio ambiente às células.", areas: [
    { nome: "Ecologia e Conservação", codigo: "RIS", descricao: "Estudar ecossistemas e proteger espécies na natureza." },
    { nome: "Pesquisa em Laboratório", codigo: "IRC", descricao: "Estudar células, genética e microrganismos." },
    { nome: "Professor de Biologia", codigo: "SIA", descricao: "Ensinar biologia em escolas e cursinhos." },
    { nome: "Biotecnologia", codigo: "IRE", descricao: "Criar soluções com seres vivos, como vacinas e enzimas." },
    { nome: "Consultoria Ambiental", codigo: "IEC", descricao: "Fazer estudos e licenças ambientais para empresas." }
  ] },
  { nome: "Engenharia de Software / Ciência da Computação", codigo: "IRC", resumo: "Criar sistemas, aplicativos e soluções com programação.", areas: [
    { nome: "Desenvolvimento Web e Apps", codigo: "IRA", descricao: "Criar sites e aplicativos que as pessoas usam todo dia." },
    { nome: "Inteligência Artificial", codigo: "ICR", descricao: "Criar sistemas que aprendem com dados." },
    { nome: "Desenvolvimento de Jogos", codigo: "AIR", descricao: "Programar jogos, da mecânica aos gráficos." },
    { nome: "Segurança da Informação", codigo: "IRC", descricao: "Proteger sistemas contra ataques e vazamentos." },
    { nome: "Infraestrutura e Nuvem", codigo: "RCI", descricao: "Manter servidores e sistemas funcionando 24 horas." }
  ] },
  { nome: "Sistemas de Informação", codigo: "CIE", resumo: "Unir tecnologia e negócios para organizar e automatizar processos.", areas: [
    { nome: "Análise de Sistemas", codigo: "CIE", descricao: "Entender o que a empresa precisa e transformar em sistema." },
    { nome: "Gestão de Projetos de TI", codigo: "ECS", descricao: "Coordenar equipes e prazos de projetos de tecnologia." },
    { nome: "Banco de Dados", codigo: "CIR", descricao: "Organizar e proteger os dados de uma empresa." },
    { nome: "Gestão de Produto Digital", codigo: "EIA", descricao: "Decidir o que um app deve ter, e por quê." },
    { nome: "Suporte e Redes", codigo: "RCS", descricao: "Resolver problemas técnicos de usuários e redes." }
  ] },
  { nome: "Ciência de Dados / Estatística", codigo: "ICR", resumo: "Transformar dados em respostas e decisões.", areas: [
    { nome: "Análise de Dados (BI)", codigo: "CIE", descricao: "Criar painéis e relatórios que ajudam a decidir." },
    { nome: "Machine Learning", codigo: "IRC", descricao: "Criar modelos que fazem previsões." },
    { nome: "Pesquisa em Saúde", codigo: "ISC", descricao: "Analisar dados de estudos científicos e de saúde." },
    { nome: "Mercado Financeiro", codigo: "ICE", descricao: "Analisar investimentos e riscos com dados." },
    { nome: "Análise de Desempenho Esportivo", codigo: "IRE", descricao: "Usar dados para melhorar times e atletas." }
  ] },
  { nome: "Engenharia Civil", codigo: "RIE", resumo: "Planejar e acompanhar obras como prédios, pontes e estradas.", areas: [
    { nome: "Obras e Construção", codigo: "REC", descricao: "Comandar o canteiro de obras no dia a dia." },
    { nome: "Estruturas", codigo: "IRC", descricao: "Fazer os cálculos para prédios e pontes ficarem de pé." },
    { nome: "Saneamento", codigo: "RIS", descricao: "Levar água e esgoto tratado para as cidades." },
    { nome: "Transportes", codigo: "RIC", descricao: "Planejar estradas, trânsito e transporte público." },
    { nome: "Orçamento e Planejamento", codigo: "CER", descricao: "Calcular custos e prazos de obras." }
  ] },
  { nome: "Engenharia Mecânica / Elétrica", codigo: "RIC", resumo: "Projetar e melhorar máquinas, equipamentos e sistemas de energia.", areas: [
    { nome: "Automotiva", codigo: "RIE", descricao: "Projetar carros, motores e peças." },
    { nome: "Energia Renovável", codigo: "IRE", descricao: "Trabalhar com energia solar, eólica e redes elétricas." },
    { nome: "Automação e Robótica", codigo: "IRC", descricao: "Criar robôs e máquinas que funcionam sozinhas." },
    { nome: "Manutenção Industrial", codigo: "RCI", descricao: "Manter as máquinas de fábricas funcionando." },
    { nome: "Projeto de Produtos", codigo: "RIA", descricao: "Desenhar e testar peças e equipamentos." }
  ] },
  { nome: "Engenharia Ambiental", codigo: "IRE", revisar: true, codigoAnterior: "IRS", resumo: "Resolver problemas ambientais, de água, resíduos e sustentabilidade.", areas: [
    { nome: "Tratamento de Água e Resíduos", codigo: "RIC", descricao: "Projetar e operar estações de tratamento e aterros." },
    { nome: "Licenciamento Ambiental", codigo: "ICE", descricao: "Avaliar o impacto ambiental de obras e empresas." },
    { nome: "Recuperação de Áreas", codigo: "RIS", descricao: "Recuperar rios, matas e solos degradados." },
    { nome: "Sustentabilidade em Empresas", codigo: "EIS", descricao: "Ajudar empresas a poluir e desperdiçar menos." }
  ] },
  { nome: "Agronomia", codigo: "REI", revisar: true, codigoAnterior: "RIE", resumo: "Cuidar da produção agrícola com ciência, tecnologia e gestão.", areas: [
    { nome: "Produção Agrícola", codigo: "REI", descricao: "Planejar e cuidar de lavouras." },
    { nome: "Pesquisa e Melhoramento", codigo: "IRC", descricao: "Desenvolver plantas mais produtivas e resistentes." },
    { nome: "Agricultura de Precisão", codigo: "RIC", descricao: "Usar drones, sensores e dados no campo." },
    { nome: "Consultoria e Vendas", codigo: "ESR", descricao: "Orientar produtores e vender insumos." },
    { nome: "Gestão de Fazendas", codigo: "ECR", descricao: "Administrar a fazenda como um negócio." }
  ] },
  { nome: "Arquitetura e Urbanismo", codigo: "ARI", resumo: "Projetar espaços e cidades unindo criatividade e técnica.", areas: [
    { nome: "Projetos Residenciais", codigo: "ARS", descricao: "Projetar casas e apartamentos." },
    { nome: "Design de Interiores", codigo: "AER", descricao: "Planejar como os ambientes ficam por dentro." },
    { nome: "Urbanismo", codigo: "AIS", descricao: "Planejar bairros e cidades melhores para viver." },
    { nome: "Paisagismo", codigo: "RAI", descricao: "Criar jardins, praças e áreas verdes." },
    { nome: "Patrimônio e Restauro", codigo: "IAR", descricao: "Preservar e restaurar prédios históricos." }
  ] },
  { nome: "Design (gráfico, produto ou UX)", codigo: "AER", resumo: "Criar visuais e produtos que sejam bonitos e funcionem bem.", areas: [
    { nome: "Design Gráfico", codigo: "AEC", descricao: "Criar logos, identidades visuais e peças para marcas." },
    { nome: "UX/UI", codigo: "AIE", descricao: "Desenhar apps e sites fáceis e gostosos de usar." },
    { nome: "Design de Produto", codigo: "ARI", descricao: "Criar objetos, móveis e embalagens." },
    { nome: "Motion Design", codigo: "ARE", descricao: "Animar gráficos, vinhetas e vídeos." },
    { nome: "Ilustração", codigo: "AR", descricao: "Desenhar para livros, jogos e marcas." }
  ] },
  { nome: "Cinema e Audiovisual", codigo: "ARE", revisar: true, codigoAnterior: "AER", resumo: "Produzir filmes, vídeos e conteúdos, da ideia à edição.", areas: [
    { nome: "Direção e Roteiro", codigo: "AES", descricao: "Criar a história e comandar as gravações." },
    { nome: "Edição e Pós-produção", codigo: "ARC", descricao: "Montar as cenas, ajustar cor e criar efeitos." },
    { nome: "Fotografia e Câmera", codigo: "RAI", descricao: "Cuidar da imagem: luz, câmera e enquadramento." },
    { nome: "Produção", codigo: "ECA", descricao: "Organizar orçamento, equipe e cronograma." },
    { nome: "Conteúdo para Internet", codigo: "EAS", descricao: "Criar vídeos para o YouTube e as redes sociais." }
  ] },
  { nome: "Jornalismo", codigo: "AES", resumo: "Investigar, contar histórias e informar o público.", areas: [
    { nome: "Reportagem", codigo: "IAS", descricao: "Investigar fatos e contar as notícias." },
    { nome: "Jornalismo Digital", codigo: "AES", descricao: "Produzir notícias para sites e redes sociais." },
    { nome: "Assessoria de Imprensa", codigo: "ESA", descricao: "Cuidar da comunicação de empresas e pessoas." },
    { nome: "Jornalismo Esportivo", codigo: "AER", descricao: "Cobrir jogos, atletas e campeonatos." },
    { nome: "TV, Rádio e Podcast", codigo: "ASE", descricao: "Apresentar e produzir programas." }
  ] },
  { nome: "Publicidade e Propaganda", codigo: "EAS", resumo: "Criar campanhas que comunicam e vendem ideias e produtos.", areas: [
    { nome: "Criação", codigo: "AES", descricao: "Ter as ideias e criar textos e artes das campanhas." },
    { nome: "Mídias Sociais", codigo: "ESA", descricao: "Planejar e criar conteúdo de marcas para as redes." },
    { nome: "Atendimento e Planejamento", codigo: "ESC", descricao: "Entender o cliente e planejar a campanha." },
    { nome: "Mídia e Performance", codigo: "CEI", descricao: "Decidir onde anunciar e medir os resultados." }
  ] },
  { nome: "Moda", codigo: "AEC", resumo: "Criar, produzir e vender roupas e tendências.", areas: [
    { nome: "Estilismo", codigo: "ARE", descricao: "Criar coleções de roupas e acessórios." },
    { nome: "Modelagem e Produção", codigo: "RAC", descricao: "Transformar desenhos em peças de verdade." },
    { nome: "Styling", codigo: "AES", descricao: "Montar looks para fotos, desfiles e clientes." },
    { nome: "Negócios de Moda", codigo: "ECA", descricao: "Comprar, vender e gerir marcas e lojas." }
  ] },
  { nome: "Gastronomia", codigo: "RAE", resumo: "Criar pratos e comandar cozinhas, ou abrir o próprio negócio.", areas: [
    { nome: "Cozinha de Restaurante", codigo: "RAE", descricao: "Preparar pratos e comandar a cozinha." },
    { nome: "Confeitaria", codigo: "ARC", descricao: "Criar doces, bolos e sobremesas." },
    { nome: "Negócio Próprio", codigo: "ERA", descricao: "Abrir e tocar seu próprio negócio de comida." },
    { nome: "Conteúdo de Culinária", codigo: "AES", descricao: "Criar receitas e vídeos de culinária." },
    { nome: "Desenvolvimento de Alimentos", codigo: "IRC", descricao: "Criar novos produtos para a indústria." }
  ] },
  { nome: "Música", codigo: "ASR", resumo: "Compor, tocar, produzir ou ensinar música.", areas: [
    { nome: "Performance", codigo: "AER", descricao: "Tocar ou cantar em shows e gravações." },
    { nome: "Composição e Arranjo", codigo: "AI", descricao: "Criar músicas e arranjos." },
    { nome: "Produção Musical", codigo: "ARC", descricao: "Gravar, mixar e produzir faixas." },
    { nome: "Ensino de Música", codigo: "SAE", descricao: "Dar aulas de instrumento ou de música na escola." },
    { nome: "Musicoterapia", codigo: "SAI", descricao: "Usar a música para cuidar da saúde das pessoas." }
  ] },
  { nome: "Pedagogia / Licenciaturas", codigo: "SAE", resumo: "Ensinar e formar pessoas em escolas e outros espaços.", areas: [
    { nome: "Educação Infantil", codigo: "SAR", descricao: "Ensinar e cuidar de crianças pequenas." },
    { nome: "Professor de uma Matéria", codigo: "SIA", descricao: "Dar aula de matemática, história, química e outras." },
    { nome: "Coordenação Pedagógica", codigo: "ESC", descricao: "Organizar o trabalho dos professores e da escola." },
    { nome: "Educação Inclusiva", codigo: "SIC", descricao: "Apoiar alunos com deficiência a aprender junto com todos." },
    { nome: "Cursos e Educação Online", codigo: "AES", descricao: "Criar cursos, treinamentos e conteúdos educativos." }
  ] },
  { nome: "Educação Física", codigo: "SRE", resumo: "Trabalhar com esporte, saúde e movimento.", areas: [
    { nome: "Treinamento e Academia", codigo: "SRE", descricao: "Montar treinos e acompanhar alunos." },
    { nome: "Esporte de Alto Rendimento", codigo: "RES", descricao: "Treinar atletas e equipes de competição." },
    { nome: "Educação Física Escolar", codigo: "SAR", descricao: "Dar aulas de esporte e movimento na escola." },
    { nome: "Exercício e Saúde", codigo: "SIR", descricao: "Orientar exercícios para idosos e pessoas com doenças." },
    { nome: "Gestão Esportiva", codigo: "ECS", descricao: "Administrar clubes, academias e eventos." }
  ] },
  { nome: "Serviço Social", codigo: "SEA", resumo: "Apoiar pessoas e comunidades e defender direitos.", areas: [
    { nome: "Assistência Social", codigo: "SEC", descricao: "Atender famílias e garantir o acesso a direitos." },
    { nome: "Saúde", codigo: "SIE", descricao: "Apoiar pacientes e famílias em hospitais." },
    { nome: "Empresas", codigo: "SCE", descricao: "Cuidar do bem-estar de funcionários." },
    { nome: "Justiça e Juventude", codigo: "SEI", descricao: "Acompanhar adolescentes e famílias no sistema de justiça." },
    { nome: "ONGs e Projetos Sociais", codigo: "ESA", descricao: "Criar e coordenar projetos para comunidades." }
  ] },
  { nome: "Ciências Sociais", codigo: "ISA", resumo: "Estudar a sociedade, a cultura e as relações entre pessoas.", areas: [
    { nome: "Pesquisa de Opinião", codigo: "ICE", descricao: "Fazer pesquisas para entender o que as pessoas pensam." },
    { nome: "Professor de Sociologia", codigo: "SIA", descricao: "Ensinar sociologia em escolas e cursinhos." },
    { nome: "Políticas Públicas", codigo: "IES", descricao: "Ajudar a criar e avaliar programas do governo." },
    { nome: "Antropologia", codigo: "IAS", descricao: "Estudar culturas, povos e modos de viver." }
  ] },
  { nome: "Direito", codigo: "ESI", resumo: "Defender, argumentar e interpretar leis.", areas: [
    { nome: "Advocacia", codigo: "ESI", descricao: "Defender clientes e argumentar na Justiça." },
    { nome: "Carreiras Públicas", codigo: "ECI", descricao: "Ser juiz, promotor ou delegado por concurso." },
    { nome: "Direito Digital", codigo: "IEC", descricao: "Atuar com internet, dados e privacidade." },
    { nome: "Defensoria e Direitos Humanos", codigo: "SEI", descricao: "Defender quem não pode pagar advogado." },
    { nome: "Direito Empresarial", codigo: "ECS", descricao: "Cuidar de contratos e negócios de empresas." }
  ] },
  { nome: "Relações Internacionais", codigo: "EIS", revisar: true, codigoAnterior: "ESI", resumo: "Atuar com política, negócios e cooperação entre países.", areas: [
    { nome: "Diplomacia", codigo: "ESI", descricao: "Representar o Brasil em outros países." },
    { nome: "Comércio Exterior", codigo: "ECI", descricao: "Cuidar de importação e exportação." },
    { nome: "Organizações Internacionais", codigo: "SEI", descricao: "Trabalhar com ONU, ajuda humanitária e cooperação." },
    { nome: "Análise Política", codigo: "IEC", descricao: "Estudar cenários políticos para empresas e governos." }
  ] },
  { nome: "Administração", codigo: "ECS", resumo: "Gerir pessoas, recursos e negócios.", areas: [
    { nome: "Gestão de Pessoas (RH)", codigo: "SEC", descricao: "Recrutar, treinar e cuidar das pessoas da empresa." },
    { nome: "Finanças", codigo: "CEI", descricao: "Cuidar do dinheiro e dos investimentos da empresa." },
    { nome: "Empreendedorismo", codigo: "EAI", descricao: "Criar e fazer crescer o próprio negócio." },
    { nome: "Gestão Pública", codigo: "CES", descricao: "Administrar órgãos e serviços do governo." },
    { nome: "Operações e Logística", codigo: "CRE", descricao: "Fazer a produção e as entregas funcionarem." }
  ] },
  { nome: "Marketing", codigo: "ECA", resumo: "Entender o mercado e atrair clientes para produtos e marcas.", areas: [
    { nome: "Marketing Digital", codigo: "EAC", descricao: "Atrair clientes pela internet." },
    { nome: "Branding", codigo: "AE", descricao: "Construir a imagem e a personalidade de uma marca." },
    { nome: "Pesquisa de Mercado", codigo: "ICE", descricao: "Descobrir o que o consumidor quer." },
    { nome: "Vendas e Trade", codigo: "ESC", descricao: "Planejar como o produto chega às lojas e vende." },
    { nome: "Growth e Métricas", codigo: "CIE", descricao: "Medir resultados com dados e testar o que funciona." }
  ] },
  { nome: "Economia", codigo: "ICE", resumo: "Analisar mercados, dinheiro e decisões que movem a sociedade.", areas: [
    { nome: "Mercado Financeiro", codigo: "EIC", descricao: "Analisar investimentos em bancos e corretoras." },
    { nome: "Setor Público", codigo: "ICS", descricao: "Estudar e planejar a economia do país." },
    { nome: "Consultoria", codigo: "IEC", descricao: "Ajudar empresas a tomar decisões econômicas." },
    { nome: "Pesquisa e Ensino", codigo: "ISA", descricao: "Pesquisar e ensinar economia." }
  ] },
  { nome: "Ciências Contábeis", codigo: "CEI", resumo: "Cuidar das contas, impostos e da saúde financeira de empresas.", areas: [
    { nome: "Contabilidade Empresarial", codigo: "CEI", descricao: "Organizar as contas e balanços de empresas." },
    { nome: "Auditoria", codigo: "CIE", descricao: "Conferir se as contas de uma empresa estão corretas." },
    { nome: "Perícia Contábil", codigo: "ICE", descricao: "Investigar fraudes e contas em processos judiciais." },
    { nome: "Consultoria Tributária", codigo: "ECI", descricao: "Ajudar empresas a pagar os impostos certos." },
    { nome: "Contabilidade Pública", codigo: "CSE", descricao: "Cuidar das contas de órgãos públicos." }
  ] },
  { nome: "Logística", codigo: "CER", resumo: "Organizar o caminho dos produtos, da fábrica até o cliente.", areas: [
    { nome: "Transporte e Distribuição", codigo: "CRE", descricao: "Planejar rotas e entregas." },
    { nome: "Armazenagem e Estoque", codigo: "RCE", descricao: "Organizar estoques e centros de distribuição." },
    { nome: "Compras e Suprimentos", codigo: "ECR", descricao: "Negociar e comprar materiais." },
    { nome: "Comércio Exterior", codigo: "CEI", descricao: "Cuidar de cargas que entram e saem do país." },
    { nome: "Logística de E-commerce", codigo: "CIE", descricao: "Fazer as entregas de lojas online funcionarem." }
  ] },
  { nome: "Ciências Atuariais", codigo: "CI", revisar: true, resumo: "Usar matemática e estatística para calcular riscos de seguros, previdência e investimentos.", areas: [
    { nome: "Seguros", codigo: "CIE", descricao: "Calcular o preço e o risco de seguros de vida, carro e saúde." },
    { nome: "Previdência", codigo: "CIS", descricao: "Planejar fundos que pagam a aposentadoria das pessoas." },
    { nome: "Gestão de Riscos", codigo: "ICE", descricao: "Prever perdas e proteger empresas e bancos de surpresas." },
    { nome: "Planos de Saúde", codigo: "CIS", descricao: "Calcular custos e mensalidades de planos de saúde." },
    { nome: "Análise de Dados Atuariais", codigo: "ICR", descricao: "Montar modelos estatísticos com grandes bases de dados." }
  ] },
  { nome: "Gestão Financeira", codigo: "CE", revisar: true, resumo: "Cuidar do dinheiro de empresas: orçamento, investimentos e fluxo de caixa.", areas: [
    { nome: "Finanças Corporativas", codigo: "CEI", descricao: "Planejar orçamento e investimentos de uma empresa." },
    { nome: "Tesouraria e Fluxo de Caixa", codigo: "CE", descricao: "Controlar o que entra e sai e garantir que as contas fechem." },
    { nome: "Crédito e Cobrança", codigo: "CES", descricao: "Analisar a quem conceder crédito e negociar pagamentos." },
    { nome: "Mercado Financeiro", codigo: "EIC", descricao: "Atuar com investimentos em bancos e corretoras." },
    { nome: "Educação Financeira", codigo: "SEC", descricao: "Ajudar pessoas e famílias a organizar o próprio dinheiro." }
  ] },
  { nome: "Arquivologia", codigo: "CIA", revisar: true, resumo: "Organizar, preservar e dar acesso a documentos e registros, em papel ou digitais.", areas: [
    { nome: "Gestão de Documentos em Empresas", codigo: "CIE", descricao: "Organizar documentos para que sejam encontrados rápido." },
    { nome: "Arquivos Históricos", codigo: "ICA", descricao: "Preservar documentos antigos e a memória de cidades e instituições." },
    { nome: "Documentos Digitais", codigo: "CIR", descricao: "Digitalizar acervos e cuidar de sistemas de documentos." },
    { nome: "Arquivos Públicos", codigo: "CSI", descricao: "Cuidar dos registros do governo e garantir o acesso dos cidadãos." },
    { nome: "Conservação e Restauro", codigo: "RAC", descricao: "Recuperar papéis, fotos e livros danificados." }
  ] },
  { nome: "Biblioteconomia", codigo: "CSI", revisar: true, resumo: "Organizar informação e acervos e ajudar as pessoas a encontrar o que precisam.", areas: [
    { nome: "Bibliotecas Escolares e Públicas", codigo: "SCA", descricao: "Atender leitores e criar ações de incentivo à leitura." },
    { nome: "Bibliotecas Universitárias", codigo: "CIS", descricao: "Apoiar pesquisas e organizar acervos de faculdades." },
    { nome: "Gestão da Informação em Empresas", codigo: "CIE", descricao: "Organizar documentos e conhecimento dentro de empresas." },
    { nome: "Acervos Digitais", codigo: "CIR", descricao: "Montar e manter bibliotecas e repositórios online." },
    { nome: "Curadoria de Conteúdo", codigo: "ACS", descricao: "Selecionar e indicar livros e materiais para públicos diferentes." }
  ] },
  { nome: "Administração Pública", codigo: "CES", revisar: true, resumo: "Planejar e gerir serviços e políticas públicas em prefeituras, estados e órgãos do governo.", areas: [
    { nome: "Gestão de Órgãos Públicos", codigo: "ECS", descricao: "Coordenar equipes e recursos de secretarias e órgãos." },
    { nome: "Orçamento Público", codigo: "CEI", descricao: "Planejar e acompanhar como o dinheiro público é gasto." },
    { nome: "Políticas Públicas", codigo: "IES", descricao: "Criar e avaliar programas de saúde, educação e assistência." },
    { nome: "Controle e Transparência", codigo: "CIE", descricao: "Fiscalizar contas e garantir que as regras sejam cumpridas." },
    { nome: "Atendimento ao Cidadão", codigo: "SCE", descricao: "Organizar serviços para que a população seja bem atendida." }
  ] },
  { nome: "Letras", codigo: "AIS", revisar: true, resumo: "Estudar línguas, literatura e textos, e trabalhar com escrita e ensino.", areas: [
    { nome: "Professor de Português ou Línguas", codigo: "SAI", descricao: "Ensinar língua e literatura em escolas e cursinhos." },
    { nome: "Revisão e Edição de Textos", codigo: "CAI", descricao: "Revisar e preparar livros, sites e materiais para publicação." },
    { nome: "Tradução e Interpretação", codigo: "AIC", descricao: "Passar textos e falas de uma língua para outra." },
    { nome: "Mercado Editorial", codigo: "AEC", descricao: "Trabalhar em editoras, do original ao livro pronto." },
    { nome: "Escrita e Conteúdo", codigo: "AES", descricao: "Escrever roteiros, textos para marcas e conteúdo digital." }
  ] },
  { nome: "Tecnólogo em Mecânica / Mecatrônica", codigo: "RCI", revisar: true, resumo: "Curso mais curto e prático para trabalhar com máquinas, manutenção e automação.", areas: [
    { nome: "Manutenção Industrial", codigo: "RCI", descricao: "Manter as máquinas das fábricas funcionando." },
    { nome: "Automação Industrial", codigo: "RIC", descricao: "Programar e instalar máquinas que funcionam sozinhas." },
    { nome: "Mecânica Automotiva", codigo: "RIC", descricao: "Diagnosticar e consertar motores e sistemas de veículos." },
    { nome: "Usinagem e Fabricação", codigo: "RCA", descricao: "Produzir peças com tornos e máquinas de precisão." },
    { nome: "Supervisão de Produção", codigo: "ERC", descricao: "Coordenar equipes e máquinas no chão de fábrica." }
  ] },
  { nome: "Jogos Digitais", codigo: "AIR", revisar: true, resumo: "Criar jogos, da ideia e da arte até a programação.", areas: [
    { nome: "Game Design", codigo: "AIE", descricao: "Inventar as regras, fases e desafios do jogo." },
    { nome: "Programação de Jogos", codigo: "IRA", descricao: "Fazer o jogo funcionar no computador, console ou celular." },
    { nome: "Arte e Animação", codigo: "AR", descricao: "Criar personagens, cenários e animações." },
    { nome: "Áudio para Jogos", codigo: "ARI", descricao: "Produzir trilhas e efeitos sonoros." },
    { nome: "Produção e Testes", codigo: "CEI", descricao: "Organizar o desenvolvimento e encontrar erros antes do lançamento." }
  ] },
  { nome: "Engenharia de Produção", codigo: "ECR", revisar: true, resumo: "Planejar e melhorar como empresas e fábricas produzem, com menos desperdício.", areas: [
    { nome: "Planejamento da Produção", codigo: "CEI", descricao: "Decidir o que, quanto e quando produzir." },
    { nome: "Qualidade", codigo: "CIR", descricao: "Garantir que os produtos saiam sem defeito." },
    { nome: "Melhoria de Processos", codigo: "IEC", descricao: "Encontrar jeitos de produzir mais rápido e com menos custo." },
    { nome: "Gestão de Operações", codigo: "ECS", descricao: "Coordenar equipes, fornecedores e prazos." },
    { nome: "Segurança do Trabalho", codigo: "RCS", descricao: "Prevenir acidentes e cuidar da saúde de quem trabalha." }
  ] },
  { nome: "Turismo e Hotelaria", codigo: "ESC", resumo: "Receber pessoas e organizar experiências de viagem.", areas: [
    { nome: "Hotelaria", codigo: "SEC", descricao: "Receber hóspedes e gerir hotéis." },
    { nome: "Eventos", codigo: "EAS", descricao: "Planejar festas, congressos e shows." },
    { nome: "Agências e Roteiros", codigo: "EAC", descricao: "Montar viagens e roteiros para clientes." },
    { nome: "Ecoturismo", codigo: "RSE", descricao: "Guiar viagens e passeios na natureza." },
    { nome: "Planejamento Turístico", codigo: "IES", descricao: "Planejar o turismo de cidades e regiões." }
  ] }
];
