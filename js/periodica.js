const familias = {
    pasion: "#ff6fbd",
    ternura: "#ffd985",
    calma: "#74ddff",
    cuidado: "#7dffb2",
    misterio: "#aa86ff"
};

const elementosRaw = `
1|H|Hidrógeno|ternura|1|1
2|He|Helio|misterio|18|1
3|Li|Litio|pasion|1|2
4|Be|Berilio|pasion|2|2
5|B|Boro|ternura|13|2
6|C|Carbono|cuidado|14|2
7|N|Nitrógeno|calma|15|2
8|O|Oxígeno|calma|16|2
9|F|Flúor|pasion|17|2
10|Ne|Neón|misterio|18|2
11|Na|Sodio|ternura|1|3
12|Mg|Magnesio|pasion|2|3
13|Al|Aluminio|misterio|13|3
14|Si|Silicio|ternura|14|3
15|P|Fósforo|pasion|15|3
16|S|Azufre|calma|16|3
17|Cl|Cloro|calma|17|3
18|Ar|Argón|cuidado|18|3
19|K|Potasio|misterio|1|4
20|Ca|Calcio|ternura|2|4
21|Sc|Escandio|misterio|3|4
22|Ti|Titanio|ternura|4|4
23|V|Vanadio|pasion|5|4
24|Cr|Cromo|cuidado|6|4
25|Mn|Manganeso|ternura|7|4
26|Fe|Hierro|cuidado|8|4
27|Co|Cobalto|misterio|9|4
28|Ni|Níquel|ternura|10|4
29|Cu|Cobre|misterio|11|4
30|Zn|Zinc|cuidado|12|4
31|Ga|Galio|misterio|13|4
32|Ge|Germanio|ternura|14|4
33|As|Arsénico|misterio|15|4
34|Se|Selenio|calma|16|4
35|Br|Bromo|pasion|17|4
36|Kr|Criptón|pasion|18|4
37|Rb|Rubidio|pasion|1|5
38|Sr|Estroncio|ternura|2|5
39|Y|Itrio|misterio|3|5
40|Zr|Circonio|cuidado|4|5
41|Nb|Niobio|misterio|5|5
42|Mo|Molibdeno|cuidado|6|5
43|Tc|Tecnecio|misterio|7|5
44|Ru|Rutenio|cuidado|8|5
45|Rh|Rodio|cuidado|9|5
46|Pd|Paladio|pasion|10|5
47|Ag|Plata|ternura|11|5
48|Cd|Cadmio|calma|12|5
49|In|Indio|misterio|13|5
50|Sn|Estaño|cuidado|14|5
51|Sb|Antimonio|misterio|15|5
52|Te|Telurio|ternura|16|5
53|I|Yodo|pasion|17|5
54|Xe|Xenón|misterio|18|5
55|Cs|Cesio|pasion|1|6
56|Ba|Bario|ternura|2|6
57|La|Lantano|calma|3|6
72|Hf|Hafnio|cuidado|4|6
73|Ta|Tántalo|pasion|5|6
74|W|Wolframio|misterio|6|6
75|Re|Renio|ternura|7|6
76|Os|Osmio|calma|8|6
77|Ir|Iridio|pasion|9|6
78|Pt|Platino|ternura|10|6
79|Au|Oro|ternura|11|6
80|Hg|Mercurio|misterio|12|6
81|Tl|Talio|calma|13|6
82|Pb|Plomo|cuidado|14|6
83|Bi|Bismuto|misterio|15|6
84|Po|Polonio|pasion|16|6
85|At|Astato|misterio|17|6
86|Rn|Radón|calma|18|6
87|Fr|Francio|pasion|1|7
88|Ra|Radio|ternura|2|7
89|Ac|Actinio|pasion|3|7
104|Rf|Rutherfordio|misterio|4|7
105|Db|Dubnio|calma|5|7
106|Sg|Seaborgio|cuidado|6|7
107|Bh|Bohrio|misterio|7|7
108|Hs|Hassio|pasion|8|7
109|Mt|Meitnerio|ternura|9|7
110|Ds|Darmstadtio|misterio|10|7
111|Rg|Roentgenio|calma|11|7
112|Cn|Copernicio|cuidado|12|7
113|Nh|Nihonio|ternura|13|7
114|Fl|Flerovio|misterio|14|7
115|Mc|Moscovio|pasion|15|7
116|Lv|Livermorio|calma|16|7
117|Ts|Teneso|misterio|17|7
118|Og|Oganesón|calma|18|7
58|Ce|Cerio|calma|4|8
59|Pr|Praseodimio|ternura|5|8
60|Nd|Neodimio|pasion|6|8
61|Pm|Prometio|misterio|7|8
62|Sm|Samario|calma|8|8
63|Eu|Europio|ternura|9|8
64|Gd|Gadolinio|cuidado|10|8
65|Tb|Terbio|misterio|11|8
66|Dy|Disprosio|pasion|12|8
67|Ho|Holmio|ternura|13|8
68|Er|Erbio|calma|14|8
69|Tm|Tulio|misterio|15|8
70|Yb|Iterbio|cuidado|16|8
71|Lu|Lutecio|pasion|17|8
90|Th|Torio|pasion|4|9
91|Pa|Protactinio|misterio|5|9
92|U|Uranio|calma|6|9
93|Np|Neptunio|pasion|7|9
94|Pu|Plutonio|misterio|8|9
95|Am|Americio|ternura|9|9
96|Cm|Curio|cuidado|10|9
97|Bk|Berkelio|misterio|11|9
98|Cf|Californio|pasion|12|9
99|Es|Einstenio|ternura|13|9
100|Fm|Fermio|calma|14|9
101|Md|Mendelevio|misterio|15|9
102|No|Nobelio|cuidado|16|9
103|Lr|Lawrencio|pasion|17|9
`;

const elementosBase = elementosRaw.trim().split("\n").map(linea => {
    const [n, s, elemento, familia, col, row] = linea.split("|");
    return {
        n: Number(n),
        s,
        elemento,
        familia,
        col: Number(col),
        row: Number(row)
    };
});

const tabla = document.getElementById("tabla-amor");
const poemaElemento = document.getElementById("poema-elemento");
const poemaNumero = poemaElemento.querySelector(".poema-numero");
const poemaSimbolo = poemaElemento.querySelector(".poema-simbolo");
const poemaTitulo = poemaElemento.querySelector(".poema-titulo");
const poemaVersos = poemaElemento.querySelector(".poema-versos");

function obtenerPoemaElemento(elemento) {
    return (typeof poemasElementales !== "undefined" && poemasElementales[elemento.s]) || {
        titulo: elemento.elemento,
        estrofas: [
            [
                `En ${elemento.elemento} guardo una forma secreta,`,
                "una luz pequeña volviendo hacia ti;",
                "si nadie comprende mi rara materia,",
                "tu nombre la ordena dentro de mí."
            ],
            [
                "No necesito medir este cariño,",
                "ni encerrarlo entero en explicación;",
                "me basta saber que cuando apareces,",
                "algo se enciende en mi corazón."
            ],
            [
                "Hay días que pesan como metales,",
                "hay noches que piden volver a creer;",
                "pero tu ternura cambia mi estado,",
                "y hasta mi sombra aprende a florecer."
            ],
            [
                "Por eso te escribo desde esta tabla,",
                "con ciencia pequeña y hambre de luz;",
                "si el universo pregunta mi centro,",
                "mi respuesta vuelve siempre a tú."
            ]
        ]
    };
}

function renderizarPoema(poema) {
    const estrofas = poema.estrofas || (poema.poema ? [poema.poema] : []);

    return estrofas
        .map(estrofa => `<p>${estrofa.join("<br>")}</p>`)
        .join("");
}

function pintarElemento(elemento) {
    const boton = document.createElement("button");
    boton.className = "elemento";
    if ((elemento.n >= 58 && elemento.n <= 71) || (elemento.n >= 90 && elemento.n <= 103)) {
        boton.classList.add("serie-interna");
    }
    boton.type = "button";
    boton.title = elemento.elemento;
    boton.setAttribute("aria-label", `${elemento.n}. ${elemento.elemento}`);
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
    const poema = obtenerPoemaElemento(elemento);
    document.querySelectorAll(".elemento").forEach(item => item.classList.remove("activo"));
    boton.classList.add("activo");
    poemaElemento.style.setProperty("--activo", familias[elemento.familia]);
    poemaNumero.textContent = String(elemento.n).padStart(2, "0");
    poemaSimbolo.textContent = elemento.s;
    poemaTitulo.textContent = poema.titulo || elemento.elemento;
    poemaVersos.innerHTML = renderizarPoema(poema);
}

elementosBase
    .sort((a, b) => a.n - b.n)
    .forEach(pintarElemento);

const primerElemento = document.querySelector(".elemento");
if (primerElemento) {
    const primerSimbolo = primerElemento.querySelector("strong")?.textContent;
    const primerElementoData = elementosBase.find(elemento => elemento.s === primerSimbolo);
    if (primerElementoData) activarElemento(primerElementoData, primerElemento);
}
