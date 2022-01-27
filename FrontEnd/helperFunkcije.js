export function createEl(className, type, text, host){
    let el = document.createElement(type);
    el.className = className;
    el.innerHTML = text;
    host.appendChild(el);

    return el;
}

export function createInput(className, type, id,placeholder, host){
    let el = document.createElement("input");
    el.type=type;
    el.className = className;
    el.id = id;
    el.placeholder=placeholder;
    host.appendChild(el);

    return el;
}