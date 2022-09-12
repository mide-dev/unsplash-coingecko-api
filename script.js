"use strict";

const authourName = document.querySelector(".author");
const coinName = document.getElementById("coin-name");
const coinLogo = document.getElementById("coin-logo");
const coinPrice = document.querySelector(".coin-price");
const time = document.querySelector(".time");

// get random image from unsplash api and display to console
(async () => {
  try {
    const res = await fetch(
      "https://api.unsplash.com/photos/random?client_id=KK-uDiM1_XwSb34vCSd-Ze058mga7JJ1mw1bdPwUPVM&orientation=landscape&query=nature"
    );

    // if cant fetch background, revert to default
    if (!res.ok) {
      document.body.style.backgroundImage = `url(./def.jpg)`;
      throw new Error("something went wrong");
    }

    const bgImage = await res.json();

    document.body.style.backgroundImage = `url(${bgImage.urls.regular})`;
    authourName.textContent = `Author: ${bgImage.user.name}`;

    return bgImage;
  } catch (err) {
    // console.error(err.message);
    return;
  }
})();

// Fetch coin data
const coinData = async () => {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin");

    if (!res.ok) throw new Error("something went wrong!");

    const coinData = await res.json();
    coinName.textContent = coinData.name;
    coinLogo.src = coinData.image.thumb;

    // Create currency formatter.
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    });

    // display coin price
    const price =
      // prettier-ignore
      `<p>price🎯: ${formatter.format(coinData.market_data.current_price.usd)}</p>
      <p>24hr ⬆️: ${formatter.format(coinData.market_data.high_24h.usd)}</p>
      <p>24hr ⬇️: ${formatter.format(coinData.market_data.low_24h.usd)}</p>`;

    // coinPrice.insertAdjacentHTML("beforeend", price);
    coinPrice.innerHTML = price;
  } catch (err) {
    console.error(err.message);
  }
};

coinData();
// update and display coin data every 2min
setInterval(coinData, 60 * 2000);

// Display TIME
setInterval(() => {
  const today = new Date();
  time.textContent = today.toLocaleTimeString();
}, 1000);

// weather API
const getLocation = () => {
  // get user coordinate
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    fetch(
      `http://api.weatherstack.com/? access_key = 30d957ff2418e8d080c6fb63520376c7
      &query = 40.7831,-73.9712&units = m`
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
    // console.log(lat);
  });
};
getLocation();
