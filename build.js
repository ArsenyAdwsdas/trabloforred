if(typeof process.env.API_SERVER_EXTERNAL=="string"&&process.env.API_SERVER_EXTERNAL.indexOf(/api\.glitch\./i)!=-1)process.exit(0)
const extMap=require("./ext_map.js")
const fs=require("fs")
const Fs=require("./funcs.js")
Fs.mkdir(extMap.dirs.build);Fs.mkdir(`${extMap.dirs.build}/_`);
fs.readdirSync(`${extMap.dirs.build}/_`).forEach(f=>{
	if(fs.existsSync(`${extMap.dirs.src}/${f}`))return;
	fs.unlink(`${extMap.dirs.build}/_/${f}`);
	const i=f.lastIndexOf('.');if(!i)return;
	const ext=extMap[f.slice(i+1)];if(ext)fs.unlink(`${extMap.dirs.build}/${f.slice(0,i)}.${ext.ext}`,(e)=>{})
})
fs.readdirSync(extMap.dirs.src).forEach(f=>{
	const s=`${extMap.dirs.src}/${f}`,d=`${extMap.dirs.build}/_/${f}`;
	if(fs.existsSync(d)&&fs.statSync(s).mtime<fs.statSync(d).mtime)return;
	console.log(`Writing ${d}`);fs.copyFile(s,d,fs.constants.COPYFILE_FICLONE,(e)=>{})
	const i=f.lastIndexOf('.');if(!i)return;
	const ext=extMap[f.slice(i+1)];if(ext)fs.writeFile(`${extMap.dirs.build}/${f.slice(0,i)}.${ext.ext}`,ext.cast(fs.readFileSync(s).toString()),(e)=>{})
})
console.log("built")