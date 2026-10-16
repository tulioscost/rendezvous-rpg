# Publicação: tulioscost/rendezvous-rpg

O repositório foi identificado como **público e vazio** no momento da preparação. A conexão GitHub atualmente autenticada é **MarcosDwayne**, com **permissão somente de leitura** nesse repositório.

## Publicação manual no GitHub

1. Entre em uma conta com permissão de escrita no repositório.
2. Descompacte `RENDEZVOUS_GitHub_Projeto_v0_8.zip`, abra a pasta `rendezvous-rpg` e copie seu conteúdo para a raiz local de `tulioscost/rendezvous-rpg` (não crie outro nível de pastas).
3. Execute:

```bash
git clone https://github.com/tulioscost/rendezvous-rpg.git
cd rendezvous-rpg
# Copie os arquivos descompactados aqui, inclusive pastas e arquivos ocultos (.github, .gitignore).
git add .
git commit -m "feat: sistema RENDEZVOUS e ficha em páginas de quadrinhos"
git push -u origin main
```

4. Para a prévia web, ative **Settings → Pages → Deploy from a branch → main → /docs**. Teste o endereço depois da publicação.
5. Para distribuição por manifesto no Foundry, crie a tag `v0.8.0` e publique-a. O workflow `Release Foundry` cria o arquivo `rendezvous-rpg.zip`; confirme no GitHub Actions e em Releases antes de divulgar a URL de download.

## Alternativa com conexão GitHub

Conecte a conta **tulioscost** no GitHub do ChatGPT ou conceda permissão de gravação para a conta conectada **MarcosDwayne**. Depois, solicite a publicação no repositório. Não foi efetuado commit remoto nem criada uma pull request neste turno.

## Checklist após publicação

- `system.json` está na raiz do repositório.
- `docs/index.html` funciona no GitHub Pages.
- `npm test` passa (ver workflow Checks).
- `v0.8.0` gera `rendezvous-rpg.zip` em Releases.
- O Foundry 13 permite criar Actor hero e NPC, alternar as cinco páginas e editar cada campo.
- Teste de jogador: passagem de páginas não deve perder dados do campo ativo.
- Importação de técnicas e chat de dados funcionam.
