// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     MyVideoLibrary : [],
//     videosCount: 0
// }
// const likeSlice = createSlice({
//     name :'MyLibrary',
//     initialState, 
//     reducers: {
//         addToLibrary(state, action){
//             state.MyVideoLibrary.push(action.payload);
//             // state.videosCount = state.MyVideoLibrary.length;
//             state.videosCount +=1;
//         },
//         removeFromLibrary(state, action) {
//             state.MyVideoLibrary.splice(action.payload,1);
//             state.videosCount = state.MyVideoLibrary.length;
//         }
//     }
// })
// export const { addToLibrary,removeFromLibrary } = likeSlice.actions;
// export default likeSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

 
const initialState= {
    MyVideoLibrary: [],
    videosCount: 0
}
 
const likeSlice  = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToLibrary(state, action){
             state.MyVideoLibrary.push(action.payload);
             state.videosCount = state.MyVideoLibrary.length;
        },
        removeFromLibrary(state, action) {
             state.MyVideoLibrary = state.MyVideoLibrary.filter(item => item.VideoId !== action.payload.VideoId); // correct way of deleting items

            //  state.MyVideoLibrary.splice(action.payload,1);
            state.videosCount = state.MyVideoLibrary.length;
        }
    }
});
export const { addToLibrary,removeFromLibrary } = likeSlice.actions;
export default likeSlice.reducer;

