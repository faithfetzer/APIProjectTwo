const baseURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/"
const api_key="ULctjVgrZvQan7OgvbRM6sm3nfsDujl6wWBjaXW4";
let roverURL;

// console.log(roverName);
const submitOne = document.getElementById("firstSubmit");
submitOne.addEventListener("click", fetchCameras);
const submitTwo = document.querySelector("#secondSubmit");
let roverCameraList = document.querySelector("#roverCameraSelection");
let solSelection = document.querySelector("#solSelection");
let cameraSelected;
let solSelected;
let roverName;
document.getElementById('secondSubmit').style.display = 'none';

async function fetchCameras(e) {
    e.preventDefault();
    roverName = document.querySelector("#roverName").value;
    // console.log(roverName);
    roverURL = `${baseURL}${roverName}/?api_key=${api_key}`;
    console.log(roverURL);
    let response = await fetch(roverURL);
    if(!response.ok){
        console.log('error');
    }
    let responseInfo = await response.json();
    console.log(responseInfo);
    let cameraList = responseInfo.rover.cameras;
    roverCameraList.innerHTML = `<label for="cameraSelection">Select a Camera:</label>
    <select id="cameraSelection" name="cameraSelection"></select>`;
    let innerList = document.querySelector("#cameraSelection");
    for(i=0; i< cameraList.length; i++){
        let cameraName = cameraList[i].full_name;
        let cameraValue = cameraList[i].name;
        innerList.innerHTML += `<option value="${cameraValue}">${cameraName}</option>`
        console.log(cameraValue);
        console.log(cameraName);
    }
    let maxSol = responseInfo.rover.max_sol;
    solSelection.innerHTML = `<label for="solEntry">Choose a sol (day on Mars) since the rover has landed from 0 to ${maxSol}:<label><input type="number" id="solEntry" name="solEntry" min="0" max="${maxSol} ">`;
    submitTwo.addEventListener("click", fetchImages);
}

// cameraSelected = await document.getElementById("#cameraSelection").value;
// solSelected = await document.getElementById("#solEntry").value;
// console.log(roverCameraList, solSelection)
// console.log(solSelected);

// let cameraSelected = document.getElementById("#cameraSelection").value;
// let solSelected = document.getElementById("#solEntry").value;
//     // return cameraSelected;
    // return solSelected;

// console.log(solSelected);
// console.log(cameraSelection);
// const submitTwo = document.querySelector("#secondSubmit");

submitTwo.addEventListener("click", fetchImages);
// console.log(cameraSelection);


async function fetchImages(e) {
    e.preventDefault();
    console.log("fetch images");
    cameraSelected = document.getElementById("#cameraSelection").value;
    solSelected = document.getElementById("#solEntry").value;
    console.log(roverCameraList, solSelection)
    console.log(solSelected);
}