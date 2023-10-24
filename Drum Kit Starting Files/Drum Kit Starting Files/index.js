const numberOfbutton =document.querySelectorAll(".drum").length;


for(let i=0;i<numberOfbutton;i++){ 
document.querySelectorAll(".drum")[i].addEventListener("click", function () {


   let buttonInnerHtml=this.innerHTML;
   switch (buttonInnerHtml) {
    case 'w':
        this.style.color="black";
        let audio1=new Audio("./sounds/crash.mp3");
        audio1.play();

        break;
    
    case 'a':
        this.style.color="black";
        let audio2=new Audio("./sounds/kick-bass.mp3");
        audio2.play();

        break;
    case 's':
        this.style.color="black";
        let audio3=new Audio("./sounds/snare.mp3");
        audio3.play();

        break;
    case 'd':
        this.style.color="black";
        let audio4=new Audio("./sounds/tom-1.mp3");
        audio4.play();

        break;
    case 'j':
        this.style.color="black";
        let audio5=new Audio("./sounds/tom-2.mp3");
        audio5.play();

        break;
    case 'k':
        this.style.color="black";
        let audio6=new Audio("./sounds/tom-3.mp3");
        audio6.play();

        break;
    case 'l':
        this.style.color="black";
        let audio7=new Audio("./sounds/tom-4.mp3");
        audio7.play();

        break;

    default:
        break;
   }
  

})}

