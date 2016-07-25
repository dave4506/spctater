import defaultAction from './default'

export default function userReducer(msgType,msg,userState){
    return defaultAction(msgType,msg,userState);
}
