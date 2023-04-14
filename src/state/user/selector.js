import { createSelector } from "reselect";
const selector = (state) => state.user;

export default createSelector([selector], (data) => data);