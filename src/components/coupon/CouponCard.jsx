// import React from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// const CouponCard = ({ coupon }) => {

//   const user = useSelector((state) => state.userReducer);
//   const currency = useSelector((state)=>state.currencyReducer.currencyDetail)

//   return (
//     <div class="nft-card card shadow-sm mb-4">
//       <div class="card-body">
//         <div class="row align-items-center g-3">
//           <div class="col-12">
//             <div class="meta-info">
//               <div class="name-info d-flex align-items-center mb-3">
//                 <div class="author-img position-relative">
//                   <img
//                     class="shadow"
//                     src="https://static.vecteezy.com/system/resources/previews/009/342/078/non_2x/discount-coupon-icon-sign-design-free-png.png"
//                     alt="designing_world"
//                   />
//                   <i class="bi bi-check position-absolute bg-success true"></i>
//                 </div>
//                 <div class="name-author">
//                   <Link
//                     class="name d-block hover-primary text-truncate"
//                    to={user.isAuthenticated ? `/buy/coupon/${coupon.id}`:`/login`}
//                   >
//                     {coupon.name}
//                   </Link>
//                   <Link
//                     class="author d-block fz-12 hover-primary text-truncate"
//                     href="/author/designing_world"
//                   >
//                     Expired at: <i className="bi bi-calendar-date" />{" "}
//                     {coupon.expiry_date}
//                   </Link>
//                 </div>
//               </div>
//               <div class="price-bid d-flex align-items-center flex-wrap g-2">
//                 <div class="price me-2 me-sm-3">
//                   <h6 class="mb-0 d-inline-block fz-14 border border-2 rounded py-1 px-2" style={{whiteSpace:"nowrap", fontSize:"11px" }}>
//                     Coupon value {currency.symbol}&nbsp;{coupon.balance_value}
//                   </h6>
//                 </div>
//                 <Link
//                   class="btn btn-danger btn-sm rounded-pill text-white d-flex align-items-center"
//                   to={user.isAuthenticated ? `/buy/coupon/${coupon.id}`:`/login` }
//                   style={{whiteSpace:"nowrap", fontSize:"11px" }}
//                 >
//                   <i className="bi bi-cart-plus"></i>&nbsp; Buy {currency.symbol}&nbsp;{coupon.balance}
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CouponCard;
