import React, { Component } from 'react'
import { 
    Text,
     View ,
     TouchableWithoutFeedback,
     Image,
     StyleSheet,
     ScrollView,
     Dimensions
    } 
     from 'react-native'
import data from './data'
import {startStories} from '.././actions/story.js'
import {connect} from 'react-redux'
import Stories from './stories'


const { width, height } = Dimensions.get('window');


const thumbs = data
console.log(thumbs);


class Thumbnail extends Component {
  render() {
    const isStart  = this.props.stories.isStart
    console.log(this.props.stories);
    

    return (
      <View style={styles.container}>
      <ScrollView style={styles.stories} horizontal={true} showsHorizontalScrollIndicator={false} removeClippedSubviews={true}>
         {thumbs.map((thumb,i) => (
							<View key={thumb.idx} style={styles.thumbnail}>
								<TouchableWithoutFeedback onPress={() => this.props.startStories(thumb.idx)}>
									<Image source={{ uri: thumb.avatar }} style={{width:60,height:60,borderRadius:30,marginRight: 10}}/>
								</TouchableWithoutFeedback>

							</View>
            ))}
      </ScrollView>
      <View style={isStart? styles.open : styles.closed}>
        <Stories/>
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  stories: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    margin: 12

  },
  thumbnail:{
    flexDirection: 'row',
    height: 100,

  },
  closed: {
		width: 0,
    height: 0,
    overflow: 'hidden',
		position: 'absolute',
	},
	open: {
    width,
    height,
		top: 0,
    left: 0,
    overflow: 'hidden',
		position: 'absolute',
	},
}
)

function mapStateToProps(state){  
  return {
    stories: state.stories,
  }

}

 function mapDispatchToProps(dispatch){
  return{
    getStories: () =>  dispatch(fetchStoriesFromAPI())
  }
}

export default connect(mapStateToProps,{startStories})(Thumbnail)