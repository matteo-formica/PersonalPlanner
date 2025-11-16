

// Theme switcher

const lightModeBtn = document.getElementById('lightModeBtn');
const darkModeBtn = document.getElementById('darkModeBtn');
const themeLink = document.getElementById('themeLink');
const bodyBack= document.getElementById('body');

lightModeBtn.onclick = function() {
    bodyBack.classList.add('light');
    bodyBack.classList.remove('dark');
    lightModeBtn.classList.add('on');
    darkModeBtn.classList.remove('on');
}

darkModeBtn.onclick = function() {
    bodyBack.classList.remove('light');
    bodyBack.classList.add('dark');
    lightModeBtn.classList.remove('on');
    darkModeBtn.classList.add('on');
}


// Navigation logic
const dashboardBtn = document.getElementById('dashboard');
const tasksBtn = document.getElementById('tasks');
const calendarBtn = document.getElementById('calendar');
const meteoBtn = document.getElementById('meteo');
const diaryBtn = document.getElementById('diary');
const dashboardPage = document.getElementById('dashboardPage');
const tasksPage = document.getElementById('tasksPage');
const calendarPage = document.getElementById('calendarPage');
const meteoPage = document.getElementById('meteoPage');
const diaryPage = document.getElementById('diaryPage');

dashboardBtn.onclick = function() {
    dashboardPage.classList.remove('off');
    tasksPage.classList.add('off');
    calendarPage.classList.add('off');
    meteoPage.classList.add('off');
    diaryPage.classList.add('off');
    retrieveTasks();
}

tasksBtn.onclick = function() {
    tasksPage.classList.remove('off');
    dashboardPage.classList.add('off');
    calendarPage.classList.add('off');
    meteoPage.classList.add('off');
    diaryPage.classList.add('off');
    retrieveTasks();
}

calendarBtn.onclick = function() {
    calendarPage.classList.remove('off');
    dashboardPage.classList.add('off');
    tasksPage.classList.add('off');
    meteoPage.classList.add('off');
    diaryPage.classList.add('off');
}

meteoBtn.onclick = function() {
    meteoPage.classList.remove('off');
    dashboardPage.classList.add('off');
    tasksPage.classList.add('off');
    calendarPage.classList.add('off');
    diaryPage.classList.add('off');
}

diaryBtn.onclick = function() {
    diaryPage.classList.remove('off');
    dashboardPage.classList.add('off');
    tasksPage.classList.add('off');
    calendarPage.classList.add('off');
    meteoPage.classList.add('off');
}

// End of navigation logic

//Task logic

// Add a task

async function addTask(description){
    try{
        const response = await fetch('http://localhost:3000/todos', {method : "POST",
            headers : { 
                "Content-Type" : "application/json",                 
            },
            body : JSON.stringify({
                "description" : description,
                "completed" : false,                          
            })
        })
        if(response.ok){
            await retrieveTasks();
        }
        }
    catch(error){
        console.log(error);
    }
    
};

// Flag a Function as completed
async function checkTask(id, description, completed){
    try{
        const response = await fetch('http://localhost:3000/todos/' + id, {method : "PUT",
            headers : { 
                "Content-Type" : "application/json",               
            },
            body : JSON.stringify({
                "id" : id,
                "description" : description,
                "completed" : !completed
            })
        })
        if(response.ok){
            await retrieveTasks();
        }
        }
    catch(error){
        console.log(error);
    }
};


// Delete a task with a click on delete button
async function delTask(id){
    try{
        const response = await fetch('http://localhost:3000/todos/' + id, {method : "DELETE", 
            headers: { 
                "Content-Type" : "application/json",         
            },
            
        });
        if(response.ok){
            await retrieveTasks();
        }
    }
    catch(error){
        console.log(error);
    }
};

const toDoList = document.getElementById('toDoList');
const toDoListPrev = document.getElementById('toDoListPrev');
const taskPage = document.getElementById('tasksPage');

// Fetch Tasks and add EventListener for other functionalities
// Display Tasks in Tasks page

async function retrieveTasks(){
    try{
        const response = await fetch('http://localhost:3000/todos', {
        headers: {
        "Content-Type" : "application/json",
        }
        });
        const tasks = await response.json();
        console.log(tasks);
        if(response.ok && tasks.length > 0){
            toDoListPrev.innerHTML = "";
            toDoList.innerHTML = "";
            tasks.forEach(task => {
                const taskItem = document.createElement('LI');
                taskItem.innerHTML = "<button class='taskDoneBtn'></button>" + task.description + "<button class='taskDelBtn offBtn'>❌</button></li>";
                taskItem.classList.add('taskItem');
                const checkBtn = taskItem.firstChild;
                const delBtn = taskItem.lastChild;
                if(task.completed === true){
                    taskItem.classList.add('completed');
                    checkBtn.innerText= "✅";
                }
                
                taskItem.addEventListener("mouseover", function(){
                    delBtn.classList.remove('offBtn');
                });

                taskItem.addEventListener("mouseout", function(){
                    delBtn.classList.add('offBtn');
                });

                checkBtn.addEventListener('click', function(){
                    checkTask(task.id, task.description, task.completed);
                });

                delBtn.addEventListener('click', function(){
                    taskItem.innerHTML = "";
                    delTask(task.id);
                
                });

                if(taskPage.classList.contains('off')){
                    toDoListPrev.appendChild(taskItem);
                }else{
                    toDoList.appendChild(taskItem);
                };
                
            });   
        }else{
            toDoListPrev.innerHTML = "";
            toDoList.innerHTML = "";
            const taskItem = document.createElement('LI');
            taskItem.innerText = "No Tasks Available. Add Tasks to display here";
            taskItem.setAttribute('id', 'noTask');  
            taskItem.style.fontSize = "0.8em" ;
            taskItem.style.color = "white" 
            if(taskPage.classList.contains('off')){
                    toDoListPrev.appendChild(taskItem);
                }else{
                    toDoList.appendChild(taskItem);
                };
        }
    }    
    catch(error){
        console.log(error);
    };
};


// Task form logic
const formContainer = document.getElementById('addTaskContainer');
const taskForm = document.getElementById('addTaskForm');
const taskFormOpenBtn = document.getElementById('taskFormOpenBtn');
const tasksView = document.getElementById('tasksView');
const closeFormBtn = document.getElementById('closeForm');
const toDoInput = document.getElementById('toDoInput');

const formToggle = function() {
    formContainer.classList.toggle('off');
    tasksView.classList.toggle('blur');
    taskFormOpenBtn.classList.toggle('off');
};


taskFormOpenBtn.onclick = formToggle;
closeFormBtn.onclick = formToggle;

taskForm.addEventListener('submit', function(event){
    event.preventDefault();
    formToggle();
    console.log(toDoInput.value);
    addTask(toDoInput.value);
    toDoInput.value= "";
});

// Tasks logic end

// MeteoPage Logic

const meteoView = document.getElementById('meteoView');
const meteoSearch = document.getElementById('meteoSearch');
const locationName = document.getElementById('cityName');
const meteoSearchBtn = document.getElementById('meteoSearchBtn');
const currentLocation = document.getElementById('currentLocation');
const meteoIcon = document.getElementById('nowIcon');
const meteoCards = document.querySelectorAll('.meteoCard');
const todayMeteoData = document.getElementById('todayMeteoData');
const tomorrowMeteoData = document.getElementById('tomorrowMeteoData')
const rainMeteoData = document.getElementById('rainMeteoData');
const airMeteoData = document.getElementById('airMeteoData');
const fetchingMeteoAlert = document.getElementById('fetchingMeteo');
const fetchingBanner = document.getElementById('fetchingBanner');
const dashboardMeteoIcon = document.getElementById('dashboardMeteoIcon');
const currentTemp = document.getElementById('currentTemp');
const dashCurrentTemp = document.getElementById('dashCurrentTemp');
const dashMeteoAlerts = document.getElementById('dashMeteoAlerts');
const meteoAlerts = document.getElementById('meteoAlerts');

//Fetch meteo data   
const fetchData = async function () {
        
        const startDate = new Date().toISOString().split('T')[0];
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 5);
        const endDateFormatted = endDate.toISOString().split('T')[0];
        let searchedLocation = "";

        // I will add currentPosition logic here
        if(dashboardPage.classList.contains('off')){
            searchedLocation = String(locationName.value).charAt(0).toUpperCase() + String(locationName.value).slice(1);
            const fetchAlert = document.createElement('LI');
            fetchAlert.innerHTML = `<p>Fetching Data for ${searchedLocation}</p>`;
            fetchingBanner.appendChild(fetchAlert);
            meteoView.classList.add('blur');
            fetchingMeteoAlert.classList.toggle('off');
            fetchAlert.innerHTML = '';
        }
        else{
            searchedLocation = "Imperia";
        };
        
        try{
            if(searchedLocation !== ""){
            const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/`+ searchedLocation +`/` + startDate + `/` + endDateFormatted + `?unitGroup=us&include=days%2Chours%2Ccurrent%2Calerts&key=G6DFQ85NGCLXXCP92EYQP73CJ&contentType=json`);
            const meteoData = await response.json();
            console.log(meteoData);
            if(response.ok){
                todayMeteoData.innerHTML= "";
                tomorrowMeteoData.innerHTML= "";

                if(dashboardPage.classList.contains('off')){
                    meteoView.classList.remove('blur');
                    fetchingMeteoAlert.classList.toggle('off');
                }
                currentLocation.innerText = searchedLocation;


                // set meteo icon
                if(meteoData.currentConditions.icon === "clear-night"){
                    meteoIcon.src ='assets/meteoIcon/clear-night.png';
                    dashboardMeteoIcon.src = 'assets/meteoIcon/clear-night.png'
                    meteoIcon.classList.remove('off');
                }
                else if(meteoData.currentConditions.icon === "sunny"){
                    meteoIcon.src = 'assets/meteoIcon/sunny.png';
                    dashboardMeteoIcon.src = 'assets/meteoIcon/sunny.png'
                    meteoIcon.classList.remove('off');
                }
                else if(meteoData.currentConditions.icon === "partly-cloudy-day"){
                    meteoIcon.src = 'assets/meteoIcon/partly-cloudy-day.png';
                    dashboardMeteoIcon.src = 'assets/meteoIcon/partly-cloudy-day.png'
                    meteoIcon.classList.remove('off');
                }
                else if(meteoData.currentConditions.icon === "partly-cloudy-night"){                   
                    meteoIcon.src = 'assets/meteoIcon/partly-cloudy-night.png';
                    dashboardMeteoIcon.src = 'assets/meteoIcon/partly-cloudy-night.png'
                    meteoIcon.classList.remove('off');
                }
                else if(meteoData.currentConditions.icon === "cloudy"){                   
                    meteoIcon.src = 'assets/meteoIcon/cloudy.png';
                    dashboardMeteoIcon.src = 'assets/meteoIcon/cloudy.png'
                    meteoIcon.classList.remove('off');
                }
                else if(meteoData.currentConditions.icon === "rain"){                   
                    meteoIcon.src = 'assets/meteoIcon/rain.png';
                    dashboardMeteoIcon.src = 'assets/meteoIcon/rain.png'
                    meteoIcon.classList.remove('off');
                }
                else{
                    meteoIcon.alt = "No icon found"
                };

                // set current temperature 
                dashCurrentTemp.innerText= `${meteoData.days[0].temp} F°`;
                currentTemp.innerText= `${meteoData.days[0].temp} F°`;

                // set meteo Alerts
                if(meteoData.alerts.length !== 0){
                    dashMeteoAlerts.classList.remove('off');
                    meteoAlerts.classList.remove('off');
                    dashMeteoAlerts.innerHTML= `${meteoData.alerts[0].event}`;
                    meteoAlerts.innerHTML= `${meteoData.alerts[0].event}`;
                }

                // add data on today card
                const todayMeteo = document.createElement('UL');
                const todayCond = document.createElement('LI');
                todayCond.innerText = `${meteoData.days[0].conditions}`;
                const todayTemp = document.createElement('LI');
                todayTemp.innerText = `Max/Min: ${meteoData.days[0].tempmax} - ${meteoData.days[0].tempmin} F°`;
                const todayHum = document.createElement('LI');
                todayHum.innerText = `Humididty: ${meteoData.days[0].humidity}%`
                const todayPressure = document.createElement('LI');
                todayPressure.innerText = `Pressure: ${meteoData.days[0].pressure}mb`
                todayMeteo.append(todayCond, todayTemp, todayHum, todayPressure);
                todayMeteo.style.fontSize = '12px';

                // controls precipitation probability and add data 
                if(meteoData.days[0].preciptype !== null){
                    const todayPrec = document.createElement('LI');
                    todayPrec.innerText = `${meteoData.days[0].preciptype} probability: ${meteoData.days[0].precipprob}%`;
                    todayMeteo.append(todayPrec);
                }
                todayMeteoData.appendChild(todayMeteo);

                // add data on tomorrow card
                const tomorrowMeteo = document.createElement('UL');
                const tomorrowCond = document.createElement('LI');
                tomorrowCond.innerText = `${meteoData.days[1].conditions}`;
                const tomorrowTemp = document.createElement('LI');
                tomorrowTemp.innerText = `Max/Min: ${meteoData.days[1].tempmax} - ${meteoData.days[1].tempmin} F°`;
                const tomorrowHum = document.createElement('LI');
                tomorrowHum.innerText = `Humididty: ${meteoData.days[1].humidity}%`
                const tomorrowPressure = document.createElement('LI');
                tomorrowPressure.innerText = `Pressure: ${meteoData.days[1].pressure}mb`
                tomorrowMeteo.append(tomorrowCond, tomorrowTemp, tomorrowHum, tomorrowPressure);
                tomorrowMeteo.style.fontSize = '12px';

                if(meteoData.days[1].preciptype !== null){
                    const tomorrowPrec = document.createElement('LI');
                    tomorrowPrec.innerText = `${meteoData.days[1].preciptype} probability: ${meteoData.days[1].precipprob}%`;
                    tomorrowMeteo.append(tomorrowPrec);
                }
                tomorrowMeteoData.appendChild(tomorrowMeteo);

            };
        }else{
            throw new Error("No location");
        };
        }

        catch(error){
            console.log(error);
        };
    };
    


meteoSearch.addEventListener('submit', function(e){
    e.preventDefault();
    fetchData()
    locationName.value = '';
    fetchingMeteoAlert.classList.toggle('off');  
    meteoView.classList.remove('blur');
    });      
    
// Meteo logic end

// Additional functionalities can be added below

window.onload = function(){
    retrieveTasks();
    fetchData();
};