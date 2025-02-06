// Appel API

const response = await fetch("http://localhost:5678/api/works");
const works = await response.json();
console.log(works);

// Gallerie interactive
const gallery = document.querySelector(".gallery");

function displayWorks() {
    gallery.innerText = "";
    for (let i = 0; i < works.length; i++) {
        const divElement = document.createElement("div");
        gallery.appendChild(divElement);
        const imageElement = document.createElement("img");
        imageElement.src = works[i].imageUrl;
        const titleElement = document.createElement("p");
        titleElement.innerText = works[i].title;
        divElement.appendChild(imageElement);
        divElement.appendChild(titleElement);
    }
}

displayWorks();

// Ajout dynamique et auto des filtres
// ***** Choix fait pour pouvoir ajouter automatiquement un filtre si une nouvelle catégorie est créée pour un work

function displayFilters() {
    const filters = document.querySelector(".filters");
    const setFilters = new Set();
    for (let i = 0; i < works.length; i++) {
        if (!setFilters.has(works[i].category.name)) {
            setFilters.add(works[i].category.name);
            const btnFilter = document.createElement("button");
            btnFilter.innerText = works[i].category.name;
            btnFilter.id = `${works[i].category.id}`;
            filters.appendChild(btnFilter);
        }
    }
};

displayFilters();

// Ajout des listener pour filtres

const btnFilterAll = document.getElementById("all");
const btnFilterObjects = document.getElementById("1");
const btnFilterApt = document.getElementById("2");
const btnFilterHotels = document.getElementById("3");

// Filtre "Tous"
btnFilterAll.addEventListener("click", function () {
    gallery.innerHTML = "";
    const worksFiltered = works.filter(function (work) {
        return works
    });
    console.log(worksFiltered);
    for (let i = 0; i < worksFiltered.length; i++) {
        const divElement = document.createElement("div");
        gallery.appendChild(divElement);
        const imageElement = document.createElement("img");
        imageElement.src = worksFiltered[i].imageUrl;
        const titleElement = document.createElement("p");
        titleElement.innerText = `${worksFiltered[i].title}`;
        divElement.appendChild(imageElement);
        divElement.appendChild(titleElement);
    }
});

// Filtre Objets
btnFilterObjects.addEventListener("click", function () {
    gallery.innerHTML = "";
    const worksFiltered = works.filter(function (work) {
        return work.categoryId === `${work.category.id}`
    });
    console.log(worksFiltered)
    for (let i = 0; i < worksFiltered.length; i++) {
        const divElement = document.createElement("div");
        gallery.appendChild(divElement);
        const imageElement = document.createElement("img");
        imageElement.src = worksFiltered[i].imageUrl;
        const titleElement = document.createElement("p");
        titleElement.innerText = `${worksFiltered[i].title}`;
        divElement.appendChild(imageElement);
        divElement.appendChild(titleElement);
    }
});

// Filtre Appartements
btnFilterApt.addEventListener("click", function () {
    gallery.innerHTML = "";
    const worksFiltered = works.filter(function (work) {
        return work.categoryId === 2
    });
    console.log(worksFiltered)
    for (let i = 0; i < worksFiltered.length; i++) {
        const divElement = document.createElement("div");
        gallery.appendChild(divElement);
        const imageElement = document.createElement("img");
        imageElement.src = worksFiltered[i].imageUrl;
        const titleElement = document.createElement("p");
        titleElement.innerText = `${worksFiltered[i].title}`;
        divElement.appendChild(imageElement);
        divElement.appendChild(titleElement);
    }
});

// Filtre Hotels & restaurants
btnFilterHotels.addEventListener("click", function () {
    gallery.innerHTML = "";
    const worksFiltered = works.filter(function (work) {
        return work.categoryId === 3
    });
    console.log(worksFiltered)
    for (let i = 0; i < worksFiltered.length; i++) {
        const divElement = document.createElement("div");
        gallery.appendChild(divElement);
        const imageElement = document.createElement("img");
        imageElement.src = worksFiltered[i].imageUrl;
        const titleElement = document.createElement("p");
        titleElement.innerText = `${worksFiltered[i].title}`;
        divElement.appendChild(imageElement);
        divElement.appendChild(titleElement);
    }
});