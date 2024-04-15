const fs=require("fs")
module.exports={
  mkdir:(path)=>{fs.mkdir(path,e=>{module.exports.mkdir(path.substr(0,path.lastIndexOf('/')));fs.mkdir(path,()=>{})})}
}