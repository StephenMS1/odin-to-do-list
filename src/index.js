import githubLogo from './images/GitHub-Mark.png';
import './styles.css';


//stores the list of projects (projects are objects containing tasks, tasks are objects containing info like title, description, deadline, priority etc)
let projects = {
};

projects.noParentProject = {}
projects['CS50 Week 5'] = {}

//factory function for creating a new task with a default parent project of none.
function createTask(title, description, deadline, priority, parentProject = "noParentProject", completed = 'no'){
    let taskObj = {
        title,
        description,
        deadline,
        priority,
    }
    if (parentProject == 'noParentProject'){
        projects['noParentProject'][title] = taskObj;
    }
    else if (parentProject in projects){
        projects[parentProject][title] = taskObj;
    }
    return taskObj;
}

//confirming createTask works as intended

createTask("Wash Bedding", "wash and dry bedding", "14/03/2022", "High");

createTask("Do CS50", "complete the next week of the CS50 Course", "11/03/2022", "High", "CS50 Week 5");

console.log(projects);


//access the content via querySelector
let content = document.querySelector("#content");

//factory function for button so text only needs to be added
function getButton(input){
    let textElement = document.createElement('button');
    textElement.textContent = input;
    textElement.classList.add('navigationButton');
    return textElement;
}

//factory function text
function getParagraph(input){
    let textElement = document.createElement('p');
    textElement.textContent = input;
    return textElement;
}


//function to produce the header - static on page
function createHeader(){
    let header = document.createElement('div');
    let title = document.createElement('h1');
    title.textContent = 'My To Do List';
    header.classList.add('header');
    header.append(title);
    return header;
}


//function to produce the main display body - static on page
function createDividedBody(){
    let dividedBody = document.createElement('div');
    dividedBody.classList.add('dividedBody');

    dividedBody.append(createNavigationPane(), createListInterface());

    return dividedBody;
}


//function to produce the navigation pane - dynamic based on addition/removal of projects
function createNavigationPane(){
    let navigationPane = document.createElement('div');
    navigationPane.classList.add('navigationPane');

    let navigationSubHeaderTime = document.createElement('h2')
    navigationSubHeaderTime.textContent = 'Timeframe';

    let timeToday = getButton('Today');
    let timeThisWeek = getButton('This Week');
    let timeThisMonth = getButton('This Month');
    let timeAll = getButton('All');

    let navigationSubHeaderProjects = document.createElement('h2')
    navigationSubHeaderProjects.textContent = 'Projects';

    let projectNavigators = makeProjectNavigators()

    navigationPane.append(navigationSubHeaderTime, timeAll, timeToday, timeThisWeek, timeThisMonth, navigationSubHeaderProjects);

    projectNavigators.forEach(button => {
        navigationPane.append(button);
    })

    return navigationPane;
}


//function for main interface where tasks are shown - dynamic based on current project
function createListInterface(){
    let listInterface = document.createElement('div');
    listInterface.classList.add('listInterface');

    let listInterfaceHeader = document.createElement('div');
    listInterfaceHeader.classList.add('listInterfaceHeader');

    let currentProjectTitle = document.createElement('h2');
    currentProjectTitle.textContent = "I would show you which project or timeline you are looking at :)";

    listInterfaceHeader.append(currentProjectTitle);

    //testing taskCard
    listInterface.append(listInterfaceHeader, getTaskVisual(projects['noParentProject']['Wash Bedding']))

    return listInterface;
}


//function to create footer - static on page
function createFooter() {
    let footer = document.createElement('div');
    footer.classList.add('footer');

    let footerText = document.createElement('p');
    footerText.textContent = 'Copyright © 2022 stephenms1';
    
    let githubLink = document.createElement('a');
    githubLink.href = 'https://github.com/StephenMS1'
    githubLink.target = 'blank';
    let githubImage = document.createElement('img');
    githubLink.appendChild(githubImage);
    githubImage.src = githubLogo;
    githubImage.classList.add('githubLogo')

    footer.append(footerText, githubLink);

    return footer;
}

//function for setting navigation button active
function setNavigationListeners(){
    let navigationButtons = Array.from(document.querySelectorAll('.navigationButton'));
    navigationButtons.forEach(button => {
        button.addEventListener('click', (e) =>{
            navigationButtons.forEach(button => {
                button.classList.remove('active');
            })
            e.target.classList.add('active');
        })
    })
}

//function for creating task visual
function getTaskVisual(task){
    let taskCard = document.createElement('div');
    taskCard.classList.add('taskCard');

    let taskCheckBox = document.createElement('button');
    taskCheckBox.classList.add('taskCheckBox');

    //sample while working
    let taskTitle = getParagraph(task.title);
    let taskPriority = getParagraph(task.priority);
    let taskDate = getParagraph(task.deadline);
    let taskDescription = getParagraph(task.description);

    taskCard.append(taskCheckBox, taskTitle, taskPriority, taskDate, taskDescription);

    return taskCard;
}

//function for making project navigators
function makeProjectNavigators(){
    let projectNavigators = []
    
    for (let key in projects){
        projectNavigators.push(getButton(key));
    }
    return projectNavigators;
}

//creation of page initially
content.append(createHeader(), createDividedBody(), createFooter());

setNavigationListeners();