const mountains = [[1, 1], [3, 8], [5, 3], [8, 9], [9, 5]]
const elements = [
    {
        time: 2,
        type: 'water',
        color: 'blue',
        image: "url('water.png')",
        shape: [[1,1,1],
                [0,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        color: 'yellow',
        image: "url('town.png')",
        shape: [[1,1,1],
                [0,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false        
    },
    {
        time: 1,
        type: 'forest',
        color: 'green',
        image: "url('forest.png')",
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'farm',
        color: 'red',
        image: "url('farm.png')",
        shape: [[1,1,1],
                [0,0,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
        },
    {
        time: 2,
        type: 'forest',
        color: 'red',
        image: "url('forest.png')",
        shape: [[1,1,1],
                [0,0,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'town',
        color: 'yellow',
        image: "url('town.png')",
        shape: [[1,1,1],
                [0,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'farm',
        color: 'red',
        image: "url('farm.png')",
        shape: [[1,1,1],
                [0,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'town',
        color: 'yellow',
        image: "url('town.png')",
        shape: [[1,1,0],
                [1,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'town',
        color: 'yellow',
        image: "url('town.png')",
        shape: [[1,1,1],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'farm',
        color: 'red',
        image: "url('farm.png')",
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'farm',
        color: 'red',
        image: "url('farm.png')",
        shape: [[0,1,0],
                [1,1,1],
                [0,1,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        color: 'blue',
        image: "url('water.png')",
        shape: [[1,1,1],
                [1,0,0],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        color: 'blue',
        image: "url('water.png')",
        shape: [[1,0,0],
                [1,1,1],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        color: 'green',
        image: "url('forest.png')",
        shape: [[1,1,0],
                [0,1,1],
                [0,0,1]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        color: 'green',
        image: "url('forest.png')",
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        color: 'blue',
        image: "url('water.png')",
        shape: [[1,1,0],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
]

// I added 3 extra missions here
const missions = 
{
  basic: [
    {
      title: "Edge of the forest",
      description: "You get one point for each forest field adjacent to the edge of your map."
    },
    {
      title: "Sleepy valley",
      description: "For every row with three forest fields, you get four points."
    },
    {
      title: "Watering potatoes",
      description: "You get two points for each water field adjacent to your farm fields."
    },
    {
      title: "Borderlands",
      description: "For each full row or column, you get six points."
    },
    {
        title: "Magicians' valley",
        description: "You get three points for your water fields adjacent to your mountain fields."
    },
    {
        title: "Odd numbered silos",
        description: "For each of your odd numbered full columns you get 10 points."
    },
    {
        title: "Watering canal",
        description: "For each column of your map that has the same number of farm and water fields, you will receive four points. You must have at least one field of both terrain types in your column to score points."
    }
  ]
}

const gridSize = 11;
const grid = new Array(gridSize).fill('0').map(() => new Array(gridSize).fill('empty'))
for (const [row, col] of mountains) {
    grid[row][col] = '*';
}
const gridTable = document.getElementById('gridTable');
const previewTable = document.getElementById('previewTable');

const total = document.getElementById('total')

let totalTime = 0;
let currSeasonTime = 1;

const occupiedGrid = new Array(gridSize).fill(false).map(() => new Array(gridSize).fill(false));

let previousSeasonIndex = -1;
let currentSeasonIndex = 0;

let totalPoints = 0;

const spring = document.getElementById('spring');
const summer = document.getElementById('summer');
const autumn = document.getElementById('autumn');
const winter = document.getElementById('winter');

let springPoints = 0;
let summerPoints = 0;
let autumnPoints = 0;
let winterPoints = 0;

let gameOver = false;


// Shuffling the missions and taking the first 4 in each game
const missionList = [...missions.basic]; 
for (let i = missionList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [missionList[i], missionList[j]] = [missionList[j], missionList[i]];
}
missionList.length = 4;


let missionScores = missionList.map((mission) => ({ mission: mission.title, totalPoints: 0, isActive: false }));

const seasons = ["Spring(AB)", "Summer(BC)", "Autumn(CD)", "Winter(DA)"]

let edgePoints = 0;
let sleepyPoints = 0;
let wateringPoints = 0;
let borderPoints = 0;


function getRandomElement() {
    const randomIndex = Math.floor(Math.random() * elements.length);
    return elements[randomIndex];
}

function hasCollision(row, col, element) {
    for (let i = 0; i < element.shape.length; i++) {
        for (let j = 0; j < element.shape[i].length; j++) {
            if (element.shape[i][j] === 1) {
                if (    
                    row + i >= gridSize || col + j >= gridSize || 
                    grid[row + i][col + j] === '*' ||
                    occupiedGrid[row + i][col + j]
                ) {
                    return true; 
                }
            }
        }
    }
    return false;
}

function placeElement(row, col, element) {
    if (!hasCollision(row, col, element)) {
        for (let i = 0; i < element.shape.length; i++) {
            for (let j = 0; j < element.shape[i].length; j++) {
                if (element.shape[i][j] === 1) {
                    const cell = gridTable.children[row + i].children[col + j];
                    cell.style.backgroundImage = element.image;
                    cell.style.backgroundSize = '100% 100%';
                    occupiedGrid[row + i][col + j] = true;
                    grid[row + i][col + j] = element.type;
                }
            }
        } 
        currSeasonTime += element.time;
        totalTime += element.time;


        if(currSeasonTime >= 8){
            currSeasonTime = (currSeasonTime % 8) + 1;
            currentSeasonIndex = (currentSeasonIndex + 1) % 4;
        }
    
        if(totalTime >= 28){
            let mountPoints = surroundMountain();
            totalPoints += mountPoints;
            missionDisplay(currentSeasonIndex);
            
            
            alert("Game over! Your total points with surrounded mountains: " + totalPoints);
            const gridCells = document.querySelectorAll('td');
            gridCells.forEach(cell => {
              cell.className = 'noClick';
            });
            gameOver = true;
            location.reload();
        }
    }

}

function showPreview(element) {
    previewTable.innerHTML = ''; 

    for (let i = 0; i < 3; i++) {
        const previewRow = document.createElement('tr');
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('td');
            cell.classList.add('preview-cell');

            if (element.shape[i] && element.shape[i][j] === 1) {
                cell.style.backgroundImage = element.image;
                cell.style.backgroundSize = '100% 100%';
            }

            previewRow.appendChild(cell);
        }
        previewTable.appendChild(previewRow);
    }
}

function mirrorElement(element){
    const newElement = { ...element};
    const shape = newElement.shape;
    const n = shape.length;
    const mirroredShape = new Array(n).fill(null).map(() => new Array(n).fill(0));

    for (let i = 0; i < n; i++){
        for (let j = 0; j < shape[i].length; j++){
            mirroredShape[i][j] = shape[i][n - j - 1];
        }
    }
    newElement.shape = mirroredShape;
    return newElement;
}

function rotateElement(element) {
    const newElement = { ...element }; 
    const shape = newElement.shape;
    const n = shape.length;
    const rotatedShape = new Array(n).fill(null).map(() => new Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            rotatedShape[i][j] = shape[n - j - 1][i];
        }
    }

    newElement.shape = rotatedShape;
    newElement.rotation = (newElement.rotation + 1) % 4;
    return newElement;
}

function timeDisplay(element){
    const timeUnit = document.getElementById('timeUnit')
    if(element){
        timeUnit.textContent = `Time unit: ${element.time}`;
    } 
}

function timeUpdate(){
    const currentSeason = document.getElementById('currentSeason')
    const currentSeasonTime = document.getElementById('currentSeasonTime')
    currentSeason.textContent = `Current season: ${seasons[currentSeasonIndex]}`;
    currentSeasonTime.textContent = `Elapsed time in current season: ${currSeasonTime}/7`;
}


// The bug in displaying missions points
// As you might have seen, there is no problem with counting the points for each mission
// because the season points are calculated correctly, but I have a big in displaying mission points
// as the points are always getting rewritten each time and I could not solve that issue

function missionDisplay(currentSeasonInd) {    
    const letters = ["A", "B", "C", "D"]
    const missionsHTML = document.getElementById('missions');
    missionsHTML.innerHTML = '';

    let lightActiveMission = [];

    if (currentSeasonInd === 0) {
        lightActiveMission.push(0, 1)
    } else if (currentSeasonInd === 1) {
        lightActiveMission.push(1, 2);
    } else if (currentSeasonInd === 2) {
        lightActiveMission.push(2, 3);
    } else if (currentSeasonInd === 3) {
        lightActiveMission.push(3, 0);
    }
    
    const firstMission = missionList[0];
    missionScores.find(score => score.mission === firstMission.title)

    for(let i = 0; i < missionList.length; i++){
        const missionDiv = document.createElement('div');
        const title = document.createElement('h3');
        const description = document.createElement('p');
        const letter = document.createElement('h4')
        let points = document.createElement('p')
        title.textContent = missionList[i].title;
        description.textContent = missionList[i].description;
        letter.textContent = "Mission " + letters[i];

        if (lightActiveMission.includes(i)) {
            missionScores[i].isActive = true;
            missionDiv.classList.add('active');
            missionDiv.classList.remove('inactive');

            let missionPoints = calcMissionPoints(missionList[i]);
            //console.log(missionPoints,missionScores) 
            missionScores.find(score => score.mission === missionList[i].title).totalPoints += missionPoints;
        } else {
            missionScores[i].isActive = false;
            missionDiv.classList.add('inactive');
            missionDiv.classList.remove('active');
        }
            
        points.textContent = "Points: " + missionScores[i].totalPoints;

        missionDiv.append(title);
        missionDiv.append(description);
        missionDiv.append(letter);
        missionDiv.append(points);
        missionsHTML.append(missionDiv);
        
    }
}


function calcMissionPoints(mission) {
    let points = 0;
    if (mission.title === "Edge of the forest") {
        points += edgeOfTheForest();
    } else if (mission.title === "Sleepy valley") {
        points += sleepyValley();
    } else if (mission.title === "Watering potatoes") {
        points += wateringFields();
    } else if (mission.title === "Borderlands") {
        points += borderlands();
    } else if (mission.title === "Magicians' valley"){
        points += magiciansValley();
    } else if(mission.title === "Odd numbered silos"){
        points += oddSilos();
    } else if(mission.title === "Watering canal"){
        points += wateringCanal();
    }
    return points;
}



function edgeOfTheForest(){
    let points = 0;
    for (let row = 0; row < gridSize; row++){
        for(let col = 0; col < gridSize; col++){
            if(grid[row][col] === 'forest' && 
                (row === 0 || row === gridSize -1 || col === 0 || col === gridSize - 1)){
                    points += 1;
                
                } 
        }
    }
    return points;
}

function sleepyValley(){
    let points = 0;
    for (let row = 0; row < gridSize; row++){
        let forestFields = 0;
        for(let col = 0; col < gridSize; col++){
            if(grid[row][col] === 'forest'){
                forestFields++;
            }
        }
        if(forestFields === 3){
            points += 4;
        }
    }
    return points;
}


function wateringFields(){
    let points = 0;
    for(let row = 0; row < gridSize; row++){
        for (let col = 0; col < gridSize; col++){
            if(grid[row][col] === 'farm'){
                if(row - 1 >= 0 && grid[row - 1][col] === 'water' ||
                    col - 1 >= 0 && grid[row][col - 1] === 'water' ||
                    row + 1 < gridSize && grid[row + 1][col] === 'water' ||
                    col + 1 < gridSize && grid[row][col + 1] === 'water') {
                        points += 2;
                    }
            }
        }
    }
    return points;
}

function borderlands(){
    let points = 0;

    for(let row = 0; row < gridSize; row++){
        let fullRow = true;
        for(let col = 0; col < gridSize; col++){
            if(!occupiedGrid[row][col]){
                fullRow = false;
                break;
            }
        }
        if(fullRow){
            points += 6;
        }
    }

    for(col = 0; col < gridSize; col++){
        let fullCol = true;
        for(row = 0; row < gridSize; row++){
            if(!occupiedGrid[row][col]){
                fullCol = false;
                break;
            }
        }
        if(fullCol){
            points += 6;
        }
    }
    return points;
}

function magiciansValley(){
    let points = 0;

    for(row = 0; row < gridSize; row++){
        for(col = 0; col < gridSize; col++){
            if(grid[row][col] === '*'){
                let adjWater = 0;
                if(grid[row - 1][col] === 'water'){
                    adjWater++;
                } if(grid[row][col - 1] === 'water'){
                    adjWater++;
                } if(grid[row + 1][col] === 'water'){
                    adjWater++;
                }if(grid[row][col + 1] === 'water'){
                    adjWater++;
                }
                points += adjWater * 3;
            }
        }
    }
    return points;
}

function oddSilos(){
    let points = 0;

    for(let col = 0; col < gridSize; col+=2){
        let fullColumn = true;
        for(let row = 0; row < gridSize; row++){
            if(!occupiedGrid[row][col]){
                fullColumn = false;
            }
        }
        if (fullColumn){
            points += 10;
        }
    }
    return points;
}

function wateringCanal() {
    let points = 0;

    for(let col = 0; col < gridSize; col++) {
        let waterCount = 0;
        let farmCount = 0;

        for (let row = 0; row < gridSize; row++) {
            if (grid[row][col] === 'water') {
                waterCount++;
            } else if (grid[row][col] === 'farm') {
                farmCount++;
            }
        }

        if (waterCount > 0 && farmCount > 0 && waterCount === farmCount) {
            points += 4;
            break;
        }
    }

    return points;
}

function surroundMountain(){
    let points = 0;

    for(row = 0; row < gridSize; row++){
        for(col = 0; col < gridSize; col++){
            if(grid[row][col] === '*'){
                if(occupiedGrid[row - 1][col] && occupiedGrid[row][col - 1] &&
                    occupiedGrid[row + 1][col] && occupiedGrid[row][col + 1]){
                        points += 1;
                    }
            }
        }
    }
    return points;
}


function seasonPoints(mission1, mission2){
    let seasonPoints = 0;
    for(let i = mission1; i !== (mission2+1)%4; i = (i+1)%4){
        let mission = missionList[i];
        let missionPoints = 0;
        if(mission.title === "Edge of the forest"){
            missionPoints += edgeOfTheForest();
        } else if(mission.title === "Sleepy valley"){
            missionPoints += sleepyValley();
        } else if(mission.title === "Watering potatoes"){
            missionPoints += wateringFields();
        } else if(mission.title === "Borderlands"){
            missionPoints += borderlands();
        } else if(mission.title === "Magicians' valley"){
            missionPoints += magiciansValley();
        } else if(mission.title === "Odd numbered silos"){
            missionPoints += oddSilos();
        } else if(mission.title === "Watering canal"){
            missionPoints += wateringCanal();
        }
        seasonPoints += missionPoints;
    }
    
    return seasonPoints;
}


function gridDisplay() {
    gridTable.innerHTML = '';
    let randomElement = getRandomElement();

    for (let row = 0; row < gridSize; row++) {
        const tr = document.createElement('tr');
        for (let col = 0; col < gridSize; col++) {
            const td = document.createElement('td');
            const cellValue = grid[row][col];
            

            if (cellValue === '*') {
                occupiedGrid[row][col] = true
                td.style.backgroundImage = "url('mountain.png')";
                td.style.backgroundSize = '100% 100%';
            } 
            showPreview(randomElement);
            timeDisplay(randomElement);
            timeUpdate();
            missionDisplay(currentSeasonIndex);

            td.addEventListener('click', function () {
                if(gameOver){
                    missionDisplay(currentSeasonIndex);
                    return;
                }
                placeElement(row, col, randomElement);

                randomElement = getRandomElement(); 
                showPreview(randomElement); 
                timeDisplay(randomElement);
                timeUpdate();

                if(previousSeasonIndex !== currentSeasonIndex){  
                    missionDisplay(currentSeasonIndex);
                    previousSeasonIndex = currentSeasonIndex;
                    
                }
                
                if(currentSeasonIndex === 0){
                    springPoints = seasonPoints(0, 1);
                    spring.textContent = `Spring points: ${springPoints}`
                } else if(currentSeasonIndex === 1){
                    summerPoints = seasonPoints(1, 2);
                    summer.textContent = `Summer points: ${summerPoints}`
                } else if(currentSeasonIndex === 2){
                    autumnPoints = seasonPoints(2, 3)
                    autumn.textContent = `Autumn points: ${autumnPoints}`
                } else {
                    winterPoints = seasonPoints(3, 0);
                    winter.textContent = `Winter points: ${winterPoints}`
                }

                totalPoints = springPoints + summerPoints + autumnPoints + winterPoints;
                total.textContent = `Total ${totalPoints}`;
            });   
            tr.appendChild(td);
        }
        gridTable.appendChild(tr);
        
    }

    const mirrorButton = document.getElementById('mirrorButton');
    mirrorButton.addEventListener('click', function () {
        randomElement = mirrorElement(randomElement);
        showPreview(randomElement);
    });

    const rotateButton = document.getElementById('rotateButton');
    rotateButton.addEventListener('click', function () {
        randomElement = rotateElement(randomElement);
        showPreview(randomElement);
    });   

}
gridDisplay();
