import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, Modal, StyleSheet, Text, View, Pressable, TouchableWithoutFeedback, ImageBackground, Image, TouchableOpacity, TextInput } from 'react-native';
import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DropDownPicker from 'react-native-dropdown-picker';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <ImageBackground source={require('./assets/background.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.flex1}>
          {/* New button for registration/login */}
          <Pressable style={styles.registerButton} onPress={() => navigation.navigate('Registracija')}>
            <Text style={styles.registerButtonText}>+</Text>
          </Pressable>
          <Pressable style={styles.helpButton} onPress={() => navigation.navigate('Pagalba')}>
            <Text style={styles.helpButtonText}>?</Text>
          </Pressable>
        </View>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>Sveiki!</Text>
          <Text style={styles.text1}>Produktų Informacijos Gavimo Programa (?)</Text>
        </View>
        <View style={styles.buttonNext}>
          <Button title='Tęsti' color='#557FD5' onPress={() => navigation.navigate('Klausimynas')}/>
        </View>
        <StatusBar style="auto"/>
      </View>
    </ImageBackground>
  );
}
function QuizScreen({ navigation }) {
  const [isOpen1, setOpen1] = useState(false);
  const [currentValue1, setCurrentValue1] = useState([]);
  const [isOpen2, setOpen2] = useState(false);
  const [currentValue2, setCurrentValue2] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [lastValue, setLastValue] = useState([]);
  const [allCurrentValues, setAllCurrentValues] = useState([]);

  const handleValueChange = (value, setter) => {
    setter(value);
    setAllCurrentValues(value);
    setModalVisible(!modalVisible);
  };

  const handleDropdown1Open = () => {
    setOpen2(false);
  };

  const handleDropdown2Open = () => {
    setOpen1(false);
  };

  const itemData = [
    [
      {label: 'Pirmas', value: 'a1'},
      {label: 'Antras', value: 'a2'},
      {label: 'Trečias', value: 'a3'},
      {label: 'Ketvirtas', value: 'a4'},
      {label: 'Penktas', value: 'a5'},
      {label: 'Šeštas', value: 'a6'},
      {label: 'Septintas', value: 'a7'},
    ],
    [
      {label: 'Aštuntas', value: 'b1'},
      {label: 'Devintas', value: 'b2'},
      {label: 'Dešimtas', value: 'b3'},
    ],
  ];

  useEffect(() => {
    setLastValue(allCurrentValues[allCurrentValues.length - 1]);
  }, [allCurrentValues]);

  const createModalContent = (lastValue) => {
    const modalData = {
      a1: { title: 'Pirmas!', text: 'Čia bus 0: "Pirmas" pasirinkimo aprašymas', imageSource: require('./assets/icon.png') },
      a2: { title: 'Antras!', text: 'Čia bus 0: "Antras" pasirinkimo aprašymas', imageSource: require('./assets/favicon.png') },
      a3: { title: 'Trečias!', text: 'Čia bus 0: "Trečias" pasirinkimo aprašymas', imageSource: require('./assets/icon.png') },
      a4: { title: 'Ketvirtas!', text: 'Čia bus 0: "Ketvirtas" pasirinkimo aprašymas', imageSource: require('./assets/favicon.png') },
      a5: { title: 'Penktas!', text: 'Čia bus 0: "Penktas" pasirinkimo aprašymas', imageSource: require('./assets/icon.png') },
      a6: { title: 'Šeštas!', text: 'Čia bus 0: "Šeštas" pasirinkimo aprašymas', imageSource: require('./assets/favicon.png') },
      a7: { title: 'Septintas!', text: 'Čia bus 0: "Septintas" pasirinkimo aprašymas', imageSource: require('./assets/icon.png') },
      b1: { title: 'Aštuntas!', text: 'Čia bus 1: "Aštuntas" pasirinkimo aprašymas', imageSource: require('./assets/favicon.png') },
      b2: { title: 'Devintas!', text: 'Čia bus 1: "Devintas" pasirinkimo aprašymas', imageSource: require('./assets/icon.png') },
      b3: { title: 'Dešimtas!', text: 'Čia bus 1: "Dešimtas" pasirinkimo aprašymas', imageSource: require('./assets/favicon.png') },
    };
    const data = modalData[lastValue] || { title: '???', text: 'Nėra tokio pasirinkimo...', imageSource: require('./assets/icon.png') };

    return (
      <View>
        <Text style={styles.modalTitle}>{data.title}</Text>
        <Text style={styles.modalText}>{data.text}</Text>
        <Image source={data.imageSource} style={styles.modalImage} />
      </View>
    );
  };

  return (
    <ImageBackground source={require('./assets/background.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.flex1}>
          <Pressable style={styles.helpButton} onPress={() => navigation.navigate('Pagalba')}>
            <Text style={styles.helpButtonText}>?</Text>
          </Pressable>
        </View>
        <View style={styles.quizFlex}>
          <Text style={styles.quizTitle}>Klausimynas</Text>
          <Text style={[styles.quizCategoryTitle, {color: '#BEF5EA'}]}>Kategorija: Pirma</Text>
          <DropDownPicker
            items={itemData[0]}
            value={currentValue1}
            setValue={(val) => handleValueChange(val, setCurrentValue1)}
            open={isOpen1}
            setOpen={() => setOpen1(!isOpen1)}
            onOpen={handleDropdown1Open}
            placeholder='Kategorija: Pirma'
            dropDownDirection="BOTTOM"
            multiple={true}
            min={0}
            max={10}
            maxHeight={200}
            showTickIcon={true}
            theme='DARK'
            mode='BADGE'
            zIndex={200}
            badgeColors={'black'}
            badgeTextStyle={{color: 'white'}}
            selectedItemLabelStyle={{color: '#C1F6A2'}}
            textStyle={{fontSize: 17, textAlign: 'center', color: 'white'}}
            placeholderStyle={{fontWeight: 'bold'}}
            style={styles.quizCategory}
          />
          <Text style={[styles.quizCategoryTitle, {color: '#F5F4CD'}]}>Kategorija: Antra</Text>
          <DropDownPicker
            items={itemData[1]}
            value={currentValue2}
            setValue={(val) => handleValueChange(val, setCurrentValue2)}
            open={isOpen2}
            setOpen={() => setOpen2(!isOpen2)}
            onOpen={handleDropdown2Open}
            placeholder='Kategorija: Antra'
            dropDownDirection="BOTTOM"
            multiple={true}
            min={0}
            max={10}
            maxHeight={200}
            showTickIcon={true}
            theme='DARK'
            mode='BADGE'
            zIndex={100}
            badgeColors={'black'}
            badgeTextStyle={{color: 'white'}}
            selectedItemLabelStyle={{color: '#C1F6A2'}}
            textStyle={{fontSize: 17, textAlign: 'center', color: 'white'}}
            placeholderStyle={{fontWeight: 'bold'}}
            style={styles.quizCategory}
          />
          <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <View style={styles.modalOverlay} />
            </TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {createModalContent(lastValue)}
              </ScrollView>
            </View>
          </Modal>
        </View>
        <View style={styles.buttonNext}>
          <Button title='Tęsti' color='#6699FF' onPress={() => navigation.navigate('Sąrašas', {category1: currentValue1, category2: currentValue2})}/>
        </View>
        <StatusBar style="auto"/>
      </View>
    </ImageBackground>
  );
}

function RegistrationScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  return (
    <ImageBackground source={require('./assets/background.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.registrationTitle}>Registracija</Text>

        <TextInput
          style={styles.textInput}
          placeholder="Įmonės pavadinimas"
          onChangeText={text => setUsername(text)}
          value={username}
        />

        <TextInput
          style={styles.textInput}
          placeholder="El. paštas"
          onChangeText={text => setEmail(text)}
          value={email}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Slaptažodis"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />
        <Button title='Registruotis' color='#6699FF' onPress={() => navigation.goBack()} />
        <TouchableOpacity style={styles.registerButton} onPress={() => navigation.goBack()}>
          <Text style={styles.registerButtonText}>Registruotis</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Jei jau turite paskyrą, spauskite čia</Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ImageBackground source={require('./assets/background.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.loginTitle}>Prisijungimas</Text>

        <TextInput
          style={styles.textInput}
          placeholder="El. paštas"
          onChangeText={text => setEmail(text)}
          value={email}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.textInput}
          placeholder="Slaptažodis"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />

        <Button title='Prisijungti' color='#6699FF' onPress={() => navigation.goBack()} />

        <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Registracija')}>
          <Text style={styles.registerButtonText}>Prisijungti</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Registracija')}>
          <Text style={styles.registerLink}>Jei neturite paskyros, spauskite čia</Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}



function ItemListScreen({route, navigation}) {
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
      <TouchableOpacity key={index} activeOpacity={0.6} style={styles.listItem} onPress={() => navigation.navigate('Produktas', {itemId: category})}>
        <Text style={styles.product}>{index}. Produktas</Text>
        <Text style={styles.productAfter}>Kategorija: {category}</Text>
      </TouchableOpacity>
    )
  })
  getValue2.forEach((category) => {
    index = index+1;
    results.push(
      <TouchableOpacity key={index} activeOpacity={0.6} style={styles.listItem} onPress={() => navigation.navigate('Produktas', {itemId: category})}>
        <Text style={styles.product}>{index}. Produktas</Text>
        <Text style={styles.productAfter}>Kategorija: {category}</Text>
      </TouchableOpacity>
    )
  })

  return (
    <ImageBackground source={require('./assets/background.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.flex1}>
          <Pressable style={styles.helpButton} onPress={() => navigation.navigate('Pagalba')}>
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

function ProductInfoScreen({route, navigation}) {
  const {itemId} = route.params;
  return (
    <ImageBackground source={require('./assets/background.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.flex1}>
          <Pressable style={styles.helpButton} onPress={() => navigation.navigate('Pagalba')}>
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
          <TouchableOpacity style={styles.feedbackButton} onPress={() => navigation.navigate('Atsiliepimai')}>
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
  const [showModal, setShowModal] = useState(false); 

  const handleSubmit = () => {
    console.log('Rating:', rating);
    console.log('Feedback Text:', feedbackText);

    setShowModal(true);
  };

  const handleContinue = () => {
    setShowModal(false);

    navigation.navigate('Sveiki');
  };

  return (
    <ImageBackground source={require('./assets/background.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.feedbackTitle}>Atsiliepimai</Text>

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

        <Text style={styles.label}>Padėkite mums tobulėti</Text>
        <TextInput
          style={styles.feedbackTextInput}
          multiline
          numberOfLines={4}
          placeholder="Jūsų atsiliepimas"
          value={feedbackText}
          onChangeText={(text) => setFeedbackText(text)}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Siūsti</Text>
        </TouchableOpacity>

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
      <Stack.Navigator initialRouteName="Sveiki">
        <Stack.Screen name="Sveiki" component={HomeScreen}/>
        <Stack.Screen name="Klausimynas" component={QuizScreen}/>
        <Stack.Screen name="Sąrašas" component={ItemListScreen}/>
        <Stack.Screen name="Produktas" component={ProductInfoScreen}/>
        <Stack.Screen name="Pagalba" component={HelpScreen}/>
        <Stack.Screen name="Atsiliepimai" component={FeedbackScreen}/>
        <Stack.Screen name="Registracija" component={RegistrationScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  modalImage: {
    width: 320,
    height: 320,
    marginTop: 15,
  },
  modalText: {
    fontSize: 17,
    color: 'black',
    marginTop: 5
  },
  modalTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  scrollViewContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  buttonNext: {
    width: 200, 
    height: 70,
  },
  quizFlex: {
    flex: 1, 
    width: '100%', 
    position: 'absolute', 
    alignItems: 'center', 
    marginTop: 50
  },
  quizTitle: {
    fontSize: 40, 
    fontWeight: 'bold', 
    color: 'white',
    marginBottom: 15
  },
  quizCategoryTitle: {
    fontSize: 19,
    fontWeight: '500',
    marginLeft: 15,
    marginBottom: 7
  },
  quizCategory: {
    marginBottom: 15,
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
  },feedbackTitle: {
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
registerButton: {
  position: 'absolute',
  top: 20,
  right: -100,
  backgroundColor: '#6699FF',
  width: 40,
  height: 40,
  borderRadius: 25,
  alignItems: 'center',
  justifyContent: 'center',
  elevation: 5,
},
registerButtonText: {
  fontSize: 30,
  color: 'white',
},

registrationTitle: {
  fontSize: 30,
  fontWeight: 'bold',
  color: '#fff',
  marginBottom: 20,
},
textInput: {
  width: '80%',
  height: 40,
  backgroundColor: '#fff',
  borderRadius: 10,
  padding: 10,
  marginBottom: 20,
},

loginTitle: {
  fontSize: 30,
  fontWeight: 'bold',
  color: '#fff',
  marginBottom: 20,
},
loginLink: {
  fontSize: 16,
  color: '#fff',
  textDecorationLine: 'underline',
  marginTop: 10,
},
registerLink: {
  fontSize: 16,
  color: '#fff',
  textDecorationLine: 'underline',
  marginTop: 10,
},

textInput: {
  width: '80%',
  height: 40,
  backgroundColor: '#fff',
  borderRadius: 10,
  padding: 10,
  marginBottom: 20,
},

loginTitle: {
  fontSize: 30,
  fontWeight: 'bold',
  color: '#fff',
  marginBottom: 20,
},
loginButton: {
  width: '80%',
  backgroundColor: '#6699FF',
  borderRadius: 10,
  padding: 15,
  alignItems: 'center',
  marginBottom: 20,
},
});

// npm install (node_modules)
// npm run start (qr code)
// npm run android (qr code + paleidimas per android pc)
