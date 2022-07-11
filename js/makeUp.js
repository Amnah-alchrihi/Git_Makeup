//check if there is local storage color
let mainColor = localStorage.getItem("color_option");
if(mainColor !== null){
    document.documentElement.style.setProperty("--main-color" ,mainColor) ;

    //remove active class color from all 
    document.querySelectorAll(".colors-list li ").forEach(ele => {
        ele.classList.remove("active");

        //add active class on element of data-color === local storge item
        if(ele.dataset.color === mainColor){
            ele.classList.add("active");

        }
    });
}

//toggle
document.querySelector(".toggle-settings .fa-gear").onclick = function(){
    this.classList.toggle("fa-spin");

    document.querySelector(".settings-box").classList.toggle("open");
}
// switch colors
const colorsLi = document.querySelectorAll(" .colors-list li ") ;

colorsLi.forEach(li => {
    li.addEventListener("click" , (e) =>{
       
        //set color on root
        document.documentElement.style.setProperty("--main-color" , e.target.dataset.color ) ;
        //set color on local storage
        localStorage.setItem("color_option" , e.target.dataset.color );
        
        HandleActive(e);
    });
});
let backgroundLocalItem = localStorage.getItem("background_option");

//Random background option
let backgroundOption = true;

//variable to controle the interval
let backgroundInterval;

// switch random background
const randomBackground = document.querySelectorAll(".random-background span") ;

if(backgroundLocalItem !== null){

    randomBackground.forEach(span => {

        span.classList.remove("active");

        if(backgroundLocalItem === "true"){

            backgroundOption = true;

            document.querySelector(".random-background .yes").classList.add("active");

        }
        else{
            backgroundOption = false;

            document.querySelector(".random-background .no").classList.add("active");
        }
    });
}

randomBackground.forEach(span => {
    span.addEventListener("click" , (e) =>{
       
        HandleActive(e);

        if(e.target.dataset.background === "yes"){

            backgroundOption = true;

            randomizeImgs();

            localStorage.setItem("background_option",true);
        }
        else{
            backgroundOption = true;

            clearInterval(backgroundInterval);  

            localStorage.setItem("background_option",false);

        }
    });
});



//images
let makeUp = document.querySelector(".make-up");

let imgsArray = ["IMG-20220421-WA0017.jpg" , "IMG-20220421-WA0022.jpg" , "IMG-20220421-WA0031.jpg" , "IMG-20220421-WA0032.jpg"];



//function to randmize imgs

function randomizeImgs(){

    if(backgroundOption === true){

        backgroundInterval = setInterval(() => {

            let randomNum = Math.floor(Math.random() * imgsArray.length);
        
            makeUp.style.backgroundImage = ' url(" img/' + imgsArray[randomNum] + ' ") ';
        }, 3000);
    }
}

//select skills selector
let ourSkills = document.querySelector(".our-skills");

window.onscroll = function(){
    //skills offset top

    let skillsOffsetTop =  ourSkills.OffsetTop;

    //skills outer hieght
    let skillsOuterHieght = ourSkills.offsetHeight;


    //window hieght
    let windowHieght = this.innerHeight;
    
    //window scroll top
    let windowScrollTop = this.pageYOffset;

    if(windowScrollTop > (skillsOffsetTop + skillsOuterHieght - windowHieght)){

        let allSkills = document.querySelectorAll(".box-skill .progress span");
        allSkills.forEach(skill => {

            allSkills.style.width = skill.dataset.progress;
        });
    }
}
//creat popup with the images
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach(img =>{
    img.addEventListener("click" , (e) =>{
        
        //creat overLay
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        
        //append overlay to the body
        document.body.appendChild(overlay);

        //creat the popue box
        let popueBox = document.createElement("div");
        popueBox.className = "popue-box";
        
        if(img.alt !== null){
            //creat heading
            let heading = document.createElement("h3");

            //append heading to popupe box
            popueBox.appendChild(heading);

            //creat text to the headding
            let textHeading = document.createTextNode(img.alt);

            //append text to the heading
            heading.append(textHeading);
        }

        //creat popupe image
        let popupeImage = document.createElement("img") ;
        popupeImage.src = img.src ;
        
        //append image to the box
        popueBox.appendChild(popupeImage);

        //append popue box to the body
        document.body.appendChild(popueBox);

        //create the close button
        let closeButton = document.createElement("span") ;
        closeButton.className = "close-button";
        
        //create the close button text
        let closeButtonText = document.createTextNode("X") ;

        //append close button text to close button 
        closeButton.appendChild(closeButtonText);

        //append close button to the popupe box
        popueBox.appendChild(closeButton);

    });
});
 //close popup

 document.addEventListener("click" , e => {
     if(e.target.className === "close-button"){
         document.querySelector(".popue-box").remove();
         document.querySelector(".popup-overlay").remove();

     }
 })


 let bulletss = document.querySelectorAll(".nav-bullets .bullet");
 let linkss = document.querySelectorAll(".make-up .links a");

 function scrollToSmeWhere(element){
    element.forEach(ele => {
        ele.addEventListener("click" , (e) =>{
            e.preventDefault(); 
            document.querySelector( e.target.dataset.section).scrollIntoView({
                behavior: "smooth" 
           });
        });
    } );
 }
 scrollToSmeWhere(bulletss);
 scrollToSmeWhere(linkss);


 //Handle active function
 function HandleActive(ev){

             //remove active class from all span
             ev.target.parentElement.querySelectorAll(".active").forEach(ele => {
                ele.classList.remove("active");
            });
            ev.target.classList.add("active");
 } 

 //evry thing about bullets(block , none , save to local storage  ) 

  let bulletSpan = document.querySelectorAll(".bullets-option span");

  let bulletsContaner = document.querySelector(".nav-bullets");

  let bulletLocalItem = localStorage.getItem("bullets_option");

  if(bulletLocalItem !== null){

    bulletSpan.forEach(span => {
        span.classList.remove("active");
    });

    if(bulletLocalItem === "block"){

       bulletsContaner.style.display = 'block';

       document.querySelector(".bullets-option .yes").classList.add("active")
    }
    else{

        bulletsContaner.style.display = 'none';

        document.querySelector(".bullets-option .no").classList.add("active");

    }
  }

  bulletSpan.forEach(span =>{

      span.addEventListener("click" , (e) =>{

          if(span.dataset.display === "show"){

            bulletsContaner.style.display = 'block';

            localStorage.setItem("bullets_option" , "block");
          }
          else{

            bulletsContaner.style.display = 'none';

            localStorage.setItem("bullets_option" , "none");

          }
          HandleActive(e);
      });
  });

  //reset options button
  document.querySelector(".reset-options").onclick = function() {

      localStorage.removeItem("color_option");
      localStorage.removeItem("background_option");
      localStorage.removeItem("bullets_option");

      window.location.reload();

  }

  let toggleButtn = document.querySelector(".toggle-contaner");
  let theLinks = document.querySelector(".links");

  toggleButtn.onclick = function(e){

    e.stopPropagation();
    toggleButtn.classList.toggle("active-toggle");
    theLinks.classList.toggle("open");
 }
  document.addEventListener("click", (e) =>{
      if(e.target !== toggleButtn && e.target !== theLinks){
          if(theLinks.classList.contains("open")){
            toggleButtn.classList.toggle("active-toggle");
            theLinks.classList.toggle("open");
          }
      }
  })

  theLinks.onclick = function(e){
    e.stopPropagation();
 }
