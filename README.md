# RENDEZVOUS — RPG de Super-Heróis

**Projeto de implementação digital · versão 0.8.1-alpha · livro de regras Alfa 0.7**

Um sistema independente para **Foundry Virtual Tabletop 13**, acompanhado por uma demonstração web. A ficha digital foi concebida como **um gibi que se folheia**: cada seção ocupa uma página de quadrinhos e a navegação reproduz a passagem física de uma folha.

> Importante: este é um pacote de desenvolvimento. Os testes automatizados de regras passaram, mas a integração ao Foundry VTT ainda necessita de teste presencial na aplicação. Não se trata de versão 1.0 homologada.

## Funcionalidades

- **5 páginas em formato de quadrinhos com textura de papel-jornal:** Identidade, Atributos, Poderes, Combate e Dossiê Solis.
- **Virar páginas** pelas setas, números ou teclado (←/→ fora de campos de formulário).
- **Persistência no Foundry:** atributos, perícias e recursos salvos no documento Actor; poderes e equipamentos como documentos Item.
- **Troca de imagem do herói:** clique no retrato ou em **TROCAR IMAGEM** para escolher outra arte.
- **Textura de papel-jornal:** páginas e painéis usam acabamento envelhecido inspirado em quadrinhos impressos.
- **9 atributos, 27 perícias, 14 efeitos** e três patamares de campanha.
- **140 técnicas de referência**, importáveis para a ficha do personagem.
- **Motor de d6**, sucessos em 5–6 e Ímpetos em 6; botão de rolagem para atributos, perícias e poderes.
- **Cálculo de Pontos de Poder:** `G × máx(1, B + A − L) + F`, com custo reduzido para modos alternativos.
- **Auditoria de criação** com alertas de limites, orçamento e matrizes incompatíveis.
- Demonstração web (`docs/`) com salvamento local e importação/exportação em JSON.
- Ficha em PDF e manuscrito de referência na pasta `reference/`.

## Instalação no Foundry 13 (manual)

1. Extraia a pasta **`rendezvous-rpg`** no diretório de dados do Foundry em `Data/systems/`.
2. Confira que o arquivo exista em `Data/systems/rendezvous-rpg/system.json` (sem diretório adicional entre eles).
3. Reinicie o Foundry, selecione o sistema **RENDEZVOUS — RPG de Super-Heróis** e crie um mundo.
4. Crie um Actor do tipo **hero** ou **npc**; a ficha **RENDEZVOUS — Gibi** será aberta por padrão.
5. Na página **Poderes**, crie técnicas originais ou importe uma das 140 da biblioteca.

**Instalação por manifesto:** após a publicação da release GitHub `v0.8.1`, um ZIP poderá ser disponibilizado em Releases e a instalação por manifesto `system.json` passará a funcionar. O pacote só estará disponível por manifesto após ser publicado no repositório remoto.

## Demonstração no navegador

Use `docs/index.html` em um servidor HTTP estático:

```bash
npm run serve
```

Abra `http://localhost:8080/docs/`. O projeto não exige Node para ser servido, apenas um servidor HTTP simples. A demonstração é servida pelo diretório `docs/`; a versão HTML isolada das versões anteriores não integra esta release.

Depois de publicar o repositório, habilite GitHub Pages em **Settings → Pages → Deploy from a branch → main → /docs**. O endereço esperado será `https://tulioscost.github.io/rendezvous-rpg/` (só funcionará após a publicação e ativação do Pages).

### Controles

| Controle | Função |
|---|---|
| `▶` / `◀` | Virar a próxima página / página anterior |
| 1–5 | Ir diretamente à página escolhida |
| `←` / `→` | Virar página quando o foco não estiver em um campo |
| Campos da ficha | Salvamento automático |
| CRIAR TÉCNICA | Adicionar Item de poder ao personagem |
| IMPORTAR DO CATÁLOGO | Importar uma técnica pré-configurada |
| EXPORTAR JSON (demo) | Salvar cópia portátil dos dados |

**Nota:** a demonstração web utiliza `localStorage`; são dados locais desse navegador. O Foundry salva dados nos documentos do mundo e não lê automaticamente um JSON da demonstração — para importar esse conteúdo ao Foundry será necessário um importador específico, ainda não implementado.

## Regras e fontes do sistema

As regras são derivadas do manuscrito **RENDEZVOUS Alfa 0.7**. A hierarquia de alterações é `0.4 > 0.3 > 0.2 > 0.1`, com taxonomia e Oficina de Manifestações acrescentadas na 0.7. Os **140 modelos** preservam a fonte de origem `0.2`, `0.4` ou `0.7` e o custo publicado originalmente no catálogo. O custo exibido no editor utiliza a fórmula atual: revise manobras excepcionais com o Narrador.

O cálculo e os testes são implementados em [`module/rules.mjs`](module/rules.mjs). Os testes podem ser executados com:

```bash
npm test
```

## Estrutura

```text
rendezvous-rpg/
  system.json              # Manifesto do sistema Foundry
  template.json            # Dados persistidos em Actor e Item
  module/main.mjs          # Interface de fichas Foundry v13
  module/rules.mjs         # Motor mecânico puro
  templates/               # Layout da ficha e editor de poderes
  styles/                  # Diagramação de quadrinhos + animação de folha
  data/catalogo-140.json  # 140 técnicas oficiais da compilação de playtest
  assets/                  # Ilustrações próprias do projeto
  docs/                    # Demonstração web para GitHub Pages
  reference/               # Livro, manuscrito e ficha em PDF
  tests/                   # Verificação automatizada
  scripts/                 # Rotinas de empacotamento
```

## Publicação no repositório

```bash
git clone https://github.com/tulioscost/rendezvous-rpg.git
cd rendezvous-rpg
# Copie os arquivos deste pacote para a raiz do repositório (system.json deve ficar na raiz).
git add .
git commit -m "feat: RENDEZVOUS ficha digital em quadrinhos e catálogo de técnicas"
git push origin main
```

O usuário que executa o push precisa possuir permissão de gravação. Antes de publicar a versão estável, recomenda-se realizar testes práticos no Foundry 13, inclusive com permissões de jogador e compartilhamento de fichas.

**Direitos autorais e licença:** nenhuma licença foi presumida para a obra e a arte. A pessoa titular dos direitos deve escolher as condições de uso antes de disponibilizar redistribuição pública.


## Release

A distribuição pública utiliza exatamente três ativos: `rendezvous-rpg-foundry.zip`, `system.json` e `RELEASE_v0.8.1.md`. O comando `bash scripts/package.sh` gera esses arquivos na pasta `release/`. O workflow publica os três após o push da tag `v0.8.1`.
