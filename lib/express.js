var url=require('url')
var fs=require('fs')
var path=require('path')
function  express() {  
  var tasks=[]
//   闭包函数
  var app=function (req,res) {

   var i=0
   function next(){
       var task=tasks[i++]
       //到数组的最未    
       if(!task){
           return
       }
       if(task.routePath===null || url.parse(req.url,true).pathname===task.routePath){
          task.middleWare(req,res,next)
       }else{
         next()
       }
   }
   
   next()

    }
    // 函数也是对象 可以给函数添加方法
    app.use=function (routePath,middleWare) {  
    //如果第一个参数是一个方法
    if(typeof routePath==='function'){
        middleWare=routePath
        routePath=null
    }
    // 如果不是方法 就包装一个对象

    tasks.push({
        routePath:routePath,
        middleWare:middleWare
    })


    }
  //把一个闭包函数返回出去 
  return app

}

module.exports=express