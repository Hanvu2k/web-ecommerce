const getProduct = async () => {
    try {
        // Sending a GET request to retrieve data
        const res = await fetch(
            "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
        );
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

export default getProduct;
