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
        if (json.status) {
            window.location = "emailVerification.html";
        } else {
            showMessageBox(json.message);
        }
    } else {
        showMessageBox("Registration failed. Please try again!")
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