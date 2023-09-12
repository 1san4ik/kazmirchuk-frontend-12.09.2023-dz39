import {
  listCategory,
  allCategory,
  listCityDelivery,
  selectPayment,
} from './product.js'

const navLinks = document.querySelectorAll('.nav-link')
const colCenter = document.querySelector('.colCenter')
const colRight = document.querySelector('.colRight')
const buttonOrders = document.querySelector('.buttonOrders')
buttonOrders.addEventListener('click', displayOrders)
const orders = {}

navLinks.forEach((link, index) => {
  link.textContent = listCategory[index]

  allCategory[index].forEach((link) => {
    shortProduct(link)
  })

  link.addEventListener('click', (event) => {
    event.preventDefault()

    buttonOrders.classList.remove('active')

    navLinks.forEach((link) => {
      link.classList.remove('active')
    })
    link.classList.add('active')

    while (colCenter.firstChild) {
      colCenter.removeChild(colCenter.firstChild)
    }
    allCategory[index].forEach((link) => {
      shortProduct(link)
    })
    addBorderClickListeners()
  })
})

addBorderClickListeners()

function shortProduct(link) {
  const borderDiv = document.createElement('div')
  borderDiv.classList.add('border')
  borderDiv.setAttribute('data-imgsrc', link.img)
  borderDiv.setAttribute('data-name', link.name)
  borderDiv.setAttribute('data-description', link.description)
  borderDiv.setAttribute('data-price', link.price)
  colCenter.appendChild(borderDiv)

  const wrapDiv = document.createElement('div')
  wrapDiv.classList.add('wrap')
  borderDiv.appendChild(wrapDiv)

  const productWrapDiv = document.createElement('div')
  productWrapDiv.classList.add('product-wrap')
  wrapDiv.appendChild(productWrapDiv)

  const aImg = document.createElement('a')
  aImg.href = link.img
  const imgElement = document.createElement('img')

  imgElement.src = link.img
  aImg.appendChild(imgElement)
  productWrapDiv.appendChild(aImg)

  const productInfoDiv = document.createElement('div')
  productInfoDiv.classList.add('product-info')
  borderDiv.appendChild(productInfoDiv)

  const productTitleH3 = document.createElement('h3')
  productTitleH3.classList.add('product-title')
  productTitleH3.innerText = link.name
  productInfoDiv.appendChild(productTitleH3)

  const priceDiv = document.createElement('div')
  priceDiv.classList.add('price')
  productInfoDiv.appendChild(priceDiv)
  priceDiv.innerHTML = `Ціна: ${link.price} &#8372;`
}

function addBorderClickListeners() {
  const borderProduct = document.querySelectorAll('.border')
  borderProduct.forEach((link) => {
    link.addEventListener('click', () => {
      colRight.style.display = 'block'
      const imgSrc = link.getAttribute('data-imgsrc')
      const productName = link.getAttribute('data-name')
      const productDescription = link.getAttribute('data-description')
      const productPrice = link.getAttribute('data-price')

      detailedProduct(imgSrc, productName, productDescription, productPrice)
    })
  })
}

function detailedProduct(
  imgSrc,
  productName,
  productDescription,
  productPrice
) {
  colRight.innerText = ''

  const productContent = document.createElement('div')
  productContent.classList.add('productContent')
  colRight.appendChild(productContent)

  const imgGallery = document.createElement('div')
  imgGallery.classList.add('imgGallery')
  productContent.appendChild(imgGallery)

  const imgProduct = document.createElement('img')
  imgGallery.appendChild(imgProduct)
  imgProduct.src = imgSrc
  localStorage.setItem('imgSrc', imgSrc)

  const productInfo = document.createElement('div')
  productInfo.classList.add('productInfo')
  productContent.appendChild(productInfo)

  const nameProduct = document.createElement('div')
  nameProduct.classList.add('nameProduct')
  nameProduct.innerText = productName
  productInfo.appendChild(nameProduct)
  localStorage.setItem('nameProduct', productName)

  const descriptionProduct = document.createElement('div')
  descriptionProduct.classList.add('descriptionProduct')
  descriptionProduct.innerText = productDescription
  productInfo.appendChild(descriptionProduct)

  const price = document.createElement('div')
  price.classList.add('product-price')
  productInfo.appendChild(price)
  price.innerHTML = `Ціна: ${productPrice} &#8372;`
  localStorage.setItem('priceProduct', productPrice)

  const buttonBuy = document.createElement('button')
  buttonBuy.classList.add('buy-button')
  buttonBuy.type = 'button'
  buttonBuy.innerText = 'Купити'
  productInfo.appendChild(buttonBuy)

  buttonBuy.addEventListener('click', () => {
    createFormBuy()
    colRight.style.display = 'none'
  })
  colRight.appendChild(productContent)
  addBorderClickListeners()
}

function createFormBuy() {
  const backgroundModal = document.createElement('div')
  backgroundModal.classList.add('backgroundModal')
  colCenter.appendChild(backgroundModal)

  const modalWindow = document.createElement('div')
  modalWindow.classList.add('modal')
  colCenter.appendChild(modalWindow)

  const modalDiv = document.createElement('div')
  modalDiv.classList.add('modalDiv')
  modalDiv.innerText = 'Для оформлення замовлення, заповніть наступні поля:'
  modalWindow.appendChild(modalDiv)
  // ==============================================================
  const labelinputFio = document.createElement('label')
  labelinputFio.innerText = '* Введіть ПІБ: '
  modalWindow.appendChild(labelinputFio)

  const inputFio = document.createElement('input')
  inputFio.classList.add('inputFio')
  inputFio.type = 'text'
  inputFio.placeholder = 'Прізвище, ім’я, по батькові'
  inputFio.minLength = '4'
  inputFio.maxLength = '50'
  if (localStorage.getItem('fio') !== null) {
    inputFio.value = localStorage.getItem('fio')
  }
  labelinputFio.appendChild(inputFio)
  // ==============================================================
  const labelTelephone = document.createElement('label')
  labelTelephone.innerText = '* Введіть телефон: '
  modalWindow.appendChild(labelTelephone)

  const inputTelephone = document.createElement('input')
  inputTelephone.classList.add('inputTelephone')
  inputTelephone.type = 'tel'
  inputTelephone.minLength = '10'
  inputTelephone.maxLength = '18'
  inputTelephone.placeholder = 'Введіть телефон'
  if (localStorage.getItem('tel') !== null) {
    inputTelephone.value = localStorage.getItem('tel')
  }
  labelTelephone.appendChild(inputTelephone)
  // ==============================================================
  const labelinputCity = document.createElement('label')
  labelinputCity.innerText = '* Виберіть місто: '
  const selectCity = document.createElement('select')
  selectCity.classList.add('selectCityId')

  listCityDelivery.forEach((elem) => {
    const option = document.createElement('option')
    option.innerText = elem
    option.value = elem
    selectCity.appendChild(option)
  })
  if (localStorage.getItem('city') !== null) {
    selectCity.value = localStorage.getItem('city')
  }

  labelinputCity.appendChild(selectCity)
  modalWindow.appendChild(labelinputCity)
  // ==============================================================
  const labelSklad = document.createElement('label')
  labelSklad.innerText = '* Склад Нової пошти для надсилання: '
  modalWindow.appendChild(labelSklad)

  const inputSklad = document.createElement('input')
  inputSklad.classList.add('inputSklad')
  inputSklad.type = 'number'
  inputSklad.placeholder = 'Введіть номер складу'
  inputSklad.min = 1
  if (localStorage.getItem('sklad') !== null) {
    inputSklad.value = localStorage.getItem('sklad')
  }
  labelSklad.appendChild(inputSklad)
  // ==============================================================
  const labelOplata = document.createElement('label')
  labelOplata.innerText = 'Виберіть спосіб оплати: '
  const selectOplata = document.createElement('select')
  selectOplata.classList.add('selectOplata')

  selectPayment.forEach((elemPay) => {
    const optionPay = document.createElement('option')
    optionPay.innerText = elemPay
    optionPay.value = elemPay
    selectOplata.appendChild(optionPay)
  })
  if (localStorage.getItem('oplata') !== null) {
    selectOplata.value = localStorage.getItem('oplata')
  }

  labelOplata.appendChild(selectOplata)
  modalWindow.appendChild(labelOplata)
  // ==============================================================
  const labelQuantity = document.createElement('label')
  labelQuantity.innerText = 'Змініть кількість, якщо треба: '
  modalWindow.appendChild(labelQuantity)

  const inputQuantity = document.createElement('input')
  inputQuantity.classList.add('inputQuantity')
  inputQuantity.type = 'number'
  inputQuantity.placeholder = '1'
  inputQuantity.value = 1
  inputQuantity.min = 1
  inputQuantity.step = 1
  if (localStorage.getItem('quantity') !== null) {
    inputQuantity.value = localStorage.getItem('quantity')
  }
  labelQuantity.appendChild(inputQuantity)
  // ==============================================================
  const labelComent = document.createElement('label')
  labelComent.innerText = 'Коментар до замовлення: '
  modalWindow.appendChild(labelComent)

  const inputComent = document.createElement('input')
  inputComent.classList.add('inputComent')
  inputComent.type = 'text'
  inputComent.placeholder = 'Ваш коментар...'
  inputComent.minLength = '4'
  inputComent.maxLength = '50'
  if (localStorage.getItem('comment') !== null) {
    inputComent.value = localStorage.getItem('comment')
  }
  labelComent.appendChild(inputComent)
  // ==============================================================
  const buttonListBuy = document.createElement('button')
  buttonListBuy.classList.add('buttonListBuy')
  buttonListBuy.type = 'button'
  buttonListBuy.innerText = 'Замовити'
  buttonListBuy.addEventListener('click', orderButtonClick)
  modalWindow.appendChild(buttonListBuy)
}

function orderButtonClick() {
  const modal = document.querySelector('.modal')
  modal.addEventListener('input', function (event) {})

  const inputFio = document.querySelector('.inputFio')
  localStorage.setItem('fio', inputFio.value.trim())

  const inputTelephone = document.querySelector('.inputTelephone')
  localStorage.setItem('tel', inputTelephone.value.trim())

  const fioPattern = /^[A-Za-zа-яА-ЯёЁіІїЇєЄ\s']+$/
  const telephonePattern = /^[\d\s-()+]+$/

  const selectCity = document.querySelector('.selectCityId')
  localStorage.setItem('city', selectCity.value)

  const inputSklad = document.querySelector('.inputSklad')
  localStorage.setItem('sklad', inputSklad.value)

  const selectOplata = document.querySelector('.selectOplata')
  localStorage.setItem('oplata', selectOplata.value)

  const inputQuantity = document.querySelector('.inputQuantity')
  localStorage.setItem('quantity', inputQuantity.value)

  const inputComent = document.querySelector('.inputComent')
  localStorage.setItem('comment', inputComent.value)

  if (inputFio.value === '') {
    alert('Введіть ПІБ.')
    return
  } else if (inputFio.value.length < inputFio.minLength) {
    alert('Поле ПІБ має бути більшої довжини')
    inputFio.value = ''
    return
  } else if (!fioPattern.test(inputFio.value)) {
    alert('Поле ПІБ може містити тільки літери та пробіли.')
    inputFio.value = ''
    return
  }

  if (inputTelephone.value === '') {
    alert('Введіть телефон.')
    return
  } else if (!telephonePattern.test(inputTelephone.value)) {
    alert('Неправильний формат телефону.')
    return
  } else if (inputTelephone.value.length < inputTelephone.minLength) {
    alert('Номер телефону має замало цифр.')
    inputTelephone.value = ''
    return
  }
  if (selectCity.value == '') {
    alert('Виберіть місто з випадаючого списку')
    return
  }
  if (inputSklad.value === '') {
    alert('Введіть номер склада, для доставки')
    return
  }
  modal.remove()
  payList()
}

function payList() {
  const buyerName = localStorage.getItem('fio')
  const buyerTelephone = localStorage.getItem('tel')
  const buyerCity = localStorage.getItem('city')
  const buyerSklad = localStorage.getItem('sklad')
  const buyerProductName = localStorage.getItem('nameProduct')
  const buyerImgProduct = localStorage.getItem('imgSrc')
  const productQuantity = localStorage.getItem('quantity')
  const productOplata = localStorage.getItem('oplata')
  const priceProduct = localStorage.getItem('priceProduct')

  const payListContent = document.createElement('div')
  payListContent.classList.add('payListContent')
  colCenter.appendChild(payListContent)

  const payListTitle = document.createElement('div')
  payListTitle.classList.add('payListTitle')
  payListTitle.innerHTML = `Ви замовили: <h2>${buyerProductName}</h2><br>
<div><img src="${buyerImgProduct}"></div><br>
<div>Вартість: ${productQuantity}шт. * ${priceProduct} &#8372;  =  <b>${
    productQuantity * priceProduct
  }</b>&#8372;</div>`
  payListContent.appendChild(payListTitle)

  const orderInfo = document.createElement('p')
  orderInfo.innerHTML = `Покупець: <b>${buyerName}</b><br>Телефон: <b>${buyerTelephone}</b><br>Місто: <b>${buyerCity}</b><br>Склад №: <b>${buyerSklad}</b><br>Оплата: <b>${productOplata}</b>`
  payListContent.appendChild(orderInfo)

  const buttonClose = document.createElement('button')
  buttonClose.classList.add('buttonListBuy')
  buttonClose.innerText = 'Закрити'
  payListContent.appendChild(buttonClose)
  buttonClose.addEventListener('click', function () {
    payListContent.remove()
    const backgroundModal = document.querySelector('.backgroundModal')
    backgroundModal.remove()
    localStorage.removeItem('oplata')
    localStorage.removeItem('quantity')
    localStorage.removeItem('comment')

    function Order(
      buyerProductName,
      buyerImgProduct,
      productQuantity,
      productOplata,
      priceProduct
    ) {
      this.buyerProductName = buyerProductName
      this.buyerImgProduct = buyerImgProduct
      this.productQuantity = productQuantity
      this.productOplata = productOplata
      this.priceProduct = priceProduct
    }

    function createNumberOrder(orders) {
      return Object.keys(orders).length + 1
    }

    function addOrder(order) {
      let orders = JSON.parse(localStorage.getItem('Orders')) || {}
      const numberOrder = createNumberOrder(orders)
      orders[numberOrder] = order
      localStorage.setItem('Orders', JSON.stringify(orders))
    }

    const storedOrders = JSON.parse(localStorage.getItem('Orders'))
    if (storedOrders) {
      Object.assign(orders, storedOrders)
    }

    const order1 = new Order(
      buyerProductName,
      buyerImgProduct,
      productQuantity,
      productOplata,
      priceProduct
    )
    order1.orderDate = new Date().toLocaleString()
    addOrder(order1)
  })
}

function displayOrders() {
  colCenter.innerHTML = ''
  navLinks.forEach((link) => {
    link.classList.remove('active')
  })
  buttonOrders.classList.add('active')

  const storedOrders = JSON.parse(localStorage.getItem('Orders'))

  if (!storedOrders) {
    const noOrdersMessage = document.createElement('p')
    noOrdersMessage.innerText = 'Замовлень немає.'
    colCenter.appendChild(noOrdersMessage)
    return
  }

  const orderNumbers = Object.keys(storedOrders)

  if (orderNumbers.length === 0) {
    const noOrdersMessage = document.createElement('p')
    noOrdersMessage.innerText = 'Замовлень немає.'
    colCenter.appendChild(noOrdersMessage)
    return
  }

  for (const orderNumber of orderNumbers) {
    const order = storedOrders[orderNumber]
    const orderDiv = document.createElement('div')
    orderDiv.classList.add('orderDiv')
    orderDiv.innerHTML = `
      <h3>Замовлення №${orderNumber}</h3>
      <h4>${order.buyerProductName}</h4>
      <img src="${order.buyerImgProduct}">
      <p>Кількість: ${order.productQuantity}</p>
      <p>Загальна ціна: ${
        order.priceProduct * order.productQuantity
      } &#8372;</p>
      <p>Оплата: ${order.productOplata}</p>
      <p>Дата та час замовлення: ${order.orderDate}</p>
      <button class="delete-button" data-order-number="${orderNumber}">Видалити</button>
    `
    colCenter.appendChild(orderDiv)

    const deleteButton = orderDiv.querySelector('.delete-button')
    deleteButton.addEventListener('click', (event) => {
      const orderNumberToDelete = event.target.getAttribute('data-order-number')

      const storedOrders = JSON.parse(localStorage.getItem('Orders'))
      delete storedOrders[orderNumberToDelete]

      localStorage.setItem('Orders', JSON.stringify(storedOrders))
      displayOrders()
    })
  }
}
