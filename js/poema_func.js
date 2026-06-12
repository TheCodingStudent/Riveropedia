
const fecha = new URLSearchParams(location.search).get("fecha");
const poema = poemas[fecha];

const $ = id => document.getElementById(id);

const puedeAbrirse = fechaISO => {

    const [y, m, d] = fechaISO.split("-").map(Number);

    const fechaPoema = new Date(y, m - 1, d);

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    return fechaPoema <= hoy;
};

const envolverLetras = (html, letras) => {

    let dentroTag = false;
    let resultado = "";

    for (const c of html) {

        if (c === "<") dentroTag = true;

        resultado += (
            !dentroTag &&
            letras.some(
                l => l.toLowerCase() === c.toLowerCase()
            )
        )
            ? `<span class="oculto-tecla">${c}</span>`
            : c;

        if (c === ">") dentroTag = false;
    }

    return resultado;
};

const obtenerZoom = () =>
    window.visualViewport?.scale ||
    window.devicePixelRatio ||
    1;

const aplicarBlur = (html, blur) => {

    let resultado = "";
    let dentroTag = false;
    let indice = 0;

    for (const c of html) {

        if (c === "<") {
            dentroTag = true;
        }

        if (
            !dentroTag &&
            indice < blur.length &&
            c.toLowerCase() === blur[indice][0].toLowerCase()
        ) {

            resultado +=
                `<span class="blur-letra" data-zoom="${blur[indice][1]}">${c}</span>`;

            indice++;
        }
        else {
            resultado += c;
        }

        if (c === ">") {
            dentroTag = false;
        }
    }

    return resultado;
};

const revisarZoom = () => {

    const zoom =
        window.devicePixelRatio;

    document
        .querySelectorAll(".blur-letra")
        .forEach(el => {

            el.classList.toggle(
                "revelada",
                zoom >=
                parseFloat(
                    el.dataset.zoom
                )
            );

        });
};

const actualizarBlur = () => {

    const zoom = obtenerZoom();
    console.log(zoom);

    document
        .querySelectorAll(".blur-letra")
        .forEach(el => {

            if (
                zoom >=
                parseFloat(el.dataset.zoom)
            ) {
                el.classList.add("revelada");
            } else {
                el.classList.remove("revelada");
            }
        });
};

window.addEventListener("resize", actualizarBlur);

window.visualViewport?.addEventListener(
    "resize",
    actualizarBlur
);

window.visualViewport?.addEventListener(
    "scroll",
    actualizarBlur
);

actualizarBlur();

const aplicarMask = (el, textoReal) => {

    const textoVisible =
        el.textContent;

    el.classList.add(
        "mask-container"
    );

    el.innerHTML = `
            <span class="mask-falso">
                ${textoVisible}
            </span>

            <span class="mask-real">
                ${textoReal}
            </span>
        `;

    const real =
        el.querySelector(
            ".mask-real"
        );

    el.addEventListener(
        "mousemove",
        e => {

            const rect =
                el.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;

            const radio =
                rect.height * 0.5;

            real.style.setProperty(
                "--mx",
                `${x}px`
            );

            real.style.setProperty(
                "--my",
                `${y}px`
            );

            real.style.setProperty(
                "--radio",
                `${radio}px`
            );

            real.style.clipPath =
                `circle(${radio}px at ${x}px ${y}px)`;
        }
    );

    el.addEventListener(
        "mouseleave",
        () => {

            real.style.clipPath =
                "circle(0px at 0px 0px)";
        }
    );
};

if (!puedeAbrirse(fecha)) {

    location.replace(
        "/Riveropedia/info/tramposa.html?fecha=" +
        encodeURIComponent(fecha)
    );

} else if (!poema) {

    location.href =
        "/Riveropedia/info/pendiente.html";

} else {

    document.title =
        poema.titulo;

    $("poema-fecha").textContent =
        poema.fecha;

    $("poema-titulo").textContent =
        poema.titulo;

    let html =
        poema.estrofas
            .map(
                e => `<p>${e.join("<br>")}</p>`
            )
            .join("");

    if (poema.ocultar) {

        html = envolverLetras(
            html,
            Array.isArray(poema.ocultar)
                ? poema.ocultar
                : [...poema.ocultar]
        );
    }

    if (poema.blur) {

        html = aplicarBlur(
            html,
            poema.blur
        );
    }

    $("poema-texto").innerHTML = html;

    $("poema-firma").innerHTML = `
            <span>— ${poema.autor}</span><br>
            <small>${poema.pd}</small>
        `;

    if (poema.mask) {

        aplicarMask(
            $("poema-titulo"),
            poema.mask
        );
    }

    revisarZoom();

    window.addEventListener(
        "resize",
        revisarZoom
    );
}

$("form").addEventListener(
    "submit",
    function (e) {

        e.preventDefault();

        $("time").value =
            poema.titulo;

        emailjs
            .sendForm(
                "service_j62vr7a",
                "template_9b5jaiy",
                this
            )
            .then(() =>
                alert(
                    "Mensaje enviado ✅"
                )
            )
            .catch(err =>
                alert(
                    "Error ❌ " +
                    JSON.stringify(err)
                )
            );
    }
);

document.addEventListener(
    "keydown",
    e => {

        if (
            e.ctrlKey ||
            e.shiftKey ||
            e.altKey ||
            e.metaKey
        ) {
            return;
        }

        const tecla =
            e.key.toLowerCase();

        document
            .querySelectorAll(
                ".oculto-tecla"
            )
            .forEach(el => {

                if (
                    el.textContent
                        .toLowerCase() === tecla
                ) {
                    el.classList.add(
                        "revelado"
                    );
                }
            });
    }
);