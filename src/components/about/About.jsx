import React from 'react'
import Divider from '../divider/Divider'
import AboutContent from './AboutContent'
import CTA from './CTA'
import Home from "../../images/Home/home.jpg"

const About = () => {
  return (
    <div className="about-area">

                <CTA 
                    backgroundColor="primary" // try 'success', 'warning', 'danger', 'info' etc 
                    title="Say Goodbye to Financial stress !! " 
                    buttonText="Get Started"
                    buttonColor="warning" 
                    buttonURL="/register-membership" 
                    buttonIcon=""
                />

                <Divider />

                <AboutContent 
                    textSectionOrder="20" 
                    textSection={[
                        "<h2 class='h2 fw-bold mb-3'>Join us today & start your Journey towards a brighter, wealthier tomorrow</h2>",
                        // "<p class='fz-18'>It's crafted with the latest trend of design & coded with all modern approaches. It's a robust & multi-dimensional usable template.</p>",
                        "<a class='btn btn-primary rounded-pill mt-4' href='/#'>Know More</a>"
                    ]}
                    imageOrder="10" 
                    image={Home}
                />
            </div>
  )
}

export default About