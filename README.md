# AppEngCW - Bricks Store
### Usage
* `npm install` to install the required modules and files.
* `npm start` to run the web application.
### Features
* Users can browse through the page and add items to their cart.
* They can increase and decrease the amount (quantity) of brick they want to add to the cart and add the item to the cart.
* When users add items to their cart it will be locally stored using the `localStorage` API so they don't lose their items on refresh or if the web page closes or if they wish to come back a another time.

* On the cart page the users will be able to again change the quantity of each brick and see all the items they have added and the total price.
* Users will be able to delete their items.
* Users will be able to checkout on the page.
* The cart will reset and clear (`the data in the localStorage API`) after the user successfully checkouts.

* Everything is stored in a `sqlite3` database such as Orders of users to the Bricks that's displayed on the shop page.

* Admin page allows the owner/ staff to see the orders being placed and specific details such as the order id and the brick details.
* This will help them dispatch the order.
* They can dispatch the order where on the database it will update the specific order as dispatched and on the front-end of the admin page.

### Future improvements
* I have also included `0Auth0` to the web app and you can fully login and interact with `0Auth0` but I haven't fully integrated with the web app, so it's invisible/ disabled on the front-end.
* I am already generating ID for orders that is currently stored on the database. I can present this to the user and implement a functionality where they can search their order see the order status (already implemented in the back-end) for the admin page where owner/ staff can see specific orders if they are dispatched or not and dispatch them.
* Add images to the bricks.
* Finish off the design for the checkout and admin page.
* Add functionality to cancel dispatch/ delete order from customers.
* Add a functionality where the admin can delete the orders, create new bricks and edit bricks that already exist on the database.
* Responsive design to fit most devices and screen resolutions.