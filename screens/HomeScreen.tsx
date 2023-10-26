// import { View, Text, StyleSheet, Button, Image } from "react-native";
// import React, { useState } from "react";
// // import DocumentPicker from 'react-native-document-picker';
// import * as DocumentPicker from "expo-document-picker";
// import * as Permissions from "expo-permissions";
// import * as Linking from "expo-linking";
// import PDFView from "react-native-pdf";
// import * as MediaLibrary from "expo-media-library";

// const HomeScreen = () => {
//   const [selectedFile, setSelectedFile] = useState<any>();

//   const pickDocument = async () => {
//     try {
//       await Permissions.askAsync(Permissions.CAMERA_ROLL);
//       const result = await DocumentPicker.getDocumentAsync();
//       // console.log(result)

//       if (result.canceled === false) {
//         setSelectedFile(result);
//         console.log();
//       } else {
//         console.log("Document picking canceled or failed.");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   console.log("state", selectedFile);
//   // selectedFile&&Linking.openURL(`'{selectedFile.assets[0].uri}'`);
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Button title="Pick a File" onPress={pickDocument} />

//        {/* <Text> Selected File: {selectedFile.assets[0].uri} </Text>   */}
//       {selectedFile && selectedFile.assets && <Image style={{width:100,height:100}} source={{uri:selectedFile.assets[0].uri}} />}

//       {/* <PDFView
//         source={{ uri:selectedFile.assets[0].uri, cache: true }}
//         onLoadComplete={(numberOfPages, filePath) => {
//           console.log(`number of pages: ${numberOfPages}`);
//         }}
//         onPageChanged={(page, numberOfPages) => {
//           console.log(`current page: ${page}`);
//         }}
//       /> */}
//     </View>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "lightblue",
//   },
// });


import { View, Text, StyleSheet, Button, Image } from "react-native";
import React, { useState } from "react";

import * as DocumentPicker from "expo-document-picker";
import * as MediaLibrary from "expo-media-library";
import PDFView from "react-native-pdf";

const HomeScreen = () => {
  const [selectedFile, setSelectedFile] = useState<any>();

  const pickDocument = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      // console.log(status)

      if (status === "granted") {
        const result = await DocumentPicker.getDocumentAsync();
        console.log("hehehhe", result)

        if (!result.canceled) {
          setSelectedFile(result);
        } else {
          console.log("Document picking canceled or failed.");
        }
      } else {
       alert("file manager access is not granted.")
      }
      
    } catch (error) {
      // console.error(error);
    }
  
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Button title="Pick a File" onPress={pickDocument} />

    {selectedFile && selectedFile.uri && (
      <Image style={{ width: 100, height: 100 }} source={{ uri: selectedFile.uri }} />)}
    
  </View>
  );
    };
  

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
  },
});
