const mainSearch = async () => {
    const product = new Products;
     const hostName = location.hostname;
    let url = ['127.0.0.1', 'localhost'].includes(hostName) ? '' : '/eProject1_OceanGate_Group06';
    const post = await fetch(`${url}/js/data/data.json`);
    const data = await post.json();
    const inputSearch = getEle("#search-products");
    inputSearch.addEventListener("keyup", (event) => { product.renderSearch(event, data.products) });
}
mainSearch();
