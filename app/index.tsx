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
              style={{ width: 100, height: 100, borderRadius: 10 }}
            />
            
            <Text>{p.titulo}</Text>
            <Text>R$ {p.preco}</Text>

            <TouchableOpacity onPress={() => adicionar(p)}>
              <Text>Comprar</Text>
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
  card: { padding: 20, borderWidth: 1, marginRight: 10, borderRadius: 10, width: 150 },
  botao: { backgroundColor: 'blue', padding: 10, marginTop: 10, borderRadius: 5 },
  botaoIrCarrinho: { backgroundColor: 'green', padding: 15, marginTop: 30, borderRadius: 10 }
});