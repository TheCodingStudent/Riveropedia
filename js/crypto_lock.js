const sherlockedActivo = localStorage.getItem("sherlocked") === "true";
if (sherlockedActivo) location.href = "sherlocked.html";

const respuestaSher = "SHER";
const cajasSher = [...document.querySelectorAll(".caja")];
let posicionSher = 0;

function actualizarSherlock() {
    cajasSher.forEach(caja => caja.classList.remove("activa"));
    if (posicionSher < cajasSher.length) cajasSher[posicionSher].classList.add("activa");

    const intento = cajasSher.map(caja => caja.textContent).join("");
    if (intento.length !== respuestaSher.length) return;

    if (intento === respuestaSher) {
        localStorage.setItem("sherlocked", "true");
        setTimeout(() => document.getElementById("palabra").innerHTML = `<div class="lock-line">S   H   E   R</div>`, 1000);
        setTimeout(() => location.href = "sherlocked.html", 2000);
        return;
    }

    cajasSher.forEach(caja => caja.classList.add("shake"));
    setTimeout(() => {
        cajasSher.forEach(caja => {
            caja.textContent = "";
            caja.classList.remove("shake");
        });
        posicionSher = 0;
        actualizarSherlock();
    }, 500);
}

document.addEventListener("keydown", e => {
    if (/^[a-z]$/i.test(e.key) && posicionSher < cajasSher.length) {
        cajasSher[posicionSher].textContent = e.key.toUpperCase();
        posicionSher++;
        actualizarSherlock();
    }

    if (e.key === "Backspace" && posicionSher > 0) {
        posicionSher--;
        cajasSher[posicionSher].textContent = "";
        actualizarSherlock();
    }
});

actualizarSherlock();
