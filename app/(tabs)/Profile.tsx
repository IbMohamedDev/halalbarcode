import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function Profile() {
  return (
    <View style={styles.container}>
      {/* Profile icon and name */}
      <View style={styles.profileHeader}>
      <Image
  source={require('../../assets/images/default-profile-pic.avif')}
  style={styles.profileImage}
/>

        <Text style={styles.fullName}>Username</Text>
        <TouchableOpacity style={styles.handleButton}>
         
        </TouchableOpacity>
      </View>


  
      <View style={styles.promoBanner}>

  <View style={styles.promoTextContainer}>
    <Text style={styles.promoTitle}>Invite friends</Text>
    <Text style={styles.promoSubtitle}>Get $5</Text>
  </View>
  <TouchableOpacity style={styles.promoButton}>
    <Text style={styles.promoButtonText}>Affiliate</Text>
  </TouchableOpacity>
</View>

      {/* Action rows */}
      <TouchableOpacity style={styles.row}  onPress={() => router.push('./Saved')}>
        <View style={[styles.iconCircle, { backgroundColor: '#EDEDED' }]}>
        <Ionicons name="bookmark-outline" size={18} color="#555" />
        </View>
        <View>
          <Text style={styles.rowTitle}>Saved</Text>
          {/* <Text style={styles.rowSubtitle}>Update your profile info</Text> */}
        </View>
        <Ionicons name="chevron-forward" size={18} color="#aaa" style={styles.rowArrow} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.row}>
      <View style={[styles.iconCircle, { backgroundColor: '#EDEDED' }]}>
        <Ionicons name="settings-outline" size={18} color="#555" />
        </View>
        <View>
          <Text style={styles.rowTitle}>Settings</Text>
          {/* <Text style={styles.rowSubtitle}>Help people find you</Text> */}
        </View>
        <Ionicons name="chevron-forward" size={18} color="#aaa" style={styles.rowArrow} />
      </TouchableOpacity>



    

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 60,
    paddingHorizontal: 20,
    marginTop:40
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileCircle: {
    width: 80,
    height: 80,
    backgroundColor: '#36802d',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  initial: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  fullName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  handleButton: {
    marginTop: 4,
  },
  handleText: {
    color: '#666',
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#dddddd',
    //backgroundColor: '#eeeeee'
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  rowSubtitle: {
    fontSize: 13,
    color: '#777',
  },
  rowArrow: {
    marginLeft: 'auto',
  },
  sectionHeader: {
    marginTop: 25,
    marginBottom: 12,
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },
  leftIcon: {
    marginRight: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#E0E7FF',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statusIcon: {
    marginRight: 6,
  },
  promoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f0e3',
    borderRadius: 14,
    padding: 10,
    marginBottom: 16,
    

  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  

  promoTextContainer: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
  promoSubtitle: {
    fontSize: 12,
    color: '#555',
    marginTop: 2,
  },
  promoButton: {
    backgroundColor: '#2E8B57',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  promoButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  
  
  
});
