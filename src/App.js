import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notification from "./components/Notification";
import { uiActions } from "./store/ui-slice";
let isFirstRender = true;
function App() {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification);
  const cart = useSelector(state => state.cart);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    if (isFirstRender) {
      isFirstRender = false;
      return;
    }
    const sendRequest = async () => {
      //send notification state - sending request
      dispatch(uiActions.showNotification({
        open: true,
        message: 'Sending Request',
        type: 'warning'
      }));
      const res = await fetch('https://redux-http-cdcc6-default-rtdb.firebaseio.com/cartItems.json', {
        method: "PUT",
        body: JSON.stringify(cart),
      });
      const data = await res.json();
      //send notification state - request successful
      dispatch(uiActions.showNotification({
        open: true,
        message: 'Request sent to db successfully',
        type: 'success'
      }))
    }
    sendRequest().catch((err => {
      //send notification state - error
      dispatch(uiActions.showNotification({
        open: true,
        message: 'Request failed',
        type: 'error'
      }))
    }));
  }, [cart]);

  return (
    <div className="App">
      {notification && <Notification type={notification.type} message={notification.message} />}
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
