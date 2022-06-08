
export async function POST (api, appName, apiTarget, request) {
    
    const config = {
        method: 'POST',
        headers: { 'Contet-Type': 'application/json' },
        body: JSON.stringify(request)
    }
    const resPOST     = await fetch(`/${api}/${appName}/${apiTarget}`, config);
    const resPOSTJSON = await resPOST.json()

    console.log(`POST ${apiTarget}`, resPOSTJSON)

    return resPOSTJSON
}


export async function GET (api, appName, apiTarget, indexRequest) {
    
    const resGET     = await fetch(`/${api}/requests/${indexRequest}`);
    const resGETJSON = await resGET.json()
    
    console.log(`GET ${apiTarget}`, indexRequest, resGETJSON.status, resGETJSON.retval)
    
    return resGETJSON
}


export async function delay(ms) {
    return await new Promise(resolve => setTimeout(resolve, ms));
  }