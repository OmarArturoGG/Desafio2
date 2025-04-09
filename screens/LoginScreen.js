import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, RefreshControl } from 'react-native';

export default function LoginScreen({ navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (email && password){
            navigation.navigate('Home');

        }else{
            alert('por favor, ingrese un correo y contraseña');
        }
    };
    



    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar sesion</Text>
            <TextInput
                style={styles.input}
                placeholder="Correo electronico"
                value={email}
                onChangeText={setEmail}
                />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                />
            <Button title="Iniciar sesion" onPress={handleLogin} />
        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#FAF5EF',
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },

    input: {
        height: 40,
        borderColor: '#7dd9f5',
    borderWidth: 1,
marginBottom: 15,
paddingHorizontal: 10,
borderRadius: 5,  
  },
});