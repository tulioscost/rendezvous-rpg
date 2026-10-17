# RENDEZVOUS v0.8.4 — Dice So Nice! e Macro Automática

- **Dependência obrigatória:** `dice-so-nice`, via `system.json → relationships.requires`.
- **Dados 3D d6:** três conjuntos (`rdv-solis`, `rdv-vigilia`, `rdv-ruptura`), cada um com 6 texturas PNG 256×256.
- **Face 1:** buraco negro. **Face 6:** sol brilhando (sucesso + Ímpeto). Faces 2–5 seguem o padrão de quadrinhos.
- **Não altera probabilidades:** a animação do Dice So Nice usa a rolagem oficial 1d6 do Foundry.
- **Macro:** `RENDEZVOUS — Gerar Herói` cria um Actor `hero` com atributos e perícias legais e técnicas no limite Heroico de 26 PP. Apenas Narradores podem executá-la.
- **Controle:** `await game.rendezvous.installHeroMacro()` instala a macro sem duplicá-la; `await game.rendezvous.generateHero()` gera o personagem.
- **Manutenção:** permanecem a ficha paginada, troca de retrato, papel-jornal e três compêndios.
- **Compatibilidade:** o sistema continua visando Foundry V13, requerendo versão do Dice So Nice! compatível com V13; a release atual do módulo é destinada a V14.
- **Validação:** testes locais automatizados; ainda é necessário teste no aplicativo Foundry V13 com uma edição compatível do Dice So Nice! ativa.

## Conteúdo da Release

- `rendezvous-rpg-foundry.zip`
- `system.json`
- `RELEASE_v0.8.4.md`
