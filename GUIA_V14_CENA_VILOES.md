# RENDEZVOUS v0.8.5 — Guia V14.369

## Instalação

1. Faça backup do mundo e da pasta do sistema anterior.
2. Instale Foundry VTT **14.369** e habilite Dice So Nice! para V14.
3. Instale `rendezvous-rpg-foundry.zip` extraindo em `Data/systems/rendezvous-rpg/`.
4. Reinicie o Foundry e entre como Narrador. O sistema criará a cena **RENDEZVOUS | Bem-vindos à Onda Solis** automaticamente uma única vez; se já houver cena ativa, ela não será substituída.
5. Abra a aba **Macros** e execute **RENDEZVOUS — Gerar Vilão** ou **RENDEZVOUS — Gerar Herói**.

## Console para uso direto

```javascript
await game.rendezvous.generateVillain();
await game.rendezvous.generateVillain({name:'Umbra',archetype:'anomalista',tier:'lendaria'});
await game.rendezvous.generateHero();
await game.rendezvous.viewWelcomeScene();
await game.rendezvous.ensureWelcomeScene();
await game.rendezvous.installVillainMacro();
```

### Arquétipos
- `dominador`, `colosso`, `infiltrador`, `parasita`, `estrategista`, `anomalista`.
- Patamares: `urbana`, `heroica`, `lendaria`.

## Critérios de aceitação no Foundry real

- Novo herói e novo NPC abrem ficha de cinco páginas, e a virada funciona.
- Dados de personagem persistem após fechar e reabrir.
- As macros criam personagens na aba Atores e não se duplicam a cada login.
- A cena aparece apenas uma vez e apresenta a ilustração como fundo de um nível V14.
- Dice So Nice! está ativo e as faces Solis aparecem no dado d6.
- Livro, Heróis e Poderes mantêm seus compêndios; importar uma técnica.

## Limite de validação

A configuração e os testes automáticos não equivalem a executar uma instância do servidor Foundry, que não está disponível neste ambiente. Caso a cena mostre fundo vazio, abra sua configuração e verifique se o Nível Inicial está definido para `Plano de boas-vindas`.
