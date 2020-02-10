# DASS Assignment 2

## Bulk Purchase App 

Web application based on MERN stack - MongoDB, Express.js, React.js, and Node.js.

## Introduction

● Frontend in ​ **React.js**
● Backend using ​ **Express.js​** which implements a ​ **REST​** API
● Database in ​ **MongoDB**

The app proposes to solve a major problem that the students of our college face. There are
times when one wants to buy an item, only to find that buying them in bulk would make it much
cheaper as opposed to buying a single unit. The app will have an option for sellers to host their
products along with the minimum bulk dispatch quantity. Various customers can select from
the listed products and order them with their own required quantity. When enough orders are
placed for the product and bulk quantity requirements are met, the vendor can dispatch the
order.

## Structure


● There will be two types of users - Vendors and Customers.
● There must be a registration and login feature for both users. During registration, there
would be the option to select between customer and vendor type. 


● Use Cases of the Vendor:
○ Should be able to create a new product specifying the following:
■ Name of Product
■ Price of the Bundle
■ Quantity in the Bundle
○ Should be able to view all the current product listing done by him/her
■ There should be an option to take down a listing making sure that
customers get their product status as canceled. 

■ Once the product is ready to dispatch (i.e. when it has been ordered by
sufficient people), it is removed from this view and becomes ready to
dispatch. 
○ Should be able to separately view all the orders that are ready to dispatch
■ Should have a button to dispatch the product which removes it from this
view. 
○ All dispatched orders should be displayed in another view with the reviews and
ratings of each order.


● Use Cases of the Customer :
○ Should be able to search for the product he/she wants (Exact string matching
would do)
■ All the vendors selling that product should be displayed along with their
price and quantity remaining
■ Should be able to sort the search results either by price or quantity of
items in bundle left or the rating of the seller
○ Should be able to select a product listed in the search results and place the order
after specifying the quantity he/she desires
○ Should be able to separately view the status of all the products he/she has
ordered and should contain:
■ Its dispatch status 
● Waiting (If not enough orders have been placed meeting the
minimum bulk quantity requirement by the seller)
● Placed (If the quantity requirements are met but is yet to get
dispatched by the seller in his/her portal)
● Dispatched (If the seller accepts the order in his/her portal)
● Canceled (If the seller cancels the order in his/her portal)
■ In the case of Waiting State, the following also needs to be
displayed/implemented
● Quantity left for the order to get placed
● Option to edit the order if not in the dispatched state
■ Should be able to rate the vendor once the order is placed. Average rating
of the vendor must be displayed in the search results.
■ Should be able to give a product review along with a rating once the
product has been dispatched. Clicking on a particular vendor in the
search results should display their reviews. 
● Basic Minimal UI for good user experience. 

For example, consider a vendor who wants to sell 100 pens as a bulk product for Rs. 150.
Different customers who want a pen can select this bundle and list the quantity that only he/she
wants - one customer might want 3 pens, another wants 5 and so on. Once the requirement of
100 pens is done, the vendor is able to see this in another view and can choose whether or not
to dispatch it. Once he dispatches it, this is removed from this view. Status on the customer
dashboard changes accordingly.


## EXTRAS:

```
● The seller having the option to upload the product images with the images getting
displayed at the customer side while searching 
● Better searching options like fuzzy matching 
● Login through any social media (Facebook, Twitter, Google, etc) handles. 
