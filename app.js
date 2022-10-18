// Get the JSON data from Gnews
fetch('https://gnews.io/api/v4/top-headlines?%22max=4&token=d8fbc637147479faeb669e4e0145689c&lang=en')
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        let html = data.articles.map(function(data) {
            return `<div class="content">
                        <div class="img-content"><img src="${data.image}" alt="${data.name}"></img></div>
                        <div class="text-content">
                            <a href=${data.url} target="_blank">
                                ${data.title}
                            </a>
                            <p>${data.publishedAt}</p>
                            <p>${data.content}</p>
                        </div>
                    </div>`
                })
    let htmls = html.join("")
    document.getElementById("news").innerHTML = htmls
})

// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("btnSearch");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function search() {
    document.getElementById("loader").classList.remove("hidden")
    // Get the input value to URL
    let keyword = document.getElementById("input").value
    let startDate = document.getElementById("startDate").value
    let endDate = document.getElementById("endDate").value
    
    let url = `https://gnews.io/api/v4/search?q=${keyword}&lang=en&from=${startDate}&to=${endDate}&token=d8fbc637147479faeb669e4e0145689c`
    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (search) {
            document.getElementById("loader").classList.add("hidden")
            let html = search.articles.map(function(search) {
                if (startDate < search.publishedAt &&
                    search.publishedAt < endDate) {
                       return `<div class="content">
                                <div class="img-content"><img src="${search.image}" alt="${search.name}"></img></div>
                                <div class="text-content">
                                    <a href=${search.url} target="_blank">
                                        ${search.title}
                                    </a>
                                    <p>${search.publishedAt}</p>
                                    <p>${search.content}</p>
                                </div>
                            </div>`
                }
            })
            let htmls = html.join("")
            document.getElementById("news").innerHTML = htmls
        })
    modal.style.display = "none"
    console.log(startDate, endDate)
}
