async function getRecommendedProducts(productID) {
  let products = await AgainFasterAPI.getRecommendedProducts(productID);
  products = products.splice(0, 4);
  return products;
}

function filloutProductTemplate(productData, template) {
  const inSale = productData.price_min < productData.compare_at_price_min;
  const isBestseller = productData.tags.includes("Bestseller");
  const hasFreeShipping = false;
  const canBePreOrdered = false;
  let price = formatter.format(productData.price / 100);
  let oldPrice = formatter.format(productData.compare_at_price / 100);
  if (productData.price_min !== productData.price_max) {
    price = `${formatter.format(
      productData.price_min / 100
    )} — ${formatter.format(productData.price_max / 100)}`;
  }

  const productButtonEl = template.querySelector(".c-product-item__button");
  const priceEl = template.querySelector(".c-product-item__price");
  const priceOldEl = template.querySelector(".c-product-item__price--old");
  const titleEl = template.querySelector(".c-product-item__title-text");
  const soldOutEl = template.querySelector(".c-product-item__sold-out-text");
  const inSaleEl = template.querySelector(".c-product-item__in-sale-text");
  const freeShippingEl = template.querySelector(
    ".c-product-item__free-shipping-text"
  );
  const bestsellerEl = template.querySelector(
    ".c-product-item__bestseller-text"
  );
  const canBePreOrderedEl = template.querySelector(
    ".c-product-item__can-be-pre-ordered-text"
  );
  const productImageEl = template.querySelector(".c-product-item__image");
  const productTemplateImageEl = template.querySelector(
    ".c-product-item__placeholder-image-box"
  );

  productButtonEl.href = productData.url;
  productButtonEl.dataset.isAvailable = productData.available;
  productButtonEl.dataset.inSale = inSale;
  titleEl.innerText = productData.title;
  price.innerText = productData.title;

  if (!productData.available) {
    soldOutEl.dataset.isHidden = false;
  }
  if (inSale) {
    inSaleEl.dataset.isHidden = false;
  }
  if (hasFreeShipping) {
    freeShippingEl.dataset.isHidden = false;
  }
  if (isBestseller) {
    bestsellerEl.dataset.isHidden = false;
  }
  if (canBePreOrdered) {
    canBePreOrderedEl.dataset.isHidden = false;
  }

  if (productData.featured_image) {
    productImageEl.src = productData.featured_image;
    productImageEl.dataset.isHidden = false;
    productTemplateImageEl.dataset.isHidden = true;
  } else {
    productImageEl.dataset.isHidden = true;
    productTemplateImageEl.dataset.isHidden = false;
  }

  priceEl.innerText = price;
  if (inSale) {
    priceOldEl.querySelector("s").innerText = oldPrice;
    priceOldEl.dataset.isHidden = false;
  } else {
    priceOldEl.dataset.isHidden = true;
  }

  return template;
}

function renderRecommendedProducts(productsData, listEl, productItemTemplate) {
  productsData.forEach((product) => {
    const rawProductTemplate = productItemTemplate.content.cloneNode(true);
    const productTemplate = filloutProductTemplate(product, rawProductTemplate);
    listEl.append(productTemplate);
  });
}

async function initRecommendedProducts(productID) {
  try {
    const products = await getRecommendedProducts(productID);
    const recommendedProductsEl = document.querySelector(
      ".c-products--recommended"
    );
    const recommendedProductslistEl = document.querySelector(
      ".c-products__list--recommended"
    );
    const recommendedProductItemTemplate = document.querySelector(
      ".c-products__item-template"
    );
    renderRecommendedProducts(
      products,
      recommendedProductslistEl,
      recommendedProductItemTemplate
    );
    recommendedProductsEl.dataset.isHidden = false;
  } catch (ex) {
    console.error(ex);
  }
}

initRecommendedProducts(currentProductID);
