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
                    <div class="text-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                    <i class="fa-solid fa-arrow-right"></i>
                    </div>
                </div>


            </div>
        </div>
        `
        newsSection.appendChild(div);
        spinnerOff();

    });
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