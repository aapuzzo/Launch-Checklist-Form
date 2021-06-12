window.addEventListener("load", function() {
   
   let form = document.querySelector("form");
   let pilotName = document.querySelector("input[name=pilotName]");
   let copilotName = document.querySelector("input[name=copilotName");
   let fuelLevel = document.querySelector("input[name=fuelLevel]");
   let cargoMass = document.querySelector("input[name=cargoMass]")
   let faultyItems = document.getElementById("faultyItems");
   
   let launchStatus = document.getElementById("launchStatus");
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");
   //if this is less then 1, shuttle is not ready
   let inputFault = 1;
   
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json){
         console.log(json)
         //random number between 1-length of array of data
         let i = Math.floor(Math.random() * (json.length - 1) + 1);            
         const missionTarget = document.getElementById("missionTarget");
         missionTarget.innerHTML += `               
         <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[i].name}</li>
               <li>Diameter: ${json[i].diameter}</li>
               <li>Star: ${json[i].star}</li>
               <li>Distance from Earth: ${json[i].distance}</li>
               <li>Number of Moons: ${json[i].moons}</li>
            </ol>
         <img src="${json[i].image}">                     
         `;
      });
   });  
   
   form.addEventListener("submit", function(event){
      event.preventDefault();
      defaultStatus();
      if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
         alert("ALL FIELDS ARE REQUIRED");
      }      
      
      else if (pilotName.value === "" || Number(pilotName.value)) {
         // faultyItems.style.visibility = "visible";
         pilotStatus.innerText = `You do not have a pilot`;
         alert("Please fill out Pilot Name correctly (must include letters)");         
         inputFault--;         
      }
      else if (copilotName.value === "" || Number(copilotName.value)){
         // faultyItems.style.visibility = "visible";
         copilotStatus.innerText = `You do not have a Co-pilot.`;
         alert("Please fill out Co-pilot Name correctly (must include letters)");
         inputFault--;
      }
      else if (fuelLevel.value === "" || isNaN(fuelLevel.value) || fuelLevel.value < 10000) {   
         faultyItems.style.visibility = "visible";
         fuelStatus.innerText = `There is not enough fuel for the journey`;
         redStatus(); 
         alert("Please put in an acceptable number for Fuel Level (10000 or larger)"); 
         inputFault--;         
      }         
      else if (cargoMass.value === "" || isNaN(cargoMass.value) || cargoMass.value < 0 || cargoMass.value > 10001) {
         faultyItems.style.visibility = "visible";
         if(cargoMass.value > 10001) {
            cargoStatus.innerText = `There is too much mass for the shuttle to take off`;            
         }
         else {
            cargoStatus.innerText = `Please put in a positive number for Cargo Mass`;
         }
         redStatus();          
         alert("Please put in an acceptable number for Cargo Mass (1-9999)");          
         inputFault--;         
      }
      //may be unneeded 
      else if (inputFault = 1){
         greenStatus();
         defaultStatus();
      }
   });

   function defaultStatus() {           
      //default statuses
      pilotStatus.innerText = `Pilot ${pilotName.value} is ready for launch.`;
      copilotStatus.innerText = `Co-Pilot ${copilotName.value} is ready for launch`;
      fuelStatus.innerText = `Fuel Level high enough for launch`;
      cargoStatus.innerText = `Cargo mass low enough for launch`;
   }
  
   function redStatus() {
      launchStatus.innerText = `Shuttle not ready for launch`;
      launchStatus.style.color = "red"; 
   }
  
   function greenStatus() {
      faultyItems.style.visibility = "visible";
      launchStatus.innerText = `Shuttle is ready for launch`;
      launchStatus.style.color = "green"; 
   }
 
});


