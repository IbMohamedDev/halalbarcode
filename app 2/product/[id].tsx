// app/product/[id].js
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function ProductDetail() {
  const {
    name,
    brand,
    image,
    isHaram,
    haramIngredients,
    ingredients,
    haramCount,
    // mushboohCount,
    // crossContamination,
    // halalCertified,
    // alternatives
  } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.brand}>{brand}</Text>

      <View style={styles.status}>
        <View style={[styles.dot, { backgroundColor: isHaram === 'true' ? 'red' : 'green' }]} />
        <Text style={{ color: isHaram === 'true' ? 'red' : 'green', fontWeight: 'bold', fontSize: 16 }}>
          {isHaram === 'true' ? 'Haram' : 'Halal'}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text>Haram ingredients:</Text>
        <Text>{haramCount} <Text style={{ color: 'red' }}>●</Text></Text>
      </View>
      {/* <View style={styles.infoRow}>
        <Text>Cross-contamination:</Text>
        <Text>{crossContamination === 'true' ? 'Yes' : 'No'} <Text style={{ color: 'green' }}>●</Text></Text>
      </View>
      <View style={styles.infoRow}>
        <Text>Questionable ingredients:</Text>
        <Text>{mushboohCount} <Text style={{ color: 'orange' }}>●</Text></Text>
      </View>
      <View style={styles.infoRow}>
        <Text>Halal certified:</Text>
        <Text>{halalCertified === 'true' ? 'Yes' : 'No'} <Text style={{ color: 'orange' }}>●</Text></Text>
      </View>

      <Text style={styles.altTitle}>Alternatives:</Text>
      <ScrollView horizontal contentContainerStyle={{ gap: 12 }}>
        {alternatives ? JSON.parse(decodeURIComponent(alternatives)).map((alt) => (
          <View key={alt.barcode} style={styles.altCard}>
            <Image source={{ uri: alt.image }} style={styles.altImage} />
            <Text style={{ fontSize: 12 }}>{alt.name}</Text>
          </View>
        )) : <Text style={{ color: '#888' }}>No alternatives available</Text>}
      </ScrollView> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flex: 1 },
  image: { width: '100%', height: 200, resizeMode: 'contain', marginBottom: 20 },
  title: { fontSize: 20, fontWeight: 'bold' },
  brand: { fontSize: 16, color: '#666', marginBottom: 10 },
  status: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  dot: { width: 10, height: 10, borderRadius: 5, marginRight: 6 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  altTitle: { marginTop: 20, fontSize: 16, fontWeight: 'bold' },
  altCard: { width: 100, alignItems: 'center' },
  altImage: { width: 80, height: 80, borderRadius: 8, marginBottom: 4, resizeMode: 'cover' }
});
