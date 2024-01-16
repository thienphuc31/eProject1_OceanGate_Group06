const mainShopping = async () => {
    const product = new Products;
     const hostName = location.hostname;
    let url = ['127.0.0.1', 'localhost'].includes(hostName) ? '' : '/eProject1_OceanGate_Group06';
    const post = await fetch(`${url}/js/data/data.json`);
    const data = await post.json();
    product.renderShoppingCart(data.products);
    product.countOrder();
    const buttonViewCart = getEle("#view-cart");
    buttonViewCart.addEventListener("click", product.changeActiveCart);
    const closeButtonViewCart = document.querySelectorAll("#closeCart, .shopping__black");
    closeButtonViewCart.forEach(item => item.addEventListener("click", product.changeActiveCart));
}
mainShopping();