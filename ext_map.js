const md=new(require('markdown-it'))({html:true});
const fs=require('fs');
//the victim .html to replace stuff for md
const templatePath="public/md.html";
//lists all that gets replaced once to make page assembly faster(probably)
const splitrs=["{[title]}","{[head]}","{[transit1]}","{[content]}","{[transit2]}","{[foot]}"]

const form=[];{
	const s=fs.readFileSync(templatePath).toString();let I=0
  console.log(s)
	for(let i=0;i<splitrs.length;i++){
		const _=s.indexOf(splitrs[i],I)
		if(I>_){console.log(`Search for "${splitrs[i]}" failed.`);splitrs.splice(i,1);i--}
		else{form.push(s.slice(_));I=_+splitrs[i].length}
	}form.push(s.slice(I))
}
module.exports={
  dirs:{
    build:"build",
    src:"public"
  },
	md:{
		ext:"html",
		cast:(cont)=>{
			//what to replace stuff with
			let o={
				"{[title]}":cont.startsWith('# ')?cont.slice(2).replace(/\n.+/s,""):"&lt;untitled&gt;",
				"{[head]}":"<a href=\"/\">Main page</a>",
				"{[transit1]}":"",
				"{[content]}":md.render(cont),
				"{[transit2]}":"",
				"{[foot]}":""
			}
			let l=[form[0]];for(let i=0;i<splitrs.length;i++)l.push(o[splitrs[i]]!=undefined?o[splitrs[i]]:"&lt;undefined&gt;",form[i+1])
			return l//.join("")
		}
	}
}
