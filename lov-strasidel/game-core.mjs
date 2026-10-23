export const DURATION=25000;
export const COUNTDOWN=3000;
export const TOTAL=15;
export const STORAGE_KEY='pmd-halloween-hunt-v3';
export const BONUSES=[{id:'shipping',name:'Doprava zdarma',suffix:'D'},{id:'gift',name:'Dárek navíc',suffix:'G'}];
export const TIERS=[{min:0,percent:5,code:'HALLOWEEN5',title:'I odvaha se počítá. Každá výprava začíná prvním krokem.'},{min:5,percent:10,code:'HALLOWEEN10',title:'Šikovný stopař! Strašidla se před tvým zrakem jen tak neschovají.'},{min:9,percent:15,code:'HALLOWEEN15',title:'Lovec záhad! Na tenhle úlovek můžeš být hrdý/á.'},{min:13,percent:20,code:'HALLOWEEN20',title:'Mistr halloweenu! V našem obchůdku před tebou skoro nic neuteče.'}];
export function tierFor(score){return [...TIERS].reverse().find(t=>score>=t.min)||TIERS[0]}
export const MAX_ATTEMPTS=3;
export const VARIANT_COUNT=5;
export function makeSession(now,id,variant=0){return {v:3,id,variant,startsAt:now+COUNTDOWN,deadline:now+COUNTDOWN+DURATION,found:[],bonuses:[],done:false}}
export function validSession(v){return !!v&&v.v===3&&Number.isInteger(v.variant)&&v.variant>=0&&v.variant<VARIANT_COUNT&&typeof v.id==='string'&&Number.isFinite(v.startsAt)&&Number.isFinite(v.deadline)&&v.deadline-v.startsAt===DURATION&&Array.isArray(v.found)&&v.found.every(n=>Number.isInteger(n)&&n>=0&&n<TOTAL)&&new Set(v.found).size===v.found.length&&Array.isArray(v.bonuses)&&v.bonuses.every(id=>BONUSES.some(b=>b.id===id))&&new Set(v.bonuses).size===v.bonuses.length&&typeof v.done==='boolean'}
export function remaining(s,now){return Math.max(0,Math.min(DURATION,s.deadline-now))}
export function complete(s){return s.found.length===TOTAL&&s.bonuses.length===BONUSES.length}
function active(s,now){return !s.done&&now>=s.startsAt&&now<s.deadline}
export function catchGhost(s,id,now){if(!active(s,now)||!Number.isInteger(id)||id<0||id>=TOTAL||s.found.includes(id))return false;s.found.push(id);if(complete(s))s.done=true;return true}
export function catchBonus(s,id,now){if(!active(s,now)||!BONUSES.some(b=>b.id===id)||s.bonuses.includes(id))return false;s.bonuses.push(id);if(complete(s))s.done=true;return true}
export function rewardCode(s){const suffix=BONUSES.filter(b=>s.bonuses.includes(b.id)).map(b=>b.suffix).join('');return tierFor(s.found.length).code+(suffix?'-'+suffix:'')}
export function nextTier(score){return TIERS.find(t=>t.min>score)||null}

export function shuffledVariants(random=Math.random){const ids=Array.from({length:VARIANT_COUNT},(_,i)=>i);for(let i=ids.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[ids[i],ids[j]]=[ids[j],ids[i]]}return ids}
export function makeCampaign(now,id,order=shuffledVariants()){const g={v:3,id,order:[...order],attempt:1,locked:false,current:makeSession(now,id+'-1',order[0])};if(!validCampaign(g))throw new Error('Invalid campaign order');return g}
export function validCampaign(g){return !!g&&g.v===3&&typeof g.id==='string'&&Array.isArray(g.order)&&g.order.length===VARIANT_COUNT&&g.order.every(n=>Number.isInteger(n)&&n>=0&&n<VARIANT_COUNT)&&new Set(g.order).size===VARIANT_COUNT&&Number.isInteger(g.attempt)&&g.attempt>=1&&g.attempt<=MAX_ATTEMPTS&&typeof g.locked==='boolean'&&validSession(g.current)&&g.current.variant===g.order[g.attempt-1]&&(!g.locked||g.current.done)}
export function settleCampaign(g){g.current.done=true;if(g.attempt===MAX_ATTEMPTS)g.locked=true;return g}
export function acceptCampaign(g){if(!g.current.done||g.locked)return false;g.locked=true;return true}
export function retryCampaign(g,now){if(!g.current.done||g.locked||g.attempt>=MAX_ATTEMPTS)return false;g.attempt++;g.current=makeSession(now,g.id+'-'+g.attempt,g.order[g.attempt-1]);return true}
export function finalCode(g){return g.locked&&g.current.done?rewardCode(g.current):null}
