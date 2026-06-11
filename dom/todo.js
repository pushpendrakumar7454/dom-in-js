let input=document.querySelector('input')
let button=document.querySelector('#add')
let sec=document.querySelector('section')
let secchild2=document.querySelector('.sec-child2')


button.addEventListener('click',()=>{
    let note=document.createElement('div')
    note.classList.add('note')

    let first=document.createElement('div')

    let h1=document.createElement('h1')
    h1.textContent=input.value

    let second=document.createElement('div')
    second.classList.add('second')

    let edit=document.createElement('button')
    edit.addEventListener('click',()=>{
        let newText=prompt('Enter new text',h1.textContent)
        if(newText!==null && newText!==""){
            h1.textContent=newText
        }
    })
    edit.classList.add('edit')
    edit.textContent="Edit"

    let del=document.createElement('button')
    del.addEventListener('click',()=>{
        note.remove()
    })
    del.classList.add('delete')
    del.textContent="Delete"

    first.appendChild(h1)
    second.appendChild(edit)
    second.appendChild(del)
    note.appendChild(first)
    note.appendChild(second)
    secchild2.appendChild(note)

    input.value=""
})
