import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedList: [],
  emailList: [],
  phoneList: [],
};

export const networkReducer = createSlice({
  name: "networksReducer",
  initialState,
//   reducers: {
//     updateSelctionData: (state, action) => {
//       state.selectedList = action.payload;
//     },
//     updateSelectionEmail: (state) => {
//       const emailList = state.selectedList.reduce((acc, item) => {
//         if (item?.user?.email) {
//           acc.push(item?.user?.email);
//         }
//         return acc;
//       }, []);
//       state.emailList = emailList;
//     },
//     updateSelectionPhone: (state) => {
//       const emailList = state.selectedList.reduce((acc, item) => {
//         if (item?.user?.phone_number) {
//           acc.push(item.user.phone_number);
//         }
//         return acc;
//       }, []);
//       state.phoneList = emailList;
//     },
//   },
  reducers: {
    updateSelctionData: (state, action) => {
      state.selectedList = action.payload;
      state.emailList = state.selectedList.reduce((acc, item) => {
        if (item?.user?.email) {
          acc.push(item.user.email);
        }
        return acc;
      }, []);
      state.phoneList = state.selectedList.reduce((acc, item) => {
        if (item?.user?.phone_number) {
          acc.push(item.user.phone_number);
        }
        return acc;
      }, []);
    },
  },
});


export const {
  updateSelctionData,
//   updateSelectionEmail,
//   updateSelectionPhone,
} = networkReducer.actions;
export default networkReducer.reducer;

