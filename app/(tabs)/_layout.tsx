import Ionicons from '@expo/vector-icons/Ionicons';

import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    
    <Tabs screenOptions={{headerShown:false, tabBarActiveTintColor: 'green' , tabBarInactiveTintColor: 'gray'}}>
   
    <Tabs.Screen
        name="index"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => <Ionicons 
          name={focused ? 'search' : 'search-sharp'}
          size={24} color={color} />
          ,
        }}
      />

    <Tabs.Screen
        name="List"
        options={{
          title: 'Products',
          tabBarIcon: ({ color, focused }) => <Ionicons 
          name={focused ? "list-sharp" : 'list-outline' } 
          size={24} 
          color={color} />
          ,
        }}
      />

  
      <Tabs.Screen
        name="Scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color, focused}) => <Ionicons 
          name={focused ? 'barcode-sharp' : "scan-sharp"} 
          size={24} color={color} />
          ,
        }}
      />

        <Tabs.Screen
                name="Saved"
                options={{
                title: 'Saved',
                tabBarIcon: ({ color, focused }) => <Ionicons 
                name={focused ? 'bookmark' : 'bookmark-outline'}
                size={24} color={color}/>
                ,
                }}
            />

    <Tabs.Screen
            name="Profile"
            options={{
            title: 'Profile',
            tabBarIcon: ({ color, focused }) => <Ionicons 
            name={focused ? 'person-sharp': "person-outline"} 
            size={24} color={color} />
            ,
            }}
        />
        </Tabs>
  );
}
