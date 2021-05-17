const baseURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/"
const api_key="ULctjVgrZvQan7OgvbRM6sm3nfsDujl6wWBjaXW4";
let roverURL;

// let roverName = document.querySelector("#roverName").value;
// console.log(roverName);
const submitOne = document.querySelector("#firstSubmit");
submitOne.addEventListener("click", fetchCameras);
const submitTwo = document.querySelector("#secondSubmit");
// submitTwo.addEventListener("click", fetchDates);
// const submitThree = document.querySelector("#thirdSubmit");
// submitThree.addEventListener("click", fetchImages);
let roverCameraList = document.querySelector("#roverCameraSelection");
let dateSelection = document.querySelector("#earthDateSelection");

async function fetchCameras(e) {
    e.preventDefault();
    let roverName = document.querySelector("#roverName").value;
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
    <select id="cameraSelection" name="cameraSelection"></select>
    <button id="secondSubmit">Submit</button>`;
    let innerList = document.querySelector("#cameraSelection");
    for(i=0; i<= cameraList.length; i++){
        let cameraName = cameraList[i].full_name;
        let cameraValue = cameraList[i].name;
        innerList.innerHTML += `<option value="${cameraValue}">${cameraName}</option>`
        console.log(cameraValue);
        console.log(cameraName);
    }
}

async function fetchDates() {
    console.log("fetch dates");
}

async function fetchDates() {
    console.log("fetch images");
}