(async()=>{
  if(typeof process.env.API_SERVER_EXTERNAL=="string"&&process.env.API_SERVER_EXTERNAL.indexOf(/api\.glitch\./i)!=-1&&(await require('node-fetch')(`https://api.glitch.com/projects/${process.env.PROJECT_ID}`).then(_=>_.json())).appType=="generated_static"){
    process.env.API_SERVER_EXTERNAL="";require("./build.js");process.exit(0)
  }
})()
const express=require("express");const app=express();
const extMap=require("./ext_map.js");const fs=require("fs")


Object.keys(extMap).forEach(ext=>{const Ext=extMap[ext]
	app.engine(ext,async function(file,options,callback){
		try{
			return callback(null, Ext.cast(fs.readFileSync(file).toString()));
		}catch(e){return callback(e);}
	})
})
app.set("views","./public")
app.set("view engine","md")

app.use("/_",express.static("public"));

app.get("/",(request,response)=>{response.render("index");});
app.get(/\/.+/gs,(req,res)=>{
	let path=req.baseUrl.slice(req.baseUrl.lastIndexOf('/',1))
	if(fs.existsSync(`public/${path}.md`))res.render(path);
	else res.status(404).send("Error 404")
});

const listener=app.listen(process.env.PORT,()=>{
	console.log("Hosting at port "+listener.address().port);
});
