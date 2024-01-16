const main = async () => {
    const product = new Products;
     const hostName = location.hostname;
    let url = ['127.0.0.1', 'localhost'].includes(hostName) ? '' : '/eProject1_OceanGate_Group06';
    const post = await fetch(`${url}/js/data/data.json`);
    const data = await post.json();
    
    // Render danh sách thương hiệu
    product.renderBrandList(data.products);

    // Render sản phẩm ban đầu
    product.renderProducts(data.products, getEle("#products"));

    // Hiển thị sản phẩm Flash Sale
    product.productsFlashSale(data.products);

    // Thêm sự kiện click cho thương hiệu
    product.addBrandClickEvent(data.products);



    // Thêm sự kiện click cho nút thêm vào giỏ hàng
    const buttonAddCart = document.querySelectorAll(".products__add");
    buttonAddCart.forEach(item => item.addEventListener("click", (event) => { product.addShoppingCart(event, data.products) }));
}

main();
