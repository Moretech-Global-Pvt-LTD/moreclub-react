import React from 'react'
import StationCreateForm from '../../../components/Moreclub/Resturant/station/StationCreateForm'
import StationLayout from './StationLayout'
import { useSelector } from 'react-redux';
import UnauthorizedAccess from '../../../components/unauthorized/unauthorizedaccess';

const SetupStationPage = () => {
    // const user = useSelector((state) => state.userReducer);


    // if (!user.isSuperAdmin) {
    //     return (
    //         <StationLayout title={"Setup Station"}>
    //             <UnauthorizedAccess />
    //         </StationLayout>
    //     )
    // } else {
        return (
            <StationLayout title={"Setup Station"}><StationCreateForm /></StationLayout>
        )
    // }
}

export default SetupStationPage