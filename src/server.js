const http = require('node:http');
const { URL } = require('node:url');

const jobs = [
  { id: 1, title: 'QA Automation Engineer', company: 'Northstar', remote: true, skills: ['Python', 'CI/CD', 'API'] },
  { id: 2, title: 'Software Test Engineer', company: 'Atlas', remote: true, skills: ['SQL', 'Regression', 'Linux'] },
  { id: 3, title: 'Onsite Support Technician', company: 'Metro', remote: false, skills: ['Windows'] }
];

const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>QualityWorks Job Explorer</title>
<style>body{font-family:Arial,sans-serif;max-width:760px;margin:40px auto;padding:0 18px;color:#17212b}label{display:block;font-weight:700;margin:18px 0 6px}input,select,button{font:inherit;padding:9px}input{width:100%;box-sizing:border-box}button{margin-top:16px;background:#174a7e;color:#fff;border:0;border-radius:4px}.job{border:1px solid #ccd5df;border-radius:6px;padding:12px;margin:12px 0}.muted{color:#586575}</style></head>
<body><main><h1>QualityWorks Job Explorer</h1><p class="muted">Deterministic demo application for UI and API automation.</p>
<form id="search-form"><label for="query">Search jobs</label><input id="query" name="query" placeholder="e.g. QA or Python">
<label for="arrangement">Work arrangement</label><select id="arrangement" name="arrangement"><option value="all">All</option><option value="remote">Remote only</option></select>
<button type="submit">Search</button></form><p id="status" role="status"></p><section id="results" aria-label="Job results"></section></main>
<script>
const form=document.querySelector('#search-form'),results=document.querySelector('#results'),status=document.querySelector('#status');
async function search(){const q=document.querySelector('#query').value.trim();const remote=document.querySelector('#arrangement').value==='remote';const params=new URLSearchParams({q,remote:String(remote)});const response=await fetch('/api/jobs?'+params);const data=await response.json();results.innerHTML=data.jobs.map(j=>'<article class="job"><h2>'+j.title+'</h2><p>'+j.company+'</p><p>'+j.skills.join(', ')+'</p><strong>'+(j.remote?'Remote':'Onsite')+'</strong></article>').join('');status.textContent=data.count+' job'+(data.count===1?'':'s')+' found';}
form.addEventListener('submit',e=>{e.preventDefault();search()});search();
</script></body></html>`;

function json(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(body));
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1:4173');
  if (url.pathname === '/api/health') return json(res, 200, { status: 'ok' });
  if (url.pathname === '/api/jobs') {
    const q = (url.searchParams.get('q') || '').toLowerCase();
    const remoteOnly = url.searchParams.get('remote') === 'true';
    const filtered = jobs.filter(job => {
      const searchable = [job.title, job.company, ...job.skills].join(' ').toLowerCase();
      return (!q || searchable.includes(q)) && (!remoteOnly || job.remote);
    });
    return json(res, 200, { count: filtered.length, jobs: filtered });
  }
  if (url.pathname.startsWith('/api/')) return json(res, 404, { error: 'Not found' });
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
});

server.listen(4173, '127.0.0.1', () => console.log('QualityWorks listening on http://127.0.0.1:4173'));
