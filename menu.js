let Menu=document.querySelector('#menu-bars');
let navbar=document.querySelector('.navbar');
let searchicon=document.querySelector('#search-icon');
let searchform=document.querySelector('#search-form');
let Close=document.querySelector('#close');

Menu.onclick=()=>{
    Menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onscroll=()=>{
    Menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}

searchicon.onclick=()=>{
    searchform.classList.toggle('active');
}

Close.onclick=()=>{
    searchform.classList.remove('active');
}



const box={
    KEY:'abcdefg',
    contents:[],
    init(){
        // check localStorage and initialize the contents of box.contents
        let _contents=localStorage.getItem(box.KEY);
        if (_contents) {
            box.contents=JSON.parse(_contents);
        }
        else{
            box.contents=[
                {code:'saladeA', nom:'Avocats', type:'plat', prix:2000, cuisson:3, quantite:1},
                {code:'saladeP', nom:'Caesar-Poulet', type:'plat', prix:2500, cuisson:4, quantite:2},
                {code:'saladeC', nom:'Colieri', type:'plat', prix:2700, cuisson:3, quantite:1}
            ];
            box.sync();
        }
    },

    async sync(){
            let _box=JSON.stringify(box.contents);
            await localStorage.setItem(box.KEY, _box);
     },

    find(code){
            // trouver un element du box par son code
            let match=box.contents.filter(item=>{
                if(item.code==code)
                    return true;
            });
            if(match && match[0])
                return match[0];
     },

    add(code){
            // ajouter un element au box
            // vérifier s'il n'est pas déja dans le box
            if (box.find(code)) {
                box.increase(code, 'saladeA');
            }
            else{
                let arr=menu.filter(menu=>{
                    if(menu.code==code){
                        return true;
                    }
                });
                if(arr && arr[0]){
                    let obj={
                        code: arr[0].code,
                        nom: arr[0].nom,
                        type: arr[0].type,
                        prix: arr[0].prix,
                        cuisson: arr[0].cuisson,
                        quantite:1
                    };
                    box.contents.push(obj);
                    // update localStorage
                    box.sync();
                }
                else{
                    // product code does not exist in menu data
                    console.error('Invalid menu');
                }
            }
    },

    increase(code, quantite=1){
        // increase the quantity of an item in the box
        box.contents=box.contents.map(item=>{
            if(item.code===code)
                item.quantite=item.quantite+quantite;
            return item;
        });
        // update localStorage
        box.sync();
    },

    reduce(code, quantite=1){
        // reduce the quantity of an item in the box
        box.contents=box.contents.map(item=>{
            if(item.code===code)
                item.quantite=item.quantite-quantite;
            return item;
        });
        box.contents.forEach(async item=>{
            if (item.code===code&&item.quantite===0)
                await box.remove(code);
        });
        // update localStorage
        box.sync();
    },

    remove(code){
        // retirer un element du box à l'aide du code
        box.contents=box.contents.filter(item=>{
            if(item.code !== code)
                return true;
        });
        // update localStorage
        box.sync();
    },

    empty(){
        // empty whole box
        box.contents=[];
        // update localStorage
        box.sync();
    },

    sort(field='name'){
        // sort by field name,price
        // return a sorted shallow of the box.contents array
        let sorted=box.contents.sort((a,b)=>{
            if (a[field]>b[field]) {
                return 1;
            } else if (a[field]<b[field]) {
                return -1;
            } else {
                return 0;
            }
        });
        return sorted;
        // No impact on localStorage
    },

    logContents(prefix){
        console.log(prefix,box.contents)
    },

    
};




let menu=[];

document.addEventListener('DOMContentLoaded',()=>{
    // page en cours
    getmenu(showmenu,errorMessage);
    // recuperer les elements de la carte depuis le localstorage
    box.init();
    // telecharger les elements de la carte
    showbox();
});

function showbox(){}
function incrementbox(ev){}
function decrementbox(ev){}
function getmenu(success,failure){}
function showmenu(menu){}
function addItem(ev){}
function errorMessage(err){
    // display the error message to the user
    console.error(err);
}
