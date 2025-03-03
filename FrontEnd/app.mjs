// ********** Appel API **********

const response = await fetch("http://localhost:5678/api/works");
let works = await response.json();
console.log(works);

const responseCategories = await fetch("http://localhost:5678/api/categories");
const categories = await responseCategories.json();
console.log(categories);

// ********** Galerie interactive **********
const gallery = document.querySelector(".gallery");
const btnFilterAll = document.getElementById("all");
btnFilterAll.focus();

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
        return work.categoryId === categoryId;
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
async function displayFilters() {
    const filters = document.querySelector(".filters");
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
    try {
        for (let i = 0; i < categories.length; i++) {
            const btnFilter = document.createElement("button");
            btnFilter.innerText = categories[i].name;
            btnFilter.id = categories[i].id;
            btnFilter.addEventListener("click", () => filterWorks(categories[i].id, works));
            filters.appendChild(btnFilter);
        }
    }
    catch(error) {
        console.error()
    }
};

displayFilters(); //Appel de filterWorks() à l'intérieur de displayWorks()


//--------Mode Edition----------

function editMode() {
    // Suppression des filtres
    const filters = document.querySelector(".filters");
    filters.innerText = "";

    // Ajout "modifier" à côté de "Mes Projets"
    const modifyElement = document.createElement("a");
    modifyElement.id = "modify";

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
function createModal() {
    const modal = document.createElement('aside');
    modal.id = 'modal';
    modal.setAttribute('role', 'dialog');
    modal.style.display = 'none';
    modal.setAttribute('inert', '');

    const wrapper1 = document.createElement('div');
    wrapper1.classList.add('modal-wrapper');
    wrapper1.id = 'wrapper1';

    const hideModal1 = document.createElement('div');
    hideModal1.classList.add('hide-modal');
    const close1 = document.createElement('div');
    close1.id = 'close1';
    close1.innerHTML = "<i class='fa-solid fa-xmark'></i>";
    hideModal1.appendChild(close1);

    const title1 = document.createElement('h3');
    title1.textContent = 'Galerie photo';

    const gallery = document.createElement('div');
    gallery.classList.add('modal-gallery');

    const addButton = document.createElement('button');
    addButton.classList.add('button');
    addButton.id = 'add-picture';
    addButton.textContent = 'Ajouter une photo';

    wrapper1.append(hideModal1, title1, gallery, addButton);

    const wrapper2 = document.createElement('div');
    wrapper2.classList.add('modal-wrapper');
    wrapper2.id = 'wrapper2';
    wrapper2.style.display = 'none';

    const hideModal2 = document.createElement('div');
    hideModal2.classList.add('hide-modal');
    const back = document.createElement('div');
    back.id = 'back';
    back.innerHTML = "<i class='fa-solid fa-arrow-left'></i>";
    const close2 = document.createElement('div');
    close2.id = 'close2';
    close2.innerHTML = "<i class='fa-solid fa-xmark'></i>";
    hideModal2.append(back, close2);

    const title2 = document.createElement('h3');
    title2.textContent = 'Ajout photo';

    const form = document.createElement('form');

    const addFileDiv = document.createElement('div');
    addFileDiv.id = 'add-file';

    const img2 = document.createElement('img');
    img2.src = './assets/icons/img-repo.png';
    img2.alt = '';
    const fileButton = document.createElement('button');
    fileButton.type = "button";
    const fileLabel = document.createElement('label');
    fileLabel.htmlFor = 'img-file';
    fileLabel.textContent = '+ Ajouter photo';
    fileButton.appendChild(fileLabel);
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'img-file';
    fileInput.accept = '.png, .jpg';
    const fileInfo = document.createElement('p');
    fileInfo.textContent = 'jpg, png: 4mo max';
    addFileDiv.append(img2, fileButton, fileInput, fileInfo);

    const titleLabel = document.createElement('label');
    titleLabel.htmlFor = 'img-title';
    titleLabel.textContent = 'Titre';
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'img-title';

    const categoryLabel = document.createElement('label');
    categoryLabel.htmlFor = 'img-category';
    categoryLabel.textContent = 'Catégorie';
    const categorySelect = document.createElement('select');
    categorySelect.name = 'img-category';
    categorySelect.id = 'img-category';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '';
    defaultOption.selected = true;
    defaultOption.disabled = true;
    categorySelect.appendChild(defaultOption);

    const option1 = document.createElement('option');
    option1.value = '1';
    option1.textContent = 'Objets';
    categorySelect.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = '2';
    option2.textContent = 'Appartements';
    categorySelect.appendChild(option2);

    const option3 = document.createElement('option');
    option3.value = '3';
    option3.textContent = 'Hotels & restaurants';
    categorySelect.appendChild(option3);

    const submitButton = document.createElement('input');
    submitButton.classList.add('button');
    submitButton.type = 'submit';
    submitButton.value = 'Valider';
    submitButton.disabled = true;

    form.append(addFileDiv, titleLabel, titleInput, categoryLabel, categorySelect, submitButton);

    wrapper2.append(hideModal2, title2, form);

    modal.append(wrapper1, wrapper2);
    document.body.appendChild(modal);
}

// Création de la galerie dynamique dans la modale avec boutons de suppression
function modalGallery() {
    const modalGallery = document.querySelector(".modal-gallery");
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

// Suppression des projets par l'utilisateur
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
                displayWorks(works);
                deleteWork();

            } catch (error) {
                console.error("Erreur lors de la suppression : ", error)
            }
        })
    }
}

// Affichage de la page d'ajout de projet après un click sur "Ajouter une photo"
function addWorkModal() {
    const addPictureBtn = document.getElementById("add-picture");
    addPictureBtn.addEventListener("click", () => {
        const gallery = document.getElementById("wrapper1");
        const addPicture = document.getElementById("wrapper2");
        gallery.style.display = "none";
        addPicture.style.display = "flex";
    })
}

// Ajout de projet par l'utilisateur
function addPicture() {
    const imgFile = document.getElementById("img-file");
    const addFileDiv = document.getElementById("add-file");

    imgFile.addEventListener("change", (event) => {
        event.preventDefault();
        const file = event.target.files[0];

        if (file) {
            console.log("Vous avez choisi l'image suivante : ", file.name);
            // Récupération de l'URL du fichier image pour l'insérer en visualisation dans la modale
            const reader = new FileReader();
            reader.onload = function (e) {
                addFileDiv.innerHTML = "";
                const chosenPictureImg = document.createElement("img");
                chosenPictureImg.id = "img-work";
                chosenPictureImg.setAttribute("src", e.target.result);
                chosenPictureImg.style.maxHeight = "100%";
                addFileDiv.appendChild(chosenPictureImg);
            };
            reader.readAsDataURL(file); // Convertit le fichier en URL de données
        }
    });

    const submitButton = document.querySelector("#wrapper2 .button");
    const inputTitle = document.getElementById("img-title");
    const inputCategory = document.getElementById("img-category");
    const form = document.querySelector(".modal-wrapper form");

    function checkForm() {
        if (imgFile.files.length > 0 && inputTitle.value.trim() !== "" && inputCategory.value !== "") {
            console.log("Vous pouvez soumettre le formulaire");
            submitButton.removeAttribute("disabled");
            // Le bouton Valider devient fonctionnel une fois que tous les champs sont remplis
        } else {
            submitButton.setAttribute("disabled", "true");
        }
    }

    imgFile.addEventListener("change", checkForm);
    inputTitle.addEventListener("input", checkForm);
    inputCategory.addEventListener("change", checkForm);

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        const file = imgFile.files[0];
        const formData = new FormData();
        formData.append("image", file);
        formData.append("title", inputTitle.value);
        formData.append("category", parseInt(inputCategory.value));

        try {
            const response = await fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: { "Authorization": `Bearer ${localStorage.token}`, },
                body: formData,
            })

            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`)
            } else {
                console.log("Nouveau projet en ligne !");
            }
            const newWork = await response.json();
            console.log("Nouveau projet ajouté :", newWork);
            works.push(newWork);
            const modal = document.querySelector("aside");
            modal.remove();
            console.log("Existence de la modale : ", !!document.querySelector("aside"));
            document.body.classList.remove("modal-open");
            displayWorks(works);
        } catch (error) {
            console.error("Erreur lors du chargement du projet : ", error)
            let errorMessage = document.getElementById("add-work-error");
            if (!errorMessage) {
                errorMessage = document.createElement("p");
                errorMessage.id = "add-work-error";
                form.appendChild(errorMessage);
            }
            errorMessage.innerText = "Erreur lors du chargement du projet. Veuillez réessayer"
        }
    })


}

// Modale fonctionnelle (utilise les fonctions de createModal() jusqu'à addPicture())
function displayModal() {
    const modifyElement = document.getElementById("modify");
    console.log("Existence de la modale : ", !!document.querySelector("aside"));

    modifyElement.addEventListener("click", () => {
        //Ouverture
        // Appeler la fonction pour insérer la modale dans le DOM
        createModal();
        const modal = document.getElementById("modal");
        modal.style.display = "flex";
        document.body.classList.add("modal-open");
        modal.removeAttribute("inert");
        modalGallery();
        deleteWork();
        addWorkModal();
        addPicture();
        console.log("Existence de la modale : ", !!document.querySelector("aside"));
        
        // Fermeture
        const closeButton1 = document.getElementById("close1");
        const closeButton2 = document.getElementById("close2");
        closeButton1.addEventListener("click", () => {
            //Supprime la modale du DOM lors du click sur le bouton de fermeture
            modal.remove();
            document.body.classList.remove("modal-open");
            console.log("Existence de la modale : ", !!document.querySelector("aside"));
        });
        closeButton2.addEventListener("click", () => {
            modal.remove();
            document.body.classList.remove("modal-open");
            console.log("Existence de la modale : ", !!document.querySelector("aside"));
        });
        modal.addEventListener("click", function (event) {
            if (event.target === this) {
                //Supprime la modale du DOM lors du click sur l'arrière plan
                modal.remove();
                document.body.classList.remove("modal-open");
                console.log("Existence de la modale : ", !!document.querySelector("aside"));
            }
        });

        //Retour
        const back = document.getElementById("back");
        back.addEventListener("click", () => {
            const gallery = document.getElementById("wrapper1");
            const addPicture = document.getElementById("wrapper2");
            gallery.style.display = "flex";
            addPicture.style.display = "none";
        })
    });

}

console.log("Authorization : ", !!localStorage.token);

if (!!localStorage.token) {
    editMode();
}
