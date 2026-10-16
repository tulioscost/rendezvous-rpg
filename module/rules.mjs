/** RENDEZVOUS rules engine, Alfa 0.7. Pure functions work in Foundry and in Node. */
export const ATTRIBUTES = Object.freeze([
  ['FOR', 'Força'], ['AGI', 'Agilidade'], ['ROB', 'Robustez'],
  ['CAR', 'Carisma'], ['MOR', 'Moral'], ['FIB', 'Fibra'],
  ['INT', 'Intelecto'], ['RAC', 'Raciocínio'], ['VON', 'Vontade']
]);
export const SKILLS = Object.freeze([
  ['luta','Luta','FOR'], ['atletismo','Atletismo','FOR'], ['contencao','Contenção','FOR'],
  ['pontaria','Pontaria','AGI'], ['acrobacia','Acrobacia','AGI'], ['furtividade','Furtividade','AGI'],
  ['resistencia','Resistência','ROB'], ['folego','Fôlego','ROB'], ['sobrevivencia','Sobrevivência','ROB'],
  ['persuasao','Persuasão','CAR'], ['enganacao','Enganação','CAR'], ['inspiracao','Inspiração','CAR'],
  ['coragem','Coragem','MOR'], ['lideranca','Liderança','MOR'], ['integridade','Integridade','MOR'],
  ['autocontrole','Autocontrole','FIB'], ['disciplina','Disciplina','FIB'], ['persistencia','Persistência','FIB'],
  ['ciencia','Ciência','INT'], ['engenharia','Engenharia','INT'], ['medicina','Medicina','INT'],
  ['investigacao','Investigação','RAC'], ['percepcao','Percepção','RAC'], ['estrategia','Estratégia','RAC'],
  ['canalizacao','Canalização','VON'], ['tenacidade','Tenacidade','VON'], ['sensibilidade','Sensibilidade','VON']
]);
export const EFFECTS = Object.freeze({
  dano: {label:'Dano', base:2}, protecao:{label:'Proteção',base:2}, movimento:{label:'Movimento',base:1},
  controle:{label:'Controle',base:2}, criacao:{label:'Criação',base:2}, alteracao:{label:'Alteração',base:3},
  sensoriamento:{label:'Sensoriamento',base:1}, restauracao:{label:'Restauração',base:2},
  influencia:{label:'Influência',base:2}, invocacao:{label:'Invocação',base:3},
  ampliacao:{label:'Ampliação Física',base:2}, absorcao:{label:'Absorção',base:2},
  ocultacao:{label:'Ocultação',base:2}, neutralizacao:{label:'Neutralização',base:3}
});
export const MODIFIERS = Object.freeze({
  distancia:{label:'À distância',cost:1}, area:{label:'Área',cost:2}, seletivo:{label:'Seletivo',cost:1},
  sustentado:{label:'Sustentado',cost:1}, reacao:{label:'Reação',cost:1}, perfurante:{label:'Perfurante',cost:1}
});
export const TIERS = Object.freeze({urbana:{label:'Urbana',pp:16,rank:2},heroica:{label:'Heroica',pp:26,rank:4},lendaria:{label:'Lendária',pp:38,rank:6}});
export const CONDITIONS = Object.freeze([['ferido','Ferido'],['contido','Contido'],['desorientado','Desorientado'],['vulneravel','Vulnerável'],['incapacitado','Incapacitado'],['interferencia','Interferência']]);
export function clamp(value,min,max) { const n=Number(value); return Number.isFinite(n)?Math.min(max,Math.max(min,n)):min; }
export function rollPool(pool, faces) {
  const count=clamp(pool,0,10);
  const dice=Array.from({length:count},(_,i)=>faces?.[i] ?? (Math.floor(Math.random()*6)+1));
  return {pool:count,dice,successes:dice.filter(v=>v>=5).length,impulses:dice.filter(v=>v===6).length};
}
export function powerCost(power={}) {
  const effect=EFFECTS[power.effect]??EFFECTS.dano;
  const grade=clamp(power.grade??1,1,6);
  const mods=power.modifiers??{};
  const warnings=[];
  if(mods.seletivo&&!mods.area) warnings.push('Seletivo exige Área.');
  if(mods.perfurante&&power.effect!=='dano') warnings.push('Perfurante só é admitido em Dano.');
  if(mods.reacao&&!['movimento','criacao','neutralizacao'].includes(power.effect)) warnings.push('Reação limitada a Movimento defensivo, Criação de barreira ou Neutralização pontual.');
  if(mods.distancia&&['protecao','sensoriamento'].includes(power.effect)) warnings.push('Distância não é padrão para Proteção ou Sensoriamento pessoal.');
  const extras=Object.entries(MODIFIERS).reduce((n,[key,m])=>n+(mods[key]?m.cost:0),0);
  const limitation=power.limitation ? 1:0;
  const fixed=clamp(power.fixedCost??0,0,100);
  const full=grade*Math.max(1,effect.base+extras-limitation)+fixed;
  const isAlternate=Boolean(power.alternate);
  const cost=isAlternate ? Math.max(3,Math.ceil(full/4)):full;
  return {grade,full,cost,alternate:isAlternate,warnings};
}
export function summarizeActor(actorSystem={}, powers=[]) {
  const tier=TIERS[actorSystem.tier]??TIERS.heroica;
  const attrs=actorSystem.attributes??{};
  const skills=actorSystem.skills??{};
  const attrSpent=ATTRIBUTES.reduce((n,[id])=>n+Math.max(0,Number(attrs[id]??1)-1),0);
  const skillSpent=SKILLS.reduce((n,[id])=>n+Number(skills[id]??0),0);
  const ppSpent=powers.reduce((n,p)=>n+powerCost(p.system??p).cost,0);
  const invalidRanks=powers.filter(p=>Number((p.system??p).grade)>tier.rank).map(p=>p.name);
  const matrixProblems=[];
  const groups=new Map();
  for(const p of powers){const x=p.system??p;const key=String(x.matrix??'').trim().toLowerCase();
    if(x.alternate&&!key)matrixProblems.push(`${p.name??'Técnica'}: modo alternativo sem matriz.`);
    if(key){if(!groups.has(key))groups.set(key,[]);groups.get(key).push(p);}
  }
  for(const [matrix,arr] of groups){
    const main=arr.filter(p=>!(p.system??p).alternate);
    const alts=arr.filter(p=>(p.system??p).alternate);
    if(alts.length>2)matrixProblems.push(`Matriz ${matrix}: mais de dois modos alternativos.`);
    if(alts.length&&main.length!==1)matrixProblems.push(`Matriz ${matrix}: exige exatamente um modo principal.`);
    if(main.length===1){const max=powerCost(main[0].system??main[0]).full;
      for(const p of alts){if(powerCost(p.system??p).full>max)matrixProblems.push(`${p.name??'Técnica'}: custo integral maior que o modo principal da matriz ${matrix}.`);}
    }
  }
  return {tier,attrSpent,skillSpent,ppSpent,ppRemaining:tier.pp-ppSpent,invalidRanks,pvMax:clamp(attrs.ROB??1,1,6)*5,
    warnings:[...(attrSpent>9?['Atributos excedem 9 pontos adicionais.']:[]),...(skillSpent>15?['Perícias excedem 15 pontos iniciais.']:[]),...(ppSpent>tier.pp?['Orçamento de PP excedido.']:[]),...(invalidRanks.length?[`Graus excedem teto ${tier.rank}: ${invalidRanks.join(', ')}`]:[]),...matrixProblems]};
}
