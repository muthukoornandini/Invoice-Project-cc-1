const API_URL = "http://localhost:5000/api/invoices";

// Add Invoice
document.getElementById("invoiceForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const invoice_number = document.getElementById("invoice_number").value;
    const customer_name = document.getElementById("customer_name").value;
    const invoice_date = document.getElementById("invoice_date").value;
    const total_amount = document.getElementById("total_amount").value;
    const status = document.getElementById("status").value;

    try {

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                invoice_number,
                customer_name,
                invoice_date,
                total_amount,
                status
            })
        });

        const data = await response.json();

        if (data.success) {

            alert("Invoice Added Successfully ✅");

            document.getElementById("invoiceForm").reset();

            loadInvoices();

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.log(error);
        alert("Server Connection Failed");

    }

});


// Load Invoices

async function loadInvoices() {

    try {

        const response = await fetch(API_URL);

        const invoices = await response.json();

        const table = document.getElementById("invoiceTable");

        table.innerHTML = "";

        invoices.forEach(invoice => {

            table.innerHTML += `
                <tr>
                    <td>${invoice.id}</td>
                    <td>${invoice.invoice_number}</td>
                    <td>${invoice.customer_name}</td>
                    <td>${invoice.invoice_date}</td>
                    <td>₹${invoice.total_amount}</td>
                    <td>${invoice.status}</td>
                </tr>
            `;

        });

    } catch (error) {

        console.log(error);

    }

}

// Load when page opens
loadInvoices();