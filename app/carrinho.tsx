import { View, Text, StyleSheet, Pressable, ScrollView, KeyboardAvoidingView, Platform, Image, } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';

export default function CarrinhoScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();

    const MODO_SIMULACAO = true;

    const filme = (params.titulo || MODO_SIMULACAO) ? {
        titulo: (params.titulo as string) || 'Batman (Simulação)',
        imagem: (params.imagem as string) || 'https://image.tmdb.org/t/p/w500/74xTEgt7R36FpoooA0A92213A3d.jpg',
        sala: (params.sala as string) || 'Sala 01 • IMAX',
        horario: (params.horario as string) || '19:00',
        preco: Number(params.preco) || 32.0,
    } : null;

    // PREÇOS BASE
    const preco_inteira = filme ? filme.preco : 32.0;
    const preco_meia = preco_inteira / 2;

    // ESTADOS
    const [assentosSelecionados, setAssentosSelecionados] = useState<string[]>([]);
    const [qtdMeia, setQtdMeia] = useState<number>(0); // Quantidade de meias-entradas
    const [formaPagamento, setFormaPagamento] = useState<'credito' | 'debito' | 'pix' | null>(null);
    const fileiras = [
        { letra: 'A', assentos: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6'] },
        { letra: 'B', assentos: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6'] },
        { letra: 'C', assentos: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'] },
        { letra: 'D', assentos: ['D1', 'D2', 'D3', 'D4', 'D5', 'D6'] },
        { letra: 'E', assentos: ['E1', 'E2', 'E3', 'E4', 'E5', 'E6'] },
    ];

    // SELEÇÃO DE ASSENTOS
    const toggleAssento = (codigoAssento: string) => {
        let novosAssentos: string[];
        if (assentosSelecionados.includes(codigoAssento)) {
            novosAssentos = assentosSelecionados.filter((a) => a !== codigoAssento);
        } else {
            novosAssentos = [...assentosSelecionados, codigoAssento];
        }

        setAssentosSelecionados(novosAssentos);

        // Ajusta as meias se o total de assentos ficar menor que a qtd de meias
        if (qtdMeia > novosAssentos.length) {
            setQtdMeia(novosAssentos.length);
        }
    };

    // CÁLCULO DE INGRESSOS E MEIAS
    const totalIngressos = assentosSelecionados.length;
    const qtdInteira = totalIngressos - qtdMeia;
    const valorTotal = qtdInteira * preco_inteira + qtdMeia * preco_meia;

    // FUNÇÕES PARA ADICIONAR/REMOVER MEIAS
    const adicionarMeia = () => {
        if (qtdMeia < totalIngressos) setQtdMeia(qtdMeia + 1);
    };

    const removerMeia = () => {
        if (qtdMeia > 0) setQtdMeia(qtdMeia - 1);
    };

    const handleFinalizarCompra = () => {
        if (totalIngressos === 0) {
            alert('Selecione pelo menos um assento para continuar!');
            return;
        }
        alert(`Sucesso! Compra de ${totalIngressos} ingresso(s) realizada!`);
        router.replace('/');
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

                    {/* CARD PRINCIPAL */}
                    <View style={styles.container}>

                        {!filme ? (
                            /* 1. MENSAGEM DE CARRINHO VAZIO */
                            <View style={{ alignItems: 'center', paddingVertical: 30 }}>
                                <Ionicons name="cart-outline" size={64} color="#888" />
                                <Text style={[styles.titulo, { marginTop: 16, textAlign: 'center' }]}>
                                    Seu carrinho está vazio
                                </Text>
                                <Text style={[styles.subTitulo, { textAlign: 'center', marginBottom: 24 }]}>
                                    Seu carrinho está vazio. Que tal escolher um filme?
                                </Text>
                                <Pressable
                                    style={styles.btnSubmit}
                                    onPress={() => router.push('/')}
                                >
                                    <Text style={styles.btnSubmitText}>Escolher um Filme</Text>
                                </Pressable>
                            </View>
                        ) : (
                            /* 2. CONTEÚDO DO CARRINHO (SÓ APARECE SE TIVER FILME) */
                            <>
                                <View style={styles.titulosContainer}>
                                    <Text style={styles.titulo}>Meu Carrinho</Text>
                                    <Text style={styles.subTitulo}>
                                        Confira os detalhes da sua sessão e escolha suas poltronas.
                                    </Text>
                                </View>

                                {/* CARD DO FILME */}
                                <View style={styles.filmeCard}>
                                    <Image
                                        source={{ uri: filme.imagem }}
                                        style={styles.poster}
                                    />
                                    <View style={styles.filmeInfo}>
                                        <Text style={styles.filmeTitulo}>{filme.titulo}</Text>
                                        <Text style={styles.detalheTexto}>
                                            <Ionicons name="film-outline" size={14} color="#888" /> {filme.sala}
                                        </Text>
                                        <Text style={styles.detalheTexto}>
                                            <Ionicons name="time-outline" size={14} color="#888" /> Hoje às {filme.horario}
                                        </Text>
                                    </View>
                                </View>

                                {/* SELEÇÃO DE ASSENTOS */}
                                <Text style={styles.labelSection}>Escolha seus assentos:</Text>

                                <View style={{ alignItems: 'center', marginBottom: 20, width: '100%' }}>
                                    <Text style={{ color: '#888', fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 6 }}>
                                        TELA
                                    </Text>
                                    <View style={{ width: '100%', height: 4, backgroundColor: '#334155', borderRadius: 2 }} />
                                </View>

                                <View style={[styles.assentosGrid, { alignItems: 'center' }]}>
                                    {fileiras.map((fileira) => (
                                        <View key={fileira.letra}
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginBottom: 8,
                                                gap: 4,
                                            }}>
                                            {/* Letra da Fileira */}
                                            <Text style={{ color: '#888', fontWeight: 'bold', width: 14, fontSize: 10,  textAlign: 'center' }}>{fileira.letra}</Text>

                                            {/* Botoes dos Assentos da Fileira */}
                                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
                                                {fileira.assentos.map((assento) => {
                                                    const estaSelecionado = assentosSelecionados.includes(assento);
                                                    return (
                                                        <Pressable
                                                            key={assento}
                                                            style={[
                                                                styles.assentoBtn,
                                                                estaSelecionado && styles.assentoBtnSelecionado,
                                                            ]}
                                                            onPress={() => toggleAssento(assento)}
                                                        >
                                                            <Ionicons
                                                                name="easel-outline"
                                                                size={14}
                                                                color={estaSelecionado ? '#FFF' : '#888'}
                                                            />
                                                            <Text
                                                                style={[
                                                                    styles.assentoTexto,
                                                                    estaSelecionado && styles.assentoTextoSelecionado,
                                                                ]}
                                                            >
                                                                {assento}
                                                            </Text>
                                                        </Pressable>
                                                    );
                                                })}
                                            </View>
                                        </View>
                                    ))}
                                </View>

                                {/* SELEÇÃO DE TIPO DE INGRESSO (INTEIRA / MEIA) */}
                                {totalIngressos > 0 && (
                                    <View style={styles.tipoIngressoContainer}>
                                        <Text style={styles.labelSection}>Tipo de Ingresso:</Text>
                                        <View style={styles.contadorLinha}>
                                            <View>
                                                <Text style={styles.tipoTexto}>Meia-Entrada (Estudante)</Text>
                                                <Text style={styles.subTipoTexto}>
                                                    R$ {preco_meia.toFixed(2).replace('.', ',')} cada
                                                </Text>
                                            </View>
                                            <View style={styles.contadorControles}>
                                                <Pressable
                                                    style={styles.btnContador}
                                                    onPress={removerMeia}
                                                    disabled={qtdMeia === 0}
                                                >
                                                    <Text style={styles.btnContadorTexto}>-</Text>
                                                </Pressable>
                                                <Text style={styles.qtdTexto}>{qtdMeia}</Text>
                                                <Pressable
                                                    style={styles.btnContador}
                                                    onPress={adicionarMeia}
                                                    disabled={qtdMeia === totalIngressos}
                                                >
                                                    <Text style={styles.btnContadorTexto}>+</Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                    </View>
                                )}

                                {/* RESUMO FINANCEIRO */}
                                <View style={styles.resumoContainer}>
                                    <View style={styles.resumoLinha}>
                                        <Text style={styles.resumoRotulo}>Assentos:</Text>
                                        <Text style={styles.resumoValor}>
                                            {assentosSelecionados.length > 0
                                                ? assentosSelecionados.join(', ')
                                                : 'Nenhum'}
                                        </Text>
                                    </View>

                                    <View style={styles.resumoLinha}>
                                        <Text style={styles.resumoRotulo}>Ingressos Inteira:</Text>
                                        <Text style={styles.resumoValor}>
                                            {qtdInteira}x (R$ {preco_inteira.toFixed(2).replace('.', ',')})
                                        </Text>
                                    </View>

                                    {qtdMeia > 0 && (
                                        <View style={styles.resumoLinha}>
                                            <Text style={styles.resumoRotulo}>Ingressos Meia:</Text>
                                            <Text style={styles.resumoValor}>
                                                {qtdMeia}x (R$ {preco_meia.toFixed(2).replace('.', ',')})
                                            </Text>
                                        </View>
                                    )}

                                    <View style={[styles.resumoLinha, styles.divisor]}>
                                        <Text style={styles.totalRotulo}>Valor Total:</Text>
                                        <Text style={styles.totalValor}>
                                            R$ {valorTotal.toFixed(2).replace('.', ',')}
                                        </Text>
                                    </View>
                                </View>

                                {/* SELEÇÃO DE FORMA DE PAGAMENTO */}
                                {totalIngressos > 0 && (
                                    <View style={styles.pagamentoContainer}>
                                        <Text style={styles.labelSection}>Forma de Pagamento:</Text>
                                        <View style={styles.pagamentoOpcoes}>

                                            {/* Opção Cartão de Crédito */}
                                            <Pressable
                                                style={[
                                                    styles.pagamentoOption,
                                                    formaPagamento === 'credito' && styles.pagamentoOptionSelected
                                                ]}
                                                onPress={() => setFormaPagamento('credito')}
                                            >
                                                <Ionicons
                                                    name="card-outline"
                                                    size={20}
                                                    color={formaPagamento === 'credito' ? '#FFF' : '#888'}
                                                />
                                                <Text style={[
                                                    styles.pagamentoOptionText,
                                                    formaPagamento === 'credito' && styles.pagamentoOptionTextSelected
                                                ]}>Crédito</Text>
                                            </Pressable>

                                            {/* Opção Cartão de Débito */}
                                            <Pressable
                                                style={[
                                                    styles.pagamentoOption,
                                                    formaPagamento === 'debito' && styles.pagamentoOptionSelected
                                                ]}
                                                onPress={() => setFormaPagamento('debito')}
                                            >
                                                <Ionicons
                                                    name="card-outline"
                                                    size={20}
                                                    color={formaPagamento === 'debito' ? '#FFF' : '#888'}
                                                />
                                                <Text style={[
                                                    styles.pagamentoOptionText,
                                                    formaPagamento === 'debito' && styles.pagamentoOptionTextSelected
                                                ]}>Débito</Text>
                                            </Pressable>

                                            {/* Opção PIX */}
                                            <Pressable
                                                style={[
                                                    styles.pagamentoOption,
                                                    formaPagamento === 'pix' && styles.pagamentoOptionSelected
                                                ]}
                                                onPress={() => setFormaPagamento('pix')}
                                            >
                                                <Ionicons
                                                    name="qr-code-outline"
                                                    size={20}
                                                    color={formaPagamento === 'pix' ? '#FFF' : '#888'}
                                                />
                                                <Text style={[
                                                    styles.pagamentoOptionText,
                                                    formaPagamento === 'pix' && styles.pagamentoOptionTextSelected
                                                ]}>PIX</Text>
                                            </Pressable>

                                        </View>
                                    </View>
                                )}

                                {/* Valida se tem assentos E forma de pagamento selecionada */}
                                <Pressable
                                    style={[
                                        styles.btnSubmit,
                                        (!formaPagamento || totalIngressos === 0) && styles.btnDisabled,
                                    ]}
                                    onPress={handleFinalizarCompra}
                                    disabled={!formaPagamento || totalIngressos === 0}
                                >
                                    <Text style={styles.btnSubmitText}>
                                        {totalIngressos === 0
                                            ? 'Selecione um assento'
                                            : !formaPagamento
                                                ? 'Escolha a forma de pagamento'
                                                : 'Finalizar Compra'
                                        }
                                    </Text>
                                </Pressable>
                            </>
                        )}

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
    },

    btnVoltarText: {
        color: '#FFF',
        marginLeft: 6,
        fontSize: 16,
    },

    container: {
        width: '100%',
        maxWidth: 600,
        alignSelf: 'center',
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
    titulosContainer: {
        marginBottom: 16,
    },
    titulo: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    subTitulo: {
        color: '#888',
        fontSize: 13,
        lineHeight: 18,
    },
    filmeCard: {
        flexDirection: 'row',
        backgroundColor: '#0d1117',
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: '#2a3245',
        marginBottom: 20,
    },
    poster: {
        width: 60,
        height: 85,
        borderRadius: 8,
        backgroundColor: '#222938',
    },
    filmeInfo: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'center',
    },
    filmeTitulo: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    detalheTexto: {
        color: '#AAA',
        fontSize: 12,
        marginBottom: 2,
    },
    labelSection: {
        color: '#CCC',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 12,
    },
    assentosGrid: {
        width: '85%',
        alignSelf: 'center',
        marginBottom: 20,
    },
    assentoBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0d1117',
        borderWidth: 1,
        borderColor: '#2a3245',
        borderRadius: 6,
        paddingVertical: 4,
        paddingHorizontal: 4,
    },
    assentoBtnSelecionado: {
        backgroundColor: '#770b10',
        borderColor: '#770b10',
    },
    assentoTexto: {
        color: '#888',
        fontSize: 13,
        marginLeft: 6,
        fontWeight: 'bold',
    },
    assentoTextoSelecionado: {
        color: '#FFF',
    },
    tipoIngressoContainer: {
        backgroundColor: '#0d1117',
        borderRadius: 12,
        padding: 14,
        borderWidth: 1,
        borderColor: '#2a3245',
        marginBottom: 20,
    },
    contadorLinha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tipoTexto: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
    },
    subTipoTexto: {
        color: '#888',
        fontSize: 12,
    },
    contadorControles: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    btnContador: {
        backgroundColor: '#222938',
        width: 25,
        height: 25,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnContadorTexto: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    qtdTexto: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
    },
    resumoContainer: {
        backgroundColor: '#0d1117',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#2a3245',
        marginBottom: 20,
    },
    resumoLinha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    resumoRotulo: {
        color: '#888',
        fontSize: 13,
    },
    resumoValor: {
        color: '#FFF',
        fontSize: 13,
        fontWeight: '600',
    },
    divisor: {
        borderTopWidth: 1,
        borderTopColor: '#2a3245',
        paddingTop: 10,
        marginTop: 4,
        marginBottom: 0,
    },
    totalRotulo: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
    },
    totalValor: {
        color: '#4CAF50',
        fontSize: 18,
        fontWeight: 'bold',
    },

    pagamentoContainer: {
        marginBottom: 20,
    },
    pagamentoOpcoes: {
        flexDirection: 'row',
        gap: 10,
    },
    pagamentoOption: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 8,
        backgroundColor: '#0d1117',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#2a3245',
        gap: 6,
    },
    pagamentoOptionSelected: {
        backgroundColor: '#770b10',
        borderColor: '#770b10',
    },
    pagamentoOptionText: {
        color: '#888',
        fontSize: 12,
        fontWeight: '600',
    },
    pagamentoOptionTextSelected: {
        color: '#FFF',
    },

    btnSubmit: {
        backgroundColor: '#770b10',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnDisabled: {
        backgroundColor: '#333',
        opacity: 0.6,
    },
    btnSubmitText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
})
