class FilterByBrand {
    filterProductsByBrand = (products, brand) => {
        return products.filter(item => item.specifications.brand === brand);
    };
}