# JustHome 

This is a sample e-commerce application to demonstrate the end-to-end usage
of the NERP stack.

You can try our [live demo](https://just-home.herokuapp.com/) with the following information:

- Admin
Id      : admin@jh.com
Password: admin

- User
Id      : jeesoo@jh.com
Password: 1234

# Features

## Unauthenticated Users

### View products (catalog)
Refine listing by category
Search product listing
View a product's details
Product information
Photo(s)
View reviews left by authenticated users

### Manage their cart
Add an item to the cart from product listing or product detail pages
Remove an item from the cart
Edit/update quantities of items in the cart
Log in and continue editing the cart
Refresh the page without being logged in and have the cart persist (you may use sessionStorage, localStorage, Cookies or JWT for this)

### Account Management
Create an account
Login with Facebook and/or Google

### Checkout
Purchase items from cart
Specify shipping address and email address
Receive confirmation email
Receive notification emails upon order shipping, then order delivery

## Authenticated Users

### Logout

### Account management
View past order list
View order detail
Current order status
Items with quantity and subtotal
Link to the original product detail page
Date/time order was created

### Product reviews
Leave a review (with text and a 5-star rating) for a product

## Admin Users

### Product management
Create and edit products with name, description, price and one or more photos
Create categories for items, each item can have multiple categories
Manage the availability of a product. If a product is no longer available, users will not see it while browsing, but they can view the product detail page if they've ordered it previously or have a direct link. On that product detail page, it should say "Currently Unavailable"
Add/remove categories from items

### Order management
View a list of all orders
Filter orders by status (Created, Processing, Cancelled, Completed)
Change the status of the order (Created -> Processing, Processing -> Cancelled || Completed)
View details of a specific order

### User management
Promote other user accounts to have admin status
Delete a user
Trigger password reset for a user (next time they successfully log in—with their old password—they are prompted for a new one)

## Running Locally

### Prerequisites
- Node (>6.7) and npm
- PostgreSQL

### Run It

```sh
npm install
npm run seed
npm run build-watch
npm run dev
```

The above script will go through the following steps:
1. install npm dependencies
1. populate your Postgres DB with the seed data in `db/seed.js`
1. perform a build with Webpack and watch for changes
1. run the server and watch for file changes with nodemon

## Deploying to Heroku

All pushes to GitHub are being built and tested by Travis CI. However, only a select few of these builds will be deployed to Heroku.

We have two versions of the app on Heroku:  
**Prod**: [https://just-home.herokuapp.com/](https://just-home.herokuapp.com/)  
**Test**: [https://just-home-test.herokuapp.com/](https://just-home-test.herokuapp.com/)  

### Deploying to Test

Right now, only branches specified in our `.travis.yml` file will be deployed to Heroku by Travis CI. You can mark a branch for deployment to Test by editing the following section like so:

```yml
...
  app:
    master: just-home
    your_branch: just-home-test
...
```

If you do this, be sure not to change the other branches and their deployment targets.

### Deploying to Prod

All deployments to Prod will go through the following process:

1. A feature branch opens up a Pull Request on `master`
2. The branch is built and tested by Travis CI
3. If the build/tests pass, GitHub will allow collaborators to complete the merge
4. Once the PR is merged, Travis will rebuild the repo and deploy to Prod

No changes need to be made to the `.travis.yml` file to enable this process. Be sure not to directly push to `master` in an effort to avoid bad builds being deployed to Prod.

## Testing

The easiest way to test is with [Postman](https://www.getpostman.com/). You can use our development testing
collection to help you get started!

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/5163bc4d4c0126c3c191)