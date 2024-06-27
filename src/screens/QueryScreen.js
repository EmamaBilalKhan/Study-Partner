import React, { useState } from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, Text, Image} from 'react-native';

export default function QueryScreen(){
  const TopScreenText = 'How do you feel?\nLets try to figure things\nout together.'
  const [text, setText] = useState('');
  const [submittedText, setSubmittedText] = useState(false);
  const [Response, setResponse] = useState('Loading...');
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const genAI = new GoogleGenerativeAI('AIzaSyCsDu30pMbdVk0HjuMnADEFcPPEl7DuYfA');

  const handleSubmit = async () => {
    setSubmittedText(true);
    try {
      console.log("text: "+text);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
      const result = await model.generateContent(text);
      const gemini_response = await result.response;
      setResponse(gemini_response.text());
    } catch (error) {
      console.error('Error fetching response:', error);
      setResponse('There was a problem getting a response. Please try again later.'); 
  }};
  
  const handleBack = () => {
    setSubmittedText(false);
    setText('');
    setResponse('');
  };

    return(
      <View style={styles.MainView}>
        <View style={styles.ScreenTextView}>
          <Text style={styles.ScreenText}>{TopScreenText}</Text>
        </View>

        <View style={styles.container}>
        
        {!submittedText && (
          <TextInput
            style={styles.textInput}
            value={text}
            onChangeText={setText}
            placeholder="I feel..."
            placeholderTextColor="#ccc"
            multiline={true}
            numberOfLines={6}
            blurOnSubmit={true}
          />
        )}
        {!submittedText && ( 
          <TouchableOpacity style={styles.Submit} onPress={handleSubmit}>
            <Text style={styles.SubmitText}>Submit</Text>
          </TouchableOpacity>
        )}

        {submittedText && (
          <TextInput
          style={styles.textInput}
          placeholder={Response}
          placeholderTextColor="black"
          multiline={true}
          numberOfLines={6}
          editable={false}
          />
        )}
        
        {submittedText && ( 
          <TouchableOpacity style={styles.Submit} onPress={handleBack}>
            <Text style={styles.SubmitText}>Back</Text>
          </TouchableOpacity>
        )}
        </View>
        <Image style={styles.Image} source={"../../assets/studying2.jpg"}></Image>
      </View>
    
);
 
  }

const styles = StyleSheet.create({
  MainView:{
    alignSelf:'center'
  },
  ScreenTextView:{
    marginTop:38,
    marginBottom:38,
    marginHorizontal:20,
    alignItems:'center',
    height:'10%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
  ,
  ScreenText:{
    fontWeight: 'bold',
    fontSize: 30,
    color:'black'
  },
  container: {
    marginHorizontal:20,
    alignItems: 'center',
    height: '60%',
    width:'100%',
    
  },
  textInput: {
    backgroundColor: 'light gray', 
    padding: 10,
    flexWrap: 'wrap', 
    textAlignVertical: 'top', 
    height:'%100',
    width:'100%',
    borderRadius:20,
    borderColor:'#E8C5E5',
    borderWidth:2
  },

  Submit: {
    width: '30%',
    height: 30,
    borderRadius:10,
    backgroundColor:'#BBE9FF',
    marginTop:30,
    alignItems:'center',
    alignSelf:'center'
  },

  SubmitText:{
    color: 'black', 
    fontSize: 15,
    paddingTop:3,
    fontWeight:'bold'
    
  },

  responseText:{
    backgroundColor: 'light gray',
    padding: 10,
    fontSize: 20, 
    borderRadius: 20,
    borderColor: '#E8C5E5',
    borderWidth: 2,
    maxWidth: '80%', 
    flexWrap: 'wrap', 
    
  },
  Image:{
    alignSelf:'center',
    marginTop: 50,
    height: 175,
    width:250
  }
})