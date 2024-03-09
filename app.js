const allArticles = document.querySelectorAll('article')

const next_Btn = document.querySelector('.next-step')
let active__content = document.querySelector('.show__content')


const phone_number = document.getElementById('phone_number') || 0
const userName = document.getElementById('name') 
const email = document.getElementById('email') 

let details ={
    'personalInfo':{
        name:'',
        email:'',
        phoneNumber:'',
    },
    'plan':{
        planeName:'',
        planValue:''
    },
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
        details.personalInfo.email = email.value
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
let currentId = +(document.querySelector('.show__content').getAttribute('id'))
let temp = currentId
function checkPersonalInfo(active__content){
    const form = active__content.querySelector('form')
    const errormessage= document.querySelector('.error__message')
    if(typeof userName == 'object' || typeof phone_number == 'object' || typeof email == 'object'){
        (checkEmpty(userName)  || checkEmpty(phone_number) || checkEmpty(email)) 
        checkPhoneLength()
        details.personalInfo.name = userName.value
    }
    const errorCount = document.querySelectorAll('.error')
    if(+errorCount.length == 0){
        nextContent(active__content)
        currentState(currentId)
        
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


function nextContent(active){
    allArticles.forEach(article=>{
        if(article.classList.contains('show__content')){
            article.classList.remove('show__content')
            article.classList.add('hide__content')
          
        }
    })
    active.nextElementSibling.classList.remove('hide__content')
    active.nextElementSibling.classList.add('show__content')
    active__content = active.nextElementSibling
    currentId = +(active__content.getAttribute('id'))
    if(currentId > 1){
        showBtn()
    }
    // else{
    //     const btn = document.querySelector('.prev-step')
    //     btn.classList.remove('show__button')
    //     btn.classList.add('hide__button')
    // }
}

function checkPlan(){
    const allPlan = document.querySelectorAll('.plan')
    allPlan.forEach(plan=>{
        plan.addEventListener('click',function(e){
            allPlan.forEach(btn=>{
                if(btn.classList.contains('active')){
                    btn.classList.remove('active')
                }
            })
            plan.classList.add('active')
            details.plan.planName= plan.querySelector('h2').innerHTML
            details.plan.planValue = plan.querySelector('.plan__value').innerHTML
        })
    })

}
function currentState(currentId){
    switch(currentId){
        case 1:
            checkPersonalInfo(active__content)
            break
        case 2:
            checkPlan()
            break
        case 3:
            break
        case 4:
            break
        default:
        
    }
}
next_Btn.addEventListener('click',function(e){
    if(currentId == 1){
        currentState(currentId)
    }
    else{
        currentId = +(active__content.getAttribute('id'))
        currentId++
        nextContent(active__content)

    }
    console.log(currentId)
})
function showBtn(){
   if(document.querySelector('.prev-step').classList.contains('hide__button')){
    let btn = document.querySelector('.btn__container .hide__button')
    btn.classList.remove('hide__button')
    btn.classList.add('show__button')
    btn.addEventListener('click',function(e){
                currentId = +(active__content.getAttribute('id'))
                console.log(currentId)
                goToPreviousPage(active__content)   
                
    })
   }

    
}
function goToPreviousPage(active){
    allArticles.forEach(article=>{
        if(article.classList.contains('show__content')){
            article.classList.remove('show__content')
            article.classList.add('hide__content')
           
        }
    })
    if(currentId > 1){
        active.previousElementSibling.classList.remove('hide__content')
        active.previousElementSibling.classList.add('show__content')
        active__content = active.previousElementSibling
    }
  
   
}
  // if(article.classList.contains('show__content')){
           
        //     article.classList.remove('show__content')
        //     article.classList.add('hide__content')
        //     active.previousElementSibling.classList.remove('hide__content')
        //     active.previousElementSibling.classList.add('show__content')
        //     active__content = active.previousElementSibling
        //     currentId = +(active__content.getAttribute('id'))
           
        //     // currentId = +(active__content.getAttribute('id'))
          
        // //    if(currentId == 1){
          
            // currentId= +active__content.getAttribute('id')
          //  console.log(active__content)
        // //    }
        // //    else{
        // //                       // active__content = active.previousElementSibling
                 
        // //         active__content = active.previousElementSibling
        // //         currentId = +(active__content.getAttribute('id'))
        // //         console.log(currentId)
        // //    }
        // }
         
        //     if(currentId == 1){
        //         const btn = document.querySelector('.btn__container button:first-of-type')
        //         btn.classList.remove('show__button')
        //         btn.classList.add('hide__button')
        //         active__content.classList.remove('hide__content')
        //         active__content.classList.add('show__content')
        //         currentId = +(active__content.getAttribute('id'))
        //     }