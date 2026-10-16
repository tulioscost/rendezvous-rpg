import test from 'node:test';
import assert from 'node:assert/strict';
import {ATTRIBUTES,SKILLS,EFFECTS,rollPool,powerCost,summarizeActor} from '../module/rules.mjs';
test('Nine attributes, twenty-seven skills and fourteen effects',()=>{
 assert.equal(ATTRIBUTES.length,9);assert.equal(SKILLS.length,27);assert.equal(Object.keys(EFFECTS).length,14);
});
test('dice count 5-6 as success, 6 as impulse, capped at ten',()=>{
 const r=rollPool(4,[1,4,5,6]);assert.deepEqual([r.successes,r.impulses],[2,1]);
 assert.equal(rollPool(100,Array(10).fill(6)).pool,10);
});
test('base attack power (G3 ranged damage) costs 9 PP',()=>{
 assert.equal(powerCost({effect:'dano',grade:3,modifiers:{distancia:true}}).cost,9);
});
test('alternate G3 influence power (full 9 PP) costs 3 PP',()=>{
 assert.deepEqual([powerCost({effect:'influencia',grade:3,modifiers:{distancia:true},alternate:true}).full,powerCost({effect:'influencia',grade:3,modifiers:{distancia:true},alternate:true}).cost],[9,3]);
});
test('limitation never reduces below one PP per grade',()=>{
 assert.equal(powerCost({effect:'movimento',grade:4,limitation:true}).cost,4);
});
test('G4 area damage totals 16 PP without range',()=>{
 assert.equal(powerCost({effect:'dano',grade:4,modifiers:{area:true}}).cost,16);
});
test('invalid modifier compositions signal warning',()=>{
 const p=powerCost({effect:'controle',grade:2,modifiers:{seletivo:true,perfurante:true}});
 assert.ok(p.warnings.length>=2);
});
test('Vértice prototype spends 26 PP with legal modes',()=>{
 const a={tier:'heroica',attributes:{FOR:2,AGI:3,ROB:3,CAR:1,MOR:2,FIB:2,INT:2,RAC:1,VON:2},skills:{pontaria:3,canalizacao:3,resistencia:2,folego:1,percepcao:2,ciencia:1,coragem:1,investigacao:1,acrobacia:1}};
 const powers=[{name:'Rajada',effect:'dano',grade:3,modifiers:{distancia:true},matrix:'solar'},
 {name:'Clarão',effect:'influencia',grade:3,modifiers:{distancia:true},alternate:true,matrix:'solar'},
 {effect:'protecao',grade:2},{effect:'movimento',grade:2},{effect:'sensoriamento',grade:2},{effect:'absorcao',grade:3}];
 const s=summarizeActor(a,powers);assert.equal(s.ppSpent,26);assert.equal(s.skillSpent,15);assert.equal(s.attrSpent,9);assert.equal(s.pvMax,15);assert.deepEqual(s.warnings,[]);
});
test('alternate needs matrix and primary within full price limit',()=>{
 const s=summarizeActor({tier:'heroica'},[{name:'Errado',effect:'dano',grade:4,alternate:true,matrix:'solar'}]);
 assert.ok(s.warnings.some(x=>x.includes('modo principal')));
});
