// Create and display trips //

const addFileBtn = document.querySelector(".uploader__input");

const getContent = function (readerEvent) {
  const rawContent = readerEvent.target.result.split(/[\r\n]+/gm);
  const tripPanel = document.querySelector(".panel__excursions");
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
                value="dodaj do zamówinia"
                type="submit"
              />
            </div>
          </form>
        </li>
    `;
};

addFileBtn.addEventListener("change", readFile);
