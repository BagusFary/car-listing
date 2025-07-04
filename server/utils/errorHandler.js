const mongooseErrorHandler = (error) => {
    
    // For Validation error
    if(error.name === "ValidationError") {

        const errorField = Object.values(error.errors).map((err) => {
            return {
                field: err.path,
                message: err.message
            }
        });


        return {
            status: 400,
            body: {
                message: "Validasi Gagal",
                error: errorField
            }
        }

    }
    

    return {

        status: 500,
        body: {
            message: "Terjadi kesalahan pada server"
        }
        
    }
} 

export default mongooseErrorHandler;