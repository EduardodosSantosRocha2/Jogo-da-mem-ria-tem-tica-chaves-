const con = document.getElementById('con');
const vitoria = document.querySelector('.vitoria');


const vetordeImg = ['logochaves','logochiquinha', 'logokiko','logoseumadruga','logochaves','logochiquinha', 'logokiko','logoseumadruga'];
const vetordeImgSort  = vetordeImg.sort(()=>Math.random() -0.5); //-0.5 pois é um numero aleatorio que sempre gera um numero positivo ou negativo
let teste1 = "";
let teste2 = "";
let pontuacao = 0;
const pont = document.getElementById('pont');
pont.textContent = '0';

const buttonclick = document.getElementById('restart');
buttonclick.addEventListener('click', (e)=>{
    clear = document.querySelectorAll('.carta');
    console.log(clear);
    restart(clear);
});



window.addEventListener('load', () => {
    
    vetordeImgSort.forEach((img) => 
    {const imgem = Gerarcarta(img); 
    });
    
});


const Gerarcarta = (selecao)=> {
    const divcarta = document.createElement('div');
    const divFrente = document.createElement('div');
    const divVerso = document.createElement('div');

    divcarta.className= 'carta';
    divFrente.className = 'face Frente'; 
    divVerso.className = 'face Verso';
    divFrente.style.backgroundImage = `url("./img/`+selecao+`.jpg")`;
    divcarta.setAttribute('data-click', selecao);
    
    divcarta.appendChild(divFrente);
    divcarta.appendChild(divVerso);
    con.appendChild(divcarta);
    
    divcarta.addEventListener('click', (e)=>{
        if(!e.target.parentNode.className.includes('click')){
            if(teste1 === ''){
                const teste = e.target.parentNode;
                teste.classList.add('click');
                teste1 = e.target.parentNode;     
            }
            else if (teste2 === ''){
                const teste = e.target.parentNode;
                teste.classList.add('click');
                teste2 = e.target.parentNode;
                booleanteste();
            }
        }
        
        

    });
    
}

const booleanteste = ()=>{
    const t1 = teste1.getAttribute("data-click");
    const t2 = teste2.getAttribute("data-click");
    console.log("t1"+t1);
    console.log("t2"+t2);

    verificaVitoria();

    if(t1 === t2){
        console.log("igual");
        teste1 = "";
        teste2 = "";
        var audio = new Audio("./mus/Issoissoisso.mp3");
        audio.addEventListener('canplaythrough', function() {
        audio.play();
        pontuacao = pontuacao+ 10;
        pont.textContent = pontuacao;
    });    
}
    else{
    setTimeout(() => { 
        var audio = new Audio("./mus/chorokiko.mp3");
        audio.addEventListener('canplaythrough', function() {
        audio.play();
        teste1.classList.remove('click');
        teste2.classList.remove('click');
        teste1 = "";
        teste2 = "";
        pontuacao = pontuacao -5;
        pont.textContent = pontuacao; 
    });
    },600);
    
    }
}

function restart(clear){
    const vetordeImgSort  = vetordeImg.sort(()=>Math.random() -0.6);
    vitoria.innerHTML = '';
    for(let div of clear){
        div.remove();
    }
    pont.textContent = 0;
setTimeout(() => { 
    vetordeImgSort.forEach((img) => {
        const imgem = Gerarcarta(img); });

},100);
}

function verificaVitoria(){
    const todasCartas = document.querySelectorAll('.carta');
    for(let item of todasCartas){
        if(!item.classList.contains('click')) return;
    }
    vitoria.innerHTML = '<h1>você ganhou!</h1>';
}