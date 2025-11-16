

// Theme switcher

const lightModeBtn = document.getElementById('lightModeBtn');
const darkModeBtn = document.getElementById('darkModeBtn');
const themeLink = document.getElementById('themeLink');
const bodyBack= document.getElementById('body');
const pageTitle = document.querySelectorAll('.pageTitle');

lightModeBtn.onclick = function() {
    bodyBack.classList.add('light');
    bodyBack.classList.remove('dark');
    pageTitle.forEach(function(title){
        title.classList.remove('dark');
    });
    lightModeBtn.classList.add('on');
    darkModeBtn.classList.remove('on');
}

darkModeBtn.onclick = function() {
    bodyBack.classList.remove('light');
    bodyBack.classList.add('dark');
    pageTitle.forEach(function(title){
        title.classList.add('dark');
    });
    lightModeBtn.classList.remove('on');
    darkModeBtn.classList.add('on');
}


// Navigation logic
const dashboardBtn = document.getElementById('dashboard');
const tasksBtn = document.getElementById('tasks');
const newsBtn = document.getElementById('news');
const meteoBtn = document.getElementById('meteo');
const diaryBtn = document.getElementById('diaryBtn');
const dashboardPage = document.getElementById('dashboardPage');
const tasksPage = document.getElementById('tasksPage');
const newsPage = document.getElementById('newsPage');
const meteoPage = document.getElementById('meteoPage');
const diaryPage = document.getElementById('diaryPage');
const appName = document.getElementById('appName');
const weatherCard = document.getElementById('weatherCard');
const tasksCard = document.getElementById('tasksCard');
const diaryCard = document.getElementById('diaryCard');


dashboardBtn.onclick = function() {
    dashboardPage.classList.remove('off');
    tasksPage.classList.add('off');
    newsPage.classList.add('off');
    meteoPage.classList.add('off');
    diaryPage.classList.add('off');
    retrieveTasks();
    fetchData();
    retrieveDiary();
}

tasksBtn.onclick = function() {
    tasksPage.classList.remove('off');
    dashboardPage.classList.add('off');
    newsPage.classList.add('off');
    meteoPage.classList.add('off');
    diaryPage.classList.add('off');
    retrieveTasks();
}

newsBtn.onclick = function() {
    newsPage.classList.remove('off');
    dashboardPage.classList.add('off');
    tasksPage.classList.add('off');
    meteoPage.classList.add('off');
    diaryPage.classList.add('off');
}

meteoBtn.onclick = function() {
    meteoPage.classList.remove('off');
    dashboardPage.classList.add('off');
    tasksPage.classList.add('off');
    newsPage.classList.add('off');
    diaryPage.classList.add('off');
}

diaryBtn.onclick = function() {
    diaryPage.classList.remove('off');
    dashboardPage.classList.add('off');
    tasksPage.classList.add('off');
    newsPage.classList.add('off');
    meteoPage.classList.add('off');
    retrieveDiary();
}

appName.onclick = function(){
    if(dashboardPage.classList.contains('off')){
        dashboardPage.classList.remove('off');
        tasksPage.classList.add('off');
        newsPage.classList.add('off');
        meteoPage.classList.add('off');
        diaryPage.classList.add('off');
        retrieveTasks();
        fetchData();
        retrieveDiary();
    }
}

weatherCard.onclick = function(){
    meteoPage.classList.remove('off');
    dashboardPage.classList.add('off');
    tasksPage.classList.add('off');
    newsPage.classList.add('off');
    diaryPage.classList.add('off');
}

tasksCard.onclick = function(){
    tasksPage.classList.remove('off');
    dashboardPage.classList.add('off');
    newsPage.classList.add('off');
    meteoPage.classList.add('off');
    diaryPage.classList.add('off');
    retrieveTasks();
}

diaryCard.onclick = function(){
    diaryPage.classList.remove('off');
    dashboardPage.classList.add('off');
    tasksPage.classList.add('off');
    newsPage.classList.add('off');
    meteoPage.classList.add('off');
    retrieveDiary();
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

// modify a task logic

async function modifyTask(id, newdescription, completed){
    try{
        const response = await fetch('http://localhost:3000/todos/' + id, {method : "PUT",
            headers : { 
                "Content-Type" : "application/json",               
            },
            body : JSON.stringify({
                "id" : id,
                "description" : newdescription,
                "completed" : completed
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

const modifyTaskForm = document.getElementById('modifyTaskForm');
const modifyTaskDesciption = document.getElementById('modifyTaskDesciption');
const modifyTaskBtn = document.getElementById('modifyTaskBtn');
const modifyTaskWindow = document.getElementById('modifyTaskWindow');
const modifyFormCloseBtn = document.getElementById('closeModifyForm');
const main = document.getElementById('main');

// simple closing modify form
modifyFormCloseBtn.addEventListener('click', function(){
    main.classList.toggle('blur');
    modifyTaskWindow.classList.toggle('off');
});

// preparing new description for task and fire post fetch
const actModifyTask = function(id, description, completed){
    modifyTaskDesciption.value = description;
    modifyTaskForm.addEventListener('submit', function(e){
        e.preventDefault();
        newTaskDescription = modifyTaskDesciption.value;
        modifyTask(id, newTaskDescription, completed);
        modifyTaskWindow.classList.add('off');
        main.classList.remove('blur');
    })

}


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

                taskItem.addEventListener('click', function(e){
                    modifyTaskWindow.classList.toggle('off');
                    main.classList.toggle('blur');
                    actModifyTask(task.id, task.description, task.completed);
                    e.stopPropagation()
                })

                checkBtn.addEventListener('click', function(e){
                    e.stopPropagation();
                    checkTask(task.id, task.description, task.completed);
                });

                delBtn.addEventListener('click', function(e){
                    taskItem.innerHTML = "";
                    delTask(task.id);
                    e.stopPropagation();
                
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
const closeTaskFormBtn = document.getElementById('closeTaskForm');
const toDoInput = document.getElementById('toDoInput');
const taskFormBtn = taskForm.lastChild;

const formToggle = function() {
    formContainer.classList.toggle('off');
    main.classList.toggle('blur');
};


taskFormOpenBtn.onclick = formToggle;
closeTaskFormBtn.onclick = formToggle;

taskForm.addEventListener('submit', function(event){
    event.preventDefault();
    formToggle();
    addTask(toDoInput.value);
    toDoInput.value= "";
});


// Tasks logic end



// Diary logic


// Diary form logic



const diaryFormContainer = document.getElementById('addDiaryPageWindow');
const diaryForm = document.getElementById('addDiaryPageForm');
const diaryFormOpenBtn = document.getElementById('openAddDiaryFormBtn');
const diaryView = document.getElementById('diaryView');
const diaryPrevTableBody = document.getElementById('diaryPrevTableBody');
const diaryTableBody = document.getElementById('diaryTableBody');
const closeDiaryFormBtn = document.getElementById('closeDiaryForm');
const diaryPageTitle = document.getElementById('diaryPageTitle');
const diaryPageText = document.getElementById('diaryPageText');
const diaryFormBtn = diaryForm.lastChild;
const noPageAlert = document.getElementById('noPageAlert');
const noPageDashAlert = document.getElementById('noPageDashAlert');
const diaryDisplay = document.getElementById('diaryDisplay');
const diaryPrev = document.getElementById('diaryPrev');

const diaryFormToggle = function() {
    diaryFormContainer.classList.toggle('off');
    main.classList.toggle('blur');
};


diaryFormOpenBtn.onclick = diaryFormToggle;
closeDiaryFormBtn.onclick = diaryFormToggle;

async function addDiaryPage(title, text, inputDate){
    try{
        const response = await fetch('http://localhost:3000/diary', {method : "POST",
            headers : { 
                "Content-Type" : "application/json",                 
            },
            body : JSON.stringify({
                "title" : title,
                "text" : text,  
                "date" : inputDate                       
            })
        })
        if(response.ok){
            await retrieveDiary();
        }
        }
    catch(error){
        console.log(error);
    }
    
};

async function delPage(id){
    try{
        const response = await fetch('http://localhost:3000/diary/' + id, {method : "DELETE", 
            headers: { 
                "Content-Type" : "application/json",         
            },
            
        });
        if(response.ok){
            await retrieveDiary();
        }
    }
    catch(error){
        console.log(error);
    }
};


// modify diary page logic

async function modifyPage(id, newTitle, newText ,date){
    try{
        const response = await fetch('http://localhost:3000/diary/' + id, {method : "PUT",
            headers : { 
                "Content-Type" : "application/json",               
            },
            body : JSON.stringify({
                "id" : id,
                "title" : newTitle,
                "text" : newText,
                "date": date
            })
        })
        if(response.ok){
            await retrieveDiary();
        }
        }
    catch(error){
        console.log(error);
    }
};

const modifyDiaryPageForm = document.getElementById('modifyDiaryPageForm');
const modifyPageTitle = document.getElementById('modifyPageTitle');
const modifyPageText = document.getElementById('modifyPageText');
const modifyDiaryPageBtn = document.getElementById('modifyDiaryPageBtn');
const modifyDiaryPageWindow = document.getElementById('modifyDiaryPageWindow');
const closeModifyDiaryForm = document.getElementById('closeModifyDiaryForm');

// simple closing modify form
closeModifyDiaryForm.addEventListener('click', function(){
    main.classList.toggle('blur');
    modifyDiaryPageWindow.classList.toggle('off');
});

// preparing new description/title for Page and fire post fetch
const actModifyPage = function(id, title, text, date){
    modifyPageTitle.value = title;
    modifyPageText.value = text;
    modifyDiaryPageForm.addEventListener('submit', function(e){
        e.preventDefault();
        const newPageTitle = modifyPageTitle.value;
        const newPageText = modifyPageText.value;
        modifyPage(id, newPageTitle, newPageText, date);
        modifyDiaryPageWindow.classList.add('off');
        main.classList.remove('blur');
    })

}

//add page form event listener
diaryForm.addEventListener('submit', function(event){
    event.preventDefault();
    const inputDate = new Date().toLocaleDateString("en-US");
    diaryFormToggle();
    addDiaryPage(diaryPageTitle.value, diaryPageText.value, inputDate);
    diaryPageTitle.value= "";
    diaryPageText.value= "";
});





async function retrieveDiary(){
    noPageDashAlert.innerHTML="";
    noPageAlert.innerHTML="";
    try{
        const response = await fetch('http://localhost:3000/diary', {
        headers: {
        "Content-Type" : "application/json",
        }
        });
        const diary = await response.json();
        if(response.ok && diary.length > 0){
            diaryDisplay.classList.remove('off');
            diaryPrev.classList.remove('off');
            diaryPrevTableBody.innerHTML="";
            diaryTableBody.innerHTML="";
            noPageDashAlert.classList.add('off');
            noPageAlert.classList.add('off');
            diary.forEach(page => {
                const pageItem = document.createElement('TR');
                pageItem.innerHTML = `<td class="pageTitle">${page.title}</td><td id="pageText" class="pageText">${page.text}</td><td class="pageDate">${page.date}<td class="delete" id="delTd"><button id="delPageBtn" class="delPageBtn">❌</button></td>`;
                pageItem.classList.add('pageItem');
                console.log(pageItem);
                const delPageBtn = pageItem.lastChild;

                pageItem.addEventListener('click', function(e){
                    modifyDiaryPageWindow.classList.toggle('off');
                    main.classList.toggle('blur');
                    actModifyPage(page.id, page.title, page.text, page.date);
                    e.stopPropagation()
                })

                delPageBtn.addEventListener('click', function(e){
                    pageItem.innerHTML = "";
                    delPage(page.id);
                    e.stopPropagation();
                
                });

                console.log(diaryPrevTableBody);
                console.log(diaryTableBody);
                if(diaryPage.classList.contains('off')){
                    pageItem.classList.add('dashPageItem')
                    diaryPrevTableBody.appendChild(pageItem);
                }else{
                    diaryTableBody.prepend(pageItem);
                };
                
            });   
        }else{
            diaryDisplay.classList.add('off');
            diaryPrev.classList.add('off');
            const pageItem = document.createElement('P');
            pageItem.innerText = "No Page Available. Write Pages to display here";
            pageItem.setAttribute('id', 'noPage');  
            pageItem.style.fontSize = "0.8em" ;
            pageItem.style.color = "white" 
            if(diaryPage.classList.contains('off')){
                    noPageDashAlert.classList.remove('off');
                    noPageDashAlert.appendChild(pageItem);
                }else{
                    noPageAlert.classList.remove('off');
                    noPageAlert.appendChild(pageItem);
                };
        }
    }    
    catch(error){
        console.log(error);
    };
};














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
        meteoAlerts.innerHTML= "";
        meteoAlerts.classList.add('off');
        meteoIcon.src= "";
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
                else if(meteoData.currentConditions.icon === "fog"){                   
                    meteoIcon.src = 'assets/meteoIcon/fog.png';
                    dashboardMeteoIcon.src = 'assets/meteoIcon/fog.png'
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
    retrieveDiary()
};