# Publicar RENDEZVOUS v0.8.1

> O projeto está pronto para publicação, mas **nenhum push ou release remoto foi executado**. A conexão atual não possui escrita em `tulioscost/rendezvous-rpg`.

## 1. Importar código

Na conta com permissão de escrita, extraia o **ZIP do repositório** e envie o conteúdo da pasta para a raiz de `tulioscost/rendezvous-rpg`, incluindo `.github/` e arquivos ocultos. Não inclua o ZIP externo dentro do repositório.

```bash
git clone https://github.com/tulioscost/rendezvous-rpg.git
cd rendezvous-rpg
# copie o conteúdo descompactado do repositório para esta pasta
git add .
git commit -m "release: preparar RENDEZVOUS v0.8.1"
git push -u origin main
```

## 2. Testar e gerar os arquivos

```bash
npm test
bash scripts/package.sh
```

O script coloca exatamente estes arquivos em `release/`:

- `rendezvous-rpg-foundry.zip`
- `system.json`
- `RELEASE_v0.8.1.md`

## 3. Criar a release GitHub

```bash
git tag v0.8.1
git push origin v0.8.1
```

A action `.github/workflows/release.yml` valida a versão, executa `npm test` e cria uma release com os três arquivos. Confirme o sucesso em **Actions** e a presença dos anexos em **Releases**.

## 4. Instalar no Foundry

Em Foundry V13, use **Install System → Manifest URL**:

`https://raw.githubusercontent.com/tulioscost/rendezvous-rpg/main/system.json`

O campo `download` do manifesto aponta para:

`https://github.com/tulioscost/rendezvous-rpg/releases/latest/download/rendezvous-rpg-foundry.zip`

Essas URLs somente funcionarão depois de publicada a versão correspondente. Não foi validada compatibilidade com o Foundry V14.

## 5. Testes manuais pendentes

- Verificar imagem personalizada no documento Actor e persistência após fechar/abrir.
- Testar virada das cinco páginas e salvamento de campos.
- Importar técnica do catálogo, conferir custos e rolagens.
- Testar com permissões de usuário/jogador no mundo real.
