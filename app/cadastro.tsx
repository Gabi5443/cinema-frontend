import { View, Text, TextInput, StyleSheet, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function CadastroScreen() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [descricao, setDescricao] = useState('');

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

  const handleCepChange = (text: string) => {
    const rawText = text.replace(/\D/g, '');
    let formattedText = rawText;

    if (rawText.length <= 8) {
      formattedText = rawText.replace(/(\d{5})(\d{1,3})$/, '$1-$2');
    }

    setCep(formattedText);
  };

  // Função simulando envio para uma API futura
  const handleCadastrar = () => {
    if (!nome || !email || !cpf || !senha || !cep || !rua || !numero || !bairro || !cidade) {
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
      endereco: {
        cep: cep.replace(/\D/g, ''),
        rua,
        numero,
        bairro,
        cidade,
        descricao,
      },
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
              onPress={() => router.dismissAll()}
            >
              <Ionicons name="arrow-back" size={20} color="#FFF" />
              <Text style={styles.btnVoltarText}>Voltar</Text>
            </Pressable>
          </View>

          <View style={styles.container}>
            <View style={styles.titulosContainer}>
              <Text style={styles.titulo}>Crie sua conta</Text>
              <Text style={styles.subTitulo}>
                Crie sua conta para garantir ingressos e aproveitar o melhor do cinema!
              </Text>
            </View>

            <View style={styles.form}>
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

              <Text style={styles.label}>Senha</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Sua senha"
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

              <Text style={styles.infoAddress}>
                Onde você está? Mostramos os cinemas mais pertinho de você!
              </Text>

              <Text style={styles.label}>Bairro</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="map-outline" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Seu bairro"
                  placeholderTextColor="#666"
                  value={bairro}
                  onChangeText={setBairro}
                />
              </View>

              <Text style={styles.label}>Rua</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="navigate-outline" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Nome da sua rua"
                  placeholderTextColor="#666"
                  value={rua}
                  onChangeText={setRua}
                />
              </View>

              <View style={styles.row}>
                <View style={[styles.flex1, { marginRight: 2 }]}>
                  <Text style={styles.label}>Número</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="home-outline" size={20} color="#888" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="123"
                      placeholderTextColor="#666"
                      keyboardType="numeric"
                      maxLength={5}
                      value={numero}
                      onChangeText={setNumero}
                    />
                  </View>
                </View>

                <View style={styles.flex2}>
                  <Text style={styles.label}>CEP</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="location-outline" size={20} color="#888" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="00000-000"
                      placeholderTextColor="#666"
                      keyboardType="numeric"
                      maxLength={9}
                      value={cep}
                      onChangeText={handleCepChange}
                    />
                  </View>
                </View>
              </View>

              <Text style={styles.label}>Cidade</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="business-outline" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Sua cidade"
                  placeholderTextColor="#666"
                  value={cidade}
                  onChangeText={setCidade}
                />
              </View>

              <Text style={styles.label}>Descrição / Complemento</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="document-text-outline" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Apt, Bloco, Ponto de referência..."
                  placeholderTextColor="#666"
                  value={descricao}
                  onChangeText={setDescricao}
                />
              </View>

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
    paddingHorizontal: 20,
    paddingTop: 20,
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

  titulosContainer: {
    marginVertical: 20,
  },

  titulo: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  subTitulo: {
    color: '#888',
    fontSize: 14,
    lineHeight: 20,
  },

  infoAddress: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
    paddingVertical: 20,
  },

  form: {
    marginTop: 0,
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
    paddingHorizontal: 10,
    height: 50,
  },

  inputIcon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    color: '#FFF',
    fontSize: 15,
    outlineStyle: 'none' as any,
  },

  row: {
    flexDirection: 'row',
  },

  flex1: {
    flex: 1,
  },

  flex2: {
    flex: 2,
  },

  btnSubmit: {
    backgroundColor: '#770b10',
    height: 46,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    outlineStyle: 'none' as any,
  },

  btnSubmitText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});