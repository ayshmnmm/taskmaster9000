// extremely optimized js
function save_data() {
    // Scrapes data off DOM
    var todo = (document.getElementById("tdl").innerHTML);
    localStorage.setItem('todo', todo);
    var indo = (document.getElementById("idl").innerHTML);
    localStorage.setItem('indo', indo);
    var dodo = (document.getElementById("ddl").innerHTML);
    localStorage.setItem('dodo', dodo);
}

function load_data() {
    // Loads data into DOM
    var todo = localStorage.getItem('todo')
    if (todo) document.getElementById("tdl").innerHTML = todo;
    var indo = localStorage.getItem('indo')
    if (indo) document.getElementById("idl").innerHTML = indo;
    var dodo = localStorage.getItem('dodo')
    if (dodo) document.getElementById("ddl").innerHTML = dodo;
}

function newtask(task) {
    // Called whenever a new task in created
    if (task.value) {

        var t = document.createElement("li");
        t.innerHTML = '<span class="prev"><</span>'.concat('<span class="task">'.concat(String(task.value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').concat('</span><span class="next">></span>')));
        task.value = "";
        document.getElementById("tdl").appendChild(t);
        save_data();
        refreshnex();

    }
}

function refreshnex() {
    // Refershes all items and binds their "next" buttons to the appripirate fontion, allowing you to
    // move items forward between catagories
    var nexbut = document.getElementsByClassName("next");
    var i;
    for (i = 0; i < nexbut.length; i++) {
        nexbut[i].onclick = function() {
            var cn = this.parentElement.parentElement.id;
            var elem = this.parentElement;
            if (cn === "tdl") {
                document.getElementById("idl").appendChild(elem);
            } else if (cn === "idl") {
                document.getElementById("ddl").appendChild(elem);
            } else {
                elem.style.display = "none";
            }
            save_data();
        }
    }

    // moves items backwards between catagories
    var prevbut = document.getElementsByClassName("prev");
    for(i = 0; i < prevbut.length; i++){
      prevbut[i].onclick = function() {

        var cn = this.parentElement.parentElement.id;
        var elem = this.parentElement;
        if (cn === "ddl") {
            document.getElementById("idl").appendChild(elem);
        } else if (cn === "idl") {
            document.getElementById("tdl").appendChild(elem);
        } else {
            elem.style.display = "none";
        }
        save_data();
      }
    }


    var task = document.getElementById("t-input");
    task.addEventListener("keydown", function(e) {
        if (e.keyCode === 13) { //checks whether the pressed key is "Enter"
            newtask(task);
        }
    })
}



document.addEventListener("DOMContentLoaded", function() {
    // Grabs all tasks on next reload
    load_data();
    refreshnex();
    var cls = document.getElementById("clear-ddl");

    // Binds funtions to certain buttons

    cls.onclick = function() {
        var ddl = document.getElementById("ddl");
        ddl.innerHTML = "";
        localStorage.removeItem("dodo")
    }

    var clsall = document.getElementById("clear-all");
    clsall.onclick = function() {
        document.getElementById("tdl").innerHTML = '<li><input type="text" id="t-input" placeholder="Enter task..." autocomplete="off"></li>';
        refreshnex()
        document.getElementById("idl").innerHTML = "";
        document.getElementById("ddl").innerHTML = "";
        localStorage.clear();
    }
});
