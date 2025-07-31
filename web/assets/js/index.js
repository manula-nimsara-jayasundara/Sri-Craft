async function checkSignIn() {
    const popup = new Notification();
    const response = await fetch("CheckSignIn");

    if (response.ok) {

    } else {
        popup.error({
            message: "Something went wrong! Try again shortly."
        });
    }
}