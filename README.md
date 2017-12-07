# Welcome to Secret Santa FACN3!

For our database project, we wanted to find an idea that was simple and fun as well as using our newly aquired SQL skills.
Secret Santa lets you record a wishlist, view your friend's wishlist and select gifts that you would like to buy for your friends. When you are done with deciding which gifts you would like to buy and for who, you can generate your shopping list on the site. No cheating in trying to view other people's shopping list!

## Contributors

* Hasan Saad
* Sophia Lim
* Mynah Marie

## Design

Our app consits of 3 different pages relating to various paths on the router on the backend. We use GET requests to navigate inside the app and POST requests to send data to the database. 

On the index.html page a user can enter his first and last name and a serie of items that he would like to receive for Christamas.

On the search.html page a user can search for his friend by entering his/her name and view all the items he/she would like to receive. Once the list is displayed, a user can eneter his name, click on the checkbox to select the items that he/she would like to buy for his friend and click on the submit button to mark those gifts as reserved (so no one buys the same gift for the same person more then once!).

On the generate.html page, a user that has reserved a series of items to buy for his/her friends can generate his shopping list.

## Database SCHEMA

Our database contains 4 tables.

Users:
```
___________________________________
| user_id | first_name | last_name |
-----------------------------------|
|  INTEGER |    TXT    |     TXT   |
|_(primary)________________________|
```
Gifts:
```
__________________
| gift_id | item |
-----------------
| INTEGER |  TXT |
|_(primary)______|
```
Relationship:
```
________________________________________
|rela_id | user_id | gift_id | reserved |
---------+---------+---------+----------
|INTEGER |FOREIGN  |FOREIGN  |  BOOL    |
|(primary|_________|_________|__________|
```
The relationship table illustrates which user asked for which item.

Reservation:
```
_____________________________
|res_id | rela_id | donor_id |
--------+---------+----------
|INTEGER| FOREIGN |FOREIGN   |
|(primary)________|__________|
```
The reservation table records every promise of a user who decided to buy gifts for his friends.

## To View Our App

* Clone this repository
* Run ```npm install``` to install the dependencies
* Run ```npm run dev``` to start nodemon on port 4444.


