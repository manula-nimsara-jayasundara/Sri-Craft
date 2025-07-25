async function signUp() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;


    const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    };

    const userJSON = JSON.stringify(user);

    const response = await fetch(
            "SignUp",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: userJSON
            });


    if (response.ok) {
        const json = await response.json();
        if(json.status){
            window.location="emailVerification.html";
        }else{
            document.getElementById("alerts").classList.remove("d-none");
            document.getElementById("alerts").classList.add("d-block");
            document.getElementById("alerts").innerHTML = json.alerts;
        }
    } else {
        document.getElementById("alerts").classList.remove("d-none");
        document.getElementById("alerts").classList.add("d-block");
        document.getElementById("alerts").innerHTML = "Registration failed. Please try again!";
    }
}