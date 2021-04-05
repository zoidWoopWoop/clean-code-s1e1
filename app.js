//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.querySelector(".incomplete-task__list");//ul of #incompleteTasks
var completedTasksHolder=document.querySelector(".completed-task__list");//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");

    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    //label
    var label=document.createElement("label");//label
    //input (text)
    var editInput=document.createElement("input");//text
    //button.edit
    var editButton=document.createElement("button");//edit button

    //button.delete
    var deleteButton=document.createElement("button");//delete button
    var deleteButtonImg=document.createElement("img");//delete button image

    listItem.classList.add('incomplete-task__item');

    checkBox.type="checkbox";
    checkBox.classList.add('incomplete-task__checkbox');

    label.innerText=taskString;
    label.classList.add('incomplete-task__name', 'task');

    //Each elements, needs appending

    editInput.type="text";
    editInput.classList.add('incomplete-task__text', 'text_hidden', 'task');

    editButton.classList.add('incomplete-task__btn', 'btn', 'edit');
    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.

    deleteButton.classList.add('incomplete-task__btn', 'btn', 'delete');
    deleteButtonImg.src='./remove.svg';
    deleteButtonImg.alt = 'delete button';
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;

    var editInput=listItem.querySelector('input[type=text]');
    var label=listItem.querySelector("label");
    var editBtn=listItem.querySelector(".edit");
    var containsClass=listItem.classList.contains("edit-mode");
    //If class of the parent is .edit-mode
    if(containsClass){

        //switch to .edit-mode
        //label becomes the inputs value.
        label.classList.remove('name_edit');
        label.innerText=editInput.value;
        editInput.classList.remove('text_edit');
        editInput.classList.add('text_hidden');
        editBtn.innerText="Edit";
    }else{
        label.classList.add('name_edit');
        editInput.classList.add('text_edit');
        editInput.classList.remove('text_hidden');
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .edit-mode on the parent.
    listItem.classList.toggle("edit-mode");
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    const check = listItem.querySelector('.incomplete-task__checkbox');
    const name = listItem.querySelector('.incomplete-task__name');
    const text = listItem.querySelector('.incomplete-task__text');
    const btnEdit = listItem.querySelector('.edit');
    const btnDel = listItem.querySelector('.delete');

    check.classList.remove('incomplete-task__checkbox');
    name.classList.remove('incomplete-task__name');
    text.classList.remove('incomplete-task__text');
    btnEdit.classList.remove('incomplete-task__btn');
    btnDel.classList.remove('incomplete-task__btn');

    check.classList.add('completed-task__checkbox');
    name.classList.add('completed-task__name', 'name_done');
    text.classList.add('completed-task__text');
    btnEdit.classList.add('completed-task__btn');
    btnDel.classList.add('completed-task__btn');

    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem=this.parentNode;

    const check = listItem.querySelector('.completed-task__checkbox');
    const name = listItem.querySelector('.completed-task__name');
    const text = listItem.querySelector('.completed-task__text');
    const btnEdit = listItem.querySelector('.edit');
    const btnDel = listItem.querySelector('.delete');

    check.classList.remove('completed-task__checkbox');
    name.classList.remove('completed-task__name', 'name_done');
    text.classList.remove('completed-task__text');
    btnEdit.classList.remove('completed-task__btn');
    btnDel.classList.remove('completed-task__btn');

    check.classList.add('incomplete-task__checkbox');
    name.classList.add('incomplete-task__name');
    text.classList.add('incomplete-task__text');
    btnEdit.classList.add('incomplete-task__btn');
    btnDel.classList.add('incomplete-task__btn');

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector("input[type=checkbox]");
    var editButton=taskListItem.querySelector("button.edit");
    var deleteButton=taskListItem.querySelector("button.delete");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.