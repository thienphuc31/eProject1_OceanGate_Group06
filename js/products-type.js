const main = async () => {
    const product = new Products;

    try {
        // Fetch data from the JSON file
        const post = await fetch("/js/data/data.json");
        const data = await post.json();

        // Get brand from URL
        const type = getTypeFromURL();

        // Check if brand is provided in the URL
        if (type) {
            // Render products based on the selected brand
            product.renderProductsByType(data.products, type, getEle("#products"));
        } else {
            // If no brand is provided, render all products
            product.renderProducts(data.products, getEle("#products"));
        }

        // Thêm sự kiện click cho nút thêm vào giỏ hàng
        const buttonAddCart = document.querySelectorAll(".products__add");
        buttonAddCart.forEach(item => item.addEventListener("click", (event) => { product.addShoppingCart(event, data.products) }));
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
}

main();
