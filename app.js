const allArticles = document.querySelectorAll('article')

const next_Btn = document.querySelector('.next-step')
let previous_Btn = document.querySelector('.prev-step')

let active__content = document.querySelector('.show__content')


const phone_number = document.getElementById('phone_number') || 0
const userName = document.getElementById('name') 
const email = document.getElementById('email') 


let selectedPlans =  document.querySelectorAll('.addon input')
// let addons=[]

// stepper
const allSteps = document.querySelectorAll('.step')
const steps = document.querySelector('.steps')


let details ={
    'personalInfo':{
        name:'',
        email:'',
        phoneNumber:'',
    },
    'plan':{
        planName:'',
        planValue:'',
        planType:'',
        shortPlanName:''
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
    }

}
const selectPlan = document.getElementById("select")
const yearly = document.querySelector('.yearly');
function updatePlan(){
    if(!selectPlan.checked){
        yearly.parentElement.style.color='hsl(213, 96%, 18%)'
        yearly.parentElement.classList.add('showYearly')
        details.plan.planType=yearly.innerHTML
        details.plan.shortPlanName='yr'
        details.plan.planValue=document.querySelector('.active').querySelector('.yearly__plan').querySelector('.plan__value').innerHTML
    }
    else{
        yearly.parentElement.classList.remove('showYearly')
        yearly.parentElement.style.color='hsl(231, 11%, 63%)'
        details.plan.planType= document.querySelector('.month').innerHTML
        details.plan.shortPlanName= 'mo'
        details.plan.planValue=document.querySelector('.active').querySelector('.monthly__plan').querySelector('.plan__value').innerHTML
    }

}
selectPlan.addEventListener('change',e=>{
   e.preventDefault()
   updatePlan()
})
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
        const btn = document.querySelector('.prev-step')
        btn.classList.add('show__button')
        btn.classList.remove('hide__button')
    }else{
        const btn = document.querySelector('.prev-step')
        btn.classList.remove('show__button')
        btn.classList.add('hide__button')
    }
    if(currentId ==4){
        next_Btn.innerHTML = 'Confirm'
        next_Btn.style.backgroundColor=`hsl(243, 100%, 62%)`
    }
    if(currentId==5){
        const btn = document.querySelector('.prev-step')
        btn.classList.remove('show__button')
        btn.classList.add('hide__button')
        next_Btn.classList.remove('show__button')
        next_Btn.classList.add('hide__button')
    }
    currentState(currentId)
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
            updatePlan()
        })
    })
    const plan = document.querySelector('.plan.active')
    if(!plan.clicked){
        details.plan.planName= plan.querySelector('h2').innerHTML
        updatePlan()
    }
}

function addOnPlan(){
   selectedPlans =  document.querySelectorAll('.addon input')
   selectedPlans.forEach(plan=>{
    if(details.plan.shortPlanName=='mo'){

        plan.parentElement.querySelector('.addon__monthly').style.display='block'
        plan.parentElement.querySelector('.addon__yearly').style.display='none'
    }
    else{
        plan.parentElement.querySelector('.addon__monthly').style.display='none'
        plan.parentElement.querySelector('.addon__yearly').style.display='block'
    }
  
   })
}

selectedPlans.forEach(plan=>{
    plan.addEventListener('change',(e)=>{
        if(e.target.checked){
            details.addOns.push(e.target)
        }else{
            details.addOns = details.addOns.filter(item=> item.id != e.target.id)
        }
    })
})
var btn = document.querySelector('.change')
let totalAddon = 0
function createAddonPlan(){
   const div = document.querySelector('.addon__plan')
   clearElement(div)
   div.style.display='block'
   totalAddon = 0
   const ul =document.createElement('ul')  
   const li = details.addOns.map(item=>{


    if(details.plan.shortPlanName == 'mo'){
        totalAddon+=parseInt(item.parentElement.querySelector('.addon__monthly .addon__value').innerHTML)
        value= `<span addon__value>${item.parentElement.querySelector('.addon__monthly').innerHTML}</span>`
    }else{
        totalAddon+=parseInt(item.parentElement.querySelector('.addon__yearly .addon__value').innerHTML)
        value= `<span addon__value>${item.parentElement.querySelector('.addon__yearly').innerHTML}</span>`
    }
    return `<li><span class="addon__title">${item.nextElementSibling.querySelector('h2').innerHTML}</span>
                <span class="addon__value">${value}</span>
            </li>`
   })
   ul.innerHTML = li.join(' ')
   div.append(ul)
   return div
}
function clearElement(element){
    while(element.firstChild){
        element.removeChild(element.firstChild)
    }
}
function result(){
    const basicPlanName = document.querySelector('.basic__plan h2')
    basicPlanName.innerHTML = `${details.plan.planName} <span class="final__plan">(${details.plan.planType})</span>`
    const basicPlanValue = document.querySelector('.basic__plan .plan__value')
    basicPlanValue.innerHTML=`${details.plan.planValue} / ${details.plan.shortPlanName}`
    const planContainer = document.querySelector('.plan__details')
    const plan__durationText = document.querySelector('.plan__durationText')
    plan__durationText.innerHTML=details.plan.planType.slice(0,details.plan.planType.length-2).toLowerCase()
    const total = document.querySelector('.total__value')


    if(details.addOns.length > 0){
       
      
        planContainer.append(createAddonPlan())
        total.innerHTML=`$${+details.plan.planValue + totalAddon} / ${details.plan.shortPlanName}`
    }else{
        document.querySelector('.addon__plan').style.display='none' 
        total.innerHTML=`$${details.plan.planValue} / ${details.plan.shortPlanName}`
    }

}  
btn.addEventListener('click',function(e){
   currentId=2
   currentState(currentId)
   next_Btn.innerHTML = 'Next'
   next_Btn.style.backgroundColor=`hsl(213, 96%, 18%)`

   allArticles.forEach(article=>{
    if(article.classList.contains('show__content')){
        article.classList.remove('show__content')
        article.classList.add('hide__content')
       active__content= document.getElementById(currentId)
       active__content.classList.remove('hide__content')
       active__content.classList.add('show__content')
     
    }
    })
 stepper()
})
function currentState(currentId){
    
    switch(currentId){
        case 1:
            checkPersonalInfo(active__content)
            break
        case 2:
            checkPlan()
            break
        case 3:
            addOnPlan()
            break
        case 4:
            result()
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
    stepper()
})




function stepper(){
    allSteps.forEach(step=>{
        if(step.classList.contains('active__form')){
            step.classList.remove('active__form')
        }
    })
    if(currentId < 5){
        steps.querySelector(`.steps .step:nth-child(${currentId})`).classList.add('active__form')
    }else{
        steps.querySelector(`.steps .step:nth-child(${currentId-1})`).classList.add('active__form')
    }
}

previous_Btn.addEventListener('click',function(e){
    allArticles.forEach(article=>{
        if(article.classList.contains('show__content')){
            article.classList.remove('show__content')
            article.classList.add('hide__content')
            article.previousElementSibling.classList.remove('hide__content')
            article.previousElementSibling.classList.add('show__content')
            active__content = article.previousElementSibling
            currentId = +(active__content.getAttribute('id'))
            if(currentId ==1){
                const btn = document.querySelector('.prev-step')
                btn.classList.remove('show__button')
                btn.classList.add('hide__button')
            }
        }
    })
    if(currentId <  4){
        next_Btn.innerHTML = 'Next Step'
        next_Btn.style.backgroundColor=`hsl(213, 96%, 18%)`
    }
    stepper()
})

