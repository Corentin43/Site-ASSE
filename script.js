document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MENUS DÉROULANTS
       ===================================================== */

    document.querySelectorAll(".dropdown > a").forEach(link => {

        link.addEventListener("click", function (e) {

            e.preventDefault();

            const parent = this.parentElement;

            /* Ferme les autres menus */
            document.querySelectorAll(".dropdown").forEach(item => {

                if (item !== parent) {
                    item.classList.remove("active");
                }

            });

            /* Ouvre / ferme le menu */
            parent.classList.toggle("active");

        });

    });


    /* =====================================================
       MENU HAMBURGER MOBILE
       ===================================================== */

    const hamburger = document.getElementById("hamburger");
    const menu = document.querySelector(".menu");

    if (hamburger && menu) {

        hamburger.addEventListener("click", () => {

            menu.classList.toggle("active");

        });

    }


    /* =====================================================
       GALERIE / POPUP IMAGE CLASSIQUE
       ===================================================== */

    const images = document.querySelectorAll(".popup-image");
    const popup = document.getElementById("popup");
    const popupImg = document.getElementById("popup-img");

    if (popup && popupImg) {

        images.forEach(img => {

            img.addEventListener("click", () => {

                popup.style.display = "flex";
                popupImg.src = img.src;

            });

        });

        popup.addEventListener("click", () => {

            popup.style.display = "none";

        });

    }


    /* =====================================================
       MUSIQUES
       ===================================================== */

    const musiqueConfettis = new Audio(
        "son/allez-les-verts-hymne-officiel-asse_WJTrc4OS.mp3"
    );

    const musiqueConcert = new Audio(
        "son/Désenchantée.mp3"
    );

    musiqueConfettis.volume = 1;
    musiqueConcert.volume = 1;


    /* =====================================================
       CANVAS
       ===================================================== */

    const canvas =
        document.getElementById("confetti-canvas");

    let ctx = null;

    if (canvas) {

        ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

    }


    /* =====================================================
       VARIABLES
       ===================================================== */

    let confetti = [];

    let confettiActive = false;

    let concertActive = false;

    let animationConcert = null;

    let concertStartTime = 0;

    const confettiCount = 150;


    /* =====================================================
       BOUTON STOP
       ===================================================== */

    const stopMusicBtn =
        document.getElementById("stop-music");

    if (stopMusicBtn) {

        stopMusicBtn.style.display = "none";

    }


    /* =====================================================
       FONCTION ALÉATOIRE
       ===================================================== */

    function randomRange(min, max) {

        return Math.random() * (max - min) + min;

    }


    /* =====================================================
       🎉 CONFETTIS
       ===================================================== */

    function initConfetti() {

        if (!canvas) return;

        confetti = [];

        for (let i = 0; i < confettiCount; i++) {

            let colorRand = Math.random();

            let color;

            if (colorRand < 0.6) {

                color = "green";

            }

            else if (colorRand < 0.8) {

                color = "gold";

            }

            else {

                color = "white";

            }


            confetti.push({

                x:
                    Math.random() *
                    canvas.width,

                y:
                    Math.random() *
                    canvas.height -
                    canvas.height,

                r:
                    randomRange(2, 6),

                d:
                    randomRange(
                        1,
                        confettiCount
                    ),

                color: color,

                tilt:
                    randomRange(
                        -10,
                        10
                    ),

                tiltAngleIncrement:
                    randomRange(
                        0.05,
                        0.12
                    ),

                tiltAngle: 0

            });

        }

    }


    function drawConfetti() {

        if (!confettiActive || !ctx) {

            return;

        }

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        confetti.forEach(c => {

            ctx.beginPath();

            ctx.lineWidth = c.r;

            ctx.strokeStyle = c.color;

            ctx.moveTo(

                c.x +
                c.tilt +
                c.r / 2,

                c.y

            );

            ctx.lineTo(

                c.x +
                c.tilt,

                c.y +
                c.tilt +
                c.r / 2

            );

            ctx.stroke();

        });


        updateConfetti();

    }


    function updateConfetti() {

        if (!canvas) return;

        confetti.forEach(c => {

            c.tiltAngle +=
                c.tiltAngleIncrement;

            c.y +=
                (
                    Math.cos(c.d) +
                    3 +
                    c.r / 2
                ) / 2;

            c.tilt =
                Math.sin(
                    c.tiltAngle
                ) * 15;


            if (c.y > canvas.height) {

                c.y = -10;

                c.x =
                    Math.random() *
                    canvas.width;

            }

        });


        requestAnimationFrame(
            drawConfetti
        );

    }


    /* =====================================================
       ⚽ MODE STADE / CONCERT
       ===================================================== */

    const lumieres = [];


    /* =====================================================
       CRÉER LES TÉLÉPHONES
       ===================================================== */

    function creerLumieres() {

        if (!canvas) return;

        lumieres.length = 0;

        const nombre = 250;


        for (let i = 0; i < nombre; i++) {

            lumieres.push({

                x:
                    Math.random() *
                    window.innerWidth,

                y:
                    Math.random() *
                    window.innerHeight,

                taille:
                    randomRange(
                        1.2,
                        2.5
                    ),

                rayon:
                    randomRange(
                        30,
                        70
                    ),

                vitesse:
                    randomRange(
                        0.018,
                        0.045
                    ),

                angle:
                    Math.random() *
                    Math.PI *
                    2,

                phase:
                    Math.random() *
                    Math.PI *
                    2,

                opacite:
                    randomRange(
                        0.45,
                        1
                    )

            });

        }

    }


    /* =====================================================
       DESSIN DU STADE
       ===================================================== */

    function dessinerConcert() {

        if (!concertActive || !ctx) {

            return;

        }


        const temps =
            (
                performance.now() -
                concertStartTime
            ) / 1000;


        /* Fond noir */

        ctx.clearRect(

            0,
            0,

            canvas.width,
            canvas.height

        );


        ctx.fillStyle =
            "rgba(0, 0, 0, 0.94)";


        ctx.fillRect(

            0,
            0,

            canvas.width,
            canvas.height

        );


        /* Lumières */

        lumieres.forEach((lumiere, index) => {

            const debutLumiere =
                (
                    index /
                    lumieres.length
                ) * 15;


            if (temps < debutLumiere) {

                return;

            }


            let puissance =
                (
                    temps -
                    debutLumiere
                ) / 2;


            if (puissance > 1) {

                puissance = 1;

            }


            /* Mouvement */

            lumiere.angle +=
                lumiere.vitesse;


            const mouvementX =
                Math.sin(
                    lumiere.angle +
                    lumiere.phase
                ) *
                lumiere.rayon;


            const mouvementY =
                Math.sin(
                    (
                        lumiere.angle +
                        lumiere.phase
                    ) * 2
                ) * 12;


            const x =
                lumiere.x +
                mouvementX;


            const y =
                lumiere.y +
                mouvementY;


            /* Scintillement */

            const scintillement =
                0.8 +
                Math.sin(
                    lumiere.angle * 4
                ) * 0.2;


            const opacite =
                lumiere.opacite *
                puissance *
                scintillement;


            /* Halo */

            const gradient =
                ctx.createRadialGradient(

                    x,
                    y,
                    0,

                    x,
                    y,

                    lumiere.taille * 5

                );


            gradient.addColorStop(

                0,

                `rgba(
                    255,
                    255,
                    255,
                    ${opacite}
                )`

            );


            gradient.addColorStop(

                0.25,

                `rgba(
                    255,
                    255,
                    255,
                    ${opacite * 0.35}
                )`

            );


            gradient.addColorStop(

                1,

                "rgba(255,255,255,0)"

            );


            ctx.fillStyle =
                gradient;


            ctx.beginPath();


            ctx.arc(

                x,
                y,

                lumiere.taille * 5,

                0,
                Math.PI * 2

            );


            ctx.fill();


            /* Petit point blanc */

            ctx.beginPath();


            ctx.fillStyle =
                `rgba(
                    255,
                    255,
                    255,
                    ${opacite}
                )`;


            ctx.arc(

                x,
                y,

                lumiere.taille,

                0,
                Math.PI * 2

            );


            ctx.fill();

        });


        animationConcert =
            requestAnimationFrame(
                dessinerConcert
            );

    }


    /* =====================================================
       LANCER LE MODE STADE
       ===================================================== */

    function lancerConcert() {

        if (!canvas) return;

        concertActive = true;

        concertStartTime =
            performance.now();

        creerLumieres();

        dessinerConcert();

    }


    /* =====================================================
       🛑 ARRÊTER TOUS LES EFFETS
       ===================================================== */

    function arreterTout() {

        musiqueConfettis.pause();

        musiqueConfettis.currentTime = 0;


        musiqueConcert.pause();

        musiqueConcert.currentTime = 0;


        confettiActive = false;

        concertActive = false;


        if (animationConcert) {

            cancelAnimationFrame(
                animationConcert
            );

            animationConcert = null;

        }


        if (ctx) {

            ctx.clearRect(

                0,
                0,

                canvas.width,
                canvas.height

            );

        }


        if (stopMusicBtn) {

            stopMusicBtn.style.display =
                "none";

        }

    }


    /* =====================================================
       🎲 CLIC SUR LE LOGO
       ===================================================== */

    const logo =
        document.getElementById(
            "logo-trigger"
        );


    if (logo && canvas) {

        logo.addEventListener(
            "click",
            e => {

                e.preventDefault();

                arreterTout();


                const choix =
                    Math.random();


                /* =================================================
                   🎉 MODE CONFETTIS
                   ================================================= */

                if (choix < 0.5) {

                    musiqueConfettis.currentTime = 0;

                    musiqueConfettis.play();


                    if (stopMusicBtn) {

                        stopMusicBtn.style.display =
                            "block";

                    }


                    confettiActive = true;

                    initConfetti();

                    drawConfetti();

                }


                /* =================================================
                   ⚽ MODE STADE
                   ================================================= */

                else {

                    musiqueConcert.currentTime = 0;

                    musiqueConcert.play();


                    if (stopMusicBtn) {

                        stopMusicBtn.style.display =
                            "block";

                    }


                    lancerConcert();

                }

            }
        );

    }


    /* =====================================================
       ⏹️ BOUTON STOP
       ===================================================== */

    if (stopMusicBtn) {

        stopMusicBtn.addEventListener(
            "click",
            () => {

                arreterTout();

            }
        );

    }


    /* =====================================================
       REDIMENSIONNEMENT
       ===================================================== */

    window.addEventListener("resize", () => {

        if (!canvas) {
            return;
        }

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;


        if (concertActive) {

            creerLumieres();

        }

    });


    /* =====================================================
       ⚽ TABLEAU
       ===================================================== */

    document.querySelectorAll("tbody tr").forEach(tr => {

        let texte =
            tr.innerText.toLowerCase();


        texte = texte
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");


        const tds =
            tr.querySelectorAll("td");


        /* =================================================
           ⚽ SAINT-ETIENNE
           ================================================= */

        if (
            texte.includes("saint") &&
            texte.includes("etienne") &&
            texte.includes("vs")
        ) {

            let domicile =
                texte.indexOf("saint") <
                texte.indexOf("vs");


            /* DATE + HEURE */

            for (let i = 0; i <= 1; i++) {

                if (tds[i]) {

                    tds[i].style.background =
                        "white";

                    tds[i].style.color =
                        "green";

                    tds[i].style.animation =
                        "none";

                }

            }


            /* MATCH */

            let matchCell =
                tds[2];


            if (matchCell) {

                matchCell.classList.add(
                    "degrade"
                );


                if (domicile) {

                    matchCell.style.background =
                        "linear-gradient(90deg, rgba(0,128,0,0.8), rgba(0,128,0,0.2), transparent)";

                }

                else {

                    matchCell.style.background =
                        "linear-gradient(90deg, rgba(255,165,0,0.8), rgba(255,165,0,0.2), transparent)";

                }

            }

        }


        /* =================================================
           🏆 COMPETITION
           ================================================= */

        if (tds[3]) {

            tds[3].classList.add(
                "degrade"
            );


            if (texte.includes("amical")) {

                tds[3].style.background =
                    "linear-gradient(90deg, red, darkred)";

                tds[3].style.color =
                    "white";

            }

            else if (texte.includes("ligue")) {

                tds[3].style.background =
                    "linear-gradient(90deg, #A63DFF, #A53EFF)";

                tds[3].style.color =
                    "white";

            }

        }

    });


    /* =====================================================
       🏟️ POTEAUX CARRÉS
       ===================================================== */

    const poteauxImg =
        document.querySelector(
            ".poteaux-carres"
        );


    if (poteauxImg) {

        poteauxImg.addEventListener(
            "click",
            () => {

                poteauxImg.src =
                    "gif/action poteaux carrés.gif";

            }
        );

    }


    /* =====================================================
       🎥 VIDÉOS
       ===================================================== */

    const videoLinks =
        document.querySelectorAll(
            ".video-link"
        );


    videoLinks.forEach(img => {

        img.addEventListener(
            "click",
            () => {

                const url =
                    img.dataset.video;


                if (url) {

                    window.open(
                        url,
                        "_blank"
                    );

                }

            }
        );

    });


    /* =====================================================
       📸 GALERIE DES MATCHS
       ===================================================== */

    const popupGalerie =
        document.getElementById(
            "galerie-popup"
        );


    const imageGalerie =
        document.getElementById(
            "image-galerie"
        );


    const fermerGalerie =
        document.getElementById(
            "fermer-galerie"
        );


    const precedent =
        document.getElementById(
            "precedent"
        );


    const suivant =
        document.getElementById(
            "suivant"
        );


    const compteur =
        document.getElementById(
            "compteur"
        );


    let imagesGalerie = [];

    let indexGalerie = 0;


    /* =====================================================
       AFFICHER IMAGE
       ===================================================== */

    function afficherImageGalerie() {

        if (
            !imageGalerie ||
            imagesGalerie.length === 0
        ) {

            return;

        }


        imageGalerie.src =
            imagesGalerie[indexGalerie].src;


        if (compteur) {

            compteur.textContent =
                (indexGalerie + 1) +
                " / " +
                imagesGalerie.length;

        }

    }


    /* =====================================================
       OUVRIR LA GALERIE
       ===================================================== */

    document
        .querySelectorAll(".galerie-match")
        .forEach(galerie => {

            const photoPrincipale =
                galerie.querySelector(
                    ".photo-match"
                );


            const photosCachees =
                galerie.querySelectorAll(
                    ".photos-cachees img"
                );


            if (!photoPrincipale) {

                return;

            }


            photoPrincipale.addEventListener(
                "click",
                () => {

                    imagesGalerie = [

                        photoPrincipale,

                        ...photosCachees

                    ];


                    indexGalerie = 0;


                    afficherImageGalerie();


                    if (popupGalerie) {

                        popupGalerie.classList.add(
                            "active"
                        );

                    }

                }
            );

        });


    /* =====================================================
       IMAGE SUIVANTE
       ===================================================== */

    if (suivant) {

        suivant.addEventListener(
            "click",
            e => {

                e.stopPropagation();


                if (
                    imagesGalerie.length === 0
                ) {

                    return;

                }


                indexGalerie++;


                if (
                    indexGalerie >=
                    imagesGalerie.length
                ) {

                    indexGalerie = 0;

                }


                afficherImageGalerie();

            }
        );

    }


    /* =====================================================
       IMAGE PRÉCÉDENTE
       ===================================================== */

    if (precedent) {

        precedent.addEventListener(
            "click",
            e => {

                e.stopPropagation();


                if (
                    imagesGalerie.length === 0
                ) {

                    return;

                }


                indexGalerie--;


                if (indexGalerie < 0) {

                    indexGalerie =
                        imagesGalerie.length - 1;

                }


                afficherImageGalerie();

            }
        );

    }


    /* =====================================================
       ❌ FERMER AVEC X
       ===================================================== */

    if (fermerGalerie) {

        fermerGalerie.addEventListener(
            "click",
            e => {

                e.stopPropagation();


                if (popupGalerie) {

                    popupGalerie.classList.remove(
                        "active"
                    );

                }

            }
        );

    }


    /* =====================================================
       CLIQUER SUR LE FOND POUR FERMER
       ===================================================== */

    if (popupGalerie) {

        popupGalerie.addEventListener(
            "click",
            e => {

                if (
                    e.target === popupGalerie
                ) {

                    popupGalerie.classList.remove(
                        "active"
                    );

                }

            }
        );

    }


    /* =====================================================
       ⌨️ CLAVIER
       ===================================================== */

    document.addEventListener(
        "keydown",
        e => {

            if (!popupGalerie) {

                return;

            }


            if (
                !popupGalerie.classList.contains(
                    "active"
                )
            ) {

                return;

            }


            if (e.key === "ArrowRight") {

                if (suivant) {

                    suivant.click();

                }

            }


            if (e.key === "ArrowLeft") {

                if (precedent) {

                    precedent.click();

                }

            }


            if (e.key === "Escape") {

                popupGalerie.classList.remove(
                    "active"
                );

            }

        }
    );


    /* =====================================================
       🟢🔴🟠 COULEUR AUTOMATIQUE DES SCORES ASSE - Site officiel
       ===================================================== */

    document
        .querySelectorAll(".card-text h3")
        .forEach(titre => {

            const texte =
                titre.textContent.trim();


            /*
               Cherche automatiquement un score :

               0-4
               2-1
               3-0
               1 - 1
               etc.
            */

            const score =
                texte.match(
                    /(\d+)\s*-\s*(\d+)/
                );


            /* Aucun score trouvé */

            if (!score) {

                return;

            }


            const butEquipe1 =
                parseInt(score[1]);


            const butEquipe2 =
                parseInt(score[2]);


            /*
               Cherche où se trouve ASSE - Site officiel
            */

            const texteNormalise =
                texte.toUpperCase();


            const positionASSE =
                texteNormalise.indexOf("ASSE");


            const positionScore =
                texte.indexOf(
                    score[0]
                );


            /*
               Variables
            */

            let butsASSE;

            let butsAdversaire;


            /*
               ASSE - Site officiel est à droite :

               Lausanne-Sport 0-4 ASSE - Site officiel

               Donc :
               adversaire = 0
               ASSE - Site officiel = 4
            */

            if (
                positionASSE >
                positionScore
            ) {

                butsAdversaire =
                    butEquipe1;

                butsASSE =
                    butEquipe2;

            }


            /*
               ASSE - Site officiel est à gauche :

               ASSE - Site officiel 2-1 Lausanne-Sport

               Donc :
               ASSE - Site officiel = 2
               adversaire = 1
            */

            else {

                butsASSE =
                    butEquipe1;

                butsAdversaire =
                    butEquipe2;

            }


            /* =================================================
               🟢 VICTOIRE
               ================================================= */

            if (
                butsASSE >
                butsAdversaire
            ) {

                titre.style.color =
                    "green";

            }


            /* =================================================
               🔴 DÉFAITE
               ================================================= */

            else if (
                butsASSE <
                butsAdversaire
            ) {

                titre.style.color =
                    "red";

            }


            /* =================================================
               🟠 MATCH NUL
               ================================================= */

            else {

                titre.style.color =
                    "orange";

            }

        });

});

// ===== CHANGER IMAGE =====
function changerImage(img) {
    document.querySelector(".maillot-img").src = img.src;
}

// ===== SELECTION TAILLE =====
function selectSize(btn) {
    document.querySelectorAll(".tailles button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
}

// ===== OUVRIR OPTIONS =====
function toggleOptions() {
    const bloc = document.getElementById("options-personnalisation");
    const maillot = document.getElementById("maillot-img");
    const flocage = document.getElementById("flocage");

    const flocageNom = document.getElementById("flocage-nom");
    const flocageNumero = document.getElementById("flocage-numero");

    const isOpen = bloc.style.display === "block";

    if (isOpen) {
        bloc.style.display = "none";

        maillot.src = "images/domicile.png";
        flocage.style.display = "none";

        // reset
        flocageNom.textContent = "";
        flocageNumero.textContent = "";

    } else {
        bloc.style.display = "block";

        maillot.src = "images/domicile-IMAGE7.png";
        flocage.style.display = "block";
    }
}
// ===== CHOISIR TYPE =====
function choisirType(type) {
    document.getElementById("liste-joueurs").style.display = "none";
    document.getElementById("zone-input").style.display = "none";

    if (type === "joueur") {
        document.getElementById("liste-joueurs").style.display = "block";
    }

    if (type === "custom") {
        document.getElementById("zone-input").style.display = "block";
    }
}

// ===== SELECTION JOUEUR =====
function selectionnerJoueur() {
    const value = document.getElementById("select-joueur").value;

    if (!value) return;

    const [nom, numero] = value.split("|");

    document.getElementById("flocage-nom").textContent = nom.toUpperCase();
    document.getElementById("flocage-numero").textContent = numero;
}

// ===== PERSONNALISÉ =====
const customNom = document.getElementById("customNom");
const customNumero = document.getElementById("customNumero");

const flocageNom = document.getElementById("flocage-nom");
const flocageNumero = document.getElementById("flocage-numero");

if (customNom && flocageNom) {
    customNom.addEventListener("input", () => {

        // lettres uniquement + 12 max
        let value = customNom.value.replace(/[^a-zA-ZÀ-ÿ]/g, "");
        value = value.slice(0, 12);

        customNom.value = value;

        flocageNom.textContent = value.toUpperCase();
    });
}

if (customNumero && flocageNumero) {
    customNumero.addEventListener("input", () => {

        // chiffres uniquement + 2 max
        let value = customNumero.value.replace(/[^0-9]/g, "");
        value = value.slice(0, 2);

        customNumero.value = value;

        flocageNumero.textContent = value;
    });
}

if (customNumero && flocageNumero) {
    customNumero.addEventListener("input", () => {
        flocageNumero.textContent = customNumero.value;
    });
}

/* =====================================================
   🛒 PANIER COMPLET (LOCALSTORAGE + FLOCAGE)
   ===================================================== */

let panier = JSON.parse(localStorage.getItem("panier")) || [];

/* =====================================================
   🔢 COMPTEUR PANIER MENU
   ===================================================== */

function updatePanierCount() {
    const el = document.getElementById("panier-count");
    if (!el) return;

    let totalQty = 0;

    panier.forEach(p => {
        totalQty += p.qty;
    });

    el.textContent = totalQty;
}

/* =====================================================
   ➕ AJOUTER AU PANIER
   ===================================================== */

function ajouterPanier(btn) {
	const tailleSelectionnee = document.querySelector(".tailles button.active");

	if (!tailleSelectionnee) {
		alert("⚠️ Choisis une taille avant d’ajouter au panier !");
		return;
	}
    const nom = document.getElementById("flocage-nom")?.textContent || "";
    const numero = document.getElementById("flocage-numero")?.textContent || "";
    const image = document.getElementById("maillot-img")?.src || "";

    const listeJoueurs = document.getElementById("liste-joueurs");

    const typeJoueur = listeJoueurs && listeJoueurs.style.display === "block";

    const prixBase = 89.95;

    let supplement = 0;

    // 👕 joueur = +15€
    if (typeJoueur) {
        supplement = 15;
    }

    // ✍️ custom = +20€
    else if (nom || numero) {
        supplement = 20;
    }

    const produit = {
		id: Date.now(),
		nom: document.getElementById("product-name")?.textContent || "Maillot",

		flocageNom: document.getElementById("flocage-nom")?.textContent || "",
		flocageNumero: document.getElementById("flocage-numero")?.textContent || "",

		image,
		prixBase,
		supplement,
		qty: 1
	};

    panier.push(produit);

    localStorage.setItem("panier", JSON.stringify(panier));

    updatePanierCount();

    /* =====================================================
       🎉 ANIMATION BOUTON
       ===================================================== */

    if (btn) {
        btn.textContent = "Ajouté ✔";
        btn.style.transform = "scale(0.95)";
        btn.style.background = "#027d43";

        setTimeout(() => {
            btn.textContent = "Ajouter au panier";
            btn.style.transform = "scale(1)";
            btn.style.background = "";
        }, 1200);
    }
}

/* =====================================================
   🖥️ AFFICHER PANIER (PAGE panier.html)
   ===================================================== */

function afficherPanier() {

    const container = document.getElementById("panier-container");
    const totalEl = document.getElementById("total");

    if (!container || !totalEl) return;

    container.innerHTML = "";

    let total = 0;

    panier.forEach((item, index) => {

        const prixUnitaire = item.prixBase + item.supplement;
        const prixTotalItem = prixUnitaire * item.qty;

        total += prixTotalItem;

        const div = document.createElement("div");

        div.style.display = "flex";
        div.style.alignItems = "center";
        div.style.gap = "15px";
        div.style.padding = "10px";
        div.style.borderBottom = "1px solid #ddd";
        div.style.fontFamily = "Montserrat, sans-serif";

        div.innerHTML = `
            <img src="${item.image}" style="
				width:160px;
				height:160px;
				object-fit:contain;
				background:white;
				border-radius:8px;
			">

            <div style="flex:1">
                <strong>${item.nom}</strong><br>

				<small>
					${item.flocageNom ? "Nom: " + item.flocageNom : ""}<br>
					${item.flocageNumero ? "Numéro: " + item.flocageNumero : ""}<br>
				</small>

                <small>
                    ${item.prixBase.toFixed(2)} €
                    ${item.supplement ? `(+${item.supplement}€ flocage)` : ""}
                </small>
            </div>

            <div>
                <button onclick="changeQty(${index}, -1)">-</button>
                <span>${item.qty}</span>
                <button onclick="changeQty(${index}, 1)">+</button>
            </div>

            <strong>${prixTotalItem.toFixed(2)} €</strong>

            <button onclick="removeItem(${index})">❌</button>
        `;

        container.appendChild(div);
    });

    totalEl.textContent = "Total : " + total.toFixed(2) + " €";
}

/* =====================================================
   ➕➖ QUANTITÉ
   ===================================================== */

function changeQty(index, value) {

    panier[index].qty += value;

    if (panier[index].qty < 1) {
        panier.splice(index, 1);
    }

    localStorage.setItem("panier", JSON.stringify(panier));

    afficherPanier();
    updatePanierCount();
}

/* =====================================================
   ❌ SUPPRIMER PRODUIT
   ===================================================== */

function removeItem(index) {

    panier.splice(index, 1);

    localStorage.setItem("panier", JSON.stringify(panier));

    afficherPanier();
    updatePanierCount();
}

/* =====================================================
   🚀 CHARGEMENT AUTOMATIQUE
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    updatePanierCount();
    afficherPanier();
});