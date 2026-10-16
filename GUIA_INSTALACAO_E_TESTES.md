# RENDEZVOUS — Instalação e verificação v0.8.2

1. Faça cópia de segurança do mundo no Foundry e feche-o.
2. Extraia `rendezvous-rpg-foundry.zip` na pasta `Data/systems/rendezvous-rpg/` (o `system.json` deve ficar diretamente nessa pasta).
3. Reinicie o Foundry VTT 13 e confira no gerenciador de sistemas a versão 0.8.2.
4. Abra o mundo. Crie um Actor do tipo **Herói**. A ficha correta tem cinco páginas e setas para virá-las.
5. Se um herói anterior ainda mostrar a ficha compacta: menu `⋮` da ficha > **Configuração da ficha** > **RENDEZVOUS — Gibi**. Se necessário, reinicie o mundo.
6. Clique no retrato para alterá-lo usando o navegador de arquivos do Foundry.
7. Ao entrar com conta de Narrador, aceite instalar os compêndios deste mundo. Depois, veja a aba **Compêndios**.
8. Se o convite não aparecer, execute no Console F12, com conta de Narrador: `await game.rendezvous.installCompendiums()`.
9. Verifique: Livro (12 registros), Heróis (10), Poderes (140). Importe uma cópia do personagem para o mundo e confira a página **Poderes**.

**Nota:** o pacote de instalação local possui fontes JSON e criação de compêndios do mundo. O workflow da tag `v0.8.2` compila compêndios nativos LevelDB para a release GitHub. Aqui não foi possível executar a integração visual no Foundry nem a compilação LevelDB localmente.
