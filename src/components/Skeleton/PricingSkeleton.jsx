import React from 'react'
import { Card, Placeholder } from 'react-bootstrap'

const PricingCards = () => {
    return (
        <Card className={`pricingcard  px-0 pb-0 mx-2`}>
            <Card.Body>
                <Card.Title>
                    <div className="card-header text-center text-dynamic-white relative ">
                        <Placeholder as="p" animation="wave">
                            <Placeholder xs={8} />
                        </Placeholder>
                    </div>
                </Card.Title>
                <div className={`bg-gray text-warning mb-1`}>
                    <Placeholder as="p" animation="wave">
                        <Placeholder xs={8} />
                    </Placeholder>

                </div>
                <ul className="pricingcard-features">
                    <Placeholder as="p" animation="wave">
                        <Placeholder xs={12} />
                        <Placeholder xs={10} />
                        <Placeholder xs={8} />
                        <Placeholder xs={12} /> <Placeholder xs={12} />
                        <Placeholder xs={10} />
                        <Placeholder xs={8} />
                        <Placeholder xs={12} />

                    </Placeholder>
                </ul>
            </Card.Body>
            <div className="">
                <div className={`bg-danger px-1 py-2 `}>
                    <Placeholder as="p" animation="wave">
                        <Placeholder xs={12} />
                        <Placeholder xs={10} />
                    </Placeholder>
                </div>
            </div>
        </Card>
    )
}


const PricingSkeleton = () => {
    return (
      <div className="row mt-4">
          <div className="col-12">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xxl-4 g-2">
             
                    <PricingCards />
                    <PricingCards />
            </div>
          </div>
        </div>
      
  )
}

export default PricingSkeleton