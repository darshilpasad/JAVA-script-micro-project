// ------------------------------------
// Ocean Pollution Monitoring Dashboard
// ------------------------------------

console.log("Ocean Pollution Monitoring Dashboard Started");

function welcomeMessage(){

    console.log(
        "Welcome! Live Marine Data Dashboard Loaded."
    );

}

welcomeMessage();

// ------------------------------------
// Chart.js Configuration
// ------------------------------------

const ctx = document.getElementById("marineChart");

const chart = new Chart(ctx, {

    type:"bar",

    data:{

        labels:[

            "Sea Temperature",
            "Wave Height",
            "Wind Wave",
            "Wind Speed",
            "Humidity"

        ],

        datasets:[{

            label:"Marine Monitoring Data",

            data:[0,0,0,0,0],

            backgroundColor:[

                "#0d6efd",
                "#20c997",
                "#ffc107",
                "#dc3545",
                "#6f42c1"

            ]

        }]

    },

    options:{

        responsive:true,

        plugins:{

            title:{

                display:true,

                text:"Real Time Ocean Monitoring"

            }

        }

    }

});

// ------------------------------------
// Fetch Marine + Weather Data
// ------------------------------------

async function loadData(){

    document
    .getElementById("loader")
    .classList.remove("d-none");

    document
    .getElementById("status")
    .innerHTML="Loading marine data...";

    const city =
    document.getElementById("city").value;

    const coordinates =
    city.split(",");

    const latitude =
    coordinates[0];

    const longitude =
    coordinates[1];

    const marineURL =

    `https://marine-api.open-meteo.com/v1/marine?
latitude=${latitude}
&longitude=${longitude}
&current=
sea_surface_temperature,
wave_height,
wind_wave_height,
wave_direction,
ocean_current_velocity,
ocean_current_direction`;

    const weatherURL =

    `https://api.open-meteo.com/v1/forecast?
latitude=${latitude}
&longitude=${longitude}
&current=
temperature_2m,
relative_humidity_2m,
windspeed_10m,
surface_pressure
&daily=
sunrise,
sunset
&timezone=auto`;

    try{

        // Marine API

        const marineResponse =
        await fetch(
            marineURL.replace(/\s+/g,"")
        );

        if(!marineResponse.ok){

            throw new Error(
                "Marine API Error"
            );

        }

        const marine =
        await marineResponse.json();

        // Weather API

        const weatherResponse =
        await fetch(
            weatherURL.replace(/\s+/g,"")
        );

        if(!weatherResponse.ok){

            throw new Error(
                "Weather API Error"
            );

        }

        const weather =
        await weatherResponse.json();

        // ----------------------------
        // Update Marine Cards
        // ----------------------------

        document.getElementById("temp")
        .innerHTML =

        marine.current.sea_surface_temperature
        +" °C";

        document.getElementById("wave")
        .innerHTML =

        marine.current.wave_height
        +" m";

        document.getElementById("wind")
        .innerHTML =

        marine.current.wind_wave_height
        +" m";

        document.getElementById("direction")
        .innerHTML =

        marine.current.wave_direction
        +"°";

        // ----------------------------
        // Update Extra Weather Data
        // ----------------------------

        if(document.getElementById("airTemp")){

            document.getElementById("airTemp")
            .innerHTML =

            weather.current.temperature_2m
            +" °C";

        }

        if(document.getElementById("humidity")){

            document.getElementById("humidity")
            .innerHTML =

            weather.current.relative_humidity_2m
            +" %";

        }

        if(document.getElementById("windSpeed")){

            document.getElementById("windSpeed")
            .innerHTML =

            weather.current.windspeed_10m
            +" km/h";

        }

        if(document.getElementById("pressure")){

            document.getElementById("pressure")
            .innerHTML =

            weather.current.surface_pressure
            +" hPa";

        }

        if(document.getElementById("coordinates")){

            document.getElementById("coordinates")
            .innerHTML =

            latitude+
            " , "+
            longitude;

        }

        if(document.getElementById("sunrise")){

            document.getElementById("sunrise")
            .innerHTML =

            weather.daily.sunrise[0];

        }

        if(document.getElementById("sunset")){

            document.getElementById("sunset")
            .innerHTML =

            weather.daily.sunset[0];

        }

        // ----------------------------
        // Update Chart
        // ----------------------------

        chart.data.datasets[0].data = [

            marine.current.sea_surface_temperature,

            marine.current.wave_height,

            marine.current.wind_wave_height,

            weather.current.windspeed_10m,

            weather.current.relative_humidity_2m

        ];

        chart.update();

        document
        .getElementById("status")
        .innerHTML =

        "🌊 Marine data updated successfully <br>" +

        "Last Update: "

        + new Date()
        .toLocaleTimeString();

    }

    catch(error){

        console.log(error);

        document
        .getElementById("status")
        .innerHTML =

        "❌ Unable to fetch marine data";

    }

    document
    .getElementById("loader")
    .classList.add("d-none");

}

// ------------------------------------
// Load Default Data
// ------------------------------------

loadData();