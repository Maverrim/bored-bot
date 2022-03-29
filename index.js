const activityBtn = document.querySelector('.random-activity__btn');
const clearBtn = document.querySelector('.random-activity__clear-btn');
const activityHolder = document.querySelector('.activity-holder');

let earlierActivity = [];

let leadsFromLocalStorage = JSON.parse( localStorage.getItem("prevActivities") );

if (leadsFromLocalStorage) {
    earlierActivity = leadsFromLocalStorage
    renderPrevActivity();
}

function renderPrevActivity() {
    let prev = ``;
    
    for (let activity of earlierActivity) {
        prev += `<li class="previous-activity">${activity}</li>`;
        activityHolder.innerHTML = prev;
    }
    
    localStorage.setItem("prevActivities", JSON.stringify(earlierActivity) );
}

const randomActivity = () => {
    fetch("https://apis.scrimba.com/bored/api/activity")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        document.getElementById("activity-name").textContent = data.activity
        earlierActivity.push(data.activity);
    });
    
    
    
    renderPrevActivity();
};

const clearList = () => {
    localStorage.clear();
    earlierActivity = [];
    activityHolder.innerHTML = '';
}


activityBtn.addEventListener('click', randomActivity);
clearBtn.addEventListener('click', clearList);
