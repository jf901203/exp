var express=require('./lib/express')
// app是express函数执行的结果
var app=express()
// 所有的请求都会先进过这两个中间件
app.use(function (req,res,next) {  
    console.log('middleware 1')
    next()
})
app.use(function (req,res,next) {
    console.log('middleware 2')
    next()
  })

// 匹配到的路由才会进入中间件

app.use('/hello',function (req,res) {
  
    res.end('hello')

  })
app.use('/home',function (req,res) {
    res.end('home')
  })

app.use(function (req,res) {
    res.send(404,'not find')
  })
// function app(){} 是一个函数
module.exports=app