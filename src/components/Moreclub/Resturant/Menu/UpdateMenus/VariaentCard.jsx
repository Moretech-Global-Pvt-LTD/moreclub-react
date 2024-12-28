import React from 'react'
import VariationUpdateOnlyForm from './VariationOnly';

const VariaentCard = ({item , image}) => {
  const [varientEdit, setVarientEdit] = React.useState(false);
  return (
    <div className="variaent-card mb-2">
      {!varientEdit ? 
       <div className="food-card-body ps-2">
       {/* <Link to={`/resturant/${res_id}/${cat_id}/${id}`}> */}
         <h3 className="food-name fs-6">{item.value}</h3>
       {/* </Link> */}
       <span className="food-price fs-6">{item.currency_symbol}&nbsp;{item.discount_price}{" "}
         <>
           {Number(item.discount_price) < Number(item.price) && (
             <>
               <span
                 className="text-dynamic-white"
                 style={{ textDecorationLine: "line-through" }}
               >
                 {item.currency_symbol}&nbsp;{item.price}
               </span>
             </>
           )}
         </></span>
         
     <div className="d-flex gap-2">
         {/* <button className=" bookmark-icon delete-varient-button " 
         // onClick={handleDelete}
         >&#128465;</button>
         <button className=" bookmark-icon edit-varient-button" 
         onClick={() => setVarientEdit(true)}
         >&#9997;</button> */}
       </div>  
     </div>
    :  
    <>
    <VariationUpdateOnlyForm item={item} onCancel={()=>setVarientEdit(false)}/>
    </>
    }
   
  </div>
  )
}

export default VariaentCard
