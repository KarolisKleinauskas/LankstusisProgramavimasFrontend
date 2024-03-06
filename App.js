import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet, Text, View, Pressable, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DropDownPicker from 'react-native-dropdown-picker';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <ImageBackground source={require('./assets/background.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.flex1}>
          <Pressable style={styles.helpButton} onPress={() => navigation.navigate('Help')}>
            <Text style={styles.helpButtonText}>?</Text>
          </Pressable>
        </View>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>TAVO POREIKIAI - MŪSŲ PASIŪLYMAI</Text>
          <Text style={styles.text1}>Produktų Informacijos Gavimo Programa (?)</Text>
        </View>
        <View style={styles.buttonNext}>
          <Button title='Tęsti' color='#557FD5' onPress={() => navigation.navigate('Form')}/>
        </View>
        <StatusBar style="auto"/>
      </View>
    </ImageBackground>
  );
}

function AppForm({ navigation }) {
  const [isOpen1, setOpen1] = useState(false);
  const [currentValue1, setCurrentValue1] = useState([]);
  const onDropdown1Open = useCallback(() => {
    setOpen2(false);
  }, []);
  const items1 = [
    {label: 'Pirmas', value: 'a1'},
    {label: 'Antras', value: 'a2'},
    {label: 'Trečias', value: 'a3'},
    {label: 'Ketvirtas', value: 'a4'},
    {label: 'Penktas', value: 'a5'},
    {label: 'Šeštas', value: 'a6'},
    {label: 'Septintas', value: 'a7'},
    {label: 'Aštuntas', value: 'a8'},
    {label: 'Devintas', value: 'a9'},
    {label: 'Dešimtas', value: 'a0'},
  ];
  const [isOpen2, setOpen2] = useState(false);
  const [currentValue2, setCurrentValue2] = useState([]);
  const onDropdown2Open = useCallback(() => {
    setOpen1(false);
  }, []);
  const items2 = [
    {label: 'Pirmas', value: 'b1'},
    {label: 'Antras', value: 'b2'},
    {label: 'Trečias', value: 'b3'},
  ];

  return (
    <ImageBackground source={require('./assets/background.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.flex1}>
          <Pressable style={styles.helpButton} onPress={() => navigation.navigate('Help')}>
            <Text style={styles.helpButtonText}>?</Text>
          </Pressable>
        </View>
        <View style={styles.formFlex}>
          <Text style={styles.formTitle}>Klausimynas</Text>
          <DropDownPicker
            items={items1}
            open={isOpen1}
            setOpen={() => setOpen1(!isOpen1)}
            value={currentValue1}
            setValue={(val) => setCurrentValue1(val)}
            placeholder='Kategorija: Pirma'
            multiple={true}
            min={0}
            max={10}
            maxHeight={200}
            onOpen={onDropdown1Open}
            showTickIcon={true}
            theme='DARK'
            mode='BADGE'
            badgeColors={'black'}
            badgeTextStyle={{color: 'white'}}
            dropDownDirection="BOTTOM"
            zIndex={200}
            placeholderStyle={{fontWeight: 'bold'}}
            style={styles.formCategory}
          />
          <DropDownPicker
            items={items2}
            open={isOpen2}
            setOpen={() => setOpen2(!isOpen2)}
            value={currentValue2}
            setValue={(val) => setCurrentValue2(val)}
            placeholder='Kategorija: Antra'
            multiple={true}
            min={0}
            max={10}
            maxHeight={200}
            onOpen={onDropdown2Open}
            showTickIcon={true}
            theme='DARK'
            mode='BADGE'
            badgeColors={'black'}
            badgeTextStyle={{color: 'white'}}
            dropDownDirection="BOTTOM"
            zIndex={100}
            placeholderStyle={{fontWeight: 'bold'}}
            style={styles.formCategory}
          />
        </View>
        <View style={styles.buttonNext}>
          <Button title='Tęsti' color='#6699FF' onPress={() => navigation.navigate('List', {category1: currentValue1, category2: currentValue2})}/>
        </View>
        <StatusBar style="auto"/>
      </View>
    </ImageBackground>
  );
}

function ItemList({route, navigation}) {
  const {category1, category2} = route.params;
  const myJSON1 = JSON.stringify(category1);
  const getValue1 = JSON.parse(myJSON1);
  const myJSON2 = JSON.stringify(category2);  
  const getValue2 = JSON.parse(myJSON2);
  let index = 0;
  const results = [];

  getValue1.forEach((category) => {
    index = index+1;
    results.push(
      <TouchableOpacity key={index} activeOpacity={0.6} style={styles.listItem} onPress={() => navigation.navigate('Product', {itemId: category})}>
        <Text style={styles.product}>{index}. Produktas</Text>
        <Text style={styles.productAfter}>Kategorija: {category}</Text>
      </TouchableOpacity>
    )
  })
  getValue2.forEach((category) => {
    index = index+1;
    results.push(
      <TouchableOpacity key={index} activeOpacity={0.6} style={styles.listItem} onPress={() => navigation.navigate('Product', {itemId: category})}>
        <Text style={styles.product}>{index}. Produktas</Text>
        <Text style={styles.productAfter}>Kategorija: {category}</Text>
      </TouchableOpacity>
    )
  })

  return (
    <ImageBackground source={require('./assets/background.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.flex1}>
          <Pressable style={styles.helpButton} onPress={() => navigation.navigate('Help')}>
            <Text style={styles.helpButtonText}>?</Text>
          </Pressable>
        </View>
        <View style={styles.listFlex}>
          <Text style={styles.listTitle}>Produktai:</Text>
          <Text style={styles.listCategories}>Kategorijos: {getValue1}, {getValue2}</Text>
          {results}
        </View>
        
        
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

function ProductInfo({route, navigation}) {
  const {itemId} = route.params;
  return (
    <ImageBackground source={require('./assets/background.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.flex1}>
          <Pressable style={styles.helpButton} onPress={() => navigation.navigate('Help')}>
            <Text style={styles.helpButtonText}>?</Text>
          </Pressable>
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productInfoTitle}>Produkto pavadinimas</Text>
          <Text style={styles.productInfoText}>Produkto informacija</Text>
          <Text style={styles.productInfoText}>itemId: {JSON.stringify(itemId)}</Text>
        </View>
        <StatusBar style="auto"/>
      </View>
    </ImageBackground>
  );
}

function HelpScreen({ navigation }) {
  return (
    <ImageBackground source={require('./assets/background.jpeg')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.helpTitle}>Kam reikalinga ši programa?</Text>
          <Text style={styles.helpText}>Ši programa leidžia vartotojui surasti jam tinkamą išmaniūjų namų sistemą.....</Text>
          <Text style={styles.helpTitle}>Kaip naudotis programa?</Text>
          <Text style={styles.helpText}>1. Pradinio lango apačioje matomas mygtukas 'tęsti', kurį paspaudus jūs busite nuvedamas į klausimyną. </Text>
          <Text style={styles.helpText}>2. Klausimyno lange jums reikia pasirinkti kūrią kategoriją norite pasirinkti.</Text>
          <Text style={styles.helpText}>3. Pasirinkę kategoriją ir paspaudę mygtuką tęsti, jums bus rodoma produkto išsami informacija.</Text>
          <Text style={styles.helpText}>4. Viršui kairėje paspaudūs mygtuką su atbuline rodykle, jūs būsite gražinamas į praeitą langą. </Text>
          <Text style={styles.helpTitle}>Kas dare šią programą?</Text>
          <Text style={styles.helpText}>Šia programą darė keturi Klaipėdos valstybinės kolegijos antro kurso informatikos studentai, kurie turėjo savo pareigas ir atsakomybes:</Text>
          <Text style={styles.helpText}>Tomas Budrikas - Fullstack</Text>
          <Text style={styles.helpText}>Meida Ivanauskaitė - Frontend</Text>
          <Text style={styles.helpText}>Lukas Raišuotis - Backend</Text>
          <Text style={styles.helpText}>Karolis Kleinauskas - Duomenų bazės</Text>

          {/* Feedback Button */}
          <TouchableOpacity style={styles.feedbackButton} onPress={() => navigation.navigate('Feedback')}>
            <Text style={styles.feedbackButtonText}>Feedback</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

function FeedbackScreen({ navigation }) {
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  const handleSubmit = () => {
    // Handle submit logic, e.g., sending feedback to server
    console.log('Rating:', rating);
    console.log('Feedback Text:', feedbackText);

    // Show the modal
    setShowModal(true);
  };

  const handleContinue = () => {
    // Hide the modal
    setShowModal(false);

    // Navigate to the Home screen
    navigation.navigate('Home');
  };

  return (
    <ImageBackground source={require('./assets/background.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.feedbackTitle}>Atsiliepimai</Text>

        {/* Rating */}
        <Text style={styles.label}>Įvertinkite savo patirtį (1-5)</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((value) => (
            <TouchableOpacity
              key={value}
              style={[styles.ratingItem, value <= rating && styles.selectedRatingItem]}
              onPress={() => setRating(value)}>
              <Text style={styles.ratingText}>{value}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Feedback Text */}
        <Text style={styles.label}>Padėkite mums tobulėti</Text>
        <TextInput
          style={styles.feedbackTextInput}
          multiline
          numberOfLines={4}
          placeholder="Jūsų atsiliepimas"
          value={feedbackText}
          onChangeText={(text) => setFeedbackText(text)}
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Siūsti</Text>
        </TouchableOpacity>

        {/* Modal */}
        {showModal && (
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Ačiū už atsiliepimą!</Text>
              <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                <Text style={styles.continueButtonText}>Tęsti</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Form" component={AppForm}/>
        <Stack.Screen name="List" component={ItemList}/>
        <Stack.Screen name="Product" component={ProductInfo}/>
        <Stack.Screen name="Help" component={HelpScreen}/>
        <Stack.Screen name="Feedback" component={FeedbackScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10, // Adjust this value as needed to create the desired gap
    paddingBottom: 20, // Additional padding to ensure content is not too close to the bottom
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  titleBlock: {
    top: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  text1: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 280,
    color: 'white',
  },
  item: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  helpButton: {
    position: 'fixed',
    marginTop: 20,
    left: 150,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    elevation: 5,
    backgroundColor: '#6699FF',
  },
  helpButtonText: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 1,
  },
  buttonNext: {
    width: 200, 
    height: 70,
  },
  formFlex: {
    flex: 1, 
    width: '100%', 
    position: 'absolute', 
    alignItems: 'center', 
    marginTop: 50
  },
  formTitle: {
    fontSize: 40, 
    fontWeight: 'bold', 
    color: 'white',
    marginBottom: 10
  },
  formCategory: {
    marginVertical: 5
  },
  listFlex: {
    flex: 1, 
    width: '100%', 
    position: 'absolute', 
    alignItems: 'center', 
    marginTop: 50
  },
  listTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  listCategories: {
    color: 'white'
  },
  listItem: {
    width: '100%', 
    marginVertical: 5,
    borderColor: '#313143', 
    borderWidth: 1, 
    borderStyle: 'solid', 
    borderRadius: 10, 
    padding: 8,
    backgroundColor: '#313143',
  },
  product: {
    fontSize: 22,
    color: '#E0E5F7',
  },
  productAfter: {
    fontSize: 15,
    color: '#CFD4E5',
    marginLeft: 24
  },
  helpTitle: {
    fontSize: 35, 
    fontWeight: 'bold', 
    marginTop: 25, 
    marginBottom: 10, 
    color: 'white'
  }, 
  helpText: {
    fontSize: 16,
    marginTop: 10, 
    color: 'white',
    width: 330
  }, 
  productInfo: {
    top: -480,
    width: 320, 
  },
  productInfoTitle: {
    fontSize: 30, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: 'white',
  },
  productInfoText: {
    fontSize: 16, 
    color: 'white',
    top: 10
  },
  feedbackTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  ratingItem: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  selectedRatingItem: {
    backgroundColor: '#6699FF',
  },
  ratingText: {
    fontSize: 16,
    color: '#6699FF',
  },
  feedbackTextInput: {
    width: '80%',
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#6699FF',
    width: '80%',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  feedbackButton: {
    backgroundColor: '#6699FF',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    alignSelf: 'center',
  },
  feedbackButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#6699FF',
    padding: 10,
    borderRadius: 5,
  },
  continueButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

// cd .../LankstusisProgramavimasFrontend
// npm install (node_modules)
// npm run start (qr code)
// npm run android (qr code + paleidimas per android pc)

