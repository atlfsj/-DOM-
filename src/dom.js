window.dom = {
    create(string) {
        const container = document.createElement("template");    //template可以容纳任意元素
        container.innerHTML = string.trim();    //标签加空格需【加】trim()消除标签两端的空格，空格属于文本;
        return container.content.firstChild;    //template需【加】first
    },
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling);
    },
    before(node, node2) {
        node.parentNode.insertBefore(node2, node);
    },
    append(parent, node){
        parent.appendChild(node)
    },
    wrap(node, parent){               //要在1和2之间插入3，先将div3插在2之前（此时与2同级），再将2移动到3后面（父子级）
         dom.before(node, parent)
         dom.append(parent, node)
    },
    remove(node){
        node.parentNode.removeChild(node)
        return node                   //保留节点的引用
    },
    empty(node){                                      //const {childNodes} = node    ===  const childNodes = node.chidNodes
        const array = []
        let x = node.firstChild
        while(x){
          array.push(dom.remove(node.firstChild))
          x = node.firstChild
        }
        return array
    },
   attr(node, name, value){             // 重载
    if(arguments.length === 3){
      node.setAttribute(name, value)
    }else if(arguments.length === 2){
      return node.getAttribute(name)
    }
  },
  text(node, string){                   // 适配
    if(arguments.length ===2 ){             //改写
      if('innerText' in node){          
        node.innerText = string         // ie
      }else{
        node.textContent = string       // chorm , firfox
      }
    }else if(arguments.length === 1){       //只读
      if('innerText' in node){
        return node.innerText
      }else{
        return node.textContent
      }
    }
  },
  html(node, string){
    if(arguments.length === 2){
      node.innerHTML = string
    }else if(arguments.length === 1){
      return node.innerHTML 
    }
  },
  style(node, name, value){                     //3种形式
    if(arguments.length===3){
      // dom.style(div, 'color', 'red')
      node.style[name] = value
    }else if(arguments.length===2){
      if(typeof name === 'string'){
        // dom.style(div, 'color')
        return node.style[name]
      }else if(name instanceof Object){
        // dom.style(div, {color: 'red'})
        const object = name
        for(let key in object){
          node.style[key] = object[key]
        }
      }
    }
  },
  class: {
    add(node, className){
      node.classList.add(className)
    },
    remove(node, className){
      node.classList.remove(className)
    },
    has(node, className){
      return node.classList.contains(className)
    }
  },
  on(node, eventName, fn){
    node.addEventListener(eventName, fn)
  },
  off(node, eventName, fn){
    node.removeEventListener(eventName, fn)
  },
  find(selector, scope){
    return (scope || document).querySelectorAll(selector)
  },
  parent(node){
    return node.parentNode
  },
  children(node){
    return node.children
  },
  siblings(node){
    return Array.from(node.parentNode.children)
    .filter(n=>n!==node)
  },
  next(node){
    let x = node.nextSibling
    while(x && x.nodeType === 3){
      x = x.nextSibling
    }
    return x
  },
  previous(node){
    let x = node.previousSibling
    while(x && x.nodeType === 3){
      x = x.previousSibling
    }
    return x
  },
  each(nodeList, fn){
    for(let i=0;i<nodeList.length;i++){
      fn.call(null, nodeList[i])
    }
  },
  index(node){
    const list = dom.children(node.parentNode)
    let i
    for(i=0;i<list.length;i++){
      if(list[i] === node){
        break
      }
    }
    return i
  }
};
