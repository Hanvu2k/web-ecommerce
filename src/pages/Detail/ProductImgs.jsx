import React from "react";

function ProductImgs(props) {
    const { productInfo } = props;

    return (
        <div className="detail-product-imgs col-6 d-flex">
            <div className="product-imgs-sub">
                <div className="product-img-sub">
                    <img
                        className="product-imgsub-link"
                        src={productInfo.img4}
                        alt=""
                    />
                </div>

                <div className="product-img-sub">
                    <img
                        className="product-imgsub-link"
                        src={productInfo.img3}
                        alt=""
                    />
                </div>

                <div className="product-img-sub">
                    <img
                        className="product-imgsub-link"
                        src={productInfo.img2}
                        alt=""
                    />
                </div>

                <div className="product-img-sub">
                    <img
                        className="product-imgsub-link"
                        src={productInfo.img1}
                        alt=""
                    />
                </div>
            </div>

            <div className="product-img-main">
                <img
                    className="product-imgmain-link"
                    src={productInfo.img1}
                    alt=""
                />
            </div>
        </div>
    );
}

export default ProductImgs;
