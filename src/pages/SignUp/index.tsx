import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// import { Container } from './styles';

export default function SignUp({ navigation }) {
  return (
    <View>
      <Text>Sign Up</Text>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text>navigate Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}
