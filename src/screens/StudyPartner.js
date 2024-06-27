import { StyleSheet, Text, View, TouchableOpacity, Image,ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { collection, getDoc, doc } from "firebase/firestore";
import { db } from './Firebase';
import QueryScreen from './QueryScreen';
import FocusScreen from './FocusScreen';
import ToDoListScreen from './ToDoListScreen';
export default function StudyPartner({navigation}) {
  const name = "Emama";
  const [tip, setTip] = useState('Loading...');
  const [story, setStory] = useState({
    name: 'Loading...',
    image: '../../assets/Loading.png',
    story: 'Loading...',
  });

  const generateRandomDocId = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
    
  };

  useEffect(() => {
    const StorydocId = generateRandomDocId(1, 5).toString();
    getSpecificStory(StorydocId);
  }, []);


  useEffect(() => {
    const TipdocId = generateRandomDocId(1, 11).toString(); 
    getSpecificTip(TipdocId);
  }, []);

  const getSpecificTip = async (docId) => {
    const docRef = doc(collection(db, "Tips"), docId);
  
    try {
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists) {
        const tipData = docSnap.data();
        console.log("Id is :"+docId)
        console.log(tipData)
        console.log("Tip data:", tipData);
        setTip(tipData.Tip);
      } else {
        console.log("No matching document for tip found");
      }
    } catch (error) {
      console.error("Error fetching Tip document:", error);
      setTip("Believe in Yourself! You are capable of achieving great things. Set realistic goals, work hard, and never give up on your dreams. You've got the brains, the determination, and the power to succeed! Remember, 'I can do it!' is a powerful mantra.")

    }
  };

  const getSpecificStory = async (docId) => {
    const docRef = doc(collection(db, "Stories"), docId);
  
    try {
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists) {
        const StoryData = docSnap.data();
        console.log("Id is :"+docId)
        console.log(StoryData)
        console.log("Story data:", StoryData);
        setStory({name: StoryData.name, image: StoryData.image, story: StoryData.story});
      } else {
        console.log("No matching document for Story found");
      }
    } catch (error) {
      console.error("Error fetching Story document:", error);
      setStory({name:"Steve Jobs", image: "../../assests/SteveJobs.jpg", story: "Steve Jobs, a college dropout, defied the odds. Fueled by passion, he dared to dream of changing the world with a computer. Through setbacks and failures, he persevered, proving that greatness can come from carving your own path. Be inspired: chase your dreams with relentless focus!"})

    }
  };
  

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image source={"./assets/books2.jpg"} style={styles.topRightImage} />
        <Text style={styles.TextStyle}>Hi,{"\n"}{name}</Text>
      </View>
      <TouchableOpacity style={styles.FeelingContainer} onPress={()=>navigation.navigate(QueryScreen)}>
      <View style={styles.FeelingView}></View>
      <Text style={styles.FeelingText}>How do you feel? Lets talk about it</Text>
      <Image style={styles.FeelingImage} source={"./assets/Chat.png"}></Image>
      </TouchableOpacity>
      <View style={styles.TipContainer}>
        <Text style={styles.TipHeadingText}>Tip of the day</Text>
        <View style={styles.TipContainerView}></View>
        <Text style={styles.TipText}>{tip}</Text>
      </View>
      
      <Text style={styles.ToolHeadingText}>Tools</Text>
      <View style={styles.ToolsContainer}>
        <TouchableOpacity style={styles.Tool} onPress={()=>navigation.navigate(FocusScreen)} >
            <Image source={"./assets/FocusSession.png"} style={styles.ToolImage}></Image>
            <Text style={styles.ToolText}>Focus Session</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate(ToDoListScreen)} style={styles.Tool}>
            <Image source={"./assets/Tasks.png"} style={styles.ToolImage}></Image>
            <Text style={styles.ToolText}>My Tasks</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.StoryHeadingText}>Featured for the Day</Text>
        <View style={styles.StoryView}></View>
        <View style={styles.StoryContainer}>
            <Image style={styles.StoryImage} source={story.image}></Image>
            <View style={styles.StoryTextContainer}>
                <Text style ={styles.StoryName}>{story.name}</Text>
                <Text style={styles.StoryText}>{story.story}</Text>
          </View>
        </View>
      </View>

      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column', 
        backgroundColor: 'white',
        flex: 1
     },
    
        TextStyle: {
        fontWeight: 'bold',
        fontSize: 35,
        top:100,
        left:10
    },
    
    topRightImage: {
        width:200, 
        height: 200, 
        position: 'absolute',
        top: 10, 
        right: 5, 
    },
    
     TipContainer:{
        backgroundColor: "#fbdddd",
        borderRadius: 10,
        marginTop: 30,
        marginHorizontal:5,
        alignItems:'center'
    },
      TipHeadingText:{
        paddingVertical:7,
        fontWeight: 'bold',
        
      },
    TipText:{
        paddingHorizontal:13,
        paddingVertical:10,
        textAlign:'center'
    },
    TipContainerView:{
        backgroundColor:'white',
        height:2,
        width:350,
        borderRadius:4
    },
    FeelingContainer:{
        flexDirection: 'row',
        marginTop:150,
        marginHorizontal:5,
    },
    FeelingText:{
        fontWeight:'bold', marginLeft:12, marginRight:4, alignSelf:'center'
    },
    FeelingImage:{
        marginTop:15,
        height:20,
        width:20,
        
    },
    FeelingView:{
        backgroundColor:'#abceec',
        width:2,
        height:50
    },
    StoryContainer:{
        flexDirection:'row',
        
    },
    StoryHeadingText:{
        paddingVertical:7,
        fontWeight: 'bold',
        marginTop: 25,
        paddingLeft:10,
        
    },
    StoryView:{
        backgroundColor:'#abceec',
        width:180,
        height:2,
        marginLeft:10
    },
    StoryImage:{
        marginHorizontal:10,
        marginVertical:10,
        borderRadius: 3,
        height:50,
        width:40
    },
    StoryTextContainer:{
        flexDirection:'row',
        flexWrap:"wrap",
        maxWidth:'85%'
    },
    StoryName:{
        fontWeight:'bold',
        marginLeft:4,
        marginVertical:4,
        
    },
    StoryText:{
        marginLeft:4,
        marginBottom:4,
    },
    ToolsContainer:{
        flexDirection: 'row',
        justifyContent: 'center'
    },
    ToolHeadingText:{
        fontWeight:'bold',
        marginVertical: 20,
        paddingLeft:10
    },
    Tool:{
        flexDirection:'column',
        alignItems:'center',
        backgroundColor:"#eeeeee",
        borderRadius:10,
        paddingHorizontal:10,
        paddingVertical:5,
        marginHorizontal:10,
        minWidth:180
    },
    ToolImage:{
        height:70,
        width:70,
        marginVertical: 7
    },
    ToolText:{
        fontWeight:'bold',
        marginBottom:7,
        marginLeft:5
    }
    });
