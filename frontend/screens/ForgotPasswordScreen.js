import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { requestPasswordReset } from '../services/authService';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetRequest = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    setIsLoading(true);
    try {
      await requestPasswordReset(email);
      Alert.alert(
        'Email Sent',
        'Check your email for password reset instructions',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>Enter your email to receive reset instructions</Text>
      
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <Button
        title={isLoading ? "Sending..." : "Send Reset Link"}
        onPress={handleResetRequest}
        disabled={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 16, marginBottom: 20, textAlign: 'center', color: '#666' },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    marginBottom: 15, 
    padding: 12,
    borderRadius: 8,
  },
});