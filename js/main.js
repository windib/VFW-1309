//Windi Bahl
//VFW 1309
//Week 3
//Project 3

window.addEventListener("DOMContentLoaded", function(){
    
    // getElementById Function
    function $(x){
        var theElement = document.getElementById(x);
        return theElement;
    }
    
    //Create 'Select Field' element, and pop with options
    function makeCats() {
        var formTag = document.getElementByTagName('form')
        //will become an array of the form tags in the additem.html
        selectLi= $('select'),
        makeSelect = document.createElement('select')
        makeSelect.setAttribute('id', 'groups');
        for (var i=0,j=reviewGroups.length; i < j; i++) {
            var makeOption = document.createElement('option');
            var optText = reviewGroups[i];
            makeOption.setAttribute('value', optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect);
    }
    
    //Find value of selected radio button
    function getSelectedRadio() {
        var radios = document.forms[0].return;
        for (var i=0; i < radios.length; i++) {
            if (radios[i].checked) {
                returnValue = radios[i].value;
            }
        }
    }
    
    //Find value of checkboxes
    function getCheckboxValue(){
        if ($('favorite').checked) {
            favoriteValue = $('favorite').value;
        }else{
            favoriteValue = "No"
        }
    }
    
    //Toggle control
    function toggleControls(n){
        switch (n) {
            case'on':
                $('reviewForm').style.display = 'none';
                $('clear').style.display = 'inline';
                $('display').style.display = 'none';
                $('addNew').style.display = 'inline';
                break;
            case'off':
                $('reviewForm').style.display = 'block';
                $('clear').style.display = 'inline';
                $('display').style.display = 'none';
                $('addNew').style.display = 'none';
                break;
            default:
                return false;
        }
    }
    
    //Store Data
    function storeData(key) {
        //only generate new if there is a new item
        // if no key them new key is needed
        if(key) {
            var id =Math.floor(Math.random()*100000001);
        } else {
            //set id to exisiting id if item is being edited
            //object.properties contain an array with the form label and input values
            id = key;
        }
        getSelectedRadio();
        gerCheckboxValue();
        var item={};
        item.groups = ['Group:', $('groups').value];
        item.business = ['Business:', $('business').value];
        item.type = ['Type:', $('type').value];
        item.rating = ['Rating:', $('rating').value];
        item.back = ['Return:', backValue];
        item.note = ['Notes:', $('notes').value];
        localStorage.setItem(id,JSON.stringify(item));
        alert('Review is saved!')
    }
    
    //Show Data
    function showData() {
        if (localStorage.length ===0){
            alert('No saved reviews!')
            toggleControls('off');
        } else {
            toggleControls('on');
            var makeDiv = document.createElement('div')
            makeDiv.setAttribute('id', 'items');
            var makeList = document.createElement('ul');
            makeDiv.appendChild(makeList);
            document.body.appendChild(makeDiv);
            for (var i=0, l=localStorage.length; i<l; i++) {
                var makeLi = document.createElement('li');
                var linksLi = document.createElement('li');
                makeList.appendChild(makeLi);
                var key = localStorage.key(i);
                var value = localStorage.getItem(key);
                var obj = JSON.parse(value);
                var makeSubList = document.createElement('ul');
                makeLi.appendChild(makeSubList);
                for (var n in obj) {
                    var makeSubLi = document.createElement('li');
                    makeSubList.appendChild(makeSubLi);
                    var optSubText = obj[n][0]+""+obj[n][1];
                    makeSubLi.innerHTML = optSubText;
                    makeSubList.appendChild(linksLi);
                }
                makeItemLinks(localStorage.key(i), linksLi);
            }
        }
    }
        
    //Make Item Links
    
    function makeItemLinks(key, linksLi) {
        var editLink = document.createElement('a');
        editLink.href = '#';
        editLink.key = key;
        var editText = "Edit Review";
        editLink.addEventListener('click', editItem);
        editLink.innerHTML = editText;
        linksLi.appendChild(editLink);
        
        var breakTag = document.createElement('br');
        linksLi.appendChild(breakTag);
        
        var deleteLink = document.createElement('a');
        deleteLink.href = "#";
        deleteLink.key = key;
        var deleteText = "Delete Review";
        deleteLink.addEventListener('click', deleteItem);
        deleteLink.innerHTML = deleteText;
        linksli.appendChild(deleteLink);
        
    }
    
    //Edit Single Item


    function editItem (){
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);
        
        toggleControls('off');
        
        $('groups').value = item.groups[1];
        $('business').value = item.business[1];
        $('type').value = item.type[1];
        $('rating').value = item.rating[1];
        $('back').value = item.goBack[1];
        var radios = document.forms[0].back;
        for (var i=0; i<radios.length; i++) {
            if (radios[i].value=="happy"&&item.category[1]=="Happy") {
                radios[i].setAttribute('checked','checked');
            } else if (radios[i].value=="Not Happy"&&item.catergory[1]=="Not Happy") {
                radios[i].setAttribute('checked','checked');
            }
        }
        if (item.favs[1]=="Yes") {
            $('favorite').setAttribute('checked','checked');
        }
        $('notes').value = item.note[1];
        
        saveBook.removeEventListenet('click', storeData);
        $('submit').value = "Save Edits";
        var editSubmit = $('submit');
        editSubmit.addEventListener('click', validate);
        editSubmit.key = this.key;
    }
    
    //Delete Item
    
    function deleteItem() {
        var ask = confirm("Are you sure you want to delete?");
        if (ask) {
            localStorage.removeItem(this.key);
            alert("Deleted!!");
            window.location.reload();
        } else {
            alert("The review is still saved!");
        }
    }
    function validate(e) {
        var getGroup = $('groups');
        var getBusiness = $('business');
        var getType = $('type');
        var getRating = $('rating');
        var getback = $('back');
        var errorBox = $('errors');
        
        errMsg.innerHTML = "";
        getGroup.style.border = "1px solid black";
        getBusiness.style.border = "1px solid black";
        getType.style.border = "1px solid black";
        getRating.style.border = "1px solid black";
        getback.style.border = "1px solid black";
        errorBox.style.border = "1px solid #aaa";
        
        var messageAry = [];
        
        if (getGroup.value==="--Choose a Source--") {
            var groupError = "Please choose a source.";
            getGroup.style.border = "1px solid #ff8e33";
            errorBox.style.border = "1px solid #f8e33";
            messageAry.push(groupError);
        }
        
        if (getBusiness.value==="") {
            var businessError = "Please enter a business.";
            getBusiness.style.border = "1px solid #ff8e33";
            errorBox.style.border = "1px solid #f8e33";
            messageAry.push(titleError);
        }
        
        if (gettype.value==="") {
            var TypeError = "Please enter a business type.";
            getType.style.border = "1px solid #ff8e33";
            errorBox.style.border = "1px solid #f8e33";
            messageAry.push(authorError);
        }
        
        if (getRating.value==="") {
            var ratingError = "Please enter a rating.";
            getrating.style.border = "1px solid #ff8e33";
            errorBox.style.border = "1px solid #f8e33";
            messageAry.push(pagesError);
        }
        
        if (getBack.value==="") {
            var backError = "Please indicate if you would return.";
            getBack.style.border = "1px solid #ff8e33";
            errorBox.style.border = "1px solid #f8e33";
            messageAry.push(dateError);
        }
        
        if (errorBox.value==="") {
            var errorBoxError = "";
            errorBox.style.border = "1px solid #ff8e33";
            errorBox.style.border = "1px solid #f8e33";
            messageAry.push(errorBoxError);
        }
        

    }
        