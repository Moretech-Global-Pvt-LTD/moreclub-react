import React from 'react'
import SidebarDropDownMenu from './dropdownmenu'
import handleRedirection from '../../utills/redircting'

const MarketplaceLinks = ({MoreClubLinks}) => {
  return (
    <SidebarDropDownMenu
                    menuIcon={"bi-shop"}
                    menuTitle="MARKETPLACE"
                    links={MoreClubLinks}
                  >
                    <li>
                      <div onClick={() => handleRedirection("marketplaceadmin", "/login")} style={{ cursor: "pointer" }}
                        className='redirectlink'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                          <circle cx="256" cy="256" r="48" fill="currentColor" />
                          <path fill="currentColor" d="m470.39 300l-.47-.38l-31.56-24.75a16.11 16.11 0 0 1-6.1-13.33v-11.56a16 16 0 0 1 6.11-13.22L469.92 212l.47-.38a26.68 26.68 0 0 0 5.9-34.06l-42.71-73.9a1.6 1.6 0 0 1-.13-.22A26.86 26.86 0 0 0 401 92.14l-.35.13l-37.1 14.93a15.94 15.94 0 0 1-14.47-1.29q-4.92-3.1-10-5.86a15.94 15.94 0 0 1-8.19-11.82l-5.59-39.59l-.12-.72A27.22 27.22 0 0 0 298.76 26h-85.52a26.92 26.92 0 0 0-26.45 22.39l-.09.56l-5.57 39.67a16 16 0 0 1-8.13 11.82a175 175 0 0 0-10 5.82a15.92 15.92 0 0 1-14.43 1.27l-37.13-15l-.35-.14a26.87 26.87 0 0 0-32.48 11.34l-.13.22l-42.77 73.95a26.71 26.71 0 0 0 5.9 34.1l.47.38l31.56 24.75a16.11 16.11 0 0 1 6.1 13.33v11.56a16 16 0 0 1-6.11 13.22L42.08 300l-.47.38a26.68 26.68 0 0 0-5.9 34.06l42.71 73.9a1.6 1.6 0 0 1 .13.22a26.86 26.86 0 0 0 32.45 11.3l.35-.13l37.07-14.93a15.94 15.94 0 0 1 14.47 1.29q4.92 3.11 10 5.86a15.94 15.94 0 0 1 8.19 11.82l5.56 39.59l.12.72A27.22 27.22 0 0 0 213.24 486h85.52a26.92 26.92 0 0 0 26.45-22.39l.09-.56l5.57-39.67a16 16 0 0 1 8.18-11.82c3.42-1.84 6.76-3.79 10-5.82a15.92 15.92 0 0 1 14.43-1.27l37.13 14.95l.35.14a26.85 26.85 0 0 0 32.48-11.34a3 3 0 0 1 .13-.22l42.71-73.89a26.7 26.7 0 0 0-5.89-34.11m-134.48-40.24a80 80 0 1 1-83.66-83.67a80.21 80.21 0 0 1 83.66 83.67" />
                        </svg>
                        &nbsp; Setup Marketplace
                      </div>
                    </li>
                    <li>
                      <div onClick={() => handleRedirection("marketplace", "/")} style={{ cursor: "pointer" }}className='redirectlink'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                          <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                            <path d="M6 2C5 5 7 5 6 8m4-6c-1 3 1 3 0 6" />
                            <circle cx="4" cy="20" r="2" />
                            <path d="M5.4 18.6L8 16m2.8-2.8L14 10" />
                            <circle cx="12" cy="20" r="2" />
                            <path d="m2 10l8.6 8.6M18 2h2a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2m0-16h4m-4 4h4m-4 4h4m-4 4h4" />
                          </g>
                        </svg>
                        &nbsp; MARKETPLACE
                      </div>
                    </li>
                  </SidebarDropDownMenu>
  )
}

export default MarketplaceLinks
