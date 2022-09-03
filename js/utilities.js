const catagoriesDataLoad = async (urlLink) => {
    const res = await fetch(urlLink);
    const data = await res.json();
    // console.log(data);
    return data;
}

const displayNews = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;
    const dataLoad = await catagoriesDataLoad(url);
    const elements = dataLoad.data;
    elements.forEach(element => {
        console.log(element);
    });
}
