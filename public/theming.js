function getCookie(name){
  const value = `; ${document.cookie}`;
  const parts=value.split(`; ${name}=`);
  if(parts.length===2)return parts.pop().split(';').shift();
}
if(getCookie("theme")===undefined)document.cookie=`theme=${+(window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches)}0;`
const trabloforred=["00","10","01","11"].map(e=>()=>{
  const theme=getCookie("theme")
  if(theme[0]!=e[0])(e[0]==1?document.body.classList.add("blindEm"):document.body.classList.remove("blindEm"))
  if(theme[1]!=e[1])(e[1]==1?document.body.classList.add("dryEm"):document.body.classList.remove("dryEm"))
  document.cookie=`theme=${e}`
})
{
  function handle(e){
    for(let i=0;i<4;i++)e.innerHTML+=(`<button onclick="trabloforred[${i}]()" class="${['defaultEm','blindEm','dryEm','blindEm dryEm'][i]}">${(i&1)?"light":"dark"} ${(i&2)?"dry":"normal"}</button>`)
  }
  const button = document.querySelectorAll(".setThemes").forEach(handle)
}