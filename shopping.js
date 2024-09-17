class Product {
    constructor(id, image, title, like = false, quantity = 1, price = 0) {
        this.id = id;
        this.image = image;
        this.title = title;
        this.like = like;
        this.quantity = quantity;
        this.price = price;
    }
}

let categories = [];

// id
function generateProductId() {
    return categories.length ? categories[categories.length - 1].id + 1 : 1;
}

// new product
function addNewProduct() {
    const name = document.getElementById('newProductName').value;
    const description = document.getElementById('newProductDescription').value;
    const price = parseFloat(document.getElementById('newProductPrice').value);
    const image = document.getElementById('newProductImage').value || 'icons/default.png';

    if (name && description && price > 0) {
        const newProduct = new Product(generateProductId(), image, name, false, 1, price);
        categories.push(newProduct);
        displaycart();
        document.getElementById('addProductForm').reset(); 
    } else {
        alert('Please provide valid product details');
    }
}

// delete
function delProduct(id) {
    const index = categories.findIndex((product) => product.id === id);
    if (index !== -1) {
        categories.splice(index, 1);
        displaycart();
    }
}

// add qte
function addQuantity(id) {
    const product = categories.find(obj => obj.id === id);
    if (product) {
        product.quantity++;
        displaycart();
    }
}

// delete qt
function removeQuantity(id) {
    const product = categories.find(obj => obj.id === id);
    if (product) {
        product.quantity = Math.max(0, product.quantity - 1);
        displaycart();
    }
}

// like
function change(id) {
    const product = categories.find(obj => obj.id === id);
    if (product) {
        product.like = !product.like;
        displaycart();
    }
}

// Afficher le panier
function displaycart() {
    let total = 0;
    document.getElementById("root").innerHTML = categories.map((item) => {
        const { id, image, title, like, quantity, price } = item;
        const totalPrice = price * quantity;
        total += totalPrice;

        return `
            <tr>
                <td><img class="img" src="${image}" alt="${title}"></td>
                <td>${title}</td>
                <td><img class="heart" onclick="change(${id})" src="${like ? 'icons/heart.png' : 'icons/heart2.png'}"></td>
                <td><button onclick="addQuantity(${id})">+</button></td>
                <td>${quantity}</td>
                <td><button onclick="removeQuantity(${id})">-</button></td>
                <td>${totalPrice} DT</td>
                <td><button onclick="delProduct(${id})">Supprimer</button></td>
            </tr>
        `;
    }).join('');

    document.getElementById("totalA").innerHTML = total + " DT";
    document.getElementById("totalB").innerHTML = total + " DT";
}
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addProductBtn').addEventListener('click', addNewProduct);
    document.getElementById('cancelBtn').addEventListener('click', () => {
        document.getElementById('addProductForm').reset();
    });
    displaycart(); 
});
