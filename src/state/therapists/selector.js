import { createSelector } from "reselect";
const selector = (state) => state.therapists;

export default createSelector([selector], (data) => data);