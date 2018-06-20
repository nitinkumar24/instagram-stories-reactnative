import React, { Component } from 'react'
import { Text, View, StyleSheet,Image ,TouchableWithoutFeedback, ScrollView, Dimensions, Animated, PanResponder} from 'react-native'
import {connect} from 'react-redux'
import {onNextItem} from '.././actions/story.js'
import Story from './story';

const { width, height } = Dimensions.get('window');
const useNativeDriver = true;

class Stories extends Component {

  constructor() {
    super();
    this.state = {
      horizontalSwipe: new Animated.Value(0),
    }
  }


  componentWillMount(){
   
    this.panResponder  = PanResponder.create({
      onStartShouldSetPanResponder:(evt,gestureState) => true,
      onPanResponderMove:(evt,gestureState) => {

      },
      onMoveShouldSetPanResponderCapture: (evt, { dx, dy, moveX }) => {
        console.log(dx);

        if(Math.abs(dx) > 10 ){
          Animated.spring(                  // Animate over time
            this.state.horizontalSwipe,            // The animated value to drive
            {
              toValue: (2*width),                   // Animate to opacity: 1 (opaque)
              friction: 9,              // Make it take a while
            }
          ).start();    
          console.log(this.state.horizontalSwipe);
                
          return true;
        }
        return false;
				console.log(moveX);
      },
      onPanResponderGrant: () => {
   
			},
      onPanResponderRelease:(evt,{moveX}) => {
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
      console.log(startStory);
      console.log("hello");
      console.log(startStory);
      
    return (
      <View style={styles.container}   >
      {stories.map((story, i) => {
					return (
						<Animated.View
            {...this.panResponder.panHandlers }
							key={i}
							style={[ {
								transform: [
									{
										translateX: this.state.horizontalSwipe.interpolate({
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
export default connect(mapStateToProps,{onNextItem})(Stories)
// class CubeTransition extends React.Component {
//   componentWillMount(){
//     console.log("hello "+this.refs);
//   }
//   state = {
//     scrollX: new Animated.Value(0)
//   };

//   render() {
   
//     return (
//       <Animated.ScrollView
//         ref="scroller"
//         horizontal
//         alwaysBounceHorizontal={false}
//         showsHorizontalScrollIndicator={false}
//         bounces={false}
//         pagingEnabled
//         scrollEventThrottle={1}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { x: this.state.scrollX } } }],
//           { useNativeDriver }
//         )}>
//           <Animated.View style={[
//             { top: 0, left: 0, width, height},
//             {transform: [{translateX: this.state.scrollX}]}
//           ]}>
//           <Text>hello</Text>
//             {this.props.children.map(this._renderChild)}
//           </Animated.View>
//           {this.props.children.map(this._renderPlaceholders)}
//       </Animated.ScrollView>
//     );
//   }

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

//   _getOpacityFor = (i) => {
//     let { scrollX } = this.state;
//     let (width*idx) = width * i;
//     let opacity = scrollX.interpolate({
//       inputRange: [ (width*idx) - width, (width*idx), (width*idx) + width ],
//       outputRange: [0.9, 0, 0.9],
//       extrapolate: 'clamp'
//     });

//     return {
//       opacity
//     };
//   };

//   _renderChild = (child, i) => {
//     return (
//       <Animated.View
//         style={[StyleSheet.absoluteFill, this._getTransformsFor(i)]}
//         key={`child-${i}`}>
//         {child}
      
//       </Animated.View>
//     );
//   };

//   _renderPlaceholders = (child, i) => {
//     return (
//       <View key={`placeholder-${i}`} style={{width , height}} />
//     );
//   };
// }

// class Stories extends React.Component {
//   render() {
//     const stories = this.props.stories.stories
//     var startStory = null
//     if(this.props.stories.startStory){
//       startStory = this.props.stories.startStory.items
//       console.log(typeof(startStory));
//     }
//     const startItem = this.props.stories.startItem
//     console.log(startStory);
//     console.log("hello");
//     console.log(startStory);
    
//     return (
//       <CubeTransition style={styles.container} contentContainerStyle={styles.contentContainer}>
//       {
//           startStory?
//               <TouchableWithoutFeedback >
// 					        <Image source={{ uri: startItem.src }} key={1} style={{ height:height-100, width: width}}/>
// 				      </TouchableWithoutFeedback>
              
//           : <Text> tems </Text>   
          
//       }
//     {
//           startStory?
//               <TouchableWithoutFeedback >
// 					        <Image source={{ uri: startItem.src }} key={2} style={{ height:height-100, width: width}}/>
// 				      </TouchableWithoutFeedback>
              
//           : <Text> tems </Text>   
          
//       }     
//         <Image
//           source={{ uri: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/7WQZUEU75C.jpg' }}
//           style={styles.image}
//         />
//         <Image
//           source={{ uri: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/TZR2DHPXLS.jpg' }}
//           style={styles.image}
//           key="2"
//         />
//         <Image
//           source={{ uri: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/7WQZUEU75C.jpg' }}
//           style={styles.image}
//         />
//         <Image
//           source={{ uri: 'http://lorempixel.com/400/600/nature/4' }}
//           style={styles.image}
//           key="4"
//         />
//         <Image
//           source={{ uri: 'http://lorempixel.com/400/600/nature/5' }}
//           style={styles.image}
//           key="5"
//         />
//         <Image
//           source={{ uri: 'http://lorempixel.com/400/600/nature/6' }}
//           style={styles.image}
//           key="6"
//         />
//       </CubeTransition>
//     );
//   }
// }