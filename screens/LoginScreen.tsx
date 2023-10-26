import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  PermissionsAndroid,
 BackHandler 
} from "react-native";
import React, { useState, useEffect } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { users } from "../data/Users";
import * as Permissions from 'expo-permissions';
import axios from "axios";



const LoginScreen  = ({ navigation }: { navigation: any }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [camPermission, setCamPermission] = useState<Permissions.PermissionStatus>();

  const handleLogin =  async () => {
    // const user = users.find(
    //   (user) => user.name == username && user.password == password
    // );

  //    axios.post('http://192.168.101.35:3000/login', {
  //     email: 'rajvardhan.yadav@infogen-labs.com',
  //     password: '12345'
  // })
  //     .then(function (response) {
  //         console.log(response);
  //     })
  //     .catch(function (error) {
  //         console.log(error);
  //     });
  

  //   if (user==='success') {
  //     navigation.navigate("Home");
  //   } else {
  //     alert("wrong username or password");
  //   }
  // interface IBody {
  //   email:string;
  //   password:string;
  // }
  
    // console.log('hihihi')
      const apiUrl = "http://192.168.30.229:3000/login";
      const body2= {
        email: username,
        password: password
      };

      const response = fetch(apiUrl, {
        method: 'POST',
        headers: {
          Accept: 'application.json',
          'Content-Type': 'application/json'  },  body: JSON.stringify(body2),
        
      }).then((res)=>res.json()).then((res)=>{if(res.message==='success'){
        navigation.navigate("Home");
      }else{
        alert('wrong username or password');
      }
      }).catch((err)=>{console.log(err);
      })

  // await axios.post('http://192.168.30.229:3000/login',{
  //        email: username,
  //       password: password,
  // }).then((res)=>{if(res.data.message=='success'){
  //   console.log(res.data.message)
  //   navigation.navigate("Home");
  // }else{
  //   alert("wrong username or password")
  // }
  // }).catch((err)=>{console.log(err)
  // })
   };


  async function authenticate () {
    // console.log("bolte",camPermission)
    
    let { status } = await Permissions.askAsync(Permissions.CAMERA);
    // setCamPermission(status)
    console.log("jjj",status)
    if (status=='granted'){ 
      const result = await LocalAuthentication.authenticateAsync();
    // console.log(result)
      if (result.success==true) {
        navigation.navigate("Home");
      } 
    }
    else if (status=='denied') {
      alert('allow camera permissions in settings to access biometric')
    }
    
    // }else if(camPermission==='denied'){
    //  authenticate;
    
  
    // const result = await LocalAuthentication.authenticateAsync();
   
    // if (result.success) {
    //   navigation.navigate("Home");
    // } 

  }
//  console.log(camPermission)
  useEffect(() => {
    
    authenticate();

  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require("../Images/user.png")}
        style={{ width: 100, height: 100, marginBottom: 20 }}
      />
      <Text style={styles.header}>Login.</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={{ left: 2, width: "80%", marginBottom: 20 }} onPress={authenticate}>
        <Text style={{ fontWeight: "bold" }}>
          Login with Face/Fingerprint ID?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },

  header: {
    fontSize: 38,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    width: "80%",
    height: 40,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#E4E6EA",
  },
  button: {
    backgroundColor: "#5F8BE2",
    padding: 10,
    borderRadius: 15,
    width: "80%",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});


