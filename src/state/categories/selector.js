import { createSelector } from "reselect";
const selector = (state) => state.categories;

export default createSelector([selector], (data) => data);