const CONSENT='Chci dostávat newslettery Pro malé dobrodruhy s novinkami, tipy a nabídkami. Souhlas mohu kdykoliv odvolat na obchod@promaledobrodruhy.cz.';
const json=(value,status=200,extra={})=>new Response(JSON.stringify(value),{status,headers:{'Content-Type':'application/json;charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...extra}});
async function hash(value){return [...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value)))].map(x=>x.toString(16).padStart(2,'0')).join('')}
async function registered(request,env){const token=request.headers.get('Cookie')?.match(/(?:^|;\s*)hunt_session=([a-f0-9]{64})(?:;|$)/)?.[1];if(!token)return false;return !!await env.DB.prepare('SELECT id FROM participants WHERE session_hash = ? AND registered_at > ? LIMIT 1').bind(await hash(token),new Date(Date.now()-7*86400000).toISOString()).first()}
export async function handle(request,env){const url=new URL(request.url);
if(url.hostname==='pmd-halloweensky-lov-strasidel.stepanka-kadlecova.chatgpt.site'&&['GET','HEAD'].includes(request.method)&&!url.pathname.startsWith('/api/')){url.hostname='halloween.promaledobrodruhy.cz';url.protocol='https:';return new Response(null,{status:302,headers:{Location:url.href,'Cache-Control':'no-store'}})}
if(url.pathname==='/api/session'){if(request.method!=='GET')return json({error:'Method'},405);return json({registered:await registered(request,env)})}
if(url.pathname==='/api/register'){
 if(request.method!=='POST')return json({error:'Method'},405);
 if(request.headers.get('Origin')!==url.origin)return json({error:'Origin'},403);
 if(!request.headers.get('Content-Type')?.startsWith('application/json'))return json({error:'Format'},415);
 const text=await request.text();if(text.length>2048)return json({error:'Size'},413);let body;try{body=JSON.parse(text)}catch{return json({error:'JSON'},400)}
 const email=typeof body.email==='string'?body.email.trim().toLowerCase():'';
 if(email.length>254||!/^\S+@[^\s@]+\.[^\s@]+$/.test(email)||body.newsletter!==true||body.website)return json({error:'Vyplň email a souhlas.'},400);
 if(await registered(request,env))return json({ok:true});
 const recent=await env.DB.prepare('SELECT COUNT(*) AS count FROM participants WHERE email = ? AND registered_at > ?').bind(email,new Date(Date.now()-3600000).toISOString()).first();if(recent.count>=5)return json({error:'Zkus později'},429);
 const token=[...crypto.getRandomValues(new Uint8Array(32))].map(x=>x.toString(16).padStart(2,'0')).join('');
 await env.DB.prepare('INSERT INTO participants (id,email,newsletter_consent,consent_text,consent_version,registered_at,session_hash,email_verified) VALUES (?,?,?,?,?,?,?,?)').bind(crypto.randomUUID(),email,1,CONSENT,'2026-10-31-v1',new Date().toISOString(),await hash(token),0).run();
 return json({ok:true},201,{'Set-Cookie':`hunt_session=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=604800`});
}
if(url.pathname.startsWith('/api/'))return json({error:'Not found'},404);
if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405});
const item=ASSETS[url.pathname==='/'?'/index.html':url.pathname];if(!item)return new Response('Not found',{status:404});
const bytes=Uint8Array.from(atob(item.body),c=>c.charCodeAt(0));return new Response(request.method==='HEAD'?null:bytes,{headers:{'Content-Type':item.type,'Cache-Control':url.pathname.startsWith('/assets/')?'public,max-age=31536000,immutable':'no-cache','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin'}})
}
export default {async fetch(request,env){try{return await handle(request,env)}catch{return json({error:'Uložení se nepodařilo. Zkus to prosím znovu.'},503)}}};
