const RIVEROPEDIA_BASE = "/Riveropedia/";

function crearTopbar() {
    const mostrarSherlocked = document.body.dataset.sherlockedLink === "true";
    const enlaces = [
        `<li><a href="${RIVEROPEDIA_BASE}index.html">Inicio</a></li>`,
        `<li><a href="${RIVEROPEDIA_BASE}info/sobre-ti.html">Sobre ti</a></li>`
    ];

    if (mostrarSherlocked) {
        enlaces.push(`<li><a id="link-sherlocked" href="${RIVEROPEDIA_BASE}info/crypto.html">Sherlocked</a></li>`);
    }

    return `
        <nav class="topbar">
            <div class="topbar-section left">
                <form id="busqueda-form">
                    <input type="text" id="busqueda" placeholder="Buscar..." autocomplete="off">
                    <ul id="sugerencias"></ul>
                </form>
            </div>
            <div class="topbar-section center">
                <h1 class="titulo tooltip">
                    ♡ N.I.N.A
                    <span class="tooltiptext">Neural Interface for Noble Affection</span>
                </h1>
            </div>
            <div class="topbar-section right">
                <ul>${enlaces.join("")}</ul>
            </div>
        </nav>`;
}

function crearFooter() {
    return `<footer><p>© 2026 A. Ssshparro</p></footer>`;
}

function initLayout() {
    if (!document.querySelector(".topbar")) {
        document.body.insertAdjacentHTML("afterbegin", crearTopbar());
    }

    if (!document.querySelector("footer")) {
        document.body.insertAdjacentHTML("beforeend", crearFooter());
    }
}

initLayout();
