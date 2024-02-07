
export interface ServiceListItem{
  name:string,
  url:string
}


export interface GetApplicationsServicesResponse {
  [key: string]:ServiceListItem
}

