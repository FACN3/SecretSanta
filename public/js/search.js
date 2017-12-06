document.getElementById('submitButton').addEventListener('click', function() {
  var fullName = document.getElementById('submitInput').value;
  if (fullName != "") {
    postSearch("/search", fullName, renderingSearchResult);
  }
})

function renderingSearchResult(err, arr) {
  if (err) {
    console.log('sorry having a problem with finding what you searched for');
  } else {
    // var resList = document.createElement('ul');
    var idx = 1;
    document.getElementById('resDiv').innerHTML = '';
    arr.forEach(function(gift) {
      // var el = document.createElement('li');
      if (gift.gifts !== "") {
        var label = document.createElement('label');
        var checkbox = document.createElement('input');
        var description = document.createTextNode(gift.gifts);
        checkbox.type = 'checkbox';
        checkbox.name = 'gift' + idx.toString();
        checkbox.value = gift.gifts;
        // el.textContent = gift.gifts;
        // resList.appendChild(el);
        // resList.appendChild(checkbox);
        label.appendChild(checkbox);
        label.appendChild(description);
        document.getElementById('resDiv').appendChild(label);
        idx++;
      }
    });
    // document.getElementById('resDiv').appendChild(resList);

  }
}

function postSearch(url, name, callback) {
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
  xhr.send(name);
}
