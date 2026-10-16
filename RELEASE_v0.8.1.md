# RENDEZVOUS RPG — Release v0.8.1

**Alvo de compatibilidade declarado:** Foundry Virtual Tabletop V13.  
**Estado:** versão alfa, não homologada para Foundry V14.

## O que está incluído

- Ficha em **cinco páginas de quadrinhos** com transição de virar folha.
- **Retrato substituível** pelo seletor de arquivos do Foundry; na demonstração web, por upload local.
- **Textura de papel-jornal**, tonalidade levemente envelhecida e retícula impressa.
- Nove atributos, 27 perícias, 14 efeitos e catálogo de 140 técnicas.
- Motor de testes d6 com sucessos em resultados 5–6 e Ímpetos em 6.
- Regras de Pontos de Poder e avisos sobre limites de criação.
- Página de demonstração para GitHub Pages.

## Arquivos da publicação

1. `rendezvous-rpg-foundry.zip` — **instalação do sistema** no Foundry; contém `system.json` na raiz do ZIP.
2. `system.json` — manifesto do sistema, com URL do ZIP de release.
3. `RELEASE_v0.8.1.md` — estas notas da versão.

## Instalação

Após a publicação da release no repositório, no Foundry V13 use **Install System → Manifest URL** e informe:

`https://raw.githubusercontent.com/tulioscost/rendezvous-rpg/main/system.json`

Para instalar manualmente: extraia o conteúdo de `rendezvous-rpg-foundry.zip` na pasta `Data/systems/rendezvous-rpg/`, preservando `system.json` diretamente dentro dela. Reinicie o Foundry.

## Teste rápido

1. Crie um mundo RENDEZVOUS e um Actor do tipo `hero`.
2. Abra a ficha; confirme a navegação entre as cinco páginas.
3. Clique em **TROCAR IMAGEM**; selecione outra imagem e confirme que o retrato é atualizado.
4. Preencha atributos, perícias e recursos; passe de página e volte, verificando a persistência.
5. Crie ou importe uma técnica e confira a atualização dos Pontos de Poder.

## Limitações

- Ainda é necessário testar o conjunto **em uma instalação real do Foundry V13**; verificações automatizadas não substituem esse teste.
- **Não há compatibilidade validada com Foundry V14.369.**
- A release e o manifesto **não estarão disponíveis por URL até serem publicados no GitHub**.
- A demonstração web salva dados no navegador; sua importação JSON não é a importação nativa de Actors do Foundry.

## Integridade

O projeto possui testes automatizados de estrutura e regras executáveis com `npm test`. A tag Git `v0.8.1` aciona o workflow que publica os três ativos da release, após a criação da tag por alguém com permissão de escrita.
