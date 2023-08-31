import React from "react";

import "../../css/billTotal.scss"; // Importing the billTotal stylin
import { formatNumber } from "../../utils"; // Importing the formatNumber utility function

function BillTotal(props) {
    const { name, btn = false, total, products = [] } = props;

    return (
        <div className="bill-total col-4">
            <h3 className="total-title"> {name}</h3>
            <div className="sub-total d-flex flex-column justify-content-between mt-4 ">
                {products.length > 0 ? (
                    products.map((item) => {
                        return (
                            <div
                                key={item.productId}
                                className="d-flex justify-content-between my-2"
                            >
                                <div className="product-name">{item.name}</div>
                                <div className="price">
                                    {formatNumber(item.total)} VND
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className=" d-flex  justify-content-between">
                        <div>subtotal</div>
                        <div className="price">{formatNumber(total)} VND</div>
                    </div>
                )}
            </div>
            <div className="final-total d-flex justify-content-between ">
                <div>Total</div>
                <div className="price">{formatNumber(total)} VND</div>
            </div>

            {btn && (
                <>
                    <div className="coupon mt-4">
                        <input type="text" placeholder="Enter your coupon" />
                    </div>

                    <div className="coupon-btn d-flex">
                        <button className="btn-primary btn-coupon">
                            <span>icon</span>
                            Apply coupon
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default BillTotal;
