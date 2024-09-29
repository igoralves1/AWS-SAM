exports.hello = async (event) => {
    let response;
    try {
        console.log("handler Hello = ", token)
        console.log("handler Hello event = ", event)
        const path = event.path;
        let message = "Hello World!";
        
        if (path === "/protected-hello") {
            message = "Hello from protected endpoint!";
        }
        
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: message,
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};