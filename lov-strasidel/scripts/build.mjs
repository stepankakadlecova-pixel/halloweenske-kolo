import {readFile,writeFile,mkdir} from 'node:fs/promises';
const assets={};const types={html:'text/html;charset=utf-8',css:'text/css;charset=utf-8',js:'text/javascript;charset=utf-8',mjs:'text/javascript;charset=utf-8'};
for(const name of ['index.html','popup.html','style.css','app.js','stats.js','game-core.mjs','layouts.mjs','foreground.mjs'])assets['/'+name]={type:types[name.split('.').pop()],body:(await readFile(name)).toString('base64')};
for(const name of ['shop-v1.webp','shop-preview-v1.webp','logo-v1.webp','dobrodruh-v1.webp'])assets['/'+name]={type:'image/webp',body:(await readFile('optimized-assets/'+name+'.b64','utf8')).trim()};
await mkdir('dist/server',{recursive:true});await mkdir('dist/.openai',{recursive:true});await writeFile('dist/server/index.js','const ASSETS='+JSON.stringify(assets)+';\n'+await readFile('worker/index.js','utf8'));await writeFile('dist/.openai/hosting.json',await readFile('.openai/hosting.json'));console.log('Built Worker with optimized assets');
