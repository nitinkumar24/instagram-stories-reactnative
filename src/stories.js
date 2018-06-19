import React, { Component } from 'react'
import { Text, View, StyleSheet,Image ,TouchableWithoutFeedback, ScrollView, Dimensions, Animated, PanResponder} from 'react-native'
import {connect} from 'react-redux'
import {onNextItem} from '.././actions/story.js'

const { width, height } = Dimensions.get('window');
const useNativeDriver = true;

// class Stories extends Component {

//   componentWillMount(){
//     this.panResponder  = PanResponder.create({
//       onStartShouldSetPanResponder:(evt,gestureState) => true,
//       onPanResponderMove:(evt,gestureState) => {

//       },
//       onMoveShouldSetPanResponderCapture: (evt, { dx, dy, moveX }) => {
//         // if(Math.abs(dx) > 400 ){
//         // this.props.onNextItem(this.props.stories.startStory,this.props.stories.startItem,this.props.stories.stories);
//         // return true;
//         // }
//         // return false;

// 				// 	console.log(moveX);
//       },
//       onPanResponderGrant: () => {
//         console.log("moveX");
// 			},
//       onPanResponderRelease:(evt,{moveX}) => {
//         return false;
//       }
//     })
//   }
    
//   render() {
      // const stories = this.props.stories.stories
      // var startStory = null
      // if(this.props.stories.startStory){
      //   startStory = this.props.stories.startStory.items
      //   console.log(typeof(startStory));
      // }
      // const startItem = this.props.stories.startItem
      // console.log(startStory);
      // console.log("hello");
      // console.log(startStory);
      
//     return (
//       <Animated.ScrollView style={styles.container} {...this.panResponder.panHandlers} horizontal={true} pagingEnabled={true}>
      // {
      //     startStory?
      //         <TouchableWithoutFeedback >
			// 		        <Image source={{ uri: startItem.src }} key={1} style={{ height:height-100, width: width}}/>
			// 	      </TouchableWithoutFeedback>
              
      //     : <Text> tems </Text>   
          
      // }
      //       {
      //     startStory?
      //         <TouchableWithoutFeedback >
			// 		        <Image source={{ uri: startItem.src }} key={2} style={{ height:height-100, width: width}}/>
			// 	      </TouchableWithoutFeedback>
              
      //     : <Text> tems </Text>   
          
      // }
//       </Animated.ScrollView>
//     )
//   }
// }
class CubeTransition extends React.Component {
  componentWillMount(){
    console.log("hello "+this.refs);
  }
  state = {
    scrollX: new Animated.Value(0)
  };

  render() {
   
    return (
      <Animated.ScrollView
        ref="scroller"
        horizontal
        alwaysBounceHorizontal={false}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        pagingEnabled
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: this.state.scrollX } } }],
          { useNativeDriver }
        )}>
          <Animated.View style={[
            { top: 0, left: 0, width, height},
            {transform: [{translateX: this.state.scrollX}]}
          ]}>
          <Text>hello</Text>
            {this.props.children.map(this._renderChild)}
          </Animated.View>
          {this.props.children.map(this._renderPlaceholders)}
      </Animated.ScrollView>
    );
  }

  _getTransformsFor = (i) => {
    let { scrollX } = this.state;
    let pageX = width * i;

    let translateX = scrollX.interpolate({
      inputRange: [pageX - width, pageX, pageX + width],
      outputRange: [width / 2, 0, -width /2],
      extrapolate: 'clamp',
    });

    let rotateY = scrollX.interpolate({
      inputRange: [pageX - width, pageX, pageX + width],
      outputRange: ['0deg', '0deg', '-70deg'],
      extrapolate: 'clamp',
    });

    let translateXAfterRotate = scrollX.interpolate({
      inputRange: [pageX - width, pageX, pageX + width],
      inputRange: [
        pageX - width,
        pageX - width + 0.1,
        pageX,
        pageX + width - 0.1,
        pageX + width,
      ],
      outputRange: [width, width / 2.38, 0, -width /2.38, -width],
      extrapolate: 'clamp',
    });

    return {
      transform: [
        {perspective: width},
        {translateX},
        {rotateY},
        {translateX: translateXAfterRotate}
      ]
    };
  };

  _getOpacityFor = (i) => {
    let { scrollX } = this.state;
    let pageX = width * i;
    let opacity = scrollX.interpolate({
      inputRange: [ pageX - width, pageX, pageX + width ],
      outputRange: [0.9, 0, 0.9],
      extrapolate: 'clamp'
    });

    return {
      opacity
    };
  };

  _renderChild = (child, i) => {
    return (
      <Animated.View
        style={[StyleSheet.absoluteFill, this._getTransformsFor(i)]}
        key={`child-${i}`}>
        {child}
      
      </Animated.View>
    );
  };

  _renderPlaceholders = (child, i) => {
    return (
      <View key={`placeholder-${i}`} style={{width , height}} />
    );
  };
}

class Stories extends React.Component {
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
      <CubeTransition style={styles.container} contentContainerStyle={styles.contentContainer}>
      {
          startStory?
              <TouchableWithoutFeedback >
					        <Image source={{ uri: startItem.src }} key={1} style={{ height:height-100, width: width}}/>
				      </TouchableWithoutFeedback>
              
          : <Text> tems </Text>   
          
      }
    {
          startStory?
              <TouchableWithoutFeedback >
					        <Image source={{ uri: startItem.src }} key={2} style={{ height:height-100, width: width}}/>
				      </TouchableWithoutFeedback>
              
          : <Text> tems </Text>   
          
      }     
        <Image
          source={{ uri: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/7WQZUEU75C.jpg' }}
          style={styles.image}
        />
        <Image
          source={{ uri: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/TZR2DHPXLS.jpg' }}
          style={styles.image}
          key="2"
        />
        <Image
          source={{ uri: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/7WQZUEU75C.jpg' }}
          style={styles.image}
        />
        <Image
          source={{ uri: 'http://lorempixel.com/400/600/nature/4' }}
          style={styles.image}
          key="4"
        />
        <Image
          source={{ uri: 'http://lorempixel.com/400/600/nature/5' }}
          style={styles.image}
          key="5"
        />
        <Image
          source={{ uri: 'http://lorempixel.com/400/600/nature/6' }}
          style={styles.image}
          key="6"
        />
      </CubeTransition>
    );
  }
}

const styles = StyleSheet.create({
    container : {      
    },
    image:{
      width:width,
      height:height
    }
})

function mapStateToProps(state){  
    return {
      stories: state.stories,
    }
  
  }
export default connect(mapStateToProps,{onNextItem})(Stories)