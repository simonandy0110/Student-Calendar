// todoList function used on button click to get user input and add to list
function todoList() {
	// stores the user value
	var item  = document.getElementById('todoInput').value;
    if ((item!=""))
    {
	// create a text node from the user input ()
	var text = document.createTextNode(item);
	// create a li tag
	var newItem = document.createElement('li');
	// add the user input to the li tag
	newItem.appendChild(text);
    var dt = new Date();
    newItem.append(" - Created " + (dt.getMonth() + 1) + "/" +dt.getDate()+ "/" +dt.getFullYear() +" @ "+ dt.getHours() +
    ":" + dt.getMinutes()+ ":" + dt.getSeconds()) + "\n"; 
	// append the li to the html todoList id tag
	document.getElementById('todoList').appendChild(newItem);
    
    
    var progress = document.createElement('input');
    progress.setAttribute('type', 'button');
    progress.setAttribute("value", "Set in progress");
    document.getElementById('todoList').appendChild(progress);
    newItem.appendChild(progress);
    progress.addEventListener('click', function()
    {
        newItem.style.color = "DarkViolet";
        if (progress.value == "Set in progress")
        {
        progress.setAttribute("value", "Currently in Progress");
        progress.style.backgroundColor = "DarkViolet"; 
        var da = new Date(); 
        newItem.append(" - Started " + (da.getMonth() + 1) + "/" +da.getDate()+ "/" +da.getFullYear() +" @ "+ da.getHours() +
        ":" + da.getMinutes()+ ":" + da.getSeconds() + "\n");
        }
    });
    var removeTask = document.createElement('input');
    removeTask.setAttribute('type', 'button');
    removeTask.setAttribute("value", "Completed");
    document.getElementById('todoList').appendChild(removeTask);
    newItem.appendChild(removeTask);
    removeTask.addEventListener('click', function()
    {
        newItem.parentNode.removeChild(newItem);
    });
    }
    else 
    {
        alert("Enter a valid task"); 
    }
    
}
