import { auth } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "firebase/auth";

const botonesInvitado = document.getElementById("botonesInvitado");
const botonesUsuario = document.getElementById("botonesUsuario");
const nombreUsuario = document.getElementById("nombreUsuario");
const cerrarSesion = document.getElementById("cerrarSesion");

onAuthStateChanged(auth, (usuario) => {

    if (usuario) {

        botonesInvitado.hidden = true;
        botonesUsuario.hidden = false;

        nombreUsuario.textContent =
            "Hola, " + (usuario.displayName || "Gamer");

        console.log("Usuario con sesión iniciada");

    } else {

        botonesInvitado.hidden = false;
        botonesUsuario.hidden = true;

        nombreUsuario.textContent = "";

        console.log("No hay sesión iniciada");

    }

});

cerrarSesion.addEventListener("click", async () => {

    try {

        await signOut(auth);

        console.log("Sesión cerrada correctamente");

        window.location.href = "index.html";

    } catch (error) {

        console.error(error);

        alert("No se pudo cerrar la sesión.");

    }

});