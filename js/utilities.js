// common data load function 

const apiDataLoad = async (urlLink) => {
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
    const dataLoad = await apiDataLoad(url);
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
        const uniqueId = element._id;
        // console.log(element);
        const div = document.createElement("div");
        div.classList.add("row");
        div.classList.add("g-0");
        div.classList.add("my-4");
        div.classList.add("bg-light");
        div.innerHTML = `
        <div class=" p-sm-2 col-md-3 text-center">
            <img src="${element.thumbnail_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="px-sm-3 py-sm-2 col-md-9">
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
                    <button onclick="displayModal('${uniqueId}')" type="button" class="btn btn-primary" data-bs-toggle="modal"            data-bs-target="#exampleModal">Details</button>
                    </div>

                </div>


            </div>
        </div>
        `
        newsSection.appendChild(div);

        spinnerOff();

    });
}

const displayModal = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    spinnerON();
    const dataLoad = await apiDataLoad(url);
    const data = dataLoad.data[0];
    console.log(data);
    const modalTitle = document.getElementById("exampleModalLabel");
    modalTitle.innerText = "";
    modalTitle.innerText = `${data.title ? data.title : "No Title"}`;
    const modalBody = document.getElementById("modal-body");
    modalBody.innerText = "";
    const table = document.createElement("table");
    table.classList.add("table");
    table.classList.add("table-bordered");
    table.classList.add("text-muted");
    table.classList.add("table-hover");
    table.innerHTML = `
                    <tr>
                        <th class="fw-bold fs-3">Properties</th>
                        <th class="fw-bold fs-3">Value</th>
                    </tr>
                    <tr>
                        <td class="fw-bolder fs-5">Author Name :</td>
                        <td>${data.author.name ? data.author.name : "No Name"}</td>
                    </tr>
                    <tr>
                        <td class="fw-bolder fs-5">Published Date :</td>
                        <td>${data.author.published_date ? data.author.published_date : "No Date"}</td>
                    </tr>
                    <tr>
                        <td class="fw-bolder fs-5">Rating Number :</td>
                        <td>${data.rating.number ? data.rating.number : "0.0"}</td>
                    </tr>
                    <tr>
                        <td class="fw-bolder fs-5">Total View :</td>
                        <td>${data.total_view ? data.total_view : "00"}</td>
                    </tr>
    `;
    modalBody.appendChild(table);
    spinnerOff();
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