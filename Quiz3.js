import React, { useState } from 'react';
import {Text} from 'react-native';

const friendsArray = [
  { name: "John", age: 19, ID:1 },
  { name: "Candy", age: 18, ID:2 },
  { name: "Mandy", age: 20, ID:3  },

];

const newfriendsArray = [
    {
      id: 1,
      name: "Handy",
      age: 19,
      hobbies: [
        { text: "Cooking", id: 1 },
        { text: "Reading", id: 2 },
      ],
    },
  ];

const App = () => {
  const [friends, setFriends] = useState(friendsArray);

  const handleAddFriend = () => {
 
    const newFriendName = prompt("Enter friend's name:");
    const newFriendAge = prompt("Enter friend's age:");


    


    const newFriend = { name: newFriendName, age: newFriendAge };

 
    setFriends((prevFriends) => [...prevFriends, newFriend]);

  };

  const handleSecondFriend = () => {
    const newName = prompt("Enter new name for the second friend:");
    const newAge = prompt("Enter new Age for the second friend:");
    const newID = prompt("Enter new ID for the second friend:");
    setFriends((prevFriends) =>
      prevFriends.map((friend, index) => (index === 1 ? { ...friend, name: newName, age: newAge, ID: newID } : friend))
    );
  };

  return (
    <main>
      <ul>
        {}
        {friends.map((friend, index) => (
          <li key={index}>
            <span>name: {friend.name}</span>{' '}
            <span>age: {friend.age}</span>{' '}
            <span>id: {friend.ID}</span>{' '}
          </li>
        ))}
      </ul>
      <button onClick={handleAddFriend}>Add Friend</button>
      <button onClick={handleSecondFriend}>Add Second Friend</button>

      <Text>hobbies array: </Text>
      {newfriendsArray.map((friend, index) => (
        <div key={index}>
            <span>name: {friend.name}</span>{' '}
            <span>age: {friend.age}</span>{' '}
            <span>id: {friend.id}</span>
          <ul>
            {friend.hobbies.map((hobby) => (
              <li key={hobby.id}>{hobby.text}</li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
};

export default App;
