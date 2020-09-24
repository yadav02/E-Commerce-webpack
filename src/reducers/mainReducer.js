import {ADD_TO_CART, ORDER_PLACED} from '../redux/action-type';



const initialState = {
    totalCount: 0 || parseInt(localStorage.getItem('amountOfProducts'))
}


export const mainReducer = (state = initialState, action) => {
   
    switch(action.type){
        case ADD_TO_CART: 
        return{
            ...state,
            totalCount: state.totalCount + 1 
        }
        case ORDER_PLACED: 
        return{
            totalCount: 0
        }
        default: return state;
     
    }
}