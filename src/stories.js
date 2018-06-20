import React, { Component } from 'react'
import { Text, View, StyleSheet,Image ,TouchableWithoutFeedback, ScrollView, Dimensions, Animated, PanResponder} from 'react-native'
import {connect} from 'react-redux'
import {onNextItem} from '.././actions/story.js'
import {onNextStory} from '.././actions/story.js'


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
              duration: 1000,            
            }
          ).start();        
          
          this.props.onNextStory((this.props.stories.startStory.idx-1),this.props.stories.stories,this.props.stories.horizontalSwipe, true)
          return true;
        }
        console.log(dx);
        
        if(dx < -HORIZONTAL_THRESHOLD){
          Animated.timing(                 
            this.props.stories.horizontalSwipe,            
            {
              toValue: (((this.props.stories.startStory.idx)+1)*width),                   
              duration: 1000,            
            }
          ).start();        
          
          this.props.onNextStory((this.props.stories.startStory.idx)+1,this.props.stories.stories,this.props.stories.horizontalSwipe, true)
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
      // if(this.props.stories.animate){
      //   Animated.timing(                 
      //     this.props.stories.horizontalSwipe,            
      //     {
      //       toValue: (width),                   
      //       duration: 1000,            
      //     }
      //   ).start();        
        
      //   return true;
        
      // }
      console.log(this.props.stories.map);

      style = {
				width: this.props.stories.indicatorAnim.interpolate({
					inputRange: [0, 1],
					outputRange: [0,width],
					extrapolate: 'clamp'
				}),backgroundColor:'white'
			};
      
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
                source={{ uri: stories[story.idx].items[this.props.stories.map.get(story.idx)].src }}
                            style={styles.image}
                            key = {story.idx}
                />
                <View style={styles.indicatorWrap}>
                  <View style={styles.indicators}>
                    {story.items.map((item, i) => (                    
                      <View style={styles.line} key={i}>
                        <Animated.View style={[
                          styles.progress,
                          i === this.props.stories.map.get(story.idx) && story.idx === this.props.stories.startStory.idx? style : null ,
                          i < this.props.stories.map.get(story.idx) ? {backgroundColor: 'white'} : null
                          ] }  />
                      </View>
                    ))}
                  </View>
                  {this.props.stories.isStart? this.animateIndicator() : null}
                </View>
         
						</Animated.View>
            
            
					);
				})}     
      </View>
    )
  }

  animateIndicator(){
    requestAnimationFrame(() => {
			Animated.timing(this.props.stories.indicatorAnim, {
				toValue: 1,
				duration: 5000 * (1-this.props.stories.indicatorAnim._value),
			}).start(({ finished }) => {
				if (finished) this.props.onNextItem(this.props.stories.startStory,this.props.stories.startItem,this.props.stories.stories,this.props.stories.horizontalSwipe);
			});
		});    
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
    },
    indicatorWrap: {
      position: 'absolute',
      top: 0, left: 0, right: 0,
    },
    indicators: {
      height: 30,
      alignItems: 'center',
      paddingHorizontal: 10,
      flexDirection: 'row',
    },
    line: {
      flex: 1,
      backgroundColor: 'rgba(255,255,255,0.4)',
      marginHorizontal: 2,
      height: 2,
    },
    progress: {
      backgroundColor: 'rgba(255,255,255,0.4)',
      height: 2,
    },
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
//        (width*idx),
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
