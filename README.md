# Welcome to Secret Santa FACN3! :santa: :christmas_tree: :snowman:

For our database project, we wanted to find an idea that was simple and fun as well as using our newly aquired SQL skills.
Secret Santa lets you record a wishlist, view your friend's wishlist and select gifts that you would like to buy for your friends. When you are done with deciding which gifts you would like to buy and for who, you can generate your shopping list on the site. No cheating in trying to view other people's shopping list!

## Contributors

* Hasan Saad   :smiley_cat:
* Sophia Lim   :ghost:
* Mynah Marie  :bird:

## Design  :triangular_ruler: :open_file_folder:

Our app consits of 3 different pages relating to various paths on the router on the backend. We use GET requests to navigate inside the app and POST requests to send data to the database. 

On the index.html page a user can enter his first and last name and a serie of items that he would like to receive for Christamas.

On the search.html page a user can search for his friend by entering his/her name and view all the items he/she would like to receive. Once the list is displayed, a user can eneter his name, click on the checkbox to select the items that he/she would like to buy for his friend and click on the submit button to mark those gifts as reserved (so no one buys the same gift for the same person more then once!).

On the generate.html page, a user that has reserved a series of items to buy for his/her friends can generate his shopping list.

## Database SCHEMA :clipboard: :bar_chart:

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

## Testing :hospital: :construction: :white_check_mark:

To test our queries, we each created a local database and ran tests using using Tape. This allowed us to test our queries in an effective way without polluting our production database.

Here is an example of tests we wrote:

```
// Testing the createWishlist query for the index.html form.
tape("Inserting a new user with a wish list (all new items)", (t) => {
  runDbBuild((err, res) => {
    const expected = 'New wishlist created.';
    createWishlist('Daniel', 'Doodle', ['poney', 'TV'], (err, res) => {
      if (err) {
        console.log(err);
      } else {
        t.equals(res, expected, "Should return a success message.");
        t.end();
      }
    });
  });
});
```

## To View Our App  :eyeglasses: 

* Clone this repository
* Run ```npm install``` to install the dependencies
* Run ```npm run dev``` to start nodemon on port 4444.

Or you can also directly see it on heroku: https://secret-santa-facn3.herokuapp.com   :tada: :bell:



