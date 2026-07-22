const fecha = new URLSearchParams(location.search).get("fecha");
const poema = fecha && typeof poemas !== "undefined" ? poemas[fecha] : null;
const $ = id => document.getElementById(id);

const puedeAbrirse = fechaISO => {
    if (!fechaISO) return false;
    const [y, m, d] = fechaISO.split("-").map(Number);
    const fechaPoema = new Date(y, m - 1, d);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    return fechaPoema <= hoy;
};

function envolverLetras(html, letras) {
    const conjunto = new Set((Array.isArray(letras) ? letras : [...letras]).map(l => l.toLowerCase()));
    let dentroTag = false, resultado = "";
    for (const c of html) {
        if (c === "<") dentroTag = true;
        resultado += !dentroTag && conjunto.has(c.toLowerCase()) ? `<span class="oculto-tecla">${c}</span>` : c;
        if (c === ">") dentroTag = false;
    }
    return resultado;
}

function aplicarAlternanciasTiempo(span) {
    const inner = span.querySelector(".alternancia-inner");
    const original = span.dataset.original;
    const alterna = JSON.parse(span.dataset.alterna);
    const delay = parseInt(span.dataset.delay, 10) || 3000;
    let estado = 0;

    setInterval(() => {
        const reemplazo = estado < alterna.length ? alterna[estado] : original;
        inner.textContent = reemplazo;
        estado = (estado + 1) % (alterna.length + 1);
    }, delay);
}

function aplicarAlternanciasMouse(span) {
    const inner = span.querySelector(".alternancia-inner");
    const original = span.dataset.original;
    const alterna = JSON.parse(span.dataset.alterna);

    span.addEventListener("mouseenter", () => {
        inner.textContent = alterna[0];
    });
    span.addEventListener("mouseleave", () => {
        inner.textContent = original;
    });
}


function envolverAlternancias(html, alternancias) {
    alternancias.forEach(item => {
        const opciones = Array.isArray(item.alterna) ? item.alterna : [item.alterna];
        const todas = [item.original, ...opciones];
        const maxLen = Math.max(...todas.map(p => p.length));

        // Regex para encontrar la palabra original
        const regex = new RegExp(`\\b${item.original}\\b`, "gi");
        let index = 0;

        html = html.replace(regex, match => {
            index++;
            // Si se especifica "posicion", solo reemplaza esa ocurrencia
            if (!item.posicion || index === item.posicion) {
                return `<span class="alternancia" 
                            style="display:inline-block; width:${maxLen}ch; text-align:center;" 
                            data-original="${item.original}" 
                            data-alterna='${JSON.stringify(opciones)}' 
                            data-delay="${item.delay || 3000}" 
                            data-modo="${item.modo || "tiempo"}">
                            <span class="alternancia-inner">${item.original}</span>
                        </span>`;
            }
            return match; // las demás ocurrencias quedan igual
        });
    });
    return html;
}

function aplicarAlternancias() {
    document.querySelectorAll(".alternancia").forEach(span => {
        const inner = span.querySelector(".alternancia-inner");
        const original = span.dataset.original;
        const alterna = JSON.parse(span.dataset.alterna);
        const baseDelay = parseInt(span.dataset.delay, 10) || 3000;
        const modo = span.dataset.modo || "tiempo";

        if (modo === "mouse") {
            // Cambia al pasar el cursor con animación
            span.addEventListener("mouseenter", () => {
                inner.classList.add("fade-out");
                setTimeout(() => {
                    inner.textContent = alterna[0];
                    inner.classList.remove("fade-out");
                    inner.classList.add("fade-in");
                    setTimeout(() => inner.classList.remove("fade-in"), 500);
                }, 500);
            });

            span.addEventListener("mouseleave", () => {
                inner.classList.add("fade-out");
                setTimeout(() => {
                    inner.textContent = original;
                    inner.classList.remove("fade-out");
                    inner.classList.add("fade-in");
                    setTimeout(() => inner.classList.remove("fade-in"), 500);
                }, 500);
            });
        } else {
            // Estado inicial aleatorio
            let estado = Math.floor(Math.random() * (alterna.length + 1));

            // Offset inicial aleatorio
            const offset = Math.floor(Math.random() * baseDelay);

            // Delay único para cada palabra (±30% del baseDelay)
            const delay = baseDelay + Math.floor((Math.random() - 0.5) * baseDelay * 0.6);

            setTimeout(() => {
                setInterval(() => {
                    const reemplazo = estado < alterna.length ? alterna[estado] : original;

                    inner.classList.add("fade-out");
                    setTimeout(() => {
                        inner.textContent = reemplazo;
                        inner.classList.remove("fade-out");
                        inner.classList.add("fade-in");
                        setTimeout(() => inner.classList.remove("fade-in"), 500);
                    }, 500);

                    estado = (estado + 1) % (alterna.length + 1);
                }, delay);
            }, offset);
        }
    });
}

function aplicarBlur(html, blur) {
    let dentroTag = false, indice = 0, resultado = "";
    for (const c of html) {
        if (c === "<") dentroTag = true;
        if (!dentroTag && indice < blur.length && c.toLowerCase() === blur[indice][0].toLowerCase()) {
            resultado += `<span class="blur-letra" data-zoom="${blur[indice][1]}">${c}</span>`;
            indice++;
        } else resultado += c;
        if (c === ">") dentroTag = false;
    }
    return resultado;
}

function actualizarBlur() {
    const zoom = window.visualViewport?.scale || window.devicePixelRatio || 1;
    document.querySelectorAll(".blur-letra").forEach(el => {
        el.classList.toggle("revelada", zoom >= parseFloat(el.dataset.zoom));
    });
}

function aplicarMask(el, textoReal) {
    const textoVisible = el.textContent;
    el.classList.add("mask-container");
    el.innerHTML = `<span class="mask-falso">${textoVisible}</span><span class="mask-real">${textoReal}</span>`;
    const real = el.querySelector(".mask-real");

    el.addEventListener("mousemove", e => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left, y = e.clientY - rect.top, radio = rect.height * 0.5;
        real.style.setProperty("--mx", `${x}px`);
        real.style.setProperty("--my", `${y}px`);
        real.style.setProperty("--radio", `${radio}px`);
        real.style.clipPath = `circle(${radio}px at ${x}px ${y}px)`;
    });

    el.addEventListener("mouseleave", () => real.style.clipPath = "circle(0px at 0px 0px)");
}

function estrofasHtml(estrofas) {
    return estrofas.map(estrofa => `<p>${estrofa.join("<br>")}</p>`).join("");
}

function estrofasHtmlConIniciales(estrofas) {
    return estrofas.map(estrofa => {
        const versos = [...estrofa];
        versos[0] = versos[0].replace(/^(\S)/, `<span class="inicial-revelada">$1</span>`);
        return `<p>${versos.join("<br>")}</p>`;
    }).join("");
}

function renderCopias() {
    const seleccion = poema.estadoInicial?.length ? [...poema.estadoInicial] : poema.estrofasCopias.map(() => 0);
    const correcto = poema.combinacionCorrecta;
    const contenedor = $("poema-texto");
    let ultimaAnimacion = null;

    const render = () => {
        contenedor.innerHTML = poema.estrofasCopias.map((grupo, i) => `
            <article class="copia-estrofa ${ultimaAnimacion?.index === i ? ultimaAnimacion.clase : ""}">
                <button class="copia-btn" type="button" data-index="${i}" data-dir="-1" aria-label="Estrofa anterior">‹</button>
                <div class="copia-texto">${estrofasHtml([grupo[seleccion[i]]])}</div>
                <button class="copia-btn" type="button" data-index="${i}" data-dir="1" aria-label="Estrofa siguiente">›</button>
            </article>
        `).join("");
        ultimaAnimacion = null;
    };

    const revelar = () => {
        contenedor.classList.add("tesoro-revelado");
        $("poema-titulo").classList.add("titulo-revelado");
        $("poema-titulo").textContent = poema.revelacion?.titulo || poema.titulo;
        contenedor.innerHTML = `<div class="poema-revelado">${estrofasHtmlConIniciales(poema.estrofas)}</div>`;
        $("poema-firma").innerHTML = `<span>— ${poema.autor}</span><br><small>${poema.revelacion?.pd || poema.pd}</small>`;
    };

    render();
    contenedor.addEventListener("click", e => {
        const btn = e.target.closest(".copia-btn");
        if (!btn || contenedor.classList.contains("tesoro-revelado")) return;

        const index = Number(btn.dataset.index);
        const dir = Number(btn.dataset.dir);
        const total = poema.estrofasCopias[index].length;
        seleccion[index] = (seleccion[index] + dir + total) % total;
        ultimaAnimacion = { index, clase: dir > 0 ? "copia-slide-next" : "copia-slide-prev" };
        render();

        if (seleccion.every((valor, i) => valor === correcto[i])) revelar();
    });
}

function hexARgb(color) {
    const valor = String(color || "").trim();
    const rgbMatch = valor.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*[\d.]+)?\s*\)$/i);

    if (rgbMatch) {
        return {
            r: limitar(Number(rgbMatch[1]), 0, 255),
            g: limitar(Number(rgbMatch[2]), 0, 255),
            b: limitar(Number(rgbMatch[3]), 0, 255)
        };
    }

    const hslMatch = valor.match(/^hsla?\(\s*([\d.]+)(?:deg)?(?:\s*,\s*|\s+)([\d.]+)%?(?:\s*,\s*|\s+)([\d.]+)%?(?:\s*\/\s*[\d.]+%?)?\s*\)$/i);

    if (hslMatch) {
        const h = (((Number(hslMatch[1]) % 360) + 360) % 360) / 360;
        const s = limitar(Number(hslMatch[2]) / 100, 0, 1);
        const l = limitar(Number(hslMatch[3]) / 100, 0, 1);
        const convertir = (p, q, tBase) => {
            let t = tBase;
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        if (s === 0) {
            const gris = Math.round(l * 255);
            return { r: gris, g: gris, b: gris };
        }

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        return {
            r: Math.round(convertir(p, q, h + 1 / 3) * 255),
            g: Math.round(convertir(p, q, h) * 255),
            b: Math.round(convertir(p, q, h - 1 / 3) * 255)
        };
    }

    let limpio = valor.replace("#", "").trim();
    if (/^[0-9a-f]{3}$/i.test(limpio)) limpio = limpio.split("").map(letra => letra + letra).join("");
    if (!/^[0-9a-f]{6}$/i.test(limpio)) return { r: 255, g: 79, b: 135 };
    return {
        r: parseInt(limpio.slice(0, 2), 16),
        g: parseInt(limpio.slice(2, 4), 16),
        b: parseInt(limpio.slice(4, 6), 16)
    };
}

function limitar(valor, min, max) {
    return Math.min(max, Math.max(min, valor));
}

function rgbAHex({ r, g, b }) {
    return `#${[r, g, b].map(valor => Math.round(valor).toString(16).padStart(2, "0")).join("")}`;
}

function rgbAHsv({ r, g, b }) {
    const rn = r / 255, gn = g / 255, bn = b / 255;
    const max = Math.max(rn, gn, bn);
    const min = Math.min(rn, gn, bn);
    const delta = max - min;
    let h = 0;

    if (delta) {
        if (max === rn) h = 60 * (((gn - bn) / delta) % 6);
        else if (max === gn) h = 60 * ((bn - rn) / delta + 2);
        else h = 60 * ((rn - gn) / delta + 4);
    }

    return {
        h: Math.round((h + 360) % 360),
        s: max === 0 ? 0 : delta / max,
        v: max
    };
}

function hsvARgb({ h, s, v }) {
    const c = v * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = v - c;
    let r = 0, g = 0, b = 0;

    if (h < 60) [r, g, b] = [c, x, 0];
    else if (h < 120) [r, g, b] = [x, c, 0];
    else if (h < 180) [r, g, b] = [0, c, x];
    else if (h < 240) [r, g, b] = [0, x, c];
    else if (h < 300) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];

    return {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255)
    };
}

function distanciaColor(a, b) {
    return Math.sqrt(
        Math.pow(a.r - b.r, 2) +
        Math.pow(a.g - b.g, 2) +
        Math.pow(a.b - b.b, 2)
    );
}

function escaparRegExp(texto) {
    return String(texto || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function obtenerTextoPistaColor(pista) {
    return pista?.pista || pista?.nombre || pista?.palabra || pista?.texto || pista?.valor || "";
}

function contienePistaColor(html, pista) {
    const textoPista = obtenerTextoPistaColor(pista);
    if (!textoPista) return false;
    const regex = new RegExp(`(^|[^\\p{L}\\p{N}_])(${escaparRegExp(textoPista)})(?=$|[^\\p{L}\\p{N}_])`, "iu");
    return regex.test(html.replace(/<[^>]*>/g, ""));
}

function resaltarPistaColor(html, pista, color) {
    if (!pista) return html;
    const regex = new RegExp(`(^|[^\\p{L}\\p{N}_])(${escaparRegExp(pista)})(?=$|[^\\p{L}\\p{N}_])`, "giu");
    let dentroTag = false;
    let fragmento = "";
    let resultado = "";

    const envolverTexto = texto => texto ? `<span class="color-texto">${texto}</span>` : "";
    const construirPista = palabra => `
        <span class="color-palabra" style="--color-objetivo:${color}" data-color-tooltip="${color}">
            <span class="color-circulo" aria-hidden="true"></span>
            <span class="color-palabra-texto">${palabra}</span>
        </span>
    `;

    const procesarFragmento = texto => {
        let salida = "";
        let ultimoIndice = 0;

        for (const match of texto.matchAll(regex)) {
            const indice = match.index;
            const antes = match[1] || "";
            const palabra = match[2];
            const inicioPalabra = indice + antes.length;

            salida += envolverTexto(texto.slice(ultimoIndice, indice));
            salida += envolverTexto(antes);
            salida += construirPista(palabra);
            ultimoIndice = inicioPalabra + palabra.length;
        }

        return salida + envolverTexto(texto.slice(ultimoIndice));
    };

    for (const caracter of html) {
        if (caracter === "<") {
            resultado += procesarFragmento(fragmento);
            fragmento = "";
            dentroTag = true;
        }

        if (dentroTag) resultado += caracter;
        else fragmento += caracter;

        if (caracter === ">") dentroTag = false;
    }

    return resultado + procesarFragmento(fragmento);
}

function renderColor() {
    const pistas = poema.colorPistas || poema.colores || [];
    const contenedor = $("poema-texto");
    const colorInicial = poema.colorInicial || pistas[0]?.color || "#ff4f87";
    const umbral = poema.colorUmbral ?? 0.88;

    contenedor.classList.add("poema-color-texto");
    contenedor.innerHTML = `
        <section class="color-mecanica" aria-label="Rueda de color para revelar el poema">
            <div class="color-panel">
                <div class="color-preview" aria-hidden="true"></div>
                <div class="color-picker">
                    <div class="color-control-titulo">Busca el color escondido</div>
                    <div class="color-sv" role="slider" tabindex="0" aria-label="Saturación y brillo del color">
                        <span class="color-sv-cursor" aria-hidden="true"></span>
                    </div>
                    <div class="color-hue" role="slider" tabindex="0" aria-label="Tono del color">
                        <span class="color-hue-cursor" aria-hidden="true"></span>
                    </div>
                    <div class="color-valores" aria-live="polite">
                        <code class="color-hex"></code>
                        <code class="color-rgb"></code>
                        <code class="color-hsv"></code>
                    </div>
                </div>
                <small class="color-ayuda">Acércate al tono de cada pista para revelar su estrofa.</small>
            </div>
            <div class="color-poema-normal">
                ${poema.estrofas.map((estrofa, i) => {
                    const htmlEstrofa = estrofa.join("\n");
                    const pistasEnEstrofa = pistas.filter(pista => contienePistaColor(htmlEstrofa, pista));
                    const pistaBase = pistasEnEstrofa[0] || pistas[i] || {};
                    const colorObjetivo = pistaBase.color || colorInicial;
                    const pistasParaResaltar = pistasEnEstrofa.length ? pistasEnEstrofa : [pistaBase];
                    const versos = estrofa.map(verso => pistasParaResaltar.reduce((html, pista) => {
                        const textoPista = obtenerTextoPistaColor(pista);
                        return resaltarPistaColor(html, textoPista, pista.color || colorObjetivo);
                    }, verso));
                    return `
                        <p class="color-estrofa" data-color="${colorObjetivo}">
                            ${versos.join("<br>")}
                        </p>
                    `;
                }).join("")}
            </div>
        </section>
    `;

    const preview = contenedor.querySelector(".color-preview");
    const panel = contenedor.querySelector(".color-panel");
    const areaSV = contenedor.querySelector(".color-sv");
    const cursorSV = contenedor.querySelector(".color-sv-cursor");
    const barraHue = contenedor.querySelector(".color-hue");
    const cursorHue = contenedor.querySelector(".color-hue-cursor");
    const textoHex = contenedor.querySelector(".color-hex");
    const textoRgb = contenedor.querySelector(".color-rgb");
    const textoHsv = contenedor.querySelector(".color-hsv");
    const estrofas = [...contenedor.querySelectorAll(".color-estrofa")];
    const estadoColor = rgbAHsv(hexARgb(colorInicial));

    const colorSeleccionado = () => {
        const rgb = hsvARgb(estadoColor);
        return { rgb, hex: rgbAHex(rgb) };
    };

    const moverSV = event => {
        const rect = areaSV.getBoundingClientRect();
        estadoColor.s = limitar((event.clientX - rect.left) / rect.width, 0, 1);
        estadoColor.v = limitar(1 - (event.clientY - rect.top) / rect.height, 0, 1);
        actualizar();
    };

    const moverHue = event => {
        const rect = barraHue.getBoundingClientRect();
        estadoColor.h = Math.round(limitar((event.clientX - rect.left) / rect.width, 0, 1) * 359);
        actualizar();
    };

    const iniciarArrastre = (elemento, mover) => {
        elemento.addEventListener("pointerdown", event => {
            event.preventDefault();
            elemento.setPointerCapture(event.pointerId);
            mover(event);
        });
        elemento.addEventListener("pointermove", event => {
            if (event.buttons) mover(event);
        });
    };

    const actualizar = () => {
        const { rgb: seleccionado, hex } = colorSeleccionado();
        const hsvTexto = {
            h: Math.round(estadoColor.h),
            s: Math.round(estadoColor.s * 100),
            v: Math.round(estadoColor.v * 100)
        };
        preview.style.background = hex;
        panel.style.setProperty("--color-actual", hex);
        panel.style.setProperty("--color-hue", `hsl(${estadoColor.h} 100% 50%)`);
        cursorSV.style.left = `${estadoColor.s * 100}%`;
        cursorSV.style.top = `${(1 - estadoColor.v) * 100}%`;
        cursorHue.style.left = `${estadoColor.h / 359 * 100}%`;
        textoHex.textContent = hex.toUpperCase();
        textoRgb.textContent = `RGB(${seleccionado.r}, ${seleccionado.g}, ${seleccionado.b})`;
        textoHsv.textContent = `HSV(${hsvTexto.h}°, ${hsvTexto.s}%, ${hsvTexto.v}%)`;

        estrofas.forEach(estrofa => {
            const objetivoHex = estrofa.dataset.color;
            const objetivo = hexARgb(objetivoHex);
            const cercania = Math.max(0, 1 - distanciaColor(seleccionado, objetivo) / 260);
            const revelado = cercania >= umbral;
            estrofa.style.setProperty("--color-objetivo", objetivoHex);
            estrofa.style.setProperty("--color-cercania", cercania.toFixed(3));
            estrofa.style.setProperty("--color-blur", `${(14 * (1 - cercania)).toFixed(2)}px`);
            estrofa.style.setProperty("--color-opacidad", Math.max(.16, cercania).toFixed(3));
            estrofa.style.setProperty("--color-offset", `${(8 * (1 - cercania)).toFixed(2)}px`);
            estrofa.style.setProperty("--color-sombra", (.04 + cercania * .16).toFixed(3));
            estrofa.classList.toggle("color-revelada", revelado);
        });
    };

    iniciarArrastre(areaSV, moverSV);
    iniciarArrastre(barraHue, moverHue);
    areaSV.addEventListener("keydown", event => {
        const paso = event.shiftKey ? .1 : .03;
        if (event.key === "ArrowRight") estadoColor.s = limitar(estadoColor.s + paso, 0, 1);
        else if (event.key === "ArrowLeft") estadoColor.s = limitar(estadoColor.s - paso, 0, 1);
        else if (event.key === "ArrowUp") estadoColor.v = limitar(estadoColor.v + paso, 0, 1);
        else if (event.key === "ArrowDown") estadoColor.v = limitar(estadoColor.v - paso, 0, 1);
        else return;
        event.preventDefault();
        actualizar();
    });
    barraHue.addEventListener("keydown", event => {
        const paso = event.shiftKey ? 15 : 3;
        if (event.key === "ArrowRight" || event.key === "ArrowUp") estadoColor.h = (estadoColor.h + paso) % 360;
        else if (event.key === "ArrowLeft" || event.key === "ArrowDown") estadoColor.h = (estadoColor.h - paso + 360) % 360;
        else return;
        event.preventDefault();
        actualizar();
    });
    actualizar();

    $("poema-firma").innerHTML = `<span>— ${poema.autor}</span><br><small>${poema.pd}</small>`;
}

function renderPoema() {
    if (!puedeAbrirse(fecha)) {
        location.replace("/Riveropedia/info/tramposa.html?fecha=" + encodeURIComponent(fecha || ""));
        return;
    }

    if (!poema) {
        location.href = "/Riveropedia/info/pendiente.html" + (fecha ? `?fecha=${encodeURIComponent(fecha)}` : "");
        return;
    }

    document.title = poema.titulo;
    $("poema-fecha").textContent = poema.fecha;
    $("poema-titulo").textContent = poema.titulo;

    if (poema.mecanica === "copias") {
        renderCopias();
        $("poema-firma").innerHTML = `<span>— ${poema.autor}</span><br><small>${poema.pd}</small>`;
        return;
    }

    if (poema.mecanica === "color") {
        renderColor();
        return;
    }

    let html = estrofasHtml(poema.estrofas);

    // Alternancias con modo por cada item
    if (poema.alternancias) {
        html = envolverAlternancias(html, poema.alternancias);
    }

    if (poema.ocultar) html = envolverLetras(html, poema.ocultar);
    if (poema.blur) html = aplicarBlur(html, poema.blur);
    if (poema.carrusel) {
        let versos = estrofasHtml(poema.estrofas);
        html = `
            <div class="carrusel">
                <div class="carrusel-track">${versos}</div>
                <div class="carrusel-track">${versos}</div>
            </div>
        `;
    }

    $("poema-texto").innerHTML = html;
    $("poema-firma").innerHTML = `<span>— ${poema.autor}</span><br><small>${poema.pd}</small>`;

    if (poema.mapa) {
        const btnMapa = document.createElement("button");
        btnMapa.innerHTML = "🗺️";
        btnMapa.className = "map-float-button";
        btnMapa.title = "Ver mapa interactivo";
        btnMapa.onclick = () => {
            if (poema.objetivoMapa) {
                localStorage.setItem("objetivoMapa", poema.objetivoMapa);
            }
            window.location.href = "/Riveropedia/info/maps.html";
        };
        document.body.appendChild(btnMapa);
    }


    if (poema.mask) aplicarMask($("poema-titulo"), poema.mask);
    if (poema.alternancias) aplicarAlternancias(); // 👈 ahora decide según cada alternancia
    actualizarBlur();
}

function initEmailForm() {
    const form = $("form");
    if (!form) return;
    if (typeof emailjs !== "undefined") emailjs.init("keJJLe8j0STrmJjvm");

    form.addEventListener("submit", e => {
        e.preventDefault();
        $("time").value = poema?.titulo || "";

        if (typeof emailjs === "undefined") {
            alert("EmailJS no está disponible");
            return;
        }

        emailjs
            .sendForm("service_j62vr7a", "template_9b5jaiy", form)
            .then(() => alert("Mensaje enviado ✅"))
            .catch(err => alert("Error ❌ " + JSON.stringify(err)));
    });
}

function initPoemaKeys() {
    document.addEventListener("keydown", e => {
        if (e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return;
        const tecla = e.key.toLowerCase();
        document.querySelectorAll(".oculto-tecla").forEach(el => {
            if (el.textContent.toLowerCase() === tecla) el.classList.add("revelado");
        });
    });
}

window.addEventListener("resize", actualizarBlur);
window.visualViewport?.addEventListener("resize", actualizarBlur);
window.visualViewport?.addEventListener("scroll", actualizarBlur);

renderPoema();
initEmailForm();
initPoemaKeys();
