// axios.get('https://jsonplaceholder.typicode.com/todos')
//   .then((response)=>{
//     console.log(response.data);
//     var se = response.data;
//     se.forEach(element => {
//         console.log(element.id)

//     });
//   }).catch(function (error) {
//     console.log(error);
//   })

//  let p = document.querySelector('#output')
//  console.log(p)
//   function myFunction(){
//     axios.get('https://jsonplaceholder.typicode.com/todos')
//   .then((response)=>{
//     console.log(response.data);
//     var se = response.data;
//     se.forEach(element => {
//         console.log(element.id)
//         let c = p.innerHTML=`${p.innerHTML} <br/> user id : ${element.id}`
//         console.log(c)
//     });
//   }).catch(function (error) {
//     console.log(error);
//   })

//   }

//trying create
// const tbody = document.querySelector('#tbody')
// const TR = document.createElement('tr');
// const tdId = document.createElement('td');
// tdId.innerHTML ="1"
// TR.appendChild(tdId)

// const tdTitle = document.createElement('td') 
// tdTitle.innerHTML="This is title"
// TR.appendChild(tdTitle)

// const tdCompleted = document.createElement("td")
// tdCompleted.innerHTML="True"
// TR.appendChild(tdCompleted)

// const tdAction = document.createElement('td')
//for Edit 
// const tdEditbtn= document.createElement('button')
// tdEditbtn.className ="btn btn-warning mx-1"
// tdEditbtn.innerHTML='Edit'
// tdEditbtn.addEventListener('click',function(){
//     console.log("Edit button is cliecked")
// })
// tdAction.appendChild(tdEditbtn)

//For Delete

// const tdDeletebtn = document.createElement('button')
// tdDeletebtn.className = "btn btn-danger"
// tdDeletebtn.innerHTML ='Delete'
// tdDeletebtn.addEventListener('click',function(){
// console.log("Delete button is clicked")
// })
// tdAction.appendChild(tdDeletebtn)

// TR.appendChild(tdAction)
// tbody.appendChild(TR)
// const Baseurl ="https://jsonplaceholder.typicode.com/todos"
const Baseurl ="http://localhost:3000/contacts/"

window.onload= function(){
    axios.get(Baseurl).then((response)=>{
    response.data.forEach(contact=>{
        createTDElement(contact, tbody)
    })
    }).catch()
    // Add EventListener to Save Contact Button
    let saveContactBtn = document.querySelector('#savecontact')
    saveContactBtn.addEventListener('click', function(){
        createnewcontact()
    })
}

function createnewcontact(){
    let title = document.querySelector("#title")
    let completed = document.querySelector("#completed")
    let contact ={
        "title": title.value,
        "completed": completed.value,
    }
    console.log(contact)

    axios.post(Baseurl,contact).then((res)=>{
        let tbody = document.querySelector('#tbody')
        createTDElement(res.data, tbody)
        title.value = ''
        completed.value = ''
    }).catch((err)=>{
        console.log(err)
    })

}
// const parentElement = document.querySelector('#tbody')

function createTDElement(contact,parentElement){

const TR = document.createElement('tr');
const tdId = document.createElement('td');
tdId.innerHTML =contact.id
TR.appendChild(tdId)

const tdTitle = document.createElement('td') 
tdTitle.innerHTML=contact.title
TR.appendChild(tdTitle)

const tdCompleted = document.createElement("td")
tdCompleted.innerHTML=contact.completed
TR.appendChild(tdCompleted)

const tdAction = document.createElement('td')
//for Edit 
const tdEditbtn= document.createElement('button')
tdEditbtn.className ="btn btn-warning mx-1"
tdEditbtn.innerHTML='Edit'
tdEditbtn.addEventListener('click',function(){
    // console.log("Edit button is cliecked")
    // $('#contactEditModal').modal('toggle')
    let mainmodal = $('#contactEditModal')
    mainmodal.modal('toggle')
    let title = document.querySelector("#edit-title")
    let completed = document.querySelector("#edit-completed")
    title.value = contact.title
    completed.value = contact.completed
    let updatebtn = document.querySelector("#updateContact")
    updatebtn.addEventListener('click',function(){
        axios.put(`${Baseurl}/${contact.id}`, {
            title:title.value,
            completed: completed.value,
        }).then((res)=>{
            tdTitle.innerHTML = res.data.title
            tdCompleted.innerHTML = res.data.completed
            mainmodal.modal('hide')
        }).catch((err)=>{
            console.log(err)
        })
    })
})
tdAction.appendChild(tdEditbtn)

//For Delete

const tdDeletebtn = document.createElement('button')
tdDeletebtn.className = "btn btn-danger"
tdDeletebtn.innerHTML ='Delete'
tdDeletebtn.addEventListener('click',function(){
// console.log("Delete button is clicked")
// console.log(contact)
axios.delete(`${Baseurl}/${contact.id}`).then((res)=>{
    parentElement.removeChild(TR)
}).catch(err=>console.log(err))
})
tdAction.appendChild(tdDeletebtn)

TR.appendChild(tdAction)
parentElement.appendChild(TR)

}