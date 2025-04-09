import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default function AgregarActividadScreen({ navigation, route }) {
  const [nombreActividad, setNombreActividad] = useState('');
  const [categoria, setCategoria] = useState('');
  const [equipo, setEquipo] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [index, setIndex] = useState(null);





  useEffect(() => {
    if (route.params?.actividad) {
      const { actividad, index } = route.params;
      setNombreActividad(actividad.nombre);
      setCategoria(actividad.categoria);
      setEquipo(actividad.equipo);
      setFechaEntrega(actividad.fechaEntrega);
      setIndex(index);
    }
  }, [route.params]);






  const handleAgregarActividad = () => {
    const fechaRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;




    if (!fechaRegex.test(fechaEntrega)) {
      alert('fecha solo asi 👉 (YYYY-MM-DD HH:MM)');
      return;
    }

    if (nombreActividad && categoria && fechaEntrega) {
      const nuevaActividad = {
        nombre: nombreActividad,
        categoria,
        equipo,
        fechaEntrega,
      };
      navigation.navigate('Home', { nuevaActividad }); 
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  };





  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {index !== null ? 'Editar Actividad' : 'Registrar Actividad'}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la actividad"
        value={nombreActividad}
        onChangeText={setNombreActividad}
      />
      <TextInput
        style={styles.input}
        placeholder="Materia"
        value={categoria}
        onChangeText={setCategoria}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre del equipo"
        value={equipo}
        onChangeText={setEquipo}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha y hora de entrega (puede ser 2025-04-10 14:00)"
        value={fechaEntrega}
        onChangeText={setFechaEntrega}
      />
      <Button
        title={index !== null ? 'Guardar Cambios' : 'Registrar Actividad'}
        onPress={handleAgregarActividad}
      />
    </View>
  );
}

export function HomeScreen({ navigation, route }) {
  const [actividades, setActividades] = useState([]);

  const agregarActividad = (nuevaActividad) => {
    setActividades((prevActividades) => [...prevActividades, nuevaActividad]); 
  };

  const eliminarActividad = (index) => {
    setActividades((prevActividades) => {
      const nuevasActividades = [...prevActividades];
      nuevasActividades.splice(index, 1);
      return nuevasActividades;
    });
  };

  const editarActividad = (index) => {
    const actividad = actividades[index];
    navigation.navigate('AgregarActividad', { actividad, index });
  };

  useEffect(() => {
    if (route.params?.nuevaActividad) {
      setActividades((prevActividades) => [...prevActividades, route.params.nuevaActividad]);
      navigation.setParams({ nuevaActividad: null }); 
    }
  }, [route.params?.nuevaActividad]);

  return (
    <View style={styles.container}>
      {actividades.length === 0 ? (
        <Text style={styles.message}>aun no hay registros</Text>
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