const login=document.querySelector('#loginbtn')
const loginOverlay=document.querySelector('#overlaylogin')
const main=document.querySelector('.mainsections')
const register=document.querySelector('#register')
const registerpage=document.querySelector('#registerpage')
const registerbtn=document.querySelector('#registerbtn')
const registerform=document.querySelector('.register-form')
const loginform=document.querySelector('.login-form')
const sectiondisplay=document.querySelector('#section10')
const homebtn=document.querySelector('#hoomebtn')
const logout=document.querySelector('.logout')
const tragbtn=document.querySelector('.Trangaction-btn')
let trangactionOverlay=document.querySelector('.overlay4')
const dashboardform=document.querySelector("#dashboard")
const landingUser = document.querySelector("#landingUser");
const dashboardUser = document.querySelector("#dashboardUser");
const landingIcon = document.querySelector(".theme-icon");
const landing = document.querySelector(".mainsections");
const themeToggle = document.getElementById("themeToggle");
const dashboard = document.querySelector(".section10");
const settingbtn=document.querySelector(".settingbtn")
const overlay6=document.querySelector('.overlay6')
const overlayguest=document.querySelector('#overlayguest')
const settingsName = document.querySelector("#settingsName");
const saveBtn6 = document.querySelector(".saveBtn6");
const dashboardsec6=document.querySelector('#dashboardsec6')
const logoutsec6=document.querySelector('.logoutsec6')

login.addEventListener('click',()=>{
    loginOverlay.style.display='flex'
    main.style.display='none'
})

register.addEventListener('click',()=>{
    registerpage.style.display='flex'
    loginOverlay.style.display='none'

})

homebtn.addEventListener('click',()=>{
    sectiondisplay.style.display='none'
    main.style.display='block'
})

tragbtn.addEventListener('click',()=>{
    trangactionOverlay.style.display='flex'
    document.body.style.overflow = "hidden";

})

dashboardform.addEventListener('click',()=>{
    main.style.display='none'
    sectiondisplay.style.display='flex'
})

logout.addEventListener("click",()=>{
    sectiondisplay.style.display='none'
    loginOverlay.style.display='flex'
})

settingbtn.addEventListener('click',()=>{
    sectiondisplay.style.display='none'
    overlay6.style.display='flex'
})

dashboardsec6.addEventListener('click',()=>{
    overlay6.style.display='none'
    sectiondisplay.style.display='flex'
})
logoutsec6.addEventListener('click',()=>{
    overlay6.style.display='none'
    loginOverlay.style.display='flex'
})

registerform.addEventListener("submit", registerUser);

function registerUser(e) {
    e.preventDefault();
    const fullname = document.querySelector("#fullname").value;
    const email = document.querySelector("#email2").value;
    const password = document.querySelector("#password2").value;
    const number = document.querySelector("#number").value;
    const user = {
        fullname,
        email,
        password,
        number
    };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Registration Successful");
    registerform.reset();

    registerpage.style.display = "none";
    loginOverlay.style.display = "flex";
}




loginform.addEventListener('submit',loginUser)
function loginUser(e) {
    e.preventDefault();

    const loginemail = document.querySelector("#email1").value;
    const loginpassword = document.querySelector("#password1").value;

    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.email === loginemail && user.password === loginpassword) {
        localStorage.setItem("isLoggedIn", "true");
        alert("Login Successful");
        loginOverlay.style.display = "none";
        sectiondisplay.style.display = "flex";
        login.textContent = "Logout";
        landingUser.textContent = user.fullname;
        dashboardUser.textContent = user.fullname;
        overlayguest.textContent=user.fullname
        settingsName.value = user.fullname;

    } else {
        alert("Invalid Email or Password");
    }

    loginform.reset();
}
saveBtn6.addEventListener("click", () => {

    let user = JSON.parse(localStorage.getItem("user"));

    if(user){

        user.fullname = settingsName.value;

        localStorage.setItem("user", JSON.stringify(user));

        landingUser.textContent = user.fullname;
        dashboardUser.textContent = user.fullname;
        overlayguest.textContent = user.fullname;

        alert("Name Updated Successfully");
    }

});

window.addEventListener("load", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (localStorage.getItem("isLoggedIn") === "true") {
        login.textContent = "Logout";
        main.style.display = "block";
        loginOverlay.style.display = "none";
        if(user){
            landingUser.textContent = user.fullname;
            dashboardUser.textContent = user.fullname;
             overlayguest.textContent = user.fullname;
              landingUser.textContent = user.fullname;
            settingsName.value = user.fullname;
        }
    } else {
        login.textContent = "Login";
        landingUser.textContent = "Guest";
        dashboardUser.textContent = "Guest";
         overlayguest.textContent = "Guest";
    }
});


landingIcon.addEventListener("click", () => {
    landing.classList.toggle("dark");

    if (landing.classList.contains("dark")) {
        landingIcon.classList.remove("ri-sun-line");
        landingIcon.classList.add("ri-moon-line");
    } else {
        landingIcon.classList.remove("ri-moon-line");
        landingIcon.classList.add("ri-sun-line");
    }

});



themeToggle.addEventListener("change", () => {
    dashboard.classList.toggle("dark");
});

const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 250;

let income = Number(localStorage.getItem("income")) || 0;
let expense = Number(localStorage.getItem("expense")) || 0;
let totalTransactions = Number(localStorage.getItem("transactions")) || 0;

function drawGraph() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    ctx.moveTo(50,20);
    ctx.lineTo(50,220);
    ctx.lineTo(680,220);
    ctx.strokeStyle="#999";
    ctx.stroke();

    ctx.fillStyle="green";
    let incomeHeight = income / 20; 
    ctx.fillRect(150,220-incomeHeight,80,incomeHeight);

    ctx.fillStyle="red";
    let expenseHeight = expense / 20;
    ctx.fillRect(320,220-expenseHeight,80,expenseHeight);

    ctx.fillStyle="black";
    ctx.font="15px Arial";
    ctx.fillText("Income",160,240);
    ctx.fillText("Expense",325,240);
}

drawGraph();

const transactionForm = document.querySelector(".transaction-popup form");
transactionForm.addEventListener("submit", function(e){
    e.preventDefault();

    const type = this.querySelectorAll("select")[0].value;
    const description = this.querySelector('input[type="text"]').value;
    const amount = Number(this.querySelector('input[type="number"]').value);
    const date = this.querySelector('input[type="date"]').value;
    const category = this.querySelectorAll("select")[1].value;

    const transaction = {
        type,
        description,
        amount,
        date,
        category
    };

    transactions.push(transaction);

    localStorage.setItem("transactionsList", JSON.stringify(transactions));

    if(type === "Income"){
        income += amount;
    }else{
        expense += amount;
    }

    totalTransactions++;

    updateDashboard();
    drawGraph();
    renderTransactions();

    trangactionOverlay.style.display = "none";
    document.body.style.overflow = "auto";

    this.reset();
});


function updateDashboard() {
    const currentBalance = income - expense;
    document.getElementById("currentBalance").textContent = "₹" + currentBalance.toFixed(2);
    document.getElementById("totalIncome").textContent = "₹" + income.toFixed(2);
    document.getElementById("totalExpense").textContent = "₹" + expense.toFixed(2);
    document.getElementById("totalTransaction").textContent = totalTransactions;
    localStorage.setItem("income", income);
    localStorage.setItem("expense", expense);
    localStorage.setItem("transactions", totalTransactions);
}
updateDashboard();

const resetBtn = document.getElementById("resetData");
resetBtn.addEventListener("click", function () {
   if(confirm("Are you sure you want to reset all data?")){

    income = 0;
    expense = 0;
    totalTransactions = 0;

    transactions = [];
    localStorage.removeItem("transactionsList");

    localStorage.removeItem("income");
    localStorage.removeItem("expense");
    localStorage.removeItem("transactions");

    updateDashboard();
    drawGraph();
    renderTransactions();

    alert("All Data Reset Successfully");
}
});


let transactions = JSON.parse(localStorage.getItem("transactionsList")) || [];

const transactionTable = document.querySelector(".transaction-table tbody");
const searchInput = document.querySelector(".search-box input");
const filterType = document.querySelector(".transaction-top select");

function renderTransactions(list = transactions) {

    transactionTable.innerHTML = "";

    if (list.length === 0) {
        transactionTable.innerHTML = `
            <tr class="empty-row">
                <td colspan="5">No transactions found</td>
            </tr>
        `;
        return;
    }

   list.forEach((item, index) => {
        transactionTable.innerHTML += `
            <tr>
                <td>${item.date}</td>
                <td>${item.description}</td>
                <td>${item.category}</td>
                <td style="color:${item.type==="Income"?"green":"red"}">
                    ${item.type==="Income"?"+":"-"} ₹${item.amount}
                </td>

                <td>
                    <button id="btoondelete" onclick="deleteTransaction(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });

}

function deleteTransaction(index){
    const item = transactions[index];
    if(item.type==="Income"){
        income -= item.amount;
    }else{
        expense -= item.amount;
    }
    totalTransactions--;
    transactions.splice(index,1);
    localStorage.setItem("transactionsList",JSON.stringify(transactions));
    updateDashboard();
    drawGraph();
    renderTransactions();

}
searchInput.addEventListener("input",function(){
    const value=this.value.toLowerCase();
    const filtered=transactions.filter(item=>
        item.description.toLowerCase().includes(value) ||
        item.category.toLowerCase().includes(value)

    );

    renderTransactions(filtered);

});
searchInput.addEventListener("input",function(){
    const value=this.value.toLowerCase();
    const filtered=transactions.filter(item=>
        item.description.toLowerCase().includes(value) ||
        item.category.toLowerCase().includes(value)
    );
    renderTransactions(filtered);
});

renderTransactions();
updateDashboard();
drawGraph();
renderTransactions();




















