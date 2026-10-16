# RENDEZVOUS — Foundry VTT v0.8.2

Sistema de super-heróis com ficha em cinco páginas de quadrinhos viráveis, textura de papel-jornal, imagem do personagem substituível, criação modular de técnicas e três compêndios.

## Como instalar

1. Use o endereço `https://raw.githubusercontent.com/tulioscost/rendezvous-rpg/main/system.json` **depois de publicar este pacote no repositório e na Release**; ou extraia `rendezvous-rpg-foundry.zip` em `Data/systems/rendezvous-rpg`.
2. Reinicie o Foundry VTT 13 e abra o mundo.
3. Crie um **Herói** ou abra um existente. Caso apareça a ficha padrão, use `⋮` / **Configurar ficha** → **RENDEZVOUS — Gibi**.
4. Para personagens existentes, confira que o sistema do mundo é `rendezvous-rpg`, e reinicie o mundo após atualizar.
5. Alterar retrato: clique na imagem na página 1 ou em **TROCAR IMAGEM**.

## Compêndios

- **RENDEZVOUS | Livro de Regras:** 12 registros de diário (10 capítulos + referência e introdução).
- **RENDEZVOUS | Heróis Prontos:** 10 personagens de exemplo, incluindo Vértice, Alicerce, Elo, Nó e personagens do cenário, identificados como adaptações numéricas de playtest.
- **RENDEZVOUS | Poderes e Técnicas:** 140 poderes originais da compilação Alfa 0.7.

Ao iniciar um mundo como Narrador, o Foundry oferece a instalação de **compêndios do mundo** se não houver bancos nativos. Também é possível executar `game.rendezvous.installCompendiums()` no console F12 como Narrador. A instalação é incremental por IDs, sem excluir documentos existentes. Os compêndios publicados pela Action já são bancos LevelDB nativos.

## Repositório e Release

A tag `v0.8.2` executa `.github/workflows/release.yml`, compila os três bancos usando `@foundryvtt/foundryvtt-cli` e publica `rendezvous-rpg-foundry.zip`, `system.json` e `RELEASE_v0.8.2.md`.

Para atualizar o repositório, publique os arquivos desta pasta na raiz de `tulioscost/rendezvous-rpg` e envie a tag. **Nenhuma alteração remota foi realizada automaticamente.**

## Validação

Execute `npm test`. O resultado valida estrutura de dados e regras; a confirmação de interface e a importação LevelDB final precisam ocorrer no Foundry VTT 13.

Para troubleshooting, consulte [GUIA_INSTALACAO_E_TESTES.md](GUIA_INSTALACAO_E_TESTES.md).
