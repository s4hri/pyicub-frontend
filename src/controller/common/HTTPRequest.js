
export async function POST (api, robotName, appName, apiTarget, request) {
    
    const config = {
        method: 'POST',
        headers: { 'Contet-Type': 'application/json' },
        body: JSON.stringify(request)
    }
    const resPOST     = await fetch(`/${api}/${robotName}/${appName}/${apiTarget}`, config);
    const resPOSTJSON = await resPOST.json()

    console.log(`POST ${apiTarget}`, resPOSTJSON)

    return resPOSTJSON
}


export async function GET (api, robotName, appName, apiTarget, resPOST) {
    
    const resGET     = await fetch(`${resPOST}`);
    const resGETJSON = await resGET.json()
    
    console.log(`GET ${apiTarget}`, resPOST, resGETJSON.status, resGETJSON.retval)
    
    return resGETJSON
}


export async function delay(ms) {
    return await new Promise(resolve => setTimeout(resolve, ms));
  }