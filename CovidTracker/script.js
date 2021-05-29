

//fetching the JSON data asynchronously
var value
var jsonData
var apiUrl="https://api.covid19india.org/v4/min/data.min.json"
async function getJson(url){
    let response = await fetch(url)
    let data = await response.json()
    value = data
    return data
}
async function main(){
    jsonData = await getJson(apiUrl)
    //value = JSON.stringify(jsonData);
    dataCumulative(jsonData,"TT")
}
main()


//total cases (7 dma)
function dataCumulative(data, stateID){
    let caseLoad=(data[stateID]['total']['confirmed']-data[stateID]['total']['recovered']-data[stateID]['total']['deceased']-data[stateID]['total']['other']);
    var confirmed = (data[stateID]['total']['confirmed'])
    var recovered = (data[stateID]['total']['recovered'])
    let updatedDate =(data['TT']['meta']['last_updated'])
    updatedDate = updatedDate.substring(0,10)
    document.getElementById("cloud").innerHTML="Last updated:"+ updatedDate
    document.getElementById("pointHere").innerHTML=caseLoad
    document.getElementById("activeChange").innerHTML=caseLoad
    document.getElementById("totalChange").innerHTML=confirmed
    document.getElementById("recoveredChange").innerHTML=recovered
}      


//form submission and data retrieval
//getting state ID from form
let form = document.getElementById("stateSelect")
form.addEventListener('submit', (event) => {
    let obj = document.getElementById("states")
    let sid = obj.options[obj.selectedIndex].getAttribute("id")
    let stateName = document.getElementById(sid).innerHTML
    document.getElementById('statePoint').innerHTML=stateName
    connectApi(sid)
    // stop form submission
    event.preventDefault();
});




//getting the api data
let bata
function connectApi(did){
    fetch('https://api.covid19india.org/v4/min/data.min.json')
    .then((response) => {
        //literally no idea why this has to be here
        return response.json()
    })
    .then((data) => {
        // Work with JSON data here
        bata = data
        districtCases(did,bata)
    })
    .catch((err) => {
        // Do something for an error here
        console.log("error has occured"+ err)
    })
}

//changing selected data depending on state selected
function districtCases(stateID, apiData){
    let caseLoadDistrict = (apiData[stateID]["total"])
    boxUpdation(caseLoadDistrict)
}

//updating each box 
function boxUpdation(caseLoadDistrict){
    var confirmed = caseLoadDistrict["confirmed"]
    var recovered = caseLoadDistrict["recovered"]
    var active = confirmed-caseLoadDistrict["deceased"]-recovered
    document.getElementById("activeChange").innerHTML=active
    document.getElementById("totalChange").innerHTML=confirmed
    document.getElementById("recoveredChange").innerHTML=recovered
    document.getElementById("pointHere").innerHTML=active

}


