import { Feather, Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useCarrinho } from '../context/ContextCarrinho';
import { PRODUTOS } from '../data/produtos';

const { width } = Dimensions.get('window');

export default function DetalhesProduto() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { countCarrinho, addAoCarrinho } = useCarrinho();

  const [isFavorito, setIsFavorito] = useState(false);
  const [mostrarDescricao, setMostrarDescricao] = useState(false);
  
  const produto = PRODUTOS.find(item => item.id === id);

  if (!produto) {
    return (
      <View style={styles.errorContainer}>
        <Text>Produto não encontrado.</Text>
      </View>
    );
  }

  const economias = produto.precoOriginal 
    ? (produto.precoOriginal - produto.preco).toFixed(2).replace('.', ',') 
    : null;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => router.push('/carrinho')}>
                <Feather name="shopping-bag" size={24} color="#333" />
                {countCarrinho > 0 && (
                <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{countCarrinho}</Text>
                </View>
                )}
           </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.imageContainer}>
          <Image source={ produto.imagem } style={styles.productImage} resizeMode="contain" />
          <View style={styles.pagination}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
          </View>
        </View>

        {produto.avaliacao && (
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingValue}>{produto.avaliacao.toFixed(1)}</Text>
          </View>
        )}

        <Text style={styles.productTitle}>{produto.nome}</Text>

        <Text style={styles.productCode}>Cód. {produto.id}</Text>

        {produto.tags && (
          <View style={styles.tagsContainer}>
            {produto.tags.map((tag, index) => (
              <View key={index} style={styles.tagBadge}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.priceSectionTop}>
           <View style={styles.priceRow}>
             {produto.precoOriginal && (
               <Text style={styles.oldPrice}>R$ {produto.precoOriginal.toFixed(2).replace('.', ',')}</Text>
             )}
             <Text style={styles.currentPrice}>R$ {produto.preco.toFixed(2).replace('.', ',')}</Text>
             
             {economias && (
                <View style={styles.savingsBadgeInline}>
                    <Text style={styles.savingsTextInline}>economize R$ {economias}</Text>
                </View>
             )}
           </View>
        </View>

        <View style={styles.actionsRow}>
           <View style={{ flex: 1 }} /> 
           
           <TouchableOpacity 
             style={styles.actionButton} 
             onPress={() => setIsFavorito(!isFavorito)}
           >
             <Ionicons 
                name={isFavorito ? "heart" : "heart-outline"} 
                size={24} 
                color={isFavorito ? "#f48746" : "#333"}
             />
           </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
            style={styles.accordionHeader} 
            onPress={() => setMostrarDescricao(!mostrarDescricao)}
        >
            <Text style={styles.accordionTitle}>descrição</Text>
            <Feather 
                name={mostrarDescricao ? "chevron-up" : "chevron-down"} 
                size={20} 
                color="#333" 
            />
        </TouchableOpacity>

        {mostrarDescricao && (
            <View style={styles.accordionContent}>
                <Text style={styles.productDescription}>{produto.descricao}</Text>
            </View>
        )}

        <View style={styles.separator} />

      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerPriceContainer}>
             <Text style={styles.footerPriceLabel}>R$ {produto.preco.toFixed(2).replace('.', ',')}</Text>
        </View>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => {
            addAoCarrinho(produto);
            alert('Produto adicionado à sacola!');
          }}
        >
          <Text style={styles.addButtonText}>adicionar</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', marginTop: StatusBar.currentHeight || 0 },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, height: 50, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  scrollContent: { paddingBottom: 100 },

  cartBadge: { position: 'absolute', top: -5, right: -5, backgroundColor: '#F47920', borderRadius: 10, width: 16, height: 16, justifyContent: 'center', alignItems: 'center' },
  cartBadgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  
  imageContainer: { width: width, height: 350, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9', marginBottom: 20 },
  productImage: { width: '80%', height: '80%' },
  pagination: { flexDirection: 'row', position: 'absolute', bottom: 20 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ccc', marginHorizontal: 4 },
  activeDot: { backgroundColor: '#666' },

  ratingRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginBottom: 8 },
  ratingValue: { fontSize: 14, fontWeight: 'bold', marginLeft: 4, color: '#333' },
  ratingLink: { fontSize: 14, color: '#0070BA', marginLeft: 8, textDecorationLine: 'underline' },
  promoTagContainer: { backgroundColor: '#F8E1D6', alignSelf: 'flex-start', marginLeft: 16, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, marginBottom: 10 },
  promoTagText: { fontSize: 12, fontWeight: 'bold', color: '#333' },
  productTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', paddingHorizontal: 16, marginBottom: 8 },
  
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, marginBottom: 12, gap: 8 },
  tagBadge: { 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 20, 
    borderWidth: 1, 
    borderColor: '#ccc',
    backgroundColor: '#fff' 
  },
  tagText: { fontSize: 12, color: '#666' },

  priceSectionTop: { paddingHorizontal: 16, marginBottom: 16 },
  priceRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 10 },
  oldPrice: { fontSize: 16, color: '#999', textDecorationLine: 'line-through' },
  currentPrice: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  savingsBadgeInline: { backgroundColor: '#f48746', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  savingsTextInline: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },

  actionsRow: { flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 16, marginBottom: 10, gap: 15 },
  actionButton: { padding: 8, borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 50, alignItems: 'center', justifyContent:'center' },

  separator: { height: 1, backgroundColor: '#f0f0f0', marginHorizontal: 16, marginVertical: 10 },
  productCode: { fontSize: 12, color: '#999', paddingHorizontal: 16, marginBottom: 10 },
  
  accordionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 15 },
  accordionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  accordionContent: { paddingHorizontal: 16, paddingBottom: 15 },
  productDescription: { fontSize: 14, color: '#666', lineHeight: 22 },

  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', padding: 16, borderTopWidth: 1, borderTopColor: '#f0f0f0', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  footerPriceContainer: { flexDirection: 'column' },
  footerPriceLabel: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  addButton: { backgroundColor: '#f48746', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25 },
  addButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});