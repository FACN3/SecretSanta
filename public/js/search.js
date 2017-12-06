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
    var resList = document.createElement('ul');
    arr.forEach(function(gift) {
      var el = document.createElement('li');
      el.textContent = gift.gifts;
      resList.appendChild(el);
    });
    document.getElementById('resDiv').appendChild(resList);
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
