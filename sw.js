const C="libro-negocio-v6",F=["./","index.html","admin.html","manifest.webmanifest","admin.webmanifest","icon-180.png","icon-512.png","admin-180.png","admin-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(F.map(u=>fetch(new Request(u,{cache:"reload"})).then(r=>r.ok&&c.put(u,r)).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const q=e.request;if(q.method!=="GET")return;const u=new URL(q.url);if(u.origin!==location.origin)return;
  const html=q.mode==="navigate"||/\.html$/.test(u.pathname)||/\/$/.test(u.pathname);
  if(html){e.respondWith((async()=>{const net=fetch(q,{cache:"no-store"}).then(r=>{if(r.ok){const c=r.clone();caches.open(C).then(x=>x.put(q,c))}return r});
    try{return await Promise.race([net,new Promise((_,j)=>setTimeout(j,3000))])}catch(err){const r=await caches.match(q)||await caches.match(u.pathname.endsWith("admin.html")?"admin.html":"index.html")||await caches.match("./");if(r){e.waitUntil(net.catch(()=>{}));return r}return net}})());return}
  e.respondWith(caches.match(q).then(r=>{const n=fetch(q).then(res=>{if(res.ok){const c=res.clone();caches.open(C).then(x=>x.put(q,c))}return res}).catch(()=>r);return r||n}))});
