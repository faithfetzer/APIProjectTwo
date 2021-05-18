const baseURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/"
const api_key="ULctjVgrZvQan7OgvbRM6sm3nfsDujl6wWBjaXW4";
let roverURL;

// console.log(roverName);
const submitOne = document.getElementById("roverName");
submitOne.addEventListener("change", fetchCameras);
const submitTwo = document.querySelector("#secondSubmit");
const submitTwoCamera = document.querySelector("#roverCameraSelection");
const submitTwoSol = document.querySelector("#solSelection");
let roverCameraList = document.querySelector("#roverCameraSelection");
let solSelection = document.querySelector("#solSelection");
let cameraSelected;
let solSelected;
let roverName;
let resultsDisplayed = document.querySelector('.results');
document.getElementById('secondSubmit').style.display = 'none';
let secondForm = document.getElementById('form2');
secondForm.style.display = 'none';

async function fetchCameras(e) {
    e.preventDefault();
    roverName = document.querySelector("#roverName").value;
    // console.log(roverName);
    if (roverName !== "") {
        secondForm.style.display = 'initial';
    }
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
        // console.log(cameraValue);
        // console.log(cameraName);
    }
    let maxSol = responseInfo.rover.max_sol;
    solSelection.innerHTML = `<label for="solEntry">Choose a sol (day on Mars) since the rover has landed from 0 to ${maxSol}:<label><input type="number" id="solEntry" name="solEntry" min="0" max="${maxSol}" placeholder="0" >`;
    document.getElementById('secondSubmit').style.display = "initial";
    // document.getElementById('firstSubmit').style.display = "none";
    submitTwo.addEventListener("click", fetchImages);
    submitTwoCamera.addEventListener("change", fetchImages);
    submitTwoSol.addEventListener("change", fetchImages);
}


async function fetchImages(e) {
    e.preventDefault();
    // console.log("fetch images");
    while (resultsDisplayed.firstChild) {
        resultsDisplayed.removeChild(resultsDisplayed.firstChild);
      }
    cameraSelected = document.getElementById("cameraSelection").value;
    solSelected = document.getElementById("solEntry").value;
    // console.log(roverCameraList, solSelection)
    // console.log(cameraSelected);
    console.log(solSelected);
    imageURL = `${baseURL}${roverName}/photos?api_key=${api_key}&sol=${solSelected}&camera=${cameraSelected}`;
    console.log(imageURL);
    let imageResponse = await fetch(imageURL);
    if(!imageResponse.ok){
        console.log('error');
    }
    let imageResponseInfo = await imageResponse.json();
    console.log(imageResponseInfo);
    let photoList = imageResponseInfo.photos;
    
    if(photoList.length === 0){
        document.querySelector("#resultsHeader").innerHTML = ``;
        resultsDisplayed.innerHTML = `There are no photos from that camera on rover ${roverName} from sol ${solSelected}. Please make another selection.`;
    } else {
        for(j=0; j< photoList.length; j++){
        let imageSRC = photoList[j].img_src;
        let cameraInfo= photoList[j].camera.full_name;
        let earthDate = photoList[j].earth_date;
        let imageAlt = `${roverName} ${cameraInfo} sol: ${solSelected} Earth Date: ${earthDate}`
        document.querySelector("#resultsHeader").innerHTML = `Rover: ${roverName} Camera: ${cameraInfo} Sol: ${solSelected} Earth Date: ${earthDate}`;
        if((j+1)%4 === 0){
            document.querySelector(".results").innerHTML += ` <div class="col"><img src="${imageSRC}" alt="${imageAlt}" class="img-thumbnail"></div>
            <div class="w-100"></div>`;}
        else {
                document.querySelector(".results").innerHTML += ` <div class="col"><img src="${imageSRC}" alt="${imageAlt}" class="img-thumbnail"></div>`
            }
        // if(j < 3){
        // document.querySelector("#firstRow").innerHTML += `<img src="${imageSRC}" alt="${imageAlt}" class="img-thumbnail">`;
        // } else if (j <6 ) {
        //     document.getElementById('secondRow').innerHTML += `<img src="${imageSRC}" alt="${imageAlt}">`;
        // } else if (j <9 ) {
        //     document.getElementById('thirdRow').innerHTML += `<img src="${imageSRC}" alt="${imageAlt}">`;
        // } else {
        //     document.getElementById('fourthRow').innerHTML += `<img src="${imageSRC}" alt="${imageAlt}">`;
        //     }
        }
    }
}
// if((j+1)%4 === 0){

// document.querySelector("#results").innerHTML += ` <div class="w-100"><img src="${imageSRC}" alt="${imageAlt}" class="img-thumbnail"></div>`;}
// else {
//     document.querySelector("#results").innerHTML += ` <div class="col"><img src="${imageSRC}" alt="${imageAlt}" class="img-thumbnail"></div>`
// }
