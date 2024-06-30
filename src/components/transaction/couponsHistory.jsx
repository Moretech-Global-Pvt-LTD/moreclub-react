import React,{useState, useEffect} from 'react'
import TransactionCard from '../cards/transactioncard'
import {axiosInstance} from '../..';
import { baseURL } from '../../config/config';
import { Link, useParams } from "react-router-dom";

const CouponsHistory = () => {
  const { couponId } = useParams();

  const [coupons, setCoupon]= useState();


  const fetchPointsTransaction = async()=>{
    try{
      const res = await axiosInstance.get(`${baseURL}coupons/transaction/`)
      console.log("fetchpoints",res.data.data)
      setCoupon(res.data.data);
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

export default CouponsHistory
