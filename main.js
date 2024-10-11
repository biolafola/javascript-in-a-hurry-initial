//needed vars
const weatherAPIKey = "e5797a1214b4f93f14d417482d64b003";
const weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric`;

const galleryImages = [
    {src:"/assets/gallery/image1.jpg", alt:"Thumbnail Image 1"},
    {src:"/assets/gallery/image2.jpg", alt:"Thumbnail Image 2"},
    {src:"/assets/gallery/image3.jpg", alt:"Thumbnail Image 3"}
];

const products = [
    {
      title: "AstroFiction",
      author: "John Doe",
      price: 49.9,
      image: "./assets/products/img6.png"
    },
    {
      title: "Space Odissey",
      author: "Marie Anne",
      price: 35,
      image: "./assets/products/img1.png"
    },
    {
      title: "Doomed City",
      author: "Jason Cobert",
      price: 0,
      image: "./assets/products/img2.png"
    },
    {
      title: "Black Dog",
      author: "John Doe",
      price: 85.35,
      image: "./assets/products/img3.png"
    },
    {
      title: "My Little Robot",
      author: "Pedro Paulo",
      price: 0,
      image: "./assets/products/img5.png"
    },
    {
      title: "Garden Girl",
      author: "Ankit Patel",
      price: 45,
      image: "./assets/products/img4.png"
    }
  ]


//handle menu open and close
function menuHandler(){
    //navigation toggles
    document.querySelector("#open-nav-menu").addEventListener("click", function(){
    
        document.querySelector("header nav .wrapper").classList.add("nav-open");

    })
    document.querySelector("#close-nav-menu").addEventListener("click", function(){
    
        document.querySelector("header nav .wrapper").classList.remove("nav-open");

    })
}

//greeting
function greetingHandler() {
    //greeting text
    let greetingText;
    let currentHour = new Date().getHours();

    if(currentHour < 12){
        greetingText = "Good morning!";
    } else if (currentHour < 19){
        greetingText = "Good afternoon!";
    } else if (currentHour < 24){
        greetingText = "Good evening!";
    } else {
        greetingText = "Welcome";
    }
    
    document.querySelector("#greeting").innerHTML = greetingText;
}


//function that converts c to f
function convertToFahr(temperature){
    let fahr = (9/5 * temperature) + 32;
    return fahr;
}


//location and weather information
function weatherHandler(){
    navigator.geolocation.getCurrentPosition(position =>{
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let url = weatherAPIURL
            .replace("{lon}",longitude)
            .replace("{lat}",latitude)
            .replace("{API key}",weatherAPIKey);
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const condition = data.weather[0].description;
            const location = data.name;
            const temperature = data.main.temp;
    
      
        let celsiusText = `The weather is ${condition} in ${location} and it's ${temperature.toFixed(1)}°C outside.`;
        let fahrText = `The weather is ${condition} in ${location} and it's ${convertToFahr(temperature).toFixed(1)}°F outside.`;
        document.querySelector("#weather").innerHTML = celsiusText;
    
        //change the temperature unit
        document.querySelector(".weather-group").addEventListener("click", function(event){
            let cursorTarget = event.target.id;
            if(event.target.id == "celsius"){
                document.querySelector("#weather").innerHTML = celsiusText;
            } else if(event.target.id == "fahr"){
                document.querySelector("#weather").innerHTML = fahrText;
            }
        });
        })
        .catch(err => {
            document.querySelector("#weather").innerHTML = "Unable to get the weather information. Try again later.";
        });
    });
}

// set up time
function clockHandler() {
    setInterval(function(){
        let localTime = new Date();
        document.querySelector("span[data-time='hours']").textContent = localTime.getHours().toString().padStart(2,"0");
        document.querySelector("span[data-time='minutes']").textContent = localTime.getMinutes().toString().padStart(2,"0");
        document.querySelector("span[data-time='seconds']").textContent = localTime.getSeconds().toString().padStart(2,"0");
    }, 1000);
}


// gallery section
function galleryHandler() {
    let mainImage = document.querySelector("#gallery > img");
    let thumbnails = document.querySelector("#gallery .thumbnails");

    mainImage.src = galleryImages[0].src;
    mainImage.alt = galleryImages[0].alt;

    //<img src="./assets/gallery/image1.jpg" alt="Thumbnail Image 1" data-array-index="0" data-selected="true">
    galleryImages.forEach(function(image,index){

        let thumb = document.createElement("img");
        thumb.src = image.src;
        thumb.alt = image.alt;
        thumb.dataset.arrayIndex = index;
        thumb.dataset.selected = index === 0 ? true : false;

        //add an event listener to know which image is selected
        thumb.addEventListener("click",function(event){
            let selectedIndex = event.target.dataset.arrayIndex;
            let selectedImage = galleryImages[selectedIndex];
            //set the selected image as the main image
            mainImage.src = selectedImage.src;
            mainImage.alt = selectedImage.alt;
            
            //set all thumbnails as not selcted
            thumbnails.querySelectorAll("img").forEach(function(image){
                image.dataset.selected = false;
            })
            //set the appropriate thumbnail as selected
            event.target.dataset.selected = true;
            
        });
        //add the thumbnail image to the div
        thumbnails.appendChild(thumb);
            

    });

}

//products section
function populateProducts(productsList){

    //get the html product parent
    let productsSection = document.querySelector(".products-area");
        productsSection.textContent = "";
     //run a loop through products and generate html for all
     productsList.forEach(function(product, index){
        //create product parent div
        let productElm = document.createElement("div");
        productElm.classList.add("product-item");
        
        //Create image
        let productImage = document.createElement("img");
        productImage.src = product.image;
        productImage.alt = "Image for " + product.title;

        //create product details
        let productDetails = document.createElement("div");
        productDetails.classList.add("product-details");

        //create product title, author, pricetitle and price
        let productTitle = document.createElement("h3");
        productTitle.classList.add("product-title");
        productTitle.textContent = product.title;

        let productAuthor = document.createElement("p");
        productAuthor.classList.add("product-author");
        productAuthor.textContent = product.author;

        let priceTitle = document.createElement("p");
        priceTitle.classList.add("price-title");
        priceTitle.textContent = "Price";

        let productPrice = document.createElement("p");
        productPrice.classList.add("product-price");
        productPrice.textContent = product.price > 0 ? "$" + product.price.toFixed(2) : "Free";

        //append to product details
        productDetails.append(productTitle);
        productDetails.append(productAuthor);
        productDetails.append(priceTitle);
        productDetails.append(productPrice);

        //add child html to parent (product item)
        productElm.append(productImage);
        productElm.append(productDetails);

        //append the generated html to the products section in html
        productsSection.append(productElm);
    });
}

function productsHandler(){
    
    // add the number of products to the filter badges
    let paidProducts = products.filter(item => item.price >0);

    let freeProducts = products.filter(item => !item.price || item.price <=0);

    document.querySelector(".products-filter label[for='all'] .product-amount").textContent = products.length;
    document.querySelector(".products-filter label[for='free'] .product-amount").textContent = freeProducts.length;
    document.querySelector(".products-filter label[for='paid'] .product-amount").textContent = paidProducts.length;
    
    populateProducts(products);

    //populate the products section with the right products based on selected filter
    let productFilter = document.querySelector(".products-filter");

    productFilter.addEventListener("click",function(e){
       
       if(e.target.id === "all"){
            populateProducts(products);
       } else if (e.target.id === "paid"){
            populateProducts(paidProducts);
       } else if (e.target.id === "free"){
            populateProducts(freeProducts);
       }
    });
}

function footerHandler(){
    let currentYear = new Date().getFullYear();
    document.querySelector("footer").textContent = `© ${currentYear} - All rights reserved`;

}





//Page Load
menuHandler();
greetingHandler();
weatherHandler();
clockHandler();
galleryHandler();
productsHandler();
footerHandler();