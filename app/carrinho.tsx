import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Image } from 'react-native';

export default function Carrinho() {

  const params = useLocalSearchParams();

  let dados = [];

  try {
    if (typeof params.carrinho === 'string') {
      dados = JSON.parse(params.carrinho);
    }
  } catch (e) {
    console.log("Erro:", e);
  }

  const [carrinho, setCarrinho] = useState(dados);

  function aumentar(id) {
    let novo = carrinho.map(item =>
      item.id === id
        ? { ...item, quantidade: item.quantidade + 1 }
        : item
    );
    setCarrinho(novo);
  }

  function diminuir(id) {
    let novo = carrinho.map(item =>
      item.id === id && item.quantidade > 1
        ? { ...item, quantidade: item.quantidade - 1 }
        : item
    );
    setCarrinho(novo);
  }

  function remover(id) {
    let novo = carrinho.filter(item => item.id !== id);
    setCarrinho(novo);
  }

  function total() {
    return carrinho.reduce((soma, item) =>
      soma + item.preco * item.quantidade, 0
    ).toFixed(2);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meu Carrinho</Text>

      <ScrollView>
        {carrinho.length === 0 ? (
          <Text style={styles.vazio}>Seu carrinho está vazio</Text>
        ) : (
          carrinho.map(item => (
            <View key={item.id} style={styles.card}>
  
              <View style={styles.linhaProduto}>
                <Image 
                  source={{ uri: item.imagem }} 
                  style={styles.imagem}
                />

                <View style={{ flex: 1 }}>
                  <Text style={styles.nome}>{item.titulo}</Text>
                  <Text style={styles.preco}>R$ {item.preco}</Text>
                </View>
              </View>

              <View style={styles.linha}>
                <TouchableOpacity 
                  style={styles.botaoQtd} 
                  onPress={() => diminuir(item.id)}
                >
                  <Text style={styles.textoBotao}>-</Text>
                </TouchableOpacity>

                <Text style={styles.qtd}>{item.quantidade}</Text>

                <TouchableOpacity 
                  style={styles.botaoQtd} 
                  onPress={() => aumentar(item.id)}
                >
                  <Text style={styles.textoBotao}>+</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity 
                style={styles.botaoRemover} 
                onPress={() => remover(item.id)}
              >
                <Text style={{ color: 'white' }}>Remover</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.total}>Total: R$ {total()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#f5f5f5' 
  },

  titulo: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20 
  },

  vazio: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: 'gray'
  },

  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3
  },

  nome: {
    fontSize: 16,
    fontWeight: 'bold'
  },

  preco: {
    color: 'green',
    marginTop: 5
  },

  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },

  botaoQtd: {
    backgroundColor: '#ddd',
    padding: 8,
    borderRadius: 5
  },

  textoBotao: {
    fontSize: 16,
    fontWeight: 'bold'
  },

  qtd: {
    marginHorizontal: 10,
    fontSize: 16
  },

  botaoRemover: {
    backgroundColor: 'red',
    marginTop: 10,
    padding: 8,
    borderRadius: 5,
    alignItems: 'center'
  },

  footer: {
    marginTop: 10,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10
  },

  total: {
    fontSize: 18,
    fontWeight: 'bold'
  },

  linhaProduto: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10
  },

  imagem: {
    width: 60,
    height: 60,
    borderRadius: 10
  },
});