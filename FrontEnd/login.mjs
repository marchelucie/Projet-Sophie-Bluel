
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const logger = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value,
    };
    const chargeUtile = JSON.stringify(logger);

    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        localStorage.setItem("token", data.token);
        window.location.href = "./index.html";

    } catch (error) {
        console.error("Erreur lors de la connexion : ", error)
        const divForm = document.querySelector(".login-form");
        let errorMessageElement = document.getElementById("error-message");
        if (!errorMessageElement) {
            errorMessageElement = document.createElement("p");
            errorMessageElement.id = "error-message";
            divForm.appendChild(errorMessageElement);
        }
        errorMessageElement.innerText = "Erreur lors de la connexion. Vérifiez votre e-mail ou votre mot de passe."
    }
});