

var slotsList= new Array();
//generate time slots
$(document).ready(function(){
  var startTime=11;
  var slotsToGenerate = 6;

  //get the button text, like "11am - 12pm"
  for(var i=0;i<slotsToGenerate;i++)
  {
    var para = document.createElement("BUTTON");
    var buttonText  ="";
    var beginTime =i+startTime;
    var endTime=i+startTime+1;
    console.log(beginTime);
    console.log(endTime);
    if(endTime<12)
    {     
      buttonText = beginTime + 'am - '+ endTime + 'am' ;
    }else if(endTime===12)
    {
      buttonText = beginTime + 'am - '+ endTime + 'pm' ;
    }else if(beginTime===12)
    {
      endTime = endTime-12;
      buttonText = beginTime + 'pm - '+ endTime + 'pm';
    }
    else if(beginTime>12)
    {
      beginTime = beginTime-12;
      endTime = endTime-12;
      buttonText = beginTime +'pm - '+ endTime + 'pm' ;
    }
    var text = document.createTextNode(buttonText);
    para.appendChild(text);

    var element = document.getElementById("slotsDiv");
    element.appendChild(para);

    para.setAttribute("class","btn modal-trigger");
    para.setAttribute("data-target", "modal1");
    var btnIdNumber = i+3;
    para.id="btn"+btnIdNumber;
  }
 
})


//Modal Window
document.addEventListener('DOMContentLoaded', function() { 

  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
  
});

//capture the button who opens the modal window
var capturedBtnId = "";
document.getElementById("slotsDiv").addEventListener("click", function (event) {
  
  capturedBtnId=event.target.id

  //if slot already filled
  if(document.getElementById(capturedBtnId).style.backgroundColor === "red")
  {
    console.log(capturedBtnId);
    for(var i=0; i<slotsList.length;i++){
      if(slotsList[i].btnId == capturedBtnId)
      {
        console.log("found it!"+slotsList[i].name);
        document.getElementById("name").value = slotsList[i].name;
        document.getElementById("phone_number").value = slotsList[i].phoneNumber;
        break;
      }
    }
  }

})



//submit event
document.getElementById('ModalSubmit').addEventListener('click', function(){
  
  var slot = 
  {
    btnId: capturedBtnId,
    name: document.getElementById("name").value, 
    phoneNumber : document.getElementById("phone_number").value  
  }

  var foundIt= "false";
  for(var i=0; i<slotsList.length;i++){
    if(slotsList[i].btnId == capturedBtnId)
    {
      slotsList[i].name = document.getElementById("name").value;
      slotsList[i].phoneNumber = document.getElementById("phone_number").value;
      foundIt = "true";
      break;
    }
  }
  console.log(foundIt);
  if(foundIt === "false" && slot.name !=="" && slot.phoneNumber !=="")
  {
    slotsList.push(slot);
    document.getElementById(capturedBtnId).style.backgroundColor = "red";
  }


  for(var i=0; i<slotsList.length;i++)
  {
    console.log(slotsList[i]);
  }

  cleanModal();
});

//close modal event
document.getElementById('ModalClose').addEventListener('click', function(){
  cleanModal();
})

//modal clean
function cleanModal()
{
  document.getElementById('name').value = "";
  document.getElementById('phone_number').value = "";
}
