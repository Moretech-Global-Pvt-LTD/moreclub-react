import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Zoom } from "react-awesome-reveal";
import { Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { projectDetail } from "../../redux/api/projectAPI";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const projects = useSelector((state) => state.projectReducer).singleProject;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(projectDetail(projectId));
  }, [dispatch]);

  return (
    <>
      <div className="item-details-wrap mt-3">
        {/* <div className="container"> */}
        <div className="row g-4 g-lg-5 align-items-center justify-content-center">
          {/* Item Thumbnail */}
          <div className="col-12 col-md-12 col-lg-6">
            <div className="item-big-thumb">
              <Zoom
                overlayBgColorStart="rgba(0, 0, 0, 0)"
                overlayBgColorEnd="rgba(0, 0, 0, 0.95)"
                transitionDuration={400}
              >
                <img
                  src={`${projects.image}`}
                  alt={`${projects.project_name}`}
                />
              </Zoom>
            </div>
          </div>

          {/* Item Details Content */}
          <div className="col-12 col-md-9 col-lg-6">
            <div className="item-details-content mt-5 mt-lg-0">
              {/* <h2 className="my-3">
                                    {projects.project_name}
                                </h2> */}
              <Zoom
                overlayBgColorStart="rgba(0, 0, 0, 0)"
                overlayBgColorEnd="rgba(0, 0, 0, 0.95)"
                transitionDuration={400}
              >
                <div className="row">
                  <div className="col-12">
                    <div className="tab--area bg-gray p-4 p-lg-5">
                      <Tabs id="itemDetailsTab" className="mb-3">
                        <Tab eventKey="details" title="Project Details">
                          <p>{projects.description}</p>
                        </Tab>

                        {/* <Tab eventKey="activity" title="Activity">
                                        <div className="table-responsive border shadow-sm activity-table bg-white">
                                            <table className="table mb-0">
                                                <tbody>
                                                    </tbody>
                                            </table>
                                        </div>
                                    </Tab> */}
                      </Tabs>
                    </div>
                  </div>
                </div>
              </Zoom>

              {/* <div className="d-flex align-items-center mb-4"> */}
              {/* Author Image */}
              {/* <div className="author-img position-relative me-3">
                                        <img 
                                            className="shadow" 
                                            src={``} 
                                            alt='' 
                                        />
                                        <i className={`bi bi-check position-absolute bg-primary `} />
                                    </div> */}

              {/* Name & Author */}
              {/* <div className="name-author">
                                        <Link 
                                            className="author d-block fz-16 hover-primary text-truncate" 
                                            to={``}
                                        >
                                            @AuthorName
                                        </Link>
                                    </div>
                                </div> */}

              {/* <div className="border-top w-75 mb-4" /> */}

              {/* <div className="row align-items-end">
                                    <div className="col-6 col-sm-4">
                                        <p className="mb-2">Price Text</p>
                                        <h5 className="text-center mb-0 border border-2 px-3 py-2 border-primary d-inline-block rounded text-primary w-100">
                                            Current Price text
                                        </h5>
                                    </div>
                                    <div className="col-6 col-sm-4 col-lg-5">
                                        <Link className={`btn btn-danger rounded-pill w-100`} to='' >
                                            <img 
                                                className="me-1" 
                                                src={``} 
                                                alt="" />
                                            left text
                                        </Link>
                                    </div>
                                </div> */}

              {/* <div className="border-top w-75 my-4" /> */}

              {/* Short Description */}
              {/* <div className="short-description">
                                    <h5>Heading</h5>
                                    <p className="mb-0" >
                                    </p>
                                </div> */}
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}

      <div className="d-block w-100 mb-70" />

      {/* Tabs */}
      {/* <div className={`funto-tab-area`}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="tab--area bg-gray p-4 p-lg-5">
                <Tabs id="itemDetailsTab" className="mb-3">
                  <Tab eventKey="details" title="Project Details">
                    <p>{projects.description}</p>
                  </Tab>

                  <Tab eventKey="activity" title="Activity">
                                        <div className="table-responsive border shadow-sm activity-table bg-white">
                                            <table className="table mb-0">
                                                <tbody>
                                                    </tbody>
                                            </table>
                                        </div>
                                    </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default ProjectDetails;
