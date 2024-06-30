import React, { useEffect, useState } from 'react'
import TransactionCard from '../cards/transactioncard'

import {axiosInstance} from '../..';
import { baseURL } from '../../config/config';


const Points = () => {


  const [points, setPoints]= useState();


  const fetchPointsTransaction = async()=>{
    try{
      const res = await axiosInstance.get(`${baseURL}`)
      console.log("fetchpoints",res.data.data)
    }catch(err){    
      console.log("fetch points error",err);
    }
  }

  useEffect(()=>{
    fetchPointsTransaction();
  },[])



  return ( 
    <div className='content-inside-wrapper'>
      <TransactionCard
      icon={"#"}
      name={"transaction 1"}
      date={"2024-02-01"}
      balance={4000}
      amount={400}
    />
      <TransactionCard
      icon={"#"}
      name={"transaction 1"}
      date={"2024-02-01"}
      balance={4000}
      amount={400}
    />
      <TransactionCard
      icon={"#"}
      name={"transaction 1"}
      date={"2024-02-01"}
      balance={4000}
      amount={400}
    />
      <TransactionCard
      icon={"#"}
      name={"transaction 1"}
      date={"2024-02-01"}
      balance={4000}
      amount={400}
    />
      <TransactionCard
      icon={"#"}
      name={"transaction 1"}
      date={"2024-02-01"}
      balance={4000}
      amount={400}
    />
      <TransactionCard
      icon={"#"}
      name={"transaction 1"}
      date={"2024-02-01"}
      balance={4000}
      amount={400}
    />
    </div>
  )
}

export default Points
