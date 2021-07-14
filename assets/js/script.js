// Create and display trips //

const addFileBtn = document.querySelector(".uploader__input");
const tripPanel = document.querySelector(".panel__excursions");
const panelSummary = document.querySelector(".panel__summary");
const order = document.querySelector(".order");
let totalPrice = 0;
const basket = [];

// Upload file, convert data and display trips //

const getContent = function (readerEvent) {
  const rawContent = readerEvent.target.result.split(/[\r\n]+/gm);
  const content = rawContent.map((col) =>
    col.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g)
  );
  content.forEach(function (arr) {
    const [id, title, description, adultPrice, childPrice] = arr;
    const trip = markup(title, description, adultPrice, childPrice);
    tripPanel.insertAdjacentHTML("afterbegin", trip);
  });
};

const readFile = function (e) {
  const file = e.target.files[0];
  if (file && file.type.includes("text")) {
    const reader = new FileReader();
    reader.onload = function (readerEvent) {
      getContent(readerEvent);
    };

    reader.readAsText(file, "UTF-8");
  } else {
    alert("wybierz plik tekstowy");
  }
};

// Create trip element //

const markup = function (title, description, adultPrice, childPrice) {
  return `
    <li class="excursions__item">
          <header class="excursions__header">
            <h2 class="excursions__title">${title}</h2>
            <p class="excursions__description">
              ${description}
            </p>
          </header>
          <form class="excursions__form">
            <div class="excursions__field">
              <label class="excursions__field-name">
                Dorosły: <span class="excursions__price">${adultPrice}</span>PLN x
                <input class="excursions__field-input" name="adults" />
              </label>
            </div>
            <div class="excursions__field">
              <label class="excursions__field-name">
                Dziecko: <span class="excursions__price">${childPrice}</span>PLN x
                <input class="excursions__field-input" name="children" />
              </label>
            </div>
            <div class="excursions__field excursions__field--submit">
              <input
                class="btn excursions__field-input excursions__field-input--submit"
                value="dodaj do zamówienia"
                type="submit"
              />
            </div>
          </form>
        </li>
    `;
};

// Get trip data //

const getTitle = function (currentSubmit) {
  return (title =
    currentSubmit.parentElement.firstElementChild.firstElementChild.innerText);
};

const getAdultData = function (currentSubmit) {
  const adultField = currentSubmit.firstElementChild.firstElementChild;
  const adultPrice = adultField.firstElementChild.innerText.slice(1, -1);
  const adultQt = adultField.lastElementChild.value;
  return [adultPrice, adultQt];
};

const getChildData = function (currentSubmit) {
  const childField =
    currentSubmit.firstElementChild.nextElementSibling.firstElementChild;
  const childPrice = childField.firstElementChild.innerText.slice(1, -1);
  const childQt = childField.lastElementChild.value;
  return [childPrice, childQt];
};

// Clear inputs in trip elements //

const clearInput = function (input) {
  input.value = "";
};

const clearInputs = function (currentSubmit) {
  const adultField =
    currentSubmit.firstElementChild.firstElementChild.lastElementChild;
  clearInput(adultField);
  const childField =
    currentSubmit.firstElementChild.nextElementSibling.firstElementChild
      .lastElementChild;
  clearInput(childField);
};

// Display basket & basket functionality //

const displayTripData = function (trip) {
  return `
  <li class="summary__item">
            <h3 class="summary__title">
              <span class="summary__name">${trip.title}</span>
              <strong class="summary__total-price">${trip.total}PLN</strong>
              <a href="#" class="summary__btn-remove" title="usuń">X</a>
            </h3>
            <p class="summary__prices">dorośli: ${trip.adultNumber} x ${trip.adultPrice}PLN, dzieci: ${trip.childNumber} x ${trip.childPrice}PLN</p>
          </li>
  `;
};

const createTrip = function (title, adult, child) {
  return (trip = {
    title: title.slice(1, -1),
    adultNumber: +adult[1],
    adultPrice: +adult[0],
    childNumber: +child[1],
    childPrice: +child[0],
    total: +adult[1] * +adult[0] + +child[1] * +child[0],
  });
};

const displayTotalPrice = function (trip) {
  const span = document.querySelector(".order__total-price-value");
  let newTotalPrice = totalPrice + trip.total;
  span.innerText = `${newTotalPrice} PLN`;
  totalPrice = newTotalPrice;
};

const deleteItemfromBasket = function (e) {
  const title = e.target.parentElement.firstElementChild.innerText;
  const price = Number(
    e.target.parentElement.firstElementChild.nextElementSibling.innerText.slice(
      0,
      -3
    )
  );
  const index = basket.findIndex(function (item, i) {
    if (item.title === title && item.total === price) {
      return i;
    }
  });
  basket.splice(index, 1);
};

const deleteItemfromDisplay = function (item) {
  const h3 = item.parentElement;
  const li = h3.parentElement;
  const ul = li.parentElement;
  ul.removeChild(li);
};

const udpateTotal = function (e) {
  const parent =
    e.target.parentElement.parentElement.parentElement.parentElement
      .firstElementChild.nextElementSibling.firstElementChild.firstElementChild;
  const price = Number(
    e.target.parentElement.firstElementChild.nextElementSibling.innerText.slice(
      0,
      -3
    )
  );
  totalPrice = totalPrice - price;
  parent.innerText = totalPrice;
};

// Sent form & validate data //

const validateString = function (input, arr) {
  const regex = /^[a-zA-Z]+ [a-zA-Z]+$/;
  const value = input.value;
  const label = input.parentElement;
  if (!value) {
    input.placeholder = "Wpisz imie";
    label.style.color = "red";
    arr.push("error");
  } else if (!value.match(regex)) {
    label.style.color = "red";
    arr.push("error");
  } else {
    label.style.color = "black";
  }
};

const validateEmail = function (input, arr) {
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const value = input.value;
  const label = input.parentElement;
  if (!value) {
    input.placeholder = "Wpisz email";
    label.style.color = "red";
    arr.push("error");
  } else if (!value.match(regex)) {
    label.style.color = "red";
    arr.push("error");
  } else {
    label.style.color = "black";
  }
};

const createOrderedMsg = function (e, email) {
  const finalPrice = e.target.firstElementChild.firstElementChild.innerText;
  const emailAddres = email.value;
  alert(
    `Dziękujęmy za złożenie zamówienia o wartości ${finalPrice}. Wszelkie szczegóły zamówienia zostały wysłane na adres email: ${emailAddres}.`
  );
};

const orderTrips = function (e) {
  const errors = [];
  const name = e.target.elements.name;
  validateString(name, errors);
  const email = e.target.elements.email;
  validateEmail(email, errors);
  if (errors.length > 0) {
    e.preventDefault();
    console.log("Bledy w formularzu");
  } else {
    createOrderedMsg(e, email);
  }
};

// Event listeners //

addFileBtn.addEventListener("change", readFile);

tripPanel.addEventListener("submit", function (e) {
  e.preventDefault();
  const currentSubmit = e.target;
  const title = getTitle(currentSubmit);
  const adult = getAdultData(currentSubmit);
  const child = getChildData(currentSubmit);
  const trip = createTrip(title, adult, child);
  basket.push(trip);
  clearInputs(currentSubmit);
  const panel = document.querySelector(".panel__summary");
  const markup = displayTripData(trip);
  panel.insertAdjacentHTML("afterbegin", markup);
  displayTotalPrice(trip);
});

panelSummary.addEventListener("click", function (e) {
  const btn = e.target;
  if (btn.tagName === "A") {
    udpateTotal(e);
    deleteItemfromBasket(e);
    deleteItemfromDisplay(btn);
  }
});

order.addEventListener("submit", orderTrips);
