document.getElementById('submitButton').addEventListener('click', function() {
  var fullName = document.getElementById('submitInput').value.toLowerCase();
  if (fullName === "" || fullName.split(' ').length < 2) {
    var message = document.createElement('p');
    message.textContent = "Please enter a full name."
    document.getElementById('resDiv').appendChild(message);
  } else {
    postSearch("/search", fullName, renderingSearchResult);
  }
});

function renderingSearchResult(err, arr) {
  if (err) {
    console.log('sorry having a problem finding what you searched for');
  } else {
    // Start by rendering the whislist on the page.
    var idx = 1;
    document.getElementById('resDiv').innerHTML = '';
    var wishes = [];
    var results=document.createElement('div');
    results.setAttribute('id', 'results');
    arr.forEach(function(gift) {
      if (gift.gifts !== "" && wishes.indexOf(gift.gifts) === -1 && gift.reserved == false) {
        wishes.push(gift.gifts);
        var label = document.createElement('label');
        var checkbox = document.createElement('input');
        var description = document.createTextNode(gift.gifts);
        checkbox.type = 'checkbox';
        checkbox.name = gift.rela_id;
        checkbox.setAttribute('id', 'gift' + idx.toString());
        checkbox.value = gift.gifts;
        checkbox.classList.add('checkbox--gifts');
        label.appendChild(checkbox);
        label.appendChild(description);
        results.appendChild(label);
        idx++;
      }
    });
    document.getElementById('resDiv').appendChild(results);

    // If the wishlist is empty, return appropriate message to user.
    var count = document.getElementsByTagName('label').length;
    if (count === 0) {
      var message = document.createElement('p');
      message.textContent = "This user doesn't seem to have a wishlist...";
      document.getElementById('resDiv').appendChild(message);

      // Otherwise, create the wishlist with an input form (for the name of the donor)
      // and a submit button.
    } else {

      var donor = document.createElement('input');
      donor.type = 'text';
      donor.setAttribute('id', 'donor');
      donor.placeholder = 'Write your Full Name';
      donor.classList.add('input--donor');
      donor.setAttribute('required', 'required');
      donor.setAttribute('maxlength', '40');
      document.getElementById('results').appendChild(donor);


      var submit = document.createElement('button');
      submit.textContent = "Submit";
      submit.setAttribute('id', 'reserve');
      submit.classList.add('button--reserve')
      document.getElementById('results').appendChild(submit);

      // If submit button is clicked, submit the appropriate data to the database
      // to make the reservation.
      document.getElementById('reserve').addEventListener('click', function() {
        var inputs = document.getElementsByTagName('input');
        var idx = 1;
        var resList = [];
        for (var i = 0; i < inputs.length; i++) {
          if (inputs[i].type === 'checkbox') {
            if (inputs[i].checked === true) {
              resList.push(parseInt(inputs[i].name, 10));
            }
          }

        }
        var fullName = document.getElementById('donor').value;
        var first_name = fullName.split(' ')[0].toLowerCase();
        var last_name = fullName.split(' ')[1].toLowerCase();
        var data = [first_name, last_name, resList];

          var fullName = document.getElementById('donor').value;
          var first_name = fullName.split(' ')[0].toLowerCase();
          var last_name = fullName.split(' ')[1].toLowerCase();
          var data = [first_name, last_name, resList];


        postSearch('/reserve', data, function(err, res) {
          if (err) {
            console.log(err);
          } else {
            // On success, aler the user that the reservation has been submitted.
            alert(res);
          }
        })
      });
    }
  }
}

function postSearch(url, data, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(null, JSON.parse(xhr.responseText));
    } else if (xhr.readyState === 4 && xhr.status !== 200) {
      callback(xhr.status);
      console.log(xhr.readyState, xhr.status);
    } else {
      console.log(xhr.readyState, xhr.status);
    }
  };
  xhr.open('POST', url, true);
  xhr.send(data);
}
