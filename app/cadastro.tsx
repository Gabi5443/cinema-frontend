import { View, Text, TextInput, StyleSheet, Pressable, ScrollView, KeyboardAvoidingView, Platform, Alert, } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';

export default function CadastroScreen() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleCpfChange = (text: string) => {
    const rawText = text.replace(/\D/g, ''); // Remove tudo que não for número
    let formattedText = rawText;

    if (rawText.length <= 11) {
      formattedText = rawText
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }

    setCpf(formattedText);
  };

  // Função simulando envio para uma API futura
  const handleCadastrar = () => {
    if (!nome || !email || !cpf || !senha) {
      // alert simples funciona tanto na Web quanto no celular
      alert('Atenção: Por favor, preencha todos os campos!');
      return;
    }

    // Objeto pronto para envio na API futuramente
    const dadosFormulario = {
      nome,
      email,
      cpf: cpf.replace(/\D/g, ''), // Limpa a pontuação para enviar apenas números
      senha,
    };

    console.log('Dados prontos para API:', dadosFormulario);
    alert('Sucesso! Cadastro realizado com sucesso!');
    router.replace('/'); // Retorna para a tela principal
  };

  return (
    <View style={styles.all}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Pressable
              style={styles.btnVoltar}
              onPress={() => router.replace('/')}
            >
              <Ionicons name="arrow-back" size={20} color="#FFF" />
              <Text style={styles.btnVoltarText}>Voltar</Text>
            </Pressable>
          </View>

          <View style={styles.container}>
            {/* Subtítulo decorativo */}
            <View style={styles.introContainer}>
              <Text style={styles.welcomeText}>Crie sua conta</Text>
              <Text style={styles.subText}>
                Crie sua conta para garantir ingressos e aproveitar o melhor do cinema!
              </Text>
            </View>

            {/* Formulário */}
            <View style={styles.form}>
              {/* Input Nome */}
              <Text style={styles.label}>Nome Completo</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Seu nome"
                  placeholderTextColor="#666"
                  value={nome}
                  onChangeText={setNome}
                />
              </View>

              {/* Input E-mail */}
              <Text style={styles.label}>E-mail</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="seuemail@exemplo.com"
                  placeholderTextColor="#666"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {/* Input CPF */}
              <Text style={styles.label}>CPF</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="card-outline" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="000.000.000-00"
                  placeholderTextColor="#666"
                  keyboardType="numeric"
                  maxLength={14}
                  value={cpf}
                  onChangeText={handleCpfChange}
                />
              </View>

              {/* Input Senha */}
              <Text style={styles.label}>Senha</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Sua senha secreta"
                  placeholderTextColor="#666"
                  secureTextEntry={!mostrarSenha}
                  value={senha}
                  onChangeText={setSenha}
                />
                <Pressable onPress={() => setMostrarSenha(!mostrarSenha)}>
                  <Ionicons
                    name={mostrarSenha ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#888"
                  />
                </Pressable>
              </View>

              {/* Botão de Envio */}
              <Pressable style={styles.btnSubmit} onPress={handleCadastrar}>
                <Text style={styles.btnSubmitText}>Concluir Cadastro</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  all: {
    flex: 1,
  },

  container: {
    width: '90%',           
    maxWidth: 700,          
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#161b26',
    borderRadius: 20,
    padding: 20,            
    borderWidth: 1,
    borderColor: '#222938',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  
  keyboardView: {
    flex: 1,
  },

  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  btnVoltar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
  },

  btnVoltarText: {
    color: '#FFF',
    marginLeft: 6,
    fontSize: 16,
  },

  introContainer: {
    marginVertical: 20,
  },

  welcomeText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  subText: {
    color: '#888',
    fontSize: 14,
    lineHeight: 20,
  },

  form: {
    marginTop: 10,
  },

  label: {
    color: '#CCC',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 14,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0d1117',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2a3245',
    paddingHorizontal: 16,
    height: 50,
  },

  inputIcon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    color: '#FFF',
    fontSize: 15,
  },

  btnSubmit: {
    backgroundColor: '#770b10',
    height: 46,             
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },

  btnSubmitText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});