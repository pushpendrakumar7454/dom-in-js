let div=document.querySelector('div')
let button=document.querySelector('button')


button.addEventListener('click',()=>{
   if(div.classList.toggle('toggle')){
     button.textContent="On"
   }else{
    button.textContent="Off"
   }
 
})