
var itemList = document.getElementById('items');
var form = document.getElementById('addDish');
var submitBtn = document.getElementById('submit_menu');

form.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
submitBtn.addEventListener('click', submitMenu);

// 增加菜名
function addItem(e) {
    e.preventDefault()

    // Get input value
    var newItem = document.getElementById('dishName').value;
    if (newItem === "" && typeof newItem === "string") {
        alert('菜名不能为空')
        return false;
    }

    // Check if dish has been added
    var Check = checkExists(newItem)
    if (Check){
        alert(`${newItem} 已经加入菜单`)
        return false;
    }

    // Create new li element
    var li = document.createElement('li');

    // Add class
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(newItem));

    // Create del button
    var deleteBtn = document.createElement('button');

    // Add class to del button
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';

    // Append text node
    deleteBtn.appendChild(document.createTextNode("X"));

    // Append button to li
    li.appendChild(deleteBtn);

    // Append li to list
    itemList.appendChild(li);

}

// 提交菜单
function submitMenu(){
    // Get party date
    const partydate = document.getElementById('party-time').value;

    // Get party title
    const partyname = document.getElementById('party-name').value;

    // Get Menu
    var items = itemList.getElementsByTagName('li');
    var dishlist = Array.from(items);
    var menu = dishlist.map(dish => dish.firstChild.textContent);

    // Send to backend
    console.log("Submit Menu")
    
    // redirect to home page
}

function removeItem(e){
    if (e.target.classList.contains('delete')){
        var li = e.target.parentElement;
        itemList.removeChild(li);
    }
}

function checkExists(inputDish){
    var items = itemList.getElementsByTagName('li');
    flag = 0
    Array.from(items).forEach(function(item){
        var itemName = item.firstChild.textContent;
        if (itemName === inputDish) {
            flag = 1
        }
    })
    if (flag === 1) {
        return true
    }else{
        return false;
    }    
}

// var button = document.getElementById('button').addEventListener
// ('click', addDish);

// var nameInput = document.querySelector('#party-name');
// nameInput.addEventListener('keydown', runEvent);

// function runEvent(e){
//     console.log(e.type);
//     console.log(e.target.value);
// };

// function addDish(){
//     // console.log('增加菜名');
//     var dish = document.getElementById('items')
//     old_html = dish.innerHTML
//     dish.innerHTML = old_html + '<input type=\'text\' id="item">'
// };