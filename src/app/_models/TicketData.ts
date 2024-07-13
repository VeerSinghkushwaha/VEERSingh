export class TicketsData {
  tkt_No:any = '';
  tkt_Date:String ='';
  tkt_Problem:String = '';
  tkt_TenantId:String = '';
  tkt_FormId:String = '';
  tkt_Desc:String = '';
  tkt_Status:String = '';
  tkt_ResolutionId:String = '';
  tkt_ReleaseId:String = '';
  tkt_Priority:String = '';
  tkt_Assign:String = '';
  OS:String ='';

    constructor(data: Partial<TicketsData> = {}) {
      Object.assign(this, data);
    }
  }
  