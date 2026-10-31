/* Best-effort aggregate counters. This script never controls gameplay or sends visitor IDs. */
(()=>{try{
 const seen=new Set(),activeRounds=new Set();let revealClicked=false;
 function record(event,key){try{
  const marker='pmd-hunt-counted-v1:'+event+':'+key;
  if(seen.has(marker)||localStorage.getItem(marker))return;
  seen.add(marker);localStorage.setItem(marker,'1');
  void fetch('/api/stats',{method:'POST',credentials:'omit',keepalive:true,headers:{'Content-Type':'application/json'},body:JSON.stringify({event})}).catch(()=>{});
 }catch{}}
 function inspect(){try{
  const g=JSON.parse(localStorage.getItem('pmd-halloween-hunt-v6')||'null');
  if(!g||typeof g.id!=='string'||!g.current||typeof g.current.id!=='string')return;
  const round=g.current,screen=document.body.dataset.screen;
  if(screen==='play'&&!round.done&&round.deadline>Date.now()){
   activeRounds.add(round.id);record('game_start',g.id);
  }
  if(screen==='results'&&round.done){
   if(activeRounds.has(round.id))record('attempt_complete',round.id);
   if(g.locked&&(activeRounds.has(round.id)||revealClicked))record('code_reveal',g.id);
   revealClicked=false;
  }
 }catch{}}
 document.addEventListener('click',event=>{try{if(event.target.closest('#accept'))revealClicked=true}catch{}},true);
 new MutationObserver(inspect).observe(document.body,{attributes:true,attributeFilter:['data-screen']});
 inspect();
}catch{}})();
