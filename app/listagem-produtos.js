import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CartaoProduto from '../components/CartaoProduto';
import { useCarrinho } from '../context/ContextCarrinho';
import { PRODUTOS } from '../data/produtos';

export default function ListagemProdutos() {
  const router = useRouter();
  const { countCarrinho } = useCarrinho();

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.topBar}>
        <Text style={styles.headerTitle}>produtos</Text>
        <View style={styles.headerIcons}>
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
      
      <View style={styles.resultsRow}>
        <Text style={styles.resultText}>{PRODUTOS.length} resultados</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      {renderHeader()}
      <FlatList
        data={PRODUTOS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartaoProduto item={item} />}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', marginTop: StatusBar.currentHeight || 0 },
  headerContainer: { paddingHorizontal: 16, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 50 },
  headerTitle: { fontSize: 18, fontWeight: '500', color: '#666' },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  cartBadge: { position: 'absolute', top: -5, right: -5, backgroundColor: '#F47920', borderRadius: 10, width: 16, height: 16, justifyContent: 'center', alignItems: 'center' },
  cartBadgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  resultsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'space-between' },
  filterButtonOrange: { backgroundColor: '#F47920', paddingVertical: 6, paddingHorizontal: 15, borderRadius: 20, flexDirection: 'row', alignItems: 'center' },
  filterButtonTextWhite: { color: '#FFF', fontWeight: '500' },
  resultText: { fontSize: 12, color: '#333' },
  listContent: { padding: 10 },
  columnWrapper: { justifyContent: 'space-between', marginBottom: 10 },
});