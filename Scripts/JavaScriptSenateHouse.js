document.getElementById("hide").style.display = "none";
document.getElementById("loading").style.display = "block";

var parties = ["r", "d", "i"];
var repCheck = document.getElementById("rep");
var demCheck = document.getElementById("dem");
var indCheck = document.getElementById("ind");
var myValue = document.getElementById("state-selector");
var url = "";
var headers = [];
var staty = {
    "statistics": [
        {
            "Number_Of_Democrats": "57",
            "Number_Of_Republicans": "46",
            "Number_Of_Independients": "2",
            "Total_Of_members": "105",
            "avg_demArray": "96.97",
            "avg_repArray": "87.15",
            "avg_indArray": "95.18",
            "valuesTotal": "93.10",
        }]
};

bigData();

function bigData() {
    if (window.location.href == "https://hernando35.github.io/USWhiteHouse/pageSenate.html") {
        return getDataSenate();
    } else if (window.location.href == "https://hernando35.github.io/USWhiteHouse/pageHouse.html") {
        return getDataHouse();
    } else {
        return "This is a web default"
    }
};


function getDataSenate() {
    fetch('https://api.propublica.org/congress/v1/113/senate/members.json', {
        mode: 'cors',
        headers: {
            "X-API-Key": "VDe0d3uby1cworaINiY9841EYSWiLRN80Jxsem8z"
        }
    }).then(function (response) {
        return response.json();
    }).then(function (data) {

        members = data.results[0].members;
        party = data.results[0].party;
        state = data.results[0].state;
        yearsInOffice = data.results[0].seniority;
        porcentage = data.results[0].votes_with_party_pct;
        titles = data.results[0].title;
        getTableMembers(members);
        takeInfo(members);
        filterParty(data);
        displayLoader();
        showpage();
        loading = false;

    }).catch(function (error) {
        console.log('Request failed', error)
    })
};

function getDataHouse() {
    fetch('https://api.propublica.org/congress/v1/113/house/members.json', {
            mode: 'cors',
            headers: {
                "X-API-Key": "VDe0d3uby1cworaINiY9841EYSWiLRN80Jxsem8z"
            }
        }).then(function (response) {
            return response.json();
        })
        .then(function (data) {

            members = data.results[0].members;
            party = data.results[0].party;
            state = data.results[0].state;
            yearsInOffice = data.results[0].seniority;
            porcentage = data.results[0].votes_with_party_pct;
            titles = data.results[0].title;
            getTableMembers(members);
            filterParty(data);
            takeInfo(members);
            displayLoader();
            showpage();
            loading = false;
        })
        .catch(function (error) {
            console.log('Request failed', error)
        })
}

function takeInfo(members) {
    repCheck.addEventListener("click", function () {
        var filteredArray = filterParty();
        getTableMembers(filteredArray);
    });
    demCheck.addEventListener("click", function () {
        var filteredArray = filterParty();
        getTableMembers(filteredArray);
    });
    indCheck.addEventListener("click", function () {
        var filteredArray = filterParty();
        getTableMembers(filteredArray)
    });
    myValue.addEventListener("change", function () {
        var newArray = filterByParty(members);
        getTableMembers(filteredArray);
    })
};



function getTableMembers(members) {
    var body = document.getElementById("senate-data");
    body.innerHTML = "";
    var tblBody = document.createElement("tbody");
    for (var i = 0; i < members.length; i++) {
        var row = document.createElement("tr");
        name = members[i].first_name + ' ' + (members[i].middle_name || "") + '&nbsp' + members[i].last_name;
        row.insertCell().innerHTML = '<a href = "' + members[i].url + '">' + name + '</a>';
        row.insertCell().innerHTML = members[i].party;
        row.insertCell().innerHTML = members[i].state;
        row.insertCell().innerHTML = members[i].seniority;
        var votes = members[i].votes_with_party_pct;
        row.insertCell().innerHTML = votes + `%`;
        var titles = members[i].title;
        row.insertCell().innerHTML = titles;
        tblBody.appendChild(row);
    } {
        body.appendChild(tblBody);
    }
}

function filterParty(data) {
    var array = [];
    for (var i = 0; i < members.length; i++) {
        if (members[i].state == myValue.value || myValue.value == "All") {
            if (repCheck.checked && members[i].party == "R") {
                array.push(members[i])
            }

            if (demCheck.checked && members[i].party == "D") {
                array.push(members[i])
            }


            if (indCheck.checked && members[i].party == "I") {
                array.push(members[i])
            }
            if (!repCheck.checked && !demCheck.checked && !indCheck.checked) {
                console.log("no checkboxes are selected");
                array.push(members[i])
            }
        }
    }

    return array;
}


function displayLoader() {
    start = setTimeout(showpage, 2000);
};

function showpage() {
    document.getElementById("hide").style.display = "block";
    document.getElementById("loading").style.display = "none";

}
