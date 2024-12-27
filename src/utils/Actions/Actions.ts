import Backend from "../Backend/Backend"

export const GetProducts = async () => {
    try{

        const backend = new Backend();
        const response = await backend.makeApiCall(
            "products/", 
            "GET", 
        );
        console.log(response);
        
        return Promise.resolve(response);
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}