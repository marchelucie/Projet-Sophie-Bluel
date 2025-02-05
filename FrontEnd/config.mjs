// Gallerie interactive

export function displayWorks() {
    const gallery = document.querySelector(".gallery");
    gallery.innerText = "";
    for (let i = 0; i < works.length; i++) {
        const divElement = document.createElement("div");
        gallery.appendChild(divElement);
        const imageElement = document.createElement("img");
        imageElement.src = works[i].imageUrl;
        const titleElement = document.createElement("p");
        titleElement.innerText = `${works[i].title}`;
        divElement.appendChild(imageElement);
        divElement.appendChild(titleElement);
    }
}