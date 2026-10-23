export const DURATION=45000;
export const COUNTDOWN=3000;
export const TOTAL=15;
export const STORAGE_KEY='pmd-halloween-hunt-v1';
export const TIERS=[{min:0,percent:5,code:'HALLOWEEN5',title:'I odvaha se počítá. Každá výprava začíná prvním krokem.'},{min:5,percent:10,code:'HALLOWEEN10',title:'Šikovný stopař! Strašidla se před tvým zrakem jen tak neschovají.'},{min:9,percent:15,code:'HALLOWEEN15',title:'Lovec záhad! Na tenhle úlovek můžeš být hrdý/á.'},{min:13,percent:20,code:'HALLOWEEN20',title:'Mistr halloweenu! V našem obchůdku před tebou skoro nic neuteče.'}];
export function tierFor(score){return [...TIERS].reverse().find(t=>score>=t.min)||TIERS[0]}
export function makeSession(now,id){return {v:1,id,startsAt:now+COUNTDOWN,deadline:now+COUNTDOWN+DURATION,found:[],done:false}}
export function validSession(value){return !!value&&value.v===1&&typeof value.id==='string'&&Number.isFinite(value.startsAt)&&Number.isFinite(value.deadline)&&value.deadline-value.startsAt===DURATION&&Array.isArray(value.found)&&value.found.every(n=>Number.isInteger(n)&&n>=0&&n<TOTAL)&&new Set(value.found).size===value.found.length&&typeof value.done==='boolean'}
export function remaining(session,now){return Math.max(0,Math.min(DURATION,session.deadline-now))}
export function catchGhost(session,id,now){if(session.done||now<session.startsAt||now>=session.deadline||!Number.isInteger(id)||id<0||id>=TOTAL||session.found.includes(id))return false;session.found.push(id);if(session.found.length===TOTAL)session.done=true;return true}
export function nextTier(score){return TIERS.find(t=>t.min>score)||null}
