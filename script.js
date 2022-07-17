const msg = document.querySelector('.message'),
    btn = document.querySelector('.add'),
    listed = document.querySelector('.todo');


let toDoArr = [];

 if(localStorage.getItem('todo')){
    toDoArr = JSON.parse(localStorage.getItem('todo'));
    displays();
 }

btn.addEventListener('click', function(){
    if(msg.value === '') return;
    const newToDo = {
        todo: msg.value,
        check: false,
        important: false,
    };
    toDoArr.push(newToDo); 
    displays();
    localStorage.setItem('todo', JSON.stringify(toDoArr))
    msg.value = '';
});
function displays(){
    let displayedMsg ='';
    if(toDoArr.length === 0) listed.innerHTML =  '';
    toDoArr.forEach(function(elem,index){
         displayedMsg += `
        <li>
            <input type = 'checkbox' id='item_${index}' ${elem.check ? 'checked' : ''}>
            <label for='item_${index}' class="${elem.important ? 'important' : ''}">${elem.todo}</label>
        </li>
        `;
        listed.innerHTML = displayedMsg;
    });
}


listed.addEventListener('change', function(e){
    let valueLabel = listed.querySelector('[for='+ e.target.getAttribute('id') + ']').innerHTML;
    toDoArr.forEach(function(elem){
        if(elem.todo === valueLabel){
            elem.check = !elem.check;
            localStorage.setItem('todo', JSON.stringify(toDoArr))
        }
    })
});

listed.addEventListener('contextmenu', function(e){
    e.preventDefault();
    toDoArr.forEach(function(elem, i){
        if(elem.todo === e.target.innerHTML){
            if(e.ctrlKey || e.metaKey){
                toDoArr.splice(i,1);
                
            }else { 
                elem.important = !elem.important;
            }
            
            displays();
            localStorage.setItem('todo', JSON.stringify(toDoArr))

        }
    });

});