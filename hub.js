$("#disappear").hide();
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
}}
function addtodo(){
  var firebaseref=firebase.database().ref();
  var todo=document.getElementById("todo").value;
  firebaseref.child("Todo").push().child("Todo").set(todo).then(function(response){
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
    description.innerHTML+="<td >Todo :"+i+"</td><td >"+todo+"</td><td><a class='btn btn-danger' id='delbtn'  onclick='deltodo("+i+")'>Delete</a></td><td ><a class='btn btn-primary' id='edit' onclick='edittodo("+i+")'>Edit</a></td>";
  }
  }
function getError(error){
  console.log(error);
}
function deltodo(i)
{
  var delRef=firebase.database().ref("Todo");
  delRef.once("value",function(response){
    var objects=response.val();
    var todos=Object.keys(objects);
      var key=todos[i];
      firebase.database().ref("Todo").child(key).remove();
      alert("Successfully Deleted The Record");
})
}
  function edittodo(j)
  {
    $("#disappear").show();
  var delRef=firebase.database().ref("Todo");
  delRef.once("value",function(response){
  var objects=response.val();
  var edit=objects.Todo;
  var todos=Object.keys(objects);
  for(var i=0 ; i< todos.length ; i++)
  {
    var t=todos[i];
    var value=i;
    var todo=objects[t].Todo;
    var object=[];
    object.push(i,todo,todos[j]);
    if(object[0]===j)
    {
      var edit=object[1];
      var key=object[2];
      var edittodo=document.getElementById("edit_todo_data");
      var keytodo=document.getElementById("edit_todo_key");
      var update=document.getElementById("update-btn");
      edittodo.value=edit;
      keytodo.value=key;
}
}})}
function updatetodo()
{
    var updatetodo=document.getElementById("edit_todo_data").value;
    var updatekey=document.getElementById("edit_todo_key").value;
    console.log(updatekey);
    console.log(updatetodo);
    var data={
      "Todo":updatetodo
    }
    var updates={};
    updates[updatekey]=data;
    firebase.database().ref("Todo").update(updates);
    alert("Successfully updated the Record");
    $("#disappear").hide();

    }
