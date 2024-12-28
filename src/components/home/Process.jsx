import Discounts from "../../images/Home/discount.png" 
import Refer from "../../images/Home/refer.png" 
import Memberships from "../../images/Home/member.png" 
import event from "../../images/Home/event.png" 

export default function Process() {
  return (
    <div class="animated fadeInUp" style={{animationDuration: "1s"}}>
      <div class="process-wrapper">
        <div class="container">
          <div class="row g-4 g-xxl-5 align-items-center justify-content-center">
            <div class="col-12 col-sm-6 col-xl-3">
              <div class="animated fadeInUp" style={{animationDuration: "1s"}}>
                <div class="single-process-card card bg-gray border-0">
                  <div class="card-body p-4 text-center">
                    <img
                      class="mb-3 mx-auto"
                      src={Refer}
                      alt="1"
                    />
                    <h5 class="mb-3">Refer & Earn</h5>
                  </div>
                  <div class="step-number">1</div>
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6 col-xl-3">
              <div class="animated fadeInUp" style={{animationDuration: "1s"}}>
                <div class="single-process-card card bg-gray border-0">
                  <div class="card-body p-4 text-center ">
                    <img
                      class="mb-3 mx-auto"
                      src={Memberships}
                      alt="2"
                    />
                    <h5 class="mb-3 ">Varities of Plans</h5>
                  <div class="step-number">2</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6 col-xl-3">
              <div class="animated fadeInUp" style={{animationDuration: "1s"}}>
                <div class="single-process-card card bg-gray border-0">
                  <div class="card-body p-4 text-center">
                    <img
                      class="mb-3 mx-auto"
                      src={event}
                      alt="3"
                    />
                    <h5 class="mb-3">
                      Event & Activities
                    </h5>
                   
                  </div>
                  <div class="step-number">3</div>
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6 col-xl-3">
              <div class="animated fadeInUp" style={{animationDuration: "1s"}}>
                <div class="single-process-card card bg-gray border-0">
                  <div class="card-body p-4 text-center">
                    <img
                      class="mb-3 mx-auto"
                      src={Discounts}
                      alt="4"
                    />
                    <h5 class="mb-3">Discount & Offers</h5>
                    
                  </div>
                  <div class="step-number">4</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
