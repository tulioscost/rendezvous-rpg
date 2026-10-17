# RENDEZVOUS — Guia de correções da versão 0.8.6

**Alvo:** Foundry 14.369 com Dice So Nice! ativo.

## Erro de validação em heróis/vilões

A origem era a ausência de propriedades obrigatórias nos `TypeDataModel`: os geradores criavam `system.talents` e `system.conditions` incompletos, e poderes com modificadores omitidos. A versão 0.8.6 escreve todos os campos explicitamente. Não é necessário apagar personagens válidos existentes.

Teste no console (F12), como Narrador:

```js
await game.rendezvous.generateHero({name:'Teste Solar',archetype:'solar'});
await game.rendezvous.generateVillain({name:'Teste Umbra',archetype:'anomalista',tier:'heroica'});
```

Esses comandos criam personagens no mundo. Apague apenas os personagens de teste depois.

## Botão TROCAR IMAGEM

Abra a ficha em quadrinhos; clique na imagem ou no botão. O seletor de imagens deve abrir uma única janela. Selecione uma imagem já presente ou envie um arquivo para uma pasta do mundo sobre a qual você tenha permissão de escrita. O caminho será gravado em `Actor.img`.

## Som de página

Ao navegar pelos botões, números ou setas do teclado, o arquivo `assets/sfx/page-turn.wav` toca localmente. Verifique se o navegador não está com o áudio silenciado. A reprodução segue o volume de efeitos/interface do Foundry.

## Compêndios

Os documentos dos compêndios em JSON foram atualizados. Se os compêndios nativos não aparecerem em uma instalação manual, execute `await game.rendezvous.installCompendiums()` como Narrador, o que importa os dados ao mundo. Atualizar não remove personagens pré-existentes.

## Publicação GitHub

Tag: `v0.8.6`. A Release contém somente `rendezvous-rpg-foundry.zip`, `system.json` e `RELEASE_v0.8.6.md`. A automação do repositório compila os compêndios e cria o asset ZIP ao receber a tag.
