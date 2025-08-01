function loadData() {
    getUserData();
    getCityData();
}

async function getUserData() {
    const response = await fetch("Profile");
    console.log(response);
    if (response.ok) {
        const json = await response.json();
        console.log(json);
        document.getElementById("userName").innerHTML = `Hello, ${json.firstName} ${json.lastName}`;
//        document.getElementById("since").innerHTML = `Smart Trade Member Since ${json.since}`;
//        document.getElementById("firstName").value = json.firstName;
//        document.getElementById("lastName").value = json.lastName;

        console.log(json.firstName);
//        document.getElementById("currentPassword").value = json.password;
//
//        if (json.hasOwnProperty("addressList") && json.addressList !== undefined) {
//            let email;
//            let lineOne;
//            let lineTwo;
//            let city;
//            let postalCode;
//            let cityId;
//            const addressUL = document.getElementById("addressUL");
//            json.addressList.forEach(address => {
//                email = address.user.email;
//                lineOne = address.lineOne;
//                lineTwo = address.lineTwo;
//                city = address.city.name;
//                postalCode = address.postalCode;
//                cityId = address.city.id;
//                const line = document.createElement("li");
//                line.innerHTML = lineOne + ",<br/>" +
//                        lineTwo + ",<br/>" +
//                        city + "<br/>" +
//                        postalCode;
//                addressUL.appendChild(line);
//            });
//            document.getElementById("addName").innerHTML = `Name: ${json.firstName} ${json.lastName}`;
//            document.getElementById("addEmail").innerHTML = `Email: ${email}`;
//            document.getElementById("contact").innerHTML = `Phone: 011-2215453`;
//
//            document.getElementById("lineOne").value = lineOne;
//            document.getElementById("lineTwo").value = lineTwo;
//            document.getElementById("postalCode").value = postalCode;
//            document.getElementById("citySelect").value = parseInt(cityId);
//            console.log("User Data loaded!");
//        }
    }

}

async function getCityData() {
    const response = await fetch("CityData");
    if (response.ok) {
        const json = await response.json();
        const citySelect = document.getElementById("city");
        json.forEach(city => {
            let option = document.createElement("option");
            option.innerHTML = city.name;
            option.value = city.id;
            citySelect.appendChild(option);
            console.log("City Data loaded!");
        });

    }

}

async function saveChanges() {


    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const lineOne = document.getElementById("addressLineOne").value;
    const lineTwo = document.getElementById("addressLineTwo").value;
    const postalCode = document.getElementById("postalCode").value;
    const cityId = document.getElementById("city").value;
    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
//    const confirmPassword = document.getElementById("confirmPassword"); 




    console.log("Ok");

    const userDataObject = {
        firstName: firstName,
        lastName: lastName,
        lineOne: lineOne,
        lineTwo: lineTwo,
        postalCode: postalCode,
        cityId: cityId,
        currentPassword: currentPassword,
        newPassword: newPassword
//        confirmPassword: confirmPassword
    };

    console.log(userDataObject);


    const userJSON = JSON.stringify(userDataObject);

    const response = await fetch("Profile",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: userJSON,
            });

    if (response.ok) {
        const json = await response.json();
        if (json.status) {
            getUserData();
        } else {
            showMessageBox(json.message);
        }
    } else {
        showMessageBox("Profile update failed!");
    }

}

//Alert



function showMessageBox(message) {
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
    closeButton.onclick = () => messageBox.remove();

    messageBox.appendChild(messageText);
    messageBox.appendChild(closeButton);
    document.body.appendChild(messageBox);
}

// Bootstrap's tab functionality handles showing/hiding panes
// We just need to add custom logic for specific actions like logout
tabButtons.forEach(button => {
    button.addEventListener('shown.bs.tab', function (event) {
        const section = this.dataset.section;
        if (section === 'logout') {
            // Optionally trigger a different action or message when logout tab is shown
            // For now, the confirmLogoutBtn will handle the actual logout action
        }
    });
});

// Handle Save Changes button click
//    if (saveChangesBtn) {
//        saveChangesBtn.addEventListener('click', function (event) {
//            event.preventDefault(); // Prevent form submission for this demo
//            showMessageBox('Account details saved! (Data would be sent to server)');
//        });
//    }

// Handle Confirm Logout button click
if (confirmLogoutBtn) {
    confirmLogoutBtn.addEventListener('click', function () {
        showMessageBox('Logging out...');
        // In a real app, you'd perform actual logout logic and redirect
    });
}
