

import React from 'react';
import { Placeholder } from 'react-bootstrap';

const CardSkeleton = () => {
    return (
        <div className=" d-flex w-100 justify-content-between border-bottom border-warning ">
            <div className="d-flex align-items-center mb-1 w-100 text-dynamic-white">
                
                <Placeholder as="div" animation="wave">
                    <Placeholder className="rounded-circle" style={{ width: 40, height: 40 }} />
                </Placeholder>
                <div className="d-grid w-100 mx-2">
                    <Placeholder as="p" animation="wave" className="d-flex flex-column gap-2">
                        <Placeholder xs={10} />
                        <Placeholder xs={2} />
                        <Placeholder xs={4} />
                    </Placeholder>
                </div>
            </div>
        </div>
    );
};


const TransactionCardSkeleton = () => {
    return (
        <div className="d-flex flex-column  gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
                <CardSkeleton key={index} />
            ))}
        </div>
    )
}

export default TransactionCardSkeleton



