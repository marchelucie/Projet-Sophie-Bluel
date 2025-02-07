// ********** Appel API **********

const response = await fetch("http://localhost:5678/api/works");
const works = await response.json();
console.log(works);

// ********** Galerie interactive **********
const gallery = document.querySelector(".gallery");

function displayWorks(works) {
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
};

displayWorks(works);

// **********Ajout dynamique et auto des filtres**********
// -- Choix fait pour pouvoir ajouter automatiquement un filtre si une nouvelle catégorie est créée pour un work --

//Fonction d'automatisation des filtres
function filterWorks(categoryId, works){
    gallery.innerHTML = "";
    const worksFiltered = works.filter(function (work) {
        return work.categoryId === categoryId
    });
    console.log("Filtrés :", worksFiltered)
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
};

// Fonction d'apparition auto des filtres
function displayFilters(works) {
    const filters = document.querySelector(".filters");
    const setFilters = new Set();
    for (let i = 0; i < works.length; i++) {
        if (!setFilters.has(works[i].category.name)) {
            setFilters.add(works[i].category.name);
            const btnFilter = document.createElement("button");
            btnFilter.innerText = works[i].category.name;
            btnFilter.id = works[i].category.id;
            btnFilter.addEventListener("click", () => filterWorks(Number(btnFilter.id), works)); //Appel du listener pour automatisation des filtres
            filters.appendChild(btnFilter);
        }
    };
};

displayFilters(works); //Appel de filterWorks() à l'intérieur de displayWorks()

// Filtre "Tous"
const btnFilterAll = document.getElementById("all");
btnFilterAll.addEventListener("click", function () {
    gallery.innerHTML = "";
    const worksFiltered = works.filter(function () {
        return works
    });
    console.log("Filtrés :", worksFiltered);
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

//--------Mode Edition----------

console.log(!!localStorage.token);

if (!!localStorage.token){
    // Suppression des filtres
    const filters = document.querySelector(".filters");
    filters.innerText = "";
    
    // Ajout "modifier" à côté de "Mes Projets"
    const modifyElement = document.createElement("p");
    modifyElement.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> modifier';
    const projectTitleElement = document.querySelector(".title");
    projectTitleElement.appendChild(modifyElement);
    
    // Ajout du bandeau noir pour le mode édition
    const blackHeaderElement = document.createElement("div");
    blackHeaderElement.id = "black-header";
    blackHeaderElement.innerHTML = '<p><i class="fa-regular fa-pen-to-square"></i> Mode édition</p>';
    const headerElement = document.querySelector("header");
    const headerDiv = document.getElementById("header");
    headerElement.insertBefore(blackHeaderElement, headerDiv);
    
    //remplace login par logout
    let logElement = document.querySelector("#header li a");
    logElement.innerText = "logout";
    logElement.href = "./index.html";
    logElement.addEventListener("click", () => {
        localStorage.clear()
    })
}
