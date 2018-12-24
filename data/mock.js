// 加载Mock.js插件，让前端开发与后端独立
window.Mock = require('mockjs')
// 加载Mock.mock方法
window.M = window.Mock.mock;
// 加载mock.Random方法
window.R = window.Mock.Random;

console.log(R.email())
console.log(M({email:'@email'}))  // 这种@的方式叫"占位符"。它可以用来直接生成各种数据

console.log(R.email())

// basic：https://github.com/nuysoft/Mock/wiki/Basic
console.log(M({boolean:'@boolean'}))
console.log(M({natural:'@natural'}))
console.log(M({integer:'@integer'}))
console.log(M({float:'@float'}))
console.log(M({character:'@character'}))
console.log(M({range:'@range'}))

// date:https://github.com/nuysoft/Mock/wiki/Date
console.log(M({date:'@date'}))
console.log(M({time:'@time'}))
console.log(M({datetime:'@datetime'}))
console.log(M({now:'@now'}))

// Image：https://github.com/nuysoft/Mock/wiki/Image
console.log(M({image:"@image()"}))
console.log(M({image:"@image(60x60)"}))
console.log(M({image:"@image(60x60,#000000)"}))
console.log(M({image:"@image('200x100', '#00405d', '#FFF', 'Mock.js')"}))
console.log(M({dataImage:'@dataImage'}))
console.log(M({dataImage:"@dataImage('200x100')"}))
console.log(M({dataImage:"@dataImage('200x100', 'Hello Mock.js!')"}))

// color : https://github.com/nuysoft/Mock/wiki/Color
console.log(M({color:'@color'}))
console.log(M({hex:'@hex'}))
console.log(M({rgb:'@rgb'}))
console.log(M({rgba:'@rgba'}))
console.log(M({hsl:'@hsl'}))

// text : https://github.com/nuysoft/Mock/wiki/Text
console.log(M({paragraph:'@paragraph'}))
console.log(M({sentence:'@sentence'}))
console.log(M({title:'@title'}))
console.log(M({cparagraph:'@cparagraph'}))
console.log(M({csentence:'@csentence'}))
console.log(M({cword:'@cword'}))
console.log(M({ctitle:'@ctitle'}))

// name : https://github.com/nuysoft/Mock/wiki/Name
console.log(M({first:'@first'}))
console.log(M({last:'@last'}))
console.log(M({name:'@name'}))
console.log(M({cfirst:'@cfirst'}))
console.log(M({clast:'@clast'}))
console.log(M({cname:'@cname'}))

// Web　：　https://github.com/nuysoft/Mock/wiki/Name
console.log(M({url:'@url'}))
console.log(M({domain:'@domain'}))
console.log(M({email:'@email'}))
console.log(M({ip:'@ip'}))
console.log(M({tld:'@tld'}))

// address: https://github.com/nuysoft/Mock/wiki/Name
console.log(M({region:'@region'}))
console.log(M({province:'@province'}))
console.log(M({city:'@city'}))
console.log(M({county:'@county'}))
console.log(M({zip:'@zip'}))

// helper Methods : https://github.com/nuysoft/Mock/wiki/Helper
console.log(M({capitalize:'@capitalize(`hello`)'}))
console.log(M({upper:'@upper(`hello`)'}))
console.log(M({lower:'@lower(`HELLO`)'}))
console.log(M({pick:"@pick(['a', 'e', 'i', 'o', 'u'])"}))
console.log(M({shuffle:"@shuffle(['a', 'e', 'i', 'o', 'u'])"}))

// Miscellaneous: https://github.com/nuysoft/Mock/wiki/Miscellaneous
console.log(M({guid:'@guid'}))
console.log(M({id:'@id'}))
console.log(M({increment:'@increment'}))