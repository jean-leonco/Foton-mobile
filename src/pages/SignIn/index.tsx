import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// import { Container } from './styles';

export default function SignIn({ navigation }) {
  return (
    <View>
      <Text>Sign In</Text>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text>navigate Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
