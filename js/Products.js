class Products {
    constructor() {
    }
    overFolow = (content, length) => {
        if (content.length > length) {
            content = content.substring(0, length) + "...";
        }
        return content;
    }
    
    
    renderProducts = (data, element) => {
        function generateDetailPageURL(item) {
            const hostName = location.hostname;
            let url = ['127.0.0.1', 'localhost'].includes(hostName) ? '' : '/eProject1_OceanGate_Group06';
            
            // publish
            if (url) {
                return `${url}/page/view_detail.html?id=${item.id}`;
            } else {
                // development
                return `../page/view_detail.html?id=${item.id}`;
            }
        }
        if (data.length > 0) {
            const contentHTML = data.reduce((content, item) => {
                const discount = item.price * ((100 - item.promotion) / 100);
                content += `<div class="products__item">
            <div class="products__discount">
            Discount ${item.promotion}%
            </div>
            <div class="products__img">
            <a href="${generateDetailPageURL(item)}">
            <img src="${item.imageThumb}" alt="">
        </a>
            </div>
            <h3 class="products__title"><a href="#">${this.overFolow(item.name, 29)}</a></h3>
            <div class="products__price">
                <span>${fomatVnd(discount)}</span>
                <span>${fomatVnd(item.price)}</span>
            </div>
        
            <div class="products__evaluate">
                <div class="products__star">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                </div>
                <span>${item.evaluate.length} rate</span>
                <div class="products__add" data-id="${item.id}"><i class="fa fa-cart-plus"></i></div>
            </div>
        </div>`
                return content;
            }, "")
            element.innerHTML = contentHTML;
        }
    }
    renderByBrand = (data, brandFilter, element) => {
        const filteredData = data.filter(item => item.specifications.brand === brandFilter);

        if (filteredData.length > 0) {
            const contentHTML = filteredData.reduce((content, item) => {
                const discount = item.price * ((100 - item.promotion) / 100);
                content += `<div class="products__item">
                    <div class="products__discount">
                        Discount ${item.promotion}%
                    </div>
                    <div class="products__img">
                        <a href="./page/view_detail.html?id=${item.id}">
                            <img src="${item.imageThumb}" alt="">
                        </a>
                    </div>
                    <h3 class="products__title">
                        <a href="#">${this.overFolow(item.name, 29)}</a>
                    </h3>
                    <div class="products__price">
                        <span>${fomatVnd(discount)}</span>
                        <span>${fomatVnd(item.price)}</span>
                    </div>
                    <div class="products__evaluate">
                        <div class="products__star">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                        </div>
                        <span>${item.evaluate.length} rate</span>
                        <div class="products__add" data-id="${item.id}">
                            <i class="fa fa-cart-plus"></i>
                        </div>
                    </div>
                </div>`;
                return content;
            }, "");

            element.innerHTML = contentHTML;
        } else {
            element.innerHTML = "Không có sản phẩm nào thuộc brand này.";
        }
    }
    productsFlashSale = (data) => {
        const newData = data.filter((item) => { return item.promotion >= 50 }).slice(0, 5);
        this.renderProducts(newData, getEle("#flashSale"));
    }
    findSearchProducts = (data, value) => {
        return data.filter((item) => {
            const name = item.name.toUpperCase();
            return name.includes(value);
        });
    }
    renderSearch = (event, data) => {
        const valueSearch = event.target.value.toUpperCase();
        let newData = this.findSearchProducts(data, valueSearch);
        if (valueSearch.trim() == "") {
            newData = [];
        }
        let printSeach = getEle("#search");
        if (newData.length > 0) {
            const resultHTML = newData.reduce((content, item) => {
                const discount = item.price * ((100 - item.promotion) / 100);
                content += `
                <a href="./page/view_detail.html" class="header__search--item">
                    <img src="${item.imageThumb}"
                        alt="">
                    <div class="header__search--content">
                        <p class="header__search--name">${item.name}</p>
                        <div>
                            <p class="header__search--price">${fomatVnd(discount)}</p>
                            <p class="header__search--discount">${fomatVnd(item.price)}</p>
                        </div>
                    </div>
                </a>`
                return content
            }, "")
            printSeach.innerHTML = resultHTML;
        } else {
            printSeach.innerHTML = "";
        }
    }
    setLocalStorage = (arr) => {
        localStorage.setItem("shopping-cart", JSON.stringify(arr));
    }
    getLocalStorage = (name) => {
        if (localStorage.getItem(name) && localStorage.getItem(name) != "undefined") {
            return JSON.parse(localStorage.getItem(name));
        } else {
            return [];
        }
    }
    countOrder = () => {
        let length = "";
        if (this.getLocalStorage("shopping-cart")) {
            length = this.getLocalStorage("shopping-cart").length
        }
        getEle(".header__shopping--count").innerHTML = length;
    }
    addShoppingCart = (event, data) => {
        const idProduct = event.target.parentElement.dataset.id;
        const findID = data.find(item => item.id == idProduct);
        const status = localStorage.getItem("shopping-cart");
        const arrId = this.getLocalStorage("shopping-cart");
        if (findID) {
            const newItem = { id: findID.id, quantity: 1 };
            if (!status || status == "undefined") {
                arrId.push(newItem);
                this.setLocalStorage(arrId);
            } else {
                let statusId = arrId.findIndex(item => item.id == idProduct);
                if (statusId != -1) {
                    arrId[statusId].quantity++;
                    this.setLocalStorage(arrId);
                } else {
                    arrId.push(newItem);
                    this.setLocalStorage(arrId);
                }
            }
            this.renderShoppingCart(data);
        } else {
            console.log("lỗi không tìm thấy id trên hệ thống");
        }
        this.countOrder();
    }
    renderShoppingCart = (data) => {
        const dataLocalStorage = this.getLocalStorage("shopping-cart");
        const productsCart = getEle(".shopping__products");
        let total = 0;
        if (dataLocalStorage.length > 0) {
            const content = dataLocalStorage.map((item) => {
                const itemProduct = data.find(product => item.id == product.id);
                const discount = itemProduct.price * item.quantity * ((100 - itemProduct.promotion) / 100);
                total += discount;
                return `<div class="shopping__item">
                <div class="shopping__item--left">
                    <div class="shopping__item--img">
                        <img src="${itemProduct.imageThumb}" alt="">
                    </div>
                    <div class="shopping__item--intro">
                        <div class="shopping__item--name">${itemProduct.name}</div>
                        <div class="shopping__item--price"><span>${item.quantity} x </span>${fomatVnd(discount)}</div>
                    </div>
                </div>
                <div class="shopping__item--right">
                    <i class="fa fa-trash-alt delete-cart" data-id="${itemProduct.id}"></i>
                </div>
            </div>`;
            }).join("");
            productsCart.innerHTML = content;
        } else {
            productsCart.innerHTML = `Không tìm thấy sản phẩm nào!`;
        }
        getEle(".shopping__total span").innerHTML = fomatVnd(total);
        const deleteCart = document.querySelectorAll(".delete-cart");
        deleteCart.forEach((item) => {
            item.addEventListener("click", (event) => { this.removeShoppingCart(event, data) });
        });
    }
    removeShoppingCart = (event, data) => {
        const id = event.target.dataset.id;
        let dataLocalStorage = this.getLocalStorage("shopping-cart");
        const indexDel = dataLocalStorage.findIndex(item => item.id == id);
        dataLocalStorage.splice(indexDel, 1);
        this.setLocalStorage(dataLocalStorage);
        this.renderShoppingCart(data);
        this.countOrder();
    }
    changeActiveCart = () => {
        const statusCart = getEle(".shopping");
        statusCart.classList.toggle("active");
    }
    findItemId = (id, data) => {
        return data.find(item => item.id == id);
    }
    renderBrandList = (data) => {
        const brandList = getEle("#brandList");

    if (brandList) {  // Check if brandList is not null or undefined
        const brands = [...new Set(data.map(item => item.specifications.brand))];
        const contentHTML = brands.map(brand => `<li><a href="#" data-brand="${brand}">${brand}</a></li>`).join("");
        brandList.innerHTML = contentHTML;
    }
        
    }
    
    filterProductsByBrand = (data, brand) => {
        return data.filter(item => item.specifications.brand === brand);
    }
    filterProductsByType = (data, type) => {
        return data.filter(item => item.specifications.type === type);
    }
    addBrandClickEvent = (data) => {
        const brandList = getEle("#brandList");
        brandList.addEventListener("click", (event) => {
            if (event.target.tagName === "A") {
                const selectedBrand = event.target.dataset.brand;
                // Sử dụng hàm renderProductsByBrand thay vì renderProducts
                this.renderProductsByBrand(data, selectedBrand, getEle("#products"));
            }
        });
    }
    
    renderProductsByBrand = (data, brand, targetElement) => {
        const filteredProducts = this.filterProductsByBrand(data, brand);
        this.renderProducts(filteredProducts, targetElement);
        
    }

    renderProductsByType = (data, type, targetElement) => {
        const filteredProducts = this.filterProductsByType(data, type);
        this.renderProducts(filteredProducts, targetElement);
        
    }
    
}