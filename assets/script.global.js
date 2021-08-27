const sliderElements = document.querySelectorAll(".js-drag-slider");
sliderElements.forEach((sliderElement) => new DragSlider(sliderElement));

const addToCartButtons = document.querySelectorAll(".js-add-to-cart");
addToCartButtons.forEach((button) => {
  // runs at page load and selects first available variant
  selectDefaultVariant(button);

  // adds product to user's cart when button is clicked
  button.addEventListener("click", (event) => {
    event.preventDefault();
    onAddToCartButtonClicked(event.target.closest("button"));
  });
});

$(".js-product-gallery-slider").slick({
  dots: true,
  infinite: true,
  slidesToShow: 1,
  vertical: true,
  arrows: false,
});

window.addEventListener(AF_EVENT.CART_VISIBILITY_CHANGE, ({ detail }) => {
  const { isVisible } = detail;
  document.querySelector("body").dataset.isCartVisible = isVisible;
});

const forms = document.querySelectorAll("form");
forms.forEach((form) => watchFormState(form));
