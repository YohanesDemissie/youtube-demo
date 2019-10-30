//API_KEY called in from private file
//query selector selects the element with the class '.output' or element with name 'input' and update its text content to the url
const output = document.querySelector('.output');
const searchInput = document.querySelector('input');
const button = document.querySelector('button');
searchInput.setAttribute('value', 'test');
button.addEventListener('click', search); // adds onClick event listener to activate search function when fired


function search(event) {
  let searchRef = searchInput.value; //when search button gets clicked, we first grab the user input
  searchRef = encodeURIComponent(searchRef); //this takes user input and provides appropriate special characters to take take to replaces spaces
   const url = 'https://www.googleapis.com/youtube/v3/search/?part=snippet&key='+API_KEY+'&q='+searchRef+'&maxResults=20'; //...dynamically manipulate the url with search input
   output.textContent = url;

   //fetch requires url first, in which we will be making a request to which is promised base
   fetch(url)
    .then(function(res){
     return res.json() //calls the callback in a json object format
   }).then(function(data) {
     console.log(data); //return parsable data
     show(data.items);
   })
}

function show(data){ //once above promise is met and has a returned, usable data
  console.log(data);
  console.log(data.length);
  data.forEach(function(video){ //iterate through each result with 'data' as the callback
    console.log(video);
    let div = document.createElement('div');
    div.classList.add('box');
    let description = document.createTextNode(video.snippet.description); //snippet.description is non-arbitrary. part of the return key value pairs of json object
    div.appendChild(description);
    //below we will dynamically render video title
    let span = document.createElement('span');
    span.innerHTML = '<a href="http://www.youtube.com/watch?v='+video.id.videoId+'"target="_blank">'+video.snippet.title+'</a>';

    div.appendChild(span);
    output.appendChild(div);
  })
}