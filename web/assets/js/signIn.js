async function signIn() {
    const email = document.getElementById("signInEmail").value;
    const password = document.getElementById("password").value;

    const user = {
        email: email,
        password: password
    }

    const jsonUser = JSON.stringify(user);

    const response = await fetch(
            "SignIn",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: jsonUser
            });

    if (response.ok) {
        const json = await response.json();
        if (json.status) {
            window.location = "index.html";
        } else {
            if (json.alerts === "1") {
                window.location="signIn.html";
            }else{
                document.getElementById("alerts").innerHTML=json.alerts;
            }
        }
    }else{
        document.getElementById("alerts").innerHTML="Please check credentials";
    }
}