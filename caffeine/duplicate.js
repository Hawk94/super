function verifyPurchase() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  const header = document.querySelector(".notion-header__title");
  const content = document.querySelector(".super-content");

  let paymentId = params.payment_id;

  fetch(
    `https://us-central1-flurly-api.cloudfunctions.net/verify-payment?payment_id=${paymentId}`
  )
    .then((r) => r.json())
    .then((r) => {
      if (r.payment_status === "paid") {
        header.innerHTML = "Thanks for purchasing Caffeine!";
        content.style.display = "block";
      } else {
        header.innerHTML = "Looks like you haven't purchased this content...";
      }
    })
    .catch((e) => {
      header.innerHTML = "Sorry - something went wrong...";
      console.log("Error:", e);
    });
}

document.onload = () => {
  const h1 = document.querySelector(".notion-header__title");
  if (h1) {
    h1.innerHTML = "Checking purchase history...";
  }
  const c = document.querySelector(".super-content");
  if (c) {
    c.style.display = "none";
  }
  verifyPurchase();
};
