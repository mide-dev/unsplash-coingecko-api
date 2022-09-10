"use strict";

const getBG = async () => {
  const res = await fetch(
    "https://api.unsplash.com/photos/random?client_id=KK-uDiM1_XwSb34vCSd-Ze058mga7JJ1mw1bdPwUPVM&orientation=landscape&query=nature"
  );

  const bgImage = await res.json();

  return bgImage.urls.regular;
};

(async function () {
  const res = await getBG();
  document.body.style.backgroundImage = `url(${res})`;
})();
