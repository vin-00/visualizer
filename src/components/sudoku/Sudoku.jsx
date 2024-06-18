
import { useState ,useRef} from "react";
import "./Sudoku.css"

import Slide from "../Slide"

export default function Sudoku(){

    const start = useRef(false);
    const paused =useRef(false);
    const delay = useRef(100);
    const colorDelay = useRef(100);

    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

    function handleSlider(event){

        delay.current = "200" - event.target.value;
        colorDelay.current = delay.current;
    }

    const [sudoku,setSudoku] = useState([[5,'','',4,6,7,3,'',9],
                                        [9,'',3,8,1,'',4,2,7],
                                        [1,7,4,2,'',3,'','',''],
                                        [2,3,1,9,7,6,8,5,4],
                                        [8,5,7,1,2,4,'',9,''],
                                        [4,9,6,3,'',8,1,7,2],
                                        ['','','','',8,9,2,6,''],
                                        [7,8,2,6,4,1,'','',5],
                                        ['',1,'','','','',7,'',8],]);
    
    function handleInput(i,j,event){
        let x = event.target.value;
       
        if((x>=1 && x<=9) || (x=="")){
            sudoku[i][j] = event.target.value;
            setSudoku([...sudoku]);
        }
        
    }

    async function handleClick(){
       
        let startBtn = document.getElementById('start');
        if(start.current==false){
            start.current = true;
            startBtn.innerText = 'Pause'
            let res = await sudokuSolve(0,0);
            if(res){
                startBtn.innerText = "Start";
            }
            else{
                startBtn.innerText = "No solution"
                setTimeout(()=>{
                    startBtn.innerText = 'Start';
                },1300)
            }

            start.current = false;
            paused.current = false;
        }
        else{
            if(paused.current==false){
                paused.current = true;
                startBtn.innerText='Resume';
            }
            else{
                paused.current = false;
                startBtn.innerText='Pause';
            }
            
        }
    }

    async function pauseFunc(){
        while(paused.current){
           await sleep(10);
        }
    
    }

    async function isSafe(r,c,d){
        
        for(let i=0 ; i<9 ; i++){
            if(r!=i && sudoku[i][c]==d){
                document.getElementById(`${i}-${c}`).classList.add('error');
                document.getElementById(`${r}-${c}`).classList.add('error');
                
                if(paused.current){
                    await pauseFunc();
                }

                await sleep(colorDelay.current);
                
                if(paused.current){
                    await pauseFunc();
                }

                document.getElementById(`${i}-${c}`).classList.remove('error');
                document.getElementById(`${r}-${c}`).classList.remove('error');
                return false;
            }
        }
        for(let i=0 ; i<9 ; i++){
            if(c!=i && sudoku[r][i]==d){
                document.getElementById(`${r}-${i}`).classList.add('error');
                document.getElementById(`${r}-${c}`).classList.add('error');
                
                if(paused.current){
                    await pauseFunc();
                }

                await sleep(colorDelay.current);
                
                if(paused.current){
                    await pauseFunc();
                }

                document.getElementById(`${r}-${i}`).classList.remove('error');
                document.getElementById(`${r}-${c}`).classList.remove('error');
                return false;
            }
        }

        let sr = (Math.floor(r/3))*3;
        let sc = (Math.floor(c/3))*3;
        for(let i=sr ; i<sr+3 ; i++){
            for(let j=sc ; j<sc+3 ; j++){
                if(i!=r && j!=c && sudoku[i][j]==d){
                    document.getElementById(`${i}-${j}`).classList.add('error');
                    document.getElementById(`${r}-${c}`).classList.add('error');
                    
                    if(paused.current){
                        await pauseFunc();
                    }

                    await sleep(colorDelay.current);
                    
                    if(paused.current){
                        await pauseFunc();
                    }

                    document.getElementById(`${i}-${j}`).classList.remove('error');
                    document.getElementById(`${r}-${c}`).classList.remove('error');
                    return false;
                }
            }
        }

        return true;
    }

    async function sudokuSolve(r,c){
        if(r==9){
            return true;
        }

        let nr = r;
        let nc = c+1;
        if(nc==9){
            nr++;
            nc=0;
        }

        if(sudoku[r][c]!=''){

            let nextres = await sudokuSolve(nr,nc);
            return nextres;
        }

        for(let i=1 ; i<=9 ; i++){
            
            if(paused.current){
                await pauseFunc();
            }
            await sleep(delay.current);
            if(paused.current){
                await pauseFunc();
            }
            sudoku[r][c] = i;
            setSudoku([...sudoku]);
            
            let res = await isSafe(r,c,i);
            if(res){
                let nextres = await sudokuSolve(nr,nc);
                if(nextres){
                    return true;
                }    
            }
            if(paused.current){
                await pauseFunc();
            }
            await sleep(delay.current);

            if(paused.current){
                await pauseFunc();
            }
            sudoku[r][c]='';
            setSudoku([...sudoku]); 
        }

        return false;
        
    }

    return (
        <> 
           <div className="control">
                <Slide handleSlider={handleSlider} min={1} max={200} defaultv={100}  />

                <button id="start" onClick={handleClick}>Start</button>
            </div>

            <div className='board'>
                {sudoku.map((item,index)=>(
                    <div id={index} key={index} className="row">
                        {item.map((i,ind)=>{
                            return <input key={index+'-'+ind} type="number" value={sudoku[index][ind]} className={(ind%3==0 && index%3==0) ? 'cell left down' 
                                : index%3==0 ? 'cell down':ind%3==0 ? 'cell left':'cell'} 
                                id={index+'-'+ind} onChange={(event)=>handleInput(index,ind,event)} disabled={start.current==true ? true : false} />
                            
                        })}
                    </div>
                ))}
            </div>
        </>
       
    )
}