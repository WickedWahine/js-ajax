"use strict";


// PART 1: SHOW A FORTUNE

function showFortune(evt) {

    // TODO: get the fortune and show it in the #fortune-text div
    fetch ("/fortune")
        .then((response) => response.text())
        .then((serverData) => {
            document.querySelector("#fortune-text").innerHTML =
            serverData;
        });
}

$('#get-fortune-button').on('click', showFortune);



// PART 2: SHOW WEATHER

function showWeather(evt) {
    evt.preventDefault();

    let url = "/weather.json";
    
    //let formData = {"zipcode": $("#zipcode-field").val()};
     let formData = {
         zipcode: document.querySelector("#zipcode-field").value
     };

    // TODO: request weather with that URL and show the forecast in #weather-info
    const queryString = new URLSearchParams(formData).toString();

    fetch(`${url}?${queryString}`)
        .then((response) => response.json())
        .then((responseJson) => {
            document.querySelector("#weather-info").innerHTML = 
            responseJson.forecast;
        });
};

$("#weather-form").on('submit', showWeather);



// PART 3: ORDER MELONS

function orderMelons(evt) {
    evt.preventDefault();

    // TODO: show the result message after your form
    // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
    const orderData = {
        melon: document.querySelector("#melon-type-field").value,
        qty: document.querySelector("#qty-field").value,
    };
    console.log(orderData);

    fetch("/order-melons.json", {
        method: "POST",
        body: JSON.stringify(orderData),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.code === "ERROR") {
                document.querySelector("#order-status").classList.add("order-error");
            }
            else {
                document.querySelector("#order-status").classList.remove("order-error");
            }
            document.querySelector("#order-status").innerHTML =
                `${responseJson.msg}`;
        });
};

$("#order-form").on('submit', orderMelons);


