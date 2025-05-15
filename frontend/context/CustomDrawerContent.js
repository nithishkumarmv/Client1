import React, { useEffect, useState } from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../services/authService';

export default function CustomDrawerContent({ navigation, onLogout, ...props }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error loading user:', error);
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      await AsyncStorage.removeItem('user');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
      if (onLogout) {
        onLogout();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to logout');
      console.error('Logout error:', error);
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading user data...</Text>
      </View>
    );
  }

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollView}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hello, {user.name}</Text>
      </View>

      <Text style={styles.sectionTitle}>Trending</Text>
      <DrawerItem label="MB Creative 300g" onPress={() => {}} />
      <DrawerItem label="MB Whey Protein 1kg" onPress={() => {}} />
      <DrawerItem label="Fist tablet" onPress={() => {}} />

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>Protein and Nutrition</Text>
      <DrawerItem label="Creative" onPress={() => {}} />
      <DrawerItem label="Whey Protein" onPress={() => {}} />

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>Shop by Category</Text>
      <DrawerItem label="Homemade product" onPress={() => {}} />
      <DrawerItem label="Health Product" onPress={() => {}} />

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>Setting and Profile</Text>
      <DrawerItem label="Profile" onPress={() => navigation.navigate('Profile')} />
      <DrawerItem 
        label="Logout" 
        onPress={handleLogout}
        labelStyle={{ color: 'red' }}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollView: {
    flexGrow: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#232f3e',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionTitle: {
    marginLeft: 16,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
    marginHorizontal: 16,
  },
});