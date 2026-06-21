const body=document.querySelector('body')
let button=document.querySelector('button')

function randomColor(){
    let r=Math.floor(Math.random()*256)
    let g=Math.floor(Math.random()*256)
    let b=Math.floor(Math.random()*256)
    return `rgb(${r},${g},${b})`
}

button.addEventListener('click',()=>{
    body.style.backgroundColor=randomColor()
})