const parent=document.querySelector('.parent')
const button=document.querySelector('button')
const body=document.querySelector('body')
const section=document.querySelector('section')



parent.addEventListener('click',(e)=>{
   let color=e.target.textContent.toLowerCase();;
   if(color=='red'){
    body.style.backgroundColor='red'
     parent.style.backgroundColor='white'
   }else if(color=='blue'){
    body.style.backgroundColor='blue'
     parent.style.backgroundColor='white'
   }else if(color=='green'){
    body.style.backgroundColor='green'
     parent.style.backgroundColor='white'
   }else if(color=='purple'){
    body.style.backgroundColor='purple'
     parent.style.backgroundColor='white'
   }else if(color=='yellow'){
    body.style.backgroundColor='yellow'
     parent.style.backgroundColor='white'
   }else if(color=='pink'){
    body.style.backgroundColor='pink'
     parent.style.backgroundColor='white'
   }else if(color=='dark'){
    body.style.backgroundColor='black'
     parent.style.backgroundColor='white'
   }else if(color=='white'){
    body.style.backgroundColor='white'
    parent.style.backgroundColor='black'

   }

})


