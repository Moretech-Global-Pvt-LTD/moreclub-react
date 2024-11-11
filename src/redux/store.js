import { configureStore } from '@reduxjs/toolkit'
import membershipTypeReducer from './slices/membershipTypeSlice'
import userRegister from './slices/userSlice'
import couponReducer from './slices/couponSlice'
import projectReducer from './slices/projectSlice'
import businessReducer from './slices/businessSlice'
import transactionReducer  from './slices/transactionSlice'
import  registerReducer  from './slices/RegisterSlice'
import networkReducer  from './slices/NetworkListSlice'
import  permissionReducer  from './slices/permissionSlice'
import  walletReducer  from './slices/walletSlice'
import WithDrawalSlice from './slices/WithDrawalSlice'
import PurchaseSlice from './slices/PurchaseSlice'
import infoSlice from './slices/infoSlice'
import currencyReducer from './slices/CurrencySlice'
import commentsReducer from './slices/commentsSlice'
import notificationReducer from './slices/notificationSlice'

const store = configureStore({
  reducer: {
    membershipTypeReducer: membershipTypeReducer,
    userReducer: userRegister,
    couponReducer: couponReducer,
    projectReducer: projectReducer,
    businessReducer: businessReducer,
    transactionReducer: transactionReducer,
    registerReducer: registerReducer,
    networkReducer: networkReducer,
    permissionReducer: permissionReducer,
    walletReducer: walletReducer,
    withdrawalReducer: WithDrawalSlice,
    purchaseReducer: PurchaseSlice,
    metaReducer: infoSlice,
    currencyReducer: currencyReducer,
    comments: commentsReducer,
    notification: notificationReducer
  },
});

export default store
