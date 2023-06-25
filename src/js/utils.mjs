// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param)
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = true) {
  if (clear) {
    parentElement.innerHTML = "";
  }

  const htmlString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}

export async function renderWithTemplate(templateFn, parentElement, data, callback, position = "afterbegin", clear = true) {
  if (clear) {
    parentElement.innerHTML = "";
  }

  const htmlString = await templateFn(data);
  parentElement.insertAdjacentHTML(position, htmlString);
  
  if (callback) {
    callback(data);
  }
}

function loadTemplate(path) {
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  }
}

export function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");

  const headerEl = document.querySelector("#main-header");
  const footerEl = document.querySelector("#main-footer");

  headerTemplateFn().then(html => {
    //cart data
    const cartData = getLocalStorage("so-cart");
    //obtained HTML content of the template
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    //element with class "item-count"
    const itemCountElement = doc.querySelector(".item-count");
    //update the value of the element
    if (cartData) {
      itemCountElement.textContent = cartData.length;
      itemCountElement.classList.remove("hide");
    }
    else {
      itemCountElement.textContent = 0;
    }
    //render the header
    const modifiedHeaderTemplate = doc.documentElement.outerHTML;
    renderWithTemplate(() => Promise.resolve(modifiedHeaderTemplate), headerEl);
  });

  // renderWithTemplate(headerTemplateFn,headerEl);
  renderWithTemplate(footerTemplateFn, footerEl);

}

export function alertMessage(message, scroll = true, duration = 3000 ) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });

  const main = document.querySelector("main");
  main.prepend(alert);

  if (scroll) window.scrollTo(0, 0);

  // left this here to show how you could remove the alert automatically after a certain amount of time
  // setTimeout(function () {
  //   main.removeChild(alert);
  // }; duration);
}

export function RemoveAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChil(alert));
}