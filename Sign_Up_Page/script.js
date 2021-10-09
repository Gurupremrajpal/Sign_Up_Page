// line 2- this means the function will changes after the value is executed 
document.querySelector("#zip").addEventListener("change", displayCity);

document.querySelector("#pass").addEventListener("click", password);

document.querySelector("#user").addEventListener("change", username);

document.querySelector("#state").addEventListener("click",displayStates);

$("#submitBtn").on("click", submitform);


function submitform(){
  if($("#user").val() == '' || $("#pass").val().length< 6 || $("#pass_again").val() != $("pass").val()){
    if($("#user").val() == ''){
      $("#empty_user_name").html("Enter username");
    }
    if($("#pass").val().length<6){
      $("#pass_error").html("Password is less than 6 characters");
    }
    if($("#pass").val() == ''){
      $("#pass_error").html("Enter Password")
    }
    if($("#pass_again").val() != $("#pass").val()){
      $("#pass_again_error").html("Password should be same as above");
    }
    else if($("#user").val() != '' && $("#pass").val().toString().length && $("#pass_again").val()== $("#pass").val()) {
      $("#message").html("Account Created");
    }
  }
}



async function displayCity(){
  
  let zipCode = document.querySelector("#zip").value;
  console.log(zipCode);
  let url = `https://cst336.herokuapp.com/projects/api/cityInfoAPI.php?zip=${zipCode}`;
  //in zip = zipCode we used zipCode variable becaise we are taking input from user.
  let data = await fetchData(url);
  if(!data){
  $("#city").html("");
  $("#lat").html("");
  $("#long").html("");
  $("#zip_message").html("Zip Code Not Found");
  }
  else{
  $("#city").html(data.city);  
  $("#lat").html(data.latitude);
  $("#long").html(data.longitude);
  $("#zip_message").html("");
  }

}
//this is the fetch function for zip code 
async function fetchData(url){
   let response = await fetch(url);
   let data = await response.json();
   console.log(data);
   return data;
}

async function password(){
  let passw = document.querySelector("#pass").value;
  let urll= `https://itcdland.csumb.edu/~milara/api/suggestedPwd.php?length=8`;
  let pass_data= await fetchData(urll);
  $("#suggestedpass").html(`<br> <br> <font color="blue"> Suggested Password: </font> ${pass_data.password}`);
}

async function username(){
  let user= document.querySelector("#user").value;
  let url = `https://cst336.herokuapp.com/projects/api/usernamesAPI.php?username=${user}`;
  let user_data = await fetchData(url);
  if(user_data.available){
      document.querySelector("#username_message").innerHTML =' <span class="text-success">Available </span>';
    }else{
        document.querySelector("#username_message").innerHTML =' <span class="text-danger"> Not Available </span>';
    }
}

async function fetchData(url){
   let response = await fetch(url);
   let user_data = await response.json();
   console.log(user_data);
   return user_data;
}

async function displayStates() {
  
  let url = "https://cst336.herokuapp.com/projects/api/state_abbrAPI.php";
  
  let data = await fetchData(url);
 for(x of data){
    // document.querySelector("#state").innerHTML =``;
    $("#state").append(`<option value = "${x.usps}">${x.state}</option>`);
 }
    let abbs = $("#state").val();
    console.log(abbs);
    displayCounty(abbs);
}

async function displayCounty(abbs){
    $("#county").html("");
    let url = `https://cst336.herokuapp.com/projects/api/countyListAPI.php?state=${abbs}`;
    let data = await fetchData(url);
    for(x of data){
        $("#county").append(`<option>${x.county}</option>`);
    }

}


