import { auth } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    updateProfile
} from "firebase/auth";

const formularioRegistro = document.getElementById("formularioRegistro");
const mensajeRegistro = document.getElementById("mensajeRegistro");

if (formularioRegistro) {

    formularioRegistro.addEventListener("submit", async (e) => {

        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const contrasena = document.getElementById("contrasena").value;
        const confirmar = document.getElementById("confirmar").value;

        mensajeRegistro.style.color = "#ff5252";

        if (!nombre || !correo || !contrasena || !confirmar) {
            mensajeRegistro.textContent = "Completa todos los campos.";
            return;
        }

        if (contrasena.length < 6) {
            mensajeRegistro.textContent = "La contraseña debe tener mínimo 6 caracteres.";
            return;
        }

        if (contrasena !== confirmar) {
            mensajeRegistro.textContent = "Las contraseñas no coinciden.";
            return;
        }

        const boton = formularioRegistro.querySelector("button");
        boton.disabled = true;

        try {

            const credenciales = await createUserWithEmailAndPassword(
                auth,
                correo,
                contrasena
            );

            await updateProfile(credenciales.user, {
                displayName: nombre
            });

            mensajeRegistro.style.color = "#4ade80";
            mensajeRegistro.textContent = "¡Cuenta creada correctamente!";

            formularioRegistro.reset();

            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);

        } catch (error) {

            if (error.code === "auth/email-already-in-use") {
                mensajeRegistro.textContent = "Este correo ya está registrado.";
            } else if (error.code === "auth/invalid-email") {
                mensajeRegistro.textContent = "El correo electrónico no es válido.";
            } else if (error.code === "auth/weak-password") {
                mensajeRegistro.textContent = "La contraseña es demasiado débil.";
            } else {
                mensajeRegistro.textContent = "Error al completar el registro.";
            }

            console.error(error);
            boton.disabled = false;

        }

    });

}