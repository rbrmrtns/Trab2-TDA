import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCarrinho } from '../context/ContextCarrinho';

const { width } = Dimensions.get('window');
const cardWidth = (width / 2) - 20;

export default function CartaoProduto({ item }) {
  const router = useRouter();
  const { addAoCarrinho } = useCarrinho();

  const handlePress = () => {
    router.push({
      pathname: "/produto",
      params: { id: item.id }
    });
  };

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handlePress}>
      <View style={styles.imageContainer}>
        <Image source={ item.imagem } style={styles.productImage} resizeMode="contain" />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.brandRow}>
          <Text style={styles.brandText}>{item.marca}</Text>
          {item.avaliacao && (
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={12} color="#FFD700" />
              <Text style={styles.ratingText}>{item.avaliacao.toFixed(1)}</Text>
            </View>
          )}
        </View>

        <Text style={styles.productName} numberOfLines={2}>{item.nome}</Text>

        <View style={styles.priceContainer}>
          {item.precoOriginal && (
            <Text style={styles.originalPrice}>R$ {item.precoOriginal.toFixed(2).replace('.', ',')}</Text>
          )}
          <View style={styles.currentPriceRow}>
            <Text style={styles.currentPrice}>R$ {item.preco.toFixed(2).replace('.', ',')}</Text>
            {item.desconto && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{item.desconto}</Text>
              </View>
            )}
          </View>
        </View>

        <TouchableOpacity 
          style={styles.addButton} 
          onPress={(e) => {
            addAoCarrinho(item);
          }}
        >
          <Text style={styles.addButtonText}>adicionar</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: { width: cardWidth, backgroundColor: '#fff', borderRadius: 8, padding: 10, marginBottom: 10 },
  imageContainer: { height: 140, width: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: 10, backgroundColor: '#f9f9f9', borderRadius: 8 },
  productImage: { width: '80%', height: '80%' },
  brandRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  brandText: { fontSize: 12, color: '#888' },
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { fontSize: 12, fontWeight: 'bold', marginLeft: 2 },
  productName: { fontSize: 14, color: '#333', marginBottom: 8, height: 40 },
  originalPrice: { fontSize: 12, color: '#999', textDecorationLine: 'line-through' },
  currentPriceRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  currentPrice: { fontSize: 16, fontWeight: 'bold', color: '#333', marginRight: 8 },
  discountBadge: { backgroundColor: '#F47920', paddingHorizontal: 6, borderRadius: 4 },
  discountText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  addButton: { borderWidth: 1, borderColor: '#F47920', borderRadius: 20, paddingVertical: 6, alignItems: 'center', marginTop: 10 },
  addButtonText: { color: '#333', fontWeight: '500' },
});