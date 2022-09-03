const displayCategories = async () => {
    const urlLink = `https://openapi.programming-hero.com/api/news/categories`
    const dataLoad = await catagoriesDataLoad(urlLink);
    // console.log(dataLoad.data.news_category);
    const newsCategory = dataLoad.data.news_category;
    const uniqueCategoriesElement = [];
    newsCategory.forEach(element => {
        // const categories = element.category_name;
        if (uniqueCategoriesElement.includes(element.category_name) === false) {
            uniqueCategoriesElement.push(element);
        }
    });

    // uniqueCategoriesElement.unshift("Home");
    // console.log(uniqueCategoriesElement);
    const categoriesArea = document.getElementById("catagories-area");
    uniqueCategoriesElement.forEach(element => {
        const categoryId = element.category_id;
        // console.log(typeof (categoryId));
        // const categoryIdNumber = parseFloat(categoryId);
        const li = document.createElement("li");
        li.innerText = element.category_name;
        li.setAttribute("onclick", `displayNews(${categoryId})`);

        categoriesArea.appendChild(li);


    })



};

displayCategories()