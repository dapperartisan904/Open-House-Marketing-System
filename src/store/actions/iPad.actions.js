export const PAD_DASHBOARD_STATUS_CHANGE_START = 'PAD_DASHBOARD_STATUS_CHANGE_START';
export const PAD_DASHBOARD_STATUS_CHANGE_SUCCESS = 'PAD_DASHBOARD_STATUS_CHANGE_SUCCESS';
export function dashboardstatuschange(status,data) {
  return (dispatch, getState) => {
    dispatch({
      type: PAD_DASHBOARD_STATUS_CHANGE_START,
      payload:{status:status,data:data},
    });
    setTimeout(function(){dispatch({
      type: PAD_DASHBOARD_STATUS_CHANGE_SUCCESS,
      payload:{status:status,data:data},
    });}, 100);
  }
}