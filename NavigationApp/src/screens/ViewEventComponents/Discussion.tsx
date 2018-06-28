import * as React from 'react'
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native'
import { Avatar } from 'react-native-elements'

const { width, height } = Dimensions.get('window');

const DiscussionData = [{
  username: 'Lucas',
  massage: 'awesome event !!!!',
}, {
  username: 'Brad',
  massage: 'YOYOYO',
}, {
  username: 'Jacob',
  massage: 'Yeah',
}, {
  username: 'Stephen',
  massage: 'not bad',
}, {
  username: 'Alex',
  massage: 'Good!',
}]

interface IData {
  username: string,
  massage: string,
};


interface IDiscussionStates {
  TextBox: string,
  Data: IData[],
}

export default class Discussion extends React.Component<{}, IDiscussionStates> {
  renderChatBubble(name, comment) {

    return (
      <View style={{ flexDirection: 'row' }}>
        {<Avatar
          small
          rounded
          source={{ uri: '' }}
        />}
        <View style={{ backgroundColor: '#a1afc6' }}>
          <Text>
            {comment}
          </Text>
        </View>
      </View>
    )
  }
  render() {
    return (
      <ScrollView>

      </ScrollView>
    )
  }
}
//   constructor(props: {}) {
//     super(props)

//     this.state = {
//       TextBox: '',
//       Data: [{
//         username: '',
//         massage: '',
//       }],
//     }
//   }

//   public renderData = () => {
//     this.setState({
//       Data: DiscussionData.concat({
//         username: 'user.name',
//         massage: this.state.TextBox,
//       })
//     })
//   }

//   render() {
//     return (
//       <View style={{ flex: 1 }}>
//         <FlatList
//           data={DiscussionData}
//           renderItem={(data) => {
//             return (
//               <ScrollView>
//                 <View style={{ marginHorizontal: 20, marginTop: 10, borderRadius: 25, borderWidth: 1, padding: 10, backgroundColor: '#ffffcc' }}>
//                   <View style={{ marginHorizontal: 10 }}>
//                     <Text style={{ fontSize: 20 }}>{data.item.username}</Text>
//                   </View>
//                   <View style={{ marginHorizontal: 20, padding: 20 }}>
//                     <Text>{data.item.massage}</Text>
//                   </View>
//                 </View>
//               </ScrollView>
//             )
//           }}
//           keyExtractor={data => data.massage}
//         />

//         <View style={{ backgroundColor: 'white' }}>

//           <TextInput
//             value={this.state.TextBox}
//             onChangeText={(text) => this.setState({
//               TextBox: text
//             })}
//             placeholder='massage'
//             keyboardAppearance='dark'
//             style={{ backgroundColor: 'transparent', width: '80%', marginHorizontal: 10 }}
//           />

//           {this.state.TextBox ?
//             <TouchableWithoutFeedback onPress={() => this.renderData}>
//               <Icon
//                 name='send-o'
//                 color='green'
//                 size={25}
//                 style={{
//                   position: 'absolute',
//                   top: 10,
//                   right: 20,
//                   zIndex: 1
//                 }}
//               />
//             </TouchableWithoutFeedback>
//             : null}

//         </View>

//       </View >
//     )
//   }
// }