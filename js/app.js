const API_URL = "http://localhost:5000/api/customers";


// Load customer list
function loadCustomers(){

    fetch(API_URL)
    .then(response => response.json())
    .then(data => {

        let table = document.getElementById("customerTable");

        table.innerHTML = "";

        data.forEach(customer => {

            table.innerHTML += `
            <tr>
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.email}</td>
                <td>${customer.phone}</td>
                <td>${customer.address}</td>
            </tr>
            `;

        });

    })
    .catch(error => {
        console.log("Error:", error);
    });

}


// Load data when page opens
window.onload = function(){
    loadCustomers();
};