async function verify() {
    const verificationCode = document.getElementById("verificationCode").value;

    const vCode = {
        verificationCode: verificationCode
    }

    const vCodeJSON = JSON.stringify(vCode);

    const response = await fetch(
            "VerifyAccount",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: vCodeJSON
            });


    if (response.ok) {
        const json = await response.json();
        if (json.status) {
            window.location = "index.html";
        } else {

            if (json.alerts === "1") {
                window.location = "signIn.html";
            } else {
                document.getElementById("alerts").classList.remove("d-none");
                document.getElementById("alerts").innerHTML = json.alerts;
            }
        }
    } else {
        document.getElementById("alerts").classList.remove("d-none");
        document.getElementById("alerts").innerHTML = "Verification Failed!";
    }
}