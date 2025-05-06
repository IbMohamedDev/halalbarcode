import { EvilIcons, Ionicons, MaterialIcons,Octicons,Fontisto } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-actions-sheet';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';






interface ProductDetailsProps {
  data: {
    image_url?: string;
    product_name: string;
    brand: string;
    isHaram: boolean;
    haramIngredients: string[];
    fullIngredients: string[];
  };
  closeBottomSheet: () => void;
}

export default function ProductDetails({ data, closeBottomSheet }: ProductDetailsProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const showCameraDesc = true;
  const showPhotoLibraryDesc = false;
  const showEmailDesc = false;


  return (
    <ScrollView contentContainerStyle={{ padding: 15 }}>
      
      {/* ✅ Celsius-Style Header Layout */}
      <View style={styles.cardHeader}>
        {/* <Image source={{ uri: data.image_url }} style={styles.cardImage} /> */}

     
            {data.image_url ? (
                <View style={styles.imageHolder}>
                <Image
                  source={{ uri: data.image_url }}
                  style={styles.productImage}
                />
              </View>
              
            ) : (
                <View />
            )}

        <View style={styles.cardText}>
          <Text style={styles.productName}>{data.product_name}</Text>
          <Text style={styles.brand}>{data.brand}</Text>
          <View style={styles.scoreRow}>
          <View style={[styles.mainStatusDot, { backgroundColor: data.isHaram ? '#FF6258' : '#00B56A' }]} />
            {/* <Text style={styles.scoreText}>{data.isHaram ? 'Haram' : 'Halal'}</Text> */}
            <Text style={[{ fontWeight: 'bold', color: data.isHaram ? '#FF6258' : '#00B56A' }, styles.statusLabel]}>
                    {data.isHaram ? 'Haram' : 'Halal'}
                </Text>
          </View>
   
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.container1}>

      {/* ✅ Existing Detail Rows */}
      <View style={styles.detailRow}>
  <View style={styles.iconTextRow}>
    <Octicons name="stop" color="#000" size={15} />
    <Text style={styles.detailText}>Haram ingredients:</Text>
  </View>
  <View style={styles.rightDetail}>
    <Text style={styles.countText}>{data.haramIngredients.length}</Text>
    <View style={[styles.statusDot, { backgroundColor: '#FF6258' }]} />
    <TouchableOpacity onPress={() => setShowDetails(!showDetails)}>
      <Ionicons name="chevron-down-sharp" size={20} color="gray" />
    </TouchableOpacity>
  </View>
</View>


      <View style={styles.detailRow}>
      <View style={styles.iconTextRow}>
      <Octicons name="question" color="#000" size={15} />
      <Text style={styles.detailText}>Questionable ingredients:</Text>
      </View>
        <View style={styles.rightDetail}>
          <Text style={styles.countText}>0</Text>
          <View style={[styles.statusDot, { backgroundColor: '#FFD600' }]} />
          <TouchableOpacity onPress={() => setShowDetails(!showDetails)}>
            <Ionicons name="chevron-down-sharp" size={20} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
     

      <View style={styles.detailRow}>
      <View style={styles.iconTextRow}>
      <Octicons name="verified" color="#000" size={15} />
        <Text style={styles.detailText}>Halal Certification:</Text>
        </View>
        <View style={styles.rightDetail}>
          <Text style={styles.countText}>No</Text>
          <View style={[styles.statusDot, { backgroundColor: '#00B56A' }]} />
          <TouchableOpacity onPress={() => setShowDetails(!showDetails)}>
            <Ionicons name="chevron-down-sharp" size={20} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ✅ Toggle Sucralose-style Ingredient Card */}
      {/* <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setShowIngredients(!showIngredients)}
      >
        <Text style={styles.toggleButtonText}>
          {showIngredients ? 'Hide Ingredient Detail' : 'Show Sucralose Detail'}
        </Text>
      </TouchableOpacity> */}
      
        </ScrollView>
      {showIngredients && (
        <View style={[styles.ingredientCard, { borderColor: '#FF6258' }]}>
          <View style={styles.ingredientHeader}>
            <Text style={styles.ingredientName}>Sucralose</Text>
            <View style={[styles.riskBadge, { borderColor: '#FF6258' }]}>
              <Text style={[styles.riskBadgeText, { color: '#FF6258' }]}>4 risks</Text>
            </View>
          </View>
          <Text style={styles.ingredientDescription}>
            Sucralose is an artificial, non-nutritive sweetener approximately 600 times sweeter than sucrose. Frequently used in processed foods and beverages...
          </Text>
        </View>
      )}

      {/* ✅ Full Ingredient List in Card */}
      <View style={[styles.ingredientCard, { borderColor: '#ccc' }]}>
        <View style={styles.ingredientHeader}>
          <Text style={styles.ingredientName}>Ingredients</Text>
          <View style={styles.riskBadge}>
            <Text style={styles.riskBadgeText}>{data.haramIngredients.length} haram found</Text>
          </View>
        </View>
        <Text style={styles.ingredientDescription}>
          {data.fullIngredients.join(', ')}
        </Text>
      </View>

      {/* ✅ Alternatives (Unchanged) */}
      <Text style={styles.altTitle}>Alternatives:</Text>
      <View style={styles.altRow}>
        <View style={styles.altBox} />
        <View style={styles.altBox} />
        <View style={styles.altBox} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    
  },
  cardImage: {
    width: 70,
    height: 150,
    resizeMode: 'contain',
    marginRight: 16,
  },
  cardText: {
    flex: 1,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  scoreDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFA500',
    marginRight: 6,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '600',
  },
  scoreLabel: {
    color: '#888',
    fontSize: 14,
    marginTop: 2,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  brand: {
    color: '#888',
    marginTop: 6,
    fontSize: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    alignItems: 'center',
    marginTop: 5,
    borderBottomWidth:0.5,
    borderColor:'#f2f2f2',
    marginBottom:10

  },
  detailText: {
    fontSize: 18,
  },
  rightDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: {
    fontSize: 16,
  },
  statusDot: {
    width: 16,
    height: 16,
    borderRadius: 16,
    marginLeft:7, 
    marginRight:7
  },
  ingredientCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    marginTop: 30,
  },
  ingredientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ingredientDescription: {
    fontSize: 14,
    color: '#444',
  },
  riskBadge: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  riskBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ccc',
  },
  toggleButton: {
    backgroundColor: '#00B56A',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginVertical: 10,
  },
  toggleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  altTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 12,
  },
  altRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  altBox: {
    width: 90,
    height: 90,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  mainStatusDot: {
    width: 20,
    height: 20,
    borderRadius: 25,
    marginLeft:10,
  },
  statusLabel: {
    fontWeight: 'bold',
    fontSize: 22,
    marginLeft: 7,
    marginRight: 10,
  },
  productImage: {
    width: 80,
    height: 120,
    
    resizeMode: 'contain',
    marginTop:0,
    paddingTop:0,
    marginRight:20,

  },
  imageHolder: {
    width: 120,
    height: 140,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginRight: 20,
  },
  iconTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6, // or use marginRight in individual components if not supported
  },
//   container1: {
//     padding: 20,
//     backgroundColor: '#f2f2f2',
//     flexGrow: 1,
//     borderRadius:15,
//     width:'auto'
    
//   },
  header: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  permissionBox: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  
  
});
