import { createSlice } from '@reduxjs/toolkit';
import { sampleData } from '../../utils/dummypenguinsdata';
//this slice/reducer is the functionality of our generic handleChange

/* Redux Toolkit allows us to write "mutating" logic in reducers. It
doesn't actually mutate the state because it uses the Immer library,
which detects changes to a "draft state" and produces a brand new
immutable state based off those changes

createSlice(): A function that accepts an initial state, 
an object of reducer functions, and a "slice name", 
and automatically generates action creators and action types that correspond to the reducers and state.

This API is the standard approach for writing Redux logic.

Internally, it uses createAction and createReducer, 
so you may also use Immer to write "mutating" immutable updates: 

action type: props/changeProps
*/

const initialState = {
  name: '',
  data: sampleData,
  xKey: '',
  yKey: '',
  xAxisLabel: 'X-axis: Species',
  yAxisLabel: 'Y-axis: Body Mass',
  height: 500,
  width: 500,
  thresholds: 9,
  barPadding: 2,
  radius: 5
};

export const propsSlice = createSlice({
  name: 'props',
  initialState,
  reducers: {
    // Values accessible by state.props.[name]
    changeProps: (state, action) => {
      let dataVal;
      let numVal;
      const { name, value } = action.payload;
      console.log(typeof name);
      console.log(`Updating ${name}`);

      if (name === 'data') dataVal = JSON.parse(value);

      if (name === 'height' || 'width' || 'thresholds' || 'barPadding')
        numVal = +value < 100 ? 500 : parseInt(value);
      else if (name === 'radius') numVal = +value < 1 ? 5 : parseInt(value);

      state[name] = numVal || dataVal || value;
    }
  }
});

// Action creators are generated for each case reducer function
export const { changeProps } = propsSlice.actions;

export default propsSlice.reducer;

// Initial extra boilerplate-y reducers from Approach 1, where i set up each action type and dispatch actions based on name in the form, but this is v repetitive and not dry (but now we only need the one props reducer above !)

// changeName: (state, action) => {
//   console.log('Changing Chart name');
//   state.name = action.payload;
// },
// changeData: (state, action) => {
//   console.log('changing data');
//   state.data = JSON.parse(action.payload);
// },
// changeXKey: (state, action) => {
//   console.log('Changing X Key');
//   state.xKey = action.payload;
// },
// changeYKey: (state, action) => {
//   console.log('Changing Y Key');
//   state.yKey = action.payload;
// },
// changeXAxisLabel: (state, action) => {
//   console.log('Changing X Axis Label');
//   state.xAxisLabel = action.payload;
// },
// changeYAxisLabel: (state, action) => {
//   console.log('Changing Y Axis Label');
//   state.yAxisLabel = action.payload;
// },
// changeHeight: (state, action) => {
//   if (+action.payload < 100) {
//     console.log(
//       'Value must not be less than 100 px. Resetting to default.'
//     );
//     action.payload = 500;
//     console.log(action.payload);
//     state.height = action.payload;
//     return;
//   }
//   console.log('Changing height');
//   state.height = +action.payload;
// },
// changeWidth: (state, action) => {
//   if (+action.payload < 100) {
//     console.log(
//       'Value must not be less than 100 px. Resetting to default.'
//     );
//     action.payload = 500;
//     console.log(action.payload);
//     state.width = action.payload;
//     return;
//   }
//   console.log('Changing width');
//   state.width = +action.payload;
// },
// // specific to histograms
// changeBarPadding: (state, action) => {
//   console.log('Changing barPadding');
//   state.barPadding = +action.payload;
// },
// changeThresholds: (state, action) => {
//   console.log('Changing thresholds');
//   state.thresholds = +action.payload;
// },
// //specific to scatterplot
// changeRadius: (state, action) => {
//   if (+action.payload < 1) {
//     console.log('Value must not be less than 1. Resetting to default.');
//     action.payload = 5;
//     console.log(action.payload);
//     state.radius = action.payload;
//     return;
//   }
//   console.log('Changing radius');
//   state.radius = +action.payload;
// }

// // Action creators are generated for each case reducer function
// export const {
//   changeProps
//   // changeName,
//   // changeData,
//   // changeXKey,
//   // changeYKey,
//   // changeXAxisLabel,
//   // changeYAxisLabel,
//   // changeHeight,
//   // changeWidth,
//   // changeThresholds,
//   // changeBarPadding,
//   // changeRadius
// } = propsSlice.actions;