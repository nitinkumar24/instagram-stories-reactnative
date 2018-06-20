// import {FETCHING_STORIES, FETCHING_STORIES_SUCCESS, FETCHING_STORIES_FAILURE} from '../constants'
import { Text, View, StyleSheet,Image ,TouchableWithoutFeedback, ScrollView, Dimensions, Animated, PanResponder} from 'react-native'

const { width, height } = Dimensions.get('window');

const initialState = {
    stories: [],
    isFetching: false,
    error: false,
    isStart: false,
    startStory: null,
    startItem: null,
    horizontalSwipe: new Animated.Value(0)
}

export default function modeReducer(state = initialState, action){
    switch(action.type){
        case "FETCHING_STORIES":
            return{
                ...state,
                isFetching: true,
                stories: []
            }
        case "FETCHING_STORIES_SUCCESS":
            return {
                ...state,
                isFetching: false,
                isStart: true,
                stories: action.data
            }
        case "FETCHING_STORIES_FAILURE":
            return{
                ...state,
                isFetching: false,
                error: true
            }
        case "SET_START_STORY_AND_ITEM":
            return{
                ...state,
                startStory: action.startStory,
                stories: action.stories,
                isStart: true,
                startItem: action.startItem,
                horizontalSwipe: action.horizontalSwipe
                
            }
        case "ON_NEXT_ITEM":
            return{
                ...state,
                startStory: action.currentStory,
                isStart: true,
                startItem: action.currentItem
            }
        default:
            return state        
        }
    }