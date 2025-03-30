import React from 'react'
import { Placeholder } from 'react-bootstrap'

const ProfileCard = () => {
    return (
        <div className="profile-card-container col-12 col-md-12 col-lg-12 col-xl-12">
            <div className="col-12 col-lg-12  ">
                <div className="card shadow-sm Profile-card">
                    <div>
                        <div className="card-header text-center text-dynamic-white relative ">
                            <Placeholder as="p" animation="wave">

                                <Placeholder xs={8} />

                            </Placeholder>

                        </div>
                        <span className="text-start text-dynamic-white fs-6 mt-2 ms-4">


                            <Placeholder as="p" animation="wave">

                                <Placeholder xs={8} />


                            </Placeholder>
                        </span>
                    </div>
                    <div className="card-body row">
                        <div className="col-4 justify-content-center ">

                            <Placeholder as="div" animation="wave">
                                <Placeholder xs={12} style={{ height: "6rem" }} />
                            </Placeholder>



                        </div>
                        <div className="col-8 text-dynamic-white text-end">

                            <Placeholder as="p" animation="wave">
                                <Placeholder xs={12} />
                                <Placeholder xs={10} />
                                <Placeholder xs={8} />
                                <Placeholder xs={12} />

                            </Placeholder>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 col-lg-12 ">
                <div className="nft-card card shadow-sm Profile-card">
                    <div className="card-body row">
                        <div className="col-4 justify-content-center ">


                            <span className="text-start text-dynamic-white fs-6 mt-2 ms-4">


                                <Placeholder as="div" animation="wave">
                                    <Placeholder xs={12} style={{ height: "6rem" }} />
                                </Placeholder>
                            </span>

                        </div>
                        <div className="col-8 text-dynamic-white text-end">
                            <Placeholder as="p" animation="wave">
                                <Placeholder xs={12} />
                                <Placeholder xs={10} />
                                <Placeholder xs={8} />
                                <Placeholder xs={12} />

                            </Placeholder>
                        </div>
                        <div className="card-header text-center text-dynamic-white relative ">
                            <Placeholder as="p" animation="wave">
                                <Placeholder xs={8} />
                            </Placeholder>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}





const ProfileCardSkeleton = () => {
    return (
        <div className="row  mt-1 g-2">
            <div className="col-12 col-md-8 col-xl-6">
                <ProfileCard />
            </div>

            <div className="col-12 col-md-4 col-xl-6 ">

                <div className="nft-card card shadow-sm mb-4 p-4">

                    <Placeholder as="p" animation="wave">
                        <Placeholder xs={12} />
                        <Placeholder xs={10} />
                        <Placeholder xs={8} />
                        <Placeholder xs={12} />

                    </Placeholder>

                </div>
                {/* subscription  */}
                <div className="nft-card card shadow-sm mb-4 p-4">
                    <Placeholder as="p" animation="wave">
                        <Placeholder xs={12} />
                        <Placeholder xs={10} />
                        <Placeholder xs={8} />
                        <Placeholder xs={12} />

                    </Placeholder>
                </div>

                {/* coupons  */}
                <div className="nft-card card shadow-sm mb-4 p-4">
                    <Placeholder as="p" animation="wave">
                        <Placeholder xs={12} />
                        <Placeholder xs={10} />
                        <Placeholder xs={8} />
                        <Placeholder xs={12} />

                    </Placeholder>
                </div>
            </div>
        </div>

    )
}

export default ProfileCardSkeleton