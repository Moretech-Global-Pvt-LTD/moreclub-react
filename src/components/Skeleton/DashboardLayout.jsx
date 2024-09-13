import { Col, Row } from "react-bootstrap"
import { BestDealsinTownSkeleton, ChartSkeleton, QuickSkeleton, TopcardsSkeleton, WalletSkeleton } from "./SmallCardSkeleton"
import RestaurantCardSkeleton from "./RestaurantCardSkeleton"

export const DashboardSkeleton = () => {
    return (
        <div>
            <div className="d-flex flex-column gap-4">
                <div className="d-none d-sm-block">
                    <TopcardsSkeleton />
                </div>
                <div className="d-none d-md-block">
                <Row  md={2} className="k">
                    <Col>
                        <ChartSkeleton />
                    </Col>
                    <Col>
                        <ChartSkeleton />
                    </Col>
                </Row>

                </div>
                <Row xs={1} sm={1} md={1} lg={3} className="align-items-center">
                    <Col>
                        <WalletSkeleton />
                    </Col>
                    <Col  lg={8}>
                    
                    <QuickSkeleton />
                    </Col>
                </Row>
                <Row>
                    <RestaurantCardSkeleton />
                </Row>
                <BestDealsinTownSkeleton />
                <RestaurantCardSkeleton />
            </div>
        </div>)
}