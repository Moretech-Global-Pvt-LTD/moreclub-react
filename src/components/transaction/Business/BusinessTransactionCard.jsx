import React from 'react';
import PropTypes from 'prop-types';
import moment from "moment";

function BusinessTransactionCard({ icon, name, date, balance, amount }) {
  return (
    <div className="nft-card shadow-sm mb-4 transaction-card bg-success text-white">
      <div className="card-body">
        <div className="row align-items-center g-3">
          <div className="col-12">
            <div className="meta-info">
              <div className="name-info d-flex align-items-center mb-1 ">
                <div className='me-3'>
                      <i class="bi bi-coin fs-2" ></i>
                </div>
                <div className="name-author ">
                  <p className="name d-block hover-primary text-truncate mb-1">{name}</p>
                  <p className="author d-block fz-12 hover-primary text-info mb-1">{moment(date).format('MMM DD YYYY')}</p>
                </div>
              </div>
              <div className="price-bid d-flex align-items-center">
                <div className="price me-2 me-sm-3">
                 {balance && 
                  <h6 className="mb-0 d-inline-block fz-14 border border-2 rounded py-1 px-2 text-white">
                    Total: $ {balance}
                  </h6>
                 }
                </div>
               {amount && <div className="amount text-warning">${" "}{amount}</div>} 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

BusinessTransactionCard.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
};

export default BusinessTransactionCard;
