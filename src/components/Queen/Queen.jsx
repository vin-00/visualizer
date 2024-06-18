import { useRef, useState } from "react"
import './Queen.css'


import Slide from '../Slide'


export default function Queen(){

    const q = `<i class="fa-solid fa-chess-queen"></i>`;
    const [n,setN] = useState(0);
    
    const prev = useRef(-1);
    let started = false;
    let paused = false;
    const delay = useRef(500);
    const colorDelay = useRef(350);

    let start = document.getElementById('start');
    let board =document.getElementsByClassName('board')[0];

    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

    if(board!=undefined){
        board.innerHTML='';

        
        if(n>=7 && window.innerWidth<=450){
            board.classList.add("wi");
        }
        else if(n>=12 && window.innerWidth<=1000){
            board.classList.add('wi');
        }
        else if(n>=17 && window.innerWidth>1000){
            board.classList.add('wi');
        }
        else{
            board.classList.remove("wi");
        }
        board.classList.add('board');
        for(let i=0 ; i<n ; i++){
            let div =document.createElement("div");
    
            div.classList.add('row')
            for(let j=0 ; j<n ; j++){
                let tile = document.createElement("div");
                tile.id = `${i}-${j}`
                if(i==0 && j==0){
                    tile.innerHTML=q;
                }
    
                if(i%2==0){
                    if(j%2==0){
                        tile.classList.add('white');
                    }
                    else{
                        tile.classList.add('black');
                    }
                }
                else{
                    if(j%2==0){
                        tile.classList.add('black');
                    }
                    else{
                        tile.classList.add('white');
                    }
                }
                div.appendChild(tile);
            }
    
            board.appendChild(div);
        }
    }

    function handleSlider(event){

        delay.current = "1000" - event.target.value;
        colorDelay.current = delay.current-150;
        if(colorDelay.current<10){
            colorDelay.current = 10;
        }
    }

    async function handleClick(){

        if(started==false && prev.current==n){
            board.innerHTML='';
        
            if(n>=7 && window.innerWidth<=450){
                board.classList.add("wi");
            }
            else if(n>=12 && window.innerWidth<=1000){
                board.classList.add('wi');
            }
            else if(n>=17 && window.innerWidth>1000){
                board.classList.add('wi');
            }
            else{
                board.classList.remove("wi");
            }
            board.classList.add('board');
            for(let i=0 ; i<n ; i++){
                let div =document.createElement("div");
        
                div.classList.add('row')
                for(let j=0 ; j<n ; j++){
                    let tile = document.createElement("div");
                    tile.id = `${i}-${j}`
                    if(i==0 && j==0){
                        tile.innerHTML=q;
                    }
        
                    if(i%2==0){
                        if(j%2==0){
                            tile.classList.add('white');
                        }
                        else{
                            tile.classList.add('black');
                        }
                    }
                    else{
                        if(j%2==0){
                            tile.classList.add('black');
                        }
                        else{
                            tile.classList.add('white');
                        }
                    }
                    div.appendChild(tile);
                }
        
                board.appendChild(div);
            }
        }

        if(started==false){
            setN(n);
            started = true;
            start.innerText = 'Pause'
            let res = await nqueen(0);
            if(res){
                start.innerText='Start';
            }
            else{
                start.innerText = 'No solution found';
                setTimeout(()=>{
                    start.innerText = 'Start';
                },1300)
                                
            }

            prev.current = n;
            started = false;
            paused = false;


        }
        else{
            if(paused==false){
                paused = true;
                start.innerText='Resume';
            }
            else{
                paused = false;
                start.innerText='Pause';
            }
            
        }
    }

    function handleChange(event){

        if(started){
            event.target.blur();
            return;
        }

        if(start!=undefined){
            start.innerText = 'Start';
        }
        
        prev.current = n;

        setN(event.target.value);
    }

    async function nqueen(row){
        if(paused){
            await pauseFunc();
        }
        if(row==n){
            return true;;
        }
    
        
        for(let j=0 ; j<n ; j++){
    
            if(paused){
                await pauseFunc();
            }
            await sleep(delay.current);
            if(paused){
                await pauseFunc();
            }
            document.getElementById(`${row}-${j}`).innerHTML = q;
                
            let check = await isSafe(row,j);
            if(check){
                if(paused){
                    await pauseFunc();
                }
                let res = await nqueen(row+1);
                if(paused){
                    await pauseFunc();
                }
                if(res){
                    if(row==0){
                    }
                    return true;
                }
            }
    
            if(paused){
                await pauseFunc();
            }
            await sleep(delay.current);
            if(paused){
                await pauseFunc();
            }
            document.getElementById(`${row}-${j}`).innerHTML = '';
            
        }
    
        return false;
    
    }

    
    async function isSafe(row , col){
        for(let i=row-1 ; i>=0; i--){
            if(document.getElementById(`${i}-${col}`).innerHTML==q){
                document.getElementById(`${i}-${col}`).classList.add('red');
                document.getElementById(`${row}-${col}`).classList.add('red');
                await sleep(colorDelay.current);
                
                document.getElementById(`${i}-${col}`).classList.remove('red');
                document.getElementById(`${row}-${col}`).classList.remove('red');
                return false;
            }
        }
    
        for(let i=row-1 , j=col-1 ; i>=0 && j>=0 ; i-- , j--){
            if(document.getElementById(`${i}-${j}`).innerHTML==q){
                document.getElementById(`${i}-${j}`).classList.add('red');
                document.getElementById(`${row}-${col}`).classList.add('red');
                
                await sleep(colorDelay.current);
               
                document.getElementById(`${i}-${j}`).classList.remove('red');
                document.getElementById(`${row}-${col}`).classList.remove('red');
                return false;
            }
        }
    
        for(let i=row-1 , j=col+1 ; i>=0 && j<n ; i--,j++){
            if(document.getElementById(`${i}-${j}`).innerHTML==q){
                document.getElementById(`${i}-${j}`).classList.add('red');
                document.getElementById(`${row}-${col}`).classList.add('red');
                
                await sleep(colorDelay.current);
                
                document.getElementById(`${i}-${j}`).classList.remove('red');
                document.getElementById(`${row}-${col}`).classList.remove('red');
                return false;
            }
        }
    
        return true;
    }

    async function pauseFunc(){
        while(paused){
           await sleep(10);
        }
    
    }

    return (
        <>
            <div className="control">
            <input type="number" placeholder="Enter value of N" value={n==0?"":n} onChange={handleChange} />
                <Slide handleSlider={handleSlider} min={10} max={990} defaultv={500} />

                <button id="start" onClick={handleClick}>Start</button>
            </div>
    
            <div className="board"></div> 
                     

            
        </>    
    )
}