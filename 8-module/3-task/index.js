export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (product === '' || product === null) {
      return;
    }
    let cartItem;
    let index = this.cartItems.indexOf(product);
    if (index !== -1) {
      this.cartItems[index].count += 1;
    } else {
      cartItem = {product: product, count: 1};
      this.cartItems.push(cartItem);
    }
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem;
    this.cartItems.forEach((item, index) => {
      if (item.product.id === productId) {
        item.count += amount;
        cartItem = this.cartItems[index];
      }
      if (item.count === 0) {

        this.cartItems.splice(index, 1);
      }
      this.onProductUpdate(cartItem);
    });

  }

  isEmpty() {
    if (this.cartItems.length === 0) return  true;
   return false;
  }

  getTotalCount() {
   let totalCount = 0;
    this.cartItems.forEach(item => {
      totalCount +=item.count;
    })
    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.cartItems.forEach(item=> {
      totalPrice += item.count * item.product.price;
  })
    return totalPrice;}

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

