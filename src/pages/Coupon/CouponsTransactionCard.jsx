import React from 'react';
import PropTypes from 'prop-types';

function CouponsTransactionCard({ icon, name, date, balance, amount }) {
  return (
    <div className="nft-card card shadow-sm mb-4 transaction-card transaction-color ">
      <div className="card-body">
        <div className="row align-items-center g-3">
          <div className="col-12">
            <div className="meta-info">
              <div className="name-info d-flex align-items-center mb-3">
              <div className='me-3'>
                      <i class={`bi ${icon} fs-2 p-1 rounded-full bg-danger`} ></i>
                </div>
                <div className="name-author">
                  <p className="name d-block hover-primary text-truncate mb-1">{name}</p>
                  <p className="author d-block fz-12 hover-primary text-truncate mb-1">{date}</p>
                </div>
              </div>
              <div className="price-bid d-flex align-items-center">
                <div className="price me-2 me-sm-3">
                  <h6 className="mb-0 d-inline-block fz-14 border border-2 rounded py-1 px-2 text-white">
                    Balance: ${balance}
                  </h6>
                </div>
                <div className="amount text-danger">${amount}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

CouponsTransactionCard.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
};

export default CouponsTransactionCard;
