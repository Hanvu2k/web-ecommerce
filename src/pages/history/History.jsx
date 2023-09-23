import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Banner } from "../../components/Banner";
import apiConfig from "../../api/apiConfig";
import { ReactComponent as RightArrow } from "../../assets/icon/arrow-right-large.svg";
import { formatNumber } from "../../utils/index";
import "../../css/history.scss";
import routes from "../../configs/routes";
import Spinner from "../../components/spining/Spinner";

function History() {
  const token = localStorage.getItem("jwt");
  const { order, isLoading } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home page if the user is already authenticated
    if (!token) {
      navigate(routes?.home);
    }
  }, [token, navigate]);

  useEffect(() => {
    dispatch(apiConfig.getOrder());
  }, [dispatch]);

  const handleOrderDetail = (id) => {
    navigate(routes?.infoOrder.replace(":orderId", id));
  };

  return (
    <Spinner spinning={isLoading}>
      <Banner title={"History"} />
      <div className="history-container my-5">
        <table>
          <thead className="table-head">
            <tr className="table-head-content">
              <td className="table-head-item">Id order</td>
              <td className="table-head-item">Id user</td>
              <td className="table-head-item">Name</td>
              <td className="table-head-item">Phone</td>
              <td className="table-head-item">Address</td>
              <td className="table-head-item">Total</td>
              <td className="table-head-item">Delivery</td>
              <td className="table-head-item">Status</td>
              <td className="table-head-item">Detail</td>
            </tr>
          </thead>
          <tbody className="table-body">
            {order?.map((item) => {
              return (
                <tr className="table-body-content" key={item.id}>
                  <td className="table-body-item">{item.id}</td>
                  <td className="table-body-item">{item.id}</td>
                  <td className="table-body-item">{item.name}</td>
                  <td className="table-body-item">{item.phoneNumber}</td>
                  <td className="table-body-item">{item.address}</td>
                  <td className="table-body-item">
                    {formatNumber(item.total)} VND
                  </td>
                  <td className="table-body-item">
                    {item.delivery === "wfprg" && "Waiting for progressing"}
                  </td>
                  <td className="table-body-item">
                    {item.status === "wfp" && "Waiting for pay"}
                  </td>
                  <td className="table-body-item ">
                    <button
                      className="py-2 px-4 d-flex"
                      onClick={() => handleOrderDetail(item.id)}
                    >
                      <span className="mr-2">View</span>
                      <RightArrow />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {order.length === 0 && (
          <div className="no-product">Have no order yet</div>
        )}
      </div>
    </Spinner>
  );
}

export default History;
