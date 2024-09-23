import { View, Text } from 'react-native'
import { useAuth } from '../../../contexts/AuthContext';

export default function index() {
  const { setUser, user } = useAuth();


  return (
    <View>
      <Text>{ user && user.name }</Text>
    </View>
  )
}