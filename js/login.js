const API_URL = "https://invoice-management-system-api-z5lx.onrender.com/api/login";


document.getElementById("loginForm").addEventListener("submit", async function(event){

    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;


    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                username: username,
                password: password

            })

        });


        const data = await response.json();


        if(data.success){

            alert("Login Successful ✅");

            window.location.href = "dashboard.html";

        }

        else{

            document.getElementById("message").innerText = data.message;

        }


    } catch(error) {

        console.log(error);

        document.getElementById("message").innerText = "Server connection failed";

    }

});
