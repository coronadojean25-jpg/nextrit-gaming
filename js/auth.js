import { auth } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword
} from "firebase/auth";

// REGISTRO DE USUARIOS

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

// INICIO DE SESIÓN

const formularioLogin = document.getElementById("formularioLogin");
const mensajeLogin = document.getElementById("mensajeLogin");

if (formularioLogin) {

    formularioLogin.addEventListener("submit", async (e) => {

        e.preventDefault();

        const correo = document.getElementById("correo").value.trim();
        const contrasena = document.getElementById("contrasena").value;

        mensajeLogin.style.color = "#ff5252";

        if (!correo || !contrasena) {
            mensajeLogin.textContent = "Completa todos los campos.";
            return;
        }

        const boton = formularioLogin.querySelector("button");
        boton.disabled = true;

        try {

            await signInWithEmailAndPassword(
                auth,
                correo,
                contrasena
            );

            mensajeLogin.style.color = "#4ade80";
            mensajeLogin.textContent = "¡Inicio de sesión exitoso!";

            formularioLogin.reset();

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);

        } catch (error) {

            if (
                error.code === "auth/invalid-credential" ||
                error.code === "auth/wrong-password" ||
                error.code === "auth/user-not-found"
            ) {
                mensajeLogin.textContent = "Correo o contraseña incorrectos.";
            } else if (error.code === "auth/invalid-email") {
                mensajeLogin.textContent = "Correo electrónico no válido.";
            } else if (error.code === "auth/too-many-requests") {
                mensajeLogin.textContent = "Demasiados intentos. Intenta más tarde.";
            } else {
                mensajeLogin.textContent = "Error al iniciar sesión.";
            }

            console.error(error);
            boton.disabled = false;

        }

    });

}