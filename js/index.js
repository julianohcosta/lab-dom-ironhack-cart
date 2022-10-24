// ITERATION 1

function updateSubtotal(product) {
  const price = +product.querySelector('.price span').innerHTML;
  const quantity = product.querySelector('.quantity input').valueAsNumber;
  const subtotal = price * quantity

  product.querySelector('.subtotal span').innerHTML = subtotal

  return subtotal;
}

function calculateAll() {
  // code in the following two lines is added just for testing purposes.
  // it runs when only iteration 1 is completed. at later point, it can be removed.
  // const singleProduct = document.querySelector('.product');
  // updateSubtotal(singleProduct);
  // end of test

  // ITERATION 2
  const products = document.querySelectorAll('.product');
  let sum = 0;
  products.forEach(product => {
    sum += updateSubtotal(product);
  })

  // ITERATION 3
  document.querySelector('#total-value > span').innerHTML = sum;
}

// ITERATION 4

function removeProduct(event) {
  event.target.parentElement.parentElement.remove()
}

// ITERATION 5

function createProduct() {

  const productNameInput = document.querySelector(".create-product td input[type=text]");
  const productPriceInput = document.querySelector(".create-product td input[type=number]");

  const productName = productNameInput.value;
  let productPrice = productPriceInput.value;

  if (!productPrice.includes(".")) {
    productPrice += ".00"
  }else {
    let cents = productPrice.split(".")[1]
    if (cents.length === 1){
      productPrice += "0"
    }
  }


  const productTable = document.querySelector('tbody');

  const row = productTable.insertRow(productTable.rows.length);
  row.className = "product"

  const productNameCell = row.insertCell(0);
  productNameCell.className = "name"
  let span = document.createElement("span")
  span.innerHTML = productName
  productNameCell.appendChild(span)

  const productPriceCell = row.insertCell(1);
  productPriceCell.className = "price"
  productPriceCell.innerHTML = "$"
  span = document.createElement("span")
  span.innerHTML = productPrice
  productPriceCell.appendChild(span)

  const quantityCell = row.insertCell(2);
  quantityCell.className = "quantity"
  const input = document.createElement("input")
  input.type = "number"
  input.min = "0"
  input.placeholder = "Quantity"
  input.value = "0";
  quantityCell.appendChild(input)

  const subTotalCell = row.insertCell(3);
  subTotalCell.className = "subtotal"
  subTotalCell.innerHTML = "$"
  span = document.createElement("span")
  span.innerHTML = "0"
  subTotalCell.appendChild(span)

  const btnActionCell = row.insertCell(4);
  btnActionCell.className = "action"
  const btn = document.createElement("button")
  btn.className = "btn btn-remove"
  btn.innerHTML = "Remove"

  btn.addEventListener("click", removeProduct)

  btnActionCell.appendChild(btn)

  productNameInput.value = "";
  productPriceInput.value = 0;
}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  const remove_btn = document.querySelectorAll('.btn-remove');
  remove_btn.forEach(btn => btn.addEventListener('click', removeProduct));

  document.querySelector("#create").addEventListener("click", createProduct)
});
