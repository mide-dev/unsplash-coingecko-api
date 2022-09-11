"use strict";

const authourName = document.querySelector(".author");
const coinName = document.getElementById("coin-name");
const coinLogo = document.getElementById("coin-logo");
const coinPrice = document.querySelector(".coin-price");

// get random image from unsplash api
const getBG = async () => {
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
    console.error(err.message);
  }
};

const coinApi = async () => {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin");

    if (!res.ok) throw new Error("something went wrong!");

    const coinData = await res.json();
    console.log(coinData);
    coinName.textContent = coinData.name;
    coinLogo.src = coinData.image.thumb;

    console.log(coinData.market_data.current_price.usd);

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

    coinPrice.insertAdjacentHTML("beforeend", price);
  } catch (err) {
    console.error(err.message);
  }
};

getBG();
coinApi();
