const buildDir="build"
const srcDir="public"
const extMap=require("./ext_map.js")
const fs=require("fs")
if(!fs.existsSync(buildDir))fs.mkdirSync(buildDir)
if(!fs.existsSync(buildDir+"/_"))fs.mkdirSync(buildDir+"/_")
fs.readdirSync(`${buildDir}/_`).forEach(f=>{
	if(fs.existsSync(`${srcDir}/${f}`))return;
	fs.unlink(`${buildDir}/_/${f}`);
	const i=f.lastIndexOf('.');if(!i)return;
	const ext=extMap[f.slice(i+1)];if(ext)fs.unlink(`${buildDir}/${f.slice(0,i)}.${ext.ext}`,(e)=>{})
})
fs.readdirSync("public").forEach(f=>{
	const s=`${srcDir}/${f}`,d=`${buildDir}/_/${f}`;
	if(fs.existsSync(d)&&fs.statSync(s).mtime<fs.statSync(d).mtime)return;
	fs.copyFile(s,d,fs.constants.COPYFILE_FICLONE,e=>{if(e)console.log(e)})
	const i=f.lastIndexOf('.');if(!i)return;
	const ext=extMap[f.slice(i+1)];if(ext)fs.writeFileSync(`${buildDir}/${f.slice(0,i)}.${ext.ext}`,ext.cast(fs.readFileSync(s).toString()));
})
console.log("built")