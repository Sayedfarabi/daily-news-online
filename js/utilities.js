// common data load function 

const catagoriesDataLoad = async (urlLink) => {
    try {
        const res = await fetch(urlLink);
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err)
    }

}

// Display News function 

const displayNews = async (id) => {
    spinnerON();
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;
    const dataLoad = await catagoriesDataLoad(url);
    const newsSection = document.getElementById("news-section");
    newsSection.innerText = "";
    const foundSection = document.getElementById("found-section");
    foundSection.innerText = "";
    const elements = dataLoad.data;
    const elementsLength = elements.length;
    const h5 = document.createElement("h5");
    h5.innerText = `${elementsLength} items found for category Entertainment`;
    foundSection.appendChild(h5);

    elements.forEach(element => {

        const div = document.createElement("div");
        div.classList.add("row");
        div.classList.add("g-0");
        div.classList.add("my-2");
        div.innerHTML = `
        <div class="col-md-3">
            <img src="${element.thumbnail_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-9">
            <div class="card-body">
                <div>
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.details.length > 600 ? element.details.slice(0, 600) + "..." : element.details}</p>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center mt-3">
                    <div class="d-flex">
                        <div>
                            <img style="width: 4rem;" class="rounded-circle" src="${element.author.img}" alt="">
                        </div>
                        <div class=" ms-2">
                            <h6>${element.author.name}</h6>
                            <p>${element.author.published_date}</p>
                        </div>
                    </div>
                    <div class="text-success">
                        <i class="fa-regular fa-eye"><span class="ms-2">${element.total_view}</span></i>
                    </div>
                    <div class="text-warning">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star-half-stroke"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>
                    <div>
                        <button onclick = "displayModel(${element})" type="button" class="btn btn-primary" data-bs-toggle="modal"    data-bs-target="#exampleModal"> Details </button>
                    </div>
                </div>


            </div>
        </div>
        `
        newsSection.appendChild(div);

        spinnerOff();

    });
}

const displayModal = (element) => {
    const modalSection = document.getElementById("exampleModal");
    modalSection.innerText = "";
    const divModal = document.createElement("div");
    divModal.classList.add("modal-dialog");
    divModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
            <h3 class="modal-title" id="exampleModalLabel">${element.title}</h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <table>
                    <tr>
                        <th class="fw-bold fs-4">Properties</th>
                        <th class="fw-bold fs-4">Value</th>
                    </tr>
                    <tr>
                        <td class="fw-bolder fs-5">Author Name :</td>
                        <td>${element.author.name}</td>
                    </tr>
                    <tr>
                        <td class="fw-bolder fs-5">Published Date :</td>
                        <td>${element.author.published_date}</td>
                    </tr>
                    <tr>
                        <td class="fw-bolder fs-5">Rating Number :</td>
                        <td>${element.rating.number}</td>
                    </tr>
                    <tr>
                        <td class="fw-bolder fs-5">Total View :</td>
                        <td>${element.total_view}</td>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    `;
    modalSection.appendChild(divModal);
}

// Spinner ON Function 
const spinnerON = () => {
    const spinnerSection = document.getElementById("spinner-section");
    spinnerSection.classList.remove("d-none");
}

// Spinner OFF function
const spinnerOff = () => {
    const spinnerSection = document.getElementById("spinner-section");
    spinnerSection.classList.add("d-none");
}