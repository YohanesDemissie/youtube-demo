//API_KEY called in from private file
//query selector selects the element with the class '.output' or element with name 'input' and update its text content to the url
const output = document.querySelector('.output');
const searchInput = document.querySelector('input');
searchInput.setAttribute('value', 'test');
//DYNAMICALLY CREATE NEXT BUTTON
const nextBtn = document.createElement('button');
nextBtn.setAttribute('disabled', 'true');
nextBtn.textContent = 'Next';
document.body.appendChild(nextBtn);
//DYNAMICALLY CREATE PREVIOUS BUTTON
const previousBtn = document.createElement('button');
previousBtn.setAttribute('disabled', 'true');
previousBtn.textContent = 'Previous';
document.body.appendChild(previousBtn);

const buttons = document.querySelectorAll('button'); //SELECTS ALL BUTTONS
buttons.forEach(function(button) {
  button.addEventListener('click', search); // adds onClick event listener to activate search function when fired
})

function search(event) {
  let searchRef = searchInput.value; //when search button gets clicked, we first grab the user input
  console.log(event.target.token)
  searchRef = encodeURIComponent(searchRef); //this takes user input and provides appropriate special characters to take take to replaces spaces
  let url = 'https://www.googleapis.com/youtube/v3/search/?part=snippet&key='+API_KEY+'&q='+searchRef+'&maxResults=4'; //...dynamically manipulate the url with search input
  if(event.target.token){
    url +='&pageToken='+event.target.token;
  }

   //fetch requires url first, in which we will be making a request to which is promised base
   fetch(url)
    .then(function(res){
     return res.json() //calls the callback in a json object format
   }).then(function(data) {
     if(data.prevPageToken) {
       previousBtn.token  = data.prevPageToken;
       previousBtn.disabled = false;
     }else{
       previousBtn.token = false;
       previousBtn.disabled= true;
     }
     if (data.nextPageToken) {
       nextBtn.token = data.nextPageToken;
       nextBtn.disabled = false;
     } else {
       nextBtn.token = false;
       nextBtn.disabled = true;
     }

      return data.items.map(function(x) {
        return{
         title: x.snippet.title,
         description: x.snippet.description,
         image: x.snippet.thumbnails.default.url,
         id: x.id.videoId,
         x: x
       }
     })
   }).then(function(arr){
     show(arr);
   }).catch(function(error){
     console.log(error) //returns error on any connections
   })
}

function show(data){ //once above promise is met and has a returned, usable data
  console.log(data);
  console.log(data.length);
  output.innerHTML = ''
  data.forEach(function(video){ //iterate through each result with 'data' as the callback
    console.log(video);
    let div = document.createElement('div');
    div.classList.add("box");
    let title = document.createElement('h3');
    title.innerHTML = video.title
    let image = document.createElement('img');
    let description = document.createTextNode(video.description); //snippet.description is non-arbitrary. part of the return key value pairs of json object
    image.setAttribute('src', video.image) // dynamically renders image url

    //below we will dynamically render video title
    let span = document.createElement('span');
    span.innerHTML = '<a href="http://www.youtube.com/watch?v='+video.id+'target="_blank">'+video.title+'</a>';
    
    div.appendChild(title);
    div.appendChild(image);
    div.appendChild(description);
    div.appendChild(span);
    output.appendChild(div);
  })
}