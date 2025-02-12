// ********** Appel API **********

const response = await fetch("http://localhost:5678/api/works");
let works = await response.json();
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
function filterWorks(categoryId, works) {
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

function editMode() {
    // Suppression des filtres
    const filters = document.querySelector(".filters");
    filters.innerText = "";

    // Ajout "modifier" à côté de "Mes Projets"
    const modifyElement = document.createElement("a");
    modifyElement.id = "modify";
    modifyElement.href = "#modal1";
    modifyElement.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> modifier';
    const projectTitleElement = document.querySelector(".title");
    projectTitleElement.appendChild(modifyElement);

    displayModal();

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
    });

}
// Ajout de la modale

function modalGallery() {
    const modalGallery = document.querySelector(".modal-gallery");
    const modalTitle = document.getElementById("modal-title");
    modalGallery.innerHTML = "";
    for (let i = 0; i < works.length; i++) {
        const divElement = document.createElement("div");
        modalGallery.appendChild(divElement);
        const trashElement = document.createElement("i");
        trashElement.id = "trash-bin" + `${works[i].id}`;
        trashElement.className = "fa-solid fa-trash-can";
        divElement.appendChild(trashElement);
        const imageElement = document.createElement("img");
        imageElement.src = works[i].imageUrl;
        divElement.appendChild(imageElement);
    }
}


// Affichage de la modale (utilise modalGallery et deleteWork)
function displayModal() {
    const modifyElement = document.getElementById("modify");
    const modal = document.getElementById("modal1");
    const closeButton = document.getElementById("close");
    //Ouverture
    modifyElement.addEventListener("click", () => {
        modal.style.display = "flex";
        document.body.classList.add("modal-open");
        modalGallery();
        deleteWork();
        addWork();
    });

    // Fermeture
    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
        document.body.classList.remove("modal-open");
    });
    modal.addEventListener("click", function (event) {
        if (event.target === this) {
            modal.style.display = "none";
            document.body.classList.remove("modal-open");
        }
    });

}

// Suppression des projets
function deleteWork() {
    const token = localStorage.getItem("token");
    for (let i = 0; i < works.length; i++) {
        const trashElement = document.getElementById(`trash-bin${works[i].id}`);
        trashElement.addEventListener("click", async () => {
            const workToDelete = {
                id: works[i].id
            };
            const chargeUtile = JSON.stringify(workToDelete);
            try {
                const response = await fetch(`http://localhost:5678/api/works/${works[i].id}`, {
                    method: "DELETE",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: chargeUtile
                });

                if (!response.ok) {
                    throw new Error(`Erreur HTTP : ${response.status}`);
                }

                console.log(`Projet ${works[i].id} supprimé avec succès !`);
                
                //Retire l'élèment du DOM, permet de voir la suppresion sans rechargement de la page
                works = works.filter(work => work.id !== works[i].id); 
                //Regénère la galerie
                modalGallery();
                //
                deleteWork();

            } catch (error) {
                console.error("Erreur lors de la suppression : ", error)
            }
        })
    }
}

function addWork() {
    const addPictureBtn = document.getElementById("add-picture");
    addPictureBtn.addEventListener("click", () => {
        const gallery = document.getElementById("wrapper1");
        const addPicture = document.getElementById("wrapper2");
        gallery.style.display = "none";
        addPicture.style.display = "flex";
    })
}

console.log(!!localStorage.token);

if (!!localStorage.token) {
    editMode();
}
