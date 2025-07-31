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
//            document.getElementById("SSBtns").classList.add("d-none");
        } else {
            if (json.message === "1") {
                window.location = "signIn.html";
            } else {
                
                showMessageBox(json.message);
//                document.getElementById("alertN").innerHTML = json.alertN;

            }
        }
    } else {
//        showMessageBox("Please check credentials!");
        showMessageBox(json.message);
    }
}


function showMessageBox(message) {
    // Create a modal-like structure for the message
    const messageBox = document.createElement('div');
    messageBox.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background-color: white;
                    padding: 25px;
                    border-radius: 10px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                    z-index: 1000;
                    text-align: center;
                    font-family: "Inter", sans-serif;
                    max-width: 90%;
                    width: 300px;
                `;

    const messageText = document.createElement('p');
    messageText.textContent = message;
    messageText.style.marginBottom = '20px';

    const closeButton = document.createElement('button');
    closeButton.textContent = 'OK';
    closeButton.style.cssText = `
                    background-color: #0d6efd;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                `;
    closeButton.onclick = () => messageBox.remove(); // Remove message box on click

    messageBox.appendChild(messageText);
    messageBox.appendChild(closeButton);
    document.body.appendChild(messageBox);
}