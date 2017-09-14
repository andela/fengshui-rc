import introJs from "intro.js";

const tour = introJs.introJs();
const tourSteps = [
  {
    intro: `<h2 class="tourtitle">Welcome to <strong>Reaction Commerce</strong></h2>
    <hr>
    <div class="tourcontainer">
      <strong>Reaction Commerce</strong> is an ecommerce platform for small and medium scale enterprises
      where real-time transactions take place.<br>
      This tour would get you started by taking you through the important parts of the application.
    </div>`
  },
  {
    element: ".product-grid",
    intro: `<h2 class="tourtitle">Products</h2>
    <hr>
    <div>
      Products in the store would be displayed here. Just browse through.<br>
      When you find the product of your choice, click on the product and proceed to adding it to your cart.
    </div>`
  },
  {
    element: ".search",
    intro: `<h2 class="tourtitle">Search</h2>
    <hr>
    <div class="tourcontainer">
      With a lot number of products in the store , we help you get your products of choice quickly through
      this real-time search system. Click here to search for products.
    </div>`
  },
  {
    element: ".cart",
    intro: `<h2 class="tourtitle">Cart</h2>
    <hr>
    <div class="tourcontainer">
      Having found the products of your choice, you can add the products to your cart here.<br>
      Click on the cart icon to make payment.<br>
      Note that we presently offer only the following two means of payment:
      <ol>
        <li>
          <strong>Wallet</strong>
        </li>
        <li>
          <strong>Paystack</strong>
        </li>
      </ol>
    </div>`
  },
  {
    element: ".languages",
    intro: `<h2 class="tourtitle">Languages</h2>
    <hr>
    <div class="tourcontainer">
      As we always expect users from all over the world.<br> We believe that language should never be a barrier.<br>
      Click on language icon and select you preferred language from the dropdown.
    </div>`
  },
  {
    element: ".accounts",
    intro: `<h2 class="tourtitle">Account Options</h2>
    <hr>
    <div class="tourcontainer">
      To buy a product, you would need to register and that's very straight forward. <br>
      Click on this Icon to reveal a dropdown where you can enter needed details to register
    </div>`
  },
  {
    element: ".tour",
    intro: `<h2 class="tourtitle">Tour</h2>
    <hr>
    <div class="tourcontainer">
      That's all i have for you. Ever need to take a tour again, i am always here.
    </div>`
  }
];

export function playTour() {
  tour.setOptions({
    showBullets: true,
    scrollToElement: true,
    showStepNumbers: false,
    tooltipPosition: "auto",
    steps: tourSteps
  });
  tour.start();
}

