import githubLogo from './images/GitHub-Mark.png';
import './styles.css';

//stores the list of projects (projects are objects containing tasks, tasks are objects containing info like title, description, deadline, priority etc)
let projects = [];

let content = document.querySelector("#content");

function getTextElement(input){
    let textElement = document.createElement('p');
    textElement.textContent = input;
    return textElement;
}

function createHeader(){
    let header = document.createElement('div');
    let title = document.createElement('h1');
    title.textContent = 'My To Do List';
    header.classList.add('header');
    header.append(title);
    return header;
}

function createDividedBody(){
    let dividedBody = document.createElement('div');
    dividedBody.classList.add('dividedBody');

    dividedBody.append(createNavigationPane(), createListInterface());

    return dividedBody;
}

function createNavigationPane(){
    let navigationPane = document.createElement('div');
    navigationPane.classList.add('navigationPane');

    let navigationSubHeaderTime = document.createElement('h2')
    navigationSubHeaderTime.textContent = 'Timeframe';

    let timeToday = getTextElement('Today');
    let timeThisWeek = getTextElement('This Week');
    let timeThisMonth = getTextElement('This Month');
    let timeAll = getTextElement('All');

    let navigationSubHeaderProjects = document.createElement('h2')
    navigationSubHeaderProjects.textContent = 'Projects';

    projects.forEach(project => {
        console.log('hehe');
    })

    navigationPane.append(navigationSubHeaderTime, timeToday, timeThisWeek, timeThisMonth, timeAll, navigationSubHeaderProjects);

    return navigationPane;
}

function createListInterface(){
    let listInterface = document.createElement('div');
    listInterface.classList.add('listInterface');

    let currentProjectTitle = document.createElement('h2');
    currentProjectTitle.textContent = "I would show you which project or timeline you are looking at :)";

    listInterface.append(currentProjectTitle);

    return listInterface;
}


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

content.append(createHeader(), createDividedBody(), createFooter());