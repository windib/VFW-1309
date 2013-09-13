//Windi Bahl
//VFW 1305
//7-17-13
//Project 2

window.addEventListener("DOMContentLoaded", function(){
    
    function s(x) {
     var element = document.getElementById(x);
     return element
    }
    
    function makeCatergories(){
        var formTag = document.getElementsByTagName("form");
        var selectLi = s('select');
        var makeSelect = document.createElement('select');
        makeSelect.setAttribute("id", "groups");
        for (var i=0, j=accountList.length; i<j; i++) {
            var makeOption = document.createElement('option');
            var optionText = accountList[i];
            makeOption.setAttribute("value", optionText);
            makeOption.innerHTML = optionText;
            makeOption.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect);
    };
    
    function getSelectedRadio(){
        var radios = document.forms[0].primary;
        for (var i=0; i<radios.length; i++) {
            if (radios[i].checked) {
                primaryValue = radios[i].value;
            }
        }
    };
    
    function toggleControls(n) {
        switch (n) {
            case "on" :
                s('addForm').style.display = "none";
                s('clear').style.display = "inline";
                s('displayLink').style.display = "none";
                s('addNew').style.display = "inline";
                break;
            case "off" :
                s('addForm').style.display = "block";
                s('clear').style.display = "inline";
                s('displayLink').style.display = "inline";
                s('addNew').style.display = "none";
                s('items').style.display = "none";
                break;
            default:
                return false;
        }
    }
    
    function storeLocalDat() {
        var getTool = Math.floor(Math.random()*100000001);
        getRadios();
        
        var it              = {};
            it.business     = ["Business Name", main("business").value];
            it.type         = ["Business Type", main("type").value];
            it.goBack       = ["Going Back", main("goBack").value];
            it.rank         = ["Rank", main("rank").value];
            it.experience   = ["Experience", typeValue];
            it.again        = ["Again", typeValue];
            it.notes        = ["Notes", main("notes").value];
            
            localStorage.setItem( getID, JSON.stringify(it) );
            alert("Data has been saved!");
            
    }

    function getData() {
        toggle("on");
        
        if (localStorgae.length === 0 ) {
        alert ("Nothing to show")
        }else{
            
            var make = document.createElement("div");
            make.setAttribute("id", "items");
            var makeList = document.createElement('ul');
            make.appendChild(makeList);
            docment.body.appendChild(make);
            main('items').style.display="block";
            
            for (var i=0, j=localstorage.length; i<j; i++) {
                var makeli = document.creatElement("li");
                makeList.appendChild(makeli);
                var key = localStorage.key(i);
                var value = localStorage.getItem(key);
                var object = JSON.parse(value);
                var makeSubList = document.createElement('ul');
                makeli.appendChild(makeSubList);
                for ( var m in object ) {
                    var makeSubLi = document.createElement("li");
                    makeSubList.appendChild(makeSubLi);
                    var optSub = object [m][0]+" : "+object[m][1];
                    makeSubLi.innerHTML = optSub;
                }
            }
        }
    }

    function clearLocalData() {
        var ruSure = confirm("Are you sure you want to clear the data?");
        if (ruSure) {
            if (localStorage.length === 0) {
                alert("Local storage is empty.")
            }else{
                localStorage.clear();
                alert("All data has been deleted!");
                window.location.reload();
                return false;
            }
        }
    }
    
    var sliderRange = document.getElementById("range");
    var sliderDisplay = document.getElementById("Amount");
    
    sliderRange.onchange = function(){
        sliderDisplay.value = sliderRange.value;
    }
    
    var addNew = ["Yes", "No", "Maybe"]
        returnValue;
    dropDownList();
    
    var display = main("Info");
    display.addEventListener("click", getData);
    
    var button = main("Value");
    button.addEventListener("click", storeLocalData);
    
    var clear = main("clear data");
    clear.addEventListener("click", clearLocalData);
        
});


