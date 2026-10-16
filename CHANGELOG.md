# Changelog

## 0.8.1
- Adicionada troca de imagem do herói na ficha do Foundry e na demo web.
- Aplicada textura de papel-jornal às páginas e painéis da ficha.
- Preparadas notas de release e pacote `release/rendezvous-rpg-v0.8.1.zip`.


## 0.8.0-alpha — Implementação digital de RENDEZVOUS

- Novo sistema inicial de Foundry VTT 13.
- Ficha em cinco páginas sequenciais com animação de passagem e teclado.
- Persistência de atributos, perícias, PV, RD, Viradas, Tensão, Marcos, Identidade e MRA.
- Poderes e equipamentos em Items editáveis.
- 140 modelos de técnicas, provenientes das edições de playtest 0.2/0.4/0.7.
- Motor de dados e cálculo de custo com avisos de inconsistência.
- Demonstração para GitHub Pages com importação/exportação em JSON.
- Rotina de testes, empacotamento e preparação de release.

**Limitação:** funcionalidades não executadas dentro do aplicativo Foundry neste ambiente; validação visual e testes humanos ainda pendentes.

## v0.8.2 — Ficha e compêndios
- Registro explícito das fichas de Herói e NPC no DocumentSheetConfig do Foundry V13.
- Tradução das categorias de documentos, retirando nomes técnicos como TYPES.Actor.hero.
- Uso do seletor nativo de imagem da ficha e preservação do layout paginado.
- Livro de Regras (12 entradas), Heróis Prontos (10) e Poderes (140): fontes JSON versionadas.
- Instalação alternativa de compêndios do mundo por Narrador e compilação LevelDB no workflow da release.
