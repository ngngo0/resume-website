//rely on js being on the change the visibility to not none
let changeVisibilityOfSwitch= document.getElementsByClassName('switch')[0].style.display='inline-block';
//slider
function setTheme(theme){
    const root = document.documentElement;
    const top=document.getElementById('top');
    const arrayColorMatch = document.getElementsByClassName('colormatch');
    const anchorTags=document.getElementsByTagName("a");
    if(theme==='dark'){
        for (let index = 0; index < arrayColorMatch.length; ++index) {
            arrayColorMatch[index].style.setProperty('background-color', 'var(--dark-color-contact)');
        }
        for (let index = 0; index < anchorTags.length; ++index) {
            anchorTags[index].style.setProperty('color', 'white');
        }
        root.style.setProperty('background-color', 'black');
        root.style.setProperty('color', 'white');
        top.style.setProperty('background', 'var(--dark-color-nav)');

    }else{
        for (let index = 0; index < arrayColorMatch.length; ++index) {
            arrayColorMatch[index].style.setProperty('background-color', 'var(--light-color-contact)');
        }
        for (let index = 0; index < anchorTags.length; ++index) {
            anchorTags[index].style.setProperty('color', 'black');
        }
        root.style.setProperty('background', 'white');
        root.style.setProperty('color', 'black');
        top.style.setProperty('background', 'var(--light-color-nav,brown)');
    }
}
function toggleTheme(){
    // console.log('clicked checkbox');
    const currTheme = localStorage.getItem('theme') || 'normal';
    const newTheme = currTheme ==='normal'?'dark':'normal';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
}
document.addEventListener('DOMContentLoaded',()=>{
    const savedTheme = localStorage.getItem('theme');
    if(savedTheme){
        setTheme(savedTheme);
        document.getElementById('themeToggle').checked= savedTheme==='dark';
    }
})

let form_errors=[]; 

const email= document.getElementById("contact_email");
email.addEventListener("input", (event)=>{
    //check if the email is valid. i tried to use checkvalidity but after like
    // 3 hours of bugs i realized you can't change the custom msg back after 1 error with this format.
    if(email.validity.typeMismatch === true ){
        email.setCustomValidity("Please type in a valid email.");
        form_errors.push(event.target.value + " from email");
    }else{
        email.setCustomValidity("");
    }
});


const contactMessage= document.getElementById("contact_message");
const messageErrorMsg = document.getElementsByName("message_errors")[0];
messageErrorMsg.innerHTML="You just typed an illegal character";

//on input change, we check if the contact message is problematic
contactMessage.addEventListener("input", (event)=>{
    if(contactMessage.validity.patternMismatch===true){
        //if the contact message area has special characters.
        contactMessage.setCustomValidity("Please enter a valid message without special characters like $%^&*()<>/;'[]\`");
        form_errors.push(event.target.value + " from message");

        //reflowing and removing flash and fade when the pattern is wrong
        contactMessage.classList.remove('flash');
        void contactMessage.offsetWidth;
        contactMessage.classList.add('flash');
        
        messageErrorMsg.classList.remove('fadeOutError');
        void messageErrorMsg.offsetWidth;
        messageErrorMsg.classList.add('fadeOutError');
        
    }else{
        contactMessage.setCustomValidity("");
    }
    //countdown info thing
    const countdown=document.getElementsByName("message_information")[0];
    countdown.innerHTML = 240-contactMessage.value.length + "/240 characters";

    //because other wise, copy and paste ruins it. so need the and and.
    if(contactMessage.value.length > 80 && contactMessage.value.length< 160){
        countdown.style.color='orange';
    }else if(contactMessage.value.length > 160 && contactMessage.value.length< 240){
        countdown.style.color='deeppink';
    }else if(contactMessage.value.length===240){
        countdown.style.color='red';
    }else{
        countdown.style.color='black';
    }
});
//because invalid fires on submission + checkvalidity
const myForm = document.forms[0];
myForm.addEventListener("submit", (event)=>{
    contactMessage.insertAdjacentHTML("afterend",'<input type="text" style="display: none" name="form-errors" />');
    document.getElementsByName('form-errors')[0].setAttribute("value", form_errors);
});