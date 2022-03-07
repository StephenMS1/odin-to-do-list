import githubLogo from './images/GitHub-Mark.png';
import './styles.css';

//stores the list of projects (projects are objects containing tasks, tasks are objects containing info like title, description, deadline, priority etc)
let projects = {
};

//creates a "overall" project for tasks without a parent project
projects.noParentProject = {};

//factory function for creating new projects which are 'parents' of the tasks
function createProject(name){
    let projectObj = {
    };
    projects[name] = projectObj;
    return name;
}


//factory function for creating a new task with a default parent project of none.
function createTask(title, description, deadline, priority, parentProject = "noParentProject"){
    let taskObj = {
        title,
        description,
        deadline,
        priority,
    }
    if (parentProject in projects){
        projects[parentProject][title] = taskObj;
    }
    return taskObj;
}

//confirming createTask works as intended
let cs50 = createProject("CS50 Week 5");

let cs50task = createTask("Do CS50", "complete the next week of the CS50 Course", "11/03/2022", "High", "Learning to code");

let cs60task = createTask("Do CS60", "complete the next week of the CS60 Course", "11/03/2022", "High", "CS50 Week 5");

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

    navigationPane.append(navigationSubHeaderTime, timeAll, timeToday, timeThisWeek, timeThisMonth, navigationSubHeaderProjects);

    return navigationPane;
}


//function for main interface where tasks are shown - dynamic based on current project
function createListInterface(){
    let listInterface = document.createElement('div');
    listInterface.classList.add('listInterface');

    let currentProjectTitle = document.createElement('h2');
    currentProjectTitle.textContent = "I would show you which project or timeline you are looking at :)";

    listInterface.append(currentProjectTitle);

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



//creation of page initially
content.append(createHeader(), createDividedBody(), createFooter());

setNavigationListeners();