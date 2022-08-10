import { createSelector } from "reselect";
const selector = (state) => state.ingredients;

export default createSelector([selector], (data) => data);