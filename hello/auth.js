exports.authorizer = async function (event) {
    console.log("Fn authorizer")
    const token = event.authorizationToken.toLowerCase();
    console.log("token = ", token)
    const methodArn = event.methodArn;
    console.log("methodArn = ", methodArn)

    switch (token) {
        case 'allow':
            return generateAuthResponse('user', 'Allow', methodArn);
        default:
            return generateAuthResponse('user', 'Deny', methodArn);
    }
}

function generateAuthResponse(principalId, effect, methodArn) {
    console.log("Fn generateAuthResponse")
    const policyDocument = generatePolicyDocument(effect, methodArn);
    console.log("policyDocument = ", policyDocument)

    return {
        principalId,
        policyDocument
    }
}

function generatePolicyDocument(effect, methodArn) {
    console.log("Fn generatePolicyDocument")
    if (!effect || !methodArn) return null

    const policyDocument = {
        Version: '2012-10-17',
        Statement: [{
            Action: 'execute-api:Invoke',
            Effect: effect,
            Resource: methodArn
        }]
    };

    return policyDocument;
}