// select elements
const input = document.getElementById("input-box");
const resultContainer = document.getElementById("result-container");
const seeMoreBtn = document.getElementById("see-more-btn");

// find out the search result
const searchInput = () => {
    const text = input.value.toLowerCase();
    // console.log(input.value, text);
    fetch(`https://openapi.programming-hero.com/api/phones?search=${text}`)
        .then((res) => res.json())
        .then((data) => displaySearchData(data.data));
};

// display the search result
const displaySearchData = (items) => {
    console.log(items);
    items.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("col-lg-4", "col-md-6");

        div.innerHTML = `
            <div class="card shadow-sm">
                <img src="${item.image}" class="card-img-top p-3" alt="...">
                <div class="card-body mb-4">
                    <h5 class="card-title fs-3">Model: ${item.phone_name.toUpperCase()}</h5>
                    <p class="card-text">Brand: ${item.brand}</p>
                    <button onclick="loadDetail()" class="btn btn-primary">Details</button>
                </div>
            </div>
        `;

        if (resultContainer.childNodes.length < 20) {
            resultContainer.appendChild(div);
        }
    });

    seeMoreBtn.style.display = "block";
};

// display all search result
const displayAllData = (items) => {
    console.log(items);
};
