const familias = {
    pasion: "#ff6fbd",
    ternura: "#ffd985",
    calma: "#74ddff",
    cuidado: "#7dffb2",
    misterio: "#aa86ff"
};

const mensajesFamilia = {
    pasion: "Una reacción intensa: no siempre hace ruido, pero cambia la temperatura del mundo.",
    ternura: "Una forma suave de permanecer, como una luz pequeña que no se cansa.",
    calma: "Un elemento estable: baja el volumen del caos y vuelve respirable la distancia.",
    cuidado: "La química de sostener sin apretar, de estar sin invadir, de querer bonito.",
    misterio: "Una fuerza rara y luminosa: no se explica del todo, pero se siente inevitable."
};

const elementosEspeciales = {
    H: {
        nombre: "Hábito",
        texto: "La costumbre bonita de pensarte incluso cuando el día intenta hacerse el serio."
    },
    He: {
        nombre: "Hechizo",
        texto: "Eso que haces sin darte cuenta y aun así me cambia la gravedad."
    },
    Li: {
        nombre: "Latido inicial",
        texto: "El primer golpe suave del pecho cuando apareces en mi cabeza."
    },
    Be: {
        nombre: "Beso eterno",
        texto: "Una promesa pequeña con vocación de quedarse mucho tiempo."
    },
    B: {
        nombre: "Brillo",
        texto: "La luz mínima que de pronto vuelve habitable cualquier lugar."
    },
    C: {
        nombre: "Cuidado",
        texto: "Amar sin ruido: notar, sostener, cubrir del frío."
    },
    N: {
        nombre: "Nido",
        texto: "El lugar al que mi cansancio quiere volver cuando te piensa."
    },
    O: {
        nombre: "Oxígeno",
        texto: "No porque me falte aire, sino porque contigo respiro distinto."
    },
    F: {
        nombre: "Fiebre",
        texto: "La temperatura secreta de extrañarte demasiado."
    },
    Ne: {
        nombre: "Neblina",
        texto: "Ese misterio dulce donde no entiendo todo, pero quiero quedarme."
    },
    Na: {
        nombre: "Nácar",
        texto: "La forma delicada en que algo herido también puede volverse hermoso."
    },
    Mg: {
        nombre: "Magnetismo",
        texto: "La explicación menos científica para seguir acercándome a ti."
    },
    Al: {
        nombre: "Alma",
        texto: "Lo que no se ve, pero de algún modo reconoce tu nombre."
    },
    Si: {
        nombre: "Siempre",
        texto: "Una palabra inmensa disfrazada de sílaba simple."
    },
    P: {
        nombre: "Pulso",
        texto: "Mi manera biológica de confesar que algo en mí te celebra."
    },
    S: {
        nombre: "Suspiro",
        texto: "Una pausa del cuerpo para pronunciarte sin decirte."
    },
    Cl: {
        nombre: "Claridad",
        texto: "Cuando llegas y las cosas dejan de pelearse dentro de mí."
    },
    Ar: {
        nombre: "Abrazo",
        texto: "Un refugio con brazos, temperatura y memoria."
    },
    K: {
        nombre: "Kilómetro",
        texto: "La distancia intentando presumir que puede más que mis ganas de verte."
    },
    Ca: {
        nombre: "Caricia",
        texto: "La frase que la piel entiende antes que cualquier idioma."
    },
    Sc: {
        nombre: "Secreto",
        texto: "Una verdad guardada con moño, esperando el momento correcto."
    },
    Ti: {
        nombre: "Tibieza",
        texto: "La forma en que tu presencia le baja el volumen al mundo."
    },
    V: {
        nombre: "Vértigo",
        texto: "Mirarte y sentir que el suelo también sabe emocionarse."
    },
    Cr: {
        nombre: "Creer",
        texto: "La fe tranquila de elegirte incluso en días nublados."
    },
    Mn: {
        nombre: "Mañana",
        texto: "Ese futuro que suena menos abstracto cuando te incluye."
    },
    Fe: {
        nombre: "Fidelidad",
        texto: "Quedarme, no por costumbre, sino por convicción luminosa."
    },
    Co: {
        nombre: "Cómplice",
        texto: "La persona con quien hasta el silencio parece planear travesuras."
    },
    Ni: {
        nombre: "Niñez",
        texto: "La parte de mí que vuelve a jugar cuando me miras bonito."
    },
    Cu: {
        nombre: "Curiosidad",
        texto: "Las ganas infinitas de seguir descubriendo tus mundos pequeños."
    },
    Zn: {
        nombre: "Zona segura",
        texto: "Donde puedo ser raro, tierno, torpe y todavía querido."
    },
    Ga: {
        nombre: "Galaxia",
        texto: "Todo lo que eres cuando intento explicarte y me queda corto el cielo."
    },
    Ge: {
        nombre: "Gesto",
        texto: "La evidencia mínima de que el amor también vive en detalles."
    },
    As: {
        nombre: "Asombro",
        texto: "La sorpresa de que existas precisamente así."
    },
    Se: {
        nombre: "Serenidad",
        texto: "Una paz que no exige silencio, solo tu manera de estar."
    },
    Br: {
        nombre: "Brasa",
        texto: "Lo que no hace escándalo, pero sigue ardiendo debajo."
    },
    Kr: {
        nombre: "Kryptonita",
        texto: "Mi punto débil más precioso: tú acercándote."
    },
    Rh: {
        nombre: "Refugio",
        texto: "El sitio emocional donde mi caos se sienta y baja los hombros."
    },
    Y: {
        nombre: "Y entonces",
        texto: "La conjunción perfecta: antes estaba el mundo, y entonces llegaste."
    },
    Pd: {
        nombre: "Piel despierta",
        texto: "La reacción química de estar cerca y fingir normalidad."
    },
    Nd: {
        nombre: "Nudo dulce",
        texto: "Ese enredo bonito en la garganta cuando quiero decir demasiado."
    }
};

const elementosBase = [
    { n: 1, s: "H", elemento: "Hidrógeno", familia: "ternura", col: 1, row: 1 },
    { n: 2, s: "He", elemento: "Helio", familia: "misterio", col: 18, row: 1 },

    { n: 3, s: "Li", elemento: "Litio", familia: "pasion", col: 1, row: 2 },
    { n: 4, s: "Be", elemento: "Berilio", familia: "pasion", col: 2, row: 2 },
    { n: 5, s: "B", elemento: "Boro", familia: "ternura", col: 13, row: 2 },
    { n: 6, s: "C", elemento: "Carbono", familia: "cuidado", col: 14, row: 2 },
    { n: 7, s: "N", elemento: "Nitrógeno", familia: "calma", col: 15, row: 2 },
    { n: 8, s: "O", elemento: "Oxígeno", familia: "calma", col: 16, row: 2 },
    { n: 9, s: "F", elemento: "Flúor", familia: "pasion", col: 17, row: 2 },
    { n: 10, s: "Ne", elemento: "Neón", familia: "misterio", col: 18, row: 2 },

    { n: 11, s: "Na", elemento: "Sodio", familia: "ternura", col: 1, row: 3 },
    { n: 12, s: "Mg", elemento: "Magnesio", familia: "pasion", col: 2, row: 3 },
    { n: 13, s: "Al", elemento: "Aluminio", familia: "misterio", col: 13, row: 3 },
    { n: 14, s: "Si", elemento: "Silicio", familia: "ternura", col: 14, row: 3 },
    { n: 15, s: "P", elemento: "Fósforo", familia: "pasion", col: 15, row: 3 },
    { n: 16, s: "S", elemento: "Azufre", familia: "calma", col: 16, row: 3 },
    { n: 17, s: "Cl", elemento: "Cloro", familia: "calma", col: 17, row: 3 },
    { n: 18, s: "Ar", elemento: "Argón", familia: "cuidado", col: 18, row: 3 },

    { n: 19, s: "K", elemento: "Potasio", familia: "misterio", col: 1, row: 4 },
    { n: 20, s: "Ca", elemento: "Calcio", familia: "ternura", col: 2, row: 4 },
    { n: 21, s: "Sc", elemento: "Escandio", familia: "misterio", col: 3, row: 4 },
    { n: 22, s: "Ti", elemento: "Titanio", familia: "ternura", col: 4, row: 4 },
    { n: 23, s: "V", elemento: "Vanadio", familia: "pasion", col: 5, row: 4 },
    { n: 24, s: "Cr", elemento: "Cromo", familia: "cuidado", col: 6, row: 4 },
    { n: 25, s: "Mn", elemento: "Manganeso", familia: "ternura", col: 7, row: 4 },
    { n: 26, s: "Fe", elemento: "Hierro", familia: "cuidado", col: 8, row: 4 },
    { n: 27, s: "Co", elemento: "Cobalto", familia: "misterio", col: 9, row: 4 },
    { n: 28, s: "Ni", elemento: "Níquel", familia: "ternura", col: 10, row: 4 },
    { n: 29, s: "Cu", elemento: "Cobre", familia: "misterio", col: 11, row: 4 },
    { n: 30, s: "Zn", elemento: "Zinc", familia: "cuidado", col: 12, row: 4 },
    { n: 31, s: "Ga", elemento: "Galio", familia: "misterio", col: 13, row: 4 },
    { n: 32, s: "Ge", elemento: "Germanio", familia: "ternura", col: 14, row: 4 },
    { n: 33, s: "As", elemento: "Arsénico", familia: "misterio", col: 15, row: 4 },
    { n: 34, s: "Se", elemento: "Selenio", familia: "calma", col: 16, row: 4 },
    { n: 35, s: "Br", elemento: "Bromo", familia: "pasion", col: 17, row: 4 },
    { n: 36, s: "Kr", elemento: "Kriptón", familia: "pasion", col: 18, row: 4 },

    { n: 37, s: "Rb", elemento: "Rubidio", familia: "pasion", col: 1, row: 5 },
    { n: 38, s: "Sr", elemento: "Estroncio", familia: "ternura", col: 2, row: 5 },
    { n: 39, s: "Y", elemento: "Itrio", familia: "misterio", col: 3, row: 5 },
    { n: 40, s: "Zr", elemento: "Circonio", familia: "cuidado", col: 4, row: 5 },
    { n: 41, s: "Nb", elemento: "Niobio", familia: "misterio", col: 5, row: 5 },
    { n: 42, s: "Mo", elemento: "Molibdeno", familia: "cuidado", col: 6, row: 5 },
    { n: 43, s: "Tc", elemento: "Tecnecio", familia: "misterio", col: 7, row: 5 },
    { n: 44, s: "Ru", elemento: "Rutenio", familia: "cuidado", col: 8, row: 5 },
    { n: 45, s: "Rh", elemento: "Rodio", familia: "cuidado", col: 9, row: 5 },
    { n: 46, s: "Pd", elemento: "Paladio", familia: "pasion", col: 10, row: 5 },
    { n: 47, s: "Ag", elemento: "Plata", familia: "ternura", col: 11, row: 5 },
    { n: 48, s: "Cd", elemento: "Cadmio", familia: "calma", col: 12, row: 5 },
    { n: 49, s: "In", elemento: "Indio", familia: "misterio", col: 13, row: 5 },
    { n: 50, s: "Sn", elemento: "Estaño", familia: "cuidado", col: 14, row: 5 },
    { n: 51, s: "Sb", elemento: "Antimonio", familia: "misterio", col: 15, row: 5 },
    { n: 52, s: "Te", elemento: "Telurio", familia: "ternura", col: 16, row: 5 },
    { n: 53, s: "I", elemento: "Yodo", familia: "pasion", col: 17, row: 5 },
    { n: 54, s: "Xe", elemento: "Xenón", familia: "misterio", col: 18, row: 5 },

    { n: 55, s: "Cs", elemento: "Cesio", familia: "pasion", col: 1, row: 6 },
    { n: 56, s: "Ba", elemento: "Bario", familia: "ternura", col: 2, row: 6 },
    { n: 57, s: "La", elemento: "Lantano", familia: "calma", col: 3, row: 6 },
    { n: 72, s: "Hf", elemento: "Hafnio", familia: "cuidado", col: 4, row: 6 },
    { n: 73, s: "Ta", elemento: "Tantalio", familia: "pasion", col: 5, row: 6 },
    { n: 74, s: "W", elemento: "Wolframio", familia: "misterio", col: 6, row: 6 },
    { n: 75, s: "Re", elemento: "Renio", familia: "ternura", col: 7, row: 6 },
    { n: 76, s: "Os", elemento: "Osmio", familia: "calma", col: 8, row: 6 },
    { n: 77, s: "Ir", elemento: "Iridio", familia: "pasion", col: 9, row: 6 },
    { n: 78, s: "Pt", elemento: "Platino", familia: "ternura", col: 10, row: 6 },
    { n: 79, s: "Au", elemento: "Oro", familia: "ternura", col: 11, row: 6 },
    { n: 80, s: "Hg", elemento: "Mercurio", familia: "misterio", col: 12, row: 6 },
    { n: 81, s: "Tl", elemento: "Talio", familia: "calma", col: 13, row: 6 },
    { n: 82, s: "Pb", elemento: "Plomo", familia: "cuidado", col: 14, row: 6 },
    { n: 83, s: "Bi", elemento: "Bismuto", familia: "misterio", col: 15, row: 6 },
    { n: 84, s: "Po", elemento: "Polonio", familia: "pasion", col: 16, row: 6 },
    { n: 85, s: "At", elemento: "Astato", familia: "misterio", col: 17, row: 6 },
    { n: 86, s: "Rn", elemento: "Radón", familia: "calma", col: 18, row: 6 },

    { n: 87, s: "Fr", elemento: "Francio", familia: "pasion", col: 1, row: 7 },
    { n: 88, s: "Ra", elemento: "Radio", familia: "ternura", col: 2, row: 7 },
    { n: 89, s: "Ac", elemento: "Actinio", familia: "pasion", col: 3, row: 7 },
    { n: 104, s: "Rf", elemento: "Rutherfordio", familia: "misterio", col: 4, row: 7 },
    { n: 105, s: "Db", elemento: "Dubnio", familia: "calma", col: 5, row: 7 },
    { n: 106, s: "Sg", elemento: "Seaborgio", familia: "cuidado", col: 6, row: 7 },
    { n: 107, s: "Bh", elemento: "Bohrio", familia: "misterio", col: 7, row: 7 },
    { n: 108, s: "Hs", elemento: "Hassio", familia: "pasion", col: 8, row: 7 },
    { n: 109, s: "Mt", elemento: "Meitnerio", familia: "ternura", col: 9, row: 7 },
    { n: 110, s: "Ds", elemento: "Darmstadtio", familia: "misterio", col: 10, row: 7 },
    { n: 111, s: "Rg", elemento: "Roentgenio", familia: "calma", col: 11, row: 7 },
    { n: 112, s: "Cn", elemento: "Copernicio", familia: "cuidado", col: 12, row: 7 },
    { n: 113, s: "Nh", elemento: "Nihonio", familia: "ternura", col: 13, row: 7 },
    { n: 114, s: "Fl", elemento: "Flerovio", familia: "misterio", col: 14, row: 7 },
    { n: 115, s: "Mc", elemento: "Moscovio", familia: "pasion", col: 15, row: 7 },
    { n: 116, s: "Lv", elemento: "Livermorio", familia: "calma", col: 16, row: 7 },
    { n: 117, s: "Ts", elemento: "Teneso", familia: "misterio", col: 17, row: 7 },
    { n: 118, s: "Og", elemento: "Oganesón", familia: "calma", col: 18, row: 7 },

    { n: 58, s: "Ce", elemento: "Cerio", familia: "calma", col: 4, row: 8 },
    { n: 59, s: "Pr", elemento: "Praseodimio", familia: "ternura", col: 5, row: 8 },
    { n: 60, s: "Nd", elemento: "Neodimio", familia: "pasion", col: 6, row: 8 },
    { n: 61, s: "Pm", elemento: "Prometio", familia: "misterio", col: 7, row: 8 },
    { n: 62, s: "Sm", elemento: "Samario", familia: "calma", col: 8, row: 8 },
    { n: 63, s: "Eu", elemento: "Europio", familia: "ternura", col: 9, row: 8 },
    { n: 64, s: "Gd", elemento: "Gadolinio", familia: "cuidado", col: 10, row: 8 },
    { n: 65, s: "Tb", elemento: "Terbio", familia: "misterio", col: 11, row: 8 },
    { n: 66, s: "Dy", elemento: "Disprosio", familia: "pasion", col: 12, row: 8 },
    { n: 67, s: "Ho", elemento: "Holmio", familia: "ternura", col: 13, row: 8 },
    { n: 68, s: "Er", elemento: "Erbio", familia: "calma", col: 14, row: 8 },
    { n: 69, s: "Tm", elemento: "Tulio", familia: "misterio", col: 15, row: 8 },
    { n: 70, s: "Yb", elemento: "Iterbio", familia: "cuidado", col: 16, row: 8 },
    { n: 71, s: "Lu", elemento: "Lutecio", familia: "pasion", col: 17, row: 8 },

    { n: 90, s: "Th", elemento: "Torio", familia: "pasion", col: 4, row: 9 },
    { n: 91, s: "Pa", elemento: "Protactinio", familia: "misterio", col: 5, row: 9 },
    { n: 92, s: "U", elemento: "Uranio", familia: "calma", col: 6, row: 9 },
    { n: 93, s: "Np", elemento: "Neptunio", familia: "pasion", col: 7, row: 9 },
    { n: 94, s: "Pu", elemento: "Plutonio", familia: "misterio", col: 8, row: 9 },
    { n: 95, s: "Am", elemento: "Americio", familia: "ternura", col: 9, row: 9 },
    { n: 96, s: "Cm", elemento: "Curio", familia: "cuidado", col: 10, row: 9 },
    { n: 97, s: "Bk", elemento: "Berkelio", familia: "misterio", col: 11, row: 9 },
    { n: 98, s: "Cf", elemento: "Californio", familia: "pasion", col: 12, row: 9 },
    { n: 99, s: "Es", elemento: "Einstenio", familia: "ternura", col: 13, row: 9 },
    { n: 100, s: "Fm", elemento: "Fermio", familia: "calma", col: 14, row: 9 },
    { n: 101, s: "Md", elemento: "Mendelevio", familia: "misterio", col: 15, row: 9 },
    { n: 102, s: "No", elemento: "Nobelio", familia: "cuidado", col: 16, row: 9 },
    { n: 103, s: "Lr", elemento: "Lawrencio", familia: "pasion", col: 17, row: 9 }
];

const elementosAmor = elementosBase.map(elemento => {
    const especial = elementosEspeciales[elemento.s];
    const nombre = especial?.nombre ?? elemento.elemento;
    const texto = especial?.texto ?? `${elemento.elemento}: ${mensajesFamilia[elemento.familia]}`;

    return {
        ...elemento,
        nombre,
        texto
    };
});

const tabla = document.getElementById("tabla-amor");
const panel = document.getElementById("panel-elemento");
const panelNumero = panel.querySelector(".panel-numero");
const panelSimbolo = panel.querySelector(".panel-simbolo");
const panelNombre = panel.querySelector(".panel-nombre");
const panelTexto = panel.querySelector(".panel-texto");

function pintarElemento(elemento) {
    const boton = document.createElement("button");
    boton.className = "elemento";
    if ((elemento.n >= 58 && elemento.n <= 71) || (elemento.n >= 90 && elemento.n <= 103)) {
        boton.classList.add("serie-interna");
    }
    boton.type = "button";
    boton.title = `${elemento.elemento} · ${elemento.nombre}`;
    boton.setAttribute("aria-label", `${elemento.n}. ${elemento.elemento}: ${elemento.nombre}`);
    boton.style.setProperty("--col", elemento.col);
    boton.style.setProperty("--row", elemento.row);
    boton.style.setProperty("--color", familias[elemento.familia]);
    boton.innerHTML = `
        <small>${String(elemento.n).padStart(2, "0")}</small>
        <strong>${elemento.s}</strong>
        <span>${elemento.elemento}</span>
    `;
    boton.addEventListener("click", () => activarElemento(elemento, boton));
    tabla.appendChild(boton);
}

function activarElemento(elemento, boton) {
    document.querySelectorAll(".elemento").forEach(item => item.classList.remove("activo"));
    boton.classList.add("activo");
    panel.style.setProperty("--activo", familias[elemento.familia]);
    panelNumero.textContent = String(elemento.n).padStart(2, "0");
    panelSimbolo.textContent = elemento.s;
    panelNombre.textContent = elemento.nombre;
    panelTexto.textContent = elemento.texto;
}

elementosAmor
    .sort((a, b) => a.n - b.n)
    .forEach(pintarElemento);

const primerElemento = document.querySelector(".elemento");
if (primerElemento) primerElemento.classList.add("activo");
