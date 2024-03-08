const allArticles = document.querySelectorAll('article')

const next_Btn = document.querySelector('.next-step')
const active__content = document.querySelector('.show__content')


const phone_number = document.getElementById('phone_number') || 0
const userName = document.getElementById('name') 
const email = document.getElementById('email') 

let details ={
    'personalInfo':{
        name:'',
        email:'',
        phoneNumber:'',
    },
    'plan':[],
    'addOns':[]
}
// CHECKING THE EMPTY VALUES
function checkEmpty(element){
    if(element.value.trim()==''){
        printError(element,`Please enter a ${element.getAttribute('data-name')}!`)
    }
    else{
      removeError(element)
    }
}
//SHOW ERROR
function removeError(element){
    element.classList.remove('error')
    element.nextElementSibling.innerHTML =''
}
function printError(element,message){
    element.classList.add('error')
    element.nextElementSibling.innerHTML =message
}
//CHECK EMAIL
function checkEmail(email){
    const emailValue = email.value
    let emailPattern=/^([a-zA-Z0-9\.-]+)@([a-zA-z0-9-]+)(\.[a-z]{2,18})(\.[a-z]{2,8})?$/
    if(!emailValue.match(emailPattern)){
        printError(email,'Oops! looks like you enter invalid email address')
    }else{
        removeError(email)
        details.personalInfo.email = email
    }
}

function getStringWithNumbersOnly(str){
    return [...str].filter((v)=>Number.isInteger(+v) && v!='').join('')
}

function checkPhoneLength(){
    if(phone_number.value.length < 14){
        printError(phone_number,'Invalid phone number')
        return false
    }else{
        removeError(phone_number)
        return true
    }
}

function phoneNumberFormat(value){
    value = value.replace(/\s+ \+ +/g, "").replace(/[^0-9]/gi, "");
    let val=''
    if(value){
        val = `+${value[0]} ${value.slice(1,4)} ${value.slice(4,7)} ${value.slice(7,)}`
        details.personalInfo.phoneNumber = val
    }
    
    return `${val}`
}

function checkPersonalInfo(active__content){
    const form = active__content.querySelector('form')
    const errormessage= document.querySelector('.error__message')
    if(typeof userName == 'object' || typeof phone_number == 'object' || typeof email == 'object'){
        (checkEmpty(userName)  || checkEmpty(phone_number) || checkEmpty(email)) 
        checkPhoneLength()
        details.personalInfo.name = userName
    }
    const errorCount = document.querySelectorAll('.error')
    if(+errorCount.length == 0){
        return true
    }
    return false
}

// EVENT LISTENERS
userName.addEventListener('input',(e)=>{checkEmpty(e.target)})
phone_number.addEventListener('input',(e)=>{
    phone_number.value = getStringWithNumbersOnly(phone_number.value)
    phone_number.value = phoneNumberFormat((phone_number.value))
    checkPhoneLength()
})
email.addEventListener('input',(e)=>
{           
            checkEmpty(e.target) 
            checkEmail(e.target)
})

let currentId = +(document.querySelector('.show__content').getAttribute('id'))
function nextContent(active__content){
    allArticles.forEach(article=>{
        if(article.classList.contains('show__content')){
            article.classList.remove('show__content')
            article.classList.add('hide__content')
        }
    })
    ++currentId
    console.log(currentId)
    active__content.nextElementSibling.classList.remove('hide__content')
    active__content.nextElementSibling.classList.add('show__content')
  
    return true
}



next_Btn.addEventListener('click',function(e){
    switch(currentId){
        case 1:
            checkPersonalInfo(active__content) && nextContent(active__content)
            break
        case 2:
            checkPlan() &&  nextContent(active__content)
            break
        case 3:
           
            nextContent(active__content)
            break
        default:
            break
    }
})