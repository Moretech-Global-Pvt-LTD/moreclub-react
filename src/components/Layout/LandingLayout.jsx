import React, { useEffect }  from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import Divider from '../divider/Divider'

const LandingLayout = ({children}) => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
    <Header/>
    <Divider/>
    <div className="divider-mobile"/>
    {children}
    <Footer/>  
    </>
  )
}

export default LandingLayout
