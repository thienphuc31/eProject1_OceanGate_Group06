const mainSearch = async () => {
    const product = new Products;
    const post = await fetch("/js/data/data.json");
    const data = await post.json();
    const inputSearch = getEle("#search-products");
    inputSearch.addEventListener("keyup", (event) => { product.renderSearch(event, data.products) });
}
mainSearch();
