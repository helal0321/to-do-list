
let Input_task=document.querySelector(".to_do .ad_task input")
let button=document.querySelector(".to_do .ad_task button")
let tasks_container=document.querySelector(".task_lists .tasks")
inputForm=document.querySelector(".to_do .ad_task")

let edit_icon
let delete_icon
let contents
let check_array=[]
add_task_from_input()

let check_boxes
let tasks_array=[]


let clear_button=document.querySelector(".ad_task span")

if(localStorage.getItem("tasks_content")!==null){
    show_contents_from_localStorage()
    task_done()
    edit_task()
    delete_task()
}
if(localStorage.getItem("tasks_content")!==null){
    
    apply_check_tasks_done()
}

showOrHideClear()
clear_data()

//functions

function add_task_from_input(){
    inputForm.addEventListener("submit",function(){
        if(Input_task.value!==""){
            add_tasks_to_container(Input_task.value)
            Input_task.value=""
            if(tasks_container.innerHTML!==""){       
                
                edit_task()
                delete_task()
                save_content_inLocalStorage()
                task_done()
                check_tasks_done()
                showOrHideClear()                    
            }

        }
        else{
            
        }
    })

    ///////////////////

  
}
function add_tasks_to_container(valUe){
    let task=document.createElement("div")
    task.classList.add("task")
    let check=document.createElement("div")
    check.classList.add("check")
    let check_icon=document.createElement("i")
    check_icon.classList.add("fa-solid")
    check_icon.classList.add("fa-check")
    paragraph=document.createElement("p")
    let icons_dev=document.createElement("div")
    icons_dev.classList.add("icons")
    let edit_icon=document.createElement("i")
     edit_icon.classList.add("fa-solid")
     edit_icon.classList.add("fa-pen-to-square")
     edit_icon.classList.add("edit")
     let delete_icon=document.createElement("i")
     delete_icon.classList.add("fa-solid")
     delete_icon.classList.add("fa-trash-can")
     delete_icon.classList.add("delete")
     let content_dev=document.createElement("div")
     content_dev.classList.add("content")
     content_dev.append(paragraph)
     check.append(check_icon)
     paragraph.innerHTML=valUe
     icons_dev.append(edit_icon)
     icons_dev.append(delete_icon)
     task.append(check)
     task.append(content_dev)
     task.append(icons_dev)
     tasks_container.prepend(task)
}

function task_done(){
    check_boxes=document.querySelectorAll(".task_lists .task .check")
    check_boxes.forEach(function(e){
        e.onclick=function(){
           e.parentElement.classList.toggle("done")
           check_tasks_done()
        }
    })

}

function edit_task(){
    edit_icon=document.querySelectorAll(".task_lists .task .edit")   
    edit_icon.forEach(function(e){
        e.onclick=function(){
            let parent_div=e.parentElement.parentElement
            parent_div.classList.add("edit_mod")
            let editform=document.createElement("form")

            let edit_input=document.createElement("input")
            edit_input.setAttribute("placeholder","edit your task here")

            let edit_button=document.createElement("input")
            edit_button.setAttribute("type","submit")
            edit_button.setAttribute("value","edit")
            editform.append(edit_input)
            editform.append(edit_button)
            parent_div.append(editform)


            edit_input.focus()

            editform.onsubmit=function(){
                if(edit_input.value!==""){
                    let paragraph_value=edit_input.value
                    edit_input.remove()
                    edit_button.remove()
                    parent_div.classList.remove("edit_mod")
                    parent_div.querySelector(".content p").innerHTML=paragraph_value
                    save_content_inLocalStorage()
                    
                }
            }

        }
    })
}

function delete_task(){
    delete_icon=document.querySelectorAll(".task_lists .task .icons .delete")
    delete_icon.forEach(function(e){
        e.onclick=function(){
            let div_parent=e.parentElement.parentElement
            div_parent.remove()
            save_content_inLocalStorage()
            check_tasks_done()
            showOrHideClear()
        }
    })

}

function save_content_inLocalStorage(){
    tasks_array=[]
    contents=document.querySelectorAll(".task_lists .task p")
    console.log(contents)
    contents.forEach(function(e){
        tasks_array.unshift(e.innerHTML)
    })
    
     window.localStorage.setItem("tasks_content",JSON.stringify(tasks_array))
 }

 function show_contents_from_localStorage(){
    let arr=JSON.parse(localStorage.getItem("tasks_content"))
    console.log(arr.length)
    
    for(let i=0;i<arr.length;i++){
        add_tasks_to_container(arr[i])
       
    }
 }
 
 function check_tasks_done(){
    check_array=[]
    let tasks_items=document.querySelectorAll(".task_lists .task")
    for(let i=0;i<tasks_items.length;i++){
        if(tasks_items[i].classList.contains("done")){
            check_array.push("yes")
        }
        else{
            check_array.push("no")
        }
        
    }
    localStorage.setItem("check",JSON.stringify(check_array))
 }

 function apply_check_tasks_done(){
    if(localStorage.getItem("check")!==null){
        let checks_array=JSON.parse(localStorage.getItem("check"))
        let tasks_items=document.querySelectorAll(".task_lists .task")
        for(let i=0;i<checks_array.length;i++){
            if(checks_array[i]==="yes"){
            tasks_items[i].classList.add("done")
            }
        }
    }

 }

 function showOrHideClear(){
    let items_for_clear=document.querySelectorAll(".task_lists .task")
    console.log(items_for_clear.length)
    if(items_for_clear.length>0){
        clear_button.classList.add("show_clear")
    }
    else{
        clear_button.classList.remove("show_clear")
    }
 }

 function clear_data(){
    clear_button.onclick=function(){
        localStorage.clear()
        tasks_container.innerHTML=""
        showOrHideClear()
    }
 }
 