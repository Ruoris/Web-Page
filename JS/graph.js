
    //TODO!!!!!!!!!!!!!
    // replace enddate with new global variable that signifies filesize
    
    // Asynchronous function to fetch data from a given URL.
async function Fetcher(urlToFetch) {
    // Uses the 'fetch' API to retrieve data.
    let fetchObject = await fetch(urlToFetch);
     // Extracts text from the response. 
    let fetchText = await fetchObject.text();
    // Parses the fetched text using the 'Parse' function.
    let answer = Parse(fetchText);
    return answer;
}
// Asynchronous function to fetch and return JSON data.
async function getJSON(urlToFetch) {
    let fetchObject = await fetch(urlToFetch);
    let fetchText = await fetchObject.text();
    let answer = JSON.parse(fetchText);
    return answer;
}
// Wrapper function around 'getJSON' for additional processing
async function getJsonWrapper(urlToFetch) {
    let jsonFetchPromise = getJSON(urlToFetch);
    let jsonFetched = await jsonFetchPromise;
    return jsonFetched;
}
// Asynchronous function for parsing text.
async function Parse(textToParse) {
    let answer;
    // Utilizes the 'Papa.parse' method from the Papa Parse library.
    Papa.parse(textToParse, {
        header: true,
        dynamicTyping: true,
        complete: function (parsedOutput) {
            let target = Object.assign({}, parsedOutput.data);
            answer = target;
        }
    });
    return answer;
}

// checkbox naming for query purposes in DOM querying and data fetching.
let trendsCheckboxName = "trendBox";
let weatherCheckboxName = "weatherBox";
let regionCheckboxName = "Region";
let jsonUrl = "data.json";

   // Class to handle and store various data records.
class DataRecord {
    // Objects downloaded from url
    // Dictionaries to store weather, UK Biobank (UKBB), and Google Trends data objects.
    weatherDictOfObjs = {};
    ukbbDictOfObjs = {};
    trendsDictOfObjs = {};
    // Dictionaries to store processed values from the above data objects with featurenames as keys. 
    weatherDictOfValues = {};
    ukbbDictOfValues = {};
    trendsDictOfValues = {};
    // Dictionaries for storing values formatted specifically for chart visualization.
    weatherDictOfValues_ForChart = {};
    ukbbDictOfValues_ForChart = {};
    trendsDictOfValues_ForChart = {};
    // A variable to store the complete JSON data.
    fullJson;
    // An array to store date-related data.
    dates = [];

    trends = [];
    weather = [];
    ukbb = [];
    // Objects to store URLs for fetching trends, weather, and UKBB data.
    trendsUrl = {};
    weatherUrl = {};
    ukbbUrl = {};
    // An array of region codes, likely used for filtering
    regions = ['_UK', '_ENG', '_NIR', '_SCT', '_WLS'];
    // Variable indicating the file type, here set to CSV.
    filetype = ".csv";
    // Method to add a new trend data source.
    addTrend(trendToAdd, trendUrlToAdd) {
        // Adds the trend to the 'trends' array.
        this.trends.push(trendToAdd);  
       // Maps the trend to its URL in 'trendsUrl' object.
        this.trendsUrl[trendToAdd] = trendUrlToAdd;
    }
    // Method to add a new weather data source.
    addWeather(WeatherToAdd, weatherUrlToAdd) {
        // Adds the weather data to the 'weather' array.
        this.weather.push(WeatherToAdd);
        // Maps the weather data to its URL in 'weatherUrl' object.
        this.weatherUrl[WeatherToAdd] = weatherUrlToAdd;
    }
    // Method to add a new UK Biobank (UKBB) data source.
    addUkbb(ukbbToAdd, ukbbUrlToAdd) {
        // Adds the UKBB data to the 'ukbb' array.
        this.ukbb.push(ukbbToAdd);
        // Maps the UKBB data to its URL in 'ukbbUrl' object.
        this.ukbbUrl[ukbbToAdd] = ukbbUrlToAdd;
    }
    // This method handles downloading or fetching JSON data.
    downloadJson() {

        // Iterates over the 'regions' array defined in the DataRecord class.
        // This loop handles data fetching and processing for each region.
      
        for (let j = 0; j < this.regions.length; j++) {
            // A nested loop within 'downloadJson', iterating over 'trends' in 'fullJson'.
            for (let i = 0; i < this.fullJson.trends.length; i++) {
                // Calls 'addTrend' to add each trend, concatenating name with region and file type to form the URL.
                this.addTrend(this.fullJson.trends[i].Name + this.regions[j], this.fullJson.trends[i].Url + this.fullJson.trends[i].Name + this.regions[j] + this.filetype);
                
            }
            // Another loop iterating over 'weather' data in 'fullJson'.
            for (let i = 0; i < this.fullJson.weather.length; i++) {
                // Calls 'addWeather' to add each weather data source, similar to the trends loop.
                this.addWeather(this.fullJson.weather[i].Name + this.regions[j], this.fullJson.weather[i].Url + this.fullJson.weather[i].Name + this.regions[j] + this.filetype);

            }

        }
        // Loop to iterate over UK Biobank (UKBB) data in 'fullJson'.
        for (let i = 0; i < this.fullJson.UKBB.length; i++) {
            // Adds each UKBB data source using the 'addUkbb' method.
            // Concatenates the data source name with its URL and filetype for data fetching.
            this.addUkbb(this.fullJson.UKBB[i].Name, this.fullJson.UKBB[i].Url + this.fullJson.UKBB[i].Name + this.filetype);
        }
        console.log("downloadJsonReady");
    }



// Method to download a specific weather element.
    downloadWeatherElement(item) {
          // Uses the 'Fetcher' function to get data from the weather URL.
            Fetcher(this.weatherUrl[item] ).then( (downloadedObj)=> {
                // Stores the downloaded object in 'weatherDictOfObjs'.
                this.weatherDictOfObjs[item] = downloadedObj;
                // Calls a method to extract values from the downloaded weather object.
                this.extractWeatherValueFromObj(item)
            });
        
    }
    // Similar method for downloading trend data.
    downloadTrendElement(item) {
                   Fetcher(this.trendsUrl[item]).then((downloadedObj)=> {
                this.trendsDictOfObjs[item] = downloadedObj;
                // Extracts trend values from the downloaded object.
                this.extractTrendsValueFromObj(item);
            });
        
        
    }
    // Method for downloading UK Biobank (UKBB) data.
    downloadUKBBElement(item) {
        Fetcher(this.ukbbUrl[item]).then(function (downloadedObj) {
            // Stores the downloaded UKBB data.
            this.ukbbDictOfObjs[item] = downloadedObj;
        });
    }
    // Method to extract trend values from an object.
    extractTrendsValueFromObj(item) {  
            // Temporary array to hold extracted values.      
            let temp = this.trendsDictOfObjs[item];
            let tempArray=[];
            //TODO!!!!!!!!!!!!!
            // replace enddate with new global variable that signifies filesize
            // Loops through the data to extract values.
            for (let j = 0; j < endDate; j++) {
                // Pushes each value into the temporary array.
                tempArray.push(temp[j].value);
            }
            // Stores the extracted values in 'trendsDictOfValues'.
            this.trendsDictOfValues[item]=tempArray;
            // Slices the array for chart display based on start and end dates.
            this.trendsDictOfValues_ForChart[item] = this.trendsDictOfValues[item].slice(startDate, endDate);
           
    }
    // a method to extract weather values from an object.
    extractWeatherValueFromObj(item) {
        

            let temp = this.weatherDictOfObjs[item];
            // Temporary array for extracted values.
            let tempArray=[]; 
          

            if(this.dates.length===0){ 
                // An array for storing dates if not already populated.
                let tempDateArray=[];
                // Loops through the data to extract dates and values.
                for (let j = 0; j < endDate; j++) {                   
                    tempDateArray.push(temp[j].date);
                    tempArray.push(temp[j].value);
                }
                // Processing dates for display, adjusting labels for readability.
                // Conditions to modify date labels based on the total number of dates.
                tempDateArray.forEach(function(label,i){
                    if(tempDateArray.length<60 && tempDateArray.length>36)
                    {
                        if(i % 2 == 1 && i<tempDateArray.length-1)
                        { 
                            tempDateArray[i] = '';
                        }
                    }
                    if(tempDateArray.length>=60){
                        if(i % 3 != 0 && i>0 && i<tempDateArray.length-1){
                            tempDateArray[i] = '';
                        }
                    }
                });
                // Stores the processed dates in 'dates'.
                this.dates=tempDateArray;
            }
           else{
                for (let j = 0; j < endDate; j++) {
                // Extracts values if dates are already set.
                tempArray.push(temp[j].value);
            }
           }
            //TODO!!!!!!!!!!!!!
            // replace enddate with new global variable that signifies filesize
            // Stores extracted values and slices the array for chart display
            this.weatherDictOfValues[item]=tempArray;
            this.weatherDictOfValues_ForChart[item] = this.weatherDictOfValues[item].slice(startDate, endDate);
        
    }
    // Method to update the date range for weather data.
    updateWeatherDate(item) {
       
        // Slices the weather values array based on the specified date range.
        this.weatherDictOfValues_ForChart[item] = this.weatherDictOfValues[item].slice(startDate, endDate);
        
    }
    // Similar method for updating the date range for trend data.
    updateTrendsDate(item) {
       // Slices the trend values array for the specified date range.
        this.trendsDictOfValues_ForChart[item] = this.trendsDictOfValues[item].slice(startDate, endDate);
        
    }
// Method to update all date labels for the charts with single call.
    updateAllDates() 
    {
        // Calls a function to get date ranges.
        getDate();
        
        // Accesses the first trends object for date reference.
        let temp = this.trendsDictOfObjs[Object.keys(this.trendsDictOfObjs)[0]];
        
        let tempArray=[];
        for (let j = startDate; j < endDate; j++) {
            // Collects date labels within the specified range.
            tempArray.push(temp[j].date)
        }
        // Processing date labels for readability.
        // Conditions to modify date labels based on the total number of dates.
        tempArray.forEach(function(label,i){
            if(tempArray.length<60 && tempArray.length>36)
            {
                if(i % 2 == 1 && i<tempArray.length-1)
                { 
                    tempArray[i] = '';
                }
            }
            if(tempArray.length>=60){
                if(i % 3 != 0 && i>0 && i<tempArray.length-1){
                    tempArray[i] = '';
                }
            }
        });
        // Updates the 'dates' array with the processed labels.
        this.dates = tempArray;
        // Updates the date ranges for weather and trends data.
        this.weather.forEach(this.updateWeatherDate.bind(this));
        this.trends.forEach(this.updateTrendsDate.bind(this));
        window.myLine.config.data.labels=this.dates;
        // Updates the chart with the new dates and redraws it.
        window.myLine.update();
    }
    // getter for trends from DataRecord class
    getTrends() {
        return this.trends;
    }
     // getter for weather from DataRecord class
    getWeather() {
        return this.weather;
    }
     // Retrieves trend data for a specific trend and region.
    getTrendByTrendAndRegion(trendName, region) {
        return this.trendsDictOfValues_ForChart[trendName + region];
    }
     // Retrieves weather data for a specific type and region.
    getWeatherByWeatherAndRegion(weatherName, region) {
        return this.weatherDictOfValues_ForChart[weatherName + region];
    }
    // The 'featureChangeHandler' method updates the chart based on user-selected options.
    featureChangeHandler() {
         // Queries the DOM for selected checkboxes.
        let trendsBoxes = document.querySelectorAll('input[name=' + trendsCheckboxName + ']:checked');
        let weatherBoxes = document.querySelectorAll('input[name=' + weatherCheckboxName + ']:checked');
        let regionBoxes = document.querySelectorAll('input[name=' + regionCheckboxName + ']:checked');
       //Empties the data from chart object
        config.data.datasets.splice(0, config.data.datasets.length)
        // config.data.datasets.push(newDataset);
        // Loop to process the selected features and update the chart datasets.
        for (let regionIndex = 0; regionIndex < regionBoxes.length; regionIndex++) {
            for (let trendsIndex = 0; trendsIndex < trendsBoxes.length; trendsIndex++) {

                 // Creates a new dataset for the chart using trend data.
                let newDataset = {
                    label: trendsBoxes[trendsIndex].value + regionBoxes[regionIndex].value,
                    data: this.trendsDictOfValues_ForChart[trendsBoxes[trendsIndex].value + regionBoxes[regionIndex].value],
                    yAxisID: lineAxisId,
                    fill: false,
                    order: 1
                };
                // Adds the new dataset to the chart configuration.
                config.data.datasets.push(newDataset);
            }
             // Creates another dataset for the chart using weather data.
            for (let weatherIndex = 0; weatherIndex < weatherBoxes.length; weatherIndex++) {
                let newDataset = {
                    label: weatherBoxes[weatherIndex].value + regionBoxes[regionIndex].value,
                    data: this.weatherDictOfValues_ForChart[weatherBoxes[weatherIndex].value + regionBoxes[regionIndex].value],
                    yAxisID: lineAxisId,
                    fill: false,
                    order: 1
                };
                // Adds the weather dataset to the chart configuration.
                config.data.datasets.push(newDataset);
            }
        }
        // Updates the chart labels and colors.
        window.myLine.config.data.labels=this.dates;
        chartColors();
        // window.myLine.update();
        

    }
    // This method creates the select elements for trends and weather categories for the user interface.
    createSelect() {
        // Accesses a DOM element container for the select elements.
        let childrenContainer = document.getElementById("containerTest");
        
        for (let i = 0; i < this.fullJson.trends.length; i++) {
            // Creates a new div element for each trend, assigning it a class name.
            let divElement=document.createElement("Div");
            divElement.className="gbGridTrends";
            

            // Creates a checkbox input element for each trend.
            let option = document.createElement("input");
            option.type = 'checkbox';
            option.name = trendsCheckboxName;
            option.value = this.fullJson.trends[i].Name;
            option.id = this.fullJson.trends[i].Name;
            option.className="checkers";
            // Adds an event listener to the checkbox to handle changes (selection/deselection).
            option.addEventListener('change', this.featureChangeHandler.bind(this));
            //creates text label for the created trend button
            let trends="TRENDS";
            let newLine = document.createElement("BR");
            let labelForButton = document.createElement('P');
            labelForButton.className="checkerTitles";
            labelForButton.appendChild(document.createTextNode(trends));
            labelForButton.appendChild(newLine);
            labelForButton.appendChild(document.createTextNode(this.fullJson.trends[i].Name));
            divElement.appendChild(labelForButton);
            divElement.appendChild(option);
             
            // Appends the complete div element to the container in the DOM.
            childrenContainer.appendChild(divElement);
            // This process repeats for each trend, creating a series of checkboxes for user interaction.
        }
        for (let i = 0; i < this.fullJson.weather.length; i++) {
            let divElement=document.createElement("Div");
            divElement.className="gbGrid";
            // Creates a checkbox input element for each weather data item.
            let option = document.createElement("input");
            option.type = 'checkbox';
            option.name = weatherCheckboxName;
            option.value = this.fullJson.weather[i].Name;
            option.id = this.fullJson.weather[i].Name;
            option.className="checkers";
            // Adds an event listener to handle changes (selection/deselection) of the checkbox.
            option.addEventListener('change', this.featureChangeHandler.bind(this));
            // Creates a label for each weather data checkbox, including the data name.
            var labelForButton = document.createElement('P');
            let Weather="WEATHER";
            let newLine = document.createElement("BR");
            labelForButton.className="checkerTitles";
            // Appends the label and checkbox to the div element.
            labelForButton.appendChild(document.createTextNode(Weather));
            labelForButton.appendChild(newLine);
            labelForButton.appendChild(document.createTextNode(this.fullJson.weather[i].Name));
            
            
            divElement.appendChild(labelForButton);
            divElement.appendChild(option);
            // Appends the complete div element to the container in the DOM.
            // This process repeats for each weather data item, creating checkboxes for user interaction.            
            childrenContainer.appendChild(divElement);
        }
    }


    // this.createSelect = function (){
    // let childrenContainer = document.getElementById("containerTest");
    // let select = document.createElement("select");
    // select.setAttribute("name", "selectFeatures");
    // select.setAttribute("id", "selectFeatures");
    // for(let i=0;i<this.trends.length;i++){
    //     let option = document.createElement("option");
    //     option.setAttribute("value", this.trends[i]);
    //     option.innerHTML = this.trends[i];
    //     select.appendChild(option);
    // }
    // for(let i=0;i<this.weather.length;i++){
    //     let option = document.createElement("option");
    //     option.setAttribute("value", this.weather[i]);
    //     option.innerHTML = this.weather[i];
    //     select.appendChild(option);
    // }
    // childrenContainer.appendChild(select)
    // };
    // downloadDatasets() {
    //     this.downloadJson();

    //     getDate();
    //     this.trends.forEach(this.downloadTrendElement);
    //     this.weather.forEach(this.downloadWeatherElement);
    //     this.ukbb.forEach(this.downloadUKBBElement);


    // setupData() {
    //     console.log("setup alkoi");
    //     getDate();
    //     this.trends.forEach(this.downloadTrendElement).then(    () =>     this.trends.forEach(this.extractTrendsValueFromObj)).then(  ()=>this.updateAllDates());
    //     this.weather.forEach(this.downloadWeatherElement).then( () =>     this.weather.forEach(this.extractWeatherValueFromObj)).then(()=>{this.createSelect();createEventListeners();});
    //     this.ukbb.forEach(this.downloadUKBBElement);





    //     this.trends.forEach(this.extractTrendsValueFromObj);
    //     this.weather.forEach(this.extractWeatherValueFromObj);
    //     // this.ukbb.forEach(this.downloadUKBBElement);

    //     this.createSelect();
    // }

        // This method is responsible for setting up event listeners for date selectors in the User Interface.
    createEventListeners() {

    // ChangeListeners  
    // Adds an event listener to the element with ID 'Start Date Year'.
    // This listener triggers the 'updateAllDates' method when the start year is changed.
    // The use of 'bind(this)' ensures that the 'updateAllDates' method has the correct context (referring to the current instance of the class).
    // This setup allows the application to respond dynamically to changes in the selected start year.
        document.getElementById('Start Date Year').addEventListener('change',this.updateAllDates.bind(this));

    // Similar to the previous segment, this line adds an event listener to the 'Start Date Month' element.
    // The event listener also calls 'updateAllDates' when the start month is changed, allowing the application to update the data display based on the selected start month.
    // This contributes to the interactivity of the application, enabling users to adjust the time range of the data they are viewing.
        document.getElementById('Start Date Month').addEventListener('change',this.updateAllDates.bind(this));

    // Adds an event listener to the element with the ID 'End Date Year'.
    // This listener is responsible for invoking the 'updateAllDates' method when there's a change in the end year selection.
    // The binding with 'this' ensures that the context within the 'updateAllDates' method refers to the current instance of the class.
    // This functionality allows users to dynamically adjust the end year of the data range they are exploring, enhancing the interactivity of the data visualization.
        document.getElementById('End Date Year').addEventListener('change',this.updateAllDates.bind(this));

    // This line adds an event listener to the 'End Date Month' element.
    // Like the previous event listener, it triggers the 'updateAllDates' method when the end month selection is changed by the user.
    // This allows the application to update the displayed data in response to user-selected changes in the end month of the time range.
    // These event listeners collectively enable a dynamic and responsive user experience in adjusting the time period for the data displayed.
        document.getElementById('End Date Month').addEventListener('change', this.updateAllDates.bind(this));

    


    //Changelisteners for regions
    // These lines add event listeners to elements representing different regions (UK, England, Northern Ireland, Scotland, Wales).
    // The 'featureChangeHandler' method is bound to each listener, ensuring the chart updates when a region is selected or deselected.
        document.getElementById('UK').addEventListener('change', this.featureChangeHandler.bind(this));
        document.getElementById('ENG').addEventListener('change', this.featureChangeHandler.bind(this));
        document.getElementById('NIR').addEventListener('change', this.featureChangeHandler.bind(this));
        document.getElementById('SCT').addEventListener('change', this.featureChangeHandler.bind(this));
        document.getElementById('WLS').addEventListener('change', this.featureChangeHandler.bind(this));
        document.getElementById('blackWhite').addEventListener('change', colorChangeHandler);

}

   // Methods in Constructor are called when an instance of DataRecord is created
    // This constructor method outlines the initial setup process when an instance of the class is created, including data fetching, UI initialization, and event listener setup.
    constructor() {
        // Fetches JSON data using 'getJsonWrapper' and sets 'fullJson' to the downloaded data.
        getJsonWrapper(jsonUrl).then((downloadedjson) => {
            this.fullJson = downloadedjson.datafiles;
            // Calls 'downloadJson' method to process the downloaded JSON data.
            this.downloadJson();
            // Retrieves or sets date-related information, possibly for initializing date selectors.
            getDate();
            // Iterates over trends to download individual trend elements.
            this.trends.forEach(this.downloadTrendElement.bind(this));

           // Similarly, iterates over weather data to download elements
            this.weather.forEach(this.downloadWeatherElement.bind(this));
            // Calls 'createSelect' to create user interface elements for data selection.
            this.createSelect();
            // Sets up event listeners for interactive functionality.
            this.createEventListeners();
          
            // this.ukbb.forEach(this.downloadUKBBElement.bind(this));
           
        }
        )


    }
}



// function featureChangeHandler(datarecord) {
//     console.log(this.fullJson);
//     let trendsBoxes = document.querySelectorAll('input[name=' + trendsCheckboxName + ']:checked');
//     let weatherBoxes = document.querySelectorAll('input[name=' + weatherCheckboxName + ']:checked');
//     let regionBoxes = document.querySelectorAll('input[name=' + regionCheckboxName + ']:checked');
    
//     config.data.datasets.splice(0, config.data.datasets.length)
//     // config.data.datasets.push(newDataset);
//     for (let regionIndex = 0; regionIndex < regionBoxes.length; regionIndex++) {
//         for (let trendsIndex = 0; trendsIndex < trendsBoxes.length; trendsIndex++) {


//             let newDataset = {
//                 label: trendsBoxes[trendsIndex].value + regionBoxes[regionIndex].value,
//                 data: datarecord.trendsDictOfValues_ForChart[trendsBoxes[trendsIndex].value + regionBoxes[regionIndex].value],
//                 yAxisID: lineAxisId,
//                 fill: false,
//                 order: 1
//             };
//             config.data.datasets.push(newDataset);
//         }
//         for (let weatherIndex = 0; weatherIndex < weatherBoxes.length; weatherIndex++) {
//             let newDataset = {
//                 label: weatherBoxes[trendsIndex].value + regionBoxes[regionIndex].value,
//                 data: datarecord.weatherDictOfValues_ForChart[weatherBoxes[weatherIndex].value + regionBoxes[regionIndex].value],
//                 yAxisID: lineAxisId,
//                 fill: false,
//                 order: 1
//             };
//             config.data.datasets.push(newDataset);
//         }
//     }
//     chartColors();
//     window.myLine.update();

// }


// 'daterows' is an object mapping years to a pair of indices. 
// These indices represent the start and end points in a dataset for each year.
let daterows = { '2006': [0, 12], '2007': [12, 24], '2008': [24, 36], '2009': [36, 48], '2010': [48, 60], '2011': [60, 72], '2012': [72, 84], '2013': [84, 96], '2014': [96, 108], '2015': [108, 120], '2016': [120, 132], '2017': [132, 144], '2018': [144, 156], '2019': [156, 168], '2020': [168, 180] }

// Region selection elements from the DOM
// These variables are references to DOM elements,checkboxes and a button,
// which allow the user to select different regions or options.
let isUk = document.getElementById("UK");
let isEng = document.getElementById("ENG");
let isNir = document.getElementById("NIR");
let isSct = document.getElementById("SCT");
let isWls = document.getElementById("WLS");
let isWhite = document.getElementById("blackWhite");
/*const COLORS = interpolateColors(36);*/


// Line chart and bar chart configuration variables
// 'startDate' and 'endDate' are variables to hold date range values.
// 'xValues' and 'yValues' are arrays for storing data points for the chart.
// 'config' is an array or object for chart configuration settings.
let startDate;
let endDate;
var xValues = [];
var yValues = [];
var config = [];


//linechart variables
// 'lineAxisId' identifies the Y-axis for the line chart.
// 'lineBorderWidth' sets the width of the line in the line chart.
let lineAxisId = "ylineScale";
let lineBorderWidth = 3;

// These variables configure the bar chart, setting axis IDs, bar thickness,
// maximum bar thickness, and bar percentage.
let barAxisID = "ybarScale";
let barAxisHappinessID = "ybarScaleHappiness";
// 'barChartBarThickness' allows for flexible bar thickness in the bar chart, 
// likely adjusting based on the amount of data or chart dimensions.
let barChartBarThickness = 'flex';

// 'barChartMaxBarThickness' defines the maximum thickness of bars in the bar chart.
let barChartMaxBarThickness = 154;
// 'barChartBarPercentage' specifies the width of the bars as a percentage of the available space.
let barChartBarPercentage = 0.8;
// Sets the width of the bar chart's categories as a percentage of the available space in the chart.
let barChartCategoryPercentage = 1.0;
// Specifies the spacing between the bar values and the bars themselves in the bar chart.
let barChartBarValueSpacing = 500;
// These settings determine whether the gridlines and bars in the bar chart are offset or not.
let barChartOffsetGridlines = false;
let barChartOffset = false;
// This function creates a new chart on the given canvas element using the specified configuration.
function getNewChart(canvas, config) {
    return new Chart(canvas, config);
}
// 'CheckList' function checks if a dataset with the given label exists within the chart configuration.
function CheckList(labelToFind) {
    for (let i = 0; i < config.data.datasets.length; i++) {
        if (config.data.datasets[i].label == labelToFind) {
            return true;
        }
    } return false;
}
// 'setStart' initializes default values for end date year and month, and sets the UK checkbox as checked.
function setStart() {
    document.getElementById("End Date Year").value = 156;
    document.getElementById("End Date Month").value = 12;
    isUk.checked = true;

}
// Calls 'setStart' to apply the initial default settings.
setStart();
// 'dataHandler' is instantiated from 'DataRecord', presumably a custom class or function for managing data.
let dataHandler = new DataRecord();

// 'chart' is a variable likely used to store the chart instance.
// 'currentPalette' specifies a color scheme, in this case, a "neon" palette.
var chart;
var currentPalette = "neon";
// Definition and sorting of a gradient color scheme for chart visualization
function UKBBHapColors() {
    // 'gradient' object stores RGBA color values at specified points (0 to 100),
    // creating a custom gradient. 'gradientKeys' are sorted to ensure correct color transitions.
    let gradient = {

        0: [255, 255, 255, 1],
        20: [255, 236, 179, 1],
        45: [232, 82, 133, 1],
        65: [106, 27, 154, 1],
        100: [0, 0, 0, 1]


    };
    var gradientKeys = Object.keys(gradient);
    gradientKeys.sort(function (a, b) {
        return +a - +b;
    });
    var chartColors = [];
    var count = 6;
    // This loop generates a set of colors from the defined gradient to be used in the chart.
    // It calculates intermediate colors if a specific gradient index doesn't exactly match a gradient key.
    for (i = 0; i < count; i++) {
        var gradientIndex = (i + 1) * (100 / (count + 1)); //Find where to get a color from the gradient
        for (j = 0; j < gradientKeys.length; j++) {
            var gradientKey = gradientKeys[j];
            if (gradientIndex === +gradientKey) { //Exact match with a gradient key - just get that color
                chartColors[i] = 'rgba(' + gradient[gradientKey].toString() + ')';
                break;
            } else if (gradientIndex < +gradientKey) { //It's somewhere between this gradient key and the previous
                var prevKey = gradientKeys[j - 1];
                var gradientPartIndex = (gradientIndex - prevKey) / (gradientKey - prevKey); //Calculate where
                var color = [];
                for (k = 0; k < 4; k++) { //Loop through Red, Green, Blue and Alpha and calculate the correct color and opacity
                    color[k] = gradient[prevKey][k] - ((gradient[prevKey][k] - gradient[gradientKey][k]) * gradientPartIndex);
                    if (k < 3) color[k] = Math.round(color[k]);
                }
                chartColors[i] = 'rgba(' + color.toString() + ')';
                break;
            }
        }
    }
    return chartColors;
}
// The UKBBDepColors function is similar to UKBBHapColors but with a different gradient. 
// It also calculates and returns an array of interpolated colors for the chart based on the defined gradient.
function UKBBDepColors() {

    let gradient = {
        0: [255, 255, 255, 1],
        20: [254, 235, 101, 1],
        45: [228, 82, 27, 1],
        65: [77, 52, 47, 1],
        100: [0, 0, 0, 1]
    };
    var gradientKeys = Object.keys(gradient);
    gradientKeys.sort(function (a, b) {
        return +a - +b;
    });


    var chartColors = [];
    var count = 4;
    for (i = 0; i < count; i++) {
        var gradientIndex = (i + 1) * (100 / (count + 1)); //Find where to get a color from the gradient
        for (j = 0; j < gradientKeys.length; j++) {
            var gradientKey = gradientKeys[j];
            if (gradientIndex === +gradientKey) { //Exact match with a gradient key - just get that color
                chartColors[i] = 'rgba(' + gradient[gradientKey].toString() + ')';
                break;
            } else if (gradientIndex < +gradientKey) { //It's somewhere between this gradient key and the previous
                var prevKey = gradientKeys[j - 1];
                var gradientPartIndex = (gradientIndex - prevKey) / (gradientKey - prevKey); //Calculate where
                var color = [];
                for (k = 0; k < 4; k++) { //Loop through Red, Green, Blue and Alpha and calculate the correct color and opacity
                    color[k] = gradient[prevKey][k] - ((gradient[prevKey][k] - gradient[gradientKey][k]) * gradientPartIndex);
                    if (k < 3) color[k] = Math.round(color[k]);
                }
                chartColors[i] = 'rgba(' + color.toString() + ')';
                break;
            }
        }
    }
    return chartColors;

}
function chartColors(palette) {
    if (!palette) palette = currentPalette;
    currentPalette = palette;

    /*Gradients
      The keys are percentage and the values are the color in a rgba format.
      You can have as many "color stops" (%) as you like.
      0% and 100% is not optional.*/
    var gradient;

    switch (palette) {



        case 'neon':
            gradient = {
                0: [0, 0, 0, 1],
                20: [146, 8, 112, 1],
                40: [198, 53, 11, 1],
                60: [24, 41, 136, 1],
                80: [7, 130, 96, 1],
                100: [255, 255, 255, 1]
            };
            break;
    }

    //Get a sorted array of the gradient keys
    var gradientKeys = Object.keys(gradient);
    gradientKeys.sort(function (a, b) {
        return +a - +b;
    });

    
    // Retrieving datasets and their count
    var datasets = window.myLine.config.data.datasets;
    var setsCount = datasets.length;






    // Calculating chart colors based on the gradient
    var chartColors = [];
    for (i = 0; i < setsCount; i++) {
        var gradientIndex = (i + 1) * (100 / (setsCount + 1)); //Find where to get a color from the gradient
        for (j = 0; j < gradientKeys.length; j++) {
            var gradientKey = gradientKeys[j];
            if (gradientIndex === +gradientKey) { //Exact match with a gradient key - just get that color
                chartColors[i] = 'rgba(' + gradient[gradientKey].toString() + ')';
                break;
            } else if (gradientIndex < +gradientKey) { //It's somewhere between this gradient key and the previous
                var prevKey = gradientKeys[j - 1];
                var gradientPartIndex = (gradientIndex - prevKey) / (gradientKey - prevKey); //Calculate where
                var color = [];
                for (k = 0; k < 4; k++) { //Loop through Red, Green, Blue and Alpha and calculate the correct color and opacity
                    color[k] = gradient[prevKey][k] - ((gradient[prevKey][k] - gradient[gradientKey][k]) * gradientPartIndex);
                    if (k < 3) color[k] = Math.round(color[k]);
                }
                chartColors[i] = 'rgba(' + color.toString() + ')';
                break;
            }
        }
    }
    let uKBBHapColors = UKBBHapColors();
    let uKBBDepColors = UKBBDepColors();
    let hapCounter = 0;
    let depCounter = 0;
    let linecounter = 0;
    //Copy colors to the chart
    for (i = 0; i < datasets.length; i++) {

        if (datasets[i].yAxisID !== 'ylineScale') {
            if (datasets[i].label.includes("UKBB Happiness")) {
                datasets[i].backgroundColor = uKBBHapColors[hapCounter];
                datasets[i].borderColor = uKBBHapColors[hapCounter];
                hapCounter++;
            }
            else {

                datasets[i].borderColor = uKBBDepColors[depCounter];
                datasets[i].backgroundColor = uKBBDepColors[depCounter];
                depCounter++;
            }
        }
        else {
            datasets[i].borderColor = chartColors[linecounter];
            datasets[i].backgroundColor = chartColors[linecounter];
            linecounter++;
        }
    }





    //Update the chart to show the new colors
    window.myLine.update();
}
// Handler function for changing chart colors based on certain conditions
// The 'colorChangeHandler' function adjusts the chart's appearance based on user interactions,
// such as changing the background color and reinitializing the chart with new configurations.
function colorChangeHandler() {
    if (!isWhite.checked) {
        let chartCanvas = document.getElementById('myChart');
        chartCanvas.style.backgroundColor = "#ffffff";
        let chartDataSetsTemp = config.data.datasets;
        window.myLine.destroy();
        // Reconfiguring the chart with updated settings
        // This section defines the configuration for the chart scales and axes.
        // It includes settings for tick colors, grid display and colors, and whether the axes are stacked.
        // 'ylineScale', 'ybarScale', and 'ybarScaleHappiness' are configured with specific properties for display and stacking.
            
        config = {
            type: "line",
            data: {
                labels: dataHandler.dates,
                datasets: chartDataSetsTemp
            },
            options: {

                elements: {
                    line: {
                        tension: 0
                    }
                },


                transitions: {
                    show: {
                        animations: {
                            x: {
                                from: 0
                            },
                            y: {
                                from: 0
                            }
                        }
                    },
                    hide: {
                        animations: {
                            x: {
                                to: 0
                            },
                            y: {
                                to: 0
                            }
                        }
                    }
                },

                // legend: { display: false },
                // Configuration of scales and axes for the chart
                scales: {

                    x: {
                        ticks: {
                            color: 'rgba(0,0,0,1)',
                        },
                        grid: {
                            offsetGridLines: barChartOffsetGridlines,
                            display: true,
                            color: 'rgba(0,0,0,1)'
                        },
                        stacked: true
                    },
                    ylineScale: {
                        ticks: {
                            color: 'rgba(0,0,0,1)',
                        },
                        grid: {
                            display: true,
                            color: 'rgba(0,0,0,1)'
                        },
                        stacked: false,

                        display: true
                    },
                    ybarScale: {
                        grid: {
                            display: true,
                            color: 'rgba(0,0,0,1)'
                        },
                        stacked: true,
                        // id: 'bar-scale',
                        display: false,

                    },
                    ybarScaleHappiness: {
                        grid: {
                            display: false,
                            color: 'rgba(0,0,0,1)'
                        },
                        stacked: true,
                        // id: 'bar-scale-happiness',
                        display: false,
                    }

                }
            }



        };

        var chart = document.getElementById("myChart").getContext("2d");
        window.myLine = getNewChart(chart, config);








    } else {
        let chartCanvas = document.getElementById('myChart');
        chartCanvas.style.backgroundColor = "#000000";

        let chartDataSetsTemp = config.data.datasets;
        window.myLine.destroy();

        config = {
            type: "line",
            data: {
                labels: dataHandler.dates,
                datasets: chartDataSetsTemp
            },
            options: {

                elements: {
                    line: {
                        tension: 0
                    }
                },

                transitions: {
                    show: {
                        animations: {
                            x: {
                                from: 0
                            },
                            y: {
                                from: 0
                            }
                        }
                    },
                    hide: {
                        animations: {
                            x: {
                                to: 0
                            },
                            y: {
                                to: 0
                            }
                        }
                    }
                },

                // legend: { display: false },
                scales: {

                    x: {
                        ticks: {
                            color: 'rgba(255,255,255,1)',
                        },
                        grid: {
                            offsetGridLines: barChartOffsetGridlines,
                            display: true,
                            color: 'rgba(255,255,255,1)'
                        },
                        stacked: true,
                        display: true
                    },
                    ylineScale: {
                        ticks: {
                            color: 'rgba(255,255,255,1)'
                        },
                        grid: {
                            display: true,
                            color: 'rgba(255,255,255,0.8)'
                        },
                        stacked: false,





                    },
                    ybarScale: {
                        grid: {
                            display: true,
                            color: 'rgba(255,255,255,1)'
                        },
                        stacked: true,
                        // id: 'bar-scale',
                        display: false,

                    },
                    ybarScaleHappiness: {
                        grid: {
                            display: false,
                            color: 'rgba(255,255,255,1)'
                        },
                        stacked: true,
                        // id: 'bar-scale-happiness',
                        display: false,
                    }

                }
            }



        };
        var chart = document.getElementById("myChart").getContext("2d");
        window.myLine = getNewChart(chart, config);

    }
    chartColors();
}





//Function to retrieve year and month values from the document and parse them to integers.
// 'startDate' and 'endDate' are calculated by adding the year and month numbers together.

function getDate() {
    // Code for retrieving date values from the user interface
    let startYearNumber = document.getElementById("Start Date Year").value;
    let endYearNumber = document.getElementById("End Date Year").value;
    let startMonthNumber = document.getElementById("Start Date Month").value;
    let endMonthNumber = document.getElementById("End Date Month").value;

    startDate = parseInt(startYearNumber) + parseInt(startMonthNumber);
    endDate = parseInt(endYearNumber) + parseInt(endMonthNumber);
    if (startDate > endDate - 1) {
        document.getElementById("End Date Year").value = document.getElementById("Start Date Year").value;
        document.getElementById("End Date Month").value = parseInt(startMonthNumber) + 1;

    }
    startYearNumber = document.getElementById("Start Date Year").value;
    endYearNumber = document.getElementById("End Date Year").value;
    startMonthNumber = document.getElementById("Start Date Month").value;
    endMonthNumber = document.getElementById("End Date Month").value;
    startDate = parseInt(startYearNumber) + parseInt(startMonthNumber);
    endDate = parseInt(endYearNumber) + parseInt(endMonthNumber);

}






// 'config' sets up the initial configuration for the line chart, including data labels and options for elements, transitions, and scales.
// The x-axis grid color changes based on the index, highlighting specific points (e.g., start of a new year).

var config = {
    type: "line",
    data: {
        labels: dataHandler.dates,
        datasets: []
    },
    options: {

        elements: {
            line: {
                tension: 0
            }
        },

        transitions: {
            show: {
                animations: {
                    x: {
                        from: 0
                    },
                    y: {
                        from: 0
                    }
                }
            },
            hide: {
                animations: {
                    x: {
                        to: 0
                    },
                    y: {
                        to: 0
                    }
                }
            }
        },

        // legend: { display: false },
        scales: {

            x: {
                ticks: {
                    autoSkip:false,
                    color: 'rgba(0,0,0,1)'
                },
                grid: {
                    // offsetGridLines: barChartOffsetGridlines,
                    display: true,
                    color: (c)=> {
                        if(c.index % 12== 0 ){
                            return 'rgba(255,0,0,1)' 
                        }else{
                            return 'rgba(0,0,0,1)' 
                        }
                    }
                },
                stacked: true,
                display: true
            },
            ylineScale: {
                ticks: {
                    color: 'rgba(0,0,0,1)'
                },
                grid: {
                    display: true,
                    color:'rgba(0,0,0,1)'
                },
                stacked: false,
            }
           

        }
    }



};

// Initializes the chart in a 2D context, applying the specified configuration.
// Sets the global line border width for the chart.
var chart = document.getElementById("myChart").getContext("2d");
window.myLine = getNewChart(chart, config);
Chart.overrides.line.borderWidth = lineBorderWidth;


// Hides the loading screen, indicating that the chart is now ready and displayed.
document.getElementById("loadingScreen").style.visibility = "hidden";







