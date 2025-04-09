import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';

const actividadesArray = [];



export default function HomeScreen({ navigation, route }) {
  const [actividades, setActividades] = useState([]);


  

  const agregarActividad = (nuevaActividad) => {
    actividadesArray.push(nuevaActividad); 
    setActividades([...actividadesArray]); 
  };





  const eliminarActividad = (index) => {
    actividadesArray.splice(index, 1); 
    setActividades([...actividadesArray]);
  };

  const editarActividad = (index) => {
    const actividad = actividades[index];
    navigation.navigate('AgregarActividad', { actividad, index });
  };






  useEffect(() => {
    if (route.params?.nuevaActividad) {
      agregarActividad(route.params.nuevaActividad);
      navigation.setParams({ nuevaActividad: null }); 
    }
  }, [route.params?.nuevaActividad]);




  return (
    <View style={styles.container}>
      {actividades.length === 0 ? (
        <Text style={styles.message}>Aún no hay registros</Text>
      ) : (
        <FlatList
          data={actividades}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.actividad}>
              <Text style={styles.actividadTexto}>{item.nombre}</Text>
              <Text style={styles.actividadTexto}>{item.categoria}</Text>
              <Text style={styles.actividadTexto}>{item.fechaEntrega}</Text>
              <View style={styles.botones}>
                <TouchableOpacity
                  style={styles.botonEditar}
                  onPress={() => editarActividad(index)}
                >
                  <Text style={styles.botonTexto}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.botonEliminar}
                  onPress={() => eliminarActividad(index)}
                >
                  <Text style={styles.botonTexto}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}




      <Button
        title="Agregar Actividad"
        onPress={() => navigation.navigate('AgregarActividad')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FAF5EF',
  },
  message: {
    fontSize: 18,
    color: '#5c5b5b',
    marginBottom: 20,
    textAlign: 'center',
  },
  actividad: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  actividadTexto: {
    fontSize: 16,
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  botonEditar: {
    backgroundColor: '#02fa0c',
    padding: 5,
    borderRadius: 5,
  },
  botonEliminar: {
    backgroundColor: '#f71a0a',
    padding: 5,
    borderRadius: 5,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 14,
  },
});