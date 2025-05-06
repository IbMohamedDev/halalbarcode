import { fetchProductData } from '@/api/ProductApi';
import { Ionicons } from '@expo/vector-icons';

import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

import { useRef, useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import ProductDetails from '../ProductDetails';
import Overlay from '../Overlay'


export default function Scan() {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);
  const [showAlert, setShowAlert] = useState(false); // for native-style modal

  const handleBarCodeScanned = async ({ type, data }: { type: string; data: string }) => {
    if (scanned || isProcessing) return;

    setScanned(true);
    setIsProcessing(true);

    try {
      const productData = await fetchProductData(data);

      if (!productData) {
        setShowAlert(true); // open modal
        setTimeout(() => handleCloseAlert(), 10000);

        return;
      }

      setScannedData(productData);
      setIsProcessing(false);
      actionSheetRef.current?.show();
    } catch (error) {
      console.log('Error scanning product:', error);
      setScanned(false);
      setIsProcessing(false);
    }
  };

  const closeBottomSheet = () => {
    actionSheetRef.current?.hide();
    setScanned(false);
    setScannedData(null);
    setIsProcessing(false);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    setScanned(false);
    setScannedData(null);
    setIsProcessing(false);
  };

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (

    
      <Overlay>
      <CameraView
        style={styles.camera}
        facing={facing}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr', 'ean13', 'code128'],
        }}
      />

      {/* ✅ ActionSheet for Product Info */}
      <ActionSheet ref={actionSheetRef}
       initialSnapIndex={0} 
       closable={true}
       snapPoints={[45, 100]} // % of screen height
       gestureEnabled
       closeOnTouchBackdrop={false}
       overlayColor="white"
       defaultOverlayOpacity={0.1}
       indicatorStyle={{ display: 'flex' }}
       drawUnderStatusBar
       onClose={closeBottomSheet} 
      //  onSnapIndexChange={handleSnapChange}
       >
         <View style={styles.sheetTopBar}>

  <TouchableOpacity onPress={() => console.log('Saved!')}>
    <Ionicons name="bookmark-outline" color="#000" size={24} />
  </TouchableOpacity>

  <TouchableOpacity onPress={closeBottomSheet}>
    <Ionicons name="close-sharp" color="#000" size={24} />
  </TouchableOpacity>

</View>

        <ScrollView >
         {/*   {scannedData ? (
            <>
             {scannedData.image_url && (
                <Image
                  source={{ uri: scannedData.image_url }}
                  style={{ width: 140, height: 140, alignSelf: 'center', marginBottom: 10 }}
                />
              )}
              <Text style={styles.sheetTitle}>{scannedData.product_name}</Text>
              <Text style={styles.brand}>{scannedData.brand}</Text>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                <View style={{
                  width: 10, height: 10, borderRadius: 5,
                  backgroundColor: scannedData.isHaram ? 'red' : 'green',
                  marginRight: 6
                }} />
                <Text style={{ fontWeight: 'bold', color: scannedData.isHaram ? 'red' : 'green' }}>
                  {scannedData.isHaram ? 'Haram' : 'Halal'}
                </Text>
              </View>

              <Text style={{ marginTop: 10, fontWeight: '600' }}>⚠️ Haram Ingredients:</Text>
              <Text style={{ color: 'red' }}>
                {scannedData.haramIngredients.length > 0
                  ? scannedData.haramIngredients.join(', ')
                  : 'None'}
              </Text>

              <Text style={{ marginTop: 10, fontWeight: '600' }}>🧾 All Ingredients:</Text>
              <Text style={{ color: '#555' }}>{scannedData.fullIngredients.join(', ')}</Text> 
            </>
          // ) : (
          //   <Text>Scanning...</Text>
          // )}
          */}
          {scannedData ? (
            <ProductDetails data={scannedData} closeBottomSheet={closeBottomSheet}/>
          ) : (
            <Text>Scanning...</Text>
          )}
          

          {/* <TouchableOpacity onPress={closeBottomSheet} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
            
          </TouchableOpacity> */}
        </ScrollView>
      </ActionSheet>

      {/* ✅ Native-Style Modal Alert for "Product Not Found" */}
      {/* <Modal isVisible={showAlert}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Product Not Found</Text>
          <Text style={styles.modalText}>
            We couldn’t find this product in our database.
          </Text>
          <TouchableOpacity onPress={handleCloseAlert} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal> */}
      <Modal isVisible={showAlert} backdropOpacity={0.5} animationIn="fadeIn" animationOut="fadeOut">
      <View style={styles.toastAlert}>
        <Text style={styles.toastText}>Unable to identify product. Please try again.</Text>
        <TouchableOpacity onPress={handleCloseAlert} style={styles.modalButton}>
            {/* <Text style={styles.modalButtonText}>Close</Text> */}
            <Ionicons name="close-circle-sharp" size={30} color="#aaa" style={styles.modalButtonText} />

          </TouchableOpacity>
      </View>
    </Modal>
    </Overlay>
  
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  message: { textAlign: 'center', paddingBottom: 10 },
  camera: { flex: 1 },
  sheetContent: { padding: 20 },
  sheetTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  brand: { fontSize: 14, color: '#666', marginBottom: 10 },
  // closeButton: {
  //   marginTop: 20,
  //   padding: 10,
  //   backgroundColor: '#2196F3',
  //   borderRadius: 5,
  //   alignSelf: 'center',
  // },


  // Modal styles
  modalContent: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    textAlign: 'center',
    marginBottom: 16,
  },
  modalButton: {
    // backgroundColor: '#e53935',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  toastAlert: {
    backgroundColor: '#111',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 40,
  },
  
  toastText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  closeButtonText: { color: 'white', fontWeight: 'bold' },
  sheetTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    paddingHorizontal: 17,
  },
  
});
