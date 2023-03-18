

const clclick = () =>{

	document.querySelectorAll('button[class=cl-btn]').forEach( e => {
		e.addEventListener('click', async()=>{
			const content = document.getElementById('cl-clk')
			content.innerHTML = 'one click'
			console.log('one')
		})
	})
}
const cldbclick = () =>{
	
	document.querySelectorAll('button[class=cl-btn]').forEach( e => {
		e.addEventListener('dblclick', async()=>{
			document.getElementById('cl-dbclk').innerHTML = 'double click'
			console.log('two')
		})
	})
}


document.getElementById('ts-delete-btn').addEventListener('click', async ()=>{
	console.log('deleting!')
	await window.tag.delDB()
})

const Init = () =>{
	
	clclick()
	cldbclick()
}

Init()