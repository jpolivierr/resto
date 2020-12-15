import React from 'react'
import './Backmodal.css'
import {useSelector} from 'react-redux'

function Backmodal() {
    const modal = useSelector((state)=> state.modal)

    let backModalout = ''
    if(modal.OUT_WITH_ANIMATION === true){
        backModalout = 'Backmodalout'
    }
    return (
        <div className={`Backmodal ${backModalout}`}>
            
        </div>
    )
}

export default Backmodal
