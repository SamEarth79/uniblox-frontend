class Backend {
    private baseUrl: string;

    constructor() {
        this.baseUrl = "http://127.0.0.1:8000/";
    }

    async makeApiCall(endpoint: string, method: string, data?: object){
        try {
            const url = `${this.baseUrl}${endpoint}`;
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            return res.json();
        } catch (error) {
            console.error(error);
            throw new Error(`API call to ${endpoint} failed`);
        }
    }
}

export default Backend;