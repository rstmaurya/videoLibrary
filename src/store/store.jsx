// import { configureStore } from "@reduxjs/toolkit";
// import likesSlicer from "../slicers/likes-slicer";

// export default configureStore({
//     reducer : {
//         store:likesSlicer
//     }
// })

import { configureStore } from "@reduxjs/toolkit";
import cartSlicer from "../slicers/likes-slicer";


export default configureStore({
 reducer: {
     store : cartSlicer                
 }                              
})


