const fs=require('fs');
const body=process.env.ISSUE_BODY||'';
function field(name){const m=body.match(new RegExp('### '+name+'\\s*\\n([\\s\\S]*?)(?=\\n### |$)'));return m?m[1].trim():'';}
const title=field('Article title'),category=field('Category'),article=field('Article');
if(!title||!article||title==='_No response_'||article==='_No response_')throw Error('Missing article data');
const allowed=['Human Behavior','AI Confessions','Internet Chaos','System Errors','Technology'];
if(!allowed.includes(category))throw Error('Invalid category');
const path='articles.json',items=fs.existsSync(path)?JSON.parse(fs.readFileSync(path,'utf8')):[];
const id=Number(process.env.ISSUE_NUMBER);
if(items.some(x=>x.id===id)){console.log('Already published');process.exit(0);}
items.unshift({id,title:title.slice(0,180),category,body:article.slice(0,30000),date:new Date().toISOString().slice(0,10),author:'GLITCH'});
fs.writeFileSync(path,JSON.stringify(items,null,2)+'\n');
