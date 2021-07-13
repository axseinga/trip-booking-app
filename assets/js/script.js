// Create and display trips //

const addFileBtn = document.querySelector(".uploader__input");
const tripPanel = document.querySelector(".panel__excursions");

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
                class="excursions__field-input excursions__field-input--submit"
                value="dodaj do zamówienia"
                type="submit"
              />
            </div>
          </form>
        </li>
    `;
};

// Listen for submit and get trip data //

const basket = [];

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

// Display basket: trip //

const displayTripData = function (trip) {
  return `
  <li class="summary__item">
            <h3 class="summary__title">
              <span class="summary__name">${trip.title}</span>
              <strong class="summary__total-price">${trip.total}PLN</strong>
              <a href="" class="summary__btn-remove" title="usuń">X</a>
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
  span.innerText = trip.total;
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
