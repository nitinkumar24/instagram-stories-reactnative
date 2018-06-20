import React, { Component } from 'react'
import { Text, View , TouchableWithoutFeedback, Image, StyleSheet,Dimensions,ScrollView} from 'react-native'
const { width, height } = Dimensions.get('window');

export default class Story extends Component {
    constructor(props){
        super(props)
        console.log(width);
    }
  render() {
    const { story } = this.props;
    return (
      <View>
        <TouchableWithoutFeedback
			>
					<Image
						source={{ uri: story.items[0].src }}
                        style={styles.image}
                        key = {story.idx}
					/>
			</TouchableWithoutFeedback>
          
      </View>
    )
  }
}

const styles = StyleSheet.create({
    image:{
        width: width, height:height,
        backgroundColor: 'pink',        
    }  
})