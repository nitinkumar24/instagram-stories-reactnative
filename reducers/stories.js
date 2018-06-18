// import {FETCHING_MODES, FETCHING_MODES_SUCCESS, FETCHING_MODES_FAILURE} from '../constants'


const initialState = {
    modes: [],
    isFetching: false,
    error: false
}

export default function modeReducer(state = initialState, action){
    // switch(action.type){
    //     case FETCHING_MODES:
    //         return{
    //             ...state,
    //             isFetching: true,
    //             modes: []
    //         }
    //     case FETCHING_MODES_SUCCESS:
    //         return {
    //             ...state,
    //             isFetching: false,
    //             modes: action.data

    //         }
    //     case FETCHING_MODES_FAILURE:
    //         return{
    //             ...state,
    //             isFetching: false,
    //             error: true
    //         }
    //     default:
    //         return state
        
    //     }
    return state
    }