// select elements
const input = document.getElementById("input-box");
const resultContainer = document.getElementById("result-container");
const detailContainer = document.getElementById("detail-container");
const showBtn = document.getElementById("see-more-btn");
const loader = document.getElementById("loader");
const message = document.getElementById("message");

// find out the search result
const searchInput = () => {
    loader.style.display = "block";
    const text = input.value.toLowerCase();
    if (text === "") {
        return;
    }

    setTimeout(() => {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${text}`)
            .then((res) => res.json())
            .then((data) => displaySearchData(data.data));
    }, 500);
};

// display detail result
const displayDetailData = (item) => {
    console.log(item);
    loader.style.display = "none";
    const div = document.createElement("div");
    div.classList.add("col-lg-4", "col-md-6");

    div.innerHTML = `
        <div class="card shadow-sm h-100">
            <img src="${item.image}" class="card-img-top p-3" alt="...">
            <div class="card-body mb-4">
                <h3 class="card-title">${item.name.toUpperCase()}</h3>
                <p class="card-text"><span class="text-danger spec-name">Brand:</span> ${
                    item.brand
                }</p>
                <p class="card-text d-flex">
                    <span class="text-danger spec-name">Release Date:</span> ${
                        item.releaseDate
                            ? item.releaseDate
                            : "Release Date Not Found!"
                    }
                    </p>
                <div class="card-text">
                    <h3 class="text-center card-text">Main Features</h3>
                    <p class="d-flex">
                        <span class="mb-1 text-danger spec-name">Display:</span>
                        <span>${item.mainFeatures.displaySize.toUpperCase()}</span>
                    </p>
                    <p class="d-flex">
                        <span class="mb-1 text-danger spec-name">Chipset:</span>
                        <span>${item.mainFeatures.chipSet.toUpperCase()}</span>
                    </p>
                    <p class="d-flex">
                        <span class="mb-1 text-danger spec-name">Storage / Memory:</span>
                        <span>${item.mainFeatures.memory.toUpperCase()}</span>
                    </p>
                    <p class="d-flex">
                        <span class="mb-1 text-danger spec-name">Sensors: </span>
                        <span>${item.mainFeatures.sensors.map(
                            (sensor) => " " + sensor.toUpperCase()
                        )}
                        </span>
                    </p>
                </div>

                <div class="card-text">
                    <h3 class="text-center card-text">Others</h3>
                    <p>
                        <span class="mb-1 text-danger spec-name">Bluetooth:</span>
                        <span>${
                            item.others?.Bluetooth
                                ? item.others.Bluetooth.toUpperCase()
                                : "Result Not Found!"
                        }</span>
                    </p>
                    <p class="d-flex">
                        <span class="mb-1 text-danger spec-name">GPS:</span>
                        <span>${
                            item.others?.GPS
                                ? item.others.GPS.toUpperCase()
                                : "Result Not Found!"
                        }</span>
                    </p>
                    <p>
                        <span class="mb-1 text-danger spec-name">NFC: </span>
                        <span>${
                            item.others?.NFC
                                ? item.others.NFC.toUpperCase()
                                : "Result Not Found!"
                        }
                        </span>
                    </p>    
                    <p>
                        <span class="mb-1 text-danger spec-name">Radio: </span>
                        <span>${
                            item.others?.Radio
                                ? item.others.Radio.toUpperCase()
                                : "Result Not Found!"
                        }
                        </span>
                    </p>    
                    <p class="d-flex">
                        <span class="mb-1 text-danger spec-name">USB: </span>
                        <span>${
                            item.others?.USB
                                ? item.others.USB.toUpperCase()
                                : "Result Not Found!"
                        }
                        </span>
                    </p>    
                    <p class="d-flex">
                        <span class="mb-1 text-danger spec-name">WLAN: </span>
                        <span>${
                            item.others?.WLAN
                                ? item.others.WLAN.toUpperCase()
                                : "Result Not Found!"
                        }
                        </span>
                    </p>    
                </div>
            </div>
        </div>
    `;

    detailContainer.appendChild(div);
};

// load detail result
const loadDetail = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then((res) => res.json())
        .then((data) => displayDetailData(data.data));
};

// display the search result
const displaySearchData = (items) => {
    loader.style.display = "none";

    if (items.length === 0) {
        detailContainer.textContent = "";
        message.style.display = "block";
    } else {
        message.style.display = "none";
    }

    resultContainer.textContent = "";
    items.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("col-lg-4", "col-md-6");

        div.innerHTML = `
            <div class="card shadow-sm h-100">
                <img src="${item.image}" class="card-img-top p-3" alt="...">
                <div class="card-body mb-4">
                    <h5 class="card-title fs-3">${item.phone_name.toUpperCase()}</h5>
                    <p class="card-text">Brand: ${item.brand}</p>
                    <a href="#" onclick="loadDetail('${
                        item.slug
                    }')" class="w-75 d-block mx-auto btn detail">Details</a>
                </div>
            </div>
        `;

        if (resultContainer.childNodes.length < 20) {
            resultContainer.appendChild(div);
        }
    });

    if (resultContainer.childNodes.length === 20) {
        showBtn.style.display = "block";
    } else {
        showBtn.style.display = "none";
    }
};

// display all search result
const displayAllResult = (items) => {
    resultContainer.textContent = "";
    items.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("col-lg-4", "col-md-6");

        div.innerHTML = `
            <div class="card shadow-sm h-100">
                <img src="${item.image}" class="card-img-top p-3" alt="...">
                <div class="card-body mb-4">
                    <h5 class="card-title fs-3">${item.phone_name.toUpperCase()}</h5>
                    <p class="card-text">Brand: ${item.brand}</p>
                    <a href="#" onclick="loadDetail('${
                        item.slug
                    }')" class="w-75 d-block mx-auto btn detail">Details</a>
                </div>
            </div>
        `;

        resultContainer.appendChild(div);
    });
};

// load all search result
const loadAllData = () => {
    showBtn.style.display = "none";
    const text = input.value.toLowerCase();

    fetch(`https://openapi.programming-hero.com/api/phones?search=${text}`)
        .then((res) => res.json())
        .then((data) => displayAllResult(data.data));
};
