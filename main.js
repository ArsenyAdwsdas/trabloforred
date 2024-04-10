const express=require("express");const app=express();
const extMap=require("ext_map.js");


Object.keys(extMap).forEach(ext=>{const Ext=extMap[ext]
	app.engine(ext,async function(file,options,callback){
		try{
			return callback(null, Ext.cast(fs.readFileSync(file).toString()));
		}catch(e){
		return callback(e);
	  }
	})
})
app.set("views","./public")
app.set("view engine","md")

app.use("/_",express.static("public"));

app.get("/",(request,response)=>{response.render("index");});
app.get(/\/.+/gs,(req,res)=>{
	let path=req.baseUrl.slice(req.baseUrl.find('/',1))
	if(fs.existsSync(`public/${path}.md`))res.render(path);
	else res.status(404).send("Error 404")
});

const listener=app.listen(process.env.PORT,()=>{
	console.log("Your app is listening on port "+listener.address().port);
});
