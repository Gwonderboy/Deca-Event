import axios from '../../configurations/httpSetup';

export const createEvent = async(body:any)=>{
    try {
      const response = await axios.post("events/create", body);
      return response;
    } catch (err: any) {
      return err.response;
    }
}


  export const upComingEvents = async(incomingParams?:any) => {
    try {
        const response = await axios.get("/events/upcoming_events", {
            params:incomingParams
        });
        return response.data;
      } catch (err: any) {
        return err.response;
      }
  }

  export const getSingeEvent = async(id:any)=>{
    try{
        const response = await axios.get(`events/get-single-event/${id}`)
          return response.data;
    }catch(err:any){
        return err.response
    }
  }

  export const addEventComments = async(id:any, comments:any)=>{
    try{
        const response = await axios.post(`events/add-comment/${id}`, comments)
          return response.data;
    }catch(err:any){
        return err.response
    }
  }

  export const getEventComments = async(id:any)=>{
    try{
        const response = await axios.get(`events/comments/${id}`)
          return response.data;
    }catch(err:any){
        return err.response
    }
  }

  export const getHostedevents = async() => {
    try{
      const response = await axios.get(`events/get-my-events`)
        return response;
  }catch(err:any){
      return err.response
  }
  }

  export const getAttendedevents = async() => {
    try{
      const response = await axios.get(`events/attended_events`)
        return response;
  }catch(err:any){
      return err.response
  }
  }
  
  export const userReportEvent = async(id:any, body:any) => {
    try{
      const response = await axios.post(`events/report_event/${id}`, body)
        return response;
  }catch(err:any){
      return err.response
  }
  }

  export const userDeleteEvent = async(id:any) => {
    try{
      const response = await axios.delete(`events/delete_event/${id}`)
        return response;
  }catch(err:any){
      return err.response
  }
    // /delete_event/:id
  }

  export const userLikeEvent = async(id:any) => {
    try{
      const response = await axios.post(`events/like/${id}`)
        return response;
  }catch(err:any){
      return err.response
  }
  }
  
  export const userDislikeEvent = async(id:any) => {
    try{
      const response = await axios.post(`events/dislike/${id}`)
        return response;
  }catch(err:any){
      return err.response
  }
  }