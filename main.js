
import {build} from './build.js'



window.onload = function () {
    // fetchEverything().then(main);
    
    main();
};

function main(){
    // currentWeather, weatherForecast, weatherStation, aqhiData, location, aqhiInfo
    console.log("main");
    // var data = fetch()
    fetchData().then(data => build(data));
    // build()
}

async function getLocation(){
    var lat, lon;
    const location = new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((pos) => {
            lat = pos.coords.latitude;
            lon = pos.coords.longitude;
            fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`
            ).then((response) => {
                resolve(response.json());
            });
        });
    });
    console.log("lat, lon", lat, lon)
    console.log("location", location)
    return location;
}

async function fetchData() {
    // currentWeather, weatherForecast, weatherStation, aqhiData, aqhiInfo, location
    console.log("fetch");
    const urls = [
        'https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en',
        'https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en',
        'https://ogciopsi.blob.core.windows.net/dataset/weather-station/weather-station-info.json',
        'https://dashboard.data.gov.hk/api/aqhi-individual?format=json',
        'data/aqhi-station-info.json',
        // 'https://data.weather.gov.hk/weatherAPI/opendata/opendata.php?dataType=LTMV&lang=en&rformat=csv'
    ];

    var location = await getLocation();
    console.log("location", location);
  
    const data = await fetchJson(urls);
    data.push(location);
    console.log("data",data);
    return data;
}
  
async function fetchJson(urls) {
    const responses = await Promise.all(urls.map(url => fetch(url)));
    const jsons = await Promise.all(responses.map(response => response.json()));
    return jsons;
}