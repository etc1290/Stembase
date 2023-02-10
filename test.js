const { performance } = require('perf_hooks')
var startTime = performance.now()
const array =["C:\\Users\\329058\\Desktop\\others\\KnowledgeManager\\Stembase\\.git","C:\\Users\\329058\\Desktop\\others\\KnowledgeManager\\Stembase\\.gitignore","D:\\Stembase\\.git"]
const output = []
const item = array.forEach(e =>{
    const id = e.lastIndexOf('\\')
    output[e.slice(id+1)]=e.slice(0,id+1)
})
var endTime = performance.now()
console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)