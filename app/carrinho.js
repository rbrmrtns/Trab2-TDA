import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
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

export default function Carrinho() {
  const router = useRouter();
  const { itensCarrinho, removerDoCarrinho, attQuantidade, valorTotal, totalSalvo, countCarrinho } = useCarrinho();
  const [isResumoVisivel, setResumoVisivel] = useState(false);

  const renderItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <View style={styles.itemHeaderRow}>
        <Image 
          source={ item.imagem } 
          style={styles.itemImage} 
          resizeMode="contain" 
        />
        
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle} numberOfLines={2}>{item.nome}</Text>
          
          <TouchableOpacity onPress={() => removerDoCarrinho(item.id)} style={styles.trashIcon}>
            <Feather name="trash-2" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.itemControlsRow}>
        <View style={styles.quantitySelector}>
          <TouchableOpacity onPress={() => attQuantidade(item.id, 'diminuir')} style={styles.qtdBtn}>
            <Feather name="minus" size={16} color="#333" />
          </TouchableOpacity>
          
          <Text style={styles.quantityText}>{item.quant}</Text>
          
          <TouchableOpacity onPress={() => attQuantidade(item.id, 'aumentar')} style={styles.qtdBtn}>
            <Feather name="plus" size={16} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.priceColumn}>
          {item.precoOriginal && (
            <Text style={styles.itemOriginalPrice}>
              R$ {item.precoOriginal.toFixed(2).replace('.', ',')}
            </Text>
          )}
          <View style={styles.priceBadgeRow}>
            <Text style={styles.itemCurrentPrice}>
              R$ {item.preco.toFixed(2).replace('.', ',')}
            </Text>
            {item.desconto && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{item.desconto}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
      
      <View style={styles.separator} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>minha sacola</Text>
        <Text>
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.listHeader}>
          <Text style={styles.listHeaderText}>
            {countCarrinho} produtos
          </Text>
        </View>

        <View>
          {itensCarrinho.map((item) => (
            <React.Fragment key={item.id}>
              {renderItem({ item })}
            </React.Fragment>
          ))}
        </View>
      </ScrollView>

        <View style={styles.footerWrapper}>
        
        <TouchableOpacity 
            style={styles.summaryToggle} 
            onPress={() => setResumoVisivel(!isResumoVisivel)}
          >
            <Text style={styles.summaryToggleText}>
              {isResumoVisivel ? 'ocultar resumo' : 'exibir resumo'}
            </Text>
            <Feather 
              name={isResumoVisivel ? "chevron-down" : "chevron-up"} 
              size={20} 
              color="#666" 
            />
        </TouchableOpacity>

        {isResumoVisivel && (
            <View style={styles.summaryDetails}>
              <Text style={styles.summaryTitle}>resumo do pedido</Text>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{countCarrinho} produtos</Text>
                <Text style={styles.summaryValue}>
                  R$ {(valorTotal + totalSalvo).toFixed(2).replace('.', ',')}
                </Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { color: '#2E7D32' }]}>descontos</Text>
                <Text style={[styles.summaryValue, { color: '#2E7D32' }]}>
                  -R$ {totalSalvo.toFixed(2).replace('.', ',')}
                </Text>
              </View>
              
              <View style={[styles.summaryRow, styles.subtotalRow]}>
                <Text style={styles.subtotalLabel}>subtotal</Text>
                <Text style={styles.subtotalValue}>
                  R$ {valorTotal.toFixed(2).replace('.', ',')}
                </Text>
              </View>
            </View>
          )}

        <View style={styles.checkoutSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>total</Text>
            <View style={styles.totalValueColumn}>
              <Text style={styles.totalValue}>
                R$ {valorTotal.toFixed(2).replace('.', ',')}
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.checkoutButton} onPress={() => alert('Compra Finalizada!')}>
            <Text style={styles.checkoutButtonText}>finalizar a compra</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', marginTop: StatusBar.currentHeight || 0 },
  scrollContent: { paddingBottom: 300 }, 
  
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, height: 56, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  headerTitle: { fontSize: 18, color: '#666', fontWeight: '500' },
  
  listHeader: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  listHeaderText: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  
  cartItemContainer: { padding: 16, backgroundColor: '#fff' },
  itemHeaderRow: { flexDirection: 'row', marginBottom: 10 },
  itemImage: { width: 60, height: 60, marginRight: 10, backgroundColor: '#f9f9f9', borderRadius: 4 },
  itemInfo: { flex: 1, flexDirection: 'row', justifyContent: 'space-between' },
  itemTitle: { flex: 1, fontSize: 14, color: '#333', marginRight: 10 },
  trashIcon: { padding: 5 },
  
  itemControlsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 70 },
  
  quantitySelector: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 4 },
  qtdBtn: { paddingHorizontal: 10, paddingVertical: 5 },
  quantityText: { fontSize: 14, fontWeight: 'bold', color: '#333', minWidth: 20, textAlign: 'center' },
  
  priceColumn: { alignItems: 'flex-end' },
  itemOriginalPrice: { fontSize: 12, color: '#999', textDecorationLine: 'line-through' },
  priceBadgeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  itemCurrentPrice: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  discountBadge: { backgroundColor: '#E8F5E9', paddingHorizontal: 4, paddingVertical: 2, borderRadius: 4 },
  discountText: { fontSize: 10, color: '#2E7D32', fontWeight: 'bold' },
  separator: { height: 1, backgroundColor: '#f0f0f0', marginTop: 16 },

  footerWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },

  summaryToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
    gap: 5,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginTop: -15,
    alignSelf: 'center',
    width: '100%'
  },
  summaryToggleText: { fontSize: 14, color: '#666', fontWeight: '500' },

  summaryDetails: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  summaryTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryLabel: { fontSize: 14, color: '#666' },
  summaryValue: { fontSize: 14, color: '#333', fontWeight: '500' },
  subtotalRow: { marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  subtotalLabel: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  subtotalValue: { fontSize: 16, fontWeight: 'bold', color: '#333' },

  checkoutSection: {
    padding: 16,
    backgroundColor: '#fff',
  },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  totalLabel: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  totalValueColumn: { alignItems: 'flex-end' },
  totalValue: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  installmentText: { fontSize: 12, color: '#666', marginTop: 2 },
  checkoutButton: { backgroundColor: '#F47920', borderRadius: 30, paddingVertical: 14, alignItems: 'center' },
  checkoutButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});