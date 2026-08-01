
const API_URL = "https://invoice-management-system-api-z5lx.onrender.com/api/customers";


document.getElementById("customerForm").addEventListener("submit", async function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    try {

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                address
            })
        });

        const data = await response.json();

        if(data.success) {
            alert("Customer added successfully ✅");
            document.getElementById("customerForm").reset();
            loadCustomers();
        }
        else {
            alert("Failed to add customer");
        }

    } catch(error) {

        console.log(error);
        alert("Server connection failed");

    }

});


// Display customers

async function loadCustomers() {

    try {

        const response = await fetch(API_URL);

        const customers = await response.json();

        const table = document.getElementById("customerTable");

        table.innerHTML = "";

        customers.forEach(customer => {

            table.innerHTML += `
                <tr>
                    <td>${customer.id}</td>
                    <td>${customer.name}</td>
                    <td>${customer.email || ""}</td>
                    <td>${customer.phone || ""}</td>
                    <td>${customer.address || ""}</td>
                </tr>
            `;

        });

    } catch(error) {

        console.log(error);

    }

}


// Load customers when page opens
loadCustomers();
