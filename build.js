const buildDir="build"
const srcDir="public"
const extMap=require("ext_map.js")
const fs=require("fs")
fs.readdirSync("build/_").forEach(f=>{
	if(fs.existsSync(`${srcDir}/${f}`))return;
	fs.unlink(`${buildDir}/_/${f}`);
	const i=f.lastIndexOf('.');if(!i)return;
	const ext=extMap[f.slice(i+1)];if(ext)fs.unlink(`${buildDir}/${f.slice(0,i)}.${ext.ext}`,(e)=>{})
})
fs.readdirSync("public").forEach(f=>{
	const s=`${srcDir}/${f}`,d=`${buildDir}/_/${f}`;
	if(fs.existsSync(d)&&fs.stat(s).mtime<fs.stat(d).mtime)return;
	fs.copyFile(s,d,fs.constants.COPYFILE_FICLONE)
	const i=f.lastIndexOf('.');if(!i)return;
	const ext=extMap[f.slice(i+1)];if(ext)fs.writeFile(`${buildDir}/${f.slice(0,i)}.${ext.ext}`,ext.cast(fs.readFileSync(s)))
})
