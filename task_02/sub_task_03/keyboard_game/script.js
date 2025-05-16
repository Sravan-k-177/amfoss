function highlightKey(event){
    var key = event.key.toLowerCase();
    switch(key){
        case 'q':
            console.log('q');
            break;
        case 'w':
            console.log('w');
            break;
        case 'e':
            console.log('e');
            break;
        case 'r':
            console.log('r');
            break;
        case 't':
            console.log('t');
            break;
        case 'y':
            console.log('y');
            break;
        case 'u':
            console.log('u');
            break;
        case 'i':
            console.log('i');
            break;
        case 'o':
            console.log('o');
            break;
    }
}

function createGame(){
    level=1;

}

let inputButtons = ['button101', 'button201','button301','button401','button501','button601','button701','button801','button901'];
let formedSequence = []


document.addEventListener('keydown', highlightKey());

function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }