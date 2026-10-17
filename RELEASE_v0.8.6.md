# RENDEZVOUS v0.8.6 — Correção V14.369

## Correções

- **Geradores automáticos:** inclui todos os campos obrigatórios de `Actor.system` exigidos pelos `TypeDataModel` da V14.369, em especial `talents.first`, `talents.second` e os seis estados de `conditions`.
- **Técnicas geradas:** inclui todos os seis modificadores booleanos e os campos auxiliares de `Item.system` para impedir erros de validação em documentos incorporados.
- **Compêndios:** normaliza registros dos 10 Heróis Prontos e das 140 técnicas para o formato V14, mantendo identificadores e informações anteriores.
- **Retrato da ficha:** botão `TROCAR IMAGEM` e clique no retrato agora utilizam exclusivamente uma ação oficial da ficha, abrindo um único `FilePicker` da V14. A imagem selecionada é salva em `Actor.img`.
- **Virada de páginas:** um efeito sonoro curto, local, acompanha as transições entre as cinco páginas da ficha, com arquivo em `assets/sfx/page-turn.wav`.

## Compatibilidade

- Foundry VTT **14.369**.
- Dice So Nice! **obrigatório**.
- Mantidos a ficha em papel-jornal, os conjuntos de dados, a cena de boas-vindas, os geradores e os compêndios anteriores.

## Verificação

46 testes automatizados aprovados em Node, incluindo teste de ação do seletor de imagens com API V14 simulada. **É indispensável confirmar a interface em uma instalação real do Foundry 14.369**.

## Instalação

1. Faça backup do mundo antes de atualizar o sistema.
2. Publique o pacote `rendezvous-rpg-foundry.zip` como asset da Release `v0.8.6` no GitHub ou extraia seu conteúdo em `Data/systems/rendezvous-rpg/`.
3. Reinicie o Foundry; reabra o mundo com o Dice So Nice! habilitado.
4. Crie um herói e um vilão usando as respectivas macros. Verifique que ambos abrem na ficha em quadrinhos.
5. Clique em `TROCAR IMAGEM`, selecione ou envie uma imagem e confirme a alteração do retrato.
6. Passe pelas cinco páginas para verificar o som local.

O pacote local contém os dados dos compêndios em JSON e o instalador para compêndios de mundo. A compilação dos compêndios nativos (LevelDB) é feita no GitHub Actions quando a tag é publicada.
