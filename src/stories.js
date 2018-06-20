import React, { Component } from 'react'
import { Text, View, StyleSheet,Image ,TouchableWithoutFeedback, ScrollView, Dimensions, Animated, PanResponder} from 'react-native'
import {connect} from 'react-redux'
import {onNextItem} from '.././actions/story.js'
import {onNextStory} from '.././actions/story.js'

import Story from './story';

const { width, height } = Dimensions.get('window');
const useNativeDriver = true;
const HORIZONTAL_THRESHOLD = 60;

class Stories extends Component {
  
  componentWillMount(){
    
    this.panResponder  = PanResponder.create({
      onStartShouldSetPanResponder:(evt,gestureState) => true,
      onPanResponderMove:(evt,gestureState) => {

      },
      onMoveShouldSetPanResponderCapture: (evt, { dx, dy, moveX }) => {

        // if(Math.abs(dx) > 10 ){
        //   Animated.timing(                 
        //     this.props.stories.horizontalSwipe,            
        //     {
        //       toValue: (((this.props.stories.startStory.idx)+1)*width),                   
        //       duration: 500,            
        //     }
        //   ).start();        
          
        //   this.props.onNextStory((this.props.stories.startStory),this.props.stories.stories)
        //   return true;
        // }
        // return false;
      },
      onPanResponderGrant: () => {
   
			},
      onPanResponderRelease:(evt,{dx, dy, moveX }) => {
        if(dx > HORIZONTAL_THRESHOLD ){
          Animated.timing(                 
            this.props.stories.horizontalSwipe,            
            {
              toValue: (((this.props.stories.startStory.idx)-1)*width),                   
              duration: 500,            
            }
          ).start();        
          
          this.props.onNextStory((this.props.stories.startStory.idx-1),this.props.stories.stories)
          return true;
        }
        console.log(dx);
        
        if(dx < -HORIZONTAL_THRESHOLD){
          Animated.timing(                 
            this.props.stories.horizontalSwipe,            
            {
              toValue: (((this.props.stories.startStory.idx)+1)*width),                   
              duration: 500,            
            }
          ).start();        
          
          this.props.onNextStory((this.props.stories.startStory.idx)+1,this.props.stories.stories)
          return true;

        }
        return false;
      }
    })
  }
    
  render() {
      const stories = this.props.stories.stories
      var startStory = null
      if(this.props.stories.startStory){
        startStory = this.props.stories.startStory.items
        console.log(typeof(startStory));
      }
      const startItem = this.props.stories.startItem
      console.log(this.props);
      console.log("hello");
      console.log(startStory);
      
    return (
      <View style={styles.container}>
      {stories.map((story, i) => {
					return (
						<Animated.View
            {...this.panResponder.panHandlers }
							key={i}
							style={[ {
								transform: [
									{
										translateX: this.props.stories.horizontalSwipe.interpolate({
											inputRange: [ -width,0, width*i,width*(i+1) ],
											outputRange: [ width,0, -(width*i),-(width*(i+1))],
                      extrapolate: 'clamp',
                    })
                  },
              	]
							}]
						}>
						<Image
            {...this.panResponder.panHandlers }
						source={{ uri: story.items[0].src }}
                        style={styles.image}
                        key = {story.idx}
					/>
						</Animated.View>
					);
				})}     
      </View>
    )
  }
}


const styles = StyleSheet.create({
    container : { 
      flex:2,
      flexDirection:'row',
		backgroundColor: 'blue',     
    },
    deck:{
      
    },
    image:{
      width: width, height:height,
        backgroundColor: 'pink',     
    }
})

function mapStateToProps(state){  
    return {
      stories: state.stories,
    }
  
  }
export default connect(mapStateToProps,{onNextItem,onNextStory})(Stories)

//   _getTransformsFor = (i) => {
//     let { scrollX } = this.state;
//     let (width*idx) = width * i;

//     let translateX = scrollX.interpolate({
//       inputRange: [(width*idx) - width, (width*idx), (width*idx) + width],
//       outputRange: [width / 2, 0, -width /2],
//       extrapolate: 'clamp',
//     });

//     let rotateY = scrollX.interpolate({
//       inputRange: [(width*idx) - width, (width*idx), (width*idx) + width],
//       outputRange: ['0deg', '0deg', '-70deg'],
//       extrapolate: 'clamp',
//     });

//     let translateXAfterRotate = scrollX.interpolate({
//       inputRange: [(width*idx) - width, (width*idx), (width*idx) + width],
//       inputRange: [
//         (width*idx) - width,
//         (width*idx) - width + 0.1,
//         (width*idx),
//         (width*idx) + width - 0.1,
//         (width*idx) + width,
//       ],
//       outputRange: [width, width / 2.38, 0, -width /2.38, -width],
//       extrapolate: 'clamp',
//     });

//     return {
//       transform: [
//         {perspective: width},
//         {translateX},
//         {rotateY},
//         {translateX: translateXAfterRotate}
//       ]
//     };
//   };
