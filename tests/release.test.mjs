import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = path => readFileSync(new URL(path, import.meta.url),'utf8');
test('manifest links exactly to the versioned release asset name',()=>{
 const m=JSON.parse(read('../system.json'));
 assert.equal(m.version,'0.8.1');
 assert.ok(m.download.endsWith('/releases/latest/download/rendezvous-rpg-foundry.zip'));
 assert.equal(Number(m.compatibility.verified),13);
});
test('reader can change hero portrait in Foundry and web demo',()=>{
 assert.match(read('../templates/actor-book.hbs'),/data-rdv-image-picker/);
 assert.match(read('../module/main.mjs'),/foundry\.applications\.apps\.FilePicker/);
 assert.match(read('../docs/index.html'),/id="hero-file"/);
 assert.match(read('../docs/web-app.mjs'),/state\.heroImage/);
});
test('both stylesheets implement a newsprint paper texture',()=>{
 for(const p of ['../styles/comic-sheet.css','../docs/comic-sheet.css'])
  assert.match(read(p),/Papel-jornal impresso:/);
});
test('release script and workflow carry all three assets',()=>{
 const shell=read('../scripts/package.sh'); const workflow=read('../.github/workflows/release.yml');
 for(const file of ['rendezvous-rpg-foundry.zip','system.json','RELEASE_']){
  assert.ok(shell.includes(file));assert.ok(workflow.includes(file));
 }
});
