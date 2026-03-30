import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { produtos } from '../data/produtos';
import { Image } from 'react-native';

export default function Loja() {

  const [carrinho, setCarrinho] = useState([]);

  function adicionar(produto) {
    let novoCarrinho = [...carrinho];

    let existe = novoCarrinho.find(item => item.id === produto.id);

    if (existe) {
      existe.quantidade += 1;
    } else {
      novoCarrinho.push({ ...produto, quantidade: 1 });
    }

    setCarrinho(novoCarrinho);

    router.push({
      pathname: '/carrinho',
      params: { carrinho: JSON.stringify(novoCarrinho) }
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Produtos em Destaque</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {produtos.map((p) => (
          <View key={p.id} style={styles.card}>
  
            <Image 
              source={{ uri: p.imagem }} 
              style={styles.imagem}
            />

            <Text style={styles.nome}>{p.titulo}</Text>

            <Text style={styles.preco}>R$ {p.preco}</Text>

            <TouchableOpacity 
              style={styles.botao}
              onPress={() => adicionar(p)}
            >
              <Text style={styles.textoBotao}>Comprar</Text>
            </TouchableOpacity>

          </View>
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={styles.botaoIrCarrinho}
        onPress={() => {
          router.push({
            pathname: '/carrinho',
            params: { carrinho: JSON.stringify(carrinho) }
          });
        }}
      >
        <Text style={{color: 'white', textAlign: 'center'}}>
          Ir para o Carrinho
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  botaoIrCarrinho: { backgroundColor: 'green', padding: 15, marginTop: 30, borderRadius: 10 },

  card: {
  backgroundColor: '#fff',
  padding: 15,
  borderRadius: 15,
  marginRight: 15,
  width: 180,
  elevation: 4
},

imagem: {
  width: '100%',
  height: 120,
  borderRadius: 10,
  marginBottom: 10
},

nome: {
  fontSize: 16,
  fontWeight: 'bold'
},

preco: {
  fontSize: 16,
  color: 'green',
  marginVertical: 5,
  fontWeight: 'bold'
},

botao: {
  backgroundColor: '#007bff',
  padding: 10,
  borderRadius: 8,
  alignItems: 'center',
  marginTop: 10
},

textoBotao: {
  color: '#fff',
  fontWeight: 'bold'
}
});