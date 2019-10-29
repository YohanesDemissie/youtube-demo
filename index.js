// console.log(API_KEY);

function search(event) {
  //query selector selects the element with the class 'output' and update its text content to the url
   const url = 'https://www.googleapis.com/youtube/v3/search/?part=snippet&key='+API_KEY+'&q=test&maxResults=20';

   document.querySelector('.output').textContent = url;
   //fetch requires url first, in which we will be making a request to which is promised base
   fetch(url)
    .then(function(res){
     return res.json() //calls the callback in a json object format
   }).then(function(data) {
     console.log(data); //return parsable data
   })
}