const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch({});
const p=await b.newPage({viewport:{width:480,height:900}});
require('fs').mkdirSync('dist',{recursive:true});await p.goto('file://'+process.cwd()+'/index.html');await p.waitForTimeout(1500);
await p.evaluate(()=>{document.querySelectorAll('details').forEach(d=>d.open=true);document.querySelectorAll('.share,.nav').forEach(e=>e.style.display='none');document.documentElement.setAttribute('data-theme','light');});
await p.pdf({path:'dist/나고야_숙소비교.pdf',width:'480px',height:'900px',printBackground:true,margin:{top:'16px',bottom:'16px',left:'0',right:'0'}});
await b.close();})();
