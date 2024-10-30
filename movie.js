const API_URL ="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1&quot";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const movieContainer = document.getElementById("movie-container");
 const totalPrice = document.getElementById("total-price");
 const seatMap = document.getElementById("seat-map");
 const selectedSeatsCount = document.getElementById("selected-seats");
 const BuyButton = document.getElementById("buy-button");

const urlParams = new URLSearchParams(window.location.search);


const movieId = urlParams.get("id");
console.log(movieId);
getMovieDetails(API_URL);
async function getMovieDetails(API_URL) {
    const result = await fetch (API_URL);
    const data = await result.json();
    console.log(data.results);
    const movie = data?.results.find((movie) => movie.id === parseInt(movieId));
    showMovieDetails(movie);
}

function showMovieDetails (movie) {
    const {title, poster_path, vote_average, overview, release_date ,id} =
    movie;
    const movieEl = document.createElement("div");

    movieEl.innerHTML =`<div class="py-3 sm:max-w-xl sm:mx-auto">
<div class="bg-white shadow-lg border-gray-100 max-h-80	 border sm:rounded-3xl p-8 flex space-x-8">
  <div class="h-48 overflow-visible w-1/2">
      <img class="rounded-3xl shadow-lg" src="${IMG_PATH + poster_path}" alt="">
  </div>
  <div class="flex flex-col w-1/2 space-y-4">
    <div class="flex justify-between items-start">
      <h2 class="text-3xl font-bold">${title}</h2>
      <div class=" ${getClassByRate(vote_average)} font-bold rounded-xl p-2">${Math.round(vote_average)}</div>
    </div>
    <div>
      <div class="text-sm text-gray-400">Series</div>
      <div class="text-lg text-gray-800">${release_date}</div>
    </div>
      <p class=" text-gray-400 max-h-40 overflow-y-hidden">${overview.slice(0,70)}</p>
    <div class="flex text-2xl font-bold text-a">$83.90</div>
  </div>

</div>
</div>

`;

movieContainer.appendChild(movieEl);
}


function getClassByRate(vote) {
    if (vote >= 8) {
        return "bg-green-400"
    } else if (vote >= 6) {
        return "bg-yellow-400"
    } else {
        return "bg-red-400"
    }
}


const seatPrice = 10;
let selectedSeats = [];

const rows = 5;
const seatPerRow = 10;
const occupiedSeats = [2,4,5,7,8,13, 15, 21, 23, 25,32, 34, 38,]


function createSeatMap() {
    for (let i = 0; i < rows; i++) {
        const rowEl = document.createElement("div");
        rowEl.className = "flex justify-center";

        for (let j = 0; j < seatPerRow; j++) {
            const seatIndex = i * seatPerRow + j + 1; // Use +1 if that's intended as per the image
            const seatEl = document.createElement("div");
            seatEl.classList.add("seat");


            if (occupiedSeats.includes(seatIndex)){
                seatEl.classList.add("occupied");
            }



            seatEl.addEventListener("click", () => seatSelect (seatEl, seatIndex));
             rowEl.appendChild(seatEl);
        }
        
        seatMap.appendChild(rowEl);
    }
}

createSeatMap();

function seatSelect(seatEl, seatIndex) {
    if (!seatEl.classList.contains("occupied")){
    seatEl.classList.add("selected");

    if (seatEl.classList.contains("selected")){
        selectedSeats.push(seatIndex);
    }
    updateSummery();
}
}

function updateSummery() {
    selectedSeatsCount.innerText= selectedSeats.length;
    totalPrice.innerHTML = selectedSeats.length * seatPrice;
}

BuyButton.addEventListener("click", () => {
    if (selectedSeats.length > 0) {
        alert(`You have booked ${selectedSeats.join(", ")} seats`);
        
        window.location.href = "checkout.html";
    } else {
        alert("Please select a seat");
    }
});


function updateCart(movieTitle, moviePrice) {
   
    cart.push({ title: movieTitle, price: moviePrice });
    totalPrice += parseFloat(moviePrice);
    
  
    displayCart();
}


function displayCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = ''; 

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${item.title} - $${item.price}`;
        cartItemsDiv.appendChild(itemDiv);
    });

    
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}


const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const movieDiv = this.parentElement;
        const movieTitle = movieDiv.getAttribute('data-title');
        const moviePrice = movieDiv.getAttribute('data-price');
        updateCart(movieTitle, moviePrice);
    });
});


