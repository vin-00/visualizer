

import Slider from '@mui/material/Slider';

export default function Slide({handleSlider , min , max , defaultv}){

    return (
        <Slider
                sx={{width:'20rem'}}
                    aria-label="Speed"
                    defaultValue={defaultv}
                    marks
                    
                    min={min}
                    max={max}
                    onChange={handleSlider}
                />
    )
}