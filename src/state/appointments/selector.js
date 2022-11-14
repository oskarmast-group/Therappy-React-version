import { createSelector } from "reselect";
const selector = (state) => state.appointments;

export default createSelector([selector], (data) => data);