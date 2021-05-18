const baseURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/"
const api_key="ULctjVgrZvQan7OgvbRM6sm3nfsDujl6wWBjaXW4";
let roverURL;

// console.log(roverName);
const submitOne = document.getElementById("roverName");
submitOne.addEventListener("change", fetchCameras);
const submitTwo = document.querySelector("#secondSubmit");
const submitTwoCamera = document.querySelector("#cameraSelection");
const submitTwoSol = document.querySelector("#solSelection");
let roverCameraList = document.querySelector("#cameraSelection");
let solSelection = document.querySelector("#solSelection");
let cameraSelected;
let solSelected;
let roverName;
let maxSol;
let resultsDisplayed = document.querySelector('.results');
let secondForm = document.getElementById('form2');
// secondForm.style.display = 'none';

async function fetchCameras(e) {
    e.preventDefault();
    roverName = document.querySelector("#roverName").value;
    // console.log(roverName);
    // if (roverName !== "") {
    //     secondForm.style.display = 'initial';
    // }
    roverURL = `${baseURL}${roverName}/?api_key=${api_key}`;
    console.log(roverURL);
    let response = await fetch(roverURL);
    if(!response.ok){
        console.log('error');
    }
    let responseInfo = await response.json();
    console.log(responseInfo);
    let cameraList = responseInfo.rover.cameras;
    let innerList = document.querySelector("#cameraSelection");
    // document.querySelector('.output').style.display = 'initial';
    if(roverName === ""){
        resultsDisplayed.innerHTML = `Please select a rover`;
        document.querySelector("#resultsHeader").innerHTML = ``;
    } else {
    for(i=0; i< cameraList.length; i++){
        let cameraName = cameraList[i].full_name;
        let cameraValue = cameraList[i].name;
        innerList.innerHTML += `<option value="${cameraValue}">${cameraName} (${cameraValue})</option>`
        // console.log(cameraValue);
        // console.log(cameraName);
    }
}
    maxSol = await responseInfo.rover.max_sol;
    let firstEarthDate = await responseInfo.rover.landing_date;
    let maxEarthDate = await responseInfo.rover.max_date;
    solSelection.innerHTML = `<label for="solEntry">Choose a sol (day on Mars since the rover has landed)<br>Sol 0 (Earth Date ${firstEarthDate}) to ${maxSol} (Earth Date ${maxEarthDate}):</label>
    <input class="form-control" type="number" id="solEntry" name="solEntry" min="0" max="${maxSol}">`;
    // document.getElementById('secondSubmit').style.display = "initial";
    // document.getElementById('firstSubmit').style.display = "none";
    
    submitTwo.addEventListener("click", fetchImages);
    submitTwoCamera.addEventListener("change", fetchImages);
    submitTwoSol.addEventListener("change", fetchImages);
    submitOne.addEventListener("change", fetchImages);
}

// submitTwoCamera.addEventListener("change", fetchImages);
// submitTwoSol.addEventListener("change", fetchImages);
// submitOne.addEventListener("change", fetchImages);

async function fetchImages(e) {
    e.preventDefault();
    // console.log("fetch images");
    while (resultsDisplayed.firstChild) {
        resultsDisplayed.removeChild(resultsDisplayed.firstChild);
      }
    cameraSelected = document.getElementById("cameraSelection").value;
    solSelected = document.getElementById("solEntry").value;
    // console.log(cameraSelected);
    // console.log(solSelected);
    if(roverName === ""){
        resultsDisplayed.innerHTML = `Please select a rover`;
        document.querySelector("#resultsHeader").innerHTML = ``;}
     else if(roverName !== "" && cameraSelected === ""){
        resultsDisplayed.innerHTML = `Please select a camera`;
        document.querySelector("#resultsHeader").innerHTML = ``;
    } else if(cameraSelected !== "" && solSelected === ""){
        resultsDisplayed.innerHTML = `Please select a sol`;
        document.querySelector("#resultsHeader").innerHTML = ``;
    }
    else {
    // console.log(roverCameraList, solSelection)
    // console.log(cameraSelected);
    // console.log(solSelected);
    imageURL = `${baseURL}${roverName}/photos?api_key=${api_key}&sol=${solSelected}&camera=${cameraSelected}`;
    console.log(imageURL);
    let imageResponse = await fetch(imageURL);
    if(!imageResponse.ok){
        console.log('error');
    }
    let imageResponseInfo = await imageResponse.json();
    console.log(imageResponseInfo);
    let photoList = imageResponseInfo.photos;
    if (solSelected> maxSol) {
        document.querySelector("#resultsHeader").innerHTML = ``;
        resultsDisplayed.innerHTML = `There are no photos from camera ${cameraSelected} on rover ${roverName} from sol ${solSelected}.<br>That sol number is higher than the maximum available for this rover: ${maxSol}.<br> Please enter a valid sol.`;
    } else if(photoList.length === 0){
        document.querySelector("#resultsHeader").innerHTML = ``;
        resultsDisplayed.innerHTML = `There are no photos from camera ${cameraSelected} on rover ${roverName} from sol ${solSelected}.<br> Please make another selection.`;
    } else {
        for(j=0; j< photoList.length; j++){
        let imageSRC = photoList[j].img_src;
        let cameraInfo= photoList[j].camera.full_name;
        let earthDate = photoList[j].earth_date;
        let imageAlt = `${roverName} ${cameraInfo} sol: ${solSelected} Earth Date: ${earthDate}`
        document.querySelector("#resultsHeader").innerHTML = `<div class="col">Rover: ${roverName}</div><div class="col">Sol: ${solSelected}</div><div class="w-100"></div><div class="col">Camera: ${cameraInfo}</div><div class="col">Earth Date: ${earthDate}</div>`;
        if((j+1)%4 === 0){
            document.querySelector(".results").innerHTML += ` <div class="col outputImage"><img src="${imageSRC}" alt="${imageAlt}" class="img-thumbnail"><br><a href="${imageSRC}" target="_blank">open full size in new tab</a></div>
            <div class="w-100"></div>`;}
        else {
                document.querySelector(".results").innerHTML += ` <div class="col outputImage"><img src="${imageSRC}" alt="${imageAlt}" class="img-thumbnail"><br><a href="${imageSRC}" target="_blank">open full size in new tab</a></div>`
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
}

// submitTwoCamera.addEventListener("change", fetchImages);
// submitTwoSol.addEventListener("change", fetchImages);
// submitOne.addEventListener("change", fetchImages);
// if((j+1)%4 === 0){

// document.querySelector("#results").innerHTML += ` <div class="w-100"><img src="${imageSRC}" alt="${imageAlt}" class="img-thumbnail"></div>`;}
// else {
//     document.querySelector("#results").innerHTML += ` <div class="col"><img src="${imageSRC}" alt="${imageAlt}" class="img-thumbnail"></div>`
// }
