function fetch(url, data, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText);
      callback(null, JSON.parse(xhr.responseText));
    } else if (xhr.readyState === 4 && xhr.status !== 200){
      callback(xhr.status);
      console.log(xhr.readyState, xhr.status);
    } else {
      console.log(xhr.readyState, xhr.status);
    }
  };
  xhr.open('POST', url, true);
  xhr.send(data);
}

document.getElementById('generate_button').addEventListener('click', function () {
  var first_name = document.getElementById('first_name').value.toLowerCase();
  var last_name = document.getElementById('last_name').value.toLowerCase();
  var data = [first_name, last_name];
  console.log('this is data', data);
  fetch('/generate', data, function (err, res) {
    if(err) {
      console.log('there was an error', err);
    } else {
      console.log('THE response', res);
      showShoppingList(res);
    }
  });
});

function showShoppingList(arr) {
    var shopList = document.createElement('ul');
    arr.forEach(function(item){
      var listElement = document.createElement('li');
      listElement.textContent = item.item;
      shopList.appendChild(listElement);
    });
    document.getElementById('shopping_list').appendChild(shopList);
  }
