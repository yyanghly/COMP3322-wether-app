function addDiv(parentId, id){
    var div = document.createElement("div");
    div.id = id;
    if (parentId == "")
        document.body.appendChild(div);
    else 
        document.getElementById(parentId).appendChild(div);
}

function addHTML(parentId, newHTML){
    var parent = document.getElementById(parentId);
    if (typeof(newHTML) == "string")
        parent.innerHTML += newHTML;
    else parent.appendChild(newHTML);
}

function addTitle(){
    addDiv("body1", "title")
    addHTML("title", "<h1>My Weather Portal</h1>")
}

function dayOrNightMode(rainfall) {
    var currentTime = new Date().getHours();
    var day = (6 <= currentTime && currentTime < 18);
    
    //background image
    var img = new Image();
    img.id = 'bgImg';
    img.alt = 'background image';
  
    var rain = rainfall > 0;
    if (rain) {
      //raining
      img.src = day
        ? 'images/water-drops-glass-day.jpg'
        : 'images/water-drops-glass-night.jpg';
    } else {
      //not raining
      img.src = day ? 'images/blue-sky.jpg' : 'images/night-sky.jpg';
    }
    console.log(typeof(img))
    addHTML("header", img);
    document.getElementById("header").style.backgroundImage = `url(${img.src})`;
    img.style.display = "none";

    document.body.style.backgroundImage = `url(${img.src})`;

    if (day && !rain){
        document.documentElement.style.setProperty('--bg-color', 'rgba(1, 1, 1, 0.15)');
        document.documentElement.style.setProperty('--block-color', 'rgba(255, 255, 255, 0.6)');
        document.documentElement.style.setProperty('--font-color', '#313131');
    }
    else if (day && !rain){
        document.documentElement.style.setProperty('--bg-color', 'rgba(1, 1, 1, 0.05)');
        document.documentElement.style.setProperty('--block-color', 'rgba(255, 255, 255, 0.24)');
        document.documentElement.style.setProperty('--font-color', '#e8e8e8');
    }
    else if (!day){
        document.documentElement.style.setProperty('--bg-color', 'rgba(0, 0, 0, 0.4)');
        document.documentElement.style.setProperty('--block-color', 'rgba(255, 255, 255, 0.1)');
        document.documentElement.style.setProperty('--font-color', '#f0ebd6');
    }
    if (day) document.documentElement.style.setProperty("--warning-color", "rgba(255, 196, 196, 0.7)")
    else document.documentElement.style.setProperty("--warning-color", "rgba(160, 37, 37, 0.884)")
}
//render weather icon
function addIcon(parentId, id, src, alt) {
    var img = new Image();
    img.id = id;
    img.alt = alt;
    img.src = src;
    addHTML(parentId, img);
}

function addWarning(warningMessage){
    // warningMessage = ["This is the warning message.", "This is the second warning message.", "This is a very very very very very very very very super super super super super long message"]
    if (warningMessage == null || warningMessage == "")
        return;
    addDiv("header", "warning")
    document.getElementById("warning").classList.add("closed");

    // addHTML("warning", `<h2>warning</h2>`)
    addDiv("warning", "warningContent");
    for (var m in warningMessage){
        addHTML("warningContent", `<p>${warningMessage[m]}</p>`);
    }
    document.getElementById("warningContent").style.display = "none"; 
    document.getElementById("warning").style.width = "35%"; 

    addDiv("warning", "warningHead")
    addIcon("warningHead", "warningIcon", "images/warning-icon1.png", "warning-icon")
    addHTML("warningHead", "<h3>Warning</h3>")

    document.getElementById("warningIcon").addEventListener("click", function() {
        var warning = document.getElementById("warning");
        var icon = document.getElementById("warningIcon");
        var warningContent = document.getElementById("warningContent");

        if (warning.classList.contains("closed")) {
            // If the warning is closed, open it and change the icon
            warning.classList.remove("closed");
            icon.src = "images/shrink-icon.png";
            warningContent.style.display = "block";
            warning.style.width = "100%";
        } else {
            // If the warning is open, close it and change the icon
            warning.classList.add("closed");
            icon.src = "images/warning-icon1.png";
            warningContent.style.display = "none"; 
            warning.style.width = "35%";
        }
    });
}


function addHeader(WR){
    addDiv("centerContainer", "header")
    addHTML("header", "<h1>Hong Kong</h1>")
    addDiv("header", "headerUpper")
    // addHTML("headerUpper", `<h1 id="temperature">  ${data.temperature.data[1].value}<span>°C</span></h1>`);
    addIcon(
        "headerUpper",
        'weatherIcon',
        `https://www.hko.gov.hk/images/HKOWxIconOutline/pic${WR.icon[0]}.png`,
        'Weather Icon',
    )
    
    dayOrNightMode()

    
    // addHTML("headerUpper", "<h3>Weather</h3>")

    addDiv("header", "headerBoxes1")

    addDiv("headerBoxes1", "headerBox1")
    // addHTML("headerBox1", "<h2>Box 1</h2>")
    addIcon("headerBox1", "tempIcon", "images/temp-icon2.png", "temperature-icon")
    addHTML("headerBox1", `<h1 id="temperature">  ${WR.temperature.data[1].value}<span>°C</span></h1>`);
    // addIcon("headerBox1", data.icon[0])
    

    addDiv("headerBoxes1", "headerBox2")
    // addHTML("headerBox2", "<h2>Box 2</h2>")
    addIcon("headerBox2", "waterDropIcon", "images/drop-64.png", "waterdrop-icon")
    addHTML("headerBox2", `<h1 id="humidity">${WR.humidity.data[0].value}<span>%</span></h1>`)
    // console.log("humidity", data.humidity.data[0].value);

    addDiv("header", "headerBoxes2")

    addDiv("headerBoxes2", "headerBox3")
    // addHTML("headerBox3", "<h2>Box 3</h2>")
    addIcon("headerBox3", "rainIcon", "images/rain-48.png", "rain-icon")
    addHTML("headerBox3", `<h1 id="rain">${WR.rainfall.data[13].max}<span>mm</span></h1>`)

    addDiv("headerBoxes2", "headerBox4")
    addIcon("headerBox4", "UVIcon", "images/UVindex-48.png", "UV-icon")
    if (WR.uvindex == ""){
        addHTML("headerBox4", `<h3 id="UV">No Data</h3>`)
    }
    else{
        var uv = WR.uvindex.data[0].value
        addHTML("headerBox4", `<h1 id="UV">${uv}</h1>`)
    }
    var time = WR.updateTime.substring(11, 16);
    addHTML("header", `<p id="updateTime">Last Update: ${time}</p>`);

    addWarning(WR.warningMessage)
    // addCSS("header.css")
    
}

function myLocation(loc){
    var pos = {
        longitude: (loc.lon * Math.PI) / 180,
        latitude: (loc.lat * Math.PI) / 180,
    };
    // console.log("loc", loc)
    var address = loc.address;
    // console.log("address", address);
    var suburb, district;
    if ('suburb' in address) suburb = address.suburb;
    else if ('borough' in address) suburb = address.borough;
    else if ('town' in address) suburb = address.town;
    else suburb = 'unknown';

    if ('city_district' in address) district = address.city_district;
    else if ('county' in address) district = address.county;
    else district = 'unknown';

    // console.log("suburb", suburb);
    // console.log("district", district);
    return [pos, district, suburb]
    // return `<p>${district} - ${suburb}</p>`;
}

function equal(a,b){
    if (b == "Central and Western District" && a == "Central & Western District")
        return true;
    return a == b;
}

function aqhiImage(risk){
    if (risk == 'Very High')
        return 'images/aqhi-very_high.png';
    if (risk == 'High')
        return 'images/aqhi-high.png';
    if (risk == 'Moderate')
        return 'images/aqhi-moderate.png';
    if (risk == 'Serious')
        return 'images/aqhi-serious.png';
    if (risk == 'Low')
        return 'images/aqhi-low.png';
    return 'undefined';
}

function addMyData(loc, weather, station, aqhiInfo, aqhi){
    var pos, district, suburb;
    [pos, district, suburb] = myLocation(loc);
    addDiv("subContainer", "myData")
    addHTML("myData", `<h2 id="mylocation">My Location</h2>`)
    addHTML("myData", `<h3 id="address">${district} - ${suburb}</h3>`)
    // addHTML("myData", `<h3>Weather</h3>`)

    addDiv("myData", "myDataBoxes")

    addDiv("myDataBoxes", "myDataBox1")
    addIcon("myDataBox1", "tempIcon", "images/temp-icon2.png", "temperature-icon")
    var min = 10000;
    var closest_station;

    for (var d of station) {
        //console.log(`${item.longitude} ${item.latitude}`);

        var lat = (d.latitude * Math.PI) / 180;
        var lon = (d.longitude * Math.PI) / 180;

        const x = (lon - pos.longitude) * Math.cos((lat + pos.latitude) / 2);
        const y = lat - pos.latitude;
        const distance = Math.sqrt(x * x + y * y);

        if (distance < min) {
            min = distance;
            closest_station = d.station_name_en;
        }
    }
    console.log("closest_station", closest_station);
    for (var d of weather.temperature.data) {
        if (d.place == closest_station) {
            addHTML("myDataBox1", `<h2>${d.value}<span>°C</span></h2>`);
        }
    }

    // addHTML("myDataBox1", "<h2>Box 1</h2>")

    addDiv("myDataBoxes", "myDataBox2")
    // addHTML("myDataBox2", "<h2>Box 2</h2>")
    addIcon("myDataBox2", "rainIconM", "images/rain-48.png", "rain-icon")
    
    console.log("weather", weather);
    var rain = 0;
    for (var d of weather.rainfall.data) {
        // console.log("d", d)
        if (equal(d.place, district)) {
            console.log("find", d.place)
            rain = d.max;
        }
    }
    addHTML("myDataBox2", `<h2>${d.max}<span>mm</span></h2>`);

    addDiv("myDataBoxes", "myDataBox3")
    min = 10000;
    var closest_station2;
    for (var d of aqhiInfo) {
        var lat = (d.lat * Math.PI) / 180;
        var lon = (d.lng * Math.PI) / 180;
        closest_station;
        //console.log(d);

        const x = (lon - pos.longitude) * Math.cos((lat + pos.latitude) / 2);
        const y = lat - pos.latitude;
        const distance = Math.sqrt(x * x + y * y);

        if (distance < min) {
            min = distance;
            closest_station2 = d.station;
        }
    }
    console.log("closest_station2", closest_station2);
    for (var d of aqhi) {
        if (d.station == closest_station2) {
            var aqhi_value = d.aqhi;
            var risk = d.health_risk;
            var img = new Image();
            img.id = "aqhiImg";
            img.src = aqhiImage(risk);
            img.alt = "aqhi_image";
            addHTML("myDataBox3", img);
            addDiv("myDataBox3", "aqhiValueBox");
            addHTML("aqhiValueBox", `<h3 id="aqhiValue">${aqhi_value}</h3>`);
            addHTML("aqhiValueBox", `<h3 id="aqhiStr">${risk}</h3>`);
        }
    }
    // addHTML("myDataBox3", "<h2>Box 3</h2>")

}

function addDropdown(parentId, data, id){

    var options = new Object();
    var len = Object.keys(data).length;
    // console.log("len", len);
    for (let i = 0; i < len; i++) {
        // console.log("data", i)
        if (id == "selectTemp")
            options[data[i].place] = data[i].value;
        else if (id == "selectRain")
            options[data[i].place] = data[i].max;
        else if (id == "selectAQ")
            options[data[i].station] = `Level: ${data[i].aqhi}<br>Risk: ${data[i].health_risk}`;
        // console.log(data[i].place, data[i].value)
    }
        

    // console.log("options", options);
    var keys = Object.keys(options).sort();
    // console.log("keys", keys);
    var select = document.createElement('select');
    select.id = id;
    select.classList.add("dropDown");
    
    // Step 4: Iterate over the sorted keys and create the option elements
    for (var i = 0; i < keys.length; i++) {
        var option = document.createElement('option');
        option.value = options[keys[i]];
        option.textContent = keys[i];
        select.appendChild(option);
    }
    
    // Create a div to display the selected value
    var selectedValueDiv = document.createElement('div');
    selectedValueDiv.id = id + "selectedValue";
    var suffix;
    if (id == "selectTemp") suffix = "°C";
    else if (id == "selectRain") suffix = "mm";
    else if (id == "selectAQ") suffix = "";
    selectedValueDiv.innerHTML = `<h3>${select.value}<span>${suffix}</span></h3>`;
    selectedValueDiv.classList.add("selectedValue");

    // Add an event listener to the select element
    select.addEventListener('change', function() {
        // Update the text content of the div with the selected value
        var suffix;
        if (this.id == "selectTemp")
            suffix = "°C";
        else if (this.id == "selectRain")
            suffix = "mm";
        else if (this.id == "selectAQ")
            suffix = "";
        selectedValueDiv.innerHTML = `<h3>${this.value}<span>${suffix}</span></h3>`;
    });

    addHTML(parentId, select);
    addHTML(parentId, selectedValueDiv);

}

function addClickEvent(){
    // Get all the div elements
    var divs = document.querySelectorAll('#selectBoxes > div');

    // Add a click event listener to each div
    divs.forEach(function(div) {
        div.addEventListener('click', function() {
            // Close all divs
            divs.forEach(function(otherDiv) {
                otherDiv.classList.add('closed');
            });

            // Open the clicked div
            this.classList.remove('closed');
        });
    });

    // Initially close all divs except the first one
    for (var i = 1; i < divs.length; i++) {
        divs[i].classList.add('closed');
    }
}

function addSelectBoxes(weather, aqhiData){
    addDiv("subContainer", "selectBoxes")

    addDiv("selectBoxes", "selectBox1")
    addHTML("selectBox1", "<h2>Temperatures</h2>")
    addHTML("selectBox1", "<p>Select the Location</p>")
    addDropdown("selectBox1", weather.temperature.data, "selectTemp")

    addDiv("selectBoxes", "selectBox2")
    addHTML("selectBox2", "<h2>Rainfall</h2>")
    addHTML("selectBox2", "<p>Select the District</p>")
    addDropdown("selectBox2", weather.rainfall.data, "selectRain")

    addDiv("selectBoxes", "selectBox3")
    addHTML("selectBox3", "<h2>Air Quality</h2>")
    addHTML("selectBox3", "<p>Select the AQ Station</p>")
    addDropdown("selectBox3", aqhiData, "selectAQ")

    addClickEvent()
}

  
function getDate(date){
    var day = date.substring(6,8);
    if (day[0] == "0"){
        day = day[1];
    }
    var month = date.substring(4, 6);
    if (month[0] == "0"){
        month = month[1];
    }
    return [day, month];
}

function addForecast(data){
    addDiv("Container", "forecast")
    addHTML("forecast", "<h2>9-Day Forecast</h2>")
    // console.log("data", data)
    addDiv("forecast", "forecastBoxes")
    for (var d of data){
        var week = d.week.substring(0, 3);
        var day, month;
        [day, month] = getDate(d.forecastDate);
        var icon =`https://www.hko.gov.hk/images/HKOWxIconOutline/pic${d.ForecastIcon}.png`;
        var psrIcon = `images/psr-${d.PSR}.png`
        var temp = [d.forecastMintemp.value, d.forecastMaxtemp.value];
        var humidity = [d.forecastMinrh.value, d.forecastMaxrh.value];
        
        var id = "forecastBox" + (data.indexOf(d)+1);
        addDiv("forecastBoxes", id)
        console.log("day", day, "month", month, "week", week)

        addHTML(id, "<p>" + week + " " + day + "/" + month + "</p>")
        addIcon(id, id+"Icon", icon, id + " icon");
        addIcon(id, id+"psrIcon", psrIcon, id + " psrIcon")

        addHTML(id, "<p>" + temp[0] + " - " + temp[1] + " °C</p>")
        addHTML(id, "<p>" + humidity[0] + " - " + humidity[1] + " %</p>")
    }
}

export function build(data){
    // fetched data
    // currentWeather, weatherForecast, weatherStation, aqhiData, aqhiInfo, location
    var currentWeather = data[0]
    var weatherForecast = data[1]
    var weatherStation = data[2]
    var aqhiData = data[3]
    var aqhiInfo = data[4]
    var location = data[5]
    // var openData = data[6]
    // console.log("openData", openData);
    addDiv("", "body0")
    addDiv("body0", "body1")

    addTitle()

    addDiv("body1", "Container")

    addDiv("Container", "centerContainer")
    addHeader(currentWeather)

    addDiv("centerContainer", "subContainer")
    addMyData(location, currentWeather, weatherStation, aqhiInfo, aqhiData)

    addSelectBoxes(currentWeather, aqhiData)
    console.log("aqhi", aqhiData)
    console.log("aqhiInfo", aqhiInfo)
    
    // addDiv("", "lowerContainer")
    addForecast(weatherForecast.weatherForecast)
    console.log("weatherForecast", weatherForecast)
}