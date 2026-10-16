import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const root=new URL('../',import.meta.url);
const read=p=>fs.readFileSync(new URL(p,root),'utf-8');
test('The interactive book has exactly five sections and page-turn navigation',()=>{
 const html=read('templates/actor-book.hbs');
 assert.equal((html.match(/class="rdv-comic-page /g)||[]).length,5);
 assert.ok(html.includes('data-page-next'));
 assert.ok(html.includes('data-page-prev'));
 assert.ok(read('module/main.mjs').includes('rdv-turning'));
});
test('The 140 techniques have unique ids and recognized effects',()=>{
 const techniques=JSON.parse(read('data/catalogo-140.json')).techniques;
 assert.equal(techniques.length,140);
 assert.equal(new Set(techniques.map(t=>t.id)).size,140);
 const names=new Set(Object.keys(JSON.parse(read('template.json')).Item.power.modifiers));
 for(const t of techniques){assert.ok(t.name);assert.ok(t.grade>=1 && t.grade<=6);for(const k of Object.keys(t.modifiers))assert.ok(names.has(k),k);}
});
test('The web demo and image-upload controls are included in the repository',()=>{
 const html=read('docs/index.html');
 assert.ok(html.includes('web-app.mjs'));
 assert.ok(html.includes('id="hero-file"'));
 assert.ok(read('docs/web-app.mjs').includes('state.heroImage'));
});
