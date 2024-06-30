import React from 'react';
import { useSelector } from 'react-redux';
import { currentStep } from '../../redux/slices/RegisterSlice';
// import { validate } from '../utils/validation'; // Assuming you have a validation utility function
// import classes from "./css/PaginateBar.module.css";

function BusinessPaginateBar() {
  
  const page = useSelector((state) => state.registerReducer.businessStep);
  const numOfPages = 2; // Assuming you have a fixed number of pages
  
  
  const buttonE1=[];
  for(let i=1; i<=numOfPages;i++) {
    buttonE1.push( <button key={i} className={`${"formcircularButton"} ${i<=page? "formvisited":''}`} onClick={()=>currentStep(i)} >{i}</button>)
  }

  return (
    <div className='ms-4 me-4'>

    <div className={"formouterContainer"} style={{maxWidth:"14rem"}}>
    <div className={"formbuttonContainer"}>
      {buttonE1}
    </div>
    <progress className={"formprogressBar"} style={{maxWidth:"14rem"}} max={100} value={page===1?'0':page===2?'50':'100'}/>
  </div>
    </div>
  );
}

export default BusinessPaginateBar;
