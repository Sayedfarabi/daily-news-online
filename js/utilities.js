const catagoriesDataLoad = async (urlLink) => {
    const res = await fetch(urlLink);
    const data = await res.json();
    // console.log(data);
    return data;
}
