import { ATTRIBUTES, SKILLS, EFFECTS, MODIFIERS, TIERS, CONDITIONS, clamp, rollPool, powerCost, summarizeActor } from './rules.mjs';

const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2, ItemSheetV2 } = foundry.applications.sheets;
let importedCatalog = [];
const PAGES = ['IDENTIDADE', 'ATRIBUTOS', 'PODERES', 'COMBATE', 'DOSSIÊ SOLIS'];

function safeText(value) { return foundry.utils.escapeHTML(String(value??'')); }

class RendezvousActorSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ['rendezvous','sheet','actor','rdv-comic-shell'],
    tag:'form',position:{width:950,height:850},
    window:{resizable:true,title:'RENDEZVOUS • Ficha em Quadrinhos'},
    form:{submitOnChange:true,closeOnSubmit:false},
  };
  static PARTS = { book: { template:'systems/rendezvous-rpg/templates/actor-book.hbs' } };
  constructor(options={}) {super(options);this._rdvPage=0;}
  async _prepareContext(options) {
    const context=await super._prepareContext(options);
    const system=this.actor.system;
    const powerItems=this.actor.items.filter(i=>i.type==='power');
    const calculated=summarizeActor(system,powerItems);
    context.actor=this.actor;
    context.system=system;
    context.name=this.actor.name;
    context.img=this.actor.img;
    context.editable=this.isEditable;
    context.attributes=ATTRIBUTES.map(([id,label])=>({id,label,value:system.attributes?.[id]??1}));
    context.skills=SKILLS.map(([id,label,attribute])=>({id,label,attribute,value:system.skills?.[id]??0}));
    context.powers=powerItems.map(item=>({...item.toObject(),id:item.id,displayCost:powerCost(item.system).cost,costWarnings:powerCost(item.system).warnings.join(' ')}));
    context.equipment=this.actor.items.filter(i=>i.type==='equipment').map(i=>({id:i.id,name:i.name,system:i.system}));
    context.conditions=CONDITIONS.map(([id,label])=>({id,label,checked:!!system.conditions?.[id]}));
    context.tiers=Object.entries(TIERS).map(([id,v])=>({id,label:v.label,selected:system.tier===id}));
    context.calculated=calculated;
    context.pageNames=PAGES;
    context.pv=system.resources?.pv??calculated.pvMax;
    context.catalog=importedCatalog.map(t=>({id:t.id,label:`${t.name} — ${t.referenceCost} PP (${t.sourceVersion})`}));
    context.currentPage=this._rdvPage;
    return context;
  }
  _onRender(context, options) {
    super._onRender(context,options);
    const root=this.element.querySelector('.rdv-book'); if(!root)return;
    const show=(next,animate=true)=>{
      const target=Math.max(0,Math.min(PAGES.length-1,next));
      if(this._rdvPage===target){this.#updatePages(root);return;}
      const old=this._rdvPage;
      const source=root.querySelectorAll('.rdv-comic-page')[old];
      if(animate && source){
        const ghost=source.cloneNode(true);
        ghost.classList.add('rdv-turning', target>old?'is-turning-forward':'is-turning-backward');
        ghost.setAttribute('aria-hidden','true');ghost.inert=true;
        ghost.querySelectorAll('[name]').forEach(node=>node.removeAttribute('name'));
        root.querySelector('.rdv-pages').appendChild(ghost);
        window.setTimeout(()=>ghost.remove(),530);
      }
      this._rdvPage=target;
      this.#updatePages(root);
    };
    root.querySelectorAll('[data-rdv-image-picker]').forEach(element => element.addEventListener('click', async event => {
      event.preventDefault();
      if (!this.isEditable) return;
      const picker = new foundry.applications.apps.FilePicker({
        type: 'image',
        current: this.actor.img || 'icons/svg/mystery-man.svg',
        callback: async path => {
          await this.actor.update({img: path});
          ui.notifications.info(`Imagem de ${this.actor.name} atualizada.`);
        }
      });
      await picker.browse();
    }));
    root.querySelectorAll('[data-page-go]').forEach(el=>el.addEventListener('click',()=>show(Number(el.dataset.pageGo))));
    root.querySelectorAll('[data-page-next]').forEach(el=>el.addEventListener('click',()=>show(this._rdvPage+1)));
    root.querySelectorAll('[data-page-prev]').forEach(el=>el.addEventListener('click',()=>show(this._rdvPage-1)));
    root.addEventListener('keydown',e=>{
      if(['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName))return;
      if(e.key==='ArrowRight'){e.preventDefault();show(this._rdvPage+1)}
      if(e.key==='ArrowLeft'){e.preventDefault();show(this._rdvPage-1)}
    });
    root.querySelectorAll('[data-roll-attr]').forEach(el=>el.addEventListener('click',async()=>{
      const attr=el.dataset.rollAttr;await this.#roll(attr,null,`${attr}`);
    }));
    root.querySelectorAll('[data-roll-skill]').forEach(el=>el.addEventListener('click',async()=>{
      const skill=el.dataset.rollSkill, attr=el.dataset.rollWith;
      await this.#roll(attr,skill,`${SKILLS.find(s=>s[0]===skill)?.[1]??skill} (${attr})`);
    }));
    root.querySelectorAll('[data-power-roll]').forEach(el=>el.addEventListener('click',async()=>{
      const item=this.actor.items.get(el.dataset.powerRoll);if(!item)return;
      const control=['controle','influencia','neutralizacao'].includes(item.system.effect);
      await this.#roll(control?'VON':'AGI',control?'canalizacao':'pontaria',`${item.name} • G${item.system.grade}`);
    }));
    root.querySelectorAll('[data-import-power]').forEach(el=>el.addEventListener('click',async()=>{
      if(!this.isEditable)return;
      const select=root.querySelector('[data-catalog-select]');
      const entry=importedCatalog.find(t=>t.id===select?.value);if(!entry)return;
      const created=await this.actor.createEmbeddedDocuments('Item',[{name:entry.name,type:'power',system:{
        effect:entry.effect,grade:entry.grade,modifiers:entry.modifiers,limitation:entry.limitation,
        description:entry.description,countermeasure:entry.countermeasure,source:'Alteração Solis'
      }}]);
      if(created?.[0])ui.notifications.info(`${entry.name} importada para ${this.actor.name}.`);
    }));
    root.querySelectorAll('[data-create-type]').forEach(el=>el.addEventListener('click',async()=>{
      if(!this.isEditable)return;
      const type=el.dataset.createType;
      const created=await this.actor.createEmbeddedDocuments('Item',[{name:type==='power'?'Nova Técnica':'Novo Equipamento',type}]);
      if(created?.[0]) created[0].sheet.render({force:true});
    }));
    root.querySelectorAll('[data-item-edit]').forEach(el=>el.addEventListener('click',()=>this.actor.items.get(el.dataset.itemEdit)?.sheet.render({force:true})));
    root.querySelectorAll('[data-item-delete]').forEach(el=>el.addEventListener('click',async()=>{
      if(!this.isEditable)return;
      const item=this.actor.items.get(el.dataset.itemDelete);if(!item)return;
      if(await foundry.applications.api.DialogV2.confirm({window:{title:'Excluir'},content:`Excluir ${safeText(item.name)}?`}))await item.delete();
    }));
    root.querySelectorAll('[data-reset-reaction]').forEach(el=>el.addEventListener('click',()=>this.actor.update({'system.resources.reactionUsed':false})));
    this.#updatePages(root);
  }
  #updatePages(root){
    root.querySelectorAll('.rdv-comic-page').forEach((el,i)=>{el.classList.toggle('is-active',i===this._rdvPage);el.setAttribute('aria-hidden',i===this._rdvPage?'false':'true');el.inert=i!==this._rdvPage;});
    root.querySelectorAll('[data-page-go]').forEach(el=>el.setAttribute('aria-current',Number(el.dataset.pageGo)===this._rdvPage?'page':'false'));
    const current=root.querySelector('[data-current-page]');if(current)current.textContent=`${String(this._rdvPage+1).padStart(2,'0')} / ${String(PAGES.length).padStart(2,'0')}`;
    const prev=root.querySelector('[data-page-prev]'),next=root.querySelector('[data-page-next]');
    if(prev)prev.disabled=this._rdvPage===0;if(next)next.disabled=this._rdvPage===PAGES.length-1;
  }
  async #roll(attr,skill,label){
    const a=Number(this.actor.system.attributes?.[attr]??1),s=skill?Number(this.actor.system.skills?.[skill]??0):0;
    const pool=clamp(a+s,0,10);if(pool===0){ui.notifications.warn('Reserva de 0d6.');return;}
    const roll=await new Roll(`${pool}d6`).evaluate();
    const dice=roll.dice.flatMap(d=>d.results.map(r=>r.result));
    const result=rollPool(pool,dice);
    const flavor=`${safeText(this.actor.name)} — ${safeText(label)}: ${result.successes} sucesso(s), ${result.impulses} Ímpeto(s) (somente se o teste for bem-sucedido).`;
    await roll.toMessage({speaker:ChatMessage.getSpeaker({actor:this.actor}),flavor});
  }
}

class RendezvousItemSheet extends HandlebarsApplicationMixin(ItemSheetV2) {
  static DEFAULT_OPTIONS={classes:['rendezvous','sheet','item','rdv-item'],tag:'form',position:{width:570,height:680},window:{resizable:true},form:{submitOnChange:true,closeOnSubmit:false}};
  static PARTS={book:{template:'systems/rendezvous-rpg/templates/item-sheet.hbs'}};
  async _prepareContext(options){
    const context=await super._prepareContext(options);
    context.item=this.item;context.system=this.item.system;
    context.isPower=this.item.type==='power';context.editable=this.isEditable;
    context.effects=Object.entries(EFFECTS).map(([id,e])=>({id,label:e.label,selected:this.item.system.effect===id}));
    context.modifiers=Object.entries(MODIFIERS).map(([id,e])=>({id,label:e.label,checked:!!this.item.system.modifiers?.[id]}));
    context.calculated=powerCost(this.item.system);
    return context;
  }
}
Hooks.once('ready',async()=>{try{const res=await fetch('systems/rendezvous-rpg/data/catalogo-140.json');if(res.ok)importedCatalog=(await res.json()).techniques??[];}catch(e){console.warn('RENDEZVOUS | catálogo não carregado',e)}});
Hooks.once('init',()=>{
  Handlebars.registerHelper('inc',value=>Number(value)+1);
  Handlebars.registerHelper('eq',(a,b)=>a===b);
  const register=foundry.applications.apps.DocumentSheetConfig.registerSheet;
  register(Actor,'rendezvous-rpg',RendezvousActorSheet,{types:['hero','npc'],makeDefault:true,label:'RENDEZVOUS — Gibi'});
  register(Item,'rendezvous-rpg',RendezvousItemSheet,{types:['power','equipment'],makeDefault:true,label:'RENDEZVOUS — Técnica'});
  console.info('RENDEZVOUS | Sistema Alfa 0.8 carregado: ficha em páginas de quadrinhos');
});
