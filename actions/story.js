
import data from './data';
import { Text, View, StyleSheet,Image ,TouchableWithoutFeedback, ScrollView, Dimensions, Animated, PanResponder} from 'react-native'

const { width, height } = Dimensions.get('window');
console.log("hiana");

var map = new Map();


for(i=0;i<data.length;i++){
    map.set(data[i].idx, 0)
}

console.log(map);





function fetchStoriesFromAPI(data) {
    
    return (dispatch) => {
        dispatch(getStories())
        dispatch(getStoriesSuccess("HELLO"))
    }
  }

export function startStories(startStoryId) {
    const stories = data;
    return (dispatch) => {
        dispatch(setStartStoryAndItem(startStoryId,stories))
    }
  }

function setStartStoryAndItem(startStoryId,stories){
    var startStory = ""
    for(var i=0;i<stories.length;i++){
        if(stories[i].idx === startStoryId){
            startStory = stories[i]
            break;            
        }
    }
    console.log("jhvjh");
    
    console.log(startStory.items[0]);
    scrollX = startStory.idx*width
    const startItem = startStory.items[0];
    horizontalSwipe = new Animated.Value((startStory.idx*width))

    return{
        type: "SET_START_STORY_AND_ITEM",
        startStory,stories,startItem,
        scrollX,
        horizontalSwipe,
        map
    }
}


function getStories(data){
    return{
        type: "FETCHING_STORIES"

    }
}

function getStoriesSuccess(data){
    
    return {

    type : "FETCHING_STORIESS_SUCCESS",
    data

    }
}

function getStoriesFailure(){
    return{
    type : "FETCHING_STORIES_FAILURE"
    }
}


export function onNextItem(currentStory,currentItem,stories){
    console.log(stories);
    console.log(currentStory);
    
    console.log(currentItem);
    if(currentItem.id<currentStory.items.length-1){
    currentItem = currentStory.items[currentItem.id+1]
    console.log("in if");
    }
    else{
        // console.log("in ");
        
        // currentStory = stories[currentStory.idx+1]
        // console.log(currentStory);
        
        // currentItem = currentStory.items[0]
        // console.log(currentItem);
        
        // console.log("else");
        
    }
    indicatorAnim = new Animated.Value(0);

    return{
        type: "ON_NEXT_ITEM",
        currentStory,
        currentItem,
        indicatorAnim
    }
}

export function onNextStory(currentStory,stories){
    
    if(currentStory < stories.length-1){
        currentStory = stories[currentStory]
        currentItem = currentStory.items[0]
    console.log("in if");
    }
    // else{
    //     console.log("in ");
        
    //     currentStory = stories[currentStory.idx+1]
    //     console.log(currentStory);
        
    //     currentItem = currentStory.items[0]
    //     console.log(currentItem);
        
    //     console.log("else");
        
    // }
    indicatorAnim = new Animated.Value(0);

    return{
        type: "onNextStory",
        currentStory,
        stories,
        currentItem,
        indicatorAnim
    }
}