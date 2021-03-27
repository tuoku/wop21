"use strict";

let searchButton = document.getElementById("searchButton");
let searchInput = document.getElementById("searchInput");
let shows = document.getElementById("shows")

searchButton.addEventListener("click", search)
searchInput.addEventListener("keypress",function(event){
  if(event.key === "Enter"){
    search()
  }
})
function search() {
  shows.innerHTML = ""
  let query = "http://api.tvmaze.com/search/shows?q=" + searchInput.value;
  console.log(query);
  fetch(query)
      .then(function(result){
        return result.json()
  }).then(function(json){
    json.forEach(s => {
      console.log(s.show.name)
      let imgsrc = "./img/notfound.jpg"
      let article = document.createElement('article')
      try{
        imgsrc = s.show.image.medium
      }catch (e){
        console.log(e)
      }
      let genreslist = ""
      s.show.genres.forEach(g => {
        if(g == "Science-Fiction"){
          genreslist += '<li> SciFi </li>'
        } else {
          genreslist += '<li>' + g + '</li>'
        }
      })
      let content =
          `
            <h4>` + s.show.name + ` </h4>
            <ul class="genres">`+ genreslist +`</ul>
            <a href="` + s.show.officialSite + `">Link</a>
            <img src="`+ imgsrc +`">`
             + s.show.summary +`
          `
      article.innerHTML = content
      shows.appendChild(article)
    })
  })
}