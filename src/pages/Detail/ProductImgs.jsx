import React from "react";

function ProductImgs(props) {
    const { productInfo } = props;

    return (
        <div className="detail-product-imgs col-6 d-flex">
            <div className="product-imgs-sub">
                <div className="product-img-sub">
                    <img
                        className="product-imgsub-link"
                        src={productInfo?.photos?.[3]}
                        alt=""
                    />
                </div>

                <div className="product-img-sub">
                    <img
                        className="product-imgsub-link"
                        src={productInfo?.photos?.[2]}
                        alt=""
                    />
                </div>

                <div className="product-img-sub">
                    <img
                        className="product-imgsub-link"
                        src={productInfo?.photos?.[1]}
                        alt=""
                    />
                </div>

                <div className="product-img-sub">
                    <img
                        className="product-imgsub-link"
                        src={productInfo?.photos?.[0]}
                        alt=""
                    />
                </div>
            </div>

            <div className="product-img-main">
                <img
                    className="product-imgmain-link"
                    src={productInfo?.photos?.[0]}
                    alt=""
                />
            </div>
        </div>
    );
}

export default ProductImgs;
