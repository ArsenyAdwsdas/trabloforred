const express=require("express");const app=express();
const fs=require('fs');
const md=new(require('markdown-it'))({html:true});


//the victim .html to replace stuff
const templatePath="public/base.html";
//lists all that gets replaced once to make page assembly faster
const splitrs=["{[title]}","{[head]}","{[transit1]}","{[content]}","{[transit2]}","{[foot]}"]

const form=[]{
	const s=fs.readFileSync(templatePath).toString(),I=0
	for(let i=0;i<splitrs.length;i++){
		const _=s.indexOf(splitrs[i],I)
		if(I>_){console.log(`Search for "${splitrs[i]}" failed.`);splitrs.splice(i,1);i--}
		else{form.push(s.slice(_));I=_+splitrs[i].length}
	}form.push(s.slice(I))
}
app.engine("md",async function(file,options,callback){
	try{
		let cont=fs.readFileSync(file).toString()
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
		return callback(null, l.join(""));
	}catch(e){
	return callback(e);
  }
})
app.set("views","./public")
app.set("view engine","md")

app.use(["/public","//","/raw"],express.static("public"));

app.get("/",(request,response)=>{response.render("index");});
app.get(/\/.+/gs,(req,res)=>{
	let path=req.baseUrl.slice(req.baseUrl.find('/',1))
	if(fs.existsSync(`public/${path}.md`))res.render(path);
	else res.status(404).send("Error 404")
});

const listener=app.listen(process.env.PORT,()=>{
	console.log("Your app is listening on port "+listener.address().port);
});
