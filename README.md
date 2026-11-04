# Qual curso combina com você?

Quiz de orientação vocacional para jovens escolhendo a faculdade. Usa o modelo RIASEC (Holland) para calcular o perfil e sugerir cursos e áreas de atuação. É um site 100% estático: não tem backend nem chave de API. No final, a pessoa copia o resultado ou envia por WhatsApp, e o feedback personalizado é preparado manualmente.

## Estrutura

```
index.html, app.js        quiz rápido
jogo.html, jogo.js        modo aventura
jogo.css, style.css       visual
nucleo.js                 cálculo e texto do resultado
interface-comum.js        tema, entrada (apelido e consentimento), perguntas abertas
resultado.js              tela de resultado, copiar, WhatsApp e PDF
tema-inicial.js           aplica o tema antes de desenhar
data/                     perguntas, cursos e mundos do jogo
```

`planilha/` guarda o script que roda no Google. Só para desenvolvimento ou para o futuro, fora do repositório pelo `.gitignore`: `teste/`, `servidor-local.js`, `api/`, `fixtures/`, `scripts/`, `.env`.

## Configurar o WhatsApp

No topo de `resultado.js`, coloque seu número só com dígitos, com país e DDD:

```js
const WHATSAPP_NUMERO = "5521999998888";
```

Vazio, o WhatsApp abre com o texto pronto e a pessoa escolhe o contato.

## Salvar as respostas numa planilha

O botão "Enviar resultado" manda as respostas para uma planilha Google sua. Ele só aparece com a constante `PLANILHA_URL` preenchida.

1. Crie uma planilha em sheets.new e dê um nome a ela.
2. Vá em Extensões > Apps Script, apague o que estiver lá e cole o conteúdo de `planilha/receber-respostas.gs`. Salve.
3. Clique em Implantar > Nova implantação. Na engrenagem, escolha "App da Web". Em "Executar como", deixe "Eu". Em "Quem pode acessar", escolha "Qualquer pessoa". Clique em Implantar e autorize.
4. Copie o endereço que termina em `/exec` e cole em `PLANILHA_URL`, no topo de `resultado.js`.
5. Envie as mudanças para o GitHub.

Se mudar o script depois, publique em Implantar > Gerenciar implantações > editar > Nova versão.

## Rodar localmente

Abra `index.html` no navegador, ou rode `node servidor-local.js` e acesse http://localhost:3000.

Modo de teste: `index.html?teste` e `jogo.html?teste` mostram um painel que preenche tudo sozinho.

## Publicar no GitHub Pages

O site está em https://paulovictorgomes.github.io/qual-curso/ e atualiza sozinho a cada envio para a branch `main`:

```
git status
git add .
git commit -m "Descreva a mudança"
git push
```

Confira o `git status` antes: o repositório é público, e o que for enviado fica no histórico. O `.gitignore` já deixa de fora o `.env` e os arquivos de desenvolvimento.

## Privacidade (LGPD)

As respostas são dados pessoais de jovens, possivelmente menores de idade. O site em si não guarda nada, mas o que a pessoa enviar fica na planilha e no WhatsApp. O aviso da tela inicial promete: planilha privada, até 3 meses depois do fim do teste, apagar a pedido pelo código, e possível uso de IA. Cumpra e mantenha esse texto verdadeiro. Não compartilhe a planilha por link.

## Reativar a IA no futuro

O bloco "Análise da IA" em `resultado.js` está comentado, com as instruções. Ele depende de `api/feedback.js`, que precisa de uma hospedagem com backend (ex.: Vercel) e tem custo por uso. Veja o `CLAUDE.md`.
