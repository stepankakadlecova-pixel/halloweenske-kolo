export const DURATION=20000;
export const COUNTDOWN=3000;
export const TOTAL=15;
export const STORAGE_KEY='pmd-halloween-hunt-v6';
export const TIERS=[{"min": 0, "label": "5 %", "code": "BOJIMSE5", "minOrder": 800, "condition": "Na nákup od 800 Kč, nejvýše 500 Kč.", "title": "Každá výprava začíná odvahou."}, {"min": 3, "label": "100 Kč", "code": "BUBAK100", "minOrder": 1000, "condition": "Na nákup od 1 000 Kč.", "title": "První bubáci jsou v síti!"}, {"min": 6, "label": "10 %", "code": "STRASIDLO10", "minOrder": 1000, "condition": "Na nákup od 1 000 Kč, nejvýše 500 Kč.", "title": "Šikovný stopař!"}, {"min": 9, "label": "200 Kč", "code": "NETOPYR200", "minOrder": 1500, "condition": "Na nákup od 1 500 Kč.", "title": "Lovec záhad!"}, {"min": 12, "label": "15 %", "code": "POSTRACH15", "minOrder": 1500, "condition": "Na nákup od 1 500 Kč, nejvýše 500 Kč.", "title": "Mistr halloweenu!"}];
export function tierFor(score){return [...TIERS].reverse().find(t=>score>=t.min)||TIERS[0]}
export const MAX_ATTEMPTS=5;
export const VARIANT_COUNT=5;
export function makeSession(now,id,variant=0){return {v:6,id,variant,startsAt:now+COUNTDOWN,deadline:now+COUNTDOWN+DURATION,found:[],done:false}}
export function validSession(v){return !!v&&v.v===6&&Number.isInteger(v.variant)&&v.variant>=0&&v.variant<VARIANT_COUNT&&typeof v.id==='string'&&Number.isFinite(v.startsAt)&&Number.isFinite(v.deadline)&&v.deadline-v.startsAt===DURATION&&Array.isArray(v.found)&&v.found.every(n=>Number.isInteger(n)&&n>=0&&n<TOTAL)&&new Set(v.found).size===v.found.length&&typeof v.done==='boolean'}
export function remaining(s,now){return Math.max(0,Math.min(DURATION,s.deadline-now))}
export function complete(s){return s.found.length===TOTAL}
function active(s,now){return !s.done&&now>=s.startsAt&&now<s.deadline}
export function catchGhost(s,id,now){if(!active(s,now)||!Number.isInteger(id)||id<0||id>=TOTAL||s.found.includes(id))return false;s.found.push(id);if(complete(s))s.done=true;return true}
export function rewardCode(s){return tierFor(s.found.length).code}
export function nextTier(score){return TIERS.find(t=>t.min>score)||null}

export function shuffledVariants(random=Math.random){const ids=Array.from({length:VARIANT_COUNT},(_,i)=>i);for(let i=ids.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[ids[i],ids[j]]=[ids[j],ids[i]]}return ids}
export function makeCampaign(now,id,order=shuffledVariants()){const g={v:6,id,order:[...order],attempt:1,locked:false,current:makeSession(now,id+'-1',order[0])};if(!validCampaign(g))throw new Error('Invalid campaign order');return g}
export function validCampaign(g){return !!g&&g.v===6&&typeof g.id==='string'&&Array.isArray(g.order)&&g.order.length===VARIANT_COUNT&&g.order.every(n=>Number.isInteger(n)&&n>=0&&n<VARIANT_COUNT)&&new Set(g.order).size===VARIANT_COUNT&&Number.isInteger(g.attempt)&&g.attempt>=1&&g.attempt<=MAX_ATTEMPTS&&typeof g.locked==='boolean'&&validSession(g.current)&&g.current.variant===g.order[g.attempt-1]&&(!g.locked||g.current.done)}
export function settleCampaign(g){g.current.done=true;if(g.attempt===MAX_ATTEMPTS)g.locked=true;return g}
export function acceptCampaign(g){if(!g.current.done||g.locked)return false;g.locked=true;return true}
export function retryCampaign(g,now){if(!g.current.done||g.locked||g.attempt>=MAX_ATTEMPTS)return false;g.attempt++;g.current=makeSession(now,g.id+'-'+g.attempt,g.order[g.attempt-1]);return true}
export function finalCode(g){return g.locked&&g.current.done?rewardCode(g.current):null}
