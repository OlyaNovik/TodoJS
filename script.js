let EnterList = document.querySelector('#enter_list')
let Submit_Btn = document.querySelector('#submit_btn')
let CalcItem = document.querySelector('.num_it')
let form = document.querySelector('#todo_forms')

let MainList = document.querySelector('.main_do')

let All_Btn = document.querySelector('#all_btn')
let Act_Btn = document.querySelector('#act_btn')
let Compl_Btn = document.querySelector('#compl_btn')

let Clear_Btn = document.querySelector('#clear_btn')

let empty_text = document.querySelector('#empty')

let List = []
// Відправка задачі в наш ліст
form.addEventListener('submit',AddTask)
// Реалізування форми завдань
MainList.addEventListener('click', CheckBox)





function CheckBox(event){
    // додати чек при кліці
    if(event.target.dataset.action === 'notCheck'){
        let text = event.target.nextElementSibling;
        text.style.textDecoration = "line-through"
        event.target.dataset.action='check'
        let parentCheck = event.target.closest('.block_list');
        parentCheck.dataset.settings="checkList";
        event.target.insertAdjacentHTML('beforeend',`
        <svg id="check_img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
        `)
        List.pop();
        ItemCalculate()
        Clear_Btn.style.display='block'


        // забрати чек при клиці
    } else if(event.target.dataset.action === 'check'){
        let textcheck = event.target.nextElementSibling;
        textcheck.style.textDecoration = 'none'
        let parentCheck2 = event.target.closest('.block_list');
        parentCheck2.dataset.settings="NotcheckList";
        event.target.children[0].remove()
        event.target.dataset.action='notCheck' 
        List.push(`${textcheck.innerHTML}`); 
        ItemCalculate() 
    }
    // видалення з списку по одному 
    else if(event.target.dataset.action === 'cross'){
        let parentList = event.target.parentNode
        parentList.remove();
        if(MainList.children.length < 2){
            empty_text.style.display= 'block';
        }   
    }
   
}

// кнопка видалення виконаниз завдань
Clear_Btn.addEventListener('click',()=>{
   for(let childs of MainList.children){
       if(childs.dataset.settings === 'checkList'){
           childs.remove();
       }
}
})


// кнопка показу всі завданнь
All_Btn .addEventListener('click',()=>{
    All_Btn.classList.add('button_click')
    Compl_Btn.classList.remove('button_click')
    Act_Btn.classList.remove('button_click')
    for(let childs of MainList.children){
    if(childs.dataset.settings === 'checkList' || childs.dataset.settings === 'NotcheckList' ){
        childs.style.display='flex';
    }}
})
// кнопка показу активних завданнь
Act_Btn.addEventListener('click',()=>{
    Act_Btn.classList.add('button_click')
    All_Btn.classList.remove('button_click')
    Compl_Btn.classList.remove('button_click')
    for(let childs of MainList.children){
        if(childs.dataset.settings === 'checkList'){
            childs.style.display='none';
        } else  if(childs.dataset.settings === 'NotcheckList'){
            childs.style.display='flex';
        }
 }
})
// кнопка показу виконаних завдань
Compl_Btn.addEventListener('click',()=>{
    Compl_Btn.classList.add('button_click')
    Act_Btn.classList.remove('button_click')
    All_Btn.classList.remove('button_click')
    for(let childs of MainList.children){
        if(childs.dataset.settings === 'NotcheckList'){
            childs.style.display='none';
        }
        else  if(childs.dataset.settings === 'checkList'){
            childs.style.display='flex';
        }
 }
})



function AddTask(e){
    e.preventDefault();
    if(EnterList.value != ''){
    let Do_value = EnterList.value;
    List.push(Do_value)
    console.log('list:', List);
    if(MainList.children.length < 7){
        MainList.insertAdjacentHTML('beforeend', `
        <div class="block_list" data-del="delete" data-settings ="NotcheckList" >
            <div class="inline_task ">
                    <div class="check_block" data-action ="notCheck">
                    </div>
                    <p>${Do_value}</p>
                    </div>
                 <div class="delete_task" data-action="cross">
                 <svg id="delete_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg> 
                 </div> 
                </div> `)
                ItemCalculate()
                EnterList.value =''
                EnterList.focus()
                if(MainList.children.length > 1){
                    empty_text.style.display='none';
                } 
            }else {
                EnterList.value='To do list is full'
                EnterList.style.color='red'
            }  }
            else{
                EnterList.value='Enter value'
                EnterList.style.color='red'
            }
}

function ItemCalculate(){
    CalcItem.innerHTML = List.length;   
}

// очищення форми при неправильних введенях
EnterList.addEventListener('click',()=>{
    console.log('enter');
    EnterList.style.color='black'
    EnterList.value=''
})
