
import { useRef, useState } from "react";

import "./Tower.css"
import Slide from "../Slide"

export default function Tower(){

    const [n ,setN] = useState(0);
    
    const prev = useRef(-1);
    const delay = useRef(400);

    let paused = false;
    let started = false;

    let start = document.getElementById('start');
    let startS = document.getElementsByClassName('stick')[0];
    let helpS = document.getElementsByClassName('stick')[1];
    let destS = document.getElementsByClassName('stick')[2];
    let store = document.getElementsByClassName('upperBox')[0];
    
    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

    let count =0;
    if(startS!=undefined){
        startS.innerHTML = '';
        helpS.innerHTML = '';
        destS.innerHTML = '';
        store.innerHTML = '';
        let color = [];

        
        for(let i=0 ; i<n ; i++){
            color[i] = getRandomColor();
        }

        let w = 50;

        for(let i=0 ; i<n ; i++){
            let div = document.createElement('div');
            div.style.width = w+'px';
            div.style.backgroundColor = color[i];
            w+=20;
            div.id = i+1;
            startS.insertAdjacentElement('beforeend',div);
        }

    }

    async function tower(n , s,h,d){
        if(n==1){
            
            let x = document.getElementsByClassName(s)[0];
            let y = document.getElementsByClassName(d)[0];
            let div = x.children[0];
            count++;
            await sleep(delay.current);

            if(paused){
                await pauseFunc();
            }

            div.remove();
            await sleep(delay.current);

            if(paused){
                await pauseFunc();
            }
            
            store.appendChild(div);
            await sleep(delay.current);

            if(paused){
                await pauseFunc();
            }
            
            store.innerHTML= '';
            await sleep(delay.current);

            if(paused){
                await pauseFunc();
            }
            
            y.insertAdjacentElement('afterbegin',div);
            return ;
        }

        
        await tower(n-1,s,d,h);

        if(paused){
            await pauseFunc();
        }
        
        count++;
        let x = document.getElementsByClassName(s)[0];
        let y = document.getElementsByClassName(d)[0];
        let div = x.children[0];
        
        await sleep(delay.current);
        if(paused){
            await pauseFunc();
        }
        
        div.remove();
        await sleep(delay.current);

        if(paused){
            await pauseFunc();
        }
        
        store.appendChild(div);
        await sleep(delay.current);

        store.innerHTML= '';
        await sleep(delay.current);

        if(paused){
            await pauseFunc();
        }
        
        y.insertAdjacentElement('afterbegin',div);
        
        await tower(n-1,h,s,d);

        if(paused){
            await pauseFunc();
        }
        
    }

    const handleSlider = (event)=>{
        delay.current = "700"-event.target.value;
    }

    const handleClick= async ()=>{

        if(prev.current==n && !started){
            startS.innerHTML = '';
            helpS.innerHTML = '';
            destS.innerHTML = '';
            store.innerHTML ='';
            let color = [];

            
            for(let i=0 ; i<n ; i++){
                color[i] = getRandomColor();
            }

            let w = 50;

            for(let i=0 ; i<n ; i++){
                let div = document.createElement('div');
                div.style.width = w+'px';
                div.style.backgroundColor = color[i];
                w+=20;
                div.id = i+1;
                startS.insertAdjacentElement('beforeend',div);
            }
        }

        if(started==false){
            store.innerText = '';
            count=0;
            started = true;

            start.innerText='Pause';
            await tower(n , "startStick","helperStick","destStick");
            start.innerText = 'Start';

            store.innerText = `Total number of moves : ${count}`;

            started = false;
            paused = false;
            prev.current = n;
            
        }
        else{
            if(paused==false){
                paused = true;
                start.innerText = 'Resume';
            }
            else{
                paused = false;
                start.innerText='Pause';
            }
        }
        
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const handleChange = (event)=>{
        
        if(startS!=undefined){
            start.innerText='Start';
        }

        if(started==true){
            event.target.blur();
            return;
        }
        
        prev.current = n;
        setN(event.target.value);
        
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
                <Slide handleSlider={handleSlider} min={10} max={660} defaultv={350} />

                <button id="start" onClick={handleClick}>Start</button>
            </div>
        <div className="upperBox"></div>

        <div className='towerboard'>
            <div className="startStick stick">
                
            </div>
            <div className=" helperStick stick">
                
            </div>
            <div className="destStick stick">
                
            </div>
        </div>
        
        </>
    )
}