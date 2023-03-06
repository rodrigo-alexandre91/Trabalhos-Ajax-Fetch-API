function loadContacts(){
    let tBody = document.querySelector('.table__tbody');
    tBody.innerHTML = "";
    fetch('http://127.0.0.1:5000/contacts', {
        method: "GET"
    })
        .then((response) => response.json())
        .then((data) => {
            data.contacts.forEach(contact => {
                let item = document.createElement('tr');
                let id = contact.id;
                item.innerHTML = 
                    `<th>${id}</th>
                    <td><i class="fa-solid fa-pen-to-square btn_upload" id="upcontact${id}"></i> ${contact.name}</td>
                    <td>${contact.phone}<i class="fa-solid fa-trash btn_delete" id="updelete${id}"></i></td>`;
                tBody.appendChild(item);
                let btnUpdate = document.getElementById(`upcontact${id}`);
                btnUpdate.addEventListener('click', atalhoUptateContact.bind(arguments, contact));
                let btnDelete = document.getElementById(`updelete${id}`);
                btnDelete.addEventListener('click', () => {
                    deleteContact(id);
                });
            });
        });
}
loadContacts();
function loadContact(){
    let id = document.querySelector('#input_get_id');
    let tBody = document.querySelector('.table__tbody');
    tBody.innerHTML = "";
    fetch(`http://127.0.0.1:5000/contacts/${id.value}`, {
        method: "GET"
    })
        .then((response) => response.json())
        .then((data) => {
            let item = document.createElement('tr');
            item.innerHTML = 
                `<th>${data.contact.id}</th>
                <td>${data.contact.name}</td>
                <td>${data.contact.phone}</td>`;
            tBody.appendChild(item);
        });
}
function deleteContact(id = 0){
    if (id == 0){
        id = document.querySelector('#input_delete_id').value;
    }
    let tBody = document.querySelector('.table__tbody');
    tBody.innerHTML = "";
    fetch(`http://127.0.0.1:5000/contacts/${id}`, {
        method: "DELETE"
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data.message);
            loadContacts();
        });
}
function postContact(){
    let inputName = document.getElementById('input_post_name');
    let inputPhone = document.getElementById('input_post_phone');
    let inputData = {
        "name": inputName.value,
        "phone": inputPhone.value
    };
    fetch(`http://127.0.0.1:5000/contacts`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(inputData)
    })
        .then((response) => response.json())
        .then((data) => {
            loadContacts();
    });
}
function updateContact(){
    let inputId = document.getElementById('input_put_id');
    let inputName = document.getElementById('input_put_name');
    let inputPhone = document.getElementById('input_put_phone');
    let inputData = {
        "name": inputName.value,
        "phone": inputPhone.value
    };
    fetch(`http://127.0.0.1:5000/contacts/${inputId.value}`, {
        method: "PUT",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(inputData)
    })
        .then((response) => response.json())
        .then((data) => {
            loadContacts();
    });
}
function atalhoUptateContact(data){
    console.log("Atualizar contato id: " + data.id);
    document.getElementById('input_put_id').value = data.id;
    document.getElementById('input_put_name').value = data.name;
    document.getElementById('input_put_phone').value = data.phone;
}