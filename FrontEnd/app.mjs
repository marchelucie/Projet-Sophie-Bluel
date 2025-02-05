// Appel API

const response = await fetch("http://localhost:5678/api/works");
const works = await response.json();
console.log(works);

// Gallerie interactive

function displayWorks() {
    const gallery = document.querySelector(".gallery");
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

// Ajout dynamique des filtres

function displayFilters() {
    const filters = document.querySelector(".filters");
    const setFilters = new Set();
    for (let i = 0; i < works.length; i++) {
        if (!setFilters.has(works[i].category.name)) {
            setFilters.add(works[i].category.name);
            const btnFilter = document.createElement("button");
            btnFilter.innerText = works[i].category.name;
            btnFilter.id = `${works[i].category.name}`;
            filters.appendChild(btnFilter);
        }
    }
};

displayFilters();

// Ajout des listener pour filtres

const btnFilterAll = document.getElementById("all");
const btnFilterObjects = document.getElementById("objects");
const btnFilterApt = document.getElementById("apt");
const btnFilterHotels = document.getElementById("hotels");

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

btnFilterObjects.addEventListener("click", function () {
    gallery.innerHTML = "";
    const worksFiltered = works.filter(function (work) {
        return work.categoryId === 1
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