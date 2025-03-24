import React from 'react'
import {Button, Placeholder } from 'react-bootstrap'
import HeroCarousel from './HeroCarousel'
import { Link } from 'react-router-dom';

const Newhero = ({data}) => {
const [activeIndex, setActiveIndex] = React.useState(data[0].name);

  return (
    <div className='container my-3 ' >
    <div className='d-flex w-full justify-content-between'>
    <div className= "mb-3 d-flex gap-2 w-full overflow-x-auto hide-scroll-bar">
        {data && data.map((item) => (
          //   <Button variant={activeIndex === item.name ? "primary" : "light"} className="rounded btn-sm px-5 fw-bold" onClick={() => setActiveIndex(item.name)}>
          //    {item.name}
          //  </Button>

          <Button
  variant={activeIndex === item.name ? "primary" : "ghost"}
  className="rounded btn-sm px-5 fw-bold"
  style={{
    transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
    backgroundColor: activeIndex === item.name ? "#007bff" : "",
    color: activeIndex === item.name ? "white" : "",
  }}
  onMouseEnter={(e) => {
    if (activeIndex !== item.name) {
      e.currentTarget.style.backgroundColor = "#e0e0e0";
      e.currentTarget.style.color = "#333";
    }
  }}
  onMouseLeave={(e) => {
    if (activeIndex !== item.name) {
      e.currentTarget.style.backgroundColor = "";
      e.currentTarget.style.color = "";
    }
  }}
  onClick={() => setActiveIndex(item.name)}
>
  {item.name}
</Button>
        ))}    
    </div>
    {/* <Link to="/offers">
    <Button variant='link' style={{ whiteSpace: "nowrap"}} >
    View All
    </Button>
    
    </Link> */}
    </div>
    <div className='rounded-3' >
    <HeroCarousel activeIndex={activeIndex}/>
    </div>
    
    </div>
  )
}

export default Newhero
