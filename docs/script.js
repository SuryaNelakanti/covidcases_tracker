

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
        cumulativeApi(did)
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


//chart JS below
var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['August','September','October','November','Dec','Jan', 'Feb', 'March', 'April', 'May', 'June','July'],
        datasets: [{
            label: '7 day average of cases',
            data: [52583,77596,82214,45622,38400, 16799, 12899, 18825, 65211, 392488,175167,46979],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(225, 59, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 102, 255, 1)'
            ],
            borderWidth: 1,
            tension: 0.4
        }]
    },
    options: {
        response: true,
        plugins:{
            
            legend:{
                labels:{
                    diplay: true,
                    color: 'rgb(255, 99, 132)'
                }
            }
        },
        scales: {
            y: {
                beginAtZero: false
            }
        }
    }
});



