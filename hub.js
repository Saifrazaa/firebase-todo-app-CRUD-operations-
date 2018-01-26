function firebasesave(){
  var email=document.getElementById("email").value;
  var password=document.getElementById("pwd").value;
if(password.length<=6)
{
  varx=document.getElementById("pwd_msg").innerHTML="<div class='alert alert-danger' style='margin:0 auto;text-align:center'>Password length should be grater than 6 characters</div>";
}
else {
  varx=document.getElementById("pwd_msg").innerHTML="";
  firebase.auth().createUserWithEmailAndPassword(email,password).then(function(success){
    console.log(success);
  }).catch(function(error){
    varx=document.getElementById("email_msg").innerHTML="<div class='alert alert-danger' style='margin:0 auto;text-align:center'>"+error.message+"</div>";

    console.log(error);
  })

}
}
function addtodo(){
  var firebaseref=firebase.database().ref();

  var todo=document.getElementById("todo").value;

  firebaseref.child("Todo").push().child("Todo").set(todo).then(function(response){
    //console.log(response);
  }).catch(function(error){
    //console.log(error);
  });



}
var firebaseref=firebase.database().ref('Todo');
firebaseref.on("value",getResponse,getError);
function getResponse(response){
  var description=document.getElementById('description');
  description.innerHTML="";
  var objects=response.val();
  var todos=Object.keys(objects);

  for(var i=0 ; i< todos.length ; i++)
  {
    var t=todos[i];
    var todo=objects[t].Todo;
    console.log(todo);
    description.innerHTML+="<table class='table table-bordered'><tr><td >Todo :"+i+"</td><td >"+todo+"</td><td class='btn btn-danger'>Delete</td><td class='btn btn-primary'>Edit</td></tr></table>";
}
}
function getError(error){
  console.log(error);
}
