let section=document.querySelector('.section-3')
let form=document.querySelector('form')
let img=document.querySelector('#img')
let work=document.querySelector('#work')
let name=document.querySelector("#name")
let detail=document.querySelector('#detail')
let btntext=document.querySelector('#btn_text')
let submit=document.querySelector('.create')



  let users = [
  { 
    id:1,
    img: "./photos/a8.png",
    work: "The Beauty Of Things Left Unsaid",
    name: "Midnight Collection",
    detail: "Some places don't ask for attention. They quietly capture it through atmosphere, character, and timeless charm.",
    button: "Explore"
  },
  { 
    id:2,
    img: "./photos/a1.png",
    work: "Beyond The Noise Of Everyday Life",
    name: "Urban Escape",
    detail: "Step into a collection of moments shaped by curiosity, wonder, and a different way of seeing the world.",
    button: "Discover"
  },
  { id:3,
    img: "./photos/a2.png",
    work: "A Story Hidden In Plain Sight",
    name: "Silent Perspective",
    detail: "There is always something extraordinary waiting behind the familiar, if you know where to look.",
    button: "View More"
  },
  { id:4,
    img: "./photos/a3.png",
    work: "Where Imagination Finds A Home",
    name: "Creative Horizons",
    detail: "Built from inspiration, refined by experience, and remembered long after the moment has passed.",
    button: "Explore"
  },
  { id:5,
    img: "./photos/a4.png",
    work: "Not Everything Extraordinary Demands Attention",
    name: "Rare Moments",
    detail: "The most remarkable things in life often exist quietly, waiting for the right eyes to notice them.",
    button: "Open"
  },
  { id:6,
    img: "./photos/a5.png",
    work: "Collected Moments From Another World",
    name: "Dream Archive",
    detail: "A carefully crafted blend of atmosphere, emotion, and visual storytelling.",
    button: "Discover"
  },
  { id:7,
    img: "./photos/e.png",
    work: "The Art Of Existing Differently",
    name: "Signature Series",
    detail: "Created for those who see beauty where others only see ordinary things.",
    button: "View"
  },
  { id:8,
    img: "./photos/a7.png",
    work: "Some Journeys Begin With A Single Glance",
    name: "Endless Roads",
    detail: "The destination is uncertain, but the experience is unforgettable from the very first step.",
    button: "Explore"
  },

];

function createUser(){
  section.innerHTML=""
  users.forEach((user,idx)=>{
    section.innerHTML += `
        <div class="card">
            <div class="img-div">
                <img src="${user.img}" alt="">
             <div class="usertext">
                <div class="text">
                <h3 class="big">${user.work}</h3>
                <h3 class="name">${user.name}</h3>
                <p class="para">${user.detail}</p>
                </div>
                <div class="end">
                    <button class="arrow" onclick="deletUser(${idx})">delete</button>
                    <button class="beuti">${user.button}</button>
                </div>
             </div>
            </div>
        </div>
    `
})


}
createUser()


form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(img.value.trim()==="" || work.value.trim()==="" || name.value.trim()==="" || detail.value.trim==="" || btntext.value.trim()===""){return;}
       users.push({
        img:img.value,
        work:work.value,
        name:name.value,
        detail:detail.value,
        btntext:btntext.value
       })
       createUser()
       
        form.reset()
    });

    
function deletUser(idx){
  users.splice(idx,1)
  createUser()
}